(() => {
  const toastEl = document.getElementById('toast');
  const modalEl = document.getElementById('modal');
  const modalTitleEl = document.getElementById('modalTitle');
  const modalBodyEl = document.getElementById('modalBody');
  const modalFooterEl = document.getElementById('modalFooter');

  const milestoneCanvasEl = document.getElementById('milestoneCanvas');
  const edgesSvgEl = document.getElementById('edgesSvg');
  const milestonesJsonEl = document.getElementById('milestonesJson');
  const edgeListEl = document.getElementById('edgeList');
  const connectionModeEl = document.getElementById('connectionMode');
  const canvasStatusEl = document.getElementById('canvasStatus');

  const initial = {
    milestones: [
      { milestoneName: '立项', isApproval: true, parentCodes: [] },
      { milestoneName: '设计', isApproval: false, parentCodes: ['立项'] },
      { milestoneName: '试制', isApproval: true, parentCodes: ['设计'] },
      { milestoneName: '量产', isApproval: false, parentCodes: ['试制'] },
      { milestoneName: '结项', isApproval: true, parentCodes: ['量产'] },
    ],
    projectDetail: {
      tasks: [
        { id: 't-1', taskCode: 'T-001', taskName: '需求澄清', taskTypeName: '需求', description: '确认范围与验收口径' },
        { id: 't-2', taskCode: 'T-002', taskName: '设计评审', taskTypeName: '评审', description: '确认方案与风险' },
      ],
      issues: [{ id: 'i-1', issueCode: 'I-001', name: '接口字段不一致', requiresApproval: true, handlerName: '张三', remark: '需后端对齐' }],
      risks: [{ id: 'r-1', riskCode: 'R-001', name: '里程碑口径变更', riskTypeName: '范围', priority: 20, handlerName: '李四', description: '口径未定导致返工' }],
    },
    workspace: {
      myTasks: [{ taskCode: 'T-010', taskName: '项目看板联调', projectCode: 'P-001', status: 1, urgencyLevel: 10 }],
      myIssues: [{ issueCode: 'I-010', name: '权限菜单缺失', projectCode: 'P-002', requiresApproval: false, status: 10 }],
      myRisks: [{ riskCode: 'R-010', name: '环境域名入库', projectCode: 'P-003', status: 0, priority: 30 }],
    },
    attention: {
      tasks: [{ taskCode: 'T-101', taskName: '关注的任务A', projectCode: 'P-001', status: 0, urgencyLevel: 20 }],
      issues: [{ issueCode: 'I-101', name: '关注的问题A', projectCode: 'P-002', requiresApproval: true, status: 20 }],
      risks: [{ riskCode: 'R-101', name: '关注的风险A', projectCode: 'P-003', status: 0, priority: 10 }],
    },
  };

  const state = {
    milestones: [],
    nodes: [],
    edges: [],
    connectionMode: false,
    dragging: null,
    connecting: null,
    data: null,
  };

  const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

  const escapeHtml = (str) =>
    String(str || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');

  const normalizeName = (name) => String(name || '').trim();

  const uniqueNames = (arr) => {
    const set = new Set();
    const out = [];
    (arr || [])
      .map((v) => normalizeName(v))
      .filter(Boolean)
      .forEach((v) => {
        if (!set.has(v)) {
          set.add(v);
          out.push(v);
        }
      });
    return out;
  };

  const showToast = (text) => {
    if (!toastEl) return;
    toastEl.textContent = text;
    toastEl.classList.add('is-visible');
    setTimeout(() => toastEl.classList.remove('is-visible'), 1600);
  };

  const openModal = ({ title, body, footer }) => {
    if (!modalEl) return;
    modalTitleEl.textContent = title || '详情';
    modalBodyEl.innerHTML = body || '';
    modalFooterEl.innerHTML = footer || '';
    modalEl.setAttribute('aria-hidden', 'false');
  };

  const closeModal = () => {
    if (!modalEl) return;
    modalEl.setAttribute('aria-hidden', 'true');
  };

  const setActiveView = (view) => {
    document.querySelectorAll('.nav-item').forEach((el) => el.classList.toggle('is-active', el.getAttribute('data-view') === view));
    document.querySelectorAll('.view').forEach((el) => el.classList.toggle('is-active', el.getAttribute('data-view') === view));
  };

  const setActiveTab = (groupId, tab) => {
    const groupEl = document.getElementById(groupId);
    if (!groupEl) return;
    groupEl.querySelectorAll('.tab').forEach((btn) => btn.classList.toggle('is-active', btn.dataset.tab === tab));
    groupEl.parentElement.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.toggle('is-active', panel.dataset.tab === tab));
  };

  const getMilestone = (name) => state.milestones.find((m) => normalizeName(m.milestoneName) === name);

  const buildChildrenMap = () => {
    const map = new Map();
    state.milestones.forEach((m) => {
      const child = normalizeName(m.milestoneName);
      if (!child) return;
      uniqueNames(m.parentCodes).forEach((parent) => {
        if (!map.has(parent)) map.set(parent, []);
        map.get(parent).push(child);
      });
    });
    return map;
  };

  const wouldCreateCycle = (sourceName, targetName) => {
    if (sourceName === targetName) return true;
    const childrenMap = buildChildrenMap();
    const visited = new Set();
    const stack = [targetName];
    while (stack.length) {
      const current = stack.pop();
      if (visited.has(current)) continue;
      visited.add(current);
      const children = childrenMap.get(current) || [];
      for (const child of children) {
        if (child === sourceName) return true;
        stack.push(child);
      }
    }
    return false;
  };

  const computeLevels = () => {
    const cache = new Map();
    const visiting = new Set();

    const dfs = (name) => {
      if (cache.has(name)) return cache.get(name);
      if (visiting.has(name)) return 0;
      visiting.add(name);
      const m = getMilestone(name);
      const parents = uniqueNames(m?.parentCodes);
      const level = parents.length ? 1 + Math.max(...parents.map(dfs)) : 0;
      cache.set(name, level);
      visiting.delete(name);
      return level;
    };

    state.milestones.forEach((m) => dfs(normalizeName(m.milestoneName)));
    return cache;
  };

  const autoLayout = () => {
    const levels = computeLevels();
    const buckets = new Map();
    state.nodes.forEach((n) => {
      const level = levels.get(n.name) || 0;
      if (!buckets.has(level)) buckets.set(level, []);
      buckets.get(level).push(n);
    });
    buckets.forEach((nodes, level) => {
      nodes.forEach((n, index) => {
        n.x = 60 + level * 260;
        n.y = 60 + index * 120;
      });
    });
  };

  const rebuildGraph = () => {
    state.nodes = state.milestones
      .map((m, idx) => {
        const name = normalizeName(m.milestoneName);
        if (!name) return null;
        return { id: `node-${idx}-${name}`, name, isApproval: !!m.isApproval, x: 0, y: 0 };
      })
      .filter(Boolean);

    autoLayout();

    const edges = [];
    state.milestones.forEach((m) => {
      const childName = normalizeName(m.milestoneName);
      if (!childName) return;
      uniqueNames(m.parentCodes).forEach((parentName) => {
        if (!getMilestone(parentName)) return;
        edges.push({ id: `e:${parentName}->${childName}`, source: parentName, target: childName });
      });
    });
    state.edges = edges;
  };

  const renderMilestonesJson = () => {
    if (!milestonesJsonEl) return;
    milestonesJsonEl.value = JSON.stringify(state.milestones, null, 2);
  };

  const renderEdgeList = () => {
    if (!edgeListEl) return;
    if (state.edges.length === 0) {
      edgeListEl.innerHTML = '<div class="empty">暂无连线</div>';
      return;
    }
    edgeListEl.innerHTML = state.edges
      .map((e) => {
        return `<div class="edge-item"><div><code>${escapeHtml(e.source)}</code> → <code>${escapeHtml(e.target)}</code></div><button class="btn btn-danger" data-action="removeEdge" data-edge="${escapeHtml(e.id)}">删除</button></div>`;
      })
      .join('');
  };

  const getNodeEl = (nodeId) => document.querySelector(`[data-node-id="${nodeId}"]`);

  const getNodeCenter = (node) => {
    const el = getNodeEl(node.id);
    if (!el) return { x: node.x, y: node.y };
    const rect = el.getBoundingClientRect();
    const canvasRect = milestoneCanvasEl.getBoundingClientRect();
    return { x: rect.left - canvasRect.left + rect.width / 2, y: rect.top - canvasRect.top + rect.height / 2 };
  };

  const createSvgCurve = ({ id, x1, y1, x2, y2, dashed, color }) => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('data-edge-id', id);
    const dx = Math.max(80, Math.abs(x2 - x1) * 0.35);
    const c1x = x1 + dx;
    const c2x = x2 - dx;
    path.setAttribute('d', `M ${x1} ${y1} C ${c1x} ${y1}, ${c2x} ${y2}, ${x2} ${y2}`);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', color || 'rgba(79, 195, 247, 0.9)');
    path.setAttribute('stroke-width', '2.5');
    path.setAttribute('pointer-events', 'stroke');
    if (dashed) path.setAttribute('stroke-dasharray', '6 6');
    path.style.cursor = 'pointer';
    return path;
  };

  const renderEdges = () => {
    if (!edgesSvgEl || !milestoneCanvasEl) return;
    edgesSvgEl.innerHTML = '';

    state.edges.forEach((e) => {
      const sourceNode = state.nodes.find((n) => n.name === e.source);
      const targetNode = state.nodes.find((n) => n.name === e.target);
      if (!sourceNode || !targetNode) return;
      const s = getNodeCenter(sourceNode);
      const t = getNodeCenter(targetNode);
      const dashed = !!getMilestone(targetNode.name)?.isApproval;
      const path = createSvgCurve({ id: e.id, x1: s.x, y1: s.y, x2: t.x, y2: t.y, dashed });
      path.addEventListener('click', () => removeEdgeById(e.id));
      edgesSvgEl.appendChild(path);
    });

    if (state.connecting) {
      const { sourceName, from, to } = state.connecting;
      const dashed = !!getMilestone(sourceName)?.isApproval;
      const path = createSvgCurve({
        id: 'temp',
        x1: from.x,
        y1: from.y,
        x2: to.x,
        y2: to.y,
        dashed,
        color: 'rgba(255,255,255,0.45)',
      });
      path.setAttribute('stroke-width', '2');
      path.setAttribute('stroke-dasharray', '4 4');
      path.style.pointerEvents = 'none';
      edgesSvgEl.appendChild(path);
    }
  };

  const renderNodes = () => {
    if (!milestoneCanvasEl) return;
    milestoneCanvasEl.querySelectorAll('.milestone-node').forEach((el) => el.remove());
    state.nodes.forEach((node) => {
      const el = document.createElement('div');
      el.className = `milestone-node${node.isApproval ? ' is-approval' : ''}`;
      el.style.left = `${node.x}px`;
      el.style.top = `${node.y}px`;
      el.dataset.nodeId = node.id;
      el.dataset.nodeName = node.name;
      el.setAttribute('data-node-id', node.id);

      const tag = node.isApproval ? `<span class="tag warning">审批</span>` : `<span class="tag">普通</span>`;
      const parentCount = (getMilestone(node.name)?.parentCodes || []).length;
      el.innerHTML = `
        <div class="node-title">${escapeHtml(node.name)}</div>
        <div class="node-meta">
          <span>${tag}</span>
          <span>${escapeHtml(parentCount)} 个父级</span>
        </div>
        <div class="connector ${state.connectionMode ? '' : 'is-disabled'}" data-connector="1" title="从这里拖拽连线"></div>
      `;

      el.addEventListener('pointerdown', (evt) => {
        if (evt.target && evt.target.getAttribute && evt.target.getAttribute('data-connector') === '1') return;
        startDragNode(evt, node.id);
      });

      el.querySelector('.connector').addEventListener('pointerdown', (evt) => {
        evt.stopPropagation();
        startConnect(evt, node.id);
      });

      milestoneCanvasEl.appendChild(el);
    });
  };

  const updateCanvasStatus = () => {
    state.connectionMode = !!connectionModeEl?.checked;
    if (!canvasStatusEl) return;
    canvasStatusEl.textContent = state.connectionMode ? '连线模式：从右侧圆点拖拽到目标节点' : '拖拽节点 / 关闭连线模式';
  };

  const startDragNode = (evt, nodeId) => {
    const canvasRect = milestoneCanvasEl.getBoundingClientRect();
    const node = state.nodes.find((n) => n.id === nodeId);
    if (!node) return;
    const el = getNodeEl(nodeId);
    const rect = el.getBoundingClientRect();
    state.dragging = {
      nodeId,
      offsetX: evt.clientX - rect.left,
      offsetY: evt.clientY - rect.top,
      canvasLeft: canvasRect.left,
      canvasTop: canvasRect.top,
    };
    el.setPointerCapture(evt.pointerId);
  };

  const moveDragNode = (evt) => {
    if (!state.dragging) return;
    const { nodeId, offsetX, offsetY, canvasLeft, canvasTop } = state.dragging;
    const node = state.nodes.find((n) => n.id === nodeId);
    if (!node) return;
    node.x = evt.clientX - canvasLeft - offsetX;
    node.y = evt.clientY - canvasTop - offsetY;
    const el = getNodeEl(nodeId);
    el.style.left = `${node.x}px`;
    el.style.top = `${node.y}px`;
    renderEdges();
  };

  const endDragNode = () => {
    if (!state.dragging) return;
    state.dragging = null;
    renderEdges();
  };

  const startConnect = (evt, nodeId) => {
    updateCanvasStatus();
    if (!state.connectionMode) {
      showToast('请先开启“连线模式”');
      return;
    }
    const node = state.nodes.find((n) => n.id === nodeId);
    if (!node) return;
    const from = getNodeCenter(node);
    state.connecting = { sourceId: nodeId, sourceName: node.name, from, to: from, pointerId: evt.pointerId };
    milestoneCanvasEl.setPointerCapture(evt.pointerId);
    renderEdges();
  };

  const moveConnect = (evt) => {
    if (!state.connecting) return;
    const canvasRect = milestoneCanvasEl.getBoundingClientRect();
    state.connecting.to = { x: evt.clientX - canvasRect.left, y: evt.clientY - canvasRect.top };
    renderEdges();
  };

  const endConnect = (evt) => {
    if (!state.connecting) return;
    const sourceName = state.connecting.sourceName;
    const targetEl = document.elementFromPoint(evt.clientX, evt.clientY)?.closest?.('.milestone-node');
    const targetName = normalizeName(targetEl?.dataset?.nodeName);
    state.connecting = null;
    renderEdges();

    if (!targetName || targetName === sourceName) return;
    const target = getMilestone(targetName);
    if (!target) return;

    if (wouldCreateCycle(sourceName, targetName)) {
      showToast('不允许形成循环父子关系');
      return;
    }

    target.parentCodes = uniqueNames([...(target.parentCodes || []), sourceName]);
    rebuildGraph();
    renderAll();
    showToast(`已连线：${sourceName} → ${targetName}`);
  };

  const removeEdgeById = (edgeId) => {
    const edge = state.edges.find((e) => e.id === edgeId);
    if (!edge) return;
    const target = getMilestone(edge.target);
    if (!target) return;
    target.parentCodes = uniqueNames((target.parentCodes || []).filter((p) => p !== edge.source));
    rebuildGraph();
    renderAll();
    showToast('已删除连线');
  };

  const renderProjectDetailLists = () => {
    const tasksEl = document.getElementById('projectTasks');
    const issuesEl = document.getElementById('projectIssues');
    const risksEl = document.getElementById('projectRisks');
    if (!tasksEl || !issuesEl || !risksEl) return;

    const { tasks, issues, risks } = state.data.projectDetail;
    tasksEl.innerHTML = tasks
      .map(
        (t) => `
      <div class="list-item">
        <div>
          <div class="list-title" data-action="openDetail" data-type="task" data-id="${escapeHtml(t.id)}">${escapeHtml(t.taskName)}</div>
          <div class="list-sub">${escapeHtml(t.taskCode)} · ${escapeHtml(t.taskTypeName)} · ${escapeHtml(t.description || '')}</div>
        </div>
        <div>
          <button class="btn btn-ghost" data-action="editEntity" data-type="task" data-id="${escapeHtml(t.id)}">编辑</button>
        </div>
      </div>
    `,
      )
      .join('');

    issuesEl.innerHTML = issues
      .map(
        (t) => `
      <div class="list-item">
        <div>
          <div class="list-title" data-action="openDetail" data-type="issue" data-id="${escapeHtml(t.id)}">${escapeHtml(t.name)}</div>
          <div class="list-sub">${escapeHtml(t.issueCode)} · 是否需要审批：${t.requiresApproval ? '是' : '否'} · 处理人：${escapeHtml(t.handlerName || '-')}</div>
        </div>
        <div>
          <button class="btn btn-ghost" data-action="editEntity" data-type="issue" data-id="${escapeHtml(t.id)}">编辑</button>
        </div>
      </div>
    `,
      )
      .join('');

    risksEl.innerHTML = risks
      .map(
        (t) => `
      <div class="list-item">
        <div>
          <div class="list-title" data-action="openDetail" data-type="risk" data-id="${escapeHtml(t.id)}">${escapeHtml(t.name)}</div>
          <div class="list-sub">${escapeHtml(t.riskCode)} · 类型：${escapeHtml(t.riskTypeName || '-')} · 处理人：${escapeHtml(t.handlerName || '-')}</div>
        </div>
        <div>
          <button class="btn btn-ghost" data-action="editEntity" data-type="risk" data-id="${escapeHtml(t.id)}">编辑</button>
        </div>
      </div>
    `,
      )
      .join('');
  };

  const buildTable = ({ columns, rows, rowKey, actions }) => {
    const th = columns.map((c) => `<th>${escapeHtml(c.title)}</th>`).join('');
    const body = rows
      .map((row) => {
        const key = rowKey(row);
        const tds = columns
          .map((c) => {
            const raw = c.render ? c.render(row) : row[c.dataIndex];
            return `<td>${raw === undefined || raw === null ? '-' : raw}</td>`;
          })
          .join('');
        const actionTd = actions ? `<td>${actions(row, key)}</td>` : '';
        return `<tr data-row-key="${escapeHtml(key)}">${tds}${actionTd}</tr>`;
      })
      .join('');

    const actionHead = actions ? '<th>操作</th>' : '';
    return `<table><thead><tr>${th}${actionHead}</tr></thead><tbody>${body}</tbody></table>`;
  };

  const renderWorkspaceTables = () => {
    const myTasks = state.data.workspace.myTasks || [];
    const myIssues = state.data.workspace.myIssues || [];
    const myRisks = state.data.workspace.myRisks || [];

    const mapTaskStatus = (s) => ({ 0: '未开始', 1: '进行中', 2: '已暂停', 3: '已完成', 4: '已取消' }[s] || '-');
    const mapUrgency = (u) => ({ 0: '低', 10: '中', 20: '高' }[u] || '-');
    const mapRiskStatus = (s) => ({ 0: '打开', 10: '已解决' }[s] || '-');
    const mapPriority = (p) => ({ 0: '低', 10: '中', 20: '高', 30: '紧急' }[p] || '-');
    const mapIssueStatus = (s) => ({ 0: '新建', 5: '处理中', 10: '已解决', 15: '已关闭', 20: '待确认' }[s] || String(s ?? '-'));

    document.getElementById('myTasksTable').innerHTML = buildTable({
      columns: [
        { title: '任务编码', dataIndex: 'taskCode', render: (r) => `<span class="link" data-action="toast" data-text="原型：跳转任务详情">${escapeHtml(r.taskCode)}</span>` },
        { title: '任务名称', dataIndex: 'taskName' },
        { title: '项目编码', dataIndex: 'projectCode' },
        { title: '状态', dataIndex: 'status', render: (r) => `<span class="tag">${escapeHtml(mapTaskStatus(r.status))}</span>` },
        { title: '紧急程度', dataIndex: 'urgencyLevel', render: (r) => `<span class="tag warning">${escapeHtml(mapUrgency(r.urgencyLevel))}</span>` },
      ],
      rows: myTasks,
      rowKey: (r) => r.taskCode,
    });

    document.getElementById('myIssuesTable').innerHTML = buildTable({
      columns: [
        { title: '问题编码', dataIndex: 'issueCode', render: (r) => `<span class="link" data-action="toast" data-text="原型：跳转问题详情">${escapeHtml(r.issueCode)}</span>` },
        { title: '问题名称', dataIndex: 'name' },
        { title: '项目编码', dataIndex: 'projectCode' },
        { title: '是否需要审批', dataIndex: 'requiresApproval', render: (r) => `<span class="tag ${r.requiresApproval ? 'warning' : ''}">${r.requiresApproval ? '需要' : '不需要'}</span>` },
        { title: '状态', dataIndex: 'status', render: (r) => `<span class="tag">${escapeHtml(mapIssueStatus(r.status))}</span>` },
      ],
      rows: myIssues,
      rowKey: (r) => r.issueCode,
    });

    document.getElementById('myRisksTable').innerHTML = buildTable({
      columns: [
        { title: '风险编码', dataIndex: 'riskCode', render: (r) => `<span class="link" data-action="toast" data-text="原型：跳转风险详情">${escapeHtml(r.riskCode)}</span>` },
        { title: '风险名称', dataIndex: 'name' },
        { title: '项目编码', dataIndex: 'projectCode' },
        { title: '状态', dataIndex: 'status', render: (r) => `<span class="tag danger">${escapeHtml(mapRiskStatus(r.status))}</span>` },
        { title: '优先级', dataIndex: 'priority', render: (r) => `<span class="tag warning">${escapeHtml(mapPriority(r.priority))}</span>` },
      ],
      rows: myRisks,
      rowKey: (r) => r.riskCode,
    });
  };

  const renderAttentionTables = () => {
    const att = state.data.attention;
    const tasksEl = document.getElementById('attentionTaskTable');
    const issuesEl = document.getElementById('attentionIssueTable');
    const risksEl = document.getElementById('attentionRiskTable');
    if (!tasksEl || !issuesEl || !risksEl) return;

    const cancelBtn = (key, type) =>
      `<button class="btn btn-danger" data-action="cancelWatch" data-type="${escapeHtml(type)}" data-key="${escapeHtml(key)}">取消关注</button>`;

    tasksEl.innerHTML = buildTable({
      columns: [
        { title: '任务编码', dataIndex: 'taskCode', render: (r) => `<span class="link" data-action="toast" data-text="原型：查看任务详情">${escapeHtml(r.taskCode)}</span>` },
        { title: '任务名称', dataIndex: 'taskName' },
        { title: '项目编码', dataIndex: 'projectCode' },
      ],
      rows: att.tasks,
      rowKey: (r) => r.taskCode,
      actions: (r) => cancelBtn(r.taskCode, 'task'),
    });

    issuesEl.innerHTML = buildTable({
      columns: [
        { title: '问题编码', dataIndex: 'issueCode', render: (r) => `<span class="link" data-action="toast" data-text="原型：查看问题详情">${escapeHtml(r.issueCode)}</span>` },
        { title: '问题名称', dataIndex: 'name' },
        { title: '项目编码', dataIndex: 'projectCode' },
        { title: '是否需要审批', dataIndex: 'requiresApproval', render: (r) => `<span class="tag ${r.requiresApproval ? 'warning' : ''}">${r.requiresApproval ? '需要' : '不需要'}</span>` },
      ],
      rows: att.issues,
      rowKey: (r) => r.issueCode,
      actions: (r) => cancelBtn(r.issueCode, 'issue'),
    });

    risksEl.innerHTML = buildTable({
      columns: [
        { title: '风险编码', dataIndex: 'riskCode', render: (r) => `<span class="link" data-action="toast" data-text="原型：查看风险详情">${escapeHtml(r.riskCode)}</span>` },
        { title: '风险名称', dataIndex: 'name' },
        { title: '项目编码', dataIndex: 'projectCode' },
      ],
      rows: att.risks,
      rowKey: (r) => r.riskCode,
      actions: (r) => cancelBtn(r.riskCode, 'risk'),
    });
  };

  const handleCancelWatch = (type, key) => {
    const att = state.data.attention;
    if (type === 'task') att.tasks = att.tasks.filter((t) => t.taskCode !== key);
    if (type === 'issue') att.issues = att.issues.filter((t) => t.issueCode !== key);
    if (type === 'risk') att.risks = att.risks.filter((t) => t.riskCode !== key);
    renderAttentionTables();
    showToast('已取消关注（原型 mock）');
  };

  const openEntityDetail = (type, id) => {
    const detail = state.data.projectDetail;
    const find = (arr) => arr.find((x) => x.id === id) || null;
    const entity = type === 'task' ? find(detail.tasks) : type === 'issue' ? find(detail.issues) : find(detail.risks);
    if (!entity) return;
    openModal({ title: '查看详情（原型）', body: `<pre>${escapeHtml(JSON.stringify(entity, null, 2))}</pre>`, footer: `<button class="btn btn-primary" data-action="closeModal">确定</button>` });
  };

  const editEntity = (type, id) => {
    openModal({
      title: '编辑入口（轻量方案原型）',
      body: `<div style="color:rgba(255,255,255,0.85);line-height:1.6">
        <div>这里模拟“详情页内增删改能力不完整”的轻量对齐方案：</div>
        <div>点击“编辑”即可进入对应 form 页面（真实系统为 <code>/form?id=...</code>）。</div>
        <div style="margin-top:8px">当前：<code>${escapeHtml(type)}</code> · <code>${escapeHtml(id)}</code></div>
      </div>`,
      footer: `<button class="btn btn-primary" data-action="closeModal">知道了</button>`,
    });
  };

  const renderAll = () => {
    renderNodes();
    renderEdges();
    renderMilestonesJson();
    renderEdgeList();
    renderProjectDetailLists();
    renderWorkspaceTables();
    renderAttentionTables();
  };

  const resetData = () => {
    state.data = deepClone(initial);
    state.milestones = state.data.milestones;
    rebuildGraph();
    updateCanvasStatus();
    renderAll();
    showToast('已重置 mock 数据');
  };

  const exportJson = () => {
    const payload = { milestones: state.milestones, projectDetail: state.data.projectDetail, workspace: state.data.workspace, attention: state.data.attention };
    openModal({ title: '导出 JSON（原型）', body: `<pre>${escapeHtml(JSON.stringify(payload, null, 2))}</pre>`, footer: `<button class="btn btn-primary" data-action="closeModal">关闭</button>` });
  };

  window.addEventListener('pointermove', (evt) => {
    if (state.dragging) moveDragNode(evt);
    if (state.connecting) moveConnect(evt);
  });
  window.addEventListener('pointerup', (evt) => {
    if (state.dragging) endDragNode();
    if (state.connecting) endConnect(evt);
  });

  document.addEventListener('click', (evt) => {
    const actionEl = evt.target.closest?.('[data-action]');
    if (!actionEl) return;
    const action = actionEl.getAttribute('data-action');
    if (action === 'closeModal') return closeModal();
    if (action === 'reset') return resetData();
    if (action === 'export') return exportJson();
    if (action === 'autoLayout') {
      autoLayout();
      renderNodes();
      renderEdges();
      showToast('已自动排布');
      return;
    }
    if (action === 'removeEdge') return removeEdgeById(actionEl.getAttribute('data-edge'));
    if (action === 'openDetail') return openEntityDetail(actionEl.getAttribute('data-type'), actionEl.getAttribute('data-id'));
    if (action === 'editEntity') return editEntity(actionEl.getAttribute('data-type'), actionEl.getAttribute('data-id'));
    if (action === 'cancelWatch') return handleCancelWatch(actionEl.getAttribute('data-type'), actionEl.getAttribute('data-key'));
    if (action === 'toast') return showToast(actionEl.getAttribute('data-text') || '原型提示');
  });

  document.querySelectorAll('.nav-item').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveView(el.getAttribute('data-view'));
    });
  });

  document.getElementById('workspaceTabs')?.addEventListener('click', (evt) => {
    const btn = evt.target.closest?.('.tab');
    if (!btn) return;
    setActiveTab('workspaceTabs', btn.dataset.tab);
  });
  document.getElementById('attentionTabs')?.addEventListener('click', (evt) => {
    const btn = evt.target.closest?.('.tab');
    if (!btn) return;
    setActiveTab('attentionTabs', btn.dataset.tab);
  });

  connectionModeEl?.addEventListener('change', () => {
    updateCanvasStatus();
    renderNodes();
    renderEdges();
  });

  modalEl?.addEventListener('click', (evt) => {
    const el = evt.target.closest?.('[data-action="closeModal"]');
    if (el) closeModal();
  });

  resetData();
})();

