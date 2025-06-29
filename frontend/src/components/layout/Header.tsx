/**
 * 功能描述：应用头部导航组件
 * 输入参数：无
 * 返回值：React 头部组件
 * 用途说明：提供应用的主导航和用户信息展示
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, BookOpen, Home, BarChart3, Settings, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui';

const Header: React.FC = () => {
  const location = useLocation();
  const { state, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/dashboard', label: '学习中心', icon: BarChart3, requireAuth: true },
    { path: '/courses', label: '训练营', icon: BookOpen },
    { path: '/modules', label: '模块训练', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-neutral-200/60 sticky top-0 z-50 shadow-soft">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="text-2xl font-bold text-neutral-800">
              Nihongogo
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              // 如果需要认证但用户未登录，不显示该导航项
              if (item.requireAuth && !state.isAuthenticated) {
                return null;
              }
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-primary-700 bg-primary-50/80 shadow-soft border border-primary-200/50'
                      : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50 hover:shadow-soft'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {state.isAuthenticated ? (
              <div className="hidden sm:flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-semibold text-neutral-800">{state.user?.name}</p>
                  <p className="text-xs text-neutral-500 flex items-center">
                    <span className="w-2 h-2 bg-success-600 rounded-full mr-1.5 animate-pulse-soft"></span>
                    连续学习 {state.user?.currentStreak} 天
                  </p>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="w-10 h-10 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl flex items-center justify-center shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <User size={18} className="text-neutral-600" />
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-neutral-200 py-2 z-50">
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <BarChart3 size={16} className="mr-3" />
                        学习中心
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                      >
                        <LogOut size={16} className="mr-3" />
                        退出登录
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    <LogIn size={16} className="mr-2" />
                    登录
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    注册
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button className="md:hidden p-2.5 rounded-xl text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50 transition-all duration-300">
              <Settings size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden border-t border-neutral-200/60 bg-white/90 backdrop-blur-md">
        <div className="grid grid-cols-4 gap-2 p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            // 如果需要认证但用户未登录，不显示该导航项
            if (item.requireAuth && !state.isAuthenticated) {
              return null;
            }
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center space-y-1.5 p-3 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-primary-700 bg-primary-50/80 shadow-soft'
                    : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Header;
