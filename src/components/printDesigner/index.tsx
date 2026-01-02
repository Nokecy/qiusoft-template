import 'devexpress-reporting/dx-reportdesigner';
import ko from 'knockout';
import { Spin } from 'antd';
import React, { useLayoutEffect, useRef, useState } from 'react';
import CorezhCN from './dx-analytics-core.zh-CN.json';
import ReportingzhCN from './dx-reporting.zh-CN.json';
import { useBoolean } from 'ahooks';
import './reportDesigner.css';

const ReportDesigner = (props: any) => {
    const { name, baseUrl } = props;
    const [spinning, { setFalse }] = useBoolean();
    const [saveCount, setSaveCount] = useState<number>(0);
    const designerRef = useRef<any>();

    useLayoutEffect(() => {
        ko.applyBindings(
            {
                reportUrl: ko.observable(name),
                requestOptions: {
                    host: `${baseUrl}/`,
                    getDesignerModelAction: `api/BurnAbpReportDesigner/GetReportDesignerModel`,
                },
                callbacks: {
                    CustomizeLocalization: function (s, e) {
                        e.LoadMessages(CorezhCN);
                        e.LoadMessages(ReportingzhCN);
                    },
                    ReportOpened: () => {
                        setFalse();
                    },
                    ReportSaved: () => {
                        setSaveCount(saveCount + 1);
                    },
                },
            },
            designerRef.current
        );

        return () => {
            ko.cleanNode(designerRef.current);
        };
    }, [saveCount]);

    return (
        <Spin spinning={spinning}>
            <div ref={designerRef} data-bind='dxReportDesigner: $data' style={{ height: '700px' }}></div>
        </Spin>
    );
};

export default ReportDesigner;
