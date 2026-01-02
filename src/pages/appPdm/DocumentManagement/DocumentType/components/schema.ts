import { ISchema } from '@formily/react';

export const formId: string = 'Pdm.DocumentType';

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: 'none',
};

// 文件扩展名选项
export const fileExtensionOptions = [
  // 日常文档
  { label: 'PDF文档 (.pdf)', value: '.pdf' },
  { label: 'Word文档 (.doc)', value: '.doc' },
  { label: 'Word文档2007+ (.docx)', value: '.docx' },
  { label: 'Excel表格 (.xls)', value: '.xls' },
  { label: 'Excel表格2007+ (.xlsx)', value: '.xlsx' },
  { label: 'PowerPoint演示 (.ppt)', value: '.ppt' },
  { label: 'PowerPoint演示2007+ (.pptx)', value: '.pptx' },
  { label: '文本文件 (.txt)', value: '.txt' },
  { label: 'CSV文件 (.csv)', value: '.csv' },
  { label: 'RTF文档 (.rtf)', value: '.rtf' },

  // 图片格式
  { label: 'JPEG图片 (.jpg)', value: '.jpg' },
  { label: 'JPEG图片 (.jpeg)', value: '.jpeg' },
  { label: 'PNG图片 (.png)', value: '.png' },
  { label: 'GIF图片 (.gif)', value: '.gif' },
  { label: 'BMP图片 (.bmp)', value: '.bmp' },
  { label: 'TIFF图片 (.tif)', value: '.tif' },
  { label: 'TIFF图片 (.tiff)', value: '.tiff' },
  { label: 'SVG矢量图 (.svg)', value: '.svg' },

  // CAD图纸
  { label: 'AutoCAD图纸 (.dwg)', value: '.dwg' },
  { label: 'AutoCAD交换 (.dxf)', value: '.dxf' },
  { label: 'AutoCAD模板 (.dwt)', value: '.dwt' },

  // 3D模型
  { label: 'STEP 3D (.stp)', value: '.stp' },
  { label: 'STEP 3D (.step)', value: '.step' },
  { label: 'IGES 3D (.igs)', value: '.igs' },
  { label: 'IGES 3D (.iges)', value: '.iges' },
  { label: 'STL 3D (.stl)', value: '.stl' },
  { label: 'OBJ 3D (.obj)', value: '.obj' },
  { label: 'FBX 3D (.fbx)', value: '.fbx' },
  { label: '3DS 3D (.3ds)', value: '.3ds' },

  // 专业CAD/CAM
  { label: 'SolidWorks零件 (.sldprt)', value: '.sldprt' },
  { label: 'SolidWorks装配 (.sldasm)', value: '.sldasm' },
  { label: 'SolidWorks图纸 (.slddrw)', value: '.slddrw' },
  { label: 'CATIA零件 (.catpart)', value: '.catpart' },
  { label: 'CATIA装配 (.catproduct)', value: '.catproduct' },
  { label: 'UG/NX零件 (.prt)', value: '.prt' },
  { label: 'Inventor零件 (.ipt)', value: '.ipt' },
  { label: 'Inventor装配 (.iam)', value: '.iam' },

  // 其他专业格式
  { label: 'Gerber文件 (.gbr)', value: '.gbr' },
  { label: 'PCB文件 (.pcb)', value: '.pcb' },
  { label: 'Altium PCB (.pcbdoc)', value: '.pcbdoc' },
  { label: 'Altium原理图 (.schdoc)', value: '.schdoc' },
];

export const formSchema: { form: Record<string, any>; schema: ISchema } = {
  form: {
    labelCol: 6,
    wrapperCol: 12,
    labelWidth: '80px',
    feedbackLayout: 'none',
  },
  schema: {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': { maxColumns: 2 },
        properties: {
          col1: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              typeCode: {
                type: 'string',
                title: '类型编码',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入类型编码' },
                required: true,
                name: 'typeCode',
              },
            },
          },
          col2: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              typeName: {
                type: 'string',
                title: '类型名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入类型名称' },
                required: true,
                name: 'typeName',
              },
            },
          },
          col3: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              sortOrder: {
                type: 'number',
                title: '排序',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
                'x-component-props': { placeholder: '请输入排序值', min: 0, precision: 0 },
                name: 'sortOrder',
              },
            },
          },
          col4: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              fileExtensions: {
                type: 'string',
                title: '文件扩展名',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  mode: 'tags',
                  placeholder: '请选择或输入文件扩展名',
                  options: fileExtensionOptions,
                  showSearch: true,
                  filterOption: (input: string, option: any) =>
                    option.label.toLowerCase().includes(input.toLowerCase()),
                  tokenSeparators: [',', '，'],
                },
                'x-decorator-props': {
                  tooltip: '可多选或自定义输入，多个扩展名用逗号分隔',
                },
                name: 'fileExtensions',
              },
            },
          },
          col5: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              description: {
                type: 'string',
                title: '描述',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  placeholder: '请输入描述',
                  rows: 3
                },
                name: 'description',
              },
            },
          },
        },
      },
    },
  },
};
