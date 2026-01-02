/**
 * AtlTemplate 类型定义
 * 基于可视化打印模板设计器API对接文档
 */

// 元素类型枚举
export enum ElementType {
  Text = 1,           // 文本元素
  MultilineText = 2,  // 多行文本元素
  Barcode = 3,        // 条码元素
  Image = 4,          // 图片元素
  Shape = 5,          // 图形元素
  Table = 6,          // 表格元素
  QRCode = 7,         // 二维码元素
  DataMatrix = 8,     // 数据矩阵码元素
  Line = 9            // 线条元素
}

// 布局类型枚举
export enum LayoutType {
  Report = 0,      // 报表布局（自由定位）
  LabelGrid = 1    // 标签网格布局（批量打印）
}

// 打印机语言类型枚举（匹配后端定义）
export enum PrintTemplateType {
  Report = 5,  // 报表类型
  ZPL = 10,    // ZPL (Zebra Programming Language)
  EPL = 15,    // EPL (Eltron Programming Language)
  CPCL = 20,   // CPCL (Common Printer Command Language)
  TSPL = 25    // TSPL (TSC Printer Language)
}

// 文本对齐方式
export enum TextAlignment {
  Left = 0,
  Center = 1,
  Right = 2,
  Justify = 3
}

// 条码类型
export enum BarcodeType {
  Code128 = 0,
  Code39 = 1,
  EAN13 = 2,
  QRCode = 3,
  DataMatrix = 4,
  PDF417 = 5
}

// 条码文本位置（匹配后端定义）
export enum TextPosition {
  None = 0,
  Above = 1,  // 文本在条码上方
  Below = 2   // 文本在条码下方
}

// 边框/线条样式（匹配后端定义）
export enum BorderStyle {
  Solid = 0,   // 实线
  Dashed = 1,  // 虚线
  Dotted = 2   // 点线
}

// 垂直对齐方式（匹配后端定义）
export enum VerticalAlignment {
  Top = 0,     // 顶部对齐
  Middle = 1,  // 居中对齐
  Bottom = 2   // 底部对齐
}

// 图片适配模式
export enum FitMode {
  Contain = 0,  // 包含（保持比例）
  Cover = 1,    // 覆盖（裁剪）
  Fill = 2,     // 填充（拉伸）
  None = 3      // 原始大小
}

// 图形类型（匹配后端定义）
export enum ShapeType {
  Rectangle = 1,  // 矩形
  Circle = 2,     // 圆形/椭圆
  Line = 3,       // 直线
  Polygon = 4,    // 多边形
  Triangle = 5,   // 三角形
  Diamond = 6     // 菱形
}

// 三角形方向（匹配后端定义）
export enum TriangleDirection {
  Up = 1,      // 向上 ▲
  Down = 2,    // 向下 ▼
  Left = 3,    // 向左 ◀
  Right = 4    // 向右 ▶
}

// 数据源类型（匹配后端定义）
export enum DataSourceType {
  Array = 1,    // 静态数组
  Api = 2,      // REST API
  Sql = 3       // SQL查询
}

// 为了向后兼容，添加别名
export const DataSourceType_SQL = DataSourceType.Sql;
export const DataSourceType_API = DataSourceType.Api;

// 数据库类型枚举（匹配后端定义）
export enum DatabaseType {
  SqlServer = 0,    // SQL Server
  MySql = 1,        // MySQL
  PostgreSql = 2,   // PostgreSQL
  Sqlite = 3,       // SQLite
  Oracle = 4        // Oracle
}

// 图片格式
export enum ImageFormat {
  PNG = 0,
  JPEG = 1,
  BMP = 2
}

// 绑定模式枚举
export enum BindingMode {
  Static = 0,       // 静态值
  DataPath = 1,     // 数据路径
  Expression = 2    // 表达式
}

// 网格布局模式枚举
export enum GridLayoutMode {
  Fixed = 0,    // 固定行列模式
  Dynamic = 1   // 动态行列模式（根据数据源自动计算）
}

