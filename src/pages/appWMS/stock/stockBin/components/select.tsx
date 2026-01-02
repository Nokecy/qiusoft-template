import React from "react";
import { SelectProps, Tag } from "antd";
import { useControllableValue } from "ahooks";
import Select, { SelectValue } from "antd/lib/select";

const { Option } = Select;


const LocationTypeSelect = (props: SelectProps<any>) => {
    const [state, setState] = useControllableValue<SelectValue>(props);
    const gradeMap =  [{ label: "作业区", value: 5 }, { label: "虚拟区", value: 6 }, { label: "存储区", value: 10 }]
  
    return (
        <Select
            style={{ width: "100%" }}
            filterOption={false}
            {...props}
            value={state}
            onChange={e => { setState(e); }}
        >
  {gradeMap.map((i: any) => <Option value={i.value}>{i.label}</Option>)} 
        </Select>
    );
  }

  const IsOpenSelect = (props: SelectProps<any>) => {
    const [state, setState] = useControllableValue<SelectValue>(props);
    const gradeMap =  [{ label: "是", value: true }, { label: "否", value: false }]
  
    return (
        <Select
            style={{ width: "100%" }}
            filterOption={false}
            {...props}
            value={state}
            onChange={e => { setState(e); }}
        >
  {gradeMap.map((i: any) => <Option value={i.value}>{i.label}</Option>)} 
        </Select>
    );
  }

  const IsRoHS = (props: SelectProps<any>) => {
    const [state, setState] = useControllableValue<SelectValue>(props);
    const gradeMap =  [{ label: "是", value: true }, { label: "否", value: false }]
  
    return (
        <Select
            style={{ width: "100%" }}
            filterOption={false}
            {...props}
            value={state}
            onChange={e => { setState(e); }}
        >
  {gradeMap.map((i: any) => <Option value={i.value}>{i.label}</Option>)} 
        </Select>
    );
  }

  const IsMakeOver = (props: SelectProps<any>) => {
    const [state, setState] = useControllableValue<SelectValue>(props);
    const gradeMap =  [{ label: "是", value: true }, { label: "否", value: false }]
  
    return (
        <Select
            style={{ width: "100%" }}
            filterOption={false}
            {...props}
            value={state}
            onChange={e => { setState(e); }}
        >
  {gradeMap.map((i: any) => <Option value={i.value}>{i.label}</Option>)} 
        </Select>
    );
  }
export{LocationTypeSelect,IsOpenSelect,IsRoHS,IsMakeOver}