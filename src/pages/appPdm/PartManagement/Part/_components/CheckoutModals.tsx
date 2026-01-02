/**
 * 检出相关弹窗组件
 * 包含检出对话框
 */

import React from 'react';
import { Modal, Alert, Input } from 'antd';

interface CheckoutModalsProps {
  checkOutModalVisible: boolean;
  checkOutComment: string;
  checkOutLoading: boolean;
  onCheckOutModalClose: () => void;
  onCheckOutCommentChange: (comment: string) => void;
  onCheckOut: () => void;
}

const CheckoutModals: React.FC<CheckoutModalsProps> = ({
  checkOutModalVisible,
  checkOutComment,
  checkOutLoading,
  onCheckOutModalClose,
  onCheckOutCommentChange,
  onCheckOut,
}) => {
  return (
    <>
      {/* 检出对话框 */}
      <Modal
        title="检出物料"
        open={checkOutModalVisible}
        onCancel={onCheckOutModalClose}
        onOk={onCheckOut}
        confirmLoading={checkOutLoading}
        okText="检出"
        cancelText="取消"
      >
        <Alert
          message="检出说明"
          description="检出后，物料将被锁定为草稿状态，其他用户无法修改。检出期间可以进行编辑，完成后可以检入或撤销检出。"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <Input.TextArea
          placeholder="请输入检出说明(可选)"
          value={checkOutComment}
          onChange={e => onCheckOutCommentChange(e.target.value)}
          rows={3}
        />
      </Modal>
    </>
  );
};

export default CheckoutModals;
