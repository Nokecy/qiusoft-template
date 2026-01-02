# 问题执行流程重构 - 后端实施指南

> **创建时间**: 2025-01-11
> **状态**: 待实施
> **优先级**: 高
> **相关文档**: [设计文档](./2025-01-11-issue-execution-redesign.md)

## 📋 概述

本文档为后端开发人员提供详细的实施指南,用于实现问题执行流程重构所需的后端变更。

### 涉及的 NuGet 包

所有修改需要在以下 NuGet 包项目中进行:

- `Burn.Abp.Pdm.Domain` - 实体和枚举定义
- `Burn.Abp.Pdm.Application.Contracts` - DTO 和接口定义
- `Burn.Abp.Pdm.Application` - 应用服务实现
- `Burn.Abp.Pdm.EntityFrameworkCore` - EF Core 配置
- `Burn.Abp.Pdm.HttpApi` - HTTP API 控制器

### 数据库迁移位置

`D:\project\caimen\Burn.Abp.CM.Microservice\microservices\Burn.Abp.CM.Pdm.Host\Migrations\`

---

## 🎯 任务 1: 更新问题状态枚举

### 1.1 修改 IssueStatus 枚举

**文件位置**: `Burn.Abp.Pdm.Domain` 包中的枚举文件

**当前状态值推断**:
```csharp
public enum IssueStatus
{
    Open = 0,           // 打开（未指派）
    InProgress = 10,    // 处理中
    Resolved = 20,      // 已解决
    Closed = 30,        // 已关闭
    Cancelled = 40,     // 已取消
}
```

**需要添加的状态**:
```csharp
public enum IssueStatus
{
    Open = 0,              // 打开（未指派）
    PendingReceive = 5,    // 🆕 待接收（已指派未接收）
    InProgress = 10,       // 处理中
    Received = 15,         // 🆕 已接收（已接收未开始）
    Resolved = 20,         // 已解决
    Closed = 30,           // 已关闭
    Cancelled = 40,        // 已取消
}
```

### 1.2 状态流转规则

```
Open (0)
  └─ [指派] → PendingReceive (5)
       └─ [确认接收] → Received (15)
            └─ [开始处理] → InProgress (10)
                 └─ [解决/提交审批] → Resolved (20)
                      └─ [关闭] → Closed (30)
                           └─ [激活] → Open (0) 【创建新执行周期】
