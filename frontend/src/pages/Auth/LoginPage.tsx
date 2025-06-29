/**
 * 功能描述：用户登录页面组件
 * 输入参数：无
 * 返回值：React 登录页面组件
 * 用途说明：提供用户登录界面和登录功能
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, LogIn, Play } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { LoginCredentials } from '@/types';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, login } = useAuth();
  
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginCredentials>>({});

  // 获取重定向路径和消息
  const from = (location.state as any)?.from?.pathname || '/dashboard';
  const redirectMessage = (location.state as any)?.message;

  // 如果已登录，重定向到目标页面
  useEffect(() => {
    if (state.isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [state.isAuthenticated, navigate, from]);

  // 表单验证
  const validateForm = (): boolean => {
    const newErrors: Partial<LoginCredentials> = {};

    if (!formData.email) {
      newErrors.email = '请输入邮箱地址';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    if (!formData.password) {
      newErrors.password = '请输入密码';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码至少需要6个字符';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const success = await login(formData);
    if (!success) {
      setErrors({ email: '邮箱或密码错误，请重试' });
    }
  };

  // 处理输入变化
  const handleInputChange = (field: keyof LoginCredentials, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 清除对应字段的错误
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            返回首页
          </Link>
          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">N</span>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">
            欢迎回来
          </h2>
          <p className="text-neutral-600">
            登录您的 Nihongogo 账户，继续您的日语学习之旅
          </p>
        </div>

        {/* Redirect Message */}
        {redirectMessage && (
          <Card className="p-4 bg-primary-50 border-primary-200 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Play size={16} className="text-primary-600" />
              </div>
              <p className="text-primary-800 font-medium">{redirectMessage}</p>
            </div>
          </Card>
        )}

        {/* Login Form */}
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                邮箱地址
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={20} className="text-neutral-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                    errors.email ? 'border-red-300' : 'border-neutral-300'
                  }`}
                  placeholder="请输入您的邮箱地址"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                密码
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={20} className="text-neutral-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`block w-full pl-10 pr-12 py-3 border rounded-xl shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                    errors.password ? 'border-red-300' : 'border-neutral-300'
                  }`}
                  placeholder="请输入您的密码"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-neutral-400 hover:text-neutral-600" />
                  ) : (
                    <Eye size={20} className="text-neutral-400 hover:text-neutral-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={state.isLoading}
              disabled={state.isLoading}
            >
              <LogIn size={20} className="mr-2" />
              {state.isLoading ? '登录中...' : '登录'}
            </Button>
          </form>

          {/* Demo Account Info */}
          <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
            <h4 className="text-sm font-medium text-primary-800 mb-2">演示账户</h4>
            <p className="text-sm text-primary-700 mb-2">
              邮箱：demo@nihongogo.com
            </p>
            <p className="text-sm text-primary-700">
              密码：demo123
            </p>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              还没有账户？{' '}
              <Link 
                to="/register" 
                className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
              >
                立即注册
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
