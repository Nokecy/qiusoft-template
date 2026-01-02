/**
 * 标签管理模块权限定义
 */

/** 标签分类权限 */
export const LabelCategory = {
  /** 查看标签分类 */
  Default: 'LabelManagement.LabelCategory',
  /** 创建标签分类 */
  Create: 'LabelManagement.LabelCategory.Create',
  /** 更新标签分类 */
  Update: 'LabelManagement.LabelCategory.Update',
  /** 删除标签分类 */
  Delete: 'LabelManagement.LabelCategory.Delete',
};

/** 标签类型权限 */
export const LabelType = {
  /** 查看标签类型 */
  Default: 'LabelManagement.LabelType',
  /** 创建标签类型 */
  Create: 'LabelManagement.LabelType.Create',
  /** 更新标签类型 */
  Update: 'LabelManagement.LabelType.Update',
  /** 删除标签类型 */
  Delete: 'LabelManagement.LabelType.Delete',
};

/** 标签类型高级设置权限 */
export const LabelTypeAdvancedSetting = {
  /** 查看标签类型高级设置 */
  Default: 'LabelManagement.LabelTypeAdvancedSetting',
  /** 创建标签类型高级设置 */
  Create: 'LabelManagement.LabelTypeAdvancedSetting.Create',
  /** 更新标签类型高级设置 */
  Update: 'LabelManagement.LabelTypeAdvancedSetting.Update',
  /** 删除标签类型高级设置 */
  Delete: 'LabelManagement.LabelTypeAdvancedSetting.Delete',
};

/** 标签打印定义权限 */
export const LabelPrintDefinition = {
  /** 查看标签打印定义 */
  Default: 'LabelManagement.LabelPrintDefinition',
  /** 创建标签打印定义 */
  Create: 'LabelManagement.LabelPrintDefinition.Create',
  /** 更新标签打印定义 */
  Update: 'LabelManagement.LabelPrintDefinition.Update',
  /** 删除标签打印定义 */
  Delete: 'LabelManagement.LabelPrintDefinition.Delete',
};

/** 标签打印设置权限 */
export const LabelPrintSetting = {
  /** 查看标签打印设置 */
  Default: 'LabelManagement.LabelPrintSetting',
  /** 创建标签打印设置 */
  Create: 'LabelManagement.LabelPrintSetting.Create',
  /** 更新标签打印设置 */
  Update: 'LabelManagement.LabelPrintSetting.Update',
  /** 删除标签打印设置 */
  Delete: 'LabelManagement.LabelPrintSetting.Delete',
};

/** 标签打印模板权限 */
export const LabelPrintTemplate = {
  /** 查看标签打印模板 */
  Default: 'LabelManagement.LabelPrintTemplate',
  /** 创建标签打印模板 */
  Create: 'LabelManagement.LabelPrintTemplate.Create',
  /** 更新标签打印模板 */
  Update: 'LabelManagement.LabelPrintTemplate.Update',
  /** 删除标签打印模板 */
  Delete: 'LabelManagement.LabelPrintTemplate.Delete',
};

/** 打印功能定义及动态属性权限 */
export const LabelPrintFeatureDefinition = {
  /** 查看打印功能定义(使用DynamicProperties权限) */
  Default: 'LabelManagement.DynamicProperties',
  /** 创建动态属性 */
  Create: 'LabelManagement.DynamicProperties.Create',
  /** 更新动态属性 */
  Update: 'LabelManagement.DynamicProperties.Update',
  /** 删除动态属性 */
  Delete: 'LabelManagement.DynamicProperties.Delete',
};

/** 用户打印功能打印机设置权限 */
export const UserPrintFeaturePrinter = {
  /** 查看用户打印功能打印机设置 */
  Default: 'LabelManagement.UserPrintFeaturePrinters',
  /** 设置用户打印功能打印机 */
  Set: 'LabelManagement.UserPrintFeaturePrinters.Set',
  /** 删除用户打印功能打印机设置 */
  Delete: 'LabelManagement.UserPrintFeaturePrinters.Delete',
};

/** 数据源权限 */
export const DataSource = {
  /** 查看数据源 */
  Default: 'LabelManagement.DataSource',
  /** 验证数据源 */
  Validate: 'LabelManagement.DataSource.Validate',
  /** 测试数据源 */
  Test: 'LabelManagement.DataSource.Test',
  /** 获取数据 */
  GetData: 'LabelManagement.DataSource.GetData',
  /** 预览数据 */
  Preview: 'LabelManagement.DataSource.Preview',
};