// 网格布局方向枚举
export enum GridDirection {
  RowFirst = 0,     // 行优先（从左到右，从上到下填充）
  ColumnFirst = 1   // 列优先（从上到下，从左到右填充）
}

// 属性绑定接口
export interface PropertyBinding {
  mode: BindingMode;            // 绑定模式
  staticValue?: any;            // 静态值（当mode=Static时使用）
  dataPath?: string;            // 数据路径（当mode=DataPath时使用，如：order.customerName）
  expression?: string;          // 表达式（当mode=Expression时使用，支持函数：upper(customer.name)）
  format?: string;              // 格式化字符串（可选，如日期格式：yyyy-MM-dd）
  fallbackValue?: any;          // 回退值（可选，当绑定失败时使用）
  description?: string;         // 描述信息（可选，用于文档说明）
}

// ==================== 核心数据结构 ====================

// 位置
export interface Position {
  x: number;  // X坐标（毫米）
  y: number;  // Y坐标（毫米）
}

// 尺寸
export interface Size {
  width: number;   // 宽度（毫米）
  height: number;  // 高度（毫米）
}

// 字体配置
export interface FontConfig {
  family: string;       // 字体名称
  size: number;         // 字体大小（磅）
  bold?: boolean;       // 是否粗体
  italic?: boolean;     // 是否斜体
  underline?: boolean;  // 是否下划线
}

// 模板元数据
export interface TemplateMetadata {
  id?: string;              // 模板唯一标识
  name?: string;            // 模板名称
  description?: string;     // 模板描述
  created?: string;         // 创建时间（ISO 8601）
  modified?: string;        // 修改时间（ISO 8601）
  author?: string;          // 创建者
  templateVersion?: string; // 版本号
  tags?: string[];          // 标签
}

// 画布配置
export interface CanvasConfig {
  width: number;            // 画布宽度（毫米）- 用于元素布局和设计区域定义
  height: number;           // 画布高度（毫米）- 用于元素布局和设计区域定义
  dpi: number;              // 分辨率（203/300）
  backgroundColor?: string; // 背景色（#FFFFFF）
  paperWidth?: number;      // 纸张宽度（毫米，可选）- 实际打印纸张的物理宽度，如果未设置则使用width
  paperHeight?: number;     // 纸张高度（毫米，可选）- 实际打印纸张的物理高度，如果未设置则使用height
  unit?: string;            // 单位（默认mm）
}

// ==================== 元素属性 ====================

// 文本属性
export interface TextProperties {
  elementType?: string;             // 元素类型标识（后端识别用）
  text?: string;                    // 文本内容（基础属性，后端兼容）
  textBinding?: PropertyBinding;    // 文本绑定（优先级更高）
  font: FontConfig;                 // 字体配置
  alignment?: TextAlignment;        // 对齐方式
  color?: string;                   // 文字颜色（前景色）
  backgroundColor?: string;         // 背景颜色
  rotation?: number;                // 旋转角度（0/90/180/270）
  forceGraphicMode?: boolean;       // 强制位图模式（用于特殊字符）
}

// 多行文本属性
export interface MultilineTextProperties extends TextProperties {
  autoWrap?: boolean;           // 是否自动折行（默认true）
  maxLines?: number;            // 最大行数（0表示无限制）
  lineHeight?: number;          // 行高倍数（默认1.2）
  breakWords?: boolean;         // 是否允许单词内断行（默认false）
  ellipsis?: boolean;           // 超出时是否显示省略号（默认false）
}

// 条码属性
export interface BarcodeProperties {
  elementType?: string;             // 元素类型标识（后端识别用）
  content?: string;                 // 条码内容（基础属性，后端兼容）
  contentBinding?: PropertyBinding; // 内容绑定（优先级更高）
  barcodeType: BarcodeType;         // 条码类型
  height?: number;                  // 条码高度（毫米）
  showText?: boolean;               // 是否显示文本
  textPosition?: TextPosition;      // 文本位置
  moduleWidth?: number;             // 模块宽度（像素）【前端渲染用】
  rotation?: number;                // 旋转角度
  forceGraphicMode?: boolean;       // 强制使用位图模式渲染条码（用于精确控制尺寸）
  forceGraphicModeBinding?: PropertyBinding; // 强制位图模式绑定（优先级更高）
}

