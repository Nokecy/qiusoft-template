import React from 'react';
import { Tag } from 'antd';

const MaterialComFromDisplay: React.FC<{ value: string; comeFromList: any[] }> = ({ value, comeFromList }) => {
    const item = comeFromList.find(x => x.comFormCode === value);

    if (!item) {
        return <Tag color={'#d9d9d9'}>未知</Tag>;
    }

    const getTagColor = (code: string) => {
        switch (code) {
            case '10':
            case '13':
                return 'success';
            case '20':
            case '30':
                return 'cyan';
            default:
                return 'error';
        }
    };

    return <Tag color={getTagColor(value)}>{item.comFormName}</Tag>;
};

export default MaterialComFromDisplay;