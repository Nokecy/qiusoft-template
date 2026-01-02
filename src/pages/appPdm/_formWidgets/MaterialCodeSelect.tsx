import React, { useEffect, useMemo, useState } from 'react';
import { Select } from 'antd';
import { debounce } from 'lodash';
import { PartDocumentChangeOrderGetMaterialCodesAsync } from '@/services/pdm/PartDocumentChangeOrder';

/**
 * 物料编码选择组件
 * - 数据源：后端 lookup（去重的 PartDocumentLink.PartNumber）
 * - 支持模糊搜索
 */
export const MaterialCodeSelect: React.FC<any> = (props) => {
	const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
	const [loading, setLoading] = useState(false);

	const { onChange: externalOnChange, onSearch: externalOnSearch, ...restProps } = props || {};

	const load = async (keyword?: string) => {
		setLoading(true);
		try {
			const res = await PartDocumentChangeOrderGetMaterialCodesAsync({
				keyword,
				maxResultCount: 50,
			} as any);

			// ABP ListResultDto 格式：{ items: [...] }
			const list = res?.items ?? (Array.isArray(res) ? res : []);
			const opts = (list || [])
				.map((x: any) => {
					const code = (x.materialCode ?? x.partNo ?? x.partNumber ?? '').toString().trim();
					return code ? { label: code, value: code } : null;
				})
				.filter(Boolean) as { label: string; value: string }[];

			setOptions(opts);
		} finally {
			setLoading(false);
		}
	};

	const debouncedLoad = useMemo(() => debounce(load, 300), []);

	useEffect(() => {
		load();
		return () => {
			debouncedLoad.cancel();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Select
			{...restProps}
			allowClear
			showSearch
			loading={loading}
			placeholder={restProps.placeholder || '请选择物料编码'}
			options={options}
			filterOption={false}
			onSearch={(value: string) => {
				debouncedLoad(value);
				externalOnSearch?.(value);
			}}
			onChange={(value: any, option: any) => {
				externalOnChange?.(value, option);
			}}
		/>
	);
};

export default MaterialCodeSelect;

