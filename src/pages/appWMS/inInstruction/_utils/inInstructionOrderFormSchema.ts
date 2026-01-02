import {ISchema} from '@formily/react'

export const formId: string = "Wms.InInstructionOrder";

export const form: Record<string, any> = {
    labelWidth: 110,
    feedbackLayout: "none",
    layout: "horizontal",
    previewTextPlaceholder: "无"
}

export const getFormSchema = (orderType?: number): { form: Record<string, any>, schema: ISchema } => {
    // 判断是否为其他入库（orderType=25）
    const isNoOrderIn = orderType === 25;
    // 判断是否为期初入库（orderType=0）
    const isDefaultIn = orderType === 0;
    // 判断是否为采购订单入库（orderType=5）
    const isPurchaseOrder = orderType === 5;
    // 判断是否为客供入库（orderType=6）
    const isCustomerSupply = orderType === 6;

    return {
        "form": {
            "labelWidth": "110px",
            "feedbackLayout": "none",
            "layout": "horizontal",
            "previewTextPlaceholder": "无"
        },
        "schema": {
            "type": "object",
            "properties": {
                "basicInfoCard": {
                    "type": "void",
                    "x-component": "ProCard",
                    "x-component-props": {
                        "title": "基本信息",
                        "collapsible": false,
                        "headerBordered": true
                    },
                    "x-designable-id": "basicInfoCard",
                    "x-index": 0,
                    "properties": {
                        "basicInfoGrid": {
                            "type": "void",
                            "x-component": "FormGrid",
                            "x-component-props": {
                                "maxColumns": [1, 4],
                                "strictAutoFit": true
                            },
                            "x-designable-id": "basicInfoGrid",
                            "x-index": 0,
                            "properties": {
                                "orderNoColumn": {
                                    "type": "void",
                                    "x-component": "FormGrid.GridColumn",
                                    "x-designable-id": "orderNoColumn",
                                    "x-index": 0,
                                    "properties": {
                                        "orderNo": {
                                            "type": "string",
                                            "title": "入库单号",
                                            "x-decorator": "FormItem",
                                            "x-component": "Input",
                                            "x-read-pretty": true,
                                            "name": "orderNo",
                                            "x-designable-id": "orderNo",
                                            "x-index": 0
                                        }
                                    }
                                },
                                "wareHouseColumn": {
                                    "type": "void",
                                    "x-component": "FormGrid.GridColumn",
                                    "x-designable-id": "wareHouseColumn",
                                    "x-index": 1,
                                    "properties": {
                                        "{value:wareHouseId,label:wareHouseName}": {
                                            "type": "string",
                                            "title": "入库仓库",
                                            "x-decorator": "FormItem",
                                            "x-component": "WareHouseSelect",
                                            "x-component-props": {
                                                "placeholder": "请输入入库仓库"
                                            },
                                            "name": "{value:wareHouseId,label:wareHouseName}",
                                            "required": true,
                                            "x-designable-id": "wareHouseSelect",
                                            "x-index": 0
                                        }
                                    }
                                },
                                ...(!(isNoOrderIn || isDefaultIn) ? {} : {
                                    "callBackColumn": {
                                        "type": "void",
                                        "x-component": "FormGrid.GridColumn",
                                        "x-designable-id": "callBackColumn",
                                        "x-index": 2,
                                        "properties": {
                                            "shouldCallBack": {
                                                "type": "boolean",
                                                "title": "是否回传",
                                                "x-decorator": "FormItem",
                                                "x-component": "Checkbox",
                                                "default": false,
                                                "name": "shouldCallBack",
                                                "x-designable-id": "shouldCallBack",
                                                "x-index": 0
                                            }
                                        }
                                    }
                                }),
                                "senderColumn": {
                                    "type": "void",
                                    "x-component": "FormGrid.GridColumn",
                                    "x-designable-id": "senderColumn",
                                    "x-index": 3,
                                    "properties": {
                                        "sender": {
                                            "type": "object",
                                            "name": "sender",
                                            "x-designable-id": "senderObject",
                                            "x-index": 0,
                                            "properties": {
                                                "name": {
                                                    "type": "string",
                                                    "title": isDefaultIn ? "送货人" : (isPurchaseOrder ? "供应商" : (isCustomerSupply ? "客户" : "送货对象")),
                                                    "x-decorator": "FormItem",
                                                    "x-component": (isNoOrderIn || isDefaultIn) ? "Input" : (isPurchaseOrder ? "SupplierSelect" : (isCustomerSupply ? "CustomerSelect" : "ContactInfoSelect")),
                                                    "x-component-props": {
                                                        "placeholder": isDefaultIn ? "请输入送货人姓名" : (isPurchaseOrder ? "请选择供应商" : (isCustomerSupply ? "请选择客户" : "请输入交付对象编码"))
                                                    },
                                                    "name": "name",
                                                    "required": (isPurchaseOrder || isCustomerSupply) ? true : false,
                                                    "x-designable-id": "senderName",
                                                    "x-index": 0
                                                }
                                            }
                                        }
                                    }
                                },
                                "contactColumn": {
                                    "type": "void",
                                    "x-component": "FormGrid.GridColumn",
                                    "x-designable-id": "contactColumn",
                                    "x-index": 4,
                                    "properties": {
                                        "sender.contact": {
                                            "type": "string",
                                            "title": isPurchaseOrder ? "供应商联系人" : (isCustomerSupply ? "客户联系人" : "送货联系人"),
                                            "x-decorator": "FormItem",
                                            "x-component": "Input",
                                            "x-component-props": {
                                                "placeholder": isPurchaseOrder ? "请输入供应商联系人" : (isCustomerSupply ? "请输入客户联系人" : "请输入联系人")
                                            },
                                            "name": "sender.contact",
                                            "x-designable-id": "senderContact",
                                            "x-index": 0
                                        }
                                    }
                                },
                                "telColumn": {
                                    "type": "void",
                                    "x-component": "FormGrid.GridColumn",
                                    "x-designable-id": "telColumn",
                                    "x-index": 5,
                                    "properties": {
                                        "sender.tel": {
                                            "type": "string",
                                            "title": "联系电话",
                                            "x-decorator": "FormItem",
                                            "x-component": "Input",
                                            "x-component-props": {
                                                "placeholder": "请输入联系电话"
                                            },
                                            "name": "sender.tel",
                                            "x-designable-id": "senderTel",
                                            "x-index": 0
                                        }
                                    }
                                },
                                "addressColumn": {
                                    "type": "void",
                                    "x-component": "FormGrid.GridColumn",
                                    "x-component-props": {
                                        "gridSpan": 4
                                    },
                                    "x-designable-id": "addressColumn",
                                    "x-index": 6,
                                    "properties": {
                                        "sender.address": {
                                            "type": "string",
                                            "title": "送货地址",
                                            "x-decorator": "FormItem",
                                            "x-component": "Input",
                                            "x-component-props": {
                                                "placeholder": "请输入交付地址"
                                            },
                                            "name": "sender.address",
                                            "x-designable-id": "senderAddress",
                                            "x-index": 0
                                        }
                                    }
                                },
                                "expectedArriveTimeColumn": {
                                    "type": "void",
                                    "x-component": "FormGrid.GridColumn",
                                    "x-designable-id": "expectedArriveTimeColumn",
                                    "x-index": 7,
                                    "properties": {
                                        "expectedArriveTime": {
                                            "type": "string",
                                            "title": "预期到货时间",
                                            "x-decorator": "FormItem",
                                            "x-component": "DatePicker",
                                            "x-component-props": {
                                                "placeholder": "请输入交付日期"
                                            },
                                            "name": "expectedArriveTime",
                                            "required": true,
                                            "x-designable-id": "expectedArriveTime",
                                            "x-index": 0
                                        }
                                    }
                                },
                                ...((isNoOrderIn || isDefaultIn) ? {} : {
                                    "vehicleTypeColumn": {
                                        "type": "void",
                                        "x-component": "FormGrid.GridColumn",
                                        "x-designable-id": "vehicleTypeColumn",
                                        "x-index": 8,
                                        "properties": {
                                            "deliveryVehicleType": {
                                                "type": "string",
                                                "title": "车型",
                                                "x-decorator": "FormItem",
                                                "x-component": "Input",
                                                "x-component-props": {
                                                    "placeholder": "请输入车型"
                                                },
                                                "name": "deliveryVehicleType",
                                                "x-designable-id": "deliveryVehicleType",
                                                "x-index": 0
                                            }
                                        }
                                    },
                                    "vehicleNoColumn": {
                                        "type": "void",
                                        "x-component": "FormGrid.GridColumn",
                                        "x-designable-id": "vehicleNoColumn",
                                        "x-index": 9,
                                        "properties": {
                                            "deliveryVehicleNo": {
                                                "type": "string",
                                                "title": "车牌",
                                                "x-decorator": "FormItem",
                                                "x-component": "Input",
                                                "x-component-props": {
                                                    "placeholder": "请输入车牌"
                                                },
                                                "name": "deliveryVehicleNo",
                                                "x-designable-id": "deliveryVehicleNo",
                                                "x-index": 0
                                            }
                                        }
                                    },
                                    "driverColumn": {
                                        "type": "void",
                                        "x-component": "FormGrid.GridColumn",
                                        "x-designable-id": "driverColumn",
                                        "x-index": 10,
                                        "properties": {
                                            "driver": {
                                                "type": "string",
                                                "title": "司机",
                                                "x-decorator": "FormItem",
                                                "x-component": "Input",
                                                "x-component-props": {
                                                    "placeholder": "请输入司机"
                                                },
                                                "name": "driver",
                                                "x-designable-id": "driver",
                                                "x-index": 0
                                            }
                                        }
                                    }
                                }),
                                "remarkColumn": {
                                    "type": "void",
                                    "x-component": "FormGrid.GridColumn",
                                    "x-component-props": {
                                        "gridSpan": 4
                                    },
                                    "x-designable-id": "remarkColumn",
                                    "x-index": 11,
                                    "properties": {
                                        "remark": {
                                            "type": "string",
                                            "title": "备注",
                                            "x-decorator": "FormItem",
                                            "x-component": "Input.TextArea",
                                            "x-component-props": {
                                                "placeholder": "请输入备注"
                                            },
                                            "name": "remark",
                                            "x-designable-id": "remark",
                                            "x-index": 0
                                        }
                                    }
                                },
                                "itemsColumn": {
                                    "type": "void",
                                    "x-component": "FormGrid.GridColumn",
                                    "x-component-props": {
                                        "gridSpan": 4
                                    },
                                    "x-designable-id": "itemsColumn",
                                    "x-index": 12,
                                    "properties": {
                                        "items": {
                                            "type": "array",
                                            "title": "到货明细",
                                            "x-decorator": "FormItem",
                                            "x-component": "ArrayTable",
                                            "x-component-props": {
                                                "gridKey": "appWMS.inInstruction.inInstructionOrder.items"
                                            },
                                            "x-validator": [
                                                {
                                                    "message": "到货明细必须填写"
                                                }
                                            ],
                                            "name": "items",
                                            "required": true,
                                            "x-designable-id": "itemsArray",
                                            "x-index": 0,
                                            "items": {
                                                "type": "object",
                                                "properties": {

                                                    "sourceOrderNoColumn": {
                                                        "type": "void",
                                                        "x-component": "ArrayTable.Column",
                                                        "x-component-props": {
                                                            "width": 150,
                                                            "title": "源单据号",
                                                            "fixed": "left"
                                                        },
                                                        "x-designable-id": "sourceOrderNoColumn",
                                                        "x-index": 0,
                                                        "properties": {
                                                            "sourceOrderNo": {
                                                                "type": "string",
                                                                "x-decorator": "FormItem",
                                                                "x-component": "Input",
                                                                "x-read-pretty": true,
                                                                "name": "sourceOrderNo",
                                                                "required": true,
                                                                "x-designable-id": "sourceOrderNo",
                                                                "x-index": 0
                                                            },
                                                            "sourceOrderItemId": {
                                                                "type": "string",
                                                                "x-decorator": "FormItem",
                                                                "x-component": "Input",
                                                                "x-hidden": true,
                                                                "name": "sourceOrderItemId",
                                                                "required": true,
                                                                "x-designable-id": "sourceOrderItemId",
                                                                "x-index": 1
                                                            }
                                                        }
                                                    },
                                                    "materialCodeColumn": {
                                                        "type": "void",
                                                        "x-component": "ArrayTable.Column",
                                                        "x-component-props": {
                                                            "width": 190,
                                                            "title": "物料编码",
                                                            "fixed": "left"
                                                        },
                                                        "x-designable-id": "materialCodeColumn",
                                                        "x-index": 1,
                                                        "properties": {
                                                            "{value:materialId,label:materialCode}": {
                                                                "type": "string",
                                                                "x-decorator": "FormItem",
                                                                "x-component": "MaterailItemSelect",
                                                                "x-component-props": {
                                                                    "labelInValue": true,
                                                                    "placeholder": "请输入物料编码"
                                                                },
                                                                "name": "{value:materialId,label:materialCode}",
                                                                "required": true,
                                                                "x-designable-id": "materialSelect",
                                                                "x-index": 0
                                                            }
                                                        }
                                                    },
                                                    "materialOutCodeColumn": {
                                                        "type": "void",
                                                        "x-component": "ArrayTable.Column",
                                                        "x-component-props": {
                                                            "width": 150,
                                                            "title": "物料外码",
                                                            "fixed": "left"
                                                        },
                                                        "x-designable-id": "materialOutCodeColumn",
                                                        "x-index": 2,
                                                        "properties": {
                                                            "materialOutCode": {
                                                                "type": "string",
                                                                "x-decorator": "FormItem",
                                                                "x-component": "Input",
                                                                "x-read-pretty": true,
                                                                "name": "materialOutCode",
                                                                "x-designable-id": "materialOutCode",
                                                                "x-index": 0
                                                            }
                                                        }
                                                    },
                                                    "materialDescriptColumn": {
                                                        "type": "void",
                                                        "x-component": "ArrayTable.Column",
                                                        "x-component-props": {
                                                            "title": "物料描述",
                                                            "fixed": "left",
                                                            "ellipsis": true
                                                        },
                                                        "x-designable-id": "materialDescriptColumn",
                                                        "x-index": 3,
                                                        "properties": {
                                                            "materialDescript": {
                                                                "type": "string",
                                                                "x-decorator": "FormItem",
                                                                "x-component": "Input",
                                                                "x-component-props": {
                                                                    "placeholder": "请输入物料描述"
                                                                },
                                                                "x-read-pretty": true,
                                                                "name": "materialDescript",
                                                                "x-designable-id": "materialDescript",
                                                                "x-index": 0
                                                            }
                                                        }
                                                    },
                                                    "versionColumn": {
                                                        "type": "void",
                                                        "x-component": "ArrayTable.Column",
                                                        "x-component-props": {
                                                            "title": "物料版本",
                                                            "fixed": "left",
                                                            "ellipsis": true
                                                        },
                                                        "x-designable-id": "versionColumn",
                                                        "x-index": 4,
                                                        "properties": {
                                                            "version": {
                                                                "type": "string",
                                                                "x-decorator": "FormItem",
                                                                "x-component": "Input",
                                                                "x-component-props": {
                                                                    "placeholder": "请输入物料版本"
                                                                },
                                                                "x-read-pretty": true,
                                                                "name": "version",
                                                                "x-designable-id": "version",
                                                                "x-index": 0
                                                            }
                                                        }
                                                    },
                                                    "acPropertyColumn": {
                                                        "type": "void",
                                                        "x-component": "ArrayTable.Column",
                                                        "x-component-props": {
                                                            "title": "AC属性",
                                                            "fixed": "left",
                                                            "ellipsis": true
                                                        },
                                                        "x-designable-id": "acPropertyColumn",
                                                        "x-index": 5,
                                                        "properties": {
                                                            "acProperty": {
                                                                "type": "string",
                                                                "x-decorator": "FormItem",
                                                                "x-component": "Input",
                                                                "x-component-props": {
                                                                    "placeholder": "请输入AC属性"
                                                                },
                                                                "name": "acProperty",
                                                                "x-designable-id": "acProperty",
                                                                "x-index": 0
                                                            }
                                                        }
                                                    },
                                                    "minPackQtyColumn": {
                                                        "type": "void",
                                                        "x-component": "ArrayTable.Column",
                                                        "x-component-props": {
                                                            "title": "最小包装",
                                                            "fixed": "left",
                                                            "ellipsis": true
                                                        },
                                                        "x-designable-id": "minPackQtyColumn",
                                                        "x-index": 6,
                                                        "properties": {
                                                            "minPackQty": {
                                                                "type": "number",
                                                                "x-decorator": "FormItem",
                                                                "x-component": "NumberPicker",
                                                                "x-component-props": {
                                                                    "placeholder": "请输入最小包装"
                                                                },
                                                                "name": "minPackQty",
                                                                "x-designable-id": "minPackQty",
                                                                "x-index": 0
                                                            }
                                                        }
                                                    },
                                                    "deliveryQtyColumn": {
                                                        "type": "void",
                                                        "x-component": "ArrayTable.Column",
                                                        "x-component-props": {
                                                            "width": 100,
                                                            "title": "交付数量"
                                                        },
                                                        "x-designable-id": "deliveryQtyColumn",
                                                        "x-index": 7,
                                                        "properties": {
                                                            "deliveryQty": {
                                                                "type": "number",
                                                                "x-decorator": "FormItem",
                                                                "x-component": "NumberPicker",
                                                                "x-component-props": {
                                                                    "placeholder": "请输入数量"
                                                                },
                                                                "name": "deliveryQty",
                                                                "required": true,
                                                                "x-designable-id": "deliveryQty",
                                                                "x-index": 0
                                                            }
                                                        }
                                                    },
                                                    "supplierCodeColumn": {
                                                        "type": "void",
                                                        "x-component": "ArrayTable.Column",
                                                        "x-component-props": {
                                                            "title": "供应商编码",
                                                            "fixed": "left",
                                                            "ellipsis": true
                                                        },
                                                        "x-designable-id": "supplierCodeColumn",
                                                        "x-index": 8,
                                                        "properties": {
                                                            "supplierCode": {
                                                                "type": "string",
                                                                "x-decorator": "FormItem",
                                                                "x-component": "Input",
                                                                "x-read-pretty": true,
                                                                "name": "supplierCode",
                                                                "x-designable-id": "supplierCode",
                                                                "x-index": 0
                                                            }
                                                        }
                                                    },
                                                    "supplierNameColumn": {
                                                        "type": "void",
                                                        "x-component": "ArrayTable.Column",
                                                        "x-component-props": {
                                                            "title": "供应商名称",
                                                            "fixed": "left",
                                                            "ellipsis": true
                                                        },
                                                        "x-designable-id": "supplierNameColumn",
                                                        "x-index": 9,
                                                        "properties": {
                                                            "supplierName": {
                                                                "type": "string",
                                                                "x-decorator": "FormItem",
                                                                "x-component": "Input",
                                                                "x-read-pretty": true,
                                                                "name": "supplierName",
                                                                "x-designable-id": "supplierName",
                                                                "x-index": 0
                                                            }
                                                        }
                                                    },
                                                    "operationsColumn": {
                                                        "type": "void",
                                                        "x-component": "ArrayTable.Column",
                                                        "x-component-props": {
                                                            "title": "操作",
                                                            "dataIndex": "operations",
                                                            "width": 50,
                                                            "fixed": "right"
                                                        },
                                                        "x-designable-id": "operationsColumn",
                                                        "x-index": 10,
                                                        "properties": {
                                                            "remove": {
                                                                "type": "void",
                                                                "x-component": "ArrayTable.Remove",
                                                                "x-designable-id": "arrayRemove",
                                                                "x-index": 0
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            ...((isNoOrderIn || isDefaultIn) ? {
                                                "properties": {
                                                    "addition": {
                                                        "type": "void",
                                                        "x-component": "ArrayTable.Addition",
                                                        "x-component-props": {
                                                            "type": "primary",
                                                            "block": false
                                                        },
                                                        "title": "新增明细",
                                                        "name": "addition",
                                                        "x-designable-id": "arrayAddition",
                                                        "x-index": 0
                                                    }
                                                }
                                            } : {})
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "x-designable-id": "inInstructionOrderFormRoot"
        }
    };
}

// 保持向后兼容性，默认导出非无订单入库的Schema
// export const formSchema = getFormSchema(); // 移除这行，避免不必要的调用