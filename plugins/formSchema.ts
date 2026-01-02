import { IApi } from 'umi';
import { withTmpPath } from './withTmpPath';

export default (api: IApi) => {

  api.describe({
    key: "formSchema",
    config: {
      schema(joi) {
        return joi.object();
      },
    },
    enableBy: api.EnableBy.register,
  });

  api.onStart(() => {

  });

  api.onGenerateFiles(async () => {
    // runtime.tsx
    api.writeTmpFile({
      path: 'runtime.tsx',
      content: `
import React from 'react';
import formSchemaFactory from '@/formSchema';
import { useModel } from '@@/plugin-model';
import { FormSchemaContext } from './context';
import { FormProContext } from '@nokecy/qc-ui';
import { dropByCacheKey,history } from 'umi';

function Provider(props) {
  const { initialState } = useModel('@@initialState');
  const { editModeState } = useModel('useEditModeModel');
  const formSchema = React.useMemo(() => formSchemaFactory(initialState), [initialState]);
  return (
    <FormSchemaContext.Provider value={formSchema}>
      <FormProContext.Provider value={{
          editMode: editModeState,
          handleEditClick: (formId: string) => {
          // close();
          const url = '/appSYS/appExtraObjectForm/extraObjectFormSchema/designer';
          dropByCacheKey(url);
          history.push({
              pathname: url,
              search: \`?name=\${formId}\`,
          });
          }
        }}>
      { props.children }
    </FormProContext.Provider>
    </FormSchemaContext.Provider>
  );
}
export function innerProvider(container) {
  return <Provider>{ container }</Provider>;
}
      `,
    });

    // index.ts
    api.writeTmpFile({
      path: 'index.ts',
      content: `
import React, { useMemo } from 'react';
import { ISchema, createSchemaField } from '@formily/react'
import {
  ArrayCards,Cascader, Checkbox, DatePicker, Field, Form,FormItem, FormCollapse, FormGrid, FormLayout, FormTab, Input, NumberPicker, Password, Radio, Select, Space, Switch,
 TimePicker, Transfer, TreeSelect, Upload
} from "@formily/antd-v5";
import { ArrayTable , Editable } from "@nokecy/qc-ui";
import { Card } from "@/components";
import { formComponents } from "umi";
import { FormSchemaContext } from './context';

export const useFormSchema = (formId:string,schema:{ form: Record<string, any>, schema: ISchema }) => {
  const formSchema:Record<string, { form: Record<string, any>, schema: ISchema }> = React.useContext(FormSchemaContext);
  return formSchema[formId] ? formSchema[formId] : schema;
};

export const useSchemaField = (formWidgetComponents: any) => {
  const SchemaField = useMemo(() => createSchemaField({
    components: {
      FormItem,
      Input, Password, NumberPicker, Select, TreeSelect, Cascader, Transfer, Checkbox, Radio, DatePicker, TimePicker, Upload, Switch,
      Card, FormGrid, FormTab, FormLayout, FormCollapse, Space,
      ArrayCards, ArrayTable,Editable,...formComponents,
      ...formWidgetComponents
    },
  }), []);

  return SchemaField;
};
      `,
    });

    // context.ts
    api.writeTmpFile({
      path: 'context.ts',
      content: `
import React from 'react';
export const FormSchemaContext = React.createContext<any>(null);
      `,
    });
  });

  api.addRuntimePlugin(() => {
    return [withTmpPath({ api, path: 'runtime.tsx' })];
  });
};