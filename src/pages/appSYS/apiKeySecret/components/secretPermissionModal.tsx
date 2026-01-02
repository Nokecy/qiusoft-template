import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useIntl, useRequest } from "umi";
import PermissionTree from "@/pages/appSYS/_utils/permissionTree";
import { ControlFilled } from "@ant-design/icons";
import { useBoolean } from "ahooks";
import { PermissionsUpdateAsync } from "@/services/openApi/Permissions";

const SecretPermissionDialog = (props: any) => {
    const { secretName, buttonProps, title, onConfirm } = props;
    const intl = useIntl();

    const [permissionVisible, { setFalse: hidePermission, setTrue: showPermission }] = useBoolean();
    const [grantedPermissions, setGrantedPermissions] = useState<any[]>([]);

    const { loading: updatePermissionsLoading, run: updatePermissions } = useRequest(() => {
        let updatePermissionDto = grantedPermissions.map((permission: any) => { return { isGranted: permission.isGranted, name: permission.name }; });
        return PermissionsUpdateAsync({ providerName: "ApiKey", providerKey: secretName }, { permissions: updatePermissionDto })
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
            <PermissionTree permissionCheck={setGrantedPermissions} providerName={"ApiKey"} providerKey={secretName} />
        </Modal>
    </>);
}

export default SecretPermissionDialog
