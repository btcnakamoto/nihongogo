/**
 * 功能描述：智能学习系统演示页面
 * 输入参数：无
 * 返回值：React 智能学习演示组件
 * 用途说明：展示智能学习系统的所有功能和交互效果
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Sparkles, Play, Settings, RefreshCw } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { IntelligentLearningInterface } from '@/components/IntelligentLearning';
import { IntelligentLearningState } from '@/types';

const IntelligentLearningDemo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(0);

  // 演示场景
  const scenarios = [
    {
      name: '居酒屋点餐场景',
      description: '在日式居酒屋学习点餐对话',
      cognitiveMode: 'focus' as const,
      loadIndex: 5,
      energyLevel: 82,
    },
    {
      name: '便利店购物场景',
      description: '在便利店进行日常购物交流',
      cognitiveMode: 'relaxed' as const,
      loadIndex: 3,
      energyLevel: 75,
    },
    {
      name: '车站问路场景',
      description: '在车站询问路线和时间',
      cognitiveMode: 'intensive' as const,
      loadIndex: 7,
      energyLevel: 90,
    },
  ];

  const currentScenarioData = scenarios[currentScenario];

  // 生成演示状态
  const generateDemoState = (): IntelligentLearningState => ({
    cognitiveState: {
      mode: currentScenarioData.cognitiveMode,
      loadIndex: currentScenarioData.loadIndex,
      suggestedDuration: 15,
      personalTrack: '假名→汉字混合→敬语进阶',
      energyLevel: currentScenarioData.energyLevel,
    },
    multiModalActivation: {
      chineseJapaneseBridge: {
        chineseWord: '点餐',
        japaneseWord: '注文',
        kanjiAdvantage: true,
        comprehensionRate: 95,
      },
      strategySelection: 'analytical',
      culturalContext: {
        theme: '居酒屋文化',
        etiquette: ['用餐礼仪', '点餐流程'],
        keigo: '敬语系统入门',
      },
    },
    sceneImmersion: {
      videoUrl: '/videos/demo-scene.mp4',
      characterRole: '客人',
      culturalTips: ['进店要说「失礼します」', '点餐时使用敬语'],
      comprehensionLevel: 6,
      difficulty: 'intermediate',
    },
    multiModalInput: {
      dictation: {
        text: 'ラーメン を ____',
        grammarVisualization: ['[名词]', '[を]', '[动词]'],
        chineseComparison: '拉面(を)吃',
      },
      voiceInput: {
        isRecording: false,
        duration: 0,
        toneDetection: '2-1-3-1音调',
        pronunciationScore: 'B+',
        toneCurve: [2, 1, 3, 1],
      },
      gestureInput: {
        currentGesture: '鞠躬练习',
        gestureLibrary: ['鞠躬练习', '指向菜单', '招手示意', '双手接物'],
        bodyLanguageScore: 75,
      },
    },
    instantFeedback: {
      languageAnalysis: {
        grammar: { correct: true, message: '助词使用正确' },
        pronunciation: { score: 'B+', issues: ['音调需调整(2声调)'] },
        chineseInfluence: '语序迁移成功',
        cognitiveLoad: 'medium',
        keigoUsage: '丁宁语使用恰当',
      },
      learningDiagnosis: {
        strengths: ['汉字理解', '语法结构'],
        weaknesses: ['音调掌握', '发音清晰度'],
        suggestions: ['多练音调变化', '注意清浊音区分'],
        efficiency: 88,
        nextChallenge: '谦让语',
      },
      progressTracking: {
        weeklyTrend: [65, 72, 78, 81, 85, 88, 92],
        breakthroughs: ['音调突破！', '敬语掌握'],
      },
    },
    socialPractice: {
      rolePlay: {
        currentRole: '客人',
        availableRoles: ['客人', '店员', '其他客人观察'],
        sceneOptions: ['拉面店', '寿司店', '便利店'],
      },
      collaboration: {
        onlinePeers: 3,
        peerMessages: [
          { name: '小田', message: '试试这个音调' },
          { name: '山田', message: '敬语用法很棒！' },
        ],
        teamChallenges: ['敬语接龙', '情景对话'],
      },
      culturalExploration: {
        dailyCulturalPoint: '拉面文化历史',
        topics: ['用餐礼仪详解', '关西vs关东方言'],
      },
    },
    japaneseFeatures: {
      kanjiAssociation: {
        kanji: '注文',
        chineseRoot: '注(专注)',
        japaneseExtensions: ['注意', '注目', '注射'],
        associations: ['注册', '文字', '专注'],
      },
      keigoTraining: {
        level: 'teineigo',
        scenarios: ['客人→店员', '自己→他人'],
        exercises: ['敬语等级选择', '使用场景训练'],
      },
      tonePractice: {
        word: 'ラーメン',
        tonePattern: '2-1-3-1',
        visualization: '○－＼○',
        audioUrl: '/audio/ramen-tone.mp3',
      },
    },
    creativeApplication: {
      situationInnovation: {
        dynamicScenario: '在忙碌的新宿车站便当店...',
        impromptuElements: ['突然售罄热门品', '排队人很多'],
      },
      personalizedChallenge: {
        aiCustomChallenge: '用3种敬语等级表达同一需求',
        creativeMode: '关西腔挑战',
        unlockConditions: '敬语准确率>85%',
      },
    },
    intelligentPlanning: {
      dailySummary: {
        score: 85,
        breakthroughs: ['音调掌握'],
        practiceTime: 30,
        badges: ['音调大师'],
      },
      tomorrowPrediction: {
        optimalTime: '明天晚上7:00-7:30',
        recommendedContent: '敬语系统',
        expectedEffect: '敬语提升',
      },
      longTermGoals: {
        monthlyGoal: '居酒屋流利对话',
        progress: 38,
        consecutiveDays: 12,
      },
    },
  });

  const [demoState, setDemoState] = useState<IntelligentLearningState>(generateDemoState());

  const handleScenarioChange = (index: number) => {
    setCurrentScenario(index);
    setDemoState(generateDemoState());
  };

  const handleStateChange = (newState: IntelligentLearningState) => {
    setDemoState(newState);
  };

  const handlePlayDemo = () => {
    setIsPlaying(!isPlaying);
  };

  const handleResetDemo = () => {
    setDemoState(generateDemoState());
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              to="/"
              className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              返回首页
            </Link>
            <div className="w-px h-6 bg-neutral-300"></div>
            <div className="flex items-center space-x-2">
              <Brain className="text-purple-600" size={24} />
              <h1 className="text-2xl font-bold text-neutral-900">智能学习系统演示</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-neutral-600">
              <Sparkles className="text-yellow-500" size={16} />
              <span>AI驱动的个性化学习</span>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Controls */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white border-purple-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-purple-900">演示控制台</h2>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={handlePlayDemo}
                  variant={isPlaying ? "secondary" : "primary"}
                  size="sm"
                >
                  <Play size={16} className="mr-1" />
                  {isPlaying ? '暂停演示' : '开始演示'}
                </Button>
                <Button
                  onClick={handleResetDemo}
                  variant="outline"
                  size="sm"
                >
                  <RefreshCw size={16} className="mr-1" />
                  重置
                </Button>
              </div>
            </div>

            {/* Scenario Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {scenarios.map((scenario, index) => (
                <button
                  key={index}
                  onClick={() => handleScenarioChange(index)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    currentScenario === index
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-neutral-200 bg-white hover:border-purple-300'
                  }`}
                >
                  <h3 className={`font-semibold mb-2 ${
                    currentScenario === index ? 'text-purple-800' : 'text-neutral-800'
                  }`}>
                    {scenario.name}
                  </h3>
                  <p className={`text-sm ${
                    currentScenario === index ? 'text-purple-600' : 'text-neutral-600'
                  }`}>
                    {scenario.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs">
                    <span className={`${
                      currentScenario === index ? 'text-purple-600' : 'text-neutral-500'
                    }`}>
                      认知模式: {scenario.cognitiveMode === 'focus' ? '专注' : 
                                scenario.cognitiveMode === 'relaxed' ? '轻松' : '强化'}
                    </span>
                    <span className={`${
                      currentScenario === index ? 'text-purple-600' : 'text-neutral-500'
                    }`}>
                      负荷: {scenario.loadIndex}/10
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Demo Description */}
      <div className="bg-blue-50 border-b border-blue-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white border-blue-200 p-4">
            <h3 className="font-semibold text-blue-900 mb-3">🎯 智能学习系统特色功能</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-blue-800">
              <div>
                <h4 className="font-medium mb-2">🧠 认知状态监控</h4>
                <p>实时监控学习状态，自动调整难度和节奏，确保最佳学习效果</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">🎭 沉浸式场景</h4>
                <p>真实日语环境模拟，视频场景配合文化提示，提升实际应用能力</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">🎤 多模态交互</h4>
                <p>听写、语音、手势三位一体，全方位感官参与，加深学习印象</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">📊 智能反馈</h4>
                <p>AI分析语言表现，提供个性化改进建议和学习路径规划</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Intelligent Learning Interface */}
      <IntelligentLearningInterface
        initialState={demoState}
        onStateChange={handleStateChange}
      />

      {/* Demo Footer */}
      <div className="bg-white border-t border-neutral-200 px-6 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-xl font-bold text-neutral-900 mb-4">
            体验完整的智能学习系统
          </h3>
          <p className="text-neutral-600 mb-6">
            这只是智能学习系统的一个演示。完整版本包含更多个性化功能和学习内容。
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/intelligent-learning/camp_1">
              <Button size="lg" className="px-8">
                <Brain size={20} className="mr-2" />
                开始完整体验
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="outline" size="lg" className="px-8">
                查看训练营
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelligentLearningDemo;
