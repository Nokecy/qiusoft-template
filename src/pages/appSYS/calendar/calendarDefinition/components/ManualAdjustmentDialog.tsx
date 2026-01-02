import React, { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  InputNumber,
  Switch,
  Input,
  Space,
  Button,
  message,
  Descriptions,
  Tag,
  Alert,
} from 'antd';
import { ToolOutlined, ReloadOutlined, CheckCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import {
  CalendarDateDefinitionSetManualWorkdayAsync,
  CalendarDateDefinitionResetToAutoCalculationAsync,
} from '@/services/openApi/CalendarDateDefinition';

interface ManualAdjustmentDialogProps {
  visible: boolean;
  dateData: {
    id?: string;
    calendarDefinitionId?: string;
    date?: string;
    isWorkdayInConfigure?: boolean;
    isHoliday?: boolean;
    holidayName?: string;
    isWorkday?: boolean;
    isManuallySet?: boolean;
    plannedWorkHours?: number;
    actualWorkHours?: number;
    remark?: string;
  };
  onClose: () => void;
  onSuccess: () => void;
}

const ManualAdjustmentDialog: React.FC<ManualAdjustmentDialogProps> = ({
  visible,
  dateData,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  useEffect(() => {
    if (visible && dateData) {
      form.setFieldsValue({
        isWorkday: dateData.isWorkday || false,
        actualWorkHours: dateData.actualWorkHours || 8,
        remark: dateData.remark || '',
      });
    }
  }, [visible, dateData, form]);

  // 手动设置
  const handleManualSet = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      await CalendarDateDefinitionSetManualWorkdayAsync(
        { id: dateData.id! },
        {
          isWorkday: values.isWorkday,
          actualWorkHours: values.actualWorkHours,
          remark: values.remark,
        }
      );

      message.success('手动调整成功');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('手动调整失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 重置为自动计算
  const handleReset = async () => {
    try {
      setResetLoading(true);
      await CalendarDateDefinitionResetToAutoCalculationAsync({ id: dateData.id! });
      message.success('已重置为自动计算');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('重置失败:', error);
    } finally {
      setResetLoading(false);
    }
  };

  const dateStr = dateData.date ? dayjs(dateData.date).format('YYYY年MM月DD日') : '';
  const weekDay = dateData.date ? dayjs(dateData.date).format('dddd') : '';

  return (
    <Modal
      title={
        <Space>
          <ToolOutlined />
          手动调整日期 - {dateStr} ({weekDay})
        </Space>
      }
      open={visible}
      onCancel={onClose}
      width={600}
      footer={[
        <Button key="reset" icon={<ReloadOutlined />} loading={resetLoading} onClick={handleReset}>
          重置为自动计算
        </Button>,
        <Button key="cancel" onClick={onClose}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          icon={<CheckCircleOutlined />}
          loading={loading}
          onClick={handleManualSet}
        >
          保存调整
        </Button>,
      ]}
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {/* 当前状态 */}
        <Alert
          message="当前状态"
          description={
            <Descriptions size="small" column={2}>
              <Descriptions.Item label="配置工作日">
                {dateData.isWorkdayInConfigure ? (
                  <Tag color="green">是</Tag>
                ) : (
                  <Tag>否</Tag>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="假期">
                {dateData.isHoliday ? (
                  <Tag color="red">{dateData.holidayName || '是'}</Tag>
                ) : (
                  <Tag>否</Tag>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="实际状态">
                {dateData.isWorkday ? (
                  <Tag color="blue">工作日</Tag>
                ) : (
                  <Tag color="default">休息日</Tag>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="调整状态">
                {dateData.isManuallySet ? (
                  <Tag color="orange" icon={<ToolOutlined />}>
                    已手动调整
                  </Tag>
                ) : (
                  <Tag color="default">自动计算</Tag>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="计划工时">
                {dateData.plannedWorkHours || 0} 小时
              </Descriptions.Item>
              <Descriptions.Item label="实际工时">
                {dateData.actualWorkHours || 0} 小时
              </Descriptions.Item>
            </Descriptions>
          }
          type="info"
          style={{ marginBottom: 16 }}
        />

        {/* 调整表单 */}
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            isWorkday: dateData.isWorkday || false,
            actualWorkHours: dateData.actualWorkHours || 8,
            remark: dateData.remark || '',
          }}
        >
          <Form.Item
            label="是否工作日"
            name="isWorkday"
            valuePropName="checked"
            help="设置此日期是否为工作日"
          >
            <Switch
              checkedChildren="工作日"
              unCheckedChildren="休息日"
            />
          </Form.Item>

          <Form.Item
            label="实际工作时长"
            name="actualWorkHours"
            rules={[
              { required: true, message: '请输入实际工作时长' },
              { type: 'number', min: 0, max: 24, message: '工作时长应在0-24小时之间' },
            ]}
            help="单位：小时"
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              max={24}
              step={0.5}
              precision={1}
              placeholder="请输入实际工作时长"
            />
          </Form.Item>

          <Form.Item
            label="备注"
            name="remark"
            rules={[
              { required: true, message: '请输入备注信息' },
              { whitespace: true, message: '备注不能仅包含空格' },
            ]}
            help="记录调整原因或其他说明（必填）"
          >
            <Input.TextArea
              rows={3}
              placeholder="请输入备注信息"
              maxLength={200}
              showCount
            />
          </Form.Item>
        </Form>

        {/* 操作说明 */}
        <Alert
          message="操作说明"
          description={
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li>手动调整将覆盖自动计算的结果</li>
              <li>可以点击"重置为自动计算"恢复自动计算状态</li>
              <li>调整后的日期会显示"手动"标记</li>
            </ul>
          }
          type="warning"
          showIcon
        />
      </Space>
    </Modal>
  );
};

export default ManualAdjustmentDialog;
