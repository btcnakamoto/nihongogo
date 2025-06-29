/**
 * 功能描述：意思猜测学习模块
 * 输入参数：句子数据和状态更新回调
 * 返回值：React 意思猜测模块组件
 * 用途说明：提供听音频后猜测意思的交互练习，激发主动思考
 * 作者：nakamotochen
 * 创建时间：2025-06-15
 */

import React, { useState, useEffect } from 'react';
import { Play, Brain, CheckCircle, XCircle, Lightbulb, RotateCcw } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { SentenceLearningData, LearningModuleState } from '@/types';
import { globalSpeechSynthesizer } from '@/utils/speechUtils';

interface ComprehensionGuessModuleProps {
  sentenceData: SentenceLearningData;
  moduleState: LearningModuleState;
  onStateUpdate: (state: Partial<LearningModuleState>) => void;
  onComplete: () => void;
}

const ComprehensionGuessModule: React.FC<ComprehensionGuessModuleProps> = ({
  sentenceData,
  moduleState,
  onStateUpdate,
  onComplete,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);

  // 生成选项（正确答案 + 3个干扰项）
  const generateOptions = () => {
    const correctAnswer = sentenceData.chinese;
    
    // 简单的干扰项生成逻辑（实际项目中应该从数据库获取）
    const distractors = [
      '早上好。今天天气真不错。',
      '谢谢您的帮助，非常感谢。',
      '不好意思，请问车站在哪里？',
      '我想预订明天的房间。',
      '这个多少钱？可以便宜一点吗？',
      '请给我一杯咖啡，谢谢。'
    ].filter(item => item !== correctAnswer);

    // 随机选择3个干扰项
    const selectedDistractors = distractors
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    // 将正确答案和干扰项混合并随机排序
    const allOptions = [correctAnswer, ...selectedDistractors]
      .sort(() => Math.random() - 0.5);

    return allOptions;
  };

  const [options] = useState(generateOptions());

  useEffect(() => {
    if (!startTime) {
      setStartTime(Date.now());
    }
  }, []);

  const handlePlayAudio = async () => {
    if (isPlaying) {
      globalSpeechSynthesizer.stop();
      setIsPlaying(false);
      return;
    }

    try {
      setIsPlaying(true);
      globalSpeechSynthesizer.updateConfig({ rate: 0.8 });

      await globalSpeechSynthesizer.speak(
        sentenceData.japanese,
        () => setIsPlaying(false),
        (error) => {
          console.error('语音播放失败:', error);
          setIsPlaying(false);
        }
      );
    } catch (error) {
      console.error('语音播放失败:', error);
      setIsPlaying(false);
    }
  };

  const handleOptionSelect = (option: string) => {
    if (showResult) return;
    
    setSelectedOption(option);
    setShowResult(true);
    setAttempts(prev => prev + 1);

    const isCorrect = option === sentenceData.chinese;
    const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;

    onStateUpdate({
      attempts: attempts + 1,
      timeSpent,
      score: isCorrect ? 100 : Math.max(0, 100 - (attempts * 20)),
    });

    if (isCorrect) {
      setTimeout(() => {
        handleComplete();
      }, 2000);
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setShowResult(false);
    setShowHint(false);
  };

  const handleShowHint = () => {
    setShowHint(true);
  };

  const handleComplete = () => {
    const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    const finalScore = selectedOption === sentenceData.chinese ? 
      Math.max(60, 100 - ((attempts - 1) * 20)) : 60;

    onStateUpdate({
      isCompleted: true,
      timeSpent,
      attempts,
      score: finalScore,
    });
    onComplete();
  };

  const isCorrect = selectedOption === sentenceData.chinese;

  return (
    <Card className="bg-white border-2 border-green-200 shadow-soft">
      <div className="space-y-6">
        {/* 模块标题 */}
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Brain className="text-green-600" size={24} />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-neutral-900">🤔 意思猜测</h3>
            <p className="text-sm text-neutral-600">听音频后猜测句子的意思</p>
          </div>
        </div>

        {/* 音频播放区域 */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center">
          <div className="space-y-4">
            {/* 日语原文（初始隐藏） */}
            {showResult && (
              <div className="text-2xl font-bold text-neutral-900 font-japanese leading-relaxed">
                {sentenceData.japanese}
              </div>
            )}
            
            {/* 假名注音（初始隐藏） */}
            {showResult && (
              <div className="text-lg text-neutral-600 font-japanese">
                {sentenceData.furigana}
              </div>
            )}

            {/* 音频播放按钮 */}
            <div className="flex justify-center">
              <Button
                onClick={handlePlayAudio}
                variant="primary"
                size="lg"
                loading={isPlaying}
                disabled={isPlaying}
                className="bg-green-600 hover:bg-green-700 border-green-600"
              >
                <Play size={24} className="mr-2" />
                {isPlaying ? '播放中...' : '播放音频'}
              </Button>
            </div>

            {!showResult && (
              <p className="text-sm text-green-700">
                💡 仔细听音频，然后选择正确的中文意思
              </p>
            )}
          </div>
        </div>

        {/* 选项区域 */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-neutral-900 text-center">
            请选择正确的中文意思：
          </h4>
          
          <div className="grid grid-cols-1 gap-3">
            {options.map((option, index) => {
              const isSelected = selectedOption === option;
              const isCorrectOption = option === sentenceData.chinese;
              
              let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ';
              
              if (!showResult) {
                buttonClass += 'border-neutral-200 hover:border-green-300 hover:bg-green-50';
              } else if (isSelected) {
                if (isCorrectOption) {
                  buttonClass += 'border-green-500 bg-green-50 text-green-800';
                } else {
                  buttonClass += 'border-red-500 bg-red-50 text-red-800';
                }
              } else if (isCorrectOption) {
                buttonClass += 'border-green-500 bg-green-50 text-green-800';
              } else {
                buttonClass += 'border-neutral-200 bg-neutral-50 text-neutral-500';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base">{option}</span>
                    {showResult && isSelected && (
                      isCorrectOption ? (
                        <CheckCircle className="text-green-600" size={20} />
                      ) : (
                        <XCircle className="text-red-600" size={20} />
                      )
                    )}
                    {showResult && !isSelected && isCorrectOption && (
                      <CheckCircle className="text-green-600" size={20} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 提示按钮 */}
        {!showResult && !showHint && attempts > 0 && (
          <div className="text-center">
            <Button
              onClick={handleShowHint}
              variant="outline"
              size="sm"
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              <Lightbulb size={16} className="mr-2" />
              显示提示
            </Button>
          </div>
        )}

        {/* 提示内容 */}
        {showHint && !showResult && (
          <Card className="bg-amber-50 border-amber-200">
            <div className="flex items-start space-x-3">
              <Lightbulb className="text-amber-600 mt-1" size={20} />
              <div>
                <h5 className="font-semibold text-amber-900 mb-1">💡 提示</h5>
                <p className="text-sm text-amber-800">
                  {sentenceData.grammar}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* 结果反馈 */}
        {showResult && (
          <Card className={`${isCorrect ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
            <div className="text-center space-y-3">
              {isCorrect ? (
                <>
                  <div className="flex items-center justify-center space-x-2 text-green-700">
                    <CheckCircle size={24} />
                    <span className="text-lg font-semibold">回答正确！</span>
                  </div>
                  <p className="text-green-800">
                    很好！您正确理解了句子的意思。
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center space-x-2 text-orange-700">
                    <XCircle size={24} />
                    <span className="text-lg font-semibold">再试一次</span>
                  </div>
                  <p className="text-orange-800">
                    正确答案是：{sentenceData.chinese}
                  </p>
                  <Button
                    onClick={handleRetry}
                    variant="outline"
                    size="sm"
                    className="border-orange-300 text-orange-700 hover:bg-orange-50"
                  >
                    <RotateCcw size={16} className="mr-2" />
                    重新选择
                  </Button>
                </>
              )}
            </div>
          </Card>
        )}

        {/* 语法要点 */}
        {showResult && isCorrect && (
          <Card className="bg-blue-50 border-blue-200">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                <Brain size={16} className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">语法要点</h4>
                <p className="text-blue-800">
                  {sentenceData.grammar}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* 完成状态 */}
        {moduleState.isCompleted && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 text-green-700">
              <CheckCircle size={20} />
              <span className="font-medium">意思猜测练习已完成</span>
            </div>
            <p className="text-sm text-green-600 mt-2 text-center">
              尝试次数：{moduleState.attempts} 次 · 用时：{moduleState.timeSpent} 秒 · 得分：{moduleState.score}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ComprehensionGuessModule;