// 图片属性
export interface ImageProperties {
  elementType?: string;             // 元素类型标识（后端识别用）
  source?: string;                  // 图片源（基础属性，URL/Base64）
  sourceBinding?: PropertyBinding;  // 图片源绑定（优先级更高）
  maintainAspectRatio?: boolean;    // 是否保持宽高比（后端兼容，默认true）
  fitMode?: FitMode;                // 适配模式（前端增强功能）
  rotation?: number;                // 旋转角度（前端特有）
}

// 单元格数据
export interface TableCell {
  content?: string;                 // 单元格内容（基础属性）
  contentBinding?: PropertyBinding; // 内容绑定（优先级更高）
  rowSpan: number;                  // 行合并数
  colSpan: number;                  // 列合并数
  merged: boolean;                  // 是否被合并（被合并的单元格不显示）
}

// 表格属性
export interface TableProperties {
  elementType?: string;         // 元素类型标识（后端识别用）
  rows: number;                 // 行数
  columns: number;              // 列数
  cells: TableCell[][];         // 单元格数据（二维数组）
  rowHeights: number[];         // 每行的高度（mm）
  colWidths: number[];          // 每列的宽度（mm）
  showBorders?: boolean;        // 是否显示边框
  borderStyle?: BorderStyle;    // 边框样式
  borderWidth?: number;         // 边框宽度（mm）
  borderColor?: string;         // 边框颜色（十六进制）
  cellPadding?: number;         // 单元格内边距（mm）
  font?: FontConfig;            // 字体配置
  alignment?: TextAlignment;    // 文本对齐方式
  verticalAlignment?: VerticalAlignment;  // 垂直对齐方式
}

// 二维码属性
export interface QRCodeProperties {
  elementType?: string;               // 元素类型标识（后端识别用）
  content?: string;                   // 二维码内容（基础属性）
  contentBinding?: PropertyBinding;   // 内容绑定（优先级更高）
  errorCorrectionLevel?: number;      // 纠错等级：0=L(7%), 1=M(15%), 2=Q(25%), 3=H(30%)
  moduleSize?: number;                // 模块大小（像素）
  foregroundColor?: string;           // 前景色（十六进制）
  backgroundColor?: string;           // 背景色（十六进制）
}

// 数据矩阵码属性
export interface DataMatrixProperties {
  elementType?: string;               // 元素类型标识（后端识别用）
  content?: string;                   // 数据矩阵码内容（基础属性）
  contentBinding?: PropertyBinding;   // 内容绑定（优先级更高）
  moduleSize?: number;                // 模块大小（像素）
  foregroundColor?: string;           // 前景色（十六进制）
  backgroundColor?: string;           // 背景色（十六进制）
}

// 线条属性
export interface LineProperties {
  elementType?: string;               // 元素类型标识（后端识别用）
  startX: number;                     // 起始点X坐标（毫米）
  startY: number;                     // 起始点Y坐标（毫米）
  endX: number;                       // 终止点X坐标（毫米）
  endY: number;                       // 终止点Y坐标（毫米）
  strokeWidth?: number;               // 线条宽度（毫米）
  strokeColor?: string;               // 线条颜色（十六进制）
  strokeStyle?: BorderStyle;          // 线条样式
}

// 图形元素属性（匹配后端定义）
export interface ShapeProperties {
  elementType?: string;               // 元素类型标识（后端识别用）
  shapeType: ShapeType;               // 图形类型
  fillColor?: string;                 // 填充颜色（十六进制）
  strokeColor?: string;               // 边框颜色（十六进制）
  strokeWidth?: number;               // 边框宽度（毫米，默认1）
  borderRadius?: number;              // 圆角半径（仅矩形有效，默认0）
  triangleDirection?: TriangleDirection;  // 三角形方向（仅三角形有效，默认Up）
}

