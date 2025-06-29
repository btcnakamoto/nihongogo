/**
 * 功能描述：即时反馈与分析区组件
 * 输入参数：反馈数据
 * 返回值：React 即时反馈组件
 * 用途说明：提供语言分析、学习诊断和进步追踪的即时反馈
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React from 'react';
import { CheckCircle, AlertTriangle, RefreshCw, Brain, Target, Wrench, Lightbulb, Zap, Gamepad2, TrendingUp, Award } from 'lucide-react';
import { Card } from '@/components/ui';
import { InstantFeedback as InstantFeedbackType } from '@/types';

interface InstantFeedbackProps {
  feedbackData: InstantFeedbackType;
  className?: string;
}

const InstantFeedback: React.FC<InstantFeedbackProps> = ({
  feedbackData,
  className = '',
}) => {
  const getCognitiveLoadColor = (load: string) => {
    switch (load) {
      case 'low': return 'text-success-600 bg-success-100';
      case 'medium': return 'text-warning-600 bg-warning-100';
      case 'high': return 'text-error-600 bg-error-100';
      default: return 'text-neutral-600 bg-neutral-100';
    }
  };

  const getCognitiveLoadText = (load: string) => {
    switch (load) {
      case 'low': return '轻度负荷';
      case 'medium': return '中等负荷';
      case 'high': return '高度负荷';
      default: return '中等负荷';
    }
  };

  const renderTrendChart = (trend: number[]) => {
    const maxValue = Math.max(...trend);
    const minValue = Math.min(...trend);
    const range = maxValue - minValue || 1;

    return (
      <div className="flex items-end space-x-1 h-16">
        {trend.map((value, index) => {
          const height = ((value - minValue) / range) * 48 + 8; // 8-56px height
          return (
            <div
              key={index}
              className="flex-1 bg-gradient-to-t from-primary-400 to-primary-500 rounded-t-sm transition-all duration-300 hover:from-primary-500 hover:to-primary-600"
              style={{ height: `${height}px` }}
              title={`第${index + 1}天: ${value}分`}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className={`bg-white border-b border-neutral-200 px-6 py-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 语言分析 */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="text-blue-600" size={20} />
              <h3 className="font-semibold text-blue-900">语言分析</h3>
            </div>

            <div className="space-y-3">
              {/* 语法分析 */}
              <div className="flex items-start space-x-2">
                {feedbackData.languageAnalysis.grammar.correct ? (
                  <CheckCircle className="text-success-600 mt-0.5" size={16} />
                ) : (
                  <AlertTriangle className="text-warning-600 mt-0.5" size={16} />
                )}
                <div>
                  <span className="text-sm font-medium text-blue-800">语法：</span>
                  <span className={`text-sm ml-1 ${
                    feedbackData.languageAnalysis.grammar.correct 
                      ? 'text-success-700' 
                      : 'text-warning-700'
                  }`}>
                    {feedbackData.languageAnalysis.grammar.message}
                  </span>
                </div>
              </div>

              {/* 发音分析 */}
              <div className="flex items-start space-x-2">
                <AlertTriangle className="text-warning-600 mt-0.5" size={16} />
                <div>
                  <div className="text-sm font-medium text-blue-800 mb-1">
                    发音：{feedbackData.languageAnalysis.pronunciation.score}
                  </div>
                  <div className="space-y-1">
                    {feedbackData.languageAnalysis.pronunciation.issues.map((issue, index) => (
                      <div key={index} className="text-xs text-warning-700">
                        • {issue}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 中文影响 */}
              <div className="flex items-start space-x-2">
                <RefreshCw className="text-primary-600 mt-0.5" size={16} />
                <div>
                  <span className="text-sm font-medium text-blue-800">中文影响：</span>
                  <span className="text-sm text-primary-700 ml-1">
                    {feedbackData.languageAnalysis.chineseInfluence}
                  </span>
                </div>
              </div>

              {/* 认知负荷 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="text-purple-600" size={16} />
                  <span className="text-sm font-medium text-blue-800">认知负荷：</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  getCognitiveLoadColor(feedbackData.languageAnalysis.cognitiveLoad)
                }`}>
                  {getCognitiveLoadText(feedbackData.languageAnalysis.cognitiveLoad)}
                </span>
              </div>

              {/* 敬语使用 */}
              <div className="flex items-start space-x-2">
                <CheckCircle className="text-success-600 mt-0.5" size={16} />
                <div>
                  <span className="text-sm font-medium text-blue-800">敬语：</span>
                  <span className="text-sm text-success-700 ml-1">
                    {feedbackData.languageAnalysis.keigoUsage}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* 学习诊断 */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="text-green-600" size={20} />
              <h3 className="font-semibold text-green-900">学习诊断</h3>
            </div>

            <div className="space-y-3">
              {/* 强项 */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="text-success-600" size={16} />
                  <span className="text-sm font-medium text-green-800">强项：</span>
                </div>
                <div className="space-y-1">
                  {feedbackData.learningDiagnosis.strengths.map((strength, index) => (
                    <div key={index} className="text-xs text-success-700 bg-success-50 px-2 py-1 rounded">
                      {strength}
                    </div>
                  ))}
                </div>
              </div>

              {/* 弱项 */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Wrench className="text-warning-600" size={16} />
                  <span className="text-sm font-medium text-green-800">弱项：</span>
                </div>
                <div className="space-y-1">
                  {feedbackData.learningDiagnosis.weaknesses.map((weakness, index) => (
                    <div key={index} className="text-xs text-warning-700 bg-warning-50 px-2 py-1 rounded">
                      {weakness}
                    </div>
                  ))}
                </div>
              </div>

              {/* 建议 */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Lightbulb className="text-blue-600" size={16} />
                  <span className="text-sm font-medium text-green-800">建议：</span>
                </div>
                <div className="space-y-1">
                  {feedbackData.learningDiagnosis.suggestions.map((suggestion, index) => (
                    <div key={index} className="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded">
                      {suggestion}
                    </div>
                  ))}
                </div>
              </div>

              {/* 学习效率 */}
              <div className="flex items-center justify-between pt-2 border-t border-green-200">
                <div className="flex items-center space-x-2">
                  <Zap className="text-orange-600" size={16} />
                  <span className="text-sm font-medium text-green-800">学习效率：</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-success-600">
                    {feedbackData.learningDiagnosis.efficiency}%
                  </span>
                  <div className="w-16 h-2 bg-green-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-success-400 to-success-500 rounded-full transition-all duration-500"
                      style={{ width: `${feedbackData.learningDiagnosis.efficiency}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* 下一挑战 */}
              <div className="flex items-center space-x-2 pt-2 border-t border-green-200">
                <Gamepad2 className="text-purple-600" size={16} />
                <div>
                  <span className="text-sm font-medium text-green-800">下一挑战：</span>
                  <span className="text-sm text-purple-700 ml-1">
                    {feedbackData.learningDiagnosis.nextChallenge}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* 进步追踪 */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="text-purple-600" size={20} />
              <h3 className="font-semibold text-purple-900">进步追踪</h3>
            </div>

            <div className="space-y-4">
              {/* 7天趋势图 */}
              <div>
                <div className="text-sm font-medium text-purple-800 mb-2">📈 7天趋势图：</div>
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  {renderTrendChart(feedbackData.progressTracking.weeklyTrend)}
                  <div className="flex justify-between text-xs text-neutral-500 mt-2">
                    <span>7天前</span>
                    <span>今天</span>
                  </div>
                </div>
              </div>

              {/* 突破成就 */}
              <div>
                <div className="text-sm font-medium text-purple-800 mb-2">🚀 最新突破：</div>
                <div className="space-y-2">
                  {feedbackData.progressTracking.breakthroughs.map((breakthrough, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 bg-white rounded-lg p-2 border border-purple-200"
                    >
                      <Award className="text-yellow-500" size={16} />
                      <span className="text-sm text-purple-700 font-medium">
                        {breakthrough}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 学习统计 */}
              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div>
                    <div className="text-lg font-bold text-purple-600">
                      {Math.max(...feedbackData.progressTracking.weeklyTrend)}
                    </div>
                    <div className="text-xs text-purple-700">最高分</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">
                      {(feedbackData.progressTracking.weeklyTrend.reduce((a, b) => a + b, 0) / 
                        feedbackData.progressTracking.weeklyTrend.length).toFixed(1)}
                    </div>
                    <div className="text-xs text-purple-700">平均分</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InstantFeedback;
