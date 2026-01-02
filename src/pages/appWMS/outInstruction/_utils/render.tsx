
const renderPickOrderStatus = (text) => {
    switch (text) {
        case 10:
            return "等待下架";
        case 20:
            return "下架完成";
        case 30:
            return "收货完成";
        case 40:
            return "部分上架";
        case 50:
            return "上架完成";
        default:
    }
};

export { renderPickOrderStatus };