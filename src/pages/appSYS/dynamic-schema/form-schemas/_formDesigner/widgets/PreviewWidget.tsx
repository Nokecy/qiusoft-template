import { TreeNode } from '@nokecy/designable-core';
import { transformToSchema } from '@nokecy/designable-formily-transformer';
import {
  ArrayCards,
  ArrayTable,
  Cascader,
  Checkbox,
  DatePicker,
  Editable,
  Form,
  FormCollapse,
  FormGrid,
  FormItem,
  FormLayout,
  FormTab,
  Input,
  NumberPicker,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
} from '@formily/antd-v5';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import React, { useMemo } from 'react';

export interface IPreviewWidgetProps {
  components: any;
  tree: TreeNode;
}

export const PreviewWidget: React.FC<IPreviewWidgetProps> = (props) => {
  const { components } = props;

  const form = useMemo(() => createForm(), []);

  const SchemaField = useMemo(
    () =>
      createSchemaField({
        components: {
          ...components,
          FormItem: FormItem,
        },
      }),
    []
  );

  const { form: formProps, schema } = transformToSchema(props.tree);

  return (
    <Form {...formProps} form={form}>
      <SchemaField schema={schema} />
    </Form>
  );
};
