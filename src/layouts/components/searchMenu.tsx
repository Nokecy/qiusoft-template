import React, { } from 'react';
import { Select } from 'antd';
import { history, closeTab, useModel } from 'umi';
import { SearchOutlined, } from "@ant-design/icons";
const { Option } = Select;

export const SelectOrganization = (props) => {
    const { } = props;
    const { initialState } = useModel('@@initialState');

    const formatMenu = (menuData: any, arr: any) => {
        menuData.forEach((i: any) => {
            if (i.url) {
                arr.push(i)
            } else {
                formatMenu(i.items, arr)
            }
        })
    }

    const renderOptions = () => {
        let arr = []
        formatMenu(initialState?.menuData, arr)
        return arr?.map((i: any) => <Option value={i.url} key={i.url}>{i.displayName}</Option>)
    }

    const menuClick = (e) => {
        closeTab(e)
        history.push(e)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="快捷搜索菜单"
                optionFilterProp="children"
                filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                filterSort={(optionA, optionB) =>
                    (optionA!.children as unknown as string)
                        .toLowerCase()
                        .localeCompare((optionB!.children as unknown as string).toLowerCase())
                }
                suffixIcon={<SearchOutlined style={{ color: '#000' }} />}
                onChange={menuClick}
            >
                {renderOptions()}
            </Select>
        </div>
    );
};
