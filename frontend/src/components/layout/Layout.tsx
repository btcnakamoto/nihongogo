/**
 * 功能描述：应用主布局组件
 * 输入参数：children - 子组件内容
 * 返回值：React 布局组件
 * 用途说明：提供应用的整体布局结构，包含头部导航和主内容区域
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-mesh">
      <Header />
      <main className="flex-1 relative">
        {children}
      </main>
    </div>
  );
};

export default Layout;
