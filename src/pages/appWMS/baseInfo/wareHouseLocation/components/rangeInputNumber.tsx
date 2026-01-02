import { NumberPicker } from '@formily/antd-v5';
import { useControllableValue } from "ahooks";
import { Space } from "antd";
import React from "react";

interface RangeInputProp {
    max?: number
    placeholder?: string
}

const RangeInputNumber = (props: RangeInputProp) => {
    const [state, setState] = useControllableValue<any[]>({ ...props, defaultValue: [1, 1] });

    return (<Space>
        <NumberPicker value={state && state[0] ? state[0] : 1} max={props.max} min={1} onChange={(value) => {
            state[0] = value;
            setState(state)
        }} />
        至
        <NumberPicker value={state && state[1] ? state[1] : 1} max={props.max} onChange={(value) => {
            state[1] = value;
            setState(state)
        }} />
    </Space>);
}

export default RangeInputNumber