/**
 * 功能描述：智能状态栏组件
 * 输入参数：认知状态数据
 * 返回值：React 智能状态栏组件
 * 用途说明：显示学习者的认知状态、负荷指数、个人轨迹和能量水平
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React from 'react';
import { Brain, BarChart3, Clock, Target, Zap, TrendingUp } from 'lucide-react';
import { CognitiveState } from '@/types';

interface CognitiveStatusBarProps {
  cognitiveState: CognitiveState;
  className?: string;
}

const CognitiveStatusBar: React.FC<CognitiveStatusBarProps> = ({
  cognitiveState,
  className = '',
}) => {
  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'focus': return '🧠';
      case 'relaxed': return '😌';
      case 'intensive': return '🔥';
      case 'review': return '📚';
      default: return '🧠';
    }
  };

  const getModeText = (mode: string) => {
    switch (mode) {
      case 'focus': return '专注模式';
      case 'relaxed': return '轻松模式';
      case 'intensive': return '强化模式';
      case 'review': return '复习模式';
      default: return '专注模式';
    }
  };

  const getLoadColor = (loadIndex: number) => {
    if (loadIndex <= 3) return 'text-success-600';
    if (loadIndex <= 6) return 'text-warning-600';
    return 'text-error-600';
  };

  const getEnergyColor = (energyLevel: number) => {
    if (energyLevel >= 80) return 'text-success-600';
    if (energyLevel >= 60) return 'text-warning-600';
    return 'text-error-600';
  };

  return (
    <div className={`bg-gradient-to-r from-primary-50 to-accent-50 border-b border-primary-200 px-6 py-3 ${className}`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* 认知状态 */}
        <div className="flex items-center space-x-2">
          <Brain className="text-primary-600" size={20} />
          <span className="text-sm font-medium text-neutral-700">认知状态：</span>
          <div className="flex items-center space-x-1">
            <span className="text-lg">{getModeIcon(cognitiveState.mode)}</span>
            <span className="text-sm font-semibold text-primary-700">
              {getModeText(cognitiveState.mode)}
            </span>
          </div>
        </div>

        {/* 分隔符 */}
        <div className="hidden md:block w-px h-6 bg-neutral-300"></div>

        {/* 负荷指数 */}
        <div className="flex items-center space-x-2">
          <BarChart3 className="text-blue-600" size={20} />
          <span className="text-sm font-medium text-neutral-700">负荷指数：</span>
          <div className="flex items-center space-x-1">
            <span className={`text-sm font-bold ${getLoadColor(cognitiveState.loadIndex)}`}>
              {cognitiveState.loadIndex}/10
            </span>
            <div className="flex space-x-0.5">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-3 rounded-sm ${
                    i < cognitiveState.loadIndex
                      ? cognitiveState.loadIndex <= 3
                        ? 'bg-success-400'
                        : cognitiveState.loadIndex <= 6
                        ? 'bg-warning-400'
                        : 'bg-error-400'
                      : 'bg-neutral-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 分隔符 */}
        <div className="hidden lg:block w-px h-6 bg-neutral-300"></div>

        {/* 建议时长 */}
        <div className="hidden lg:flex items-center space-x-2">
          <Clock className="text-purple-600" size={20} />
          <span className="text-sm font-medium text-neutral-700">建议时长：</span>
          <span className="text-sm font-semibold text-purple-700">
            {cognitiveState.suggestedDuration}分钟
          </span>
        </div>

        {/* 分隔符 */}
        <div className="hidden xl:block w-px h-6 bg-neutral-300"></div>

        {/* 个人轨迹 */}
        <div className="hidden xl:flex items-center space-x-2">
          <Target className="text-indigo-600" size={20} />
          <span className="text-sm font-medium text-neutral-700">个人轨迹：</span>
          <div className="flex items-center space-x-1">
            <span className="text-sm font-medium text-indigo-700">
              {cognitiveState.personalTrack}
            </span>
            <TrendingUp className="text-success-600" size={16} />
          </div>
        </div>

        {/* 分隔符 */}
        <div className="hidden md:block w-px h-6 bg-neutral-300"></div>

        {/* 今日能量 */}
        <div className="flex items-center space-x-2">
          <Zap className="text-orange-600" size={20} />
          <span className="text-sm font-medium text-neutral-700">今日能量：</span>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-bold ${getEnergyColor(cognitiveState.energyLevel)}`}>
              {cognitiveState.energyLevel}%
            </span>
            <div className="w-16 h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  cognitiveState.energyLevel >= 80
                    ? 'bg-gradient-to-r from-success-400 to-success-500'
                    : cognitiveState.energyLevel >= 60
                    ? 'bg-gradient-to-r from-warning-400 to-warning-500'
                    : 'bg-gradient-to-r from-error-400 to-error-500'
                }`}
                style={{ width: `${cognitiveState.energyLevel}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 移动端额外信息 */}
      <div className="md:hidden mt-2 pt-2 border-t border-primary-200">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="text-purple-600" size={14} />
              <span className="text-neutral-600">建议：{cognitiveState.suggestedDuration}分钟</span>
            </div>
            <div className="flex items-center space-x-1">
              <Target className="text-indigo-600" size={14} />
              <span className="text-neutral-600">{cognitiveState.personalTrack}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CognitiveStatusBar;