// 元素属性联合类型
export type ElementProperties =
  | TextProperties
  | MultilineTextProperties
  | BarcodeProperties
  | ImageProperties
  | ShapeProperties
  | TableProperties
  | QRCodeProperties
  | DataMatrixProperties
  | LineProperties;

// ==================== 元素定义 ====================

// 条件渲染配置
export interface ConditionConfig {
  expression: string;           // Scriban条件表达式
  invertCondition?: boolean;    // 是否反转条件逻辑
}

// 循环渲染配置
export interface LoopConfig {
  dataSource: string;          // 数据源名称
  itemVariable?: string;       // 当前项变量名（默认"item"）
  indexVariable?: string;      // 索引变量名（默认"index"）
  maxIterations?: number;      // 最大迭代次数（默认100）
}

// ATL元素
export interface AtlElement {
  id: string;                       // 元素唯一标识
  type: ElementType;                // 元素类型
  position: Position;               // 元素位置
  size: Size;                       // 元素尺寸
  properties: ElementProperties;    // 元素属性
  dataBinding?: string;             // 数据绑定表达式（已废弃，使用properties中的PropertyBinding）
  zIndex: number;                   // 层级顺序
  visible: PropertyBinding;         // 是否可见（支持动态显隐）
  locked?: boolean;                 // 是否锁定（锁定后不可拖动、不可调整大小）
  /**
   * @deprecated 已废弃，请使用visible字段的PropertyBinding实现条件显示
   */
  condition?: ConditionConfig;      // 条件渲染配置
  loop?: LoopConfig;                // 循环渲染配置
  section?: SectionType;            // 所属区域（页头/内容/页尾），默认为Content
  sectionId?: string;               // 所属内容区域的ID（多内容区域模式下使用）
}

// ==================== 数据源定义 ====================

/**
 * 数据源参数（匹配后端AtlDataSourceParameter）
 */
export interface AtlDataSourceParameter {
  name?: string;              // 参数名称
  type?: string;              // 参数类型（string/number/boolean/datetime等）
  defaultValue?: any;         // 参数默认值
  required?: boolean;         // 是否必需
}

/**
 * 缓存配置（匹配后端AtlCacheConfig）
 */
export interface AtlCacheConfig {
  enabled?: boolean;          // 是否启用缓存
  ttlSeconds?: number;        // 过期时间（秒）
  cacheKey?: string;          // 缓存键
}

/**
 * API认证配置（匹配后端ApiAuthConfig）
 */
export interface ApiAuthConfig {
  type?: string;              // 认证类型（Bearer/Basic/ApiKey等）
  token?: string;             // 认证令牌
  username?: string;          // 用户名（Basic认证）
  password?: string;          // 密码（Basic认证）
  apiKey?: string;            // API密钥
  apiKeyHeader?: string;      // API密钥头名称
}

/**
 * ATL数据源（完全匹配后端AtlDataSource结构）
 * 支持三种数据源类型：Array(静态数组)、API(REST接口)、SQL(数据库查询)
 */
export interface AtlDataSource {
  // 基础字段
  name?: string;                                    // 数据源名称（唯一标识）
  type?: DataSourceType;                            // 数据源类型

  // Array类型专用字段
  data?: Record<string, any>[];                     // 静态数组数据

  // API类型专用字段（匹配后端定义）
  url?: string;                                     // API端点URL（后端字段名：Url）
  method?: string;                                  // HTTP方法（后端字段名：Method，默认GET）
  headers?: Record<string, string>;                 // 请求头（后端类型：Dictionary<string, string>）
  auth?: ApiAuthConfig;                             // 认证配置（后端字段名：Auth）
  timeoutSeconds?: number;                          // 超时时间秒数（后端字段名：TimeoutSeconds，默认30）
  body?: string;                                    // 请求体（后端字段名：Body）
  contentType?: string;                             // 内容类型（后端字段名：ContentType，默认application/json）

  // 兼容旧字段（将逐步废弃）
  /** @deprecated 请使用 url 字段 */
  apiEndpoint?: string;
  /** @deprecated 请使用 method 字段 */
  httpMethod?: string;

