import common from './zh-CN/common';
import appSYS from './zh-CN/appSYS';
import appInvoice from './zh-CN/appWorkflow';
import appHRMS from './zh-CN/appHRMS';
import appPDM from './zh-CN/appPDM';
import tenant from './zh-CN/tenant';
import wms from './zh-CN/appWMS';
import ewms from './zh-CN/appEWMS'
export default {
    ...common,
    ...appPDM,
    ...appSYS,
    ...appInvoice,
    ...appHRMS,
    ...tenant,
    ...wms,
    ...ewms
};
