/**
 * 标签管理 - 打印功能定义列表页面
 * 注意:打印功能定义本身不能修改和删除,只能管理其动态属性
 */

import React, { useRef, useState } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { useAccess, useIntl } from '@umijs/max';
import { Button, Space, Drawer } from 'antd';
import { AgGridPlus } from '@/components/agGrid';
import { ICellRendererParams } from 'ag-grid-community';
import { SettingOutlined } from '@ant-design/icons';
import { LabelPrintFeatureDefinitionGetListAsync } from '@/services/openApi/LabelPrintFeatureDefinition';
import DynamicPropertyList from './components/DynamicPropertyList';
import DataSourceConfigDialog from './components/DataSourceConfigDialog';

export const routeProps = {
  name: '打印功能定义',
};

const LabelPrintFeatureDefinitionPage = () => {
  const intl = useIntl();
  const gridRef = useRef<GridRef>();
  const access = useAccess();

  // 动态属性抽屉状态
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState<string>('');
  const [currentFeatureName, setCurrentFeatureName] = useState<string>('');

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  // 打开动态属性管理抽屉
  const handleOpenProperties = (feature: string, featureName: string) => {
    setCurrentFeature(feature);
    setCurrentFeatureName(featureName);
    setDrawerVisible(true);
  };

  const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
    const { data } = props;

    return (
      <Space>
        <Button
          type="link"
          size="small"
          icon={<SettingOutlined />}
          onClick={() => handleOpenProperties(data.feature, data.displayName)}
        >
          属性管理
        </Button>
        <DataSourceConfigDialog
          printFeatureCode={data.feature}
          printFeatureName={data.displayName}
          onAfterSubmit={onRefresh}
          buttonProps={{
            type: 'link',
            size: 'small',
          }}
        />
      </Space>
    );
  };

  const columnDefs: any = [
    {
      headerName: '服务名称',
      field: 'serviceName',
      width: 200
    },
    {
      headerName: '功能编码',
      field: 'feature',
      flex: 1,
      width: 200,
    },
    {
      headerName: '显示名称',
      field: 'displayName',
      width: 180,
    },
    {
      headerName: '标签信息贡献者',
      field: 'labelInfoContributorName',
      width: 200,
      hideInSearch: true,
    },
    {
      headerName: '操作',
      field: '',
      width: 200,
      pinned: 'right',
      filter: false,
      cellRenderer: (props: any) => <Options {...props} />,
      cellRendererParams: { onRefresh },
    },
  ];

  return (
    <>
      <AgGridPlus
        gridRef={gridRef}
        headerTitle="打印功能定义列表"
        gridKey="label-management.label-print-feature-definition"
        request={async (params: any) => {
          const data = await LabelPrintFeatureDefinitionGetListAsync();

          // 前端过滤
          let items = data.items || [];
          if (params?.filter) {
            const filter = params.filter.toLowerCase();
            items = items.filter((item: any) =>
              item.feature?.toLowerCase().includes(filter) ||
              item.displayName?.toLowerCase().includes(filter)
            );
          }

          return {
            success: true,
            data: items,
            total: items.length,
          };
        }}
        columnDefs={columnDefs}
      />

      {/* 动态属性管理抽屉 */}
      <Drawer
        title={`${currentFeatureName} - 动态属性管理`}
        width={1000}
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        destroyOnClose
      >
        {drawerVisible && <DynamicPropertyList feature={currentFeature} />}
      </Drawer>
    </>
  );
};

export default LabelPrintFeatureDefinitionPage;