  // SQL类型专用字段
  connectionString?: string;                        // 数据库连接字符串
  query?: string;                                   // SQL查询语句
  databaseType?: DatabaseType;                      // 数据库类型：0=SqlServer, 1=MySql, 2=PostgreSql, 3=Sqlite, 4=Oracle

  // 通用字段
  parameters?: AtlDataSourceParameter[];            // 参数列表
  cache?: AtlCacheConfig;                           // 缓存配置
}

/**
 * 数据源测试结果（匹配后端DataSourceTestResult）
 */
export interface DataSourceTestResult {
  success?: boolean;                                // 是否成功
  responseTimeMs?: number;                          // 响应时间（毫秒）
  message?: string;                                 // 测试消息
  diagnostics?: Record<string, any>;                // 诊断信息
  sampleData?: any;                                 // 样本数据
}

// ==================== 向后兼容的类型别名 ====================

/**
 * @deprecated 请使用 AtlDataSourceParameter
 */
export type DataSourceParameter = AtlDataSourceParameter;

/**
 * @deprecated 旧的配置结构，已废弃
 */
export interface SqlDataSourceConfig {
  connectionString: string;
  query: string;
  parameters?: Record<string, any>;
}

/**
 * @deprecated 旧的配置结构，已废弃
 */
export interface ApiDataSourceConfig {
  url: string;
  method: string;
  headers?: Record<string, string>;
  body?: any;
  auth?: Record<string, any>;
  responseMapping?: Record<string, string>;
}

/**
 * @deprecated 旧的配置结构，已废弃
 */
export interface ArrayDataSourceConfig {
  data: any[];
}

/**
 * @deprecated 旧的配置联合类型，已废弃
 */
export type DataSourceConfig = SqlDataSourceConfig | ApiDataSourceConfig | ArrayDataSourceConfig | Record<string, any>;

// ==================== 模板定义 ====================

// 自动布局配置接口
export interface AutoLayoutConfig {
  direction: GridDirection;            // 布局方向
  fixedColumns?: number;               // 固定列数，自动计算行数
  fixedRows?: number;                  // 固定行数，自动计算列数
  maxCells: number;                    // 最大单元格数（默认1000）
}

// 标签网格布局
export interface LabelGridLayout {
  mode: GridLayoutMode;
  rows: PropertyBinding;               // 行数（支持绑定）
  columns: PropertyBinding;            // 列数（支持绑定）
  autoLayout?: AutoLayoutConfig;       // 自动布局配置
  labelWidth: number;                  // 单个标签宽度（毫米）
  labelHeight: number;                 // 单个标签高度（毫米）
  spacingX: number;                    // 水平间距（毫米）
  spacingY: number;                    // 垂直间距（毫米）
  offsetX: number;                     // 水平偏移（毫米）
  offsetY: number;                     // 垂直偏移（毫米）
  dataSourceName: string;              // 数据源名称
  cellTemplate: AtlElement[];          // 单元格模板元素列表（完整的元素对象作为模板）
  cellVariable: string;                // 当前单元格数据变量名
  indexVariable: string;               // 当前索引变量名
  rowVariable: string;                 // 当前行变量名
  columnVariable: string;              // 当前列变量名
}

// ATL模板（核心）
export interface AtlTemplate {
  version: string;                                // ATL版本
  metadata: TemplateMetadata;                     // 模板元数据
  canvas: CanvasConfig;                           // 画布配置
  layoutType: LayoutType;                         // 布局类型
  dataSources: Record<string, AtlDataSource>;     // 数据源字典
  elements: AtlElement[];                         // 元素列表
  /**
   * @deprecated 已废弃，请使用 sections.content.labelGridLayout
   */
  labelGridLayout?: LabelGridLayout;              // 网格布局配置（已废弃）
  variables?: Record<string, any>;                // 模板变量
  computedVariables?: Record<string, string>;     // 计算变量（Scriban表达式）
  sections?: TemplateSections;                    // 区域配置（页头/页尾功能）
}

