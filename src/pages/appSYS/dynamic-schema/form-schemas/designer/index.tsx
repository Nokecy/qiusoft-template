/**
 * 动态 Schema 表单设计器
 * 使用本地迁移的 FormDesigner 组件
 * 支持可视化拖拽设计表单
 */
import React, { Suspense, useMemo, useEffect, useRef } from 'react';
import { Spin, Card, message } from 'antd';
import { FormWidgetComponents } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import {
  FormilySchemaGetSchemaAsync,
  FormilySchemaSaveDesignerSchemaAsync,
} from '@/services/openApi/FormilySchema';
import {
  FormSchemaGetAsync,
  FormSchemaUpdateAsync,
} from '@/services/openApi/FormSchema';
import { transformToSchema, transformToTreeNode } from '@nokecy/designable-formily-transformer';
import { useDynamicSchema } from '@@/plugin-dynamicSchema';

// 懒加载本地 FormDesigner 组件
const FormDesigner = React.lazy(() =>
  import('../_formDesigner').then((module) => ({ default: module.FormDesigner }))
);

// 加载中组件
const LoadingFallback = () => (
  <Card style={{ height: '100vh' }}>
    <div style={{ textAlign: 'center', padding: 100 }}>
      <Spin size="large" tip="正在加载表单设计器..." />
    </div>
  </Card>
);

// 当前页面的路由路径
const CURRENT_PAGE_PATH = '/appSYS/dynamic-schema/form-schemas/designer';

