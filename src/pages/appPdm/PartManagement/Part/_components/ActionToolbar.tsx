/**
 * 物料详情页面 - 顶部操作工具栏组件
 */

import React from 'react';
import { Button, Space, Divider, Tag, Tooltip, Select, Popconfirm, Input } from 'antd';
import {
  ArrowLeftOutlined,
  EditOutlined,
  LockOutlined,
  UnlockOutlined,
  RollbackOutlined,
  SendOutlined,
  CheckOutlined,
  CloseOutlined,
  UserOutlined,
  ClockCircleOutlined,
  BranchesOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { Access } from 'umi';
import type { PartDetailData } from '../types';
import { formatDate, getLifecycleConfig } from '../utils';

interface ActionToolbarProps {
  data: PartDetailData;
  currentUserId?: string;
  versionHistory: any[];
  versionOptions: any[];
  isViewingHistory: boolean;
  versionHistoryLoading: boolean;
  versionDetailLoading: boolean;
  checkOutLoading: boolean;
  approvalLoading: boolean;
  undoCheckOutReason: string;
  canUpdate: boolean;
  canCheckOut: boolean;
  canCheckIn: boolean;
  canUndoCheckOut: boolean;
  canSubmit: boolean;
  canWithdraw: boolean;
  canApprove: boolean;
  canReject: boolean;
  onBack: () => void;
  onEdit: () => void;
  onVersionChange: (version: string) => void;
  onBackToCurrentVersion: () => void;
  onCheckOutClick: () => void;
  onCheckIn: () => void;
  onUndoCheckOut: () => void;
  onSubmit: () => void;
  onWithdraw: () => void;
  onApprove: () => void;
  onReject: () => void;
  onUndoCheckOutReasonChange: (value: string) => void;
}

const ActionToolbar: React.FC<ActionToolbarProps> = ({
  data,
  currentUserId,
  versionHistory,
  versionOptions,
  isViewingHistory,
  versionHistoryLoading,
  versionDetailLoading,
  checkOutLoading,
  approvalLoading,
  undoCheckOutReason,
  canUpdate,
  canCheckOut,
  canCheckIn,
  canUndoCheckOut,
  canSubmit,
  canWithdraw,
  canApprove,
  canReject,
  onBack,
  onEdit,
  onVersionChange,
  onBackToCurrentVersion,
  onCheckOutClick,
  onCheckIn,
  onUndoCheckOut,
  onSubmit,
  onWithdraw,
  onApprove,
  onReject,
  onUndoCheckOutReasonChange,
}) => {
  if (!data) return null;

  const lifecycleConfig = getLifecycleConfig(data.lifecycleStatus);

  return (
    <div className="detail-toolbar">
      <div className="toolbar-left">
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={onBack}>
          返回
        </Button>
        <Divider type="vertical" />
        <div className="part-identity">
          <span className="part-code">{data.partNumber}</span>
          <span className="part-name">{data.description}</span>
        </div>
        <Space size={4}>
          {/* 版本选择器 */}
          <div className="version-selector">
            <Select
              value={data.version}
              onChange={onVersionChange}
              options={versionOptions}
              loading={versionHistoryLoading || versionDetailLoading}
              disabled={versionHistory.length <= 1}
              style={{ minWidth: 120 }}
              size="small"
              suffixIcon={<BranchesOutlined />}
              popupMatchSelectWidth={false}
              placeholder="选择版本"
            />
            {isViewingHistory && (
              <Tooltip title="返回当前版本">
                <Button
                  type="link"
                  size="small"
                  icon={<RollbackOutlined />}
                  onClick={onBackToCurrentVersion}
                  style={{ padding: '0 4px' }}
                />
              </Tooltip>
            )}
          </div>
          {isViewingHistory && (
            <Tag color="orange" icon={<HistoryOutlined />}>
              历史版本
            </Tag>
          )}
          <Tag color={lifecycleConfig.color}>{lifecycleConfig.label}</Tag>
          {data.isCritical && <Tag color="red">关键</Tag>}
          {!data.isActive && <Tag color="default">禁用</Tag>}
          {/* 检出状态标签 */}
          {data.isCheckedOut && (
            <Tooltip
              title={
                <div>
                  <div>
                    <UserOutlined /> 检出人: {data.checkOutInfo?.checkedOutUserName || '-'}
                  </div>
                  <div>
                    <ClockCircleOutlined /> 检出时间: {formatDate(data.checkOutInfo?.checkedOutTime)}
                  </div>
                  {data.checkOutInfo?.checkOutComment && <div>备注: {data.checkOutInfo.checkOutComment}</div>}
                  {data.checkOutInfo?.expireAt && <div>过期时间: {formatDate(data.checkOutInfo.expireAt)}</div>}
                </div>
              }
            >
              <Tag
                color={data.checkOutInfo?.checkedOutUserId === currentUserId ? 'blue' : 'orange'}
                icon={<LockOutlined />}
              >
                {data.checkOutInfo?.checkedOutUserId === currentUserId
                  ? '我的检出'
                  : `已检出(${data.checkOutInfo?.checkedOutUserName})`}
              </Tag>
            </Tooltip>
          )}
        </Space>
      </div>
      <div className="toolbar-right">
        <Space size={8}>
          {/* 检出/检入操作按钮 */}
          {!data.isCheckedOut && data.lifecycleStatus === 20 && (
            <Access accessible={canCheckOut}>
              <Button icon={<LockOutlined />} loading={checkOutLoading} onClick={onCheckOutClick}>
                检出
              </Button>
            </Access>
          )}
          {data.isCheckedOut && data.checkOutInfo?.checkedOutUserId === currentUserId && (
            <>
              <Access accessible={canCheckIn}>
                <Popconfirm
                  title="检入确认"
                  description="确定要检入该物料吗？检入后将解除锁定但保留草稿状态。"
                  onConfirm={onCheckIn}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button icon={<UnlockOutlined />} loading={checkOutLoading}>
                    检入
                  </Button>
                </Popconfirm>
              </Access>
              <Access accessible={canUndoCheckOut}>
                <Popconfirm
                  title="撤销检出确认"
                  description={
                    <div>
                      <div style={{ marginBottom: 8 }}>撤销检出将删除草稿版本，恢复到已发布状态。</div>
                      <Input.TextArea
                        placeholder="请输入撤销原因(可选)"
                        value={undoCheckOutReason}
                        onChange={(e) => onUndoCheckOutReasonChange(e.target.value)}
                        rows={2}
                      />
                    </div>
                  }
                  onConfirm={onUndoCheckOut}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button icon={<RollbackOutlined />} loading={checkOutLoading}>
                    撤销检出
                  </Button>
                </Popconfirm>
              </Access>
            </>
          )}
          {/* 审批操作按钮 */}
          {data.lifecycleStatus === 0 && (
            <Access accessible={canSubmit}>
              <Button type="primary" icon={<SendOutlined />} loading={approvalLoading} onClick={onSubmit}>
                提交审批
              </Button>
            </Access>
          )}
          {data.lifecycleStatus === 10 && (
            <Access accessible={canWithdraw}>
              <Popconfirm
                title="撤回审批确认"
                description="确定要撤回该物料的审批申请吗？"
                onConfirm={onWithdraw}
                okText="确定"
                cancelText="取消"
              >
                <Button icon={<RollbackOutlined />} loading={approvalLoading}>
                  撤回审批
                </Button>
              </Popconfirm>
            </Access>
          )}
          {data.lifecycleStatus === 10 && (
            <>
              <Access accessible={canApprove}>
                <Button type="primary" icon={<CheckOutlined />} loading={approvalLoading} onClick={onApprove}>
                  审批通过
                </Button>
              </Access>
              <Access accessible={canReject}>
                <Button danger icon={<CloseOutlined />} loading={approvalLoading} onClick={onReject}>
                  审批拒绝
                </Button>
              </Access>
            </>
          )}
          <Access accessible={canUpdate}>
            <Button icon={<EditOutlined />} onClick={onEdit}>
              编辑
            </Button>
          </Access>
        </Space>
      </div>
    </div>
  );
};

export default ActionToolbar;
