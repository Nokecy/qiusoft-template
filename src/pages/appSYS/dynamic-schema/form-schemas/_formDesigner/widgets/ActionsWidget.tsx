import { GlobalRegistry } from '@nokecy/designable-core';
import { TextWidget, useDesigner } from '@nokecy/designable-react';
import { observer } from '@formily/react';
import { Button, Space } from 'antd';
import React, { useEffect } from 'react';

interface ActionsWidgetProps {
  saveSchema?: (engine: any) => void;
}

export const ActionsWidget = observer((props: ActionsWidgetProps) => {
  const { saveSchema } = props;
  const designer = useDesigner();

  const supportLocales = ['zh-cn', 'en-us', 'ko-kr'];

  useEffect(() => {
    if (!supportLocales.includes(GlobalRegistry.getDesignerLanguage())) {
      GlobalRegistry.setDesignerLanguage('zh-cn');
    }
  }, []);

  return (
    <Space style={{ marginRight: 10 }}>
      <Button
        onClick={() => {
          saveSchema?.(designer);
        }}
      >
        <TextWidget>Save</TextWidget>
      </Button>
      <Button
        type="primary"
        onClick={() => {
          saveSchema?.(designer);
        }}
      >
        <TextWidget>Publish</TextWidget>
      </Button>
    </Space>
  );
});
