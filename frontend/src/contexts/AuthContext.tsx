/**
 * 功能描述：用户认证上下文管理
 * 输入参数：children React节点
 * 返回值：认证上下文提供者组件
 * 用途说明：管理用户登录状态、认证信息和相关操作
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterData } from '@/types';

// 认证操作类型
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE' }
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean };

// 认证上下文接口
interface AuthContextType {
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: User) => void;
}

// 初始状态
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

// 创建上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 认证提供者组件
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // 初始化时检查本地存储的用户信息
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUser = localStorage.getItem('nihongogo_user');
        const storedToken = localStorage.getItem('nihongogo_token');
        
        if (storedUser && storedToken) {
          const user = JSON.parse(storedUser);
          dispatch({ type: 'SET_USER', payload: user });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('初始化认证状态失败:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initAuth();
  }, []);

  // 登录函数
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟登录验证
      if (credentials.email === 'demo@nihongogo.com' && credentials.password === 'demo123') {
        const user: User = {
          id: 'user_demo',
          name: '演示用户',
          email: credentials.email,
          avatar: '/avatars/demo-user.jpg',
          level: 'elementary',
          joinDate: new Date().toISOString(),
          totalStudyTime: 0,
          currentStreak: 0,
          isAuthenticated: true,
        };

        // 保存到本地存储
        localStorage.setItem('nihongogo_user', JSON.stringify(user));
        localStorage.setItem('nihongogo_token', 'demo_token_123');
        
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        return true;
      } else {
        dispatch({ type: 'LOGIN_FAILURE' });
        return false;
      }
    } catch (error) {
      console.error('登录失败:', error);
      dispatch({ type: 'LOGIN_FAILURE' });
      return false;
    }
  };

  // 注册函数
  const register = async (data: RegisterData): Promise<boolean> => {
    dispatch({ type: 'REGISTER_START' });
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟注册
      const user: User = {
        id: `user_${Date.now()}`,
        name: data.name,
        email: data.email,
        avatar: '/avatars/default-user.jpg',
        level: 'beginner',
        joinDate: new Date().toISOString(),
        totalStudyTime: 0,
        currentStreak: 0,
        isAuthenticated: true,
      };

      // 保存到本地存储
      localStorage.setItem('nihongogo_user', JSON.stringify(user));
      localStorage.setItem('nihongogo_token', `token_${Date.now()}`);
      
      dispatch({ type: 'REGISTER_SUCCESS', payload: user });
      return true;
    } catch (error) {
      console.error('注册失败:', error);
      dispatch({ type: 'REGISTER_FAILURE' });
      return false;
    }
  };

  // 登出函数
  const logout = () => {
    localStorage.removeItem('nihongogo_user');
    localStorage.removeItem('nihongogo_token');
    dispatch({ type: 'LOGOUT' });
  };

  // 更新用户信息
  const updateUser = (user: User) => {
    localStorage.setItem('nihongogo_user', JSON.stringify(user));
    dispatch({ type: 'SET_USER', payload: user });
  };

  const value: AuthContextType = {
    state,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 使用认证上下文的Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
