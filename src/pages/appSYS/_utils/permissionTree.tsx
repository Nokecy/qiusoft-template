import { PermissionsGetAsync } from '@/services/openApi/Permissions';
import { Spin, Tabs, Tree } from "antd";
import React from "react";

class PermissionTree extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            entityDisplayName: undefined,
            groups: [],
            grantedPermissions: [],
            grantedPermissionNames: []
        }
    }

    componentDidMount() {
        const { providerName, providerKey } = this.props;
        let permissionListPromise = PermissionsGetAsync({ providerName, providerKey });
        permissionListPromise.then(values => {
            let grantedPermissions: any[] = [];
            values.groups && values.groups.map(group => grantedPermissions = [...grantedPermissions, ...(group.permissions ? group.permissions : [])]);
            this.setState({
                entityDisplayName: values.entityDisplayName,
                groups: values.groups,
                grantedPermissions: grantedPermissions,
                grantedPermissionNames: grantedPermissions.filter(a => a.isGranted).map(a => a.name)
            });
            this.props.permissionCheck && this.props.permissionCheck(grantedPermissions);
        });
    }

    renderNode = (parentData: any[], data: any[]) => {
        const { providerName } = this.props;
        return parentData.map(item => {
            let childer = data.filter(a => a.parentName === item.name);
            let disable = providerName === "U" && item.grantedProviders![0] && item.grantedProviders![0].providerName === "R";
            if (childer.length > 0) {
                return (
                    <Tree.TreeNode key={item.name} title={item.displayName} disableCheckbox={disable}>
                        {this.renderNode(childer, data)}
                    </Tree.TreeNode>
                );
            }
            return (
                <Tree.TreeNode className="flots" key={item.name} title={item.displayName} disableCheckbox={disable} />
            );
        });
    }

    findParent = (checkedKey: string, allPermission: any[]) => {
        let permission: any = allPermission.find(b => b.name === checkedKey);
        if (permission) {
            permission.isGranted = true;
            if (permission.parentName) {
                let parentPermission: any = allPermission.find(b => b.name === permission.parentName);
                parentPermission.isGranted = true;
                this.findParent(permission.parentName, allPermission);
            }
        }
    };

    findChild = (checkedKey: string, allPermission: any[]) => {
        let permission: any[] = allPermission.filter(b => b.parentName === checkedKey);
        permission.map((p: any) => {
            p.isGranted = true;
            this.findChild(p.name, allPermission);
        });
    };

    findRemoveChild = (checkedKey: string, allPermission: any[]) => {
        let permissions: any[] = allPermission.filter(b => b.parentName === checkedKey || b.name === checkedKey);
        permissions.map((p: any) => {
            p.isGranted = false;
            if (p.name !== checkedKey) {
                this.findRemoveChild(p.name, allPermission);
            }
        });
    };

    onCheck = (checkedKeys: any, e: any) => {
        let checkedName = e.node.props.eventKey;
        let checked = e.checked;

        const { grantedPermissions } = this.state;
        let cloneGrantedPermissions = [...grantedPermissions];
        if (checked) {

            this.findParent(checkedName, cloneGrantedPermissions);

            this.findChild(checkedName, cloneGrantedPermissions);

        } else {
            this.findRemoveChild(checkedName, cloneGrantedPermissions);
        }
        this.setState({
            grantedPermissions: cloneGrantedPermissions,
            grantedPermissionNames: cloneGrantedPermissions.filter(a => a.isGranted).map(a => a.name)
        });
        this.props.permissionCheck && this.props.permissionCheck(cloneGrantedPermissions);
    };

    render() {
        const { groups, grantedPermissionNames } = this.state;
        return (
            <Spin spinning={groups.length <= 0}>
                <div className="content-inner">
                    {
                        groups.length > 0 ? <Tabs tabPosition={"left"}>
                            {
                                groups.map((group: any, index: number) => {
                                    let permissions: any[] = groups[index].permissions;

                                    return <Tabs.TabPane key={group.name} tab={group.displayName}>
                                        <Tree
                                            checkable
                                            checkStrictly
                                            checkedKeys={grantedPermissionNames}
                                            onCheck={this.onCheck}
                                        >
                                            {
                                                this.renderNode(permissions.filter(a => a.parentName === null), permissions)
                                            }
                                        </Tree>
                                    </Tabs.TabPane>
                                })
                            }
                        </Tabs> : null
                    }
                </div>
            </Spin>
        );
    }
}

export default PermissionTree;