const FormSchemaDesignerPage: React.FC = () => {
  const engineRef = useRef<any>(null);
  const hasAppliedFallbackRef = useRef(false);

  // 使用 Hook 获取路由参数
  const { params, isActive } = useKeepAliveParams(CURRENT_PAGE_PATH, [
    'id',
    'applicationName',
    'entityName',
    'hostEntityId',
    'scenarioKey',
  ]);

  const {
    id = undefined,
    applicationName = undefined,
    entityName = undefined,
    hostEntityId = undefined,
    scenarioKey = 'default',
  } = isActive ? params : {};

  // 设计器场景对应的动态 Schema（用于前端内置回退）
  const fallbackDynamicSchema = useDynamicSchema(scenarioKey || 'default');

  // 记录上一次的参数，用于检测变化
  const prevParamsRef = useRef<{
    id?: string;
    applicationName?: string;
    hostEntityId?: string;
  } | null>(null);

  // 监听URL参数变化，重新加载Schema（支持KeepAlive模式）
  useEffect(() => {
    // 只有当前路由匹配时才处理
    if (!isActive) return;

    const prevParams = prevParamsRef.current;
    const paramsChanged =
      prevParams?.id !== id ||
      prevParams?.applicationName !== applicationName ||
      prevParams?.hostEntityId !== hostEntityId;

    if (paramsChanged) {
      prevParamsRef.current = { id, applicationName, hostEntityId };
      if (engineRef.current && (id || applicationName || hostEntityId)) {
        // 参数变化时重新加载Schema
        loadSchema(engineRef.current);
      }
    }
  }, [id, applicationName, hostEntityId, scenarioKey, isActive]);

  // 加载 Schema
  const loadSchema = async (engine: any) => {
    // 保存engine引用，用于KeepAlive模式下参数变化时重新加载
    engineRef.current = engine;
    console.log('[FormDesigner] 开始加载 Schema', {
      id,
      applicationName,
      hostEntityId,
      scenarioKey,
    });
    try {
      if (id) {
        // 通过 FormSchema ID 加载
        const data = await FormSchemaGetAsync({ id });
        console.log('[FormDesigner] 按 ID 加载后端返回', data);
        if (data.schemaJson) {
          const schema = JSON.parse(data.schemaJson);
          const isEmptySchema =
            !schema ||
            (typeof schema === 'object' &&
              Object.keys(schema).length === 0);
          if (!isEmptySchema) {
            engine.setCurrentTree(transformToTreeNode(schema));
            hasAppliedFallbackRef.current = false;
          } else if (!fallbackDynamicSchema.loading && !fallbackDynamicSchema.error && fallbackDynamicSchema.schema) {
            // 后端 JSON 为空对象时也回退前端内置
            const designerSchema = {
              form: fallbackDynamicSchema.formConfig || { labelCol: 6, wrapperCol: 12 },
              schema: fallbackDynamicSchema.schema,
            };
            console.log('[FormDesigner] 后端 Schema 为空对象，使用前端内置 Schema 作为回退:', designerSchema);
            engine.setCurrentTree(transformToTreeNode(designerSchema));
            message.info('该表单暂无有效后端 Schema，已使用前端内置 Schema');
            hasAppliedFallbackRef.current = true;
          } else {
            // fallback 尚未就绪，等待后续 useEffect 触发重试
            hasAppliedFallbackRef.current = false;
          }
        } else if (!fallbackDynamicSchema.loading && !fallbackDynamicSchema.error && fallbackDynamicSchema.schema) {
          // 后端未返回 Schema 时，使用前端内置 Schema 回退
          const designerSchema = {
            form: fallbackDynamicSchema.formConfig || { labelCol: 6, wrapperCol: 12 },
            schema: fallbackDynamicSchema.schema,
          };
          console.log('[FormDesigner] 使用前端内置 Schema 作为回退:', designerSchema);
          engine.setCurrentTree(transformToTreeNode(designerSchema));
          message.info('该表单暂无后端 Schema，已使用前端内置 Schema');
          hasAppliedFallbackRef.current = true;
        }
      } else if (applicationName) {
        // 通过应用名称加载
        // API 返回 { form, schema, version, name, displayName } 结构
        const data = await FormilySchemaGetSchemaAsync({
          applicationName,
          scenarioKey,
        });
        console.log('[FormDesigner] 按应用加载后端返回', { applicationName, scenarioKey, data });

        if (data?.schema) {
          // 设计器需要完整的 { form, schema } 结构
          const designerSchema = {
            form: data.form || { labelCol: 6, wrapperCol: 12 },
            schema: data.schema,
          };
          console.log('[FormDesigner] 转换后的设计器 Schema:', designerSchema);
          engine.setCurrentTree(transformToTreeNode(designerSchema));
          hasAppliedFallbackRef.current = false;
        } else if (!fallbackDynamicSchema.loading && !fallbackDynamicSchema.error && fallbackDynamicSchema.schema) {
          // 后端没有返回场景的 JSON 时，使用前端内置 Schema 回退
          const designerSchema = {
            form: fallbackDynamicSchema.formConfig || { labelCol: 6, wrapperCol: 12 },
            schema: fallbackDynamicSchema.schema,
          };
          console.log('[FormDesigner] 使用前端内置 Schema 作为回退', {
            scenarioKey,
            designerSchema,
          });
          engine.setCurrentTree(transformToTreeNode(designerSchema));
          message.info('后端未提供该场景的 Schema，已使用前端内置 Schema');
          hasAppliedFallbackRef.current = true;
        } else {
          // 创建默认空 Schema
          console.log('[FormDesigner] 使用默认空 Schema');
          engine.setCurrentTree(transformToTreeNode({
            form: { labelCol: 6, wrapperCol: 12 },
            schema: {
              type: 'object',
              properties: {},
            },
          }));
        }
      } else if (hostEntityId) {
        // 通过宿主实体 ID 加载
        // 创建默认空 Schema
        engine.setCurrentTree(transformToTreeNode({
          form: { labelCol: 6, wrapperCol: 12 },
          schema: {
            type: 'object',
            properties: {},
          },
        }));
      }
    } catch (error: any) {
      console.error('[FormDesigner] 加载 Schema 失败:', error);
      message.error('加载表单 Schema 失败: ' + (error?.message || '未知错误'));
    }
  };

  // 保存 Schema
  const saveSchema = async (engine: any) => {
    const hide = message.loading('正在保存...', 0);
    try {
      const schema = transformToSchema(engine.getCurrentTree());
      console.log('[FormDesigner] 保存 Schema:', schema);

      if (id) {
        // 通过 FormSchema ID 保存
        const schemaJson = JSON.stringify(schema);
        await FormSchemaUpdateAsync(
          { id },
          { schemaJson }
        );
        message.success('保存成功！');
      } else if (applicationName) {
        // 通过应用名称保存 - API 需要 schema 对象，不是字符串
        await FormilySchemaSaveDesignerSchemaAsync({
          applicationName,
          scenarioKey,
          schema, // 传递 JSON 对象，不是字符串
        });
        message.success('保存成功！');
      } else {
        message.warning('未指定保存目标，请先创建表单 Schema');
      }
    } catch (error: any) {
      console.error('[FormDesigner] 保存失败:', error);
      message.error('保存失败: ' + (error?.message || '未知错误'));
    } finally {
      hide();
    }
  };

  // 当回退 Schema 就绪且尚未应用时，重新尝试加载
  useEffect(() => {
    if (!isActive) return;
    if (hasAppliedFallbackRef.current) return;
    if (fallbackDynamicSchema.loading || fallbackDynamicSchema.error) return;
    if (engineRef.current && (id || applicationName)) {
      console.log('[FormDesigner] 回退 Schema 已就绪，尝试重新加载', {
        scenarioKey,
        hasAppliedFallback: hasAppliedFallbackRef.current,
        fallbackReady: !fallbackDynamicSchema.loading,
      });
      loadSchema(engineRef.current);
    }
  }, [
    fallbackDynamicSchema.loading,
    fallbackDynamicSchema.error,
    fallbackDynamicSchema.schema,
    id,
    applicationName,
    isActive,
  ]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <FormDesigner
        key={`${id || ''}-${applicationName || ''}-${hostEntityId || ''}-${scenarioKey || ''}`}
        name={applicationName || '未命名表单'}
        loadSchema={loadSchema}
        saveSchema={saveSchema}
        businessComponents={FormWidgetComponents || []}
      />
    </Suspense>
  );
};

export default FormSchemaDesignerPage;

export const routeProps = {
  name: '表单设计器',
};
