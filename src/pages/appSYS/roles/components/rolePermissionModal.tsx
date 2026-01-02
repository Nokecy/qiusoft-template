import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useIntl, useRequest } from "umi";
import PermissionTree from "@/pages/appSYS/_utils/permissionTree";
import { ControlFilled } from "@ant-design/icons";
import { useBoolean } from "ahooks";
import { PermissionsUpdateAsync } from "@/services/openApi/Permissions";

const RolePermissionDialog = (props: any) => {
    const { roleName, buttonProps, title, onConfirm } = props;
    const intl = useIntl();

    const [permissionVisible, { setFalse: hidePermission, setTrue: showPermission }] = useBoolean();
    const [grantedPermissions, setGrantedPermissions] = useState<any[]>([]);

    const { loading: updatePermissionsLoading, run: updatePermissions } = useRequest(() => {
        let updatePermissionDto = grantedPermissions.map((permission: any) => { return { isGranted: permission.isGranted, name: permission.name }; });
        return PermissionsUpdateAsync({ providerName: "R", providerKey: roleName }, { permissions: updatePermissionDto })
    }, {
        manual: true,
        onSuccess: (result, params) => {
            hidePermission();
            setGrantedPermissions([]);
        }
    });

    return (<>
        <Button size={"small"} icon={<ControlFilled />} type={"link"} title={"管理权限"} onClick={() => { showPermission(); }} />
        <Modal
            destroyOnClose
            width={720}
            title={intl.formatMessage({ id: "AbpIdentity:Permissions" })}
            open={permissionVisible}
            confirmLoading={updatePermissionsLoading}
            onCancel={() => { hidePermission(); }}
            onOk={() => { updatePermissions(); }}>
            <PermissionTree permissionCheck={setGrantedPermissions} providerName={"R"} providerKey={roleName} />
        </Modal>
    </>);
}

export default RolePermissionDialog