```

**关键说明**:
- `PendingReceive = 5`: 插入在 Open 和 InProgress 之间,表示已指派但处理人未确认
- `Received = 15`: 插入在 InProgress 和 Resolved 之间,表示处理人已确认但未开始处理
- 使用 5 和 15 这样的间隔值,保持与现有枚举值的兼容性

### 1.3 数据库迁移

**不需要**数据库迁移,因为 `Status` 字段类型为 `int`,直接支持新的枚举值。

---

## 🎯 任务 2: 创建执行周期表

### 2.1 创建 ProjectIssueExecutionCycle 实体

**文件位置**: `Burn.Abp.Pdm.Domain/ProjectManagement/项目问题/ProjectIssueExecutionCycle.cs`

```csharp
using System;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace Burn.Abp.Pdm.ProjectManagement.项目问题
{
    /// <summary>
    /// 问题执行周期
    /// 记录问题的每次激活和处理周期
    /// </summary>
    public class ProjectIssueExecutionCycle : FullAuditedAggregateRoot<Guid>, IMultiTenant
    {
        public virtual Guid? TenantId { get; set; }

        /// <summary>
        /// 关联的问题ID
        /// </summary>
        public virtual Guid ProjectIssueId { get; set; }

        /// <summary>
        /// 问题编码（冗余字段,方便查询）
        /// </summary>
        public virtual string IssueCode { get; set; }

        /// <summary>
        /// 周期序号（第几次执行,从1开始）
        /// </summary>
        public virtual int CycleNumber { get; set; }

        /// <summary>
        /// 周期开始时间（激活时间）
        /// </summary>
        public virtual DateTime StartTime { get; set; }

        /// <summary>
        /// 周期结束时间（关闭时间）
        /// </summary>
        public virtual DateTime? EndTime { get; set; }

        /// <summary>
        /// 周期状态
        /// 0=进行中 1=已完成 2=已取消
        /// </summary>
        public virtual int Status { get; set; }

        /// <summary>
        /// 激活原因（仅对周期号>1有效）
        /// </summary>
        public virtual string? ActivationReason { get; set; }

        /// <summary>
        /// 本周期的解决方案
        /// </summary>
        public virtual string? Resolution { get; set; }

        /// <summary>
        /// 本周期备注
        /// </summary>
        public virtual string? Remark { get; set; }

        protected ProjectIssueExecutionCycle()
        {
        }

        public ProjectIssueExecutionCycle(
            Guid id,
            Guid projectIssueId,
            string issueCode,
            int cycleNumber,
            DateTime startTime
        ) : base(id)
        {
            ProjectIssueId = projectIssueId;
            IssueCode = issueCode;
            CycleNumber = cycleNumber;
            StartTime = startTime;
            Status = 0; // 进行中
        }

        /// <summary>
        /// 完成周期
        /// </summary>
        public void Complete(string? resolution)
        {
            EndTime = DateTime.Now;
            Status = 1;
            Resolution = resolution;
        }

        /// <summary>
        /// 取消周期
        /// </summary>
        public void Cancel()
        {
            EndTime = DateTime.Now;
            Status = 2;
        }
    }
}
```

### 2.2 EF Core 配置

**文件位置**: `Burn.Abp.Pdm.EntityFrameworkCore/EntityFrameworkCore/PdmDbContextModelCreatingExtensions.cs`

```csharp
builder.Entity<ProjectIssueExecutionCycle>(b =>
{
    b.ToTable("pdm_ProjectIssueExecutionCycles");
    b.ConfigureByConvention();

    // 配置字段
    b.Property(x => x.IssueCode).IsRequired().HasMaxLength(256);
    b.Property(x => x.CycleNumber).IsRequired();
    b.Property(x => x.StartTime).IsRequired();
    b.Property(x => x.EndTime);
    b.Property(x => x.Status).IsRequired();
    b.Property(x => x.ActivationReason).HasMaxLength(2000);
    b.Property(x => x.Resolution).HasMaxLength(2000);
    b.Property(x => x.Remark).HasMaxLength(2000);

    // 索引
    b.HasIndex(x => x.ProjectIssueId);
    b.HasIndex(x => new { x.ProjectIssueId, x.CycleNumber }).IsUnique();

    // 配置审计字段
    b.ApplyObjectExtensionMappings();
});

// 添加与 ProjectIssue 的导航属性（如需要）
```

### 2.3 数据库迁移

在 `Burn.Abp.CM.Pdm.Host` 项目中创建迁移:

```bash
cd D:\project\caimen\Burn.Abp.CM.Microservice\microservices\Burn.Abp.CM.Pdm.Host
dotnet ef migrations add AddProjectIssueExecutionCycleTable
```

---

## 🎯 任务 3: 调整执行记录表

### 3.1 为 ProjectIssueWorkflowBookmark 添加字段

**文件位置**: `Burn.Abp.Pdm.Domain/ProjectManagement/项目问题/ProjectIssueWorkflowBookmark.cs`

**需要添加的字段**:

```csharp
/// <summary>
/// 关联的执行周期ID
/// </summary>
public virtual Guid? ExecutionCycleId { get; set; }

/// <summary>
/// 执行备注
/// </summary>
public virtual string? ExecutionRemark { get; set; }

/// <summary>
/// 附件ID列表（JSON 数组字符串）
/// 格式: ["guid1","guid2"]
/// </summary>
public virtual string? AttachmentIds { get; set; }
```

### 3.2 EF Core 配置更新

**文件位置**: `Burn.Abp.Pdm.EntityFrameworkCore/EntityFrameworkCore/PdmDbContextModelCreatingExtensions.cs`

```csharp
// 在现有 ProjectIssueWorkflowBookmark 配置中添加:
b.Property(x => x.ExecutionCycleId);
b.Property(x => x.ExecutionRemark).HasMaxLength(2000);
b.Property(x => x.AttachmentIds).HasMaxLength(4000);

// 添加索引
b.HasIndex(x => x.ExecutionCycleId);
```

### 3.3 数据库迁移

```bash
cd D:\project\caimen\Burn.Abp.CM.Microservice\microservices\Burn.Abp.CM.Pdm.Host
dotnet ef migrations add AddExecutionCycleFieldsToWorkflowBookmark
```

---

## 🎯 任务 4: 更新执行操作接口

### 4.1 创建通用执行操作 DTO

**文件位置**: `Burn.Abp.Pdm.Application.Contracts/ProjectManagement/项目问题/Dtos/ProjectIssueExecutionDto.cs`

```csharp
using System;
using System.ComponentModel.DataAnnotations;

