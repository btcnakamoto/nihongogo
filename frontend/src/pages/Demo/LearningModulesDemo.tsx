/**
 * 功能描述：学习模块演示页面
 * 输入参数：无
 * 返回值：React 演示页面组件
 * 用途说明：展示6个学习模块的功能和交互效果
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React, { useState } from 'react';
import { Card, Button } from '@/components/ui';
import { 
  AudioModule, 
  ComprehensionModule, 
  DictationModule, 
  SpeakingModule, 
  RewriteModule, 
  ProgressModule 
} from '@/components/LearningModules';
import { 
  SentenceLearningData, 
  LearningModuleState, 
  LearningModuleType 
} from '@/types';
import { Play, Brain, PenTool, Mic, Puzzle, BarChart3 } from 'lucide-react';

const LearningModulesDemo: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<LearningModuleType>('audio');

  // 演示数据
  const demoSentence: SentenceLearningData = {
    id: 'demo_sentence',
    japanese: 'おはようございます。今日もよろしくお願いします。',
    furigana: 'おはようございます。きょうもよろしくおねがいします。',
    chinese: '早上好。今天也请多多关照。',
    grammar: '「よろしくお願いします」是日语中非常重要的客套话，表示请求对方关照。在工作场合、初次见面或请求帮助时经常使用。',
    audio: '/audio/demo.mp3',
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
  };

  const [moduleStates, setModuleStates] = useState(demoSentence.moduleStates);

  const updateModuleState = (moduleType: LearningModuleType, state: Partial<LearningModuleState>) => {
    setModuleStates(prev => ({
      ...prev,
      [moduleType]: {
        ...prev[moduleType],
        ...state,
      }
    }));
  };

  const handleModuleComplete = () => {
    console.log('模块完成');
  };

  const handleNextSentence = () => {
    console.log('下一个句子');
  };

  const modules = [
    { type: 'audio' as LearningModuleType, name: '听音频', icon: Play, color: 'bg-primary-100 text-primary-600' },
    { type: 'comprehension' as LearningModuleType, name: '意思推测', icon: Brain, color: 'bg-blue-100 text-blue-600' },
    { type: 'dictation' as LearningModuleType, name: '听写输入', icon: PenTool, color: 'bg-purple-100 text-purple-600' },
    { type: 'speaking' as LearningModuleType, name: '跟读练习', icon: Mic, color: 'bg-orange-100 text-orange-600' },
    { type: 'rewrite' as LearningModuleType, name: '改写挑战', icon: Puzzle, color: 'bg-indigo-100 text-indigo-600' },
    { type: 'progress' as LearningModuleType, name: '学习总结', icon: BarChart3, color: 'bg-green-100 text-green-600' },
  ];

  const renderCurrentModule = () => {
    const currentSentenceData = {
      ...demoSentence,
      moduleStates,
    };

    const props = {
      sentenceData: currentSentenceData,
      moduleState: moduleStates[currentModule],
      onStateUpdate: (state: Partial<LearningModuleState>) => 
        updateModuleState(currentModule, state),
      onComplete: handleModuleComplete,
    };

    switch (currentModule) {
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
            allModuleStates={moduleStates}
            onNextSentence={handleNextSentence}
            isLastSentence={false}
            totalSentences={3}
            currentSentenceIndex={0}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container-responsive max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            🎓 学习模块演示
          </h1>
          <p className="text-lg text-neutral-600 mb-6">
            体验 Nihongogo 的6个交互式学习模块
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-amber-800">
              💡 这是一个功能演示页面，展示了完整的句子学习体验。每个模块都有独特的交互方式和学习目标。
            </p>
          </div>
        </div>

        {/* Module Navigation */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">选择学习模块</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {modules.map((module) => {
              const Icon = module.icon;
              const isActive = currentModule === module.type;
              const isCompleted = moduleStates[module.type].isCompleted;
              
              return (
                <button
                  key={module.type}
                  onClick={() => setCurrentModule(module.type)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isActive
                      ? 'border-primary-500 bg-primary-50'
                      : isCompleted
                      ? 'border-success-300 bg-success-50'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${module.color}`}>
                    <Icon size={24} />
                  </div>
                  <div className="text-sm font-medium text-neutral-900">
                    {module.name}
                  </div>
                  {isCompleted && (
                    <div className="text-xs text-success-600 mt-1">
                      ✓ 已完成
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Current Module */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Module Area */}
          <div className="lg:col-span-3">
            {renderCurrentModule()}
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            {/* Current Module Info */}
            <Card>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">当前模块</h3>
              <div className="space-y-3">
                <div className="text-sm text-neutral-600">模块名称</div>
                <div className="font-medium text-neutral-900">
                  {modules.find(m => m.type === currentModule)?.name}
                </div>
                <div className="text-sm text-neutral-600">完成状态</div>
                <div className={`text-sm font-medium ${
                  moduleStates[currentModule].isCompleted 
                    ? 'text-success-600' 
                    : 'text-neutral-600'
                }`}>
                  {moduleStates[currentModule].isCompleted ? '已完成' : '进行中'}
                </div>
                {moduleStates[currentModule].score && (
                  <>
                    <div className="text-sm text-neutral-600">得分</div>
                    <div className="text-lg font-bold text-primary-600">
                      {moduleStates[currentModule].score}分
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* Module Progress */}
            <Card>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">整体进度</h3>
              <div className="space-y-2">
                {modules.map((module) => (
                  <div key={module.type} className="flex items-center justify-between text-sm">
                    <span className="text-neutral-700">{module.name}</span>
                    <div className="flex items-center space-x-2">
                      {moduleStates[module.type].isCompleted ? (
                        <span className="text-success-600">✓</span>
                      ) : (
                        <span className="text-neutral-400">○</span>
                      )}
                      {moduleStates[module.type].score && (
                        <span className="text-neutral-600">
                          {moduleStates[module.type].score}分
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Demo Info */}
            <Card className="bg-blue-50 border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">演示说明</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <p>• 这是一个完整的学习模块演示</p>
                <p>• 每个模块都有独特的交互方式</p>
                <p>• 支持语音识别和合成功能</p>
                <p>• 所有数据都保存在本地</p>
                <p>• 完全响应式设计</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningModulesDemo;
