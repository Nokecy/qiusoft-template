// extendTableHelper.tsx
import { useIntl, useModel } from "@umijs/max";

/** 通过两个key获取扩展字段 */
export const getExtendTableData = (moduleKey, entityKey) => {
    const intl = useIntl();
    const { initialState } = useModel("@@initialState");

    const properties = initialState?.configuration?.objectExtensions?.modules?.[moduleKey]?.entities?.[entityKey]?.properties || {};
    console.log('record1 properties', properties)
    return Object.keys(properties).map((key) => {
        const { displayName, typeSimple } = properties[key];
        return {
            headerName: intl.formatMessage({
                id: `${displayName.resource}:${displayName.name}`,
                defaultMessage: displayName.name,
            }),
            field: `extraProperties.${displayName.name}`,
            width: 160,
            type: typeSimple === "boolean" ? "bool" : typeSimple,
            hideInSearch: true,
        };
    });
};

/** 生成扩展属性的schema */
export const getSchemaFromExtendData = (extendData) => {
    const rootSchema = {
      type: 'object',
      properties: {
        card: {
          type: 'void',
          'x-component': 'Card',
          'x-component-props': {
            title: '扩展属性',
          },
          properties: {
            grid: {
              type: 'void',
              'x-component': 'FormGrid',
              'x-component-props': {
                maxColumns: 3,
                minColumns: 3,
              },
              properties: {},
            },
          },
        },
      },
    };
  
    extendData.forEach((item) => {
      const { headerName, field, type } = item;
      let component = 'Input';
  
      switch (type) {
        case 'bool':
          component = 'Switch';
          break;
        case 'number':
          component = 'NumberPicker';
          break;
        case 'dateTimeColumn':
          component = 'DatePicker';
          break;
        case 'string':
        default:
          component = 'Input';
          break;
      }
  
      rootSchema.properties.card.properties.grid.properties[field] = {
        type: type === 'bool' ? 'boolean' : 'string',
        title: headerName,
        'x-decorator': 'FormItem',
        'x-component': component,
        'x-component-props': {
          placeholder: `请输入${headerName}`,
          allowClear: true,
        },
      };
    });
  
    return rootSchema;
  };
  