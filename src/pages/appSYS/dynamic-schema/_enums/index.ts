/**
 * DynamicSchema 枚举定义
 */

// 字段数据类型
export enum FieldDataType {
  String = 0,
  Int = 1,
  Long = 2,
  Decimal = 3,
  Float = 4,
  Double = 5,
  Boolean = 6,
  DateTime = 7,
  DateOnly = 8,
  TimeOnly = 9,
  Guid = 10,
  Binary = 11,
  Enum = 12,
  Json = 13,
  Array = 14,
  Reference = 15,
}

export const fieldDataTypeEnum = [
  { label: 'String', value: FieldDataType.String, color: '#1890ff' },
  { label: 'Int', value: FieldDataType.Int, color: '#52c41a' },
  { label: 'Long', value: FieldDataType.Long, color: '#52c41a' },
  { label: 'Decimal', value: FieldDataType.Decimal, color: '#faad14' },
  { label: 'Float', value: FieldDataType.Float, color: '#faad14' },
  { label: 'Double', value: FieldDataType.Double, color: '#faad14' },
  { label: 'Boolean', value: FieldDataType.Boolean, color: '#722ed1' },
  { label: 'DateTime', value: FieldDataType.DateTime, color: '#eb2f96' },
  { label: 'DateOnly', value: FieldDataType.DateOnly, color: '#eb2f96' },
  { label: 'TimeOnly', value: FieldDataType.TimeOnly, color: '#eb2f96' },
  { label: 'Guid', value: FieldDataType.Guid, color: '#13c2c2' },
  { label: 'Binary', value: FieldDataType.Binary, color: '#8c8c8c' },
  { label: 'Enum', value: FieldDataType.Enum, color: '#2f54eb' },
  { label: 'Json', value: FieldDataType.Json, color: '#fa541c' },
  { label: 'Array', value: FieldDataType.Array, color: '#a0d911' },
  { label: 'Reference', value: FieldDataType.Reference, color: '#f5222d' },
];

// 字段状态
export enum FieldStatus {
  Pending = 0,
  Active = 1,
  Promoted = 2,
  Failed = 3,
  Deprecated = 4,
}

export const fieldStatusEnum = [
  { label: '待处理', value: FieldStatus.Pending, color: '#d9d9d9' },
  { label: '活跃', value: FieldStatus.Active, color: '#52c41a' },
  { label: '已提升', value: FieldStatus.Promoted, color: '#1890ff' },
  { label: '失败', value: FieldStatus.Failed, color: '#f5222d' },
  { label: '已弃用', value: FieldStatus.Deprecated, color: '#8c8c8c' },
];

// 存储模式
export enum StorageMode {
  Json = 0,
  Physical = 1,
  Both = 2,
}

export const storageModeEnum = [
  { label: 'JSON存储', value: StorageMode.Json, color: '#1890ff' },
  { label: '物理列', value: StorageMode.Physical, color: '#52c41a' },
  { label: '混合模式', value: StorageMode.Both, color: '#faad14' },
];

// 实体角色
export enum EntityRole {
  Primary = 0,
  Detail = 1,
  SubDetail = 2,
  Reference = 3,
}

export const entityRoleEnum = [
  { label: '主表', value: EntityRole.Primary, color: '#1890ff' },
  { label: '从表', value: EntityRole.Detail, color: '#52c41a' },
  { label: '子从表', value: EntityRole.SubDetail, color: '#faad14' },
  { label: '引用表', value: EntityRole.Reference, color: '#722ed1' },
];

// 表单Schema来源类型
export enum FormSchemaSourceType {
  DynamicEntity = 0,
  HostEntity = 1,
  Standalone = 2,
}

export const formSchemaSourceTypeEnum = [
  { label: '动态实体', value: FormSchemaSourceType.DynamicEntity, color: '#1890ff' },
  { label: '宿主实体', value: FormSchemaSourceType.HostEntity, color: '#52c41a' },
  { label: '独立表单', value: FormSchemaSourceType.Standalone, color: '#722ed1' },
];

// 索引类型
export enum IndexType {
  None = 0,
  Normal = 1,
  Unique = 2,
  Clustered = 3,
}

export const indexTypeEnum = [
  { label: '无索引', value: IndexType.None, color: '#d9d9d9' },
  { label: '普通索引', value: IndexType.Normal, color: '#1890ff' },
  { label: '唯一索引', value: IndexType.Unique, color: '#52c41a' },
  { label: '聚集索引', value: IndexType.Clustered, color: '#faad14' },
];

// 关系类型
export enum RelationType {
  OneToOne = 0,
  OneToMany = 1,
  ManyToMany = 2,
}

export const relationTypeEnum = [
  { label: '一对一', value: RelationType.OneToOne, color: '#1890ff' },
  { label: '一对多', value: RelationType.OneToMany, color: '#52c41a' },
  { label: '多对多', value: RelationType.ManyToMany, color: '#faad14' },
];

// 级联删除行为
export enum CascadeDeleteBehavior {
  Restrict = 0,
  Cascade = 1,
  SetNull = 2,
  SetDefault = 3,
}

export const cascadeDeleteBehaviorEnum = [
  { label: '限制删除', value: CascadeDeleteBehavior.Restrict, color: '#f5222d' },
  { label: '级联删除', value: CascadeDeleteBehavior.Cascade, color: '#faad14' },
  { label: '设为NULL', value: CascadeDeleteBehavior.SetNull, color: '#1890ff' },
  { label: '设为默认值', value: CascadeDeleteBehavior.SetDefault, color: '#52c41a' },
];
