/**
 * 审批相关弹窗组件
 * 包含提交审批、审批通过、审批拒绝对话框
 */

import React from 'react';
import { Modal, Alert, Input } from 'antd';

interface ApprovalModalsProps {
  // 提交审批
  submitModalVisible: boolean;
  submitComment: string;
  onSubmitModalClose: () => void;
  onSubmitCommentChange: (comment: string) => void;
  onSubmit: () => void;

  // 审批通过
  approveModalVisible: boolean;
  approveComment: string;
  onApproveModalClose: () => void;
  onApproveCommentChange: (comment: string) => void;
  onApprove: () => void;

  // 审批拒绝
  rejectModalVisible: boolean;
  rejectReason: string;
  onRejectModalClose: () => void;
  onRejectReasonChange: (reason: string) => void;
  onReject: () => void;

  // 共享状态
  approvalLoading: boolean;
}

const ApprovalModals: React.FC<ApprovalModalsProps> = ({
  submitModalVisible,
  submitComment,
  onSubmitModalClose,
  onSubmitCommentChange,
  onSubmit,

  approveModalVisible,
  approveComment,
  onApproveModalClose,
  onApproveCommentChange,
  onApprove,

  rejectModalVisible,
  rejectReason,
  onRejectModalClose,
  onRejectReasonChange,
  onReject,

  approvalLoading,
}) => {
  return (
    <>
      {/* 提交审批对话框 */}
      <Modal
        title="提交审批"
        open={submitModalVisible}
        onCancel={onSubmitModalClose}
        onOk={onSubmit}
        confirmLoading={approvalLoading}
        okText="提交"
        cancelText="取消"
      >
        <Alert
          message="提交说明"
          description="提交审批后，物料将进入审批流程，审批通过后才能发布使用。"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <Input.TextArea
          placeholder="请输入提交说明(可选)"
          value={submitComment}
          onChange={e => onSubmitCommentChange(e.target.value)}
          rows={3}
        />
      </Modal>

      {/* 审批通过对话框 */}
      <Modal
        title="审批通过"
        open={approveModalVisible}
        onCancel={onApproveModalClose}
        onOk={onApprove}
        confirmLoading={approvalLoading}
        okText="通过"
        cancelText="取消"
      >
        <Alert
          message="审批通过"
          description="审批通过后，物料将被发布并可以正式使用。"
          type="success"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <Input.TextArea
          placeholder="请输入审批意见(可选)"
          value={approveComment}
          onChange={e => onApproveCommentChange(e.target.value)}
          rows={3}
        />
      </Modal>

      {/* 审批拒绝对话框 */}
      <Modal
        title="审批拒绝"
        open={rejectModalVisible}
        onCancel={onRejectModalClose}
        onOk={onReject}
        confirmLoading={approvalLoading}
        okText="拒绝"
        okButtonProps={{ danger: true }}
        cancelText="取消"
      >
        <Alert
          message="审批拒绝"
          description="审批拒绝后，物料将回到草稿状态，需要修改后重新提交审批。"
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <Input.TextArea
          placeholder="请输入拒绝原因(必填)"
          value={rejectReason}
          onChange={e => onRejectReasonChange(e.target.value)}
          rows={3}
          status={!rejectReason.trim() ? 'error' : undefined}
        />
      </Modal>
    </>
  );
};

export default ApprovalModals;
