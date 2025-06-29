/**
 * 功能描述：路由保护组件
 * 输入参数：children React节点，requireAuth 是否需要认证
 * 返回值：React 路由保护组件
 * 用途说明：保护需要认证的路由，未登录用户重定向到登录页面
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const { state } = useAuth();
  const location = useLocation();

  // 如果正在加载认证状态，显示加载界面
  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <span className="text-white font-bold text-2xl">N</span>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">正在加载...</p>
        </div>
      </div>
    );
  }

  // 如果需要认证但用户未登录，重定向到登录页面
  if (requireAuth && !state.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 如果不需要认证或用户已登录，渲染子组件
  return <>{children}</>;
};

export default ProtectedRoute;
