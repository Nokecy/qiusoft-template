/**
 * 表单设计器组件
 * 基于 @nokecy/designable 实现的可视化表单设计器
 * 注意：CSS 样式已在 src/global.tsx 中全局导入
 */
import { createDesigner, GlobalRegistry, KeyCode, Shortcut } from '@nokecy/designable-core';
import {
  ArrayCards,
  Cascader,
  Checkbox,
  DatePicker,
  Field,
  Form,
  FormCollapse,
  FormGrid,
  FormLayout,
  FormTab,
  Input,
  NumberPicker,
  ObjectContainer,
  Password,
  Radio,
  Rate,
  Select,
  Slider,
  Space,
  Switch,
  Text,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  Card,
  ArrayTable,
} from '@nokecy/designable-formily-antd';
import {
  ComponentTreeWidget,
  CompositePanel,
  Designer,
  DesignerToolsWidget,
  OutlineTreeWidget,
  HistoryWidget,
  ResourceWidget,
  SettingsPanel,
  StudioPanel,
  ToolbarPanel,
  ViewPanel,
  ViewportPanel,
  ViewToolsWidget,
  Workspace,
  WorkspacePanel,
} from '@nokecy/designable-react';
import { SettingsForm } from '@nokecy/designable-react-settings-form';
import React, { useEffect, useMemo } from 'react';
import { ActionsWidget, PreviewWidget, SchemaEditorWidget } from './widgets';
import './index.less';

// 注册设计器语言包
GlobalRegistry.registerDesignerLocales({
  'zh-CN': {
    sources: {
      Inputs: '输入控件',
      Layouts: '布局组件',
      Arrays: '自增组件',
      Displays: '展示组件',
    },
  },
  'en-US': {
    sources: {
      Inputs: 'Inputs',
      Layouts: 'Layouts',
      Arrays: 'Arrays',
      Displays: 'Displays',
    },
  },
});

export interface FormDesignerProps {
  /** 表单名称 */
  name?: string;
  /** 加载 Schema 回调 */
  loadSchema?: (engine: any) => void;
  /** 保存 Schema 回调 */
  saveSchema?: (engine: any) => void;
  /** 业务组件列表 */
  businessComponents?: any[];
}

const FormDesigner: React.FC<FormDesignerProps> = (props) => {
  const { loadSchema, saveSchema, name, businessComponents = [] } = props;

  // 创建设计器引擎
  const engine = useMemo(
    () =>
      createDesigner({
        shortcuts: [
          new Shortcut({
            codes: [
              [KeyCode.Meta, KeyCode.S],
              [KeyCode.Control, KeyCode.S],
            ],
            handler(ctx) {
              saveSchema?.(ctx.engine);
            },
          }),
        ],
        rootComponentName: 'Form',
      }),
    []
  );

  // 加载 Schema
  useEffect(() => {
    loadSchema?.(engine);
  }, [name]);

  // 获取业务组件映射
  const getComponents = () => {
    const components: any = {};
    if (!businessComponents || !Array.isArray(businessComponents)) {
      return components;
    }
    businessComponents.forEach((x: any) => {
      if (x?.Behavior?.[0]?.name) {
        components[x.Behavior[0].name] = x;
      }
    });
    return components;
  };

  // 获取业务组件分组
  const getComponentGroups = () => {
    const groups: any = {};
    if (!businessComponents || !Array.isArray(businessComponents)) {
      return groups;
    }
    businessComponents.forEach((x: any) => {
      const groupName = x?.GroupName || '其他';
      if (groups[groupName]) {
        groups[groupName].push(x);
      } else {
        groups[groupName] = [x];
      }
    });
    return groups;
  };

  const CompositePanelItem: any = CompositePanel.Item;
  const groupComponents = getComponentGroups();

  return (
    <Designer engine={engine} position={'relative'}>
      <StudioPanel
        logo={
          <div style={{ fontWeight: '500', textAlign: 'center', fontSize: 24, paddingLeft: 50 }}>
            表单名称:{name}
          </div>
        }
        actions={<ActionsWidget saveSchema={saveSchema} />}
        style={{ position: 'static', height: '100%' }}
      >
        <CompositePanel>
          <CompositePanelItem title="panels.Component" icon="Component">
            <ResourceWidget
              title="sources.Inputs"
              sources={[
                Input,
                Password,
                NumberPicker,
                Rate,
                Slider,
                Select,
                TreeSelect,
                Cascader,
                Transfer,
                Checkbox,
                Radio,
                DatePicker,
                TimePicker,
                Upload,
                Switch,
                ObjectContainer,
              ]}
            />
            <ResourceWidget
              title="sources.Layouts"
              sources={[Card, FormGrid, FormTab, FormLayout, FormCollapse, Space]}
            />
            <ResourceWidget title="sources.Arrays" sources={[ArrayCards, ArrayTable]} />
            <ResourceWidget title="sources.Displays" sources={[Text]} />

            {/* 业务组件分组 */}
            {Object.keys(groupComponents).map((groupName: string) => (
              <ResourceWidget key={groupName} title={groupName} sources={groupComponents[groupName]} />
            ))}
          </CompositePanelItem>

          <CompositePanelItem title="panels.OutlinedTree" icon="Outline">
            <OutlineTreeWidget />
          </CompositePanelItem>

          <CompositePanelItem title="panels.History" icon="History">
            <HistoryWidget />
          </CompositePanelItem>
        </CompositePanel>

        <Workspace id="form">
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />
              <ViewToolsWidget use={['DESIGNABLE', 'JSONTREE', 'PREVIEW']} />
            </ToolbarPanel>

            <ViewportPanel>
              <ViewPanel type="DESIGNABLE">
                {() => (
                  <ComponentTreeWidget
                    components={{
                      Form,
                      Field,
                      Input,
                      Select,
                      TreeSelect,
                      Cascader,
                      Radio,
                      Checkbox,
                      Slider,
                      Rate,
                      NumberPicker,
                      Transfer,
                      Password,
                      DatePicker,
                      TimePicker,
                      Upload,
                      Switch,
                      Text,
                      Card,
                      ArrayCards,
                      ArrayTable,
                      Space,
                      FormTab,
                      FormCollapse,
                      FormGrid,
                      FormLayout,
                      ObjectContainer,
                      ...getComponents(),
                    }}
                  />
                )}
              </ViewPanel>

              <ViewPanel type="JSONTREE" scrollable={false}>
                {(tree, onChange) => <SchemaEditorWidget tree={tree} onChange={onChange} />}
              </ViewPanel>

              <ViewPanel type="PREVIEW">
                {(tree) => (
                  <PreviewWidget
                    tree={tree}
                    components={{
                      Input,
                      Select,
                      TreeSelect,
                      Cascader,
                      Radio,
                      Checkbox,
                      Slider,
                      Rate,
                      NumberPicker,
                      Transfer,
                      Password,
                      DatePicker,
                      TimePicker,
                      Upload,
                      Switch,
                      Text,
                      Card,
                      ArrayCards,
                      ArrayTable,
                      Space,
                      FormTab,
                      FormCollapse,
                      FormLayout,
                      ...getComponents(),
                    }}
                  />
                )}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>

        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
        </SettingsPanel>
      </StudioPanel>
    </Designer>
  );
};

export default FormDesigner;
