/**
 * ValidationStatusBar - 全局验证状态栏
 *
 * 功能：
 * - 显示验证结果摘要（通过/警告/错误）
 * - 可展开查看详细错误列表
 * - 点击错误可定位到相关面板
 * - 自动验证触发（模板修改后）
 *
 * @author Claude Code
 * @since 2024
 */

import React, { useMemo, useState, useEffect } from 'react';
import { Alert, Collapse, List, Badge, Typography } from 'antd';
import {
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import type { ValidationResult, ValidationError } from '../../types/validation';
import styles from './styles.module.less';

const { Text } = Typography;

export interface ValidationStatusBarProps {
  /** 验证结果数据 */
  validationResult: ValidationResult | null;
  /** 错误点击回调 - 用于导航到相关面板 */
  onErrorClick?: (error: ValidationError) => void;
}

/**
 * ValidationStatusBar组件
 *
 * 设计原则：
 * - 响应式设计 - 适配不同屏幕尺寸
 * - 性能优化 - 使用useMemo缓存计算结果
 * - 可访问性 - 清晰的视觉反馈和交互提示
 */
export const ValidationStatusBar: React.FC<ValidationStatusBarProps> = ({
  validationResult,
  onErrorClick,
}) => {
  // ========== 组件状态 ==========

  /**
   * 控制警告栏是否可见
   * - 当验证结果变化时自动显示
   * - 用户可以手动关闭
   */
  const [visible, setVisible] = useState(true);

  /**
   * 监听验证结果变化,自动显示警告栏
   */
  useEffect(() => {
    if (validationResult) {
      setVisible(true);
    }
  }, [validationResult]);

  // ========== 状态计算 ==========

  /**
   * 计算验证状态类型
   * - success: 无错误无警告
   * - warning: 有警告但无错误
   * - error: 有错误
   */
  const statusType = useMemo(() => {
    if (!validationResult) return 'info';

    const errorCount = validationResult.summary.errorCount;
    const warningCount = validationResult.summary.warningCount;

    if (errorCount > 0) return 'error';
    if (warningCount > 0) return 'warning';
    return 'success';
  }, [validationResult]);

  /**
   * 格式化状态消息文本
   */
  const statusMessage = useMemo(() => {
    if (!validationResult) return '等待验证...';

    const { errorCount, warningCount, passRate } = validationResult.summary;

    if (errorCount === 0 && warningCount === 0) {
      return `验证通过 - 通过率 ${(passRate * 100).toFixed(0)}%`;
    }

    const parts: string[] = [];
    if (errorCount > 0) parts.push(`${errorCount} 个错误`);
    if (warningCount > 0) parts.push(`${warningCount} 个警告`);

    return `验证失败 - ${parts.join(', ')}`;
  }, [validationResult]);

  /**
   * 状态图标映射
   */
  const statusIcon = useMemo(() => {
    const iconMap = {
      success: <CheckCircleOutlined style={{ fontSize: 16 }} />,
      warning: <WarningOutlined style={{ fontSize: 16 }} />,
      error: <CloseCircleOutlined style={{ fontSize: 16 }} />,
      info: <InfoCircleOutlined style={{ fontSize: 16 }} />,
    };
    return iconMap[statusType as keyof typeof iconMap];
  }, [statusType]);

  // ========== 事件处理 ==========

  /**
   * 处理错误项点击
   */
  const handleErrorItemClick = (error: ValidationError) => {
    if (onErrorClick) {
      onErrorClick(error);
    }
  };

  /**
   * 获取错误严重性图标
   */
  const getSeverityIcon = (severity: ValidationError['severity']) => {
    const iconMap = {
      error: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />,
      warning: <WarningOutlined style={{ color: '#faad14' }} />,
      info: <InfoCircleOutlined style={{ color: '#1890ff' }} />,
    };
    return iconMap[severity];
  };

  // ========== 渲染详细错误列表 ==========

  const renderErrorList = () => {
    if (!validationResult || validationResult.valid) return null;

    const allIssues = [
      ...(validationResult.errors || []),
      ...(validationResult.warnings || []),
    ];

    if (allIssues.length === 0) return null;

    return (
      <Collapse
        ghost
        items={[
          {
            key: 'errors',
            label: (
              <span>
                <Badge count={allIssues.length} offset={[10, 0]}>
                  <Text strong>查看详细信息</Text>
                </Badge>
              </span>
            ),
            children: (
              <List
                dataSource={allIssues}
                renderItem={(issue: ValidationError) => (
                  <List.Item
                    onClick={() => handleErrorItemClick(issue)}
                    className={styles.errorItem}
                    style={{ cursor: onErrorClick ? 'pointer' : 'default' }}
                  >
                    <List.Item.Meta
                      avatar={getSeverityIcon(issue.severity)}
                      title={
                        <span>
                          <Text strong>{issue.message}</Text>
                          {issue.field && (
                            <Text type="secondary" style={{ marginLeft: 8, fontSize: 12 }}>
                              字段: {issue.field}
                            </Text>
                          )}
                        </span>
                      }
                      description={
                        <div style={{ fontSize: 12 }}>
                          {issue.code && (
                            <Text type="secondary">
                              错误代码: {issue.code}
                            </Text>
                          )}
                          {issue.context && (
                            <div style={{ marginTop: 4 }}>
                              <Text type="secondary">
                                上下文: {JSON.stringify(issue.context)}
                              </Text>
                            </div>
                          )}
                        </div>
                      }
                    />
                  </List.Item>
                )}
                size="small"
              />
            ),
          },
        ]}
      />
    );
  };

  // ========== 事件处理 - 关闭 ==========

  /**
   * 处理警告栏关闭
   */
  const handleClose = () => {
    setVisible(false);
  };

  // ========== 主渲染 ==========

  // 如果已关闭或无验证结果,不显示
  if (!visible || !validationResult) {
    return null;
  }

  return (
    <div className={`${styles.validationStatusBar} ${styles[statusType]}`}>
      <Alert
        message={statusMessage}
        type={statusType as any}
        icon={statusIcon}
        showIcon
        banner
        closable={true}
        onClose={handleClose}
        style={{ marginBottom: 0 }}
        description={renderErrorList()}
      />
    </div>
  );
};

export default ValidationStatusBar;
