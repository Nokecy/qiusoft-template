const renderPickType = ({ text }) => {
    switch (text) {
        case 10:
            return "先进先出";
        case 20:
            return "滚动发料";
        case 30:
            return "按批次发料"
        default:
            return "未知"
    }
}

export { renderPickType }