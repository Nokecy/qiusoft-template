/**
 * 外部Schema配置文件示例
 * 
 * 这个文件展示了如何定义独立的Formily Schema配置
 * 可以被withStandardForm的externalSchema参数使用
 */

// 表单布局配置
export const form = {
  labelCol: 6,
  wrapperCol: 16,
  colon: false,
  layout: 'horizontal',
  // FormGrid 配置
  grid: {
    strictAutoFit: true,
    minColumns: 1,
    maxColumns: 2
  }
};

// 表单字段Schema配置
export const schema = {
  type: 'object',
  properties: {
    // 系统字段
    id: {
      type: 'string',
      'x-component': 'Input',
      'x-display': 'hidden'
    },
    
    // 基础信息
    code: {
      type: 'string',
      title: '编码',
      required: true,
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入编码'
      }
    },
    
    name: {
      type: 'string',
      title: '名称',
      required: true,
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入名称'
      }
    },
    
    type: {
      type: 'string',
      title: '类型',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '请选择类型',
        options: [
          { label: '类型A', value: 'A' },
          { label: '类型B', value: 'B' },
          { label: '类型C', value: 'C' }
        ]
      }
    },
    
    status: {
      type: 'string',
      title: '状态',
      'x-component': 'Radio.Group',
      'x-component-props': {
        options: [
          { label: '启用', value: 'active' },
          { label: '禁用', value: 'inactive' }
        ]
      },
      default: 'active'
    },
    
    priority: {
      type: 'number',
      title: '优先级',
      'x-component': 'NumberPicker',
      'x-component-props': {
        min: 0,
        max: 100,
        precision: 0,
        style: { width: '100%' }
      }
    },
    
    startDate: {
      type: 'string',
      title: '开始日期',
      'x-component': 'DatePicker',
      'x-component-props': {
        placeholder: '请选择开始日期',
        style: { width: '100%' }
      }
    },
    
    endDate: {
      type: 'string',
      title: '结束日期',
      'x-component': 'DatePicker',
      'x-component-props': {
        placeholder: '请选择结束日期',
        style: { width: '100%' }
      }
    },
    
    isEnabled: {
      type: 'boolean',
      title: '是否启用',
      'x-component': 'Switch',
      'x-component-props': {
        checkedChildren: '是',
        unCheckedChildren: '否'
      },
      default: true
    },
    
    description: {
      type: 'string',
      title: '描述',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        placeholder: '请输入描述',
        rows: 3,
        maxLength: 500,
        showCount: true,
        // 占据两列
        gridSpan: 2
      }
    },
    
    // 审计字段（隐藏）
    creationTime: {
      type: 'string',
      title: '创建时间',
      'x-component': 'DatePicker',
      'x-component-props': {
        format: 'YYYY-MM-DD HH:mm:ss',
        showTime: true,
        disabled: true
      },
      'x-display': 'hidden'
    },
    
    lastModificationTime: {
      type: 'string',
      title: '最后修改时间',
      'x-component': 'DatePicker',
      'x-component-props': {
        format: 'YYYY-MM-DD HH:mm:ss',
        showTime: true,
        disabled: true
      },
      'x-display': 'hidden'
    }
  }
};

/**
 * 高级Schema配置示例
 * 包含条件显示、联动效果等复杂逻辑
 */
export const advancedSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      'x-component': 'Input',
      'x-display': 'hidden'
    },
    
    // 基础字段
    name: {
      type: 'string',
      title: '名称',
      required: true,
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入名称'
      }
    },
    
    // 条件显示字段
    hasAdvanced: {
      type: 'boolean',
      title: '启用高级选项',
      'x-component': 'Switch',
      default: false
    },
    
    // 联动字段 - 仅当hasAdvanced为true时显示
    advancedOption: {
      type: 'string',
      title: '高级选项',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '请选择高级选项',
        options: [
          { label: '选项1', value: 'option1' },
          { label: '选项2', value: 'option2' },
          { label: '选项3', value: 'option3' }
        ]
      },
      'x-reactions': {
        dependencies: ['hasAdvanced'],
        fulfill: {
          state: {
            visible: '{{$deps[0] === true}}'
          }
        }
      }
    }
  }
};