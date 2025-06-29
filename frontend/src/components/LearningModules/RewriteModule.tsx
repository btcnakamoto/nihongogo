/**
 * 功能描述：改写挑战学习模块
 * 输入参数：句子数据和状态更新回调
 * 返回值：React 改写挑战模块组件
 * 用途说明：显示语法提示词，让用户尝试用相同语法创造新句子
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React, { useState, useEffect } from 'react';
import { Puzzle, Lightbulb, Edit3, CheckCircle, RotateCcw } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { SentenceLearningData, LearningModuleState } from '@/types';

interface RewriteModuleProps {
  sentenceData: SentenceLearningData;
  moduleState: LearningModuleState;
  onStateUpdate: (state: Partial<LearningModuleState>) => void;
  onComplete: () => void;
}

// 根据语法要点生成挑战提示
const generateChallengePrompts = (grammar: string, japanese: string): string[] => {
  const prompts: string[] = [];
  
  // 基于语法要点生成不同的挑战
  if (grammar.includes('よろしくお願いします')) {
    prompts.push('用「よろしくお願いします」造一个自我介绍的句子');
    prompts.push('在工作场合如何使用「よろしくお願いします」？');
  } else if (grammar.includes('申します')) {
    prompts.push('用「申します」介绍自己的名字');
    prompts.push('用谦让语介绍自己的职业');
  } else if (grammar.includes('おかげさまで')) {
    prompts.push('用「おかげさまで」回答别人的关心');
    prompts.push('表达感谢时如何使用「おかげさまで」？');
  } else {
    // 通用挑战
    prompts.push('尝试改变句子中的主语');
    prompts.push('用相同的语法结构造一个新句子');
    prompts.push('把这个句子改成疑问句');
  }
  
  return prompts;
};

const RewriteModule: React.FC<RewriteModuleProps> = ({
  sentenceData,
  moduleState,
  onStateUpdate,
  onComplete,
}) => {
  const [showChallenge, setShowChallenge] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [challengePrompts] = useState(() => 
    generateChallengePrompts(sentenceData.grammar, sentenceData.japanese)
  );

  useEffect(() => {
    if (!startTime) {
      setStartTime(Date.now());
    }
  }, []);

  const handleStartChallenge = () => {
    setShowChallenge(true);
  };

  const handleSubmit = () => {
    if (!userInput.trim()) return;

    setHasSubmitted(true);
    setAttempts(prev => prev + 1);

    const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    
    // 简单的评分逻辑：基于输入长度和是否包含关键词
    let score = 60; // 基础分
    
    if (userInput.length >= 10) score += 20; // 长度加分
    if (userInput.includes('です') || userInput.includes('ます')) score += 10; // 敬语加分
    if (userInput.length >= 20) score += 10; // 复杂度加分
    
    score = Math.min(100, score);

    onStateUpdate({
      attempts: attempts + 1,
      timeSpent,
      score: Math.max(moduleState.score || 0, score),
      userInput,
    });
  };

  const handleTryAgain = () => {
    setUserInput('');
    setHasSubmitted(false);
    // 切换到下一个提示
    setCurrentPromptIndex((prev) => (prev + 1) % challengePrompts.length);
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

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success-600';
    if (score >= 80) return 'text-primary-600';
    if (score >= 70) return 'text-warning-600';
    return 'text-neutral-600';
  };

  const getScoreText = (score: number) => {
    if (score >= 90) return '创意十足！';
    if (score >= 80) return '很有想法！';
    if (score >= 70) return '不错的尝试！';
    return '继续加油！';
  };

  return (
    <Card className="bg-white border-2 border-primary-200 shadow-soft">
      <div className="space-y-6">
        {/* 模块标题 */}
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
            <Puzzle className="text-indigo-600" size={24} />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-neutral-900">🧩 改写挑战</h3>
            <p className="text-sm text-neutral-600">运用学到的语法知识，创造新的句子</p>
          </div>
        </div>

        {/* 原句展示 */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <div className="text-lg font-medium text-neutral-700">原句参考：</div>
            
            {/* 日语原文 */}
            <div className="text-xl font-bold text-neutral-900 font-japanese leading-relaxed">
              {sentenceData.japanese}
            </div>
            
            {/* 中文翻译 */}
            <div className="text-base text-neutral-700">
              {sentenceData.chinese}
            </div>
          </div>
        </div>

        {/* 语法要点 */}
        <Card className="bg-green-50 border-green-200">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
              <Lightbulb size={16} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-green-900 mb-2">语法要点</h4>
              <p className="text-green-800 text-sm leading-relaxed">
                {sentenceData.grammar}
              </p>
            </div>
          </div>
        </Card>

        {/* 挑战开始按钮 */}
        {!showChallenge && (
          <div className="text-center">
            <Button
              onClick={handleStartChallenge}
              variant="primary"
              size="lg"
              className="min-w-[160px]"
            >
              <Edit3 size={20} className="mr-2" />
              我来试试
            </Button>
          </div>
        )}

        {/* 挑战内容 */}
        {showChallenge && (
          <div className="space-y-6">
            {/* 挑战提示 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Puzzle className="text-blue-600 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">挑战任务</h4>
                  <p className="text-blue-800 text-sm">
                    {challengePrompts[currentPromptIndex]}
                  </p>
                </div>
              </div>
            </div>

            {/* 输入区域 */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-neutral-700">
                请输入您的创作：
              </label>
              
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="在这里输入您的创意句子..."
                className="w-full h-24 px-4 py-3 border-2 border-neutral-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors resize-none font-japanese text-lg"
                disabled={hasSubmitted}
              />

              {!hasSubmitted && (
                <div className="flex justify-center">
                  <Button
                    onClick={handleSubmit}
                    variant="primary"
                    size="lg"
                    disabled={!userInput.trim()}
                    className="min-w-[120px]"
                  >
                    <CheckCircle size={20} className="mr-2" />
                    提交作品
                  </Button>
                </div>
              )}
            </div>

            {/* 提交结果 */}
            {hasSubmitted && (
              <div className="animate-fade-in-up">
                <Card className="bg-success-50 border-success-200">
                  <div className="space-y-4">
                    {/* 评价 */}
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <CheckCircle className="text-success-600" size={24} />
                        <span className="text-lg font-bold text-neutral-900">创作完成！</span>
                      </div>
                      {moduleState.score !== undefined && (
                        <div className={`text-2xl font-bold ${getScoreColor(moduleState.score)}`}>
                          {moduleState.score}分 - {getScoreText(moduleState.score)}
                        </div>
                      )}
                    </div>

                    {/* 您的作品 */}
                    <div className="bg-white rounded-lg p-4 border border-neutral-200">
                      <div className="text-sm text-neutral-600 mb-2">您的作品：</div>
                      <div className="font-japanese text-lg text-neutral-900">
                        {userInput}
                      </div>
                    </div>

                    {/* 鼓励反馈 */}
                    <div className="bg-white rounded-lg p-4 border border-neutral-200">
                      <div className="text-sm text-success-700">
                        <p className="mb-2">🎉 很棒的尝试！创作练习有助于：</p>
                        <ul className="space-y-1 text-xs">
                          <li>• 加深对语法结构的理解</li>
                          <li>• 提高日语表达的灵活性</li>
                          <li>• 培养日语思维模式</li>
                          <li>• 增强语言运用能力</li>
                        </ul>
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex justify-center space-x-3">
                      <Button
                        onClick={handleTryAgain}
                        variant="outline"
                        size="lg"
                      >
                        <RotateCcw size={20} className="mr-2" />
                        再试一个
                      </Button>
                      
                      <Button
                        onClick={handleComplete}
                        variant="primary"
                        size="lg"
                      >
                        完成挑战
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* 已完成状态 */}
        {moduleState.isCompleted && (
          <div className="bg-success-50 border border-success-200 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 text-success-700">
              <div className="w-5 h-5 bg-success-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="font-medium">改写挑战已完成</span>
            </div>
            <div className="flex justify-center space-x-4 mt-2 text-sm text-success-600">
              <span>创意得分：{moduleState.score}分</span>
              <span>尝试次数：{moduleState.attempts}次</span>
              <span>用时：{moduleState.timeSpent}秒</span>
            </div>
          </div>
        )}

        {/* 学习提示 */}
        {!showChallenge && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              💡 提示：不要害怕犯错，大胆尝试用学到的语法创造新句子！
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default RewriteModule;