namespace Burn.Abp.Pdm.ProjectManagement.项目问题.Dtos
{
    /// <summary>
    /// 问题执行操作基础DTO
    /// </summary>
    public class ProjectIssueExecutionDto
    {
        [Required]
        public Guid Id { get; set; }

        /// <summary>
        /// 执行备注
        /// </summary>
        [StringLength(2000)]
        public string? Remark { get; set; }

        /// <summary>
        /// 附件ID列表
        /// </summary>
        public Guid[]? AttachmentIds { get; set; }
    }

    /// <summary>
    /// 指派操作 DTO
    /// </summary>
    public class AssignIssueDto : ProjectIssueExecutionDto
    {
        [Required]
        [StringLength(50)]
        public string HandlerCode { get; set; }

        [StringLength(256)]
        public string? HandlerName { get; set; }
    }

    /// <summary>
    /// 确认接收操作 DTO
    /// </summary>
    public class ConfirmReceiveIssueDto : ProjectIssueExecutionDto
    {
    }

    /// <summary>
    /// 开始处理操作 DTO
    /// </summary>
    public class StartProcessingIssueDto : ProjectIssueExecutionDto
    {
    }

    /// <summary>
    /// 解决问题操作 DTO
    /// </summary>
    public class ResolveIssueDto : ProjectIssueExecutionDto
    {
        [Required]
        [StringLength(2000)]
        public string Resolution { get; set; }

        /// <summary>
        /// 是否需要审批（由前端传入）
        /// </summary>
        public bool RequiresApproval { get; set; }
    }

    /// <summary>
    /// 关闭问题操作 DTO
    /// </summary>
    public class CloseIssueDto : ProjectIssueExecutionDto
    {
    }

    /// <summary>
    /// 激活问题操作 DTO
    /// </summary>
    public class ActivateIssueDto : ProjectIssueExecutionDto
    {
        [Required]
        [StringLength(2000)]
        public string ActivationReason { get; set; }
    }
}
```

### 4.2 更新 IProjectIssueAppService 接口

**文件位置**: `Burn.Abp.Pdm.Application.Contracts/ProjectManagement/项目问题/IProjectIssueAppService.cs`

```csharp
// 更新现有方法签名,添加 DTO 参数:

Task AssignAsync(AssignIssueDto input);

Task ConfirmReceiveAsync(ConfirmReceiveIssueDto input);

Task StartProcessingAsync(StartProcessingIssueDto input);

Task ResolveAsync(ResolveIssueDto input);

Task CloseAsync(CloseIssueDto input);

Task ActivateAsync(ActivateIssueDto input);

// 新增获取执行记录方法:
Task<ListResultDto<ProjectIssueExecutionRecordDto>> GetExecutionRecordsAsync(Guid id);

