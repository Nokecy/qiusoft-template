import React, { useState } from 'react';
import { Button, message, Modal, Form, Input, Radio, InputNumber } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { PrinterClientPrintAsync } from '@/services/openApi/PrinterClient';

const { TextArea } = Input;

interface TestPrintDialogProps {
    printerId: string;
    printerName: string;
    status?: string;
    isOnline?: boolean;
}

/**
 * 测试打印对话框组件
 */
const TestPrintDialog: React.FC<TestPrintDialogProps> = ({ printerId, printerName, status, isOnline }) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [inputType, setInputType] = useState<'url' | 'zpl'>('url');

    // 判断设备是否离线
    const isOffline = status === 'offline' || isOnline === false;

    const handleOpen = () => {
        if (isOffline) {
            message.warning('打印机离线，无法进行测试打印');
            return;
        }
        setOpen(true);
        form.resetFields();
    };

    const handleCancel = () => {
        setOpen(false);
        form.resetFields();
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const hide = message.loading('正在发送测试打印任务...', 0);

            try {
                await PrinterClientPrintAsync(
                    { printerId },
                    {
                        url: values.content,
                        isTest: false,
                        testPage:true,
                        printQuantity: values.printQuantity || 1,
                        width: values.width,
                        height: values.height,
                    }
                );

                message.success(`测试打印任务已发送到打印机：${printerName}`);
                handleCancel();
            } catch (error) {
                message.error('测试打印失败');
                console.error('测试打印错误:', error);
            } finally {
                hide();
            }
        } catch (error) {
            console.error('表单验证失败:', error);
        }
    };

    return (
        <>
            <Button
                size="small"
                icon={<PrinterOutlined />}
                type="link"
                onClick={handleOpen}
                title={isOffline ? '打印机离线' : '测试打印'}
                disabled={isOffline}
            >
                测试打印
            </Button>

            <Modal
                title={`测试打印 - ${printerName}`}
                open={open}
                onOk={handleSubmit}
                onCancel={handleCancel}
                width={600}
                okText="打印"
                cancelText="取消"
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        inputType: 'url',
                        printQuantity: 1,
                    }}
                >
                    <Form.Item
                        name="inputType"
                        label="输入类型"
                    >
                        <Radio.Group onChange={(e) => setInputType(e.target.value)}>
                            <Radio value="url">URL地址</Radio>
                            <Radio value="zpl">打印机指令(ZPL等)</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="content"
                        label={inputType === 'url' ? 'URL地址' : '打印机指令'}
                        rules={[{ required: true, message: `请输入${inputType === 'url' ? 'URL地址' : '打印机指令'}` }]}
                    >
                        {inputType === 'url' ? (
                            <Input placeholder="例如: https://example.com/label.pdf" />
                        ) : (
                            <TextArea
                                rows={6}
                                placeholder="例如: ^XA^FO50,50^ADN,36,20^FDTest Print^FS^XZ"
                            />
                        )}
                    </Form.Item>

                    <Form.Item
                        name="printQuantity"
                        label="打印数量"
                        rules={[{ required: true, message: '请输入打印数量' }]}
                    >
                        <InputNumber min={1} max={100} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="尺寸设置(可选)"
                        style={{ marginBottom: 0 }}
                    >
                        <Form.Item
                            name="width"
                            label="宽度(mm)"
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <InputNumber min={1} placeholder="例如: 100" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="height"
                            label="高度(mm)"
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 0 0 16px' }}
                        >
                            <InputNumber min={1} placeholder="例如: 50" style={{ width: '100%' }} />
                        </Form.Item>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default TestPrintDialog;
