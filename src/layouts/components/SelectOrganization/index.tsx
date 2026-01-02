import React, { useEffect } from 'react';
import { Dropdown } from 'antd';
import { useModel } from 'umi';
import styles from './index.less';

const inlineStyle = {
    cursor: "pointer",
    padding: "12px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    verticalAlign: "middle",
};

export const SelectOrganization = (props) => {
    const { onItemClick } = props;
    const {
        organizationList,
        organizationCode,
        selectedOrganization,
        loadOrganizations,
        setOrganizationCode,
    } = useModel('useOrganizationModel');

    useEffect(() => {
        loadOrganizations();
    }, [loadOrganizations]);

    const handleItemClick = ({ key }) => {
        setOrganizationCode(key);
        onItemClick?.({ key });
    };

    return (
        <Dropdown
            placement="bottomRight"
            menu={{
                selectedKeys: organizationCode ? [organizationCode] : [],
                onClick: handleItemClick,
                items: organizationList,
            }}
        >
            <span className={styles.action} style={{ color: "#dfdfdf", fontSize: 12 }}>
                <span style={inlineStyle}>
                    <i className="anticon">
                        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true">
                            <path d="M653.056 345.856H370.944v-168.32h282.112v168.32z m-11.648-220.672H382.592a64 64 0 0 0-64 64v145.024a64 64 0 0 0 64 64h258.816a64 64 0 0 0 64-64V189.184a64 64 0 0 0-64-64z m-421.76 372.48v159.296h-52.416V550.016c0-28.928 23.424-52.352 52.352-52.352z" p-id="8816">
                            </path>
                            <path d="M219.584 489.728h584.832c28.928 0 52.352 23.424 52.352 52.288H167.232c0-28.864 23.424-52.288 52.352-52.288z" ></path>
                            <path d="M485.824 383.872h52.352v284.48H485.76V383.872z m318.592 113.792c28.928 0 52.352 23.424 52.352 52.352v106.88h-52.352V497.728z m-549.568 326.08h-122.88v-122.88h122.88v122.88zM243.2 648.512H143.616a64 64 0 0 0-64 64v99.584a64 64 0 0 0 64 64H243.2a64 64 0 0 0 64-64v-99.584a64 64 0 0 0-64-64z" p-id="8818"></path><path d="M573.44 823.744H450.56v-122.88h122.88v122.88z m-11.648-175.232H462.208a64 64 0 0 0-64 64v99.584a64 64 0 0 0 64 64h99.584a64 64 0 0 0 64-64v-99.584a64 64 0 0 0-64-64z m330.24 175.232h-122.88v-122.88h122.88v122.88z m-11.648-175.232H780.8a64 64 0 0 0-64 64v99.584a64 64 0 0 0 64 64h99.584a64 64 0 0 0 64-64v-99.584a64 64 0 0 0-64-64z" ></path></svg>
                    </i>
                </span>
                {
                    selectedOrganization
                        ? selectedOrganization.label
                        : (organizationList.length > 0 ? organizationList[0].label : "请选择组织")
                }
            </span>
        </Dropdown>
    );
};
