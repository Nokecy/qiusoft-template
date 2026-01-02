import React, { useEffect, useState, useCallback } from 'react';
import { Card, Input, List, Spin, Empty, Tag } from 'antd';
import { SearchOutlined, DragOutlined } from '@ant-design/icons';
import { ProcessProcedureGetListAsync } from '@/services/pdm/ProcessProcedure';
import debounce from 'lodash/debounce';
import './ProcessProcedurePanel.less';

interface ProcessProcedurePanelProps {
  visible?: boolean;
}

/**
 * 工序拖拽面板
 * 左侧工序列表，支持拖拽到画布
 */
const ProcessProcedurePanel: React.FC<ProcessProcedurePanelProps> = ({ visible = true }) => {
  const [procedures, setProcedures] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // 加载工序数据
  const loadData = useCallback(async (keyword?: string) => {
    setLoading(true);
    try {
      const res = await ProcessProcedureGetListAsync({
        MaxResultCount: 100,
        SkipCount: 0,
        Filter: keyword || '',
      });
      setProcedures(res.items || []);
    } catch (error) {
      console.error('加载工序数据失败:', error);
      setProcedures([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 初始加载
  useEffect(() => {
    if (visible) {
      loadData();
    }
  }, [visible, loadData]);

  // 防抖搜索
  const debouncedSearch = useCallback(
    debounce((keyword: string) => {
      loadData(keyword);
    }, 300),
    [loadData]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  // 拖拽开始
  const onDragStart = (event: React.DragEvent, procedure: any) => {
    // 设置拖拽数据
    const dragData = {
      type: 'processProcedure',
      data: {
        id: procedure.id,
        code: procedure.code,
        name: procedure.name,
        workCenterId: procedure.workCenterId,
        workCenterCode: procedure.workCenterCode,
        workCenterName: procedure.workCenterName,
        processProcedureCategoryName: procedure.processProcedureCategoryName,
      },
    };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(dragData));
    event.dataTransfer.effectAllowed = 'move';
  };

  if (!visible) return null;

  return (
    <Card
      title="工序列表"
      size="small"
      className="process-procedure-panel"
      styles={{
        body: { padding: 8, height: 'calc(100% - 40px)', overflow: 'hidden' },
      }}
    >
      <div className="panel-search">
        <Input
          placeholder="搜索工序"
          prefix={<SearchOutlined />}
          value={searchValue}
          onChange={handleSearch}
          allowClear
          size="small"
        />
      </div>
      <div className="panel-tip">
        <DragOutlined /> 拖拽工序到右侧画布
      </div>
      <div className="panel-list">
        <Spin spinning={loading}>
          {procedures.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无工序" />
          ) : (
            <List
              size="small"
              dataSource={procedures}
              renderItem={(item: any) => (
                <div
                  className="procedure-item"
                  draggable
                  onDragStart={(e) => onDragStart(e, item)}
                >
                  <div className="procedure-info">
                    <div className="procedure-code">{item.code}</div>
                    <div className="procedure-name">{item.name}</div>
                  </div>
                  {item.workCenterName && (
                    <Tag color="blue" className="procedure-tag">
                      {item.workCenterName}
                    </Tag>
                  )}
                  <DragOutlined className="drag-handle" />
                </div>
              )}
            />
          )}
        </Spin>
      </div>
    </Card>
  );
};

export default ProcessProcedurePanel;
