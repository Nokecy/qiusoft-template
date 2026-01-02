# DrawingViewer 图纸查看器组件

基于新迪3D Viewer的图纸查看组件，用于展示转换后的轻量化3D模型。

## 功能特性

- 支持新迪轻量化格式文件查看
- 全屏模式支持
- 自动加载模型
- Loading状态提示
- 模态框形式展示

## 使用方法

```tsx
import DrawingViewer from '@/components/DrawingViewer';

const MyComponent = () => {
  const [viewerVisible, setViewerVisible] = useState(false);
  const [modelUrl, setModelUrl] = useState('');

  return (
    <>
      <Button onClick={() => {
        setModelUrl('http://your-domain.com/models/folder-path');
        setViewerVisible(true);
      }}>
        查看图纸
      </Button>

      <DrawingViewer
        visible={viewerVisible}
        onClose={() => setViewerVisible(false)}
        modelUrl={modelUrl}
        title="图纸查看"
        fingerHttp="http://192.168.2.2:8090" // 可选，云API地址
      />
    </>
  );
};
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| visible | 是否显示查看器 | boolean | - | 是 |
| onClose | 关闭回调 | () => void | - | 是 |
| modelUrl | 轻量化模型文件夹URL | string | - | 是 |
| title | 查看器标题 | string | '图纸预览' | 否 |
| fingerHttp | 云API地址 | string | 'http://192.168.2.2:8090' | 否 |

## 模型URL说明

`modelUrl` 应该是转换后文件所在的**文件夹路径**，而不是具体文件路径。

例如：
- ✅ 正确：`http://domain.com/models/19383726737`
- ❌ 错误：`http://domain.com/models/19383726737/model.js`

该文件夹下应包含以下结构：
```
19383726737/
  ├── Configurations.json
  └── 0/
      ├── model.js
      ├── geom_0.bin
      ├── modelBrep.bin.gz
      └── ...其他文件
```

## 依赖资源

组件依赖 `public/3DViewer/` 目录下的新迪查看器资源文件，确保该目录存在且包含完整的查看器文件。

## 注意事项

1. 确保后端API返回的 `fileUrl` 格式正确
2. 需要配置正确的 `fingerHttp` 云API地址
3. 跨域问题需要在服务器端配置CORS
4. 仅支持现代浏览器（Chrome、Firefox、Safari、Edge等）
5. 不支持IE浏览器
