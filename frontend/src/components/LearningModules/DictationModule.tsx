/**
 * 功能描述：听写输入学习模块
 * 输入参数：句子数据和状态更新回调
 * 返回值：React 听写输入模块组件
 * 用途说明：提供文本输入框供用户输入听到的日语，实时验证准确性并显示结果
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React, { useState, useEffect, useRef } from 'react';
import { PenTool, Play, Check, X, RotateCcw, AlertCircle } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { SentenceLearningData, LearningModuleState, DictationResult } from '@/types';
import { globalSpeechSynthesizer, calculateTextSimilarity } from '@/utils/speechUtils';

interface DictationModuleProps {
  sentenceData: SentenceLearningData;
  moduleState: LearningModuleState;
  onStateUpdate: (state: Partial<LearningModuleState>) => void;
  onComplete: () => void;
}

const DictationModule: React.FC<DictationModuleProps> = ({
  sentenceData,
  moduleState,
  onStateUpdate,
  onComplete,
}) => {
  const [userInput, setUserInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [dictationResult, setDictationResult] = useState<DictationResult | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!startTime) {
      setStartTime(Date.now());
    }
  }, []);

  useEffect(() => {
    // 自动聚焦到输入框
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const playAudio = async () => {
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

  const validateInput = (input: string): DictationResult => {
    const normalizedInput = input.trim();
    const normalizedTarget = sentenceData.japanese.trim();
    
    const accuracy = calculateTextSimilarity(normalizedInput, normalizedTarget);
    const isCorrect = accuracy >= 90;

    // 找出错误位置（简化版）
    const errors: DictationResult['errors'] = [];
    if (!isCorrect) {
      // 这里可以实现更复杂的错误检测逻辑
      errors.push({
        position: 0,
        expected: normalizedTarget,
        actual: normalizedInput,
      });
    }

    let feedback = '';
    if (accuracy >= 95) {
      feedback = '完美！您的听写非常准确！';
    } else if (accuracy >= 85) {
      feedback = '很好！只有少量错误，继续加油！';
    } else if (accuracy >= 70) {
      feedback = '不错！还有一些地方需要注意，请仔细听音频。';
    } else if (accuracy >= 50) {
      feedback = '需要改进，建议多听几遍音频再尝试。';
    } else {
      feedback = '建议先熟悉句子内容，然后再进行听写练习。';
    }

    return {
      isCorrect,
      accuracy,
      errors,
      feedback,
    };
  };

  const handleSubmit = () => {
    if (!userInput.trim()) {
      return;
    }

    const result = validateInput(userInput);
    setDictationResult(result);
    setHasSubmitted(true);
    setAttempts(prev => prev + 1);

    const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    const score = Math.round(result.accuracy);

    onStateUpdate({
      attempts: attempts + 1,
      timeSpent,
      score,
      userInput,
    });
  };

  const handleRetry = () => {
    setUserInput('');
    setHasSubmitted(false);
    setDictationResult(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleComplete = () => {
    const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    
    onStateUpdate({
      isCompleted: true,
      timeSpent,
      attempts,
    });
    
    onComplete();
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-success-600';
    if (accuracy >= 80) return 'text-primary-600';
    if (accuracy >= 70) return 'text-warning-600';
    return 'text-error-600';
  };

  return (
    <Card className="bg-white border-2 border-primary-200 shadow-soft">
      <div className="space-y-6">
        {/* 模块标题 */}
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <PenTool className="text-purple-600" size={24} />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-neutral-900">✍️ 听写输入</h3>
            <p className="text-sm text-neutral-600">听音频，然后输入您听到的日语句子</p>
          </div>
        </div>

        {/* 音频播放区域 */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 text-center">
          <div className="space-y-4">
            <div className="text-lg text-neutral-700 font-medium">
              点击播放按钮听音频，然后在下方输入您听到的内容
            </div>
            
            <Button
              onClick={playAudio}
              variant="primary"
              size="lg"
              disabled={isPlaying}
              className="min-w-[140px]"
            >
              {isPlaying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  播放中...
                </>
              ) : (
                <>
                  <Play size={20} className="mr-2" />
                  播放音频
                </>
              )}
            </Button>
          </div>
        </div>

        {/* 输入区域 */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-neutral-700">
            请输入您听到的日语句子：
          </label>
          
          <textarea
            ref={inputRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="在这里输入您听到的日语..."
            className="w-full h-24 px-4 py-3 border-2 border-neutral-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors resize-none font-japanese text-lg"
            disabled={hasSubmitted && dictationResult?.isCorrect}
          />

          {!hasSubmitted && (
            <div className="flex justify-center space-x-3">
              <Button
                onClick={handleSubmit}
                variant="primary"
                size="lg"
                disabled={!userInput.trim()}
                className="min-w-[120px]"
              >
                <Check size={20} className="mr-2" />
                提交答案
              </Button>
              
              <Button
                onClick={playAudio}
                variant="outline"
                size="lg"
                disabled={isPlaying}
              >
                <Play size={20} className="mr-2" />
                重新播放
              </Button>
            </div>
          )}
        </div>

        {/* 结果显示 */}
        {hasSubmitted && dictationResult && (
          <div className="animate-fade-in-up">
            <Card className={`${
              dictationResult.isCorrect 
                ? 'bg-success-50 border-success-200' 
                : 'bg-error-50 border-error-200'
            }`}>
              <div className="space-y-4">
                {/* 准确率显示 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {dictationResult.isCorrect ? (
                      <Check className="text-success-600" size={20} />
                    ) : (
                      <X className="text-error-600" size={20} />
                    )}
                    <span className="font-medium text-neutral-900">
                      {dictationResult.isCorrect ? '正确！' : '需要改进'}
                    </span>
                  </div>
                  <span className={`font-bold text-lg ${getAccuracyColor(dictationResult.accuracy)}`}>
                    准确率：{Math.round(dictationResult.accuracy)}%
                  </span>
                </div>

                {/* 正确答案对比 */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-neutral-700">正确答案：</div>
                  <div className="bg-white rounded-lg p-3 border border-neutral-200">
                    <div className="font-japanese text-lg text-neutral-900">
                      {sentenceData.japanese}
                    </div>
                    <div className="font-japanese text-sm text-neutral-600 mt-1">
                      {sentenceData.furigana}
                    </div>
                  </div>
                </div>

                {/* 反馈信息 */}
                <div className="bg-white rounded-lg p-3 border border-neutral-200">
                  <div className="flex items-start space-x-2">
                    <AlertCircle size={16} className="text-blue-600 mt-0.5" />
                    <p className="text-sm text-neutral-700">{dictationResult.feedback}</p>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex justify-center space-x-3">
                  {!dictationResult.isCorrect && (
                    <Button
                      onClick={handleRetry}
                      variant="outline"
                      size="lg"
                    >
                      <RotateCcw size={20} className="mr-2" />
                      重新尝试
                    </Button>
                  )}
                  
                  <Button
                    onClick={handleComplete}
                    variant="primary"
                    size="lg"
                  >
                    {dictationResult.isCorrect ? '完成练习' : '继续下一步'}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* 已完成状态 */}
        {moduleState.isCompleted && (
          <div className="bg-success-50 border border-success-200 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 text-success-700">
              <div className="w-5 h-5 bg-success-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="font-medium">听写练习已完成</span>
            </div>
            <div className="flex justify-center space-x-4 mt-2 text-sm text-success-600">
              <span>最高得分：{moduleState.score}分</span>
              <span>尝试次数：{moduleState.attempts}次</span>
              <span>用时：{moduleState.timeSpent}秒</span>
            </div>
          </div>
        )}

        {/* 学习提示 */}
        {!hasSubmitted && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              💡 提示：可以多听几遍音频，注意每个假名的发音
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DictationModule;
