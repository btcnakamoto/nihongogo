/**
 * 功能描述：应用入口文件
 * 输入参数：无
 * 返回值：React 应用渲染
 * 用途说明：初始化 React 应用并挂载到 DOM
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@/styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
