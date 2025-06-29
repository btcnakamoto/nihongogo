/**
 * 功能描述：优化的试学页面组件
 * 输入参数：通过路由参数获取训练营ID
 * 返回值：React 优化试学页面组件
 * 用途说明：提供6个学习模块的完整学习体验，支持响应式设计和无障碍访问
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown, Clock, BookOpen, Target, CheckCircle } from 'lucide-react';
import { Card, Button, ProgressBar } from '@/components/ui';
import { 
  AudioModule, 
  ComprehensionModule, 
  DictationModule, 
  SpeakingModule, 
  RewriteModule, 
  ProgressModule 
} from '@/components/LearningModules';
import { mockTrainingCamps } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { 
  SentenceLearningData, 
  LearningModuleState, 
  LearningModuleType, 
  TrialAccess, 
  TrialProgress 
} from '@/types';
import {
  getTrialAccess,
  getTrialSessionForCamp,
  updateTrialProgress,
} from '@/utils/anonymousTrial';

const TrialLearningPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { state } = useAuth();

  // 状态管理
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentModuleType, setCurrentModuleType] = useState<LearningModuleType>('audio');
  const [sentenceLearningData, setSentenceLearningData] = useState<SentenceLearningData[]>([]);
  const [trialAccess, setTrialAccess] = useState<TrialAccess | null>(null);
  const [trialProgress, setTrialProgress] = useState<TrialProgress | null>(null);

  // 查找训练营
  const camp = mockTrainingCamps.find(c => c.id === courseId);

  // 学习模块顺序
  const moduleOrder: LearningModuleType[] = ['audio', 'comprehension', 'dictation', 'speaking', 'rewrite', 'progress'];

  // 初始化试学数据
  useEffect(() => {
    if (!courseId) return;

    const access = getTrialAccess(courseId);
    const session = getTrialSessionForCamp(courseId);
    
    setTrialAccess(access);
    if (session) {
      setTrialProgress(session.progress);
    }

    // 初始化句子学习数据
    initializeSentenceLearningData();
  }, [courseId]);

  const initializeSentenceLearningData = () => {
    // 试学句子数据
    const sentences = [
      {
        id: 'sentence_1',
        japanese: 'おはようございます。今日もよろしくお願いします。',
        furigana: 'おはようございます。きょうもよろしくおねがいします。',
        chinese: '早上好。今天也请多多关照。',
        grammar: '「よろしくお願いします」是日语中非常重要的客套话，表示请求对方关照。',
        audio: '/audio/lesson1_sentence1.mp3'
      },
      {
        id: 'sentence_2',
        japanese: 'はじめまして、田中と申します。どうぞよろしくお願いいたします。',
        furigana: 'はじめまして、たなかともうします。どうぞよろしくおねがいいたします。',
        chinese: '初次见面，我叫田中。请多多关照。',
        grammar: '「申します」是「言います」的谦让语，用于自我介绍时更加礼貌。',
        audio: '/audio/lesson1_sentence2.mp3'
      },
      {
        id: 'sentence_3',
        japanese: 'お元気ですか。おかげさまで、元気です。',
        furigana: 'おげんきですか。おかげさまで、げんきです。',
        chinese: '您身体好吗？托您的福，很好。',
        grammar: '「おかげさまで」是日语中表示感谢的谦逊表达方式。',
        audio: '/audio/lesson1_sentence3.mp3'
      }
    ];

    const learningData: SentenceLearningData[] = sentences.map(sentence => ({
      ...sentence,
      moduleStates: {
        audio: { moduleType: 'audio', isCompleted: false, attempts: 0, timeSpent: 0 },
        comprehension: { moduleType: 'comprehension', isCompleted: false, attempts: 0, timeSpent: 0 },
        dictation: { moduleType: 'dictation', isCompleted: false, attempts: 0, timeSpent: 0 },
        speaking: { moduleType: 'speaking', isCompleted: false, attempts: 0, timeSpent: 0 },
        rewrite: { moduleType: 'rewrite', isCompleted: false, attempts: 0, timeSpent: 0 },
        progress: { moduleType: 'progress', isCompleted: false, attempts: 0, timeSpent: 0 },
      },
      isCompleted: false,
      totalScore: 0,
    }));

    setSentenceLearningData(learningData);
  };

  // 更新模块状态
  const updateModuleState = (moduleType: LearningModuleType, state: Partial<LearningModuleState>) => {
    setSentenceLearningData(prev => {
      const updated = [...prev];
      updated[currentSentenceIndex].moduleStates[moduleType] = {
        ...updated[currentSentenceIndex].moduleStates[moduleType],
        ...state,
      };

      // 计算总分
      const moduleStates = updated[currentSentenceIndex].moduleStates;
      const scores = Object.values(moduleStates)
        .map(s => s.score || 0)
        .filter(score => score > 0);
      
      if (scores.length > 0) {
        updated[currentSentenceIndex].totalScore = Math.round(
          scores.reduce((sum, score) => sum + score, 0) / scores.length
        );
      }

      // 检查是否完成
      const completedModules = Object.values(moduleStates).filter(s => s.isCompleted).length;
      updated[currentSentenceIndex].isCompleted = completedModules >= 4; // 至少完成4个模块

      return updated;
    });
  };

  // 模块完成回调
  const handleModuleComplete = () => {
    const currentModuleIndex = moduleOrder.indexOf(currentModuleType);
    if (currentModuleIndex < moduleOrder.length - 1) {
      // 自动切换到下一个模块
      setCurrentModuleType(moduleOrder[currentModuleIndex + 1]);
    }
  };

  // 下一个句子
  const handleNextSentence = () => {
    if (currentSentenceIndex < sentenceLearningData.length - 1) {
      setCurrentSentenceIndex(prev => prev + 1);
      setCurrentModuleType('audio'); // 重置到第一个模块
    } else {
      // 完成所有句子，跳转到课程完成页面
      navigate(`/courses/${courseId}`);
    }
  };

  // 模块切换
  const handleModuleSwitch = (moduleType: LearningModuleType) => {
    setCurrentModuleType(moduleType);
  };

  if (!camp || !trialAccess || !sentenceLearningData.length) {
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="container-responsive">
          <Card className="text-center py-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">加载中...</h2>
            <p className="text-neutral-600 mb-6">正在准备您的学习内容</p>
          </Card>
        </div>
      </div>
    );
  }

  const currentSentence = sentenceLearningData[currentSentenceIndex];
  const currentModuleState = currentSentence.moduleStates[currentModuleType];

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container-responsive max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to={`/courses/${courseId}`}
            className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            返回训练营详情
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
              <Crown size={16} className="inline mr-1" />
              试学模式
            </div>
            <div className="text-sm text-neutral-600">
              剩余 {trialAccess.remainingDays} 天
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-neutral-900">
              第 {currentSentenceIndex + 1} 句 / 共 {sentenceLearningData.length} 句
            </h2>
            <div className="flex items-center text-sm text-neutral-600">
              <Clock size={16} className="mr-1" />
              {camp.title}
            </div>
          </div>
          
          <ProgressBar
            value={currentSentenceIndex + (currentSentence.isCompleted ? 1 : 0)}
            max={sentenceLearningData.length}
            label="学习进度"
            showPercentage
            color="primary"
            className="mb-4"
          />

          {/* Module Navigation */}
          <div className="flex flex-wrap gap-2">
            {moduleOrder.map((moduleType, index) => {
              const moduleState = currentSentence.moduleStates[moduleType];
              const isActive = currentModuleType === moduleType;
              const isCompleted = moduleState.isCompleted;
              
              return (
                <button
                  key={moduleType}
                  onClick={() => handleModuleSwitch(moduleType)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : isCompleted
                      ? 'bg-success-100 text-success-700 hover:bg-success-200'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {isCompleted && <CheckCircle size={14} className="inline mr-1" />}
                  {index + 1}. {getModuleName(moduleType)}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Main Learning Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Learning Module */}
          <div className="lg:col-span-3">
            {renderCurrentModule()}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Sentence Info */}
            <Card>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">当前句子</h3>
              <div className="space-y-3">
                <div className="text-sm text-neutral-600">日语原文</div>
                <div className="font-japanese text-base text-neutral-900">
                  {currentSentence.japanese}
                </div>
                <div className="text-sm text-neutral-600">中文翻译</div>
                <div className="text-base text-neutral-800">
                  {currentSentence.chinese}
                </div>
              </div>
            </Card>

            {/* Module Progress */}
            <Card>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">模块进度</h3>
              <div className="space-y-2">
                {moduleOrder.map((moduleType) => {
                  const moduleState = currentSentence.moduleStates[moduleType];
                  return (
                    <div
                      key={moduleType}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-neutral-700">
                        {getModuleName(moduleType)}
                      </span>
                      <div className="flex items-center space-x-2">
                        {moduleState.isCompleted ? (
                          <CheckCircle className="text-success-600" size={16} />
                        ) : (
                          <div className="w-4 h-4 border-2 border-neutral-300 rounded-full"></div>
                        )}
                        {moduleState.score && (
                          <span className="text-neutral-600">{moduleState.score}分</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Trial Status */}
            <Card>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">试学状态</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">剩余天数</span>
                  <span className="font-semibold text-primary-600">
                    {trialAccess.remainingDays} 天
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">当前得分</span>
                  <span className="font-semibold text-success-600">
                    {currentSentence.totalScore} 分
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  // 渲染当前模块
  function renderCurrentModule() {
    const props = {
      sentenceData: currentSentence,
      moduleState: currentModuleState,
      onStateUpdate: (state: Partial<LearningModuleState>) => 
        updateModuleState(currentModuleType, state),
      onComplete: handleModuleComplete,
    };

    switch (currentModuleType) {
      case 'audio':
        return <AudioModule {...props} />;
      case 'comprehension':
        return <ComprehensionModule {...props} />;
      case 'dictation':
        return <DictationModule {...props} />;
      case 'speaking':
        return <SpeakingModule {...props} />;
      case 'rewrite':
        return <RewriteModule {...props} />;
      case 'progress':
        return (
          <ProgressModule
            {...props}
            allModuleStates={currentSentence.moduleStates}
            onNextSentence={handleNextSentence}
            isLastSentence={currentSentenceIndex === sentenceLearningData.length - 1}
            totalSentences={sentenceLearningData.length}
            currentSentenceIndex={currentSentenceIndex}
          />
        );
      default:
        return null;
    }
  }

  // 获取模块名称
  function getModuleName(moduleType: LearningModuleType): string {
    const names = {
      audio: '听音频',
      comprehension: '意思推测',
      dictation: '听写输入',
      speaking: '跟读练习',
      rewrite: '改写挑战',
      progress: '学习总结',
    };
    return names[moduleType];
  }
};

export default TrialLearningPage;
