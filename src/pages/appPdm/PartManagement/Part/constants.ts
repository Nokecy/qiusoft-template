/**
 * 物料详情页面 - 常量配置文件
 */

import React from 'react';
import {
  InfoCircleOutlined,
  BarChartOutlined,
  PartitionOutlined,
  FileTextOutlined,
  BranchesOutlined,
  HistoryOutlined,
  InboxOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';

/**
 * 导航菜单项配置
 */
export const NAV_ITEMS = [
  { key: 'basic', label: '基础信息', icon: React.createElement(InfoCircleOutlined) },
  { key: 'technical', label: '技术参数', icon: React.createElement(BarChartOutlined) },
  { key: 'bom', label: 'BOM结构', icon: React.createElement(PartitionOutlined) },
  { key: 'documents', label: '关联文档', icon: React.createElement(FileTextOutlined) },
  { key: 'versions', label: '历史版本', icon: React.createElement(BranchesOutlined) },
  { key: 'changes', label: '变更历史', icon: React.createElement(HistoryOutlined) },
  // 以下功能开发中
  { key: 'inventory', label: '库存信息', icon: React.createElement(InboxOutlined), developing: true },
  { key: 'suppliers', label: '供应商', icon: React.createElement(TeamOutlined), developing: true },
  { key: 'quality', label: '质量追溯', icon: React.createElement(SafetyCertificateOutlined), developing: true },
];

/**
 * 操作类型与受影响数据页签的映射关系
 */
export const OPERATION_AFFECTED_SECTIONS = {
  checkout: ['versions', 'changes'],      // 检出影响版本和变更
  checkin: ['versions', 'changes'],       // 检入影响版本和变更
  undo_checkout: ['versions', 'changes'], // 撤销检出影响版本和变更
  submit: ['changes'],                    // 提交审批只影响变更记录
  withdraw: ['changes'],                  // 撤回审批只影响变更记录
  approve: ['versions', 'changes'],       // 审批通过可能发布版本
  reject: ['changes'],                    // 审批拒绝只影响变更记录
} as const;
