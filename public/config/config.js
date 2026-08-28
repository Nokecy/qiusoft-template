// 运行时配置：**不参与构建**，装机时直接挂载覆盖这一个文件即可改后端地址，不必重新打包。
//
// 这份是模板。分发清单里标了 skipIfExists，拷过去一次之后母版再更新也不会覆盖它，
// 因为它装的是这套部署的事实——所以这里一律留空或写占位，不放任何真实地址：
// 留着别人的内网地址，新客户不改也能起得来（页面出得来、接口连不上），
// 等发现时它已经跟着进了交付包。
//
// 前后端同源交付（同一个 nginx 出去，接口走 /api 反代）时，
// authServerUrl 与 apiServerUrl **留空即可**，前端会按当前站点的源去请求。
// @author nokecy
window.serverUrl = {
	// 身份服务地址。同源交付留空
	authServerUrl: '',
	// 业务接口地址。同源交付留空
	apiServerUrl: '',
	// 工作流设计器服务地址。本客户不装工作流就留空
	workflowDesignerServerUrl: '',
	// 图纸查看器云 API 地址（新迪 FingerHttp 服务）。不装图纸查看就留空
	fingerHttpServerUrl: '',
	// 是否启用组织选择功能（登录时按账号拉取组织列表）
	enableOrganization: false,
};
