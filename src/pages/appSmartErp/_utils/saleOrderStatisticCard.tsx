import React from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-card';

export default () => {
    return (
        <StatisticCard
            title="销售趋势"
            tip="销售说明"
            style={{ maxWidth: 480 }}
            extra={<EllipsisOutlined />}
            chart={
                <img
                    src="https://gw.alipayobjects.com/zos/alicdn/a-LN9RTYq/zhuzhuangtu.svg"
                    alt="柱状图"
                    width="100%"
                />
            }
        />
    );
};