// 新增获取周期列表方法:
Task<ListResultDto<ProjectIssueExecutionCycleDto>> GetExecutionCyclesAsync(Guid id);
```

### 4.3 实现应用服务方法

**文件位置**: `Burn.Abp.Pdm.Application/ProjectManagement/项目问题/ProjectIssueAppService.cs`

#### 4.3.1 激活方法实现示例

```csharp
public async Task ActivateAsync(ActivateIssueDto input)
{
    var issue = await Repository.GetAsync(input.Id);

    // 验证状态
    if (issue.Status != (int)IssueStatus.Closed)
    {
        throw new BusinessException("只有已关闭的问题才能激活");
    }

    // 获取当前最大周期号
    var maxCycleNumber = await _executionCycleRepository
        .Where(c => c.ProjectIssueId == issue.Id)
        .MaxAsync(c => (int?)c.CycleNumber) ?? 0;

    // 创建新执行周期
    var newCycle = new ProjectIssueExecutionCycle(
        GuidGenerator.Create(),
        issue.Id,
        issue.IssueCode,
        maxCycleNumber + 1,
        Clock.Now
    );
    newCycle.ActivationReason = input.ActivationReason;
    newCycle.Remark = input.Remark;
    await _executionCycleRepository.InsertAsync(newCycle);

    // 更新问题状态为 Open
    issue.Status = (int)IssueStatus.Open;
    issue.Resolution = null;
    issue.ActualResolutionDate = null;
    await Repository.UpdateAsync(issue);

    // 创建执行记录
    await CreateExecutionRecordAsync(
        issue,
        newCycle.Id,
        "Activate",
        "激活问题",
        input.Remark,
        input.AttachmentIds
    );
}
```

#### 4.3.2 确认接收方法实现示例

```csharp
public async Task ConfirmReceiveAsync(ConfirmReceiveIssueDto input)
{
    var issue = await Repository.GetAsync(input.Id);

    // 验证状态
    if (issue.Status != (int)IssueStatus.PendingReceive)
    {
        throw new BusinessException("只有待接收状态的问题才能确认接收");
    }

    // 验证权限（只有处理人可以确认接收）
    var currentUserCode = CurrentUser.UserName; // 或从其他地方获取
    if (issue.HandlerCode != currentUserCode)
    {
        throw new BusinessException("只有处理人可以确认接收");
    }

    // 获取当前执行周期
    var currentCycle = await GetCurrentExecutionCycleAsync(issue.Id);

    // 更新问题状态
    issue.Status = (int)IssueStatus.Received;
    await Repository.UpdateAsync(issue);

    // 创建执行记录
    await CreateExecutionRecordAsync(
        issue,
        currentCycle?.Id,
        "ConfirmReceive",
        "确认接收",
        input.Remark,
        input.AttachmentIds
    );
}
```

#### 4.3.3 开始处理方法实现示例

```csharp
public async Task StartProcessingAsync(StartProcessingIssueDto input)
{
    var issue = await Repository.GetAsync(input.Id);

    // 验证状态
    if (issue.Status != (int)IssueStatus.Received)
    {
        throw new BusinessException("只有已接收状态的问题才能开始处理");
    }

    // 验证权限
    var currentUserCode = CurrentUser.UserName;
    if (issue.HandlerCode != currentUserCode)
    {
        throw new BusinessException("只有处理人可以开始处理");
    }

    // 获取当前执行周期
    var currentCycle = await GetCurrentExecutionCycleAsync(issue.Id);

    // 更新问题状态
    issue.Status = (int)IssueStatus.InProgress;
    await Repository.UpdateAsync(issue);

    // 创建执行记录
    await CreateExecutionRecordAsync(
        issue,
        currentCycle?.Id,
        "StartProcessing",
        "开始处理",
        input.Remark,
        input.AttachmentIds
    );
}
```

#### 4.3.4 辅助方法

```csharp
/// <summary>
/// 获取问题的当前执行周期
/// </summary>
private async Task<ProjectIssueExecutionCycle?> GetCurrentExecutionCycleAsync(Guid issueId)
{
    return await _executionCycleRepository
        .Where(c => c.ProjectIssueId == issueId && c.Status == 0) // 进行中
        .OrderByDescending(c => c.CycleNumber)
        .FirstOrDefaultAsync();
}

/// <summary>
/// 创建执行记录
/// </summary>
private async Task CreateExecutionRecordAsync(
    ProjectIssue issue,
    Guid? cycleId,
    string actionType,
    string actionName,
    string? remark,
    Guid[]? attachmentIds)
{
    var record = new ProjectIssueWorkflowBookmark
    {
        // ... 设置基本字段
        ExecutionCycleId = cycleId,
        ExecutionRemark = remark,
        AttachmentIds = attachmentIds != null && attachmentIds.Length > 0
            ? System.Text.Json.JsonSerializer.Serialize(attachmentIds)
            : null,
        // ... 其他字段
    };

    await _workflowBookmarkRepository.InsertAsync(record);
}
```

---

## 🎯 任务 5: 添加问题类型审批配置

### 5.1 创建 IssueType 实体（如不存在）

**文件位置**: `Burn.Abp.Pdm.Domain/ProjectManagement/项目问题/IssueType.cs`

如果已存在,添加以下字段:

```csharp
/// <summary>
/// 是否需要审批
/// </summary>
public virtual bool RequiresApproval { get; set; }

/// <summary>
/// 工作流定义ID（用于审批流程）
/// </summary>
public virtual string? WorkflowDefinitionId { get; set; }
```

### 5.2 数据库迁移

```bash
cd D:\project\caimen\Burn.Abp.CM.Microservice\microservices\Burn.Abp.CM.Pdm.Host
dotnet ef migrations add AddApprovalConfigToIssueType
```

---

## 🎯 任务 6: 任务关联字段（已完成）

根据最新迁移文件 `20251210093726_AddTaskCodeAndExpectedResolvedDateToProjectIssue.cs`,以下字段已添加:

- ✅ `TaskCode` (nvarchar(128), nullable)
- ✅ `TaskId` 索引已创建

**无需额外操作**。

---

## 📝 DTO 返回字段补充

### ProjectIssueDto 需要添加的字段

**文件位置**: `Burn.Abp.Pdm.Application.Contracts/ProjectManagement/项目问题/Dtos/ProjectIssueDto.cs`

```csharp
/// <summary>
/// 当前执行周期号
/// </summary>
public int? CurrentCycleNumber { get; set; }

