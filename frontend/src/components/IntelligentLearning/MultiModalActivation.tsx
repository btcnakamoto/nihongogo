/**
 * 功能描述：多元能力激活区组件
 * 输入参数：多元激活数据和策略选择回调
 * 返回值：React 多元能力激活组件
 * 用途说明：显示中日桥接、策略选择和文化背景，激活多元学习能力
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React from 'react';
import { RefreshCw, Brain, Sparkles, RotateCcw, Star, Lightbulb, BarChart3, Lamp, Utensils, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui';
import { MultiModalActivation as MultiModalActivationType, LearningStrategy } from '@/types';

interface MultiModalActivationProps {
  activationData: MultiModalActivationType;
  onStrategyChange: (strategy: LearningStrategy) => void;
  className?: string;
}

const MultiModalActivation: React.FC<MultiModalActivationProps> = ({
  activationData,
  onStrategyChange,
  className = '',
}) => {
  const getStrategyIcon = (strategy: LearningStrategy) => {
    switch (strategy) {
      case 'analytical': return Brain;
      case 'intuitive': return Sparkles;
      case 'adaptive': return RotateCcw;
    }
  };

  const getStrategyText = (strategy: LearningStrategy) => {
    switch (strategy) {
      case 'analytical': return '分析型';
      case 'intuitive': return '感觉型';
      case 'adaptive': return '自适应';
    }
  };

  return (
    <div className={`bg-white border-b border-neutral-200 px-6 py-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 中日桥接区 */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 p-4">
            <div className="flex items-center space-x-2 mb-3">
              <RefreshCw className="text-blue-600" size={20} />
              <h3 className="font-semibold text-blue-900">中日桥接</h3>
            </div>
            
            <div className="space-y-3">
              {/* 词汇桥接 */}
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-lg font-bold text-neutral-800">
                    "{activationData.chineseJapaneseBridge.chineseWord}"
                  </span>
                  <RefreshCw className="text-blue-500" size={16} />
                  <span className="text-lg font-bold text-blue-700">
                    "{activationData.chineseJapaneseBridge.japaneseWord}"
                  </span>
                </div>
              </div>

              {/* 汉字优势 */}
              <div className="flex items-center space-x-2">
                <Lightbulb className="text-yellow-500" size={16} />
                <span className="text-sm text-blue-800">
                  汉字优势：
                  <span className={`ml-1 font-medium ${
                    activationData.chineseJapaneseBridge.kanjiAdvantage 
                      ? 'text-success-600' 
                      : 'text-neutral-600'
                  }`}>
                    {activationData.chineseJapaneseBridge.kanjiAdvantage ? '激活中' : '待激活'}
                  </span>
                </span>
              </div>

              {/* 理解率 */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-800">汉字理解率：</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-success-600">
                    {activationData.chineseJapaneseBridge.comprehensionRate}%
                  </span>
                  <div className="w-16 h-2 bg-blue-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-success-400 to-success-500 rounded-full transition-all duration-500"
                      style={{ width: `${activationData.chineseJapaneseBridge.comprehensionRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* 策略选择区 */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Brain className="text-purple-600" size={20} />
              <h3 className="font-semibold text-purple-900">策略选择</h3>
            </div>

            <div className="space-y-2">
              {(['analytical', 'intuitive', 'adaptive'] as LearningStrategy[]).map((strategy) => {
                const Icon = getStrategyIcon(strategy);
                const isSelected = activationData.strategySelection === strategy;
                
                return (
                  <button
                    key={strategy}
                    onClick={() => onStrategyChange(strategy)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      isSelected
                        ? 'bg-purple-100 border-2 border-purple-300 shadow-sm'
                        : 'bg-white border border-purple-200 hover:bg-purple-50'
                    }`}
                  >
                    <Icon 
                      className={isSelected ? 'text-purple-600' : 'text-purple-400'} 
                      size={18} 
                    />
                    <span className={`font-medium ${
                      isSelected ? 'text-purple-800' : 'text-purple-600'
                    }`}>
                      {getStrategyText(strategy)}
                    </span>
                    {isSelected && (
                      <Star className="text-yellow-500 ml-auto" size={16} />
                    )}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* 文化背景区 */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Lamp className="text-green-600" size={20} />
              <h3 className="font-semibold text-green-900">文化背景</h3>
            </div>

            <div className="space-y-3">
              {/* 文化主题 */}
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Lamp className="text-red-500" size={16} />
                  <span className="font-medium text-green-800">
                    {activationData.culturalContext.theme}
                  </span>
                </div>
              </div>

              {/* 用餐礼仪 */}
              <div className="space-y-1">
                {activationData.culturalContext.etiquette.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Utensils className="text-orange-500" size={14} />
                    <span className="text-sm text-green-700">{item}</span>
                  </div>
                ))}
              </div>

              {/* 敬语系统 */}
              <div className="flex items-center space-x-2">
                <MessageCircle className="text-blue-500" size={16} />
                <span className="text-sm text-green-700">
                  {activationData.culturalContext.keigo}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MultiModalActivation;
