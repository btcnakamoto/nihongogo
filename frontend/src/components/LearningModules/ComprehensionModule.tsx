/**
 * 功能描述：意思推测学习模块
 * 输入参数：句子数据和状态更新回调
 * 返回值：React 意思推测模块组件
 * 用途说明：隐藏中文翻译让用户思考，提供显示翻译和语法要点功能
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React, { useState, useEffect } from 'react';
import { Brain, Eye, EyeOff, BookOpen, CheckCircle } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { SentenceLearningData, LearningModuleState } from '@/types';

interface ComprehensionModuleProps {
  sentenceData: SentenceLearningData;
  moduleState: LearningModuleState;
  onStateUpdate: (state: Partial<LearningModuleState>) => void;
  onComplete: () => void;
}

const ComprehensionModule: React.FC<ComprehensionModuleProps> = ({
  sentenceData,
  moduleState,
  onStateUpdate,
  onComplete,
}) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const [showGrammar, setShowGrammar] = useState(false);
  const [hasThought, setHasThought] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [thinkingTime, setThinkingTime] = useState(0);

  useEffect(() => {
    if (!startTime) {
      setStartTime(Date.now());
    }
  }, []);

  useEffect(() => {
    // 计算思考时间
    if (startTime && hasThought && !showTranslation) {
      const timer = setInterval(() => {
        setThinkingTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [startTime, hasThought, showTranslation]);

  const handleIKnowMeaning = () => {
    setHasThought(true);
    const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    
    onStateUpdate({
      attempts: moduleState.attempts + 1,
      timeSpent,
      score: 100, // 用户声称知道意思给满分
    });

    // 延迟显示翻译，给用户一个思考确认的时间
    setTimeout(() => {
      setShowTranslation(true);
      setShowGrammar(true);
    }, 1000);
  };

  const handleShowTranslation = () => {
    setShowTranslation(true);
    setShowGrammar(true);
    
    const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    const score = hasThought ? 80 : 60; // 如果先思考了给更高分
    
    onStateUpdate({
      attempts: moduleState.attempts + 1,
      timeSpent,
      score,
    });
  };

  const handleComplete = () => {
    const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    
    onStateUpdate({
      isCompleted: true,
      timeSpent,
    });
    
    onComplete();
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success-600';
    if (score >= 80) return 'text-primary-600';
    if (score >= 70) return 'text-warning-600';
    return 'text-neutral-600';
  };

  const getScoreText = (score: number) => {
    if (score >= 90) return '优秀';
    if (score >= 80) return '良好';
    if (score >= 70) return '一般';
    return '需要加强';
  };

  return (
    <Card className="bg-white border-2 border-primary-200 shadow-soft">
      <div className="text-center space-y-6">
        {/* 模块标题 */}
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Brain className="text-blue-600" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-neutral-900">🧠 意思推测</h3>
            <p className="text-sm text-neutral-600">先思考句子的含义，再查看答案</p>
          </div>
        </div>

        {/* 句子显示区域 */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
          <div className="space-y-4">
            {/* 日语原文 */}
            <div className="text-2xl font-bold text-neutral-900 font-japanese leading-relaxed">
              {sentenceData.japanese}
            </div>
            
            {/* 假名注音 */}
            <div className="text-lg text-neutral-600 font-japanese">
              {sentenceData.furigana}
            </div>
            
            {/* 思考提示 */}
            {!showTranslation && (
              <div className="bg-white/80 rounded-lg p-4 border-2 border-dashed border-blue-300">
                <div className="flex items-center justify-center space-x-2 text-blue-700">
                  <Brain size={20} />
                  <span className="font-medium">请思考这句话的意思...</span>
                </div>
                {hasThought && (
                  <div className="mt-2 text-sm text-blue-600">
                    思考时间：{thinkingTime} 秒
                  </div>
                )}
              </div>
            )}
            
            {/* 中文翻译 - 条件显示 */}
            {showTranslation && (
              <div className="animate-fade-in-up">
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="text-blue-600" size={16} />
                    <span className="text-sm font-medium text-blue-700">中文翻译</span>
                  </div>
                  <div className="text-lg text-neutral-800 font-medium">
                    {sentenceData.chinese}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 语法要点 - 条件显示 */}
        {showGrammar && (
          <div className="animate-fade-in-up">
            <Card className="bg-green-50 border-green-200">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <BookOpen size={16} className="text-green-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-green-900 mb-2">语法要点</h4>
                  <p className="text-green-800 text-sm leading-relaxed">
                    {sentenceData.grammar}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* 控制按钮 */}
        {!showTranslation && (
          <div className="flex justify-center space-x-4">
            <Button
              onClick={handleIKnowMeaning}
              variant="primary"
              size="lg"
              className="min-w-[140px]"
            >
              <CheckCircle size={20} className="mr-2" />
              我知道意思
            </Button>

            <Button
              onClick={handleShowTranslation}
              variant="outline"
              size="lg"
              className="min-w-[140px]"
            >
              <Eye size={20} className="mr-2" />
              显示中文翻译
            </Button>
          </div>
        )}

        {/* 评分显示 */}
        {showTranslation && moduleState.score !== undefined && !moduleState.isCompleted && (
          <div className="bg-neutral-50 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-neutral-700">理解程度：</span>
              <span className={`font-bold text-lg ${getScoreColor(moduleState.score)}`}>
                {moduleState.score}分 ({getScoreText(moduleState.score)})
              </span>
            </div>
            {hasThought && (
              <p className="text-sm text-neutral-600 mt-2">
                很好！您先进行了思考，这有助于加深理解
              </p>
            )}
          </div>
        )}

        {/* 完成按钮 */}
        {showTranslation && !moduleState.isCompleted && (
          <div className="pt-4 border-t border-neutral-200">
            <Button
              onClick={handleComplete}
              variant="primary"
              size="lg"
              className="w-full"
            >
              完成意思推测练习
            </Button>
          </div>
        )}

        {/* 已完成状态 */}
        {moduleState.isCompleted && (
          <div className="bg-success-50 border border-success-200 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 text-success-700">
              <div className="w-5 h-5 bg-success-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="font-medium">意思推测练习已完成</span>
            </div>
            <div className="flex justify-center space-x-4 mt-2 text-sm text-success-600">
              <span>得分：{moduleState.score}分</span>
              <span>用时：{moduleState.timeSpent}秒</span>
            </div>
          </div>
        )}

        {/* 学习提示 */}
        {!showTranslation && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              💡 建议先仔细思考句子的含义，这样能更好地理解和记忆
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ComprehensionModule;
