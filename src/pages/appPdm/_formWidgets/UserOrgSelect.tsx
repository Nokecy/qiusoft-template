import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Empty, Input, Modal, Select, Space, Spin, Table, Tabs, Tag, Tree, message } from 'antd';
import { DashOutlined, ReloadOutlined } from '@ant-design/icons';
import { useBoolean, useControllableValue } from 'ahooks';
import {
  OrganizationUnitGetTreeListAsync,
  OrganizationUnitGetUserListByOrganizationId,
} from '@/services/openApi/OrganizationUnit';
import { IdentityUserProGetListAsync } from '@/services/openApi/IdentityUserPro';

type UserItem = {
  id?: string;
  userName?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
};

type LabelInValue = { value: string; label: string; name?: string };

const buildTree = (items: any[]): any[] => {
  if (items.some((item) => item.children && item.children.length > 0)) {
    return items;
  }

  const itemMap = new Map<string, any>();
  items.forEach((item) => {
    if (item?.id) itemMap.set(item.id, { ...item, children: [] });
  });

  const roots: any[] = [];
  itemMap.forEach((item) => {
    if (item.parentId && itemMap.has(item.parentId)) {
      const parent = itemMap.get(item.parentId);
      parent.children.push(item);
    } else {
      roots.push(item);
    }
  });

  return roots;
};

const toTreeData = (items: any[]): any[] => {
  return items.map((node) => ({
    ...node,
    key: node.key || node.id,
    title: node.title || node.displayName || node.name || '-',
    children: node.children ? toTreeData(node.children) : undefined,
  }));
};

const getUserLabel = (user: Partial<UserItem> & { label?: string }) => {
  return user?.name || user?.label || user?.userName || '';
};

const normalizeValue = (value: any): LabelInValue[] => {
  if (!value) return [];
  const arr = Array.isArray(value) ? value : [value];
  return arr
    .map((item: any) => {
      if (!item) return null;
      if (typeof item === 'string') return { value: item, label: item };
      const id = item.value || item.id || item.userId;
      if (!id) return null;
      return {
        value: id,
        label: item.label || item.name || item.userName || id,
        name: item.name,
      };
    })
    .filter(Boolean) as LabelInValue[];
};