/// <summary>
/// 总执行周期数
/// </summary>
public int TotalCycles { get; set; }

/// <summary>
/// 当前周期开始时间
/// </summary>
public DateTime? CycleStartTime { get; set; }

/// <summary>
/// 是否需要审批（从问题类型获取）
/// </summary>
public bool RequiresApproval { get; set; }
```

### 执行周期 DTO

**文件位置**: `Burn.Abp.Pdm.Application.Contracts/ProjectManagement/项目问题/Dtos/ProjectIssueExecutionCycleDto.cs`

```csharp
public class ProjectIssueExecutionCycleDto
{
    public Guid Id { get; set; }
    public Guid ProjectIssueId { get; set; }
    public string IssueCode { get; set; }
    public int CycleNumber { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime? EndTime { get; set; }
    public int Status { get; set; }
    public string StatusText { get; set; } // "进行中"/"已完成"/"已取消"
    public string? ActivationReason { get; set; }
    public string? Resolution { get; set; }
    public string? Remark { get; set; }
}
```

### 执行记录 DTO 更新

**文件位置**: `Burn.Abp.Pdm.Application.Contracts/ProjectManagement/项目问题/Dtos/ProjectIssueExecutionRecordDto.cs`

```csharp
// 在现有字段基础上添加:

/// <summary>
/// 关联的执行周期ID
/// </summary>
public Guid? ExecutionCycleId { get; set; }

/// <summary>
/// 执行周期号
/// </summary>
public int? CycleNumber { get; set; }

/// <summary>
/// 执行备注
/// </summary>
public string? ExecutionRemark { get; set; }

/// <summary>
/// 附件列表
/// </summary>
public List<AttachmentDto>? Attachments { get; set; }
```

---

## 🔄 AutoMapper 配置

**文件位置**: `Burn.Abp.Pdm.Application/ProjectManagement/项目问题/ProjectIssueApplicationAutoMapperProfile.cs`

```csharp
// 添加新的映射配置:

CreateMap<ProjectIssueExecutionCycle, ProjectIssueExecutionCycleDto>()
    .ForMember(dest => dest.StatusText, opt => opt.MapFrom(src =>
        src.Status == 0 ? "进行中" :
        src.Status == 1 ? "已完成" : "已取消"));

CreateMap<ProjectIssueWorkflowBookmark, ProjectIssueExecutionRecordDto>()
    .ForMember(dest => dest.Attachments, opt => opt.Ignore()); // 需要额外查询附件信息
```

---

## 🧪 测试检查清单

完成开发后,请确保:

- [ ] 所有枚举值正确更新
- [ ] 数据库迁移脚本正确生成和执行
- [ ] 所有执行操作接口支持备注和附件参数
- [ ] 状态流转逻辑正确实现
- [ ] 权限验证正确（isCreator vs isHandler）
- [ ] 执行周期正确创建和管理
- [ ] 执行记录正确关联到周期
- [ ] DTO 映射正确
- [ ] 单元测试通过
- [ ] 集成测试通过

---

## 📦 完成后操作

### 1. 发布新版本 NuGet 包

更新所有 `Burn.Abp.Pdm.*` 包的版本号,并发布到 NuGet 服务器。

### 2. 前端更新

通知前端开发人员运行:

```bash
yarn openapi
```

重新生成前端 API 类型定义。

### 3. 数据库迁移

在测试/生产环境执行迁移:

```bash
cd D:\project\caimen\Burn.Abp.CM.Microservice\microservices\Burn.Abp.CM.Pdm.Host
dotnet ef database update
```

---

## 📞 联系方式

如有疑问,请联系:
- 前端负责人: [待填写]
- 后端负责人: [待填写]
- 项目经理: [待填写]

---

## 📚 参考资料

- [设计文档](./2025-01-11-issue-execution-redesign.md)
- [前端实现 PR](待填写)
- [API 文档](待填写)
