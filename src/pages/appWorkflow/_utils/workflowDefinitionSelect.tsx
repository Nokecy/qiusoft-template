import { ElsaWorkflowsApiEndpointsWorkflowDefinitionsListList } from '@/services/workflow/WorkflowDefinitions';
import { Select } from '@formily/antd-v5';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';
const { Option } = AntSelect;

const getData = () => {
	return ElsaWorkflowsApiEndpointsWorkflowDefinitionsListList({ Page: 0, PageSize: 1000 });
};

const WorkflowDefinitionSelect = (props: SelectProps<any>, ref) => {
	const [state, setState] = useControllableValue<SelectValue>(props);

	const { data, loading, cancel } = useRequest(getData, { debounceMaxWait: 500 });

	return (
		<span ref={ref}>
			<Select
				placeholder='选择流程定义'
				style={{ width: '100%' }}
				showSearch
				{...props}
				loading={loading}
				onBlur={cancel}
				value={state}
				onChange={e => {
					setState(e);
				}}
			>
				{data?.items
					?.filter(item => !!item?.definitionId && item?.isPublished)
					.map(item => {
						const baseLabel = item.description ?? item.name ?? item.definitionId ?? '(未命名流程)';
						const versionLabel = item.version === undefined || item.version === null ? '[v?]' : `[v${item.version}]`;
						const label = `${versionLabel}${baseLabel}`;
						const title =
							[versionLabel, item.name, item.description, item.definitionId].filter(Boolean).join(' / ') ||
							label;
						return (
							<Option
								key={item.definitionId}
								value={item.definitionId}
								title={title}
							>
								{label}
							</Option>
						);
				})}
			</Select>
		</span>
	);
};

export default React.forwardRef(WorkflowDefinitionSelect);