const UserOrgSelect: React.FC<any> = (props) => {
  const [value, setValue] = useControllableValue(props);
  const [visible, { setTrue, setFalse }] = useBoolean(false);

  const [treeLoading, setTreeLoading] = useState(false);
  const [treeData, setTreeData] = useState<any[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<any>(null);
  const [deptUsers, setDeptUsers] = useState<UserItem[]>([]);
  const [deptLoading, setDeptLoading] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  const [userLoading, setUserLoading] = useState(false);
  const [userList, setUserList] = useState<UserItem[]>([]);
  const [userKeyword, setUserKeyword] = useState('');
  const [activeTab, setActiveTab] = useState('dept');

  const [selectedMap, setSelectedMap] = useState<Map<string, UserItem>>(new Map());
  const [draftMap, setDraftMap] = useState<Map<string, UserItem>>(new Map());

  const syncSelectedMapFromValue = useCallback((nextValue: any) => {
    const map = new Map<string, UserItem>();
    normalizeValue(nextValue).forEach((item) => {
      if (!item?.value) return;
      map.set(item.value, {
        id: item.value,
        name: item.label || item.name || '',
        userName: item.label || item.name || '',
      });
    });
    setSelectedMap(map);
  }, []);

  useEffect(() => {
    syncSelectedMapFromValue(value);
  }, [value, syncSelectedMapFromValue]);

  const loadTreeData = useCallback(async () => {
    setTreeLoading(true);
    try {
      const res = await OrganizationUnitGetTreeListAsync({});
      const tree = buildTree(res.items || []);
      setTreeData(tree);
      setExpandedKeys(tree.map((item: any) => item.key || item.id || ''));
    } catch (error) {
      message.error('加载部门数据失败');
    } finally {
      setTreeLoading(false);
    }
  }, []);

  const loadUsersByOrg = useCallback(async (org: any) => {
    if (!org?.id) return;
    setDeptLoading(true);
    try {
      const res = await OrganizationUnitGetUserListByOrganizationId({ organizationId: org.id });
      const items = res.items || [];
      setDeptUsers(items);
      setDraftMap((prev) => {
        const next = new Map(prev);
        items.forEach((item: any) => {
          if (item?.id) next.set(item.id, item);
        });
        return next;
      });
      return items.map((item: any) => item.id).filter(Boolean);
    } catch (error) {
      message.error('加载部门用户失败');
      setDeptUsers([]);
      return [];
    } finally {
      setDeptLoading(false);
    }
  }, []);

  const loadUsers = useCallback(
    async (keyword?: string) => {
      setUserLoading(true);
      try {
        const filter = keyword?.trim()
          ? `name=*${keyword.trim()}* OR userName=*${keyword.trim()}*`
          : '';
        const res = await IdentityUserProGetListAsync({
          Filter: filter,
          SkipCount: 0,
          MaxResultCount: 200,
        });
        setUserList(res.items || []);
      } catch (error) {
        message.error('加载用户列表失败');
        setUserList([]);
      } finally {
        setUserLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (!visible) return;
    loadTreeData();
  }, [visible, loadTreeData]);

  useEffect(() => {
    if (!visible || activeTab !== 'user') return;
    const timer = setTimeout(() => {
      loadUsers(userKeyword);
    }, 300);
    return () => clearTimeout(timer);
  }, [visible, activeTab, userKeyword, loadUsers]);

  const selectedKeys = useMemo(() => new Set(Array.from(draftMap.keys())), [draftMap]);
  const selectedOptions = useMemo(
    () =>
      Array.from(selectedMap.values()).map((user) => ({
        value: user.id!,
        label: getUserLabel(user),
      })),
    [selectedMap]
  );

  const handleOpen = () => {
    setDraftMap(new Map(selectedMap));
    setTrue();
  };

  const handleOk = () => {
    const nextValue = Array.from(draftMap.values())
      .filter((user) => user.id)
      .map((user) => ({
        value: user.id!,
        label: getUserLabel(user),
        name: user.name,
      }));
    setValue(nextValue);
    setFalse();
  };

  const handleDeptSelect = async (selectedKeys: React.Key[], info: any) => {
    if (!info?.selected || !info?.node) {
      setSelectedOrg(null);
      setDeptUsers([]);
      return;
    }
    setSelectedOrg(info.node);
    await loadUsersByOrg(info.node);
  };

  const handleDeptSelectionChange = (selectedRowKeys: React.Key[], selectedRows: UserItem[]) => {
    setDraftMap((prev) => {
      const next = new Map(prev);
      deptUsers.forEach((user) => {
        if (user?.id && !selectedRowKeys.includes(user.id)) {
          next.delete(user.id);
        }
      });
      selectedRows.forEach((user) => {
        if (user?.id) next.set(user.id, user);
      });
      return next;
    });
  };

  const handleUserSelectionChange = (selectedRowKeys: React.Key[], selectedRows: UserItem[]) => {
    setDraftMap((prev) => {
      const next = new Map(prev);
      userList.forEach((user) => {
        if (user?.id && !selectedRowKeys.includes(user.id)) {
          next.delete(user.id);
        }
      });
      selectedRows.forEach((user) => {
        if (user?.id) next.set(user.id, user);
      });
      return next;
    });
  };

  const handleRemoveTag = (userId: string) => {
    setDraftMap((prev) => {
      const next = new Map(prev);
      next.delete(userId);
      return next;
    });
  };

  const deptSelectedRowKeys = useMemo(
    () => deptUsers.map((user) => user.id).filter((id) => id && selectedKeys.has(id)),
    [deptUsers, selectedKeys]
  );

  const userSelectedRowKeys = useMemo(
    () => userList.map((user) => user.id).filter((id) => id && selectedKeys.has(id)),
    [userList, selectedKeys]
  );

  return (
    <span>
      <Space.Compact style={{ width: '100%' }}>
        <Select
          mode={props.mode || 'multiple'}
          labelInValue
          allowClear
          placeholder={props.placeholder || '请选择用户'}
          value={normalizeValue(value)}
          onChange={(next) => {
            setValue(next);
            syncSelectedMapFromValue(next);
          }}
          options={selectedOptions}
          maxTagCount={props.maxTagCount || 'responsive'}
          style={{ width: '100%' }}
          disabled={props.disabled}
          open={false}
        />
        {!props.disabled ? (
          <Button icon={<DashOutlined />} onClick={handleOpen} />
        ) : null}
      </Space.Compact>

      <Modal
        width={1000}
        title="选择用户"
        open={visible}
        onOk={handleOk}
        onCancel={setFalse}
        destroyOnClose
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <Tabs.TabPane tab="按部门选择" key="dept">
            <div style={{ display: 'flex', gap: 16, minHeight: 420 }}>
              <div style={{ width: 300, borderRight: '1px solid #f0f0f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontWeight: 600 }}>部门结构</span>
                  <Button type="text" icon={<ReloadOutlined />} onClick={loadTreeData} />
                </div>
                <Spin spinning={treeLoading}>
                  {treeData.length > 0 ? (
                    <Tree
                      showLine={{ showLeafIcon: false }}
                      blockNode
                      treeData={toTreeData(treeData)}
                      expandedKeys={expandedKeys}
                      onExpand={setExpandedKeys}
                      onSelect={handleDeptSelect}
                      selectedKeys={selectedOrg ? [selectedOrg.key || selectedOrg.id] : []}
                    />
                  ) : (
                    <Empty description="暂无部门数据" />
                  )}
                </Spin>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: 8 }}>
                  {selectedOrg ? `${selectedOrg.title || selectedOrg.displayName || '-'} - 成员列表` : '请选择部门'}
                </div>
                <Table
                  rowKey="id"
                  size="small"
                  loading={deptLoading}
                  dataSource={deptUsers}
                  pagination={{ pageSize: 10 }}
                  rowSelection={{
                    selectedRowKeys: deptSelectedRowKeys,
                    onChange: handleDeptSelectionChange,
                  }}
                  columns={[
                    { title: '账号', dataIndex: 'userName', width: 160 },
                    { title: '姓名', dataIndex: 'name', width: 160 },
                  ]}
                  locale={{ emptyText: selectedOrg ? '暂无成员' : '请选择部门' }}
                />
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="按用户选择" key="user">
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              <Input.Search
                placeholder="搜索姓名/账号"
                allowClear
                onChange={(event) => setUserKeyword(event.target.value)}
                value={userKeyword}
              />
              <Table
                rowKey="id"
                size="small"
                loading={userLoading}
                dataSource={userList}
                pagination={{ pageSize: 10 }}
                rowSelection={{
                  selectedRowKeys: userSelectedRowKeys,
                  onChange: handleUserSelectionChange,
                }}
                columns={[
                  { title: '账号', dataIndex: 'userName', width: 160 },
                  { title: '姓名', dataIndex: 'name', width: 160 },
                ]}
                locale={{ emptyText: userLoading ? '加载中...' : '暂无用户数据' }}
              />
            </Space>
          </Tabs.TabPane>
        </Tabs>

        <div style={{ marginTop: 12 }}>
          <Space style={{ marginBottom: 8 }}>
            <span>已选用户：{draftMap.size}人</span>
            {draftMap.size > 0 ? (
              <Button size="small" onClick={() => setDraftMap(new Map())}>
                清空
              </Button>
            ) : null}
          </Space>
          {draftMap.size > 0 ? (
            <div>
              {Array.from(draftMap.values()).map((user) => (
                <Tag key={user.id} closable onClose={() => user.id && handleRemoveTag(user.id)}>
                  {getUserLabel(user)}
                </Tag>
              ))}
            </div>
          ) : (
            <Empty description="暂无已选用户" />
          )}
        </div>
      </Modal>
    </span>
  );
};

UserOrgSelect.GroupName = 'PDM';
export default UserOrgSelect;
export { UserOrgSelect };
