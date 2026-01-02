const getDefaultOper = (opers: any) => {
    return opers.concat([
        { value: 0, text: '等于' },
        { value: 1, text: '不等于' },
        { value: 2, text: '小于' },
        { value: 3, text: '大于' },
        { value: 4, text: '大于等于' },
        { value: 5, text: '小于等于' },
        { value: 6, text: '包含' },
        { value: 8, text: '以...开头' },
        { value: 10, text: '以...结尾' },
    ]);
};

const getDefaultFields = (fields: any) => {
    return fields.concat([
        { value: '{CurrentUserID}', text: '当前用户', type: 'userSelect', Oper: ['Equal'] },
        { value: '{CurrentRoleID}', text: '当前角色', type: 'roleSelect', Oper: ['Included'] },
        { value: '{CurrentUserCode}', text: '当前用户Code', type: 'userSelect', Oper: ['Contains'] },
    ]);
};

export { getDefaultOper, getDefaultFields };