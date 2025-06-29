/**
 * 功能描述：数据保存学习模块
 * 输入参数：句子数据和状态更新回调
 * 返回值：React 数据保存模块组件
 * 用途说明：提供收藏功能、进度保存和下一个句子导航
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React, { useState, useEffect } from 'react';
import { Save, Heart, ArrowRight, BarChart3, Clock, Target, Star } from 'lucide-react';
import { Button, Card, ProgressBar } from '@/components/ui';
import { SentenceLearningData, LearningModuleState, LearningModuleType } from '@/types';

interface ProgressModuleProps {
  sentenceData: SentenceLearningData;
  moduleState: LearningModuleState;
  allModuleStates: Record<LearningModuleType, LearningModuleState>;
  onStateUpdate: (state: Partial<LearningModuleState>) => void;
  onComplete: () => void;
  onNextSentence: () => void;
  isLastSentence: boolean;
  totalSentences: number;
  currentSentenceIndex: number;
}

const ProgressModule: React.FC<ProgressModuleProps> = ({
  sentenceData,
  moduleState,
  allModuleStates,
  onStateUpdate,
  onComplete,
  onNextSentence,
  isLastSentence,
  totalSentences,
  currentSentenceIndex,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (!startTime) {
      setStartTime(Date.now());
    }
  }, []);

  useEffect(() => {
    // 检查是否已收藏
    const favorites = JSON.parse(localStorage.getItem('nihongogo_favorites') || '[]');
    setIsFavorited(favorites.some((fav: any) => fav.id === sentenceData.id));
  }, [sentenceData.id]);

  useEffect(() => {
    // 当所有其他模块完成时自动显示统计
    const otherModules: LearningModuleType[] = ['audio', 'comprehension', 'dictation', 'speaking', 'rewrite'];
    const completedCount = otherModules.filter(type => allModuleStates[type]?.isCompleted).length;
    
    if (completedCount >= 3) { // 至少完成3个模块就显示统计
      setShowStats(true);
    }
  }, [allModuleStates]);

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('nihongogo_favorites') || '[]');
    
    if (isFavorited) {
      // 移除收藏
      const updatedFavorites = favorites.filter((fav: any) => fav.id !== sentenceData.id);
      localStorage.setItem('nihongogo_favorites', JSON.stringify(updatedFavorites));
      setIsFavorited(false);
    } else {
      // 添加收藏
      const favoriteItem = {
        id: sentenceData.id,
        japanese: sentenceData.japanese,
        furigana: sentenceData.furigana,
        chinese: sentenceData.chinese,
        grammar: sentenceData.grammar,
        addedAt: new Date().toISOString(),
      };
      favorites.push(favoriteItem);
      localStorage.setItem('nihongogo_favorites', JSON.stringify(favorites));
      setIsFavorited(true);
    }

    // 更新模块状态
    const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    onStateUpdate({
      attempts: moduleState.attempts + 1,
      timeSpent,
    });
  };

  const handleSaveProgress = () => {
    // 保存当前学习进度到 localStorage
    const progressData = {
      sentenceId: sentenceData.id,
      moduleStates: allModuleStates,
      completedAt: new Date().toISOString(),
      totalScore: calculateTotalScore(),
    };

    const savedProgress = JSON.parse(localStorage.getItem('nihongogo_progress') || '[]');
    const existingIndex = savedProgress.findIndex((p: any) => p.sentenceId === sentenceData.id);
    
    if (existingIndex >= 0) {
      savedProgress[existingIndex] = progressData;
    } else {
      savedProgress.push(progressData);
    }
    
    localStorage.setItem('nihongogo_progress', JSON.stringify(savedProgress));

    const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    onStateUpdate({
      isCompleted: true,
      timeSpent,
      score: 100, // 保存进度给满分
    });
  };

  const handleNextSentence = () => {
    if (!moduleState.isCompleted) {
      handleSaveProgress();
    }
    onNextSentence();
  };

  const calculateTotalScore = (): number => {
    const moduleTypes: LearningModuleType[] = ['audio', 'comprehension', 'dictation', 'speaking', 'rewrite'];
    const scores = moduleTypes
      .map(type => allModuleStates[type]?.score || 0)
      .filter(score => score > 0);
    
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  };

  const calculateTotalTime = (): number => {
    const moduleTypes: LearningModuleType[] = ['audio', 'comprehension', 'dictation', 'speaking', 'rewrite'];
    return moduleTypes.reduce((total, type) => total + (allModuleStates[type]?.timeSpent || 0), 0);
  };

  const getCompletedModulesCount = (): number => {
    const moduleTypes: LearningModuleType[] = ['audio', 'comprehension', 'dictation', 'speaking', 'rewrite'];
    return moduleTypes.filter(type => allModuleStates[type]?.isCompleted).length;
  };

  const getPerformanceLevel = (score: number): { text: string; color: string } => {
    if (score >= 90) return { text: '优秀', color: 'text-success-600' };
    if (score >= 80) return { text: '良好', color: 'text-primary-600' };
    if (score >= 70) return { text: '一般', color: 'text-warning-600' };
    return { text: '需要加强', color: 'text-error-600' };
  };

  const totalScore = calculateTotalScore();
  const totalTime = calculateTotalTime();
  const completedModules = getCompletedModulesCount();
  const performance = getPerformanceLevel(totalScore);

  return (
    <Card className="bg-white border-2 border-primary-200 shadow-soft">
      <div className="space-y-6">
        {/* 模块标题 */}
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Save className="text-green-600" size={24} />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-neutral-900">📊 学习总结</h3>
            <p className="text-sm text-neutral-600">保存进度，查看学习成果</p>
          </div>
        </div>

        {/* 学习进度概览 */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
          <div className="text-center space-y-4">
            <h4 className="text-lg font-semibold text-neutral-900">本句学习进度</h4>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white rounded-lg p-3">
                <div className="flex items-center justify-center space-x-1 text-primary-600">
                  <Target size={16} />
                  <span>完成模块</span>
                </div>
                <div className="text-xl font-bold text-neutral-900 mt-1">
                  {completedModules}/5
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-3">
                <div className="flex items-center justify-center space-x-1 text-blue-600">
                  <Clock size={16} />
                  <span>学习时间</span>
                </div>
                <div className="text-xl font-bold text-neutral-900 mt-1">
                  {Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, '0')}
                </div>
              </div>
            </div>

            <ProgressBar
              value={currentSentenceIndex + 1}
              max={totalSentences}
              label="课程进度"
              showPercentage
              color="primary"
            />
          </div>
        </div>

        {/* 学习统计 */}
        {showStats && totalScore > 0 && (
          <div className="animate-fade-in-up">
            <Card className="bg-blue-50 border-blue-200">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="text-blue-600" size={20} />
                  <h4 className="font-semibold text-blue-900">学习成果</h4>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                    <span className="text-neutral-700">综合得分</span>
                    <div className="flex items-center space-x-2">
                      <span className={`font-bold text-lg ${performance.color}`}>
                        {totalScore}分
                      </span>
                      <span className={`text-sm ${performance.color}`}>
                        ({performance.text})
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                    <span className="text-neutral-700">模块完成率</span>
                    <span className="font-bold text-primary-600">
                      {Math.round((completedModules / 5) * 100)}%
                    </span>
                  </div>
                </div>

                {totalScore >= 80 && (
                  <div className="bg-success-100 border border-success-300 rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-success-700">
                      <Star size={16} />
                      <span className="font-medium">恭喜！您的表现很出色！</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* 操作按钮 */}
        <div className="space-y-4">
          {/* 收藏按钮 */}
          <Button
            onClick={handleAddToFavorites}
            variant={isFavorited ? "secondary" : "outline"}
            size="lg"
            className="w-full"
          >
            <Heart 
              size={20} 
              className={`mr-2 ${isFavorited ? 'fill-current text-red-500' : ''}`} 
            />
            {isFavorited ? '已加入收藏' : '加入收藏'}
          </Button>

          {/* 保存进度按钮 */}
          {!moduleState.isCompleted && (
            <Button
              onClick={handleSaveProgress}
              variant="primary"
              size="lg"
              className="w-full"
            >
              <Save size={20} className="mr-2" />
              保存学习进度
            </Button>
          )}

          {/* 下一个句子按钮 */}
          <Button
            onClick={handleNextSentence}
            variant="primary"
            size="lg"
            className="w-full"
            disabled={completedModules < 2} // 至少完成2个模块才能继续
          >
            {isLastSentence ? (
              <>
                <Target size={20} className="mr-2" />
                完成本课
              </>
            ) : (
              <>
                <ArrowRight size={20} className="mr-2" />
                下一个句子
              </>
            )}
          </Button>
        </div>

        {/* 已完成状态 */}
        {moduleState.isCompleted && (
          <div className="bg-success-50 border border-success-200 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 text-success-700">
              <div className="w-5 h-5 bg-success-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="font-medium">学习进度已保存</span>
            </div>
            <p className="text-sm text-success-600 mt-2 text-center">
              您的学习记录已安全保存到本地存储
            </p>
          </div>
        )}

        {/* 继续提示 */}
        {completedModules < 2 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800 text-center">
              💡 建议至少完成2个学习模块后再进入下一个句子
            </p>
          </div>
        )}

        {/* 收藏提示 */}
        {!isFavorited && completedModules >= 3 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800 text-center">
              ⭐ 这个句子学得不错，要不要收藏起来方便复习？
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProgressModule;
