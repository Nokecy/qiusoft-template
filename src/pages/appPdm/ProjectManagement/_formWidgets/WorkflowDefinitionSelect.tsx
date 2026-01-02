import { ElsaWorkflowsApiEndpointsWorkflowDefinitionsListList } from '@/services/workflow/WorkflowDefinitions';
import { Select } from '@formily/antd-v5';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option } = AntSelect;

interface WorkflowDefinitionSelectProps extends SelectProps<any> {
  labelInValue?: boolean;
}

const getData = () => {
  return ElsaWorkflowsApiEndpointsWorkflowDefinitionsListList({
    PageSize: 1000,
    Page: 0,
    VersionOptions: 'Latest'
  });
};

const WorkflowDefinitionSelect: React.FC<WorkflowDefinitionSelectProps> = (props) => {
  const { labelInValue = false, ...restProps } = props;
  const [state, setState] = useControllableValue<SelectValue>(props);

  const { data, loading, run, cancel } = useRequest(getData, {
    debounceMaxWait: 500,
    manual: false
  });

  const handleChange = (value: any, option: any) => {
    if (labelInValue && option) {
      // labelInValue 模式：返回 { value, label } 格式
      setState({
        value: option.value,
        label: option.children || option.label
      });
    } else {
      setState(value);
    }

    if (props.onChange) {
      props.onChange(value, option);
    }
  };

  return (
    <Select
      placeholder='请选择审批流'
      style={{ width: '100%' }}
      showSearch
      allowClear
      {...restProps}
      loading={loading}
      onBlur={cancel}
      value={labelInValue && state ? (state as any).value : state}
      onChange={handleChange}
      filterOption={(input, option: any) => {
        const label = option?.children || option?.label || '';
        return label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }}
    >
      {data?.items
        ?.filter((item: any) => !!item?.definitionId && !!item?.name && item?.isPublished)
        .map((item: any) => {
          const mainLabel = item.name ?? item.description ?? item.definitionId ?? '(未命名流程)';
          const versionLabel = item.version === undefined || item.version === null ? '[v?]' : `[v${item.version}]`;
          const baseText = item.description && item.name ? `${item.name} - ${item.description}` : mainLabel;
          const displayText = `${versionLabel}${baseText}`;
          return (
            <Option
              key={item.definitionId}
              // 按《动态流程代理实现文档》第 8 章：业务侧发起流程使用 StartWorkflowByNameAsync，需保存 workflow definition name
              value={item.name}
              title={displayText}
            >
              {displayText}
            </Option>
          );
        })}
    </Select>
  );
};

//@ts-ignore
WorkflowDefinitionSelect.GroupName = "PDM";
export default WorkflowDefinitionSelect;
export { WorkflowDefinitionSelect };