// ==================== API请求/响应类型 ====================

// 渲染请求
export interface RenderRequest {
  template?: AtlTemplate;        // 模板对象
  templateId?: string;           // 或使用模板ID
  sampleData?: Record<string, any>;  // 示例数据
  format?: ImageFormat;          // 图片格式
  scale?: number;                // 缩放比例
  backgroundColor?: string;      // 背景色
}

// 渲染响应
export interface RenderResponse {
  imageBase64: string;   // Base64编码的图片
  format: ImageFormat;   // 图片格式
  width: number;         // 图片宽度
  height: number;        // 图片高度
  mimeType: string;      // MIME类型
}

// 创建模板请求
export interface CreateTemplateRequest {
  code: string;                  // 模板编码
  name: string;                  // 模板名称
  template: AtlTemplate;         // ATL模板对象
  targetLanguage: PrintTemplateType;  // 目标打印机语言
  autoConvertToPrinterCode?: boolean; // 自动转换为打印机代码
}

// 更新模板请求
export interface UpdateTemplateRequest {
  template: AtlTemplate;         // ATL模板对象
  targetLanguage: PrintTemplateType;  // 目标打印机语言
  autoConvertToPrinterCode?: boolean; // 自动转换
  concurrencyStamp: string;      // 并发标记
}

// 转换请求
export interface ConvertRequest {
  template: AtlTemplate;         // ATL模板对象
  targetLanguage: PrintTemplateType;  // 目标打印机语言
  data?: Record<string, any>;    // 数据
}

// 转换响应
export interface ConvertResponse {
  printerCode: string;           // 打印机代码
  language: PrintTemplateType;   // 语言类型
  estimatedBytes: number;        // 预估字节数
}

// 验证响应
export interface ValidateResponse {
  isValid: boolean;              // 是否有效
  errors: string[];              // 错误列表
  warnings: string[];            // 警告列表
}

// ==================== 页头页尾功能（新增） ====================

// 区域类型枚举（匹配后端SectionType）
export enum SectionType {
  Header = 0,   // 页头区域
  Content = 1,  // 内容区域
  Footer = 2    // 页尾区域
}

// 区域打印频率枚举（匹配后端SectionPrintFrequency）
export enum SectionPrintFrequency {
  EveryPage = 0,      // 每页都打印
  FirstPageOnly = 1,  // 仅首页打印
  LastPageOnly = 2,   // 仅末页打印
  None = 3            // 不打印
}

// 分页原因枚举（匹配后端PageBreakReason）
export enum PageBreakReason {
  ContentOverflow = 0,  // 内容溢出导致分页
  LoopPagination = 1,   // 循环分页
  ManualBreak = 2       // 手动分页符
}

// Y轴定位模式枚举（多内容区域功能）
export enum YPositionMode {
  Fixed = 0,          // 固定定位 - 指定绝对Y坐标
  AfterPrevious = 1   // 自动跟随 - 相对于前一区域定位
}

// 内容区域分页模式枚举（多内容区域功能）
export enum ContentAreaPaginationMode {
  Parallel = 0,       // 并行分页 - 多个区域在同一页面渲染
  Sequential = 1      // 串联分页 - 区域按顺序渲染，超出时自动分页（默认）
}

// 区域配置接口（匹配后端SectionConfig）
export interface SectionConfig {
  // === 现有字段（保持不变） ===
  dataSourceKey?: string;                    // 数据源名称
  height?: number;                           // 区域高度（毫米），可选，默认自动计算
  printFrequency: SectionPrintFrequency;     // 打印频率
  followLoopPagination: boolean;             // 是否跟随循环分页
  elementIds?: string[];                     // 该区域包含的元素ID列表
  labelGridLayout?: LabelGridLayout;         // 网格布局配置（区域级别）

  // === 新增字段（多内容区域支持） ===
  id?: string;                               // 区域唯一标识符（用于元素归属）
  name?: string;                             // 区域名称（用于列表显示和识别）
  yPositionMode?: YPositionMode;             // Y轴定位模式
  fixedY?: number;                           // 固定Y坐标(mm) - yPositionMode=Fixed时使用
  spacingAfterPrevious?: number;             // 与前一区域的间距(mm) - yPositionMode=AfterPrevious时使用
}

