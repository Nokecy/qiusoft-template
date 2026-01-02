import React from "react";
import { SelectLang, useModel, dropByCacheKey } from "umi";
import Avatar from "./AvatarDropdown";
import styles from "./index.less";
import Cookies from 'js-cookie';
import { SelectOrganization } from "../SelectOrganization";
import { BadgeIcon } from "@/pages/appSYS/badge/components";

const RightContent = (props) => {
    const { initialState, refresh } = useModel('@@initialState');
    const { organizationCode } = useModel('useOrganizationModel');

    if (!initialState || !initialState.layout) {
        return null;
    }

    const { navTheme, layout } = initialState.layout;
    let className = styles.right;

    if ((navTheme === 'realDark' && layout === 'top') || layout === 'mix') {
        className = `${styles.right}  ${styles.dark}`;
    }

    // 获取API基础URL
    const apiBaseUrl = (window as any).serverUrl?.apiServerUrl || 'http://127.0.0.1:4103';

    // 获取Token函数
    const getToken = () => {
        return initialState?.currentUser?.access_token ||
               localStorage.getItem('access_token') ||
               '';
    };

    return (
        <div className={className} style={{ color: "#dfdfdf", fontSize: 12 }}>

            <BadgeIcon
                apiBaseUrl={apiBaseUrl}
                getToken={getToken}
                className={styles.action}
            />

            <Avatar menu={true} />

            <SelectOrganization onItemClick={async ({ key }) => {
                if (key === organizationCode) {
                    return;
                }
                dropByCacheKey(window.location.pathname);
                try {
                    await refresh();
                } catch (error) {
                    console.error('Failed to refresh after organization change:', error);
                }
            }} />

            <SelectLang className={styles.action} onItemClick={({ key }) => {
                if (key === "zh-CN") {
                    key = "zh-Hans";
                }
                if (key === "en-US") {
                    key = "en";
                }
                Cookies.set('Accept-Language', key)
                let switUrl = `/Abp/Languages/Switch?culture=${key}&uiCulture=${key}`;

                window.location.href = switUrl;
            }} />

        </div >
    );
}

export default RightContent;
