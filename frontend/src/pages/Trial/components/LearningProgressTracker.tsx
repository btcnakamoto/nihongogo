/**
 * 功能描述：学习进度跟踪组件
 * 输入参数：学习数据和进度状态
 * 返回值：React 进度跟踪组件
 * 用途说明：显示学习进度、统计数据和成就，支持localStorage数据保存
 * 作者：nakamotochen
 * 创建时间：2025-06-15
 */

import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Target, 
  Award, 
  TrendingUp, 
  Save, 
  Star,
  CheckCircle,
  BarChart3,
  Calendar,
  Zap
} from 'lucide-react';
import { Card, Button, ProgressBar } from '@/components/ui';
import { LearningModuleState, SentenceLearningData } from '@/types';

interface LearningProgressData {
  totalSentences: number;
  completedSentences: number;
  totalTimeSpent: number;
  averageScore: number;
  moduleProgress: {
    audio: LearningModuleState;
    comprehension: LearningModuleState;
    dictation: LearningModuleState;
    speaking: LearningModuleState;
    rewrite: LearningModuleState;
  };
  achievements: string[];
  streakDays: number;
  lastStudyDate: string;
}

interface LearningProgressTrackerProps {
  currentSentence: SentenceLearningData;
  moduleStates: {
    audio: LearningModuleState;
    comprehension: LearningModuleState;
    dictation: LearningModuleState;
    speaking: LearningModuleState;
    rewrite: LearningModuleState;
  };
  onSaveProgress: () => void;
}

