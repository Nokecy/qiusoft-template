import { Tag } from "antd";
import React from "react";

export const OrderTypeRenderStatus = (props: any) => {
    const { value } = props;

    const renderLineStatus = (text: number) => {
        switch (text) {
            case 5:
                return <Tag color={'#108ee9'}>销售出库</Tag>;
            case 6:
                return <Tag color={'#2db7f5'}>车间维修</Tag>;
            case 10:
                return <Tag color={'#87d068'}>生产领料</Tag>;
            case 11:
                return <Tag color={'#faad14'}>杂出</Tag>;
            case 12:
                return <Tag color={'#5ded08'}>服务领料出库</Tag>;
            case 15:
                return <Tag color={'#f50'}>采购退货</Tag>;
            case 16:
                return <Tag color={'#269182'}>客供退货</Tag>;
            case 20:
                return <Tag color={'#1890ff'}>转库出库</Tag>;
            default:
                return <Tag>{''}</Tag>;
        }
    };

    return renderLineStatus(value);
};


export const DemandCallBackStatus = (props: any) => {
    const { value } = props;

    const renderLineStatus = (text: number) => {
        switch (text) {
            case 0:
                return <Tag color={'#d9d9d9'}>不回传</Tag>;
            case 10:
                return <Tag color={'#faad14'}>等待回传</Tag>;
            case 15:
                return <Tag color={'#108ee9'}>回传中</Tag>;
            case 20:
                return <Tag color={'#52c41a'}>回传完成</Tag>;
            case 25:
                return <Tag color={'#f50'}>回传失败</Tag>;
            default:
                return <Tag>{''}</Tag>;
        }
    };

    return renderLineStatus(value);
};

export const DemandStatus = (props: any) => {
    const { value } = props;

    const renderLineStatus = (text: number) => {
        switch (text) {
            case -999:
                return <Tag color={'red'}>待排产</Tag>;
            case 0:
                return <Tag color={'#faad14'}>等待处理</Tag>;
            case 5:
                return <Tag color={'#108ee9'}>处理中</Tag>;
            case 10:
                return <Tag color={'#f50'}>欠料交付</Tag>;
            case 15:
                return <Tag color={'#52c41a'}>已交付</Tag>;
            default:
                return <Tag>{''}</Tag>;
        }
    };

    return renderLineStatus(value);
};
export const PreRegisteredModel = (props: any) => {
    const { value } = props;

    const renderLineStatus = (text: number) => {
        switch (text) {
            case 5:
                return <Tag color={'#faad14'}>按LPN预占</Tag>;
            case 10:
                return <Tag color={'#108ee9'}>按ITEM预占</Tag>;
            case 15:
                return <Tag color={'#52c41a'}>按批次预占</Tag>;
            default:
                return <Tag>{''}</Tag>;
        }
    };

    return renderLineStatus(value);
};




