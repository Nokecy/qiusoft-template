import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
{{{ FormSchemaModelImports }}}


const FormSchemaModels = {
    {{{ Datas }}}
}

const FormIdModels = {
    {{{ formIds }}}
}

const getFormSchema = (formId:string)=> {
    let result = {};
    Object.keys(FormIdModels).map(formIdModel=>{
    if(FormIdModels[formIdModel] == formId){
        result = FormSchemaModels[formIdModel];
        return;
    }
 })
 return result;
}

export {getFormSchema}
