import { Select } from 'antd';
import React from 'react';

class DefaultDefintionSelect extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: this.props.value || undefined,
        };
    }

    componentWillReceiveProps(nextProps: { value: any }) {
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState({ value: value });
        }
    }

    onChange(value: any) {
        const onChange = this.props.onChange;
        this.setState({ value: value }, () => {
            if (onChange) {
                onChange(value);
            }
        });
    }

    render() {
        const { value } = this.state;
        return (
            <>
                <Select
                    onChange={this.onChange.bind(this)}
                    value={value}
                    allowClear
                    placeholder={'选择数据'}
                >
                    <Select.Option value={`{CurrentUserID}`}>当前用户</Select.Option>
                    <Select.Option value={`{CurrentRoleID}`}>当前角色</Select.Option>
                    <Select.Option value={`{CurrentUserCode}`}>当前用户Code</Select.Option>
                </Select>
            </>
        );
    }
}

export default DefaultDefintionSelect;
