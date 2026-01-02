import RoleSelect from '@/pages/appSYS/roles/components/roleSelect';
import { SettingUiResetSettingValuesAsync, SettingUiSetSettingValuesAsync } from '@/services/openApi/SettingUi';
import ProCard from '@/components/card';
import { ToolBar } from '@/components';
import { Button, Checkbox, Col, Form, Input, InputNumber, DatePicker, message, Row, Space, Select } from 'antd';
import { SaveOutlined, UndoOutlined } from '@ant-design/icons';
import { groupBy } from 'lodash';
import React from 'react';
import { useIntl, SettingWidgetComponents } from 'umi';

const FormItem = Form.Item;

const Components = {
	text: Input,
	number: InputNumber,
	dateTime: DatePicker,
	checkbox: Checkbox,
	downInput: Select,
	"select": Select,
	roleSelect: RoleSelect,
	...SettingWidgetComponents,
};

/**
 * DataSource 数据项类型定义
 * 支持大小写不敏感的字段名
 */
interface DataSourceItem {
	Name?: string;
	name?: string;
	Value?: string | number | boolean;
	value?: string | number | boolean;
}

/**
 * 规范化 DataSource 数据项，支持不同大小写格式
 *
 * 支持的字段格式:
 * - Name/name: 显示文本
 * - Value/value: 选项值（支持字符串、数字、布尔值）
 *
 * @param item 原始数据项
 * @returns 规范化后的选项对象 { label, value }
 *
 * @example
 * // 支持大写
 * normalizeDataSourceItem({ Name: "选项1", Value: "1" })
 * // => { label: "选项1", value: "1" }
 *
 * // 支持小写
 * normalizeDataSourceItem({ name: "选项2", value: 2 })
 * // => { label: "选项2", value: 2 }
 *
 * // 混合大小写（优先使用大写）
 * normalizeDataSourceItem({ Name: "选项3", value: true })
 * // => { label: "选项3", value: true }
 */
const normalizeDataSourceItem = (item: DataSourceItem) => {
	return {
		label: item.Name || item.name || '',
		value: item.Value ?? item.value ?? ''
	};
};

const GenerationForm = ({ infos }) => {
	const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
	const [form] = Form.useForm();
	const intl = useIntl();

	const handleSave = () => {
		form.validateFields().then((values: any) => {
			const hide = message.info('正在更新系统');
			Object.keys(values).map(key => {
				if (typeof values[key] === 'boolean') {
					values[key] = values[key] ? 'True' : 'False';
				}
				values[`Setting_${key}`] = `${values[key]}`;
				delete values[key];
			});
			SettingUiSetSettingValuesAsync(values)
				.then(setting => {
					message.success('更新成功!');
				})
				.catch(() => {
					message.error('更新失败!');
				})
				.finally(() => {
					hide();
				});
		});
	};

	const handleReset = () => {
		form.validateFields().then((values: any) => {
			const hide = message.info('正在重置参数');
			SettingUiResetSettingValuesAsync(Object.keys(values))
				.then(setting => {
					message.success('重置成功!');
				})
				.catch(() => {
					message.error('重置失败!');
				})
				.finally(() => {
					hide();
				});
		});
	};

	const getFormValue = () => {
		const formValue: Record<string, any> = {};
		infos.forEach(info => {
			if (info.value === 'True') {
				formValue[info.name!] = true;
				return;
			}
			if (info.value === 'False') {
				formValue[info.name!] = false;
				return;
			}
			formValue[info.name!] = info.value;
		});
		return formValue;
	};

	const groupInfo = groupBy(infos, info => info.properties!.Group2);

	return (
		<Form form={form} autoComplete={'off'} {...formItemLayout} initialValues={getFormValue()}>
			{Object.keys(groupInfo).map(key => {
				return (
					<ProCard key={key} title={intl.formatMessage({ id: `${key}` })} headerBordered={true} bordered={true} collapsible={true}>
						<Row gutter={8}>
							{groupInfo[key].map(info => {
								let type = info.properties!['Type'] ? info.properties!['Type'] : 'text';
								let Component = Components[type] ? Components[type] : Input;
								return (
									<Col span={8} key={info.name}>
										<FormItem
											name={info.name}
											label={info.displayName}
											help={info.description}
											valuePropName={type === 'checkbox' ? 'checked' : undefined}
										>
											<Component
												placeholder={info.displayName}
												{...(type === 'downInput' || type === 'select'
													? { options: info.properties?.DataSource?.map(normalizeDataSourceItem) }
													: {}
												)}
											/>
										</FormItem>
									</Col>
								);
							})}
						</Row>
					</ProCard>
				);
			})}
			<ToolBar
				style={{
					zIndex: window.location.pathname.indexOf('Settings') !== -1 ? 0 : -1,
				}}
			>
				<Space>
					<Button type="primary" icon={<UndoOutlined />} onClick={handleReset}>
						重置
					</Button>
					<Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
						{intl.formatMessage({ id: 'AbpUi:Save' })}
					</Button>
				</Space>
			</ToolBar>
		</Form>
	);
};

export default GenerationForm;
