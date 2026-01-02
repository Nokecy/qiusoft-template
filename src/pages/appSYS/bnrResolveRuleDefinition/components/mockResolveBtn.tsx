import { BNRResolveRuleDefinitionMockResolveAsync, BNRResolveRuleDefinitionGetAsync } from '@/services/openApi/BNRResolveRuleDefinition';
import { Button, Modal, Spin } from 'antd';
import { useMutation, useQuery, useSchemaField } from 'umi';
import React, { useEffect, useMemo } from 'react';
import { useBoolean } from 'ahooks';
import { createForm } from '@formily/core';
import { Form } from '@formily/antd-v5';
import { MobileFilled } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';

/**
 * 模拟正则解析条码
 * @param props
 * @returns
 */
const MockResolveBtn = (props: any) => {
	const { entityId } = props;
	const [visible, { setTrue, setFalse }] = useBoolean(false);

	const form = useMemo(() => createForm({}), []);
	const SchemaField = useSchemaField({ ProCard });

	const { data, isFetching, refetch } = useQuery(
		[entityId],
		() => {
			return BNRResolveRuleDefinitionGetAsync({ id: entityId }, {});
		},
		{ enabled: true, refetchOnWindowFocus: false }
	);

	const { isLoading, mutateAsync: mock } = useMutation((body: any) => {
		return BNRResolveRuleDefinitionMockResolveAsync(body);
	}, {});

	const getMockResolve = () => {
		form.submit(() => {
			mock(form.values).then(rest => {
				form.setValues({ ...rest }, 'shallowMerge');
			});
		});
	};

	useEffect(() => {
		form.setValues(data);
	}, [data]);

	return (
		<>
			<Button type={'link'} icon={<MobileFilled />} onClick={setTrue} title='模拟解析' />

			<Modal title={'模拟正则解析'} width={1024} open={visible} onCancel={setFalse} destroyOnClose>
				<Form form={form} previewTextPlaceholder={'无'} labelWidth={100} feedbackLayout={'none'}>
					<Spin spinning={isLoading} tip={'正在请求服务器'}>
						<SchemaField>
							<SchemaField.Void x-component='ProCard' x-component-props={{ title: '基本信息', collapsible: false, headerBordered: true }}>
								<SchemaField.Void x-component='FormGrid' x-component-props={{ maxColumns: [1, 4], strictAutoFit: true }}>
									<SchemaField.String name={'expression'} title={'表达式'} x-decorator='FormItem' x-component='Input' x-decorator-props={{ gridSpan: 5 }} />
									<SchemaField.String name={'itemStart'} title={'编码位置'} x-decorator='FormItem' x-component='Input' />
									<SchemaField.String name={'itemLength'} title={'编码长度'} x-decorator='FormItem' x-component='Input' />
									<SchemaField.String name={'snStart'} title={'SN位置'} x-decorator='FormItem' x-component='Input' />
									<SchemaField.String name={'snLength'} title={'SN长度'} x-decorator='FormItem' x-component='Input' />
									<SchemaField.String name={'versionStart'} title={'版本位置'} x-decorator='FormItem' x-component='Input' />
									<SchemaField.String name={'versionLength'} title={'版本长度'} x-decorator='FormItem' x-component='Input' />
									<SchemaField.String name={'supplierStart'} title={'供应商位置'} x-decorator='FormItem' x-component='Input' />
									<SchemaField.String name={'supplierLength'} title={'供应商长度'} x-decorator='FormItem' x-component='Input' />
									<SchemaField.String name={'fixedItemCode'} title={'固定编码'} x-decorator='FormItem' x-component='Input' />

									<SchemaField.String
										name={'barCode'}
										title={'条码'}
										x-decorator='FormItem'
										x-decorator-props={{ gridSpan: 5 }}
										x-component='Input'
										x-component-props={{
											placeholder: '请输入条码,并回车',
											onPressEnter: getMockResolve,
										}}
									/>
								</SchemaField.Void>
							</SchemaField.Void>

							<SchemaField.Void x-component='ProCard' x-component-props={{ title: '解析结果', collapsible: false, headerBordered: true }}>
								<SchemaField.Void x-component='FormGrid' x-component-props={{ maxColumns: [1, 4], strictAutoFit: true }}>
									<SchemaField.String name={'materialCode'} title={'物料编码'} x-decorator='FormItem' x-component='Input' x-read-pretty />
									<SchemaField.String name={'serialNumber'} title={'序列号'} x-decorator='FormItem' x-component='Input' x-read-pretty />
									<SchemaField.String name={'supplierCode'} title={'供应商编码'} x-decorator='FormItem' x-component='Input' x-read-pretty />
									<SchemaField.String name={'editionNo'} title={'版本号'} x-decorator='FormItem' x-component='Input' x-read-pretty />
								</SchemaField.Void>
							</SchemaField.Void>
						</SchemaField>
					</Spin>
				</Form>
			</Modal>
		</>
	);
};

export default MockResolveBtn;
