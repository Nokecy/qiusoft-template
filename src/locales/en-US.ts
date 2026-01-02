import common from './en/common';
import appSYS from './en/appSYS';
import appInvoice from './en/appWorkflow';
import appHRMS from './en/appHRMS';
import appPDM from './en/appPDM';
import tenant from './en/tenant';

export default {
    ...common,
    ...appPDM,
    ...appSYS,
    ...appInvoice,
    ...appHRMS,
    ...tenant
};