// 模板区域配置接口（匹配后端TemplateSections）
export interface TemplateSections {
  header?: SectionConfig;                           // 页头区域
  contentAreas?: SectionConfig[];                   // 内容区域数组（改造重点）
  footer?: SectionConfig;                           // 页尾区域
  paginationMode?: ContentAreaPaginationMode;       // 分页模式

  // 兼容字段（用于自动迁移）
  content?: SectionConfig;                          // 旧版单内容区域（废弃，仅用于迁移）
}

// 分页上下文接口（匹配后端PaginationContext）
export interface PaginationContext {
  currentPage: number;           // 当前页码
  totalPages: number;            // 总页数
  isFirstPage: boolean;          // 是否首页
  isLastPage: boolean;           // 是否末页
  availableContentHeight: number; // 可用内容高度（毫米）
  breakReason: PageBreakReason;  // 分页原因
}

// 属性绑定上下文接口（匹配后端PropertyBindingContext）
export interface PropertyBindingContext {
  data?: Record<string, any>;           // 主数据对象
  pagination?: PaginationContext;       // 分页上下文（当启用多页时提供）
  variables?: Record<string, any>;      // 模板变量
  computedVariables?: Record<string, any>; // 计算变量
  item?: any;                           // 循环当前项
  index?: number;                       // 循环索引
}

// 单页渲染结果接口
export interface PageRenderResult {
  pageNumber: number;      // 页码
  imageBase64: string;     // Base64编码的图片
  mimeType: string;        // MIME类型
  width: number;           // 图片宽度（像素）
  height: number;          // 图片高度（像素）
  hasHeader: boolean;      // 是否包含页头
  hasFooter: boolean;      // 是否包含页尾
}

// 多页渲染输出接口
export interface MultiPageRenderOutput {
  pages: PageRenderResult[];  // 页面列表
  totalPages: number;         // 总页数
}

// 多数据源渲染请求接口
export interface RenderMultipleDataSourcesInput {
  templateId?: string;                          // 模板ID
  template?: AtlTemplate;                       // 或直接传递模板对象
  dataSources: Record<string, any>;             // 数据源字典
  format?: ImageFormat;                         // 图片格式
  scale?: number;                               // 缩放比例
  backgroundColor?: string;                     // 背景色
}

// ==================== 参数化功能类型导出 ====================

/**
 * 导出参数化相关类型
 * Phase 1: ATL模板系统参数化功能类型定义扩展
 */
export * from './parameter';
export * from './dataSourceParameter';
export * from './dependency';
export * from './validation';

// ==================== 参数化功能接口扩展 ====================

/**
 * 扩展AtlTemplate接口,添加参数化支持
 *
 * 此扩展接口添加了模板级参数定义功能,允许模板接受外部参数
 * 并通过参数映射将参数值传递给数据源
 */
export interface AtlTemplateWithParameters extends AtlTemplate {
  /** 模板级参数定义字典(键为参数名称) */
  parameters?: Record<string, import('./parameter').TemplateParameter>;
}

/**
 * 扩展AtlDataSource接口,添加依赖关系和参数映射
 *
 * 此扩展接口添加了数据源依赖管理和参数映射功能,
 * 支持数据源之间的执行顺序控制和参数传递
 */
export interface AtlDataSourceWithDependency extends AtlDataSource {
  /** 依赖的数据源列表(此数据源依赖的其他数据源名称数组) */
  dependsOn?: string[];

  /** 参数映射配置(键为数据源参数名,值为引用表达式) */
  parameterMappings?: Record<string, string>;

  /** 条件执行表达式(Scriban语法,决定此数据源是否执行) */
  condition?: string;

  /** API查询参数格式配置(用于API类型数据源) */
  queryParameters?: Record<string, import('./dataSourceParameter').ApiArrayParameterFormat>;
}
