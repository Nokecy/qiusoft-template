import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { DocumentConversionGetListAsync, DocumentConversionDeleteAsync, DocumentConversionRetryAsync, DocumentConversionCancelAsync } from '@/services/pdm/DocumentConversion';
import { DeleteOutlined, ReloadOutlined, StopOutlined, FileTextOutlined, EyeOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag, Modal, Descriptions, Timeline, Table } from 'antd';
import React, { useRef, useState } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import DeleteConfirm from '@/components/deleteConfirm';
import DrawingViewer from '@/components/DrawingViewer';
import dayjs from 'dayjs';

// 转换状态枚举
enum ConversionStatus {
  Pending = 0,
  Processing = 10,
  Completed = 20,
  Failed = 30,
  Canceled = 40,
}

const statusEnum = [
  { label: '待处理', value: ConversionStatus.Pending, color: '#faad14' },
  { label: '处理中', value: ConversionStatus.Processing, color: '#1890ff' },
  { label: '已完成', value: ConversionStatus.Completed, color: '#52c41a' },
  { label: '失败', value: ConversionStatus.Failed, color: '#ff4d4f' },
  { label: '已取消', value: ConversionStatus.Canceled, color: '#d9d9d9' },
];

// 转换引擎类型枚举
enum ConversionEngineType {
  XinDi = 0,
  AutodeskForge = 1,
  FreeCAD = 2,
  Assimp = 3,
}

const engineTypeEnum = [
  { label: '新迪', value: ConversionEngineType.XinDi },
  { label: 'Autodesk Forge', value: ConversionEngineType.AutodeskForge },
  { label: 'FreeCAD', value: ConversionEngineType.FreeCAD },
  { label: 'Assimp', value: ConversionEngineType.Assimp },
];

// 目标格式枚举
enum LightweightFormat {
  ZIP = 1,
  GLB = 2,
  OBJ = 3,
  SVF = 4,
  ImageSequence = 5,
  GLTF = 6,
}

const targetFormatEnum = [
  { label: 'ZIP', value: LightweightFormat.ZIP },
  { label: 'GLB', value: LightweightFormat.GLB },
  { label: 'OBJ', value: LightweightFormat.OBJ },
  { label: 'SVF', value: LightweightFormat.SVF },
  { label: '图片序列', value: LightweightFormat.ImageSequence },
  { label: 'glTF 2.0', value: LightweightFormat.GLTF },
];

// 日志级别枚举
enum ConversionLogLevel {
  Debug = 0,
  Info = 1,
  Warning = 2,
  Error = 3,
}

