/**
 * 版本切换控件
 * 用于详情页 Header 区域的版本视图切换
 */
import React from 'react';
import { Segmented, Badge } from 'antd';
import { EditOutlined, CheckCircleOutlined, HistoryOutlined } from '@ant-design/icons';

export type ViewMode = 'working' | 'latest' | 'version';

export interface VersionSwitcherProps {
    /** 当前视图模式 */
    value: ViewMode;
    /** 视图模式变更回调 */
    onChange: (mode: ViewMode) => void;
    /** 是否有工作修订 */
    hasWorkingRevision?: boolean;
    /** 是否有已发布版本 */
    hasReleasedVersion?: boolean;
    /** 是否禁用 */
    disabled?: boolean;
}

const VersionSwitcher: React.FC<VersionSwitcherProps> = ({
    value,
    onChange,
    hasWorkingRevision = false,
    hasReleasedVersion = false,
    disabled = false,
}) => {
    const options = [
        {
            label: (
                <span>
                    <EditOutlined style={{ marginRight: 4 }} />
                    工作区
                    {hasWorkingRevision && <Badge status="processing" style={{ marginLeft: 4 }} />}
                </span>
            ),
            value: 'working' as ViewMode,
            disabled: !hasWorkingRevision,
        },
        {
            label: (
                <span>
                    <CheckCircleOutlined style={{ marginRight: 4 }} />
                    最新发布
                </span>
            ),
            value: 'latest' as ViewMode,
            disabled: !hasReleasedVersion,
        },
        {
            label: (
                <span>
                    <HistoryOutlined style={{ marginRight: 4 }} />
                    历史版本
                </span>
            ),
            value: 'version' as ViewMode,
            disabled: !hasReleasedVersion,
        },
    ];

    return (
        <Segmented
            value={value}
            onChange={(val) => onChange(val as ViewMode)}
            options={options}
            disabled={disabled}
            size="small"
        />
    );
};

export default VersionSwitcher;
