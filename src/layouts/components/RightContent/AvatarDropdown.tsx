import {
    LogoutOutlined, SettingOutlined, UserOutlined, BellOutlined, DownCircleOutlined
} from "@ant-design/icons";
import { Avatar, Menu, Spin, Modal, Input, Button, Switch } from "antd";
import React, { useCallback, useState } from 'react';
import { history, useIntl, useModel, dropByCacheKey } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
//@ts-ignore
import warning from "../../../assets/warning.mp3"
//@ts-ignore
import success from "../../../assets/success.mp3"
import useSound from "use-sound";
export type GlobalHeaderRightProps = {
    menu?: boolean;
};
// 引用会自动下载当前的菜单集合然后覆盖config里面的routesJSON就可以了
const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
    const { initialState, setInitialState } = useModel('@@initialState');
    const intl = useIntl();
    const [modal, modalContextHolder] = Modal.useModal();
    const [payErrorSound] = useSound(warning);
    const [paySuceessSound] = useSound(success);
    const onMenuClick = useCallback(
        (event: {
            key: React.Key;
            keyPath: React.Key[];
            item: React.ReactInstance;
            domEvent: React.MouseEvent<HTMLElement>;
        }) => {
            const { key } = event;
            if (key === 'userProfile') {
                dropByCacheKey('/appSYS/userProfile');
                history.push('/appSYS/userProfile');
                return;
            }
            if (key === 'logout') {
                //@ts-ignore
                setInitialState({});
                window.localStorage.clear();
                window.sessionStorage.clear();
                history.push('/appLogin');
            }
            if (key === "downloadManagers") {
                dropByCacheKey('/appSYS/downloadManagers')
                history.push('/appSYS/downloadManagers')
            }
        },
        [initialState, setInitialState],
    );

    const { editModeState, updateEditModeState } = useModel('useEditModeModel');

    const loading = (
        <span className={`${styles.action} ${styles.account}`}>
            <Spin
                size="small"
                style={{
                    marginLeft: 8,
                    marginRight: 8,
                }}
            />
        </span>
    );

    if (!initialState) {
        return loading;
    }

    const { configuration } = initialState;

    if (!configuration || !configuration.currentUser?.name) {
        return loading;
    }

    const onChangeEditMode = () => {
        updateEditModeState()
    }

    const menuHeaderDropdown = (
        ///@ts-ignore
        <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
            {menu && (<Menu.Item key="userProfile"><UserOutlined />个人中心</Menu.Item>)}

            {menu && (<Menu.Item key="downloadManagers"><DownCircleOutlined />应用下载</Menu.Item>)}

            {menu && (<Menu.Item key="settings"><SettingOutlined />个人设置</Menu.Item>)}

            <Menu.Item key="logout"><LogoutOutlined />退出登录</Menu.Item>
        </Menu>
    );
    return (<>
        {modalContextHolder}

        <HeaderDropdown overlay={menuHeaderDropdown}>
            <span className={`${styles.action} ${styles.account}`} style={{ color: "#dfdfdf", fontSize: 12 }}>
                <Avatar size="small" className={styles.avatar} src={initialState.avatarUrl} alt="avatar" />
                <span className={`${styles.name} anticon`}>{configuration.currentUser.name}</span>
            </span>
        </HeaderDropdown>
        <Button id="payErrorSound" style={{ display: 'none' }} onClick={() => { payErrorSound() }}>payErrorSound</Button>
        <Button id="paySuceessSound" style={{ display: 'none' }} onClick={() => { paySuceessSound() }}>paySuceessSound</Button>
    </>
    );
};

export default AvatarDropdown;