const logLevelEnum = [
  { label: 'Debug', value: ConversionLogLevel.Debug, color: '#d9d9d9' },
  { label: 'Info', value: ConversionLogLevel.Info, color: '#1890ff' },
  { label: 'Warning', value: ConversionLogLevel.Warning, color: '#faad14' },
  { label: 'Error', value: ConversionLogLevel.Error, color: '#ff4d4f' },
];

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();
  const [logModalVisible, setLogModalVisible] = useState(false);
  const [logData, setLogData] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [viewerVisible, setViewerVisible] = useState(false);
  const [modelUrl, setModelUrl] = useState('');

  const handleDelete = (id: any) => {
    const hide = message.loading('正在删除,请稍后', 0);
    return DocumentConversionDeleteAsync({ id }).then(() => {
      message.success('删除成功');
      onRefresh();
    }).catch((error) => {
      message.error(error?.message || '删除失败,请重试');
    }).finally(() => hide());
  };

  const handleRetry = (id: any) => {
    const hide = message.loading('正在重试,请稍后', 0);
    return DocumentConversionRetryAsync({ conversionId: id }).then(() => {
      message.success('重试成功');
      onRefresh();
    }).catch((error) => {
      message.error(error?.message || '重试失败,请重试');
    }).finally(() => hide());
  };

  const handleCancel = (id: any) => {
    const hide = message.loading('正在取消,请稍后', 0);
    return DocumentConversionCancelAsync({ conversionId: id }).then(() => {
      message.success('取消成功');
      onRefresh();
    }).catch((error) => {
      message.error(error?.message || '取消失败,请重试');
    }).finally(() => hide());
  };

  const handleViewLog = () => {
    // 直接使用列表中的 logs 字段
    setLogData(data);
    setLogs(data.logs || []);
    setLogModalVisible(true);
  };

  const handleViewDrawing = () => {
    const baseUrl = (window as any).serverUrl?.apiServerUrl || '';
    const viewerUrl = `${baseUrl}/api/pdm/conversion-files/${data.id}`;
    setModelUrl(viewerUrl);
    setViewerVisible(true);
  };

  // 只有失败状态的转换才能重试
  const canShowRetryButton = data.status === ConversionStatus.Failed;
  // 只有处理中的转换才能取消
  const canShowCancelButton = data.status === ConversionStatus.Processing;
  // 只有已完成的转换才能查看图纸
  const canShowViewDrawingButton = data.status === ConversionStatus.Completed;

  const getStatusText = (status: number) => {
    const item = statusEnum.find(s => s.value === status);
    return item?.label || '-';
  };

  const getEngineTypeText = (engineType: number) => {
    const item = engineTypeEnum.find(e => e.value === engineType);
    return item?.label || '-';
  };

  const getTargetFormatText = (format: number) => {
    const item = targetFormatEnum.find(f => f.value === format);
    return item?.label || '-';
  };

  return (
    <>
      <Space>
        <Access accessible={true}>
          <Button
            size={'small'}
            icon={<FileTextOutlined />}
            type={'link'}
            title="查看日志"
            onClick={handleViewLog}
          />
        </Access>

        {canShowViewDrawingButton && (
          <Access accessible={true}>
            <Button
              size={'small'}
              icon={<EyeOutlined />}
              type={'link'}
              title="查看图纸"
              onClick={handleViewDrawing}
            />
          </Access>
        )}

        {canShowRetryButton && (
          <Access accessible={true}>
            <DeleteConfirm title="确定重试此转换?" onConfirm={() => handleRetry(data.id)}>
              <Button size={'small'} icon={<ReloadOutlined />} type={'link'} title="重试" />
            </DeleteConfirm>
          </Access>
        )}

        {canShowCancelButton && (
          <Access accessible={true}>
            <DeleteConfirm title="确定取消此转换?" onConfirm={() => handleCancel(data.id)}>
              <Button size={'small'} icon={<StopOutlined />} type={'link'} title="取消" />
            </DeleteConfirm>
          </Access>
        )}

        <Access accessible={true}>
          <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
            <Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
          </DeleteConfirm>
        </Access>
      </Space>

      <DrawingViewer
        visible={viewerVisible}
        modelUrl={modelUrl}
        onClose={() => setViewerVisible(false)}
      />

      <Modal
        title="转换日志详情"
        open={logModalVisible}
        onCancel={() => setLogModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setLogModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={900}
      >
        {logData && (
          <>
            <Descriptions title="基本信息" column={2} bordered>
              <Descriptions.Item label="文档编号">{logData.documentNumber}</Descriptions.Item>
              <Descriptions.Item label="源文件名">{logData.sourceFileName}</Descriptions.Item>
              <Descriptions.Item label="转换引擎">{getEngineTypeText(logData.engineType)}</Descriptions.Item>
              <Descriptions.Item label="目标格式">{getTargetFormatText(logData.targetFormat)}</Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag color={statusEnum.find(s => s.value === logData.status)?.color}>
                  {getStatusText(logData.status)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="优先级">{logData.priority || '-'}</Descriptions.Item>
              <Descriptions.Item label="进度">{logData.progressPercentage || 0}%</Descriptions.Item>
              <Descriptions.Item label="重试次数">{logData.retryCount || 0}</Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {logData.creationTime ? dayjs(logData.creationTime).format('YYYY-MM-DD HH:mm:ss') : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="开始时间">
                {logData.startedAt ? dayjs(logData.startedAt).format('YYYY-MM-DD HH:mm:ss') : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="完成时间">
                {logData.completedAt ? dayjs(logData.completedAt).format('YYYY-MM-DD HH:mm:ss') : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="耗时">{logData.durationSeconds ? `${logData.durationSeconds} 秒` : '-'}</Descriptions.Item>
            </Descriptions>

            {/* 转换日志时间轴 */}
            {logs && logs.length > 0 && (
              <div style={{
                marginTop: 16,
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                overflow: 'hidden',
                backgroundColor: '#fafafa'
              }}>
                <div style={{
                  padding: '12px 16px',
                  backgroundColor: '#fff',
                  borderBottom: '1px solid #d9d9d9',
                  fontWeight: 500,
                  fontSize: '14px'
                }}>
                  转换日志
                </div>
                <div style={{ padding: '16px', backgroundColor: '#fff', maxHeight: '400px', overflowY: 'auto' }}>
                  <Timeline
                    items={logs.map((log: any) => {
                      const logLevel = logLevelEnum.find(l => l.value === log.level);
                      return {
                        color: logLevel?.color || '#d9d9d9',
                        children: (
                          <div style={{ marginBottom: 4 }}>
                            <div style={{ marginBottom: 8 }}>
                              <Tag color={logLevel?.color} style={{ marginRight: 8 }}>
                                {logLevel?.label || 'Unknown'}
                              </Tag>
                              <span style={{ color: '#8c8c8c', fontSize: '12px' }}>
                                {log.loggedAt ? dayjs(log.loggedAt).format('YYYY-MM-DD HH:mm:ss') : ''}
                              </span>
                            </div>
                            <div style={{ color: 'rgba(0, 0, 0, 0.85)', lineHeight: '22px' }}>
                              {log.message}
                            </div>
                          </div>
                        ),
                      };
                    })}
                  />
                </div>
              </div>
            )}

            {logData.errorMessage && (
              <Descriptions title="错误信息" column={1} bordered style={{ marginTop: 16 }}>
                <Descriptions.Item label="错误详情">
                  <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0 }}>
                    {logData.errorMessage}
                  </pre>
                </Descriptions.Item>
              </Descriptions>
            )}

            {logData.resultFiles && logData.resultFiles.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <h3 style={{ marginBottom: 16 }}>结果文件</h3>
                <Table
                  dataSource={logData.resultFiles}
                  pagination={false}
                  size="small"
                  rowKey={(record) => record.id || record.fileName || Math.random()}
                  columns={[
                    {
                      title: '序号',
                      width: 60,
                      render: (_: any, __: any, index: number) => index + 1,
                    },
                    {
                      title: '文件名',
                      dataIndex: 'fileName',
                      key: 'fileName',
                      render: (text: string) => text || '-',
                    },
                    {
                      title: '文件类型',
                      dataIndex: 'fileType',
                      key: 'fileType',
                      width: 100,
                      render: (text: string) => text || '-',
                    },
                    {
                      title: '文件大小',
                      dataIndex: 'fileSize',
                      key: 'fileSize',
                      width: 120,
                      render: (size: number) => {
                        if (!size) return '-';
                        if (size < 1024) return `${size} B`;
                        if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
                        return `${(size / 1024 / 1024).toFixed(2)} MB`;
                      },
                    },
                    {
                      title: 'Blob名称',
                      dataIndex: 'blobName',
                      key: 'blobName',
                      ellipsis: true,
                      render: (text: string) => text || '-',
                    },
                  ]}
                />
              </div>
            )}

            {logData.metadata && (
              <Descriptions title="元数据" column={2} bordered style={{ marginTop: 16 }}>
                <Descriptions.Item label="顶点数">{logData.metadata.vertexCount || '-'}</Descriptions.Item>
                <Descriptions.Item label="面数">{logData.metadata.faceCount || '-'}</Descriptions.Item>
                <Descriptions.Item label="文件大小">
                  {logData.metadata.totalFileSize ? `${(logData.metadata.totalFileSize / 1024 / 1024).toFixed(2)} MB` : '-'}
                </Descriptions.Item>
              </Descriptions>
            )}
          </>
        )}
      </Modal>
    </>
  );
};

const PdmDocumentConversionPage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle={'文档转换'}
      gridKey="appPdm.DocumentManagement.DocumentConversion"
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const data = await DocumentConversionGetListAsync(
          {
            Filter: params?.filter,
            SkipCount: params?.skipCount,
            MaxResultCount: params?.maxResultCount,
            Sorting: params?.sorter,
          } as any,
        );
        return { success: true, data: data.items || [], total: data.totalCount || 0 } as any;
      }}
      rowSelection={'multiple'}
      rowMultiSelectWithClick={true}
    >
      <AgGridColumn field={'documentNumber'} headerName={'文档编号'} width={180} />
      <AgGridColumn field={'sourceFileName'} headerName={'源文件名'} width={220} />
      <AgGridColumn
        field={'engineType'}
        headerName={'转换引擎'}
        width={140}
        cellRenderer={(params: any) => {
          const item = engineTypeEnum.find(e => e.value === params.value);
          return <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{item?.label || '-'}</span>;
        }}
      />
      <AgGridColumn
        field={'targetFormat'}
        headerName={'目标格式'}
        width={100}
        hideInSearch={true}
        cellRenderer={(params: any) => {
          const item = targetFormatEnum.find(e => e.value === params.value);
          return <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{item?.label || '-'}</span>;
        }}
      />
      <AgGridColumn
        field={'status'}
        headerName={'状态'}
        width={100}
        valueEnum={statusEnum}
      />
      <AgGridColumn
        field={'progressPercentage'}
        headerName={'进度'}
        width={100}
        hideInSearch={true}
        cellRenderer={(params: any) => {
          const progress = params.value || 0;
          return <span>{progress}%</span>;
        }}
      />
      <AgGridColumn
        field={'priority'}
        headerName={'优先级'}
        width={80}
        hideInSearch={true}
      />
      <AgGridColumn
        field={'durationSeconds'}
        headerName={'耗时(秒)'}
        width={100}
        hideInSearch={true}
      />
      <AgGridColumn
        field={'retryCount'}
        headerName={'重试次数'}
        width={100}
        hideInSearch={true}
      />
      <AgGridColumn
        field={'creationTime'}
        headerName={'创建时间'}
        width={160}
        hideInSearch={true}
        initialSort={'desc'}
        cellRenderer={(params: any) => {
          return params.value ? dayjs(params.value).format('YYYY-MM-DD HH:mm:ss') : '-';
        }}
      />
      <AgGridColumn
        field={'errorMessage'}
        headerName={'错误信息'}
        width={260}
        hideInSearch={true}
      />
      <AgGridColumn
        field={'action'}
        headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
        width={180}
        pinned={'right'}
        filter={false}
        sortable={false}
        cellRenderer={Options}
        cellRendererParams={{ onRefresh }}
      />
    </AgGridPlus>
  );
};

export default PdmDocumentConversionPage;

export const routeProps = {
  name: '文档转换',
};
