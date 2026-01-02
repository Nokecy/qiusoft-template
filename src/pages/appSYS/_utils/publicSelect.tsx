///@ts-nocheck
import { DialogSelect } from '@nokecy/qc-ui';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import {  SelectValue } from 'antd/lib/select';
import React, { useEffect } from 'react';
import { request } from 'umi';
const { Option } = AntSelect;

/**
 * public选择器
 * @param props { valueField?:any, labelField?:any, api, placeholder}
 * @param ref
 * @returns
 */
const StationGroup = (props: any, ref) => {
	let { keyValueInSearch, columnDefs, method } = props;
	const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
		let r = Filter?.split(',') || []
		let formatR = (re) => {
			return r.find(i => i.indexOf(re) !== -1) || ""
		}
		let p: any;
		if (keyValueInSearch) {
			p = {
				PageCount: MaxResultCount || 20,
				PageIndex: SkipCount || 1,
				code: formatR("code").split('^')[1]?.trim(),
				name: formatR("name").split('^')[1]?.trim(),
			}
			columnDefs?.forEach(i => {
				p[i.field] = formatR(i.field).split('^')[1]?.trim()
			})
		}
		let options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			data: keyValueInSearch ? p : (props.params || {
				...{ Filter, Sorting, SkipCount, MaxResultCount: MaxResultCount || 20 },
			}),
			...{},
		}
		return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpMESDepartInfoDto>(props.api || '', method ? options : {
			method: 'GET',
			params: keyValueInSearch ? p : (props.params || {
				...{ Filter, Sorting, SkipCount, MaxResultCount: MaxResultCount || 20 },
			}),
			...{},
		}).then((res: any) => {
			if (res.items) {
				if (props.mergeDataSource) {
					res.items = [...props.mergeDataSource, ...res.items]
				}
				if (props.formatResult) {
					res.items = res.items.map(i => i[props.formatResult]);
				}
				return res;
			} else {
				if (props.mergeDataSource) {
					res = [...props.mergeDataSource, ...res]
				}
				if (props.formatResult) {
					res = props.formatResult(res);
				}
				return { items: res, total: res.length };
			}
		});
	};
	const [state, setState] = useControllableValue<SelectValue>(props);

	const { data, loading, run, cancel } = useRequest(getData, { debounceMaxWait: 500, manual: true });
	const formatFilter = key => {
		if (props.formatResult) {
			return `${props.formatResult}.${key || 'name'}`;
		}
		return `${key || 'name'}`;
	};
	useEffect(() => {
		if (!props.labelInValue) {
			!props.method&&run({ Filter: props.filter ? `${props.filter}` : undefined })
		}
	}, [0])
	return (
		<span ref={ref}>
			<DialogSelect
				placeholder='请选择'
				style={{ width: '100%' }}
				showSearch
				allowClear
				onSearch={value => {
					if (value) run({ Filter: props.filter ? `${props.filter},${formatFilter(props.labelField)}=*${value}` : `${formatFilter(props.labelField)}=*${value}` });
				}}
				onDropdownVisibleChange={visible => {
				
					visible && run({ Filter: props.filter ? `${props.filter}` : undefined });
				}}
				request={({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
					return getData({ Filter: props.filter ? (Filter ? `${props.filter},${Filter}` : props.filter) : Filter, Sorting, SkipCount, MaxResultCount });
				}}
				loading={loading}
				onBlur={cancel}
				value={JSON.stringify(state) === '{}' ? undefined : state}
				onChange={e => {
					if(props.keyField){
						setState(e);
						return
					}
					setState(e);
				}}
				valueField={"code"}
				labelField={"name"}
				columnDefs={[
					{ field: props.valueField || 'code', headerName: '编码', flex: 1 },
					{ field: props.labelField || 'name', headerName: '名称', flex: 1 },
				]}
				{...props}
			>
				{
					///@ts-ignore
					Array.isArray(data?.items) && data?.items.map(i => <Option key={i[props.keyField || 'id']} value={i[props.valueField || 'code']}>{`${i[props.labelField || 'name']}`}</Option>)
				}
			</DialogSelect>
		</span>
	);
};

export default React.forwardRef(StationGroup);
