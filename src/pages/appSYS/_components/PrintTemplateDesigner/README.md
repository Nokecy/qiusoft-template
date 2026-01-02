# 可视化打印模板设计器

基于对接文档实现的可视化打印模板设计器组件，支持ATL模板格式的创建、编辑和管理。

## 功能特性

### 核心功能
- ✅ 可视化画布编辑
- ✅ 多种元素类型支持（文本、条码、图片、表格）
- ✅ 拖拽调整元素位置和大小
- ✅ 实时属性编辑
- ✅ 撤销/重做功能
- ✅ 模板导入/导出
- ✅ 与后端API集成

### 支持的元素类型
1. **文本元素**：支持字体、大小、颜色、对齐等属性
2. **条码元素**：支持多种条码类型（Code128、QRCode等）
3. **图片元素**：支持URL和Base64图片
4. **表格元素**：支持自定义行列数和样式

### 画布功能
- 自由拖拽元素位置
- 调整元素大小（8个调整手柄）
- 元素层级管理（上移、下移、置顶、置底）
- 画布尺寸和DPI设置

## 目录结构

```
PrintTemplateDesigner/
├── index.tsx                    # 主组件入口
├── README.md                    # 文档
├── types/
│   └── index.ts                # 类型定义（AtlTemplate、AtlElement等）
├── utils/
│   └── index.ts                # 工具函数
├── hooks/
│   └── useTemplateState.ts    # 模板状态管理Hook
└── components/
    ├── ToolBar.tsx             # 工具栏组件
    ├── Canvas.tsx              # 画布组件
    └── PropertyPanel.tsx       # 属性面板组件
```

## 使用方法

### 基础用法

```tsx
import { PrintTemplateDesigner } from '@/pages/appSys/components/PrintTemplateDesigner';

// 新建模板
<PrintTemplateDesigner
  onSave={(template) => {
    console.log('保存的模板:', template);
  }}
/>

// 编辑现有模板
<PrintTemplateDesigner
  templateId="your-template-id"
  onSave={(template) => {
    console.log('更新的模板:', template);
  }}
  onClose={() => {
    console.log('关闭设计器');
  }}
/>
```

### 在页面中集成

```tsx
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { PrintTemplateDesigner } from '@/pages/appSys/components/PrintTemplateDesigner';

const TemplatePage = () => {
  const [visible, setVisible] = useState(false);
  const [templateId, setTemplateId] = useState<string>();

  const handleCreate = () => {
    setTemplateId(undefined);
    setVisible(true);
  };

  const handleEdit = (id: string) => {
    setTemplateId(id);
    setVisible(true);
  };

  return (
    <>
      <Button onClick={handleCreate}>新建模板</Button>

      <Modal
        title={templateId ? '编辑模板' : '新建模板'}
        open={visible}
        onCancel={() => setVisible(false)}
        width="100vw"
        style={{ top: 0, paddingBottom: 0 }}
        bodyStyle={{ height: '100vh', padding: 0 }}
        footer={null}
      >
        <PrintTemplateDesigner
          templateId={templateId}
          onSave={(template) => {
            console.log('保存成功', template);
            setVisible(false);
          }}
          onClose={() => setVisible(false)}
        />
      </Modal>
    </>
  );
};
```

## API集成说明

### 当前实现

设计器使用现有的`PrintTemplateInfo` API进行模板的保存和加载：

```typescript
// 保存模板
await PrintTemplateInfoUpdateAsync(
  { id: templateId },
  {
    id: templateId,
    name: template.metadata.name,
    describe: template.metadata.description,
    width: template.canvas.width,
    height: template.canvas.height,
    templateType: 0,
    templateContent: JSON.stringify(template), // ATL模板序列化为JSON
  }
);

// 加载模板
const result = await PrintTemplateInfoGetAsync({ id: templateId });
const template = JSON.parse(result.templateContent);
```

### 未来扩展

当后端实现完整的ATL模板API后，可以轻松切换到新的API：

```typescript
// services/atlTemplate.ts
import { request } from 'umi';

// 渲染预览
export async function renderToImage(params: RenderRequest) {
  return request('/api/app/label-print-template/render-to-image', {
    method: 'POST',
    data: params,
  });
}

// 转换为打印机代码
export async function convertToPrinterCode(params: ConvertRequest) {
  return request('/api/app/template-converter/convert', {
    method: 'POST',
    data: params,
  });
}
```

## 数据格式

### AtlTemplate结构

```typescript
{
  "version": "1.0",
  "metadata": {
    "name": "产品标签模板",
    "description": "用于产品打印的标签模板",
    "created": "2025-10-06T10:00:00Z",
    "modified": "2025-10-06T12:00:00Z",
    "author": "admin"
  },
  "canvas": {
    "width": 100,     // 毫米
    "height": 50,     // 毫米
    "dpi": 300,
    "backgroundColor": "#FFFFFF"
  },
  "layoutType": 0,    // 0=报表布局, 1=标签网格布局
  "dataSources": {},  // 数据源配置
  "elements": [       // 元素列表
    {
      "id": "elem-1",
      "type": 1,      // 1=文本
      "position": { "x": 10, "y": 10 },
      "size": { "width": 80, "height": 10 },
      "properties": {
        "text": "产品名称: {{ product_name }}",
        "font": {
          "family": "Arial",
          "size": 12,
          "bold": false
        },
        "alignment": 0
      },
      "zIndex": 0,
      "visible": true
    }
  ]
}
```

## 快捷键（计划实现）

- `Ctrl + Z`: 撤销
- `Ctrl + Y`: 重做
- `Delete`: 删除选中元素
- `Ctrl + S`: 保存模板
- `Ctrl + C`: 复制元素
- `Ctrl + V`: 粘贴元素
- 方向键: 移动选中元素

## 开发说明

### 添加新的元素类型

1. 在`types/index.ts`中定义元素类型枚举和属性接口
2. 在`utils/index.ts`中的`getDefaultElementProperties`添加默认属性
3. 在`Canvas.tsx`中的`renderElement`添加渲染逻辑
4. 在`PropertyPanel.tsx`中添加属性编辑UI

### 自定义样式

可以通过修改各组件的style属性来自定义样式，或者使用CSS模块。

## 注意事项

1. **坐标单位**: 所有位置和尺寸使用毫米(mm)作为单位
2. **DPI设置**: 影响元素在实际打印时的清晰度
3. **元素ID**: 使用UUID确保唯一性
4. **数据绑定**: 使用Scriban语法 `{{ variable }}`
5. **模板验证**: 保存前会进行基本的结构验证

## 后续优化计划

- [ ] 实现预览功能（需要后端API支持）
- [ ] 添加网格和标尺辅助线
- [ ] 支持元素复制粘贴
- [ ] 支持快捷键操作
- [ ] 添加对齐和分布工具
- [ ] 实现数据源配置面板
- [ ] 支持多选和组合
- [ ] 添加元素锁定功能
- [ ] 实现模板预设库

## 技术栈

- React 18
- TypeScript 5
- Ant Design 5
- UmiJS 4

## 参考文档

- [前后端API对接文档](../../../../../文档/可视化打印模板/docs/前后端API对接文档.md)
- [ATL模板格式规范](待补充)
- [Scriban模板语法](https://github.com/scriban/scriban)
