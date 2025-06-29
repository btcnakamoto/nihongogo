/**
 * 功能描述：试学学习界面组件
 * 输入参数：句子数据和学习状态
 * 返回值：React 学习界面组件
 * 用途说明：整合6个学习模块，提供完整的句子级学习体验
 * 作者：nakamotochen
 * 创建时间：2025-06-15
 */

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, RotateCcw, Crown } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { SentenceLearningData, LearningModuleState } from '@/types';

// 导入学习模块
import { AudioModule, DictationModule, SpeakingModule, RewriteModule } from '@/components/LearningModules';
import ComprehensionGuessModule from './ComprehensionGuessModule';
import LearningProgressTracker from './LearningProgressTracker';

interface TrialLearningInterfaceProps {
  sentenceData: SentenceLearningData;
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastSentence: boolean;
}

type LearningStep = 'audio' | 'comprehension' | 'dictation' | 'speaking' | 'rewrite' | 'summary';

const TrialLearningInterface: React.FC<TrialLearningInterfaceProps> = ({
  sentenceData,
  onComplete,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isLastSentence,
}) => {
  const [currentStep, setCurrentStep] = useState<LearningStep>('audio');
  const [moduleStates, setModuleStates] = useState<Record<LearningStep, LearningModuleState>>({
    audio: { isCompleted: false, attempts: 0, timeSpent: 0, score: 0 },
    comprehension: { isCompleted: false, attempts: 0, timeSpent: 0, score: 0 },
    dictation: { isCompleted: false, attempts: 0, timeSpent: 0, score: 0 },
    speaking: { isCompleted: false, attempts: 0, timeSpent: 0, score: 0 },
    rewrite: { isCompleted: false, attempts: 0, timeSpent: 0, score: 0 },
    summary: { isCompleted: false, attempts: 0, timeSpent: 0, score: 0 },
  });

  const steps: { key: LearningStep; label: string; emoji: string }[] = [
    { key: 'audio', label: '听音频', emoji: '🎧' },
    { key: 'comprehension', label: '意思猜测', emoji: '🤔' },
    { key: 'dictation', label: '听写输入', emoji: '✍️' },
    { key: 'speaking', label: '发音练习', emoji: '🗣️' },
    { key: 'rewrite', label: '重写挑战', emoji: '✨' },
    { key: 'summary', label: '学习总结', emoji: '📊' },
  ];

  // 更新模块状态
  const updateModuleState = (step: LearningStep, state: Partial<LearningModuleState>) => {
    setModuleStates(prev => ({
      ...prev,
      [step]: { ...prev[step], ...state }
    }));
  };

  // 处理模块完成
  const handleModuleComplete = (step: LearningStep) => {
    const currentStepIndex = steps.findIndex(s => s.key === step);
    const nextStepIndex = currentStepIndex + 1;
    
    if (nextStepIndex < steps.length) {
      setCurrentStep(steps[nextStepIndex].key);
    } else {
      // 所有模块完成，进入总结
      setCurrentStep('summary');
      updateModuleState('summary', { isCompleted: true });
    }
  };

  // 检查是否可以进入下一步
  const canProceedToStep = (step: LearningStep): boolean => {
    const stepIndex = steps.findIndex(s => s.key === step);
    if (stepIndex === 0) return true;
    
    const previousStep = steps[stepIndex - 1];
    return moduleStates[previousStep.key].isCompleted;
  };

  // 计算总体完成度
  const completedModules = Object.values(moduleStates).filter(state => state.isCompleted).length;
  const totalProgress = (completedModules / 5) * 100; // 不包括summary

  // 保存学习进度
  const handleSaveProgress = () => {
    try {
      const progressData = {
        sentenceId: sentenceData.id,
        moduleStates,
        completedAt: new Date().toISOString(),
        totalScore: Object.values(moduleStates).reduce((sum, state) => sum + (state.score || 0), 0),
      };
      
      const existingData = localStorage.getItem('nihongogo_sentence_progress') || '[]';
      const allProgress = JSON.parse(existingData);
      
      // 更新或添加当前句子的进度
      const existingIndex = allProgress.findIndex((p: any) => p.sentenceId === sentenceData.id);
      if (existingIndex >= 0) {
        allProgress[existingIndex] = progressData;
      } else {
        allProgress.push(progressData);
      }
      
      localStorage.setItem('nihongogo_sentence_progress', JSON.stringify(allProgress));
      
      // 显示保存成功提示
      alert('学习进度已保存！');
    } catch (error) {
      console.error('保存进度失败:', error);
      alert('保存进度失败，请稍后重试。');
    }
  };

  // 渲染当前学习模块
  const renderCurrentModule = () => {
    const commonProps = {
      sentenceData,
      moduleState: moduleStates[currentStep],
      onStateUpdate: (state: Partial<LearningModuleState>) => updateModuleState(currentStep, state),
      onComplete: () => handleModuleComplete(currentStep),
    };

    switch (currentStep) {
      case 'audio':
        return <AudioModule {...commonProps} />;
      case 'comprehension':
        return <ComprehensionGuessModule {...commonProps} />;
      case 'dictation':
        return <DictationModule {...commonProps} />;
      case 'speaking':
        return <SpeakingModule {...commonProps} />;
      case 'rewrite':
        return <RewriteModule {...commonProps} />;
      case 'summary':
        return (
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">🎉 句子学习完成！</h3>
                <p className="text-neutral-600">
                  恭喜您完成了这个句子的全部学习模块
                </p>
              </div>

              {/* 学习统计 */}
              <div className="bg-white/60 rounded-xl p-4">
                <h4 className="font-semibold text-neutral-900 mb-3">学习统计</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-neutral-600">总用时</span>
                    <div className="font-bold text-lg text-green-600">
                      {Object.values(moduleStates).reduce((sum, state) => sum + (state.timeSpent || 0), 0)} 秒
                    </div>
                  </div>
                  <div>
                    <span className="text-neutral-600">平均分数</span>
                    <div className="font-bold text-lg text-green-600">
                      {Math.round(Object.values(moduleStates).reduce((sum, state) => sum + (state.score || 0), 0) / 5)}
                    </div>
                  </div>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="space-y-3">
                {!isLastSentence && (
                  <Button
                    onClick={onNext}
                    variant="primary"
                    size="lg"
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <ArrowRight size={20} className="mr-2" />
                    学习下一个句子
                  </Button>
                )}
                
                {isLastSentence && (
                  <Button
                    onClick={onComplete}
                    variant="primary"
                    size="lg"
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <Crown size={20} className="mr-2" />
                    完成试学体验
                  </Button>
                )}

                <Button
                  onClick={handleSaveProgress}
                  variant="outline"
                  size="lg"
                  className="w-full border-green-300 text-green-700 hover:bg-green-50"
                >
                  保存学习进度
                </Button>
              </div>
            </div>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* 步骤导航 */}
      <Card className="bg-white border-green-200">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-neutral-900 text-center">学习步骤</h3>
          
          {/* 步骤指示器 */}
          <div className="flex items-center justify-between">
            {steps.slice(0, 5).map((step, index) => {
              const isCompleted = moduleStates[step.key].isCompleted;
              const isCurrent = currentStep === step.key;
              const canAccess = canProceedToStep(step.key);
              
              return (
                <React.Fragment key={step.key}>
                  <button
                    onClick={() => canAccess && setCurrentStep(step.key)}
                    disabled={!canAccess}
                    className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all ${
                      isCurrent 
                        ? 'bg-green-100 text-green-700' 
                        : isCompleted 
                        ? 'bg-green-50 text-green-600 hover:bg-green-100' 
                        : canAccess
                        ? 'text-neutral-600 hover:bg-neutral-50'
                        : 'text-neutral-400 cursor-not-allowed'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      isCompleted 
                        ? 'bg-green-600 text-white' 
                        : isCurrent 
                        ? 'bg-green-200 text-green-800' 
                        : 'bg-neutral-200 text-neutral-600'
                    }`}>
                      {isCompleted ? '✓' : step.emoji}
                    </div>
                    <span className="text-xs font-medium">{step.label}</span>
                  </button>
                  
                  {index < 4 && (
                    <div className={`flex-1 h-0.5 mx-2 ${
                      moduleStates[steps[index + 1].key].isCompleted || isCompleted
                        ? 'bg-green-300' 
                        : 'bg-neutral-200'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* 总体进度 */}
          <div className="bg-neutral-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-600">总体进度</span>
              <span className="text-sm font-medium text-green-700">{Math.round(totalProgress)}%</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* 当前学习模块 */}
      {renderCurrentModule()}

      {/* 导航按钮 */}
      {currentStep !== 'summary' && (
        <div className="flex justify-between items-center">
          <Button
            onClick={onPrevious}
            variant="outline"
            disabled={!canGoPrevious}
            className="border-neutral-300"
          >
            <ArrowLeft size={16} className="mr-2" />
            上一句
          </Button>

          <div className="flex space-x-2">
            <Button
              onClick={() => setCurrentStep('audio')}
              variant="outline"
              size="sm"
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              <RotateCcw size={16} className="mr-1" />
              重新开始
            </Button>
          </div>

          <Button
            onClick={onNext}
            variant="outline"
            disabled={!canGoNext || currentStep !== 'summary'}
            className="border-neutral-300"
          >
            下一句
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TrialLearningInterface;
