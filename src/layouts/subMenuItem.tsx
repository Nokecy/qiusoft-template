import { createFromIconfontCN } from '@ant-design/icons';
import { Badge } from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel } from "umi";
import { iconfontUrl } from "../../config/defaultSettings";

let IconFont = createFromIconfontCN({
    scriptUrl: iconfontUrl
});

export default (props) => {
    const { pro_layout_parentKeys } = props;
    const { initialState } = useModel('@@initialState');
    const [badge, setBadge] = useState<any>(100);

    useEffect(() => {
        const badge = initialState?.badges.filter((a: any) => a.name!.indexOf(props.path!) >= 0);
        if (badge && badge?.length > 0) {
            setBadge(badge?.map((a: any) => a.count).reduce((total, num) => total! + num!, 0));
        }
    }, [JSON.stringify(initialState?.badges)]);

    return badge ? <Badge count={badge} offset={[13, 0]} size={"small"} style={{ color: "inherit" }}>
        {props.children}
    </Badge> : <>
        {pro_layout_parentKeys && pro_layout_parentKeys.length > 0 ? <IconFont type={props.icon} /> : null}
        {props.children}
    </>;
};