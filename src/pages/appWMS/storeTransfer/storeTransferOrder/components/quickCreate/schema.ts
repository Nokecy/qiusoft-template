import { ISchema } from '@formily/react';

export const formId: string = 'storeTransferOrderQuickCreate';

export const form: Record<string, any> = {
	labelWidth: 100,
	feedbackLayout: 'none',
	shallow: true,
};

export const formSchema: { form: Record<string, any>; schema: ISchema } = {
	form: {
		labelWidth: 100,
		feedbackLayout: 'none',
		shallow: true,
	},
	schema:  {
		"type": "object",
		"properties": {
		  "0hyi4rvc7d6": {
			"type": "void",
			"x-component": "FormGrid",
			"x-validator": [],
			"x-component-props": {
			  "maxWidth": 100,
			  "minColumns": 1,
			  "maxColumns": 3
			},
			"x-designable-id": "0hyi4rvc7d6",
			"x-index": 0,
			"properties": {
			  "84pd27vdxcd": {
				"type": "void",
				"x-component": "FormGrid.GridColumn",
				"x-validator": [],
				"x-component-props": {},
				"required": true,
				"x-designable-id": "84pd27vdxcd",
				"x-index": 0,
				"properties": {
				  "sourceWarehouseCode": {
					"type": "string",
					"title": "源库房",
					"x-decorator": "FormItem",
					"x-component": "PublicSelect",
					"x-validator": [],
					"x-component-props": {
					  "placeholder": "选择库房",
					  "valueField": "code",
					  "labelField": "name",
					  "api": "/api/wms/warehouse/list"
					},
					"x-decorator-props": {
					  "labelWidth": "100px"
					},
					"x-designable-id": "njjvvowmw2s",
					"x-index": 0,
					"name": "sourceWarehouseCode",
					"required": true
				  },
				  "sourceWarehouseId": {
					"type": "string",
					"title": "源库房Id",
					"x-decorator": "FormItem",
					"x-component": "PublicSelect",
					"x-validator": [],
					"x-component-props": {
					  "placeholder": "选择库房",
					  "valueField": "code",
					  "labelField": "name",
					  "api": "/api/wms/warehouse/list"
					},
					"x-decorator-props": {
					  "labelWidth": "100px"
					},
					"x-designable-id": "lut6rzs466h",
					"x-index": 1,
					"name": "sourceWarehouseId",
					"required": false,
					"x-display": "hidden"
				  }
				}
			  },
			  "ka82wvsx726": {
				"type": "void",
				"x-component": "FormGrid.GridColumn",
				"x-validator": [],
				"x-component-props": {},
				"required": true,
				"x-designable-id": "ka82wvsx726",
				"x-index": 1,
				"properties": {
				  "targetWarehouseCode": {
					"type": "string",
					"title": "目标库房",
					"x-decorator": "FormItem",
					"x-component": "PublicSelect",
					"x-validator": [],
					"x-component-props": {
					  "placeholder": "选择库房",
					  "valueField": "code",
					  "labelField": "name",
					  "api": "/api/wms/warehouse/list"
					},
					"x-decorator-props": {
					  "labelWidth": "100px"
					},
					"x-designable-id": "1tyh78z3693",
					"x-index": 0,
					"name": "targetWarehouseCode",
					"required": true
				  },
				  "targetWarehouseId": {
					"type": "string",
					"title": "目标库房",
					"x-decorator": "FormItem",
					"x-component": "PublicSelect",
					"x-validator": [],
					"x-component-props": {
					  "placeholder": "选择库房",
					  "valueField": "code",
					  "labelField": "name",
					  "api": "/api/wms/warehouse/list"
					},
					"x-decorator-props": {
					  "labelWidth": "100px"
					},
					"x-designable-id": "cu4ypxukuha",
					"x-index": 1,
					"name": "targetWarehouseId",
					"required": false,
					"x-display": "hidden"
				  }
				}
			  },
			  "zyztnx5okx3": {
				"type": "void",
				"x-component": "FormGrid.GridColumn",
				"x-validator": [],
				"x-component-props": {},
				"x-designable-id": "zyztnx5okx3",
				"x-index": 2
			  },
			  "p4m7jbnakf7": {
				"type": "void",
				"x-component": "FormGrid.GridColumn",
				"x-validator": [],
				"x-component-props": {
				  "gridSpan": 3
				},
				"x-designable-id": "p4m7jbnakf7",
				"x-index": 3,
				"properties": {
				  "remark": {
					"type": "string",
					"title": "备注",
					"x-decorator": "FormItem",
					"x-component": "Input.TextArea",
					"x-validator": [],
					"x-component-props": {
					  "placeholder": "请输入"
					},
					"x-decorator-props": {
					  "labelWidth": "100px"
					},
					"name": "remark",
					"x-designable-id": "w2nabyzzodp",
					"x-index": 0
				  }
				}
			  }
			}
		  },
		  "quickCreateItem": {
			"type": "array",
			"x-decorator": "FormItem",
			"x-component": "ArrayTable",
			"x-validator": [],
			"x-component-props": { "gridKey": "appWMS.storeTransfer.storeTransferOrder.components.quickCreate.schema.1" },
			"x-decorator-props": {
			  "labelWidth": "100px"
			},
			"x-designable-id": "6tag8ls2610",
			"x-index": 1,
			"name": "quickCreateItem",
			"items": {
			  "type": "object",
			  "x-designable-id": "emesjfuo5hw",
			  "properties": {
				"f18kw59krmg": {
				  "type": "void",
				  "x-component": "ArrayTable.Column",
				  "x-component-props": {
					"title": "序号",
					"width": 80
				  },
				  "x-designable-id": "f18kw59krmg",
				  "x-index": 0,
				  "properties": {
					"9mlb7polk5q": {
					  "type": "void",
					  "x-component": "ArrayTable.Index",
					  "x-designable-id": "9mlb7polk5q",
					  "x-index": 0
					}
				  }
				},
				"materialItemDtos": {
				  "type": "void",
				  "x-component": "ArrayTable.Column",
				  "x-component-props": {
					"title": "物料",
					"width": 220
				  },
				  "x-designable-id": "cgnnfatyv7o",
				  "x-index": 1,
				  "name": "materialItemDtos",
				  "properties": {
					"materialId": {
					  "type": "string",
					  "x-decorator": "FormItem",
					  "x-component": "PublicSelect",
					  "x-validator": [],
					  "x-component-props": {
						"placeholder": "选择物料",
						"valueField": "id",
						"labelField": "code",
						"api": "/api/wms/materialitem/list",
						"columnDefs": [
						  {
							"field": "code",
							"headerName": "编码",
							"flex": 1
						  },
						  {
							"field": "descript",
							"headerName": "描述",
							"flex": 1
						  }
						]
					  },
					  "x-decorator-props": {
						"style": {
						  "padding": "0px 0px 0px 0px",
						  "margin": "0px 0px 0px 0px"
						}
					  },
					  "x-designable-id": "ft5ztozqshp",
					  "x-index": 0,
					  "name": "materialId",
					  "required": true
					}
				  }
				},
				"dx368xn1cou": {
				  "type": "void",
				  "x-component": "ArrayTable.Column",
				  "x-component-props": {
					"title": "栈板"
				  },
				  "x-designable-id": "dx368xn1cou",
				  "x-index": 2,
				  "properties": {
					"m2snt4e46sa": {
					  "type": "string",
					  "x-decorator": "FormItem",
					  "x-component": "PublicSelect",
					  "x-validator": [],
					  "x-component-props": {
						"placeholder": "选择栈板",
						"valueField": "traceId",
						"labelField": "traceId",
						"api": "/api/wms/stock-bin/list",
						"columnDefs": [
						  {
							"field": "traceId",
							"headerName": "LPN载具号"
						  },
						  {
							"field": "wareHouse.name",
							"headerName": "库房名称"
						  }
						]
					  },
					  "x-decorator-props": {},
					  "x-designable-id": "m2snt4e46sa",
					  "x-index": 0
					}
				  }
				},
				"j88ibun5dyc": {
				  "type": "void",
				  "x-component": "ArrayTable.Column",
				  "x-component-props": {
					"title": "数量",
					"width": 150
				  },
				  "x-designable-id": "j88ibun5dyc",
				  "x-index": 3,
				  "properties": {
					"qty": {
					  "type": "number",
					  "x-decorator": "FormItem",
					  "x-component": "NumberPicker",
					  "x-validator": [],
					  "x-component-props": {
						"placeholder": "请输入",
						"style": {
						  "lineHeight": "30px"
						},
						"max": null
					  },
					  "x-decorator-props": {
						"style": {}
					  },
					  "name": "qty",
					  "x-designable-id": "2abn7hpvy9f",
					  "x-index": 0
					}
				  }
				},
				"dxvx7mtpa6m": {
				  "type": "void",
				  "x-component": "ArrayTable.Column",
				  "x-component-props": {
					"title": "物料描述",
					"width": 180
				  },
				  "x-designable-id": "dxvx7mtpa6m",
				  "x-index": 4,
				  "properties": {
					"materialDescript": {
					  "type": "string",
					  "x-decorator": "FormItem",
					  "x-component": "Input",
					  "x-validator": [],
					  "x-component-props": {},
					  "x-decorator-props": {},
					  "name": "materialDescript",
					  "x-pattern": "readPretty",
					  "x-designable-id": "6gd1gars8t8",
					  "x-index": 0
					}
				  }
				},
				"qprcbfwgh8u": {
				  "type": "void",
				  "x-component": "ArrayTable.Column",
				  "x-component-props": {
					"title": "物料编码",
					"width": 180
				  },
				  "x-designable-id": "qprcbfwgh8u",
				  "x-index": 5,
				  "x-display": "visible",
				  "properties": {
					"materialCode": {
					  "type": "string",
					  "x-decorator": "FormItem",
					  "x-component": "Input",
					  "x-validator": [],
					  "x-component-props": {},
					  "x-decorator-props": {},
					  "name": "materialCode",
					  "x-pattern": "readPretty",
					  "x-designable-id": "kh0ze58ro7j",
					  "x-index": 0
					}
				  }
				},
				"4233gw92sq0": {
				  "type": "void",
				  "x-component": "ArrayTable.Column",
				  "x-component-props": {
					"title": "物料外码",
					"width": 180
				  },
				  "x-designable-id": "4233gw92sq0",
				  "x-index": 6,
				  "properties": {
					"materialOutCode": {
					  "type": "string",
					  "x-decorator": "FormItem",
					  "x-component": "Input",
					  "x-validator": [],
					  "x-component-props": {},
					  "x-decorator-props": {},
					  "name": "materialOutCode",
					  "x-pattern": "readPretty",
					  "x-designable-id": "ui2es9yk3ra",
					  "x-index": 0
					}
				  }
				},
				"ujeiosj45ac": {
				  "type": "void",
				  "x-component": "ArrayTable.Column",
				  "x-component-props": {
					"title": "操作"
				  },
				  "x-designable-id": "ujeiosj45ac",
				  "x-index": 7,
				  "properties": {
					"tak298j5tmk": {
					  "type": "void",
					  "x-component": "ArrayTable.Remove",
					  "x-designable-id": "tak298j5tmk",
					  "x-index": 0
					},
					"1y5o6fdc32i": {
					  "type": "void",
					  "x-component": "ArrayTable.MoveDown",
					  "x-designable-id": "1y5o6fdc32i",
					  "x-index": 1
					},
					"v7ygo0qb4t2": {
					  "type": "void",
					  "x-component": "ArrayTable.MoveUp",
					  "x-designable-id": "v7ygo0qb4t2",
					  "x-index": 2
					}
				  }
				}
			  }
			},
			"properties": {
			  "rv1brtduiqq": {
				"type": "void",
				"title": "Addition",
				"x-component": "ArrayTable.Addition",
				"x-designable-id": "rv1brtduiqq",
				"x-index": 0,
				"x-component-props": {}
			  }
			}
		  }
		},
		"x-designable-id": "nfx0juu58x9"
	  }
	}