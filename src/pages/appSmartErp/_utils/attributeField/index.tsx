import { MaterialGetByCodeAsync, MaterialGetMaterialAttributeListAsync } from '@/services/common/Material';
import { BomCalculationSuperBomAsync } from '@/services/smarterp/Bom';
import { SettingOutlined } from '@ant-design/icons';
import { isField } from '@formily/core';
import { useField, useForm } from '@formily/react';
import { observer } from '@formily/reactive-react';
import { Button, message, Badge } from 'antd';
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { converAttributes, converAttributeToObject } from '@/pages/appSmartErp/SaleManagement/saleOrders/components';
import showAttributeDialog from './attributeDialog';
import { FormDialog } from '@formily/antd-v5';

const AttributeField = observer((props: any) => {
	const form = useForm();
	const field = useField();
	const [loading, setLoading] = useState(false);

	// 从字段路径中提取数组索引 - 改进版本，支持多种字段名
	const getArrayIndex = () => {
		const address = field.address?.toString() || '';
		console.log('Field address:', address);

		// 尝试多种模式匹配 - 支持 saleOrderItems 和 items
		let match = address.match(/saleOrderItems\.(\d+)\.attributes/);
		if (match) return parseInt(match[1]);

		match = address.match(/saleOrderItems\.(\d+)/);
		if (match) return parseInt(match[1]);

		match = address.match(/items\.(\d+)\.attributes/);
		if (match) return parseInt(match[1]);

		match = address.match(/items\.(\d+)/);
		if (match) return parseInt(match[1]);

		// 如果都失败，尝试通过父级字段获取
		let current = field.parent;
		while (current) {
			const parentAddress = current.address?.toString() || '';
			let parentMatch = parentAddress.match(/saleOrderItems\.(\d+)/);
			if (parentMatch) return parseInt(parentMatch[1]);

			parentMatch = parentAddress.match(/items\.(\d+)/);
			if (parentMatch) return parseInt(parentMatch[1]);

			current = current.parent;
		}

		console.warn('Unable to determine array index, using 0');
		return 0;
	};

	const index = getArrayIndex();

	// 获取当前特性数量
	const getAttributeCount = () => {
		const attributes = props.value || [];
		return Array.isArray(attributes) ? attributes.length : 0;
	};

	const showModal = async () => {
		// 动态检测字段名 - 支持 saleOrderItems 和 items
		const itemsFieldName = form.values.saleOrderItems ? 'saleOrderItems' : 'items';
		const currentItem = form.values[itemsFieldName]?.[index];

		const materialCode = currentItem?.materialCode ||
			currentItem?.['{value:materialCode,label:materialOutCode}']?.value ||
			currentItem?.['{value:materialCode,label:materialName}']?.value;

		if (!materialCode) {
			message.warning('请先选择物料');
			return;
		}

		setLoading(true);

		try {
			const material = await MaterialGetByCodeAsync({ code: materialCode });

			if (!material?.id) {
				message.error('获取物料信息失败');
				return;
			}

			const attributeResponse = await MaterialGetMaterialAttributeListAsync({
				materialId: material.id
			});

			const attributeSchema = attributeResponse.items || [];

			if (attributeSchema.length === 0) {
				message.info('该物料暂无特性配置');
				return;
			}

			const attributeDialog = showAttributeDialog({
				attributeSchema,
				initValues: converAttributeToObject(props.value || []),
				portalId: `portalId${index}`
			});

			// 处理特性选择完成
			attributeDialog.then(async (values) => {
				if (isField(field) && values) {
					// 先更新特性值
					field.value = converAttributes(values);


					message.loading('正在计算 BOM...', 0);

					const bomInfo = await BomCalculationSuperBomAsync(
						{ materialCode: materialCode },
						{ variables: values }
					);

					message.destroy(); // 关闭 loading 消息

					if (bomInfo) {
						// 更新同一行的 itemBoms 字段 - 使用动态字段名
						form.setValuesIn(`${itemsFieldName}.${index}.itemBoms`, bomInfo);
						message.success('特性配置完成，BOM 计算成功');
					} else {
						message.warning('BOM 计算结果为空，请检查特性配置');
					}
				}
			}).catch(() => {
				// 用户取消操作，不做任何处理
			});

		} catch (error) {
			message.error('获取物料特性失败');
		} finally {
			setLoading(false);
		}
	};

	const attributeCount = getAttributeCount();

	return <FormDialog.Portal id={`portalId${index}`}>
		<Badge count={attributeCount} size="small" color="#1890ff">
			<Button
				type={'primary'}
				size={'small'}
				id={`attribute${index}`}
				onClick={showModal}
				icon={<SettingOutlined />}
				loading={loading}
				title={attributeCount > 0 ? `已设置 ${attributeCount} 个特性` : '点击设置物料特性'}
				style={{
					width: '100%',
					minWidth: '80px'
				}}
			>
				{attributeCount > 0 ? `特性(${attributeCount})` : '特性'}
			</Button>
		</Badge>
	</FormDialog.Portal>
});

export default AttributeField;
