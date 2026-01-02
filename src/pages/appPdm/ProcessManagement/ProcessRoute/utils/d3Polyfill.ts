/**
 * D3 Polyfill for ReactFlow
 *
 * 解决 ReactFlow 在 Mako 生产构建时 d3-transition.interrupt 函数丢失的问题
 * 这是由于 Mako 构建器在 code splitting 时将 d3 模块拆分导致的
 *
 * 使用方法：在使用 ReactFlow 的组件文件顶部导入此文件
 * import './utils/d3Polyfill';
 */

// 确保 d3-transition 的 interrupt 函数在全局可用
import { interrupt } from 'd3-transition';
import { selection } from 'd3-selection';

// 将 interrupt 挂载到 selection.prototype 上
// 这是 d3-zoom 调用 interrupt 的方式
if (selection && selection.prototype && !selection.prototype.interrupt) {
  selection.prototype.interrupt = function (name?: string) {
    return this.each(function (this: Element) {
      interrupt(this, name);
    });
  };
}

// 导出以便其他地方使用
export { interrupt };
