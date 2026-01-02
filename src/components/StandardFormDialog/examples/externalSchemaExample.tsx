import React from 'react';
import { withStandardForm } from '../withStandardForm';
import { form, schema } from './schema';

/**
 * 使用外部schema.ts文件的示例
 * 
 * 这个示例展示了如何：
 * 1. 从外部schema.ts文件导入配置
 * 2. 使用externalSchema参数传入withStandardForm
 * 3. 保持完整的Formily Schema功能
 */

// 模拟API函数
const ExampleGetAsync = (params: any) => Promise.resolve({ id: '1', name: '示例数据' });
const ExampleCreateAsync = (data: any) => Promise.resolve(data);
const ExampleUpdateAsync = (id: any, data: any) => Promise.resolve(data);

// 使用外部Schema创建表单对话框
const ExternalSchemaFormDialog = withStandardForm({
  formId: 'Example.ExternalSchema',
  externalSchema: {
    form,
    schema
  },
  apiConfig: {
    get: ExampleGetAsync,
    create: ExampleCreateAsync,
    update: ExampleUpdateAsync
  },
  defaultDialogConfig: {
    width: 800,
    title: '外部Schema示例'
  }
});

// 示例页面组件
const ExternalSchemaExample: React.FC = () => {
  return (
    <div>
      <h2>外部Schema使用示例</h2>
      <ExternalSchemaFormDialog 
        title="编辑示例数据"
        entityId="1"
      />
    </div>
  );
};

export default ExternalSchemaExample;

/**
 * 使用方式说明：
 * 
 * 1. 创建独立的schema.ts文件：
 *    export const form = { ... };
 *    export const schema = { ... };
 * 
 * 2. 在组件中导入并使用：
 *    import { form, schema } from './schema';
 *    
 *    const FormDialog = withStandardForm({
 *      formId: 'Your.FormId',
 *      externalSchema: { form, schema },
 *      apiConfig: { ... }
 *    });
 * 
 * 3. 向后兼容性：
 *    - 现有使用businessFields的代码无需修改
 *    - 可以逐步迁移到外部schema方式
 *    - 两种方式可以并存
 */