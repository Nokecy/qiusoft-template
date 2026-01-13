import common from './en-US/common';
import appSYS from './en-US/appSYS';
import appInvoice from './en-US/appWorkflow';
import appHRMS from './en-US/appHRMS';
import appPDM from './en-US/appPDM';
import tenant from './en-US/tenant';

export default {
    ...common,
    ...appPDM,
    ...appSYS,
    ...appInvoice,
    ...appHRMS,
    ...tenant
};
