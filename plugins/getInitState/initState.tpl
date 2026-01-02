import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
{{{ RegisterModelImports }}}


export async function getInitState() {
   {{{ RegisterModels }}}

   return { 
       {{{ Datas }}} 
    };
}