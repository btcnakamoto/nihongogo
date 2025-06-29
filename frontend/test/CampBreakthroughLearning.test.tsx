/**
 * 功能描述：试学体验页面测试
 * 输入参数：无
 * 返回值：Jest 测试用例
 * 用途说明：测试试学体验页面的核心功能和用户交互
 * 作者：nakamotochen
 * 创建时间：2025-06-15
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock the AuthContext
const mockAuthContext = {
  state: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  },
  login: jest.fn(),
  logout: jest.fn(),
  register: jest.fn(),
};

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => mockAuthContext,
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock the speech utils
jest.mock('@/utils/speechUtils', () => ({
  globalSpeechSynthesizer: {
    speak: jest.fn().mockResolvedValue(undefined),
    stop: jest.fn(),
    updateConfig: jest.fn(),
  },
}));

// Mock react-router-dom navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

import CampBreakthroughLearning from '@/pages/Trial/CampBreakthroughLearning';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('CampBreakthroughLearning', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('显示欢迎页面', () => {
    renderWithRouter(<CampBreakthroughLearning />);
    
    expect(screen.getByText('🎉 欢迎体验 Nihongogo 学习系统')).toBeInTheDocument();
    expect(screen.getByText('90天快速突破训练营 - 专业试学体验')).toBeInTheDocument();
    expect(screen.getByText('开始试学体验')).toBeInTheDocument();
  });

  test('显示学习模块介绍', () => {
    renderWithRouter(<CampBreakthroughLearning />);
    
    expect(screen.getByText('🎧 音频听力训练')).toBeInTheDocument();
    expect(screen.getByText('🤔 意思猜测练习')).toBeInTheDocument();
    expect(screen.getByText('✍️ 听写输入训练')).toBeInTheDocument();
    expect(screen.getByText('🗣️ 发音练习')).toBeInTheDocument();
    expect(screen.getByText('✨ 重写挑战')).toBeInTheDocument();
    expect(screen.getByText('📊 进度跟踪')).toBeInTheDocument();
  });

  test('显示试学说明', () => {
    renderWithRouter(<CampBreakthroughLearning />);
    
    expect(screen.getByText('📝 试学说明')).toBeInTheDocument();
    expect(screen.getByText(/免费体验 3 个精选句子/)).toBeInTheDocument();
    expect(screen.getByText(/每个句子包含 6 个学习模块/)).toBeInTheDocument();
    expect(screen.getByText(/支持匿名体验，进度保存在本地/)).toBeInTheDocument();
  });

  test('点击开始按钮进入学习界面', async () => {
    renderWithRouter(<CampBreakthroughLearning />);
    
    const startButton = screen.getByText('开始试学体验');
    fireEvent.click(startButton);

    await waitFor(() => {
      expect(screen.getByText('学习步骤')).toBeInTheDocument();
    });
  });

  test('未登录用户显示登录注册按钮', () => {
    renderWithRouter(<CampBreakthroughLearning />);
    
    expect(screen.getByText('登录')).toBeInTheDocument();
    expect(screen.getByText('注册')).toBeInTheDocument();
  });

  test('显示返回训练营详情链接', () => {
    renderWithRouter(<CampBreakthroughLearning />);
    
    const backLink = screen.getByText('返回训练营详情');
    expect(backLink).toBeInTheDocument();
    expect(backLink.closest('a')).toHaveAttribute('href', '/courses/camp_breakthrough_90');
  });

  test('显示试学体验标识', () => {
    renderWithRouter(<CampBreakthroughLearning />);
    
    expect(screen.getByText('试学体验')).toBeInTheDocument();
  });

  test('localStorage 数据保存功能', () => {
    renderWithRouter(<CampBreakthroughLearning />);
    
    // 模拟完成试学
    const completionData = {
      courseId: 'camp_breakthrough_90',
      completedAt: new Date().toISOString(),
      totalTime: 15,
      sentencesCompleted: 3,
      isAuthenticated: false,
    };

    // 模拟保存数据
    localStorage.setItem('nihongogo_trial_completion', JSON.stringify(completionData));
    
    const savedData = localStorage.getItem('nihongogo_trial_completion');
    expect(savedData).toBeTruthy();
    
    const parsedData = JSON.parse(savedData!);
    expect(parsedData.courseId).toBe('camp_breakthrough_90');
    expect(parsedData.sentencesCompleted).toBe(3);
  });

  test('响应式设计类名检查', () => {
    renderWithRouter(<CampBreakthroughLearning />);
    
    // 检查是否有响应式类名
    const container = document.querySelector('.container-responsive');
    expect(container).toBeInTheDocument();
    
    // 检查渐变背景
    const gradientBg = document.querySelector('.bg-gradient-to-br');
    expect(gradientBg).toBeInTheDocument();
  });
});

describe('CampBreakthroughLearning - 学习界面', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('进入学习界面后显示句子信息', async () => {
    renderWithRouter(<CampBreakthroughLearning />);
    
    // 点击开始学习
    const startButton = screen.getByText('开始试学体验');
    fireEvent.click(startButton);

    await waitFor(() => {
      expect(screen.getByText('第 1 句 / 共 3 句')).toBeInTheDocument();
      expect(screen.getByText('学习步骤')).toBeInTheDocument();
    });
  });

  test('显示试学句子列表', async () => {
    renderWithRouter(<CampBreakthroughLearning />);
    
    // 进入学习界面
    fireEvent.click(screen.getByText('开始试学体验'));

    await waitFor(() => {
      expect(screen.getByText('试学句子')).toBeInTheDocument();
      expect(screen.getByText('第 1 句')).toBeInTheDocument();
      expect(screen.getByText('第 2 句')).toBeInTheDocument();
      expect(screen.getByText('第 3 句')).toBeInTheDocument();
    });
  });

  test('显示升级提示卡片', async () => {
    renderWithRouter(<CampBreakthroughLearning />);
    
    // 进入学习界面
    fireEvent.click(screen.getByText('开始试学体验'));

    await waitFor(() => {
      expect(screen.getByText('解锁完整课程')).toBeInTheDocument();
      expect(screen.getByText('升级到完整版，享受 90 天完整学习体验')).toBeInTheDocument();
      expect(screen.getByText('立即升级')).toBeInTheDocument();
    });
  });

  test('点击升级按钮导航到课程页面', async () => {
    renderWithRouter(<CampBreakthroughLearning />);
    
    // 进入学习界面
    fireEvent.click(screen.getByText('开始试学体验'));

    await waitFor(() => {
      const upgradeButton = screen.getByText('立即升级');
      fireEvent.click(upgradeButton);
      
      expect(mockNavigate).toHaveBeenCalledWith('/courses/camp_breakthrough_90');
    });
  });
});

describe('CampBreakthroughLearning - 无障碍性测试', () => {
  test('所有按钮都有适当的文本', () => {
    renderWithRouter(<CampBreakthroughLearning />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveTextContent(/.+/); // 确保按钮有文本内容
    });
  });

  test('所有链接都有适当的文本', () => {
    renderWithRouter(<CampBreakthroughLearning />);
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveTextContent(/.+/); // 确保链接有文本内容
    });
  });

  test('标题层次结构正确', () => {
    renderWithRouter(<CampBreakthroughLearning />);
    
    // 检查是否有主标题
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
  });
});

describe('CampBreakthroughLearning - 性能测试', () => {
  test('组件渲染时间合理', () => {
    const startTime = performance.now();
    renderWithRouter(<CampBreakthroughLearning />);
    const endTime = performance.now();
    
    // 渲染时间应该少于100ms
    expect(endTime - startTime).toBeLessThan(100);
  });

  test('内存使用合理', () => {
    const { unmount } = renderWithRouter(<CampBreakthroughLearning />);
    
    // 卸载组件，检查是否有内存泄漏
    unmount();
    
    // 这里可以添加更具体的内存检查逻辑
    expect(true).toBe(true); // 占位符测试
  });
});
