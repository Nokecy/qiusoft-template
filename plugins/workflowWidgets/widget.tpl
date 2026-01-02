import { Component } from 'react';
import { ApplyPluginsType } from 'umi';

{{{ RegisterModelImports }}}


{{{ RegisterModels }}}


const WorkflowWidgetComponents = {
{{{ Datas }}}
}

const WorkflowWidgetNames = {
{{{ NameDatas }}}
}

const GetWorkflowWidgetComponent = (workflowName)=>{
    let component = null;
    Object.keys(WorkflowWidgetNames).forEach(widgetName=>{
        if (WorkflowWidgetNames[widgetName].name == workflowName){
            component = WorkflowWidgetComponents[widgetName];
            return;
        }
    });
    
    return component;
}

export {WorkflowWidgetComponents , WorkflowWidgetNames ,GetWorkflowWidgetComponent}
