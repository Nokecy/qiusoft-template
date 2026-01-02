import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { ProjectFormGetListAsync, ProjectFormDeleteAsync, ProjectFormPublishAsync, ProjectFormUnpublishAsync } from '@/services/pdm/ProjectForm';
import { FormSchemaGetListAsync, FormSchemaPublishAsync, FormSchemaUnpublishAsync } from '@/services/openApi/FormSchema';
import { DeleteOutlined, EditOutlined, PlusOutlined, DragOutlined, CloudUploadOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl, history, dropByCacheKey } from 'umi';
import ProjectFormFormDialog from './components/ProjectFormFormDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { ProjectFormPermissions } from '@/pages/appPdm/_permissions';
import { projectFormStatusEnum } from './_enums';

// 发布状态渲染器
const PublishStatusRenderer = (props: ICellRendererParams) => {
  const { value } = props;
  return value ? (
    <Tag color="#52c41a">已发布</Tag>
  ) : (
    <Tag color="#faad14">草稿</Tag>
  );
};

// 状态渲染器
const StatusRenderer = (props: ICellRendererParams) => {
  const { value } = props;
  const item = projectFormStatusEnum.find((e) => e.value === value);
  if (!item) return value;
  return <Tag color={item.color}>{item.label}</Tag>;
};

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();

  const canUpdate = !!(access && access[ProjectFormPermissions.Update]);
  const canDelete = !!(access && access[ProjectFormPermissions.Delete]);

  const handleDelete = (id: any) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return ProjectFormDeleteAsync({ id }).then(() => onRefresh()).finally(() => hide());
  };

  // 发布ProjectForm(同步发布FormSchema)
  const handlePublish = async () => {
    const hide = message.loading('正在发布...', 0);
    try {
      // 1. 发布 ProjectForm
      await ProjectFormPublishAsync({ id: data.id });

      // 2. 如果有scenarioKey,同步发布FormSchema
      if (data.scenarioKey) {
        try {
          // 查询FormSchema (通过scenarioKey)
          const formSchemaList = await FormSchemaGetListAsync({
            ScenarioKey: data.scenarioKey,
            MaxResultCount: 1
          } as any);

          if (formSchemaList.items && formSchemaList.items.length > 0) {
            const formSchema = formSchemaList.items[0];
            // 发布FormSchema
            await FormSchemaPublishAsync({ id: formSchema.id! });
            console.log('[ProjectForm发布] FormSchema同步发布成功');
          }
        } catch (schemaError: any) {
          console.error('[ProjectForm发布] FormSchema发布失败:', schemaError);
          message.warning('项目表单发布成功,但动态表单Schema发布失败');
        }
      }

      message.success('发布成功');
      onRefresh();
    } catch (error) {
      message.error('发布失败');
    } finally {
      hide();
    }
  };

  // 取消发布ProjectForm(同步取消发布FormSchema)
  const handleUnpublish = async () => {
    const hide = message.loading('正在取消发布...', 0);
    try {
      // 1. 取消发布 ProjectForm
      await ProjectFormUnpublishAsync({ id: data.id });

      // 2. 如果有scenarioKey,同步取消发布FormSchema
      if (data.scenarioKey) {
        try {
          // 查询FormSchema
          const formSchemaList = await FormSchemaGetListAsync({
            ScenarioKey: data.scenarioKey,
            MaxResultCount: 1
          } as any);

          if (formSchemaList.items && formSchemaList.items.length > 0) {
            const formSchema = formSchemaList.items[0];
            // 取消发布FormSchema
            await FormSchemaUnpublishAsync({ id: formSchema.id! });
            console.log('[ProjectForm取消发布] FormSchema同步取消发布成功');
          }
        } catch (schemaError: any) {
          console.error('[ProjectForm取消发布] FormSchema取消发布失败:', schemaError);
          message.warning('项目表单取消发布成功,但动态表单Schema取消发布失败');
        }
      }

      message.success('取消发布成功');
      onRefresh();
    } catch (error) {
      message.error('取消发布失败');
    } finally {
      hide();
    }
  };

  return (
    <Space>
      <Access accessible={canUpdate}>
        <Button
          size="small"
          icon={<DragOutlined />}
          type={'link'}
          title={'设计表单'}
          onClick={async () => {
            // 跳转到 FormSchema 设计器,需要先查询 FormSchema 的 id
            if (!data.scenarioKey) {
              message.warning('该表单未关联scenarioKey,无法打开设计器');
              return;
            }

            const hide = message.loading('正在打开设计器...', 0);
            try {
              // 通过 scenarioKey 查询 FormSchema
              const formSchemaList = await FormSchemaGetListAsync({
                ScenarioKey: data.scenarioKey,
                MaxResultCount: 1
              } as any);

              if (!formSchemaList.items || formSchemaList.items.length === 0) {
                message.warning('未找到对应的表单Schema,请先创建');
                return;
              }

              const formSchema = formSchemaList.items[0];

              // 跳转到设计器,带上 id 和 scenarioKey 两个参数
              dropByCacheKey(`/appSYS/dynamic-schema/form-schemas/designer`);
              history.push({
                pathname: `/appSYS/dynamic-schema/form-schemas/designer`,
                search: `?id=${formSchema.id}&scenarioKey=${encodeURIComponent(data.scenarioKey)}`,
              });
            } catch (error: any) {
              message.error('打开设计器失败: ' + (error.message || '未知错误'));
            } finally {
              hide();
            }
          }}
        >
          设计
        </Button>
      </Access>

      {data.isPublished ? (
        <Access accessible={canUpdate}>
          <DeleteConfirm title="确定取消发布?" onConfirm={handleUnpublish}>
            <Button
              size="small"
              icon={<CloudDownloadOutlined />}
              type="link"
            >
              取消发布
            </Button>
          </DeleteConfirm>
        </Access>
      ) : (
        <Access accessible={canUpdate}>
          <DeleteConfirm title="确定发布此表单?" onConfirm={handlePublish}>
            <Button
              size="small"
              icon={<CloudUploadOutlined />}
              type="link"
              style={{ color: '#52c41a' }}
            >
              发布
            </Button>
          </DeleteConfirm>
        </Access>
      )}

      <Access accessible={canUpdate}>
        <ProjectFormFormDialog
          title={'编辑项目表单'}
          entityId={data.id}
          onAfterSubmit={onRefresh}
          buttonProps={{ icon: <EditOutlined />, type: 'link', size: 'small', title: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
        />
      </Access>

      <Access accessible={canDelete}>
        <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
          <Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
        </DeleteConfirm>
      </Access>
    </Space>
  );
};

const ProjectFormPage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const canCreate = !!(access && access[ProjectFormPermissions.Create]);

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle={'项目表单'}
      gridKey="appPdm.ProjectManagement.ProjectForm"
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const data = await ProjectFormGetListAsync(
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
      toolBarRender={() => {
        return [
          <Access accessible={canCreate}>
            <ProjectFormFormDialog title={'新建项目表单'} onAfterSubmit={onRefresh} buttonProps={{ icon: <PlusOutlined />, type: 'primary' }}>
              新建
            </ProjectFormFormDialog>
          </Access>,
        ];
      }}
    >
      <AgGridColumn field={'formName'} headerName={'表单名称'} width={200} />
      <AgGridColumn field={'scenarioKey'} headerName={'场景Key'} width={150} hideInSearch={true} />
      <AgGridColumn
        field={'isPublished'}
        headerName={'发布状态'}
        width={100}
        hideInSearch={true}
        cellRenderer={PublishStatusRenderer}
      />
      <AgGridColumn
        field={'status'}
        headerName={'状态'}
        width={100}
        hideInSearch={true}
        cellRenderer={StatusRenderer}
        valueEnum={projectFormStatusEnum}
      />
      <AgGridColumn field={'version'} headerName={'版本'} width={100} hideInSearch={true} />
      <AgGridColumn field={'description'} headerName={'描述'} width={260} hideInSearch={true} flex={1} />
      <AgGridColumn
        field={'action'}
        headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
        width={260}
        pinned={'right'}
        filter={false}
        sortable={false}
        cellRenderer={Options}
        cellRendererParams={{ onRefresh }}
      />
    </AgGridPlus>
  );
};

export default ProjectFormPage;

export const routeProps = {
  name: '项目表单管理',
};
