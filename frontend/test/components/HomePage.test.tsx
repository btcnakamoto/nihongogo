/**
 * 功能描述：HomePage 组件测试
 * 输入参数：无
 * 返回值：测试结果
 * 用途说明：验证 HomePage 组件的颜色方案和渲染正确性
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../../src/pages/Home/HomePage';

// Mock data
jest.mock('../../src/data/mockData', () => ({
  mockTrainingCamps: [
    {
      id: 1,
      title: '测试训练营',
      description: '测试描述',
      level: 'beginner',
      duration: 30,
      dailyMinutes: 20,
      rating: 4.8,
      studentCount: 1000,
      phases: [{ id: 1, title: '阶段1' }]
    }
  ]
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('HomePage 颜色方案测试', () => {
  test('应该渲染主要标题和品牌色', () => {
    renderWithRouter(<HomePage />);
    
    // 检查主标题是否存在
    expect(screen.getByText('开始你的')).toBeInTheDocument();
    expect(screen.getByText('日语学习之旅')).toBeInTheDocument();
    
    // 检查 AI 驱动标语
    expect(screen.getByText('全新 AI 驱动的日语学习体验')).toBeInTheDocument();
  });

  test('应该渲染学习路径选择部分', () => {
    renderWithRouter(<HomePage />);
    
    // 检查学习路径标题
    expect(screen.getByText('选择最适合你的')).toBeInTheDocument();
    expect(screen.getByText('学习方式')).toBeInTheDocument();
    
    // 检查系统化训练营
    expect(screen.getByText('系统化训练营')).toBeInTheDocument();
    expect(screen.getByText('自由模块训练')).toBeInTheDocument();
  });

  test('应该渲染核心优势部分', () => {
    renderWithRouter(<HomePage />);
    
    // 检查核心优势标题
    expect(screen.getByText('为什么选择')).toBeInTheDocument();
    expect(screen.getByText('Nihongogo')).toBeInTheDocument();
    
    // 检查功能特性
    expect(screen.getByText('智能评估')).toBeInTheDocument();
    expect(screen.getByText('系统化训练营')).toBeInTheDocument();
    expect(screen.getByText('听力强化')).toBeInTheDocument();
    expect(screen.getByText('AI对话练习')).toBeInTheDocument();
  });

  test('应该渲染热门训练营部分', () => {
    renderWithRouter(<HomePage />);
    
    // 检查热门训练营标题
    expect(screen.getByText('热门')).toBeInTheDocument();
    expect(screen.getByText('训练营')).toBeInTheDocument();
    
    // 检查训练营卡片
    expect(screen.getByText('测试训练营')).toBeInTheDocument();
  });

  test('应该渲染统计数据', () => {
    renderWithRouter(<HomePage />);
    
    // 检查统计数据
    expect(screen.getByText('50,000+')).toBeInTheDocument();
    expect(screen.getByText('学习用户')).toBeInTheDocument();
    expect(screen.getByText('95%')).toBeInTheDocument();
    expect(screen.getByText('完课率')).toBeInTheDocument();
  });

  test('应该渲染CTA按钮', () => {
    renderWithRouter(<HomePage />);
    
    // 检查主要CTA按钮
    expect(screen.getByText('开始免费评估')).toBeInTheDocument();
    expect(screen.getByText('浏览训练营')).toBeInTheDocument();
  });
});

describe('HomePage 样式类测试', () => {
  test('应该包含正确的颜色类', () => {
    const { container } = renderWithRouter(<HomePage />);
    
    // 检查是否包含主要的颜色类
    const elementsWithPrimaryColors = container.querySelectorAll('[class*="primary"]');
    expect(elementsWithPrimaryColors.length).toBeGreaterThan(0);
    
    // 检查是否包含中性色类
    const elementsWithNeutralColors = container.querySelectorAll('[class*="neutral"]');
    expect(elementsWithNeutralColors.length).toBeGreaterThan(0);
  });

  test('应该包含渐变背景类', () => {
    const { container } = renderWithRouter(<HomePage />);
    
    // 检查渐变背景类
    const gradientElements = container.querySelectorAll('[class*="gradient"]');
    expect(gradientElements.length).toBeGreaterThan(0);
  });
});
