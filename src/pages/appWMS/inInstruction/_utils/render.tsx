
const renderAsnOrderStatus = (text) => {
    switch (text) {
        case 10:
            return "等待收货";
        case 20:
            return "部分收货";
        case 30:
            return "收货完成";
        case 40:
            return "部分上架";
        case 50:
            return "上架完成";
        default:
    }
};

const renderBarcodeType = (text) => {
    switch (text) {
        case 0:
            return "批次条码";
        case 1:
            return "箱条码";
        default:
    }
};

export { renderAsnOrderStatus, renderBarcodeType };