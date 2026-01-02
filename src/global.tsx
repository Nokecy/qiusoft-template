import $ from 'jquery';
import dayjs from 'dayjs';

import 'ag-grid-enterprise';
import 'allotment/dist/style.css';

// Designable 表单设计器样式已通过 config.ts 的 styles 配置引入
// 位于 public/styles/ 目录

import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

//@ts-ignore
window.jQuery = $;
