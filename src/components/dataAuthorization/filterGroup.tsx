import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row, Switch, Space } from 'antd';
import { remove } from 'lodash';
import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import FilterRule from './filterRule';
import { observable } from '@formily/reactive';
import { observer } from '@formily/react';

interface FilterGroup {
    rules: any[],
    connector: any
    groups: FilterGroup[],
    key?: any
} 

interface FilterGroupInterface {
    fields: any[]
    operators: any[]
    valueComponents: any[]
    group: FilterGroup,
    onChange: any
}

const FilterGroup = (props: FilterGroupInterface) => {
    const { fields, operators, valueComponents, onChange } = props;

    let [group, setGroup] = useState<{ value: FilterGroup }>(() => {
        return observable.deep({
            value: props.group ? props.group : { rules: [], connector: "and", groups: [] },
        });
    });

    const ruleChange = (rule, ruleIndex: number, groupIndex?: number) => {
        if (groupIndex === undefined) {
            group.value.rules[ruleIndex] = rule
        } else {
            group.value.groups[groupIndex!].rules[ruleIndex] = rule;
        }
        if(onChange ) onChange(group);
    }
    const addEach =(arr,key)=>{
        arr.forEach(item=>{
            if(item.key === key){
                item.groups.push({ rules: [], connector: "and", groups: [] ,key: uuidv4()});
            }else{
                addEach(item.groups,key)
            }
        })
    }
    const addGroup = (index?: number,key?:any) => {
        if (index === undefined) {
            group.value.groups.push({ rules: [], connector: "and", groups: [] ,key: uuidv4()});
        } else {
            addEach(group.value.groups,key)
            // group.value.groups[index!].groups.push({ rules: [], connector: "and", groups: [] ,key: uuidv4()});
        }

        if(onChange ) onChange(group);
    };
    const removeEach =(arr,key)=>{
        if(arr.find(i=>i.key==key)){
            remove(arr, (item: any, index: any) => {
                return key === item.key;
            });
        }else
        arr.forEach(item=>{
            removeEach(item.groups,key)
        })
    }
    const removeGroup = (key: any) => {
        removeEach(group.value.groups,key)
        if(onChange ) onChange(group);
    };
    const addRuleEach =(arr,key)=>{
        arr.forEach(item=>{
            if(item.key === key){
                item.rules.push({ key: uuidv4() });
            }else{
                addRuleEach(item.groups,key)
            }
        })
    }
    const addRule = (index?: number,key?:any) => {
        if (index === undefined) {
            group.value.rules.push({ key: uuidv4() })
        } else {
            addRuleEach( group.value.groups,key)
            // group.value.groups[index!].rules.push({ key: uuidv4() });
        }
        if(onChange ) onChange(group);
    };
    const removeRuleEach =(arr,key,ruleKey)=>{
        if(arr.find(i=>i.key==key)){
            remove(arr.find((i:any)=>i.key==key)?.rules, (rule: any, index: any) => {
                return ruleKey === rule.key;
            });
        }else
        arr.forEach(item=>{
            removeRuleEach(item.groups,key,ruleKey)
        })
    }
 
    const removeRule = (ruleKey: number, groupIndex?: number,key?:any) => {
        if(groupIndex === undefined ){
            remove(group.value.rules, (rule: any, index: any) => {
                return ruleKey === rule.key;
            });
        }else
        removeRuleEach( group.value.groups,key,ruleKey)
       

        if(onChange ) onChange(group);
    };

    const changeConnect = (checked: boolean, groupIndex?: number) => {
        if (groupIndex === undefined) {
            group.value.connector = checked ? "AND" : "OR";
        } else {
            group.value.groups[groupIndex!].connector = checked ? "AND" : "OR";
        }

        if(onChange ) onChange(group);
    }

    const renderGroup = (group: any, index?: number) => {
        console.log(group)
        const { rules, key} = group;
        const ruleLength = rules.length;
        const subStyle = index != undefined ? { marginLeft: 20 } : {};
        return (
            <div style={{
                marginBottom: 10, backgroundColor: "#e6fffb",
                padding: 15,
                borderStyle: "solid", borderWidth: 1, borderColor: "#08979c", borderRadius: 5,
                ...subStyle
            }}>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: 200 }}>
                        <Switch checkedChildren="AND" unCheckedChildren="OR" defaultChecked onChange={(checked) => {
                            changeConnect(checked, index);
                        }} />
                    </div>
                    <div style={{ display: 'flex', flex: 1, justifyContent: "flex-end" }}>
                        <Space>
                            <Button type={'primary'} icon={<PlusOutlined />} onClick={() => { addRule(index,key) }}>新增规则</Button>
                            <Button type={'primary'} icon={<PlusOutlined />} onClick={() => { addGroup(index,key) }}>新增分组</Button>
                            {index != undefined ? <Button type={'primary'} icon={<PlusOutlined />} onClick={() => { removeGroup(key) }}>删除分组</Button> : undefined}
                        </Space>
                    </div>

                </div>

                {rules.map((rule: any, i: any) => {
                    return (
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: 1 }}>
                                <FilterRule
                                    ruleKey={rule.key}
                                    fields={fields}
                                    operators={operators}
                                    valueComponents={valueComponents}
                                    rule={rule}
                                    onChange={(value) => { ruleChange(value, i, index) }}
                                />
                            </div>

                            {ruleLength != 1 ? (
                                <div style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 5 }}>
                                    <Button icon={<CloseOutlined />} onClick={() => { removeRule(rule.key, index,key) }}>删除</Button>
                                </div>
                            ) : null}
                        </div>
                    );
                })}

                {
                    group.groups.map((g, i) => { return renderGroup(g, i) })
                }
            </div>
        );
    }

    return renderGroup(group.value);
}

export default observer(FilterGroup);