const LearningProgressTracker: React.FC<LearningProgressTrackerProps> = ({
  currentSentence,
  moduleStates,
  onSaveProgress,
}) => {
  const [progressData, setProgressData] = useState<LearningProgressData | null>(null);
  const [showDetailedStats, setShowDetailedStats] = useState(false);

  // 从localStorage加载进度数据
  useEffect(() => {
    const loadProgressData = () => {
      try {
        const savedData = localStorage.getItem('nihongogo_trial_progress');
        if (savedData) {
          const data = JSON.parse(savedData);
          setProgressData(data);
        } else {
          // 初始化进度数据
          const initialData: LearningProgressData = {
            totalSentences: 0,
            completedSentences: 0,
            totalTimeSpent: 0,
            averageScore: 0,
            moduleProgress: moduleStates,
            achievements: [],
            streakDays: 1,
            lastStudyDate: new Date().toISOString().split('T')[0],
          };
          setProgressData(initialData);
        }
      } catch (error) {
        console.error('加载进度数据失败:', error);
      }
    };

    loadProgressData();
  }, []);

  // 保存进度数据到localStorage
  const saveProgressData = (data: LearningProgressData) => {
    try {
      localStorage.setItem('nihongogo_trial_progress', JSON.stringify(data));
      setProgressData(data);
    } catch (error) {
      console.error('保存进度数据失败:', error);
    }
  };

  // 更新进度数据
  useEffect(() => {
    if (!progressData) return;

    const completedModules = Object.values(moduleStates).filter(state => state.isCompleted).length;
    const totalTimeSpent = Object.values(moduleStates).reduce((sum, state) => sum + (state.timeSpent || 0), 0);
    const totalScore = Object.values(moduleStates).reduce((sum, state) => sum + (state.score || 0), 0);
    const averageScore = completedModules > 0 ? Math.round(totalScore / completedModules) : 0;

    // 检查新成就
    const newAchievements = [...progressData.achievements];
    
    if (completedModules >= 3 && !newAchievements.includes('first_sentence')) {
      newAchievements.push('first_sentence');
    }
    
    if (averageScore >= 90 && !newAchievements.includes('high_scorer')) {
      newAchievements.push('high_scorer');
    }
    
    if (totalTimeSpent >= 300 && !newAchievements.includes('dedicated_learner')) {
      newAchievements.push('dedicated_learner');
    }

    // 检查连续学习天数
    const today = new Date().toISOString().split('T')[0];
    const lastStudy = progressData.lastStudyDate;
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    let streakDays = progressData.streakDays;
    if (today !== lastStudy) {
      if (lastStudy === yesterday) {
        streakDays += 1;
      } else {
        streakDays = 1;
      }
    }

    const updatedData: LearningProgressData = {
      ...progressData,
      totalSentences: progressData.totalSentences + (completedModules === 5 ? 1 : 0),
      completedSentences: progressData.completedSentences + (completedModules === 5 ? 1 : 0),
      totalTimeSpent: progressData.totalTimeSpent + totalTimeSpent,
      averageScore,
      moduleProgress: moduleStates,
      achievements: newAchievements,
      streakDays,
      lastStudyDate: today,
    };

    if (JSON.stringify(updatedData) !== JSON.stringify(progressData)) {
      saveProgressData(updatedData);
    }
  }, [moduleStates, progressData]);

  if (!progressData) {
    return (
      <Card className="animate-pulse">
        <div className="h-32 bg-neutral-200 rounded"></div>
      </Card>
    );
  }

  const completedModules = Object.values(moduleStates).filter(state => state.isCompleted).length;
  const progressPercentage = (completedModules / 5) * 100;

  const achievementLabels: Record<string, string> = {
    first_sentence: '🎯 首句完成',
    high_scorer: '⭐ 高分达人',
    dedicated_learner: '📚 专注学习者',
  };

  return (
    <div className="space-y-4">
      {/* 主要进度卡片 */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="space-y-4">
          {/* 标题 */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-neutral-900">学习进度</h3>
            <Button
              onClick={onSaveProgress}
              variant="outline"
              size="sm"
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              <Save size={16} className="mr-1" />
              保存
            </Button>
          </div>

          {/* 当前句子进度 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600">当前句子完成度</span>
              <span className="font-medium text-green-700">{completedModules}/5 模块</span>
            </div>
            <ProgressBar
              value={completedModules}
              max={5}
              className="h-3"
              color="green"
            />
          </div>

          {/* 统计数据网格 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/60 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock size={16} className="text-green-600 mr-1" />
              </div>
              <div className="text-lg font-bold text-neutral-900">
                {Math.round(progressData.totalTimeSpent / 60)}
              </div>
              <div className="text-xs text-neutral-600">学习分钟</div>
            </div>

            <div className="bg-white/60 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center mb-1">
                <Target size={16} className="text-green-600 mr-1" />
              </div>
              <div className="text-lg font-bold text-neutral-900">
                {progressData.completedSentences}
              </div>
              <div className="text-xs text-neutral-600">完成句子</div>
            </div>

            <div className="bg-white/60 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center mb-1">
                <Star size={16} className="text-green-600 mr-1" />
              </div>
              <div className="text-lg font-bold text-neutral-900">
                {progressData.averageScore}
              </div>
              <div className="text-xs text-neutral-600">平均分数</div>
            </div>

            <div className="bg-white/60 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center mb-1">
                <Zap size={16} className="text-green-600 mr-1" />
              </div>
              <div className="text-lg font-bold text-neutral-900">
                {progressData.streakDays}
              </div>
              <div className="text-xs text-neutral-600">连续天数</div>
            </div>
          </div>
        </div>
      </Card>

      {/* 模块完成状态 */}
      <Card>
        <h4 className="text-md font-semibold text-neutral-900 mb-3">模块完成状态</h4>
        <div className="space-y-2">
          {[
            { key: 'audio', label: '🎧 听音频', icon: Clock },
            { key: 'comprehension', label: '🤔 意思猜测', icon: Target },
            { key: 'dictation', label: '✍️ 听写输入', icon: Award },
            { key: 'speaking', label: '🗣️ 发音练习', icon: TrendingUp },
            { key: 'rewrite', label: '✨ 重写挑战', icon: Star },
          ].map(({ key, label, icon: Icon }) => {
            const state = moduleStates[key as keyof typeof moduleStates];
            return (
              <div key={key} className="flex items-center justify-between p-2 rounded-lg bg-neutral-50">
                <div className="flex items-center space-x-2">
                  <Icon size={16} className={state.isCompleted ? 'text-green-600' : 'text-neutral-400'} />
                  <span className={`text-sm ${state.isCompleted ? 'text-neutral-900' : 'text-neutral-500'}`}>
                    {label}
                  </span>
                </div>
                {state.isCompleted ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-green-600">{state.score}分</span>
                    <CheckCircle size={16} className="text-green-600" />
                  </div>
                ) : (
                  <div className="w-4 h-4 border-2 border-neutral-300 rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* 成就展示 */}
      {progressData.achievements.length > 0 && (
        <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Award className="text-amber-600" size={20} />
              <h4 className="text-md font-semibold text-amber-900">获得成就</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {progressData.achievements.map((achievement) => (
                <div
                  key={achievement}
                  className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {achievementLabels[achievement] || achievement}
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* 详细统计按钮 */}
      <div className="text-center">
        <Button
          onClick={() => setShowDetailedStats(!showDetailedStats)}
          variant="outline"
          size="sm"
          className="border-neutral-300 text-neutral-600 hover:bg-neutral-50"
        >
          <BarChart3 size={16} className="mr-2" />
          {showDetailedStats ? '隐藏' : '显示'}详细统计
        </Button>
      </div>

      {/* 详细统计 */}
      {showDetailedStats && (
        <Card className="bg-neutral-50">
          <h4 className="text-md font-semibold text-neutral-900 mb-3">详细统计</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">总学习时间</span>
              <span className="font-medium">{Math.round(progressData.totalTimeSpent / 60)} 分钟</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">平均每句用时</span>
              <span className="font-medium">
                {progressData.completedSentences > 0 
                  ? Math.round(progressData.totalTimeSpent / progressData.completedSentences) 
                  : 0} 秒
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">最后学习日期</span>
              <span className="font-medium">{progressData.lastStudyDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">连续学习天数</span>
              <span className="font-medium">{progressData.streakDays} 天</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default LearningProgressTracker;
