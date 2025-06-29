/**
 * 功能描述：智能学习页面
 * 输入参数：通过路由参数获取课程ID
 * 返回值：React 智能学习页面组件
 * 用途说明：提供完整的智能化学习体验，包含认知状态监控、多模态交互等
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Sparkles, Settings, HelpCircle } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { IntelligentLearningInterface } from '@/components/IntelligentLearning';
import { mockTrainingCamps } from '@/data/mockData';
import { IntelligentLearningState } from '@/types';

const IntelligentLearningPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  // 状态管理
  const [learningState, setLearningState] = useState<IntelligentLearningState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  // 查找训练营
  const camp = mockTrainingCamps.find(c => c.id === courseId);

  useEffect(() => {
    // 模拟加载智能学习数据
    const loadIntelligentLearningData = async () => {
      setIsLoading(true);
      
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 初始化智能学习状态
      const initialState: IntelligentLearningState = {
        cognitiveState: {
          mode: 'focus',
          loadIndex: 5,
          suggestedDuration: 15,
          personalTrack: '假名→汉字混合→敬语进阶',
          energyLevel: 82,
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
          videoUrl: '/videos/ramen-shop.mp4',
          characterRole: '客人',
          culturalTips: ['进店要说「失礼します」', '点餐时使用敬语'],
          comprehensionLevel: 6,
          difficulty: 'intermediate',
        },
        multiModalInput: {
          dictation: {
            text: '',
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
            strengths: ['汉字理解'],
            weaknesses: ['音调掌握'],
            suggestions: ['多练音调变化'],
            efficiency: 88,
            nextChallenge: '谦让语',
          },
          progressTracking: {
            weeklyTrend: [65, 72, 78, 81, 85, 88, 92],
            breakthroughs: ['音调突破！'],
          },
        },
        socialPractice: {
          rolePlay: {
            currentRole: '客人',
            availableRoles: ['客人', '店员'],
            sceneOptions: ['拉面店', '寿司店'],
          },
          collaboration: {
            onlinePeers: 3,
            peerMessages: [{ name: '小田', message: '试试这个音调' }],
            teamChallenges: ['敬语接龙'],
          },
          culturalExploration: {
            dailyCulturalPoint: '拉面文化历史',
            topics: ['用餐礼仪详解'],
          },
        },
        japaneseFeatures: {
          kanjiAssociation: {
            kanji: '注文',
            chineseRoot: '注(专注)',
            japaneseExtensions: ['注意', '注目'],
            associations: ['注册', '文字'],
          },
          keigoTraining: {
            level: 'teineigo',
            scenarios: ['客人→店员'],
            exercises: ['敬语等级选择'],
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
            impromptuElements: ['突然售罄热门品'],
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
      };

      setLearningState(initialState);
      setIsLoading(false);
    };

    if (courseId) {
      loadIntelligentLearningData();
    }
  }, [courseId]);

  const handleStateChange = (newState: IntelligentLearningState) => {
    setLearningState(newState);
    // 这里可以添加状态持久化逻辑
    localStorage.setItem(`intelligent_learning_${courseId}`, JSON.stringify(newState));
  };

  if (!camp) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="text-center py-12 px-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">课程未找到</h2>
          <p className="text-neutral-600 mb-6">请检查课程ID是否正确</p>
          <Link to="/courses">
            <Button variant="primary">返回课程列表</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card className="text-center py-12 px-8">
          <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            🧠 智能学习系统启动中...
          </h2>
          <div className="space-y-2 text-neutral-600">
            <p>• 分析您的学习偏好</p>
            <p>• 调整认知负荷参数</p>
            <p>• 准备个性化内容</p>
            <p>• 激活多模态交互</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* 顶部导航栏 */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              to={`/courses/${courseId}`}
              className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              返回课程
            </Link>
            <div className="w-px h-6 bg-neutral-300"></div>
            <div className="flex items-center space-x-2">
              <Brain className="text-primary-600" size={20} />
              <h1 className="text-xl font-bold text-neutral-900">智能学习系统</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-neutral-600">
              <Sparkles className="text-yellow-500" size={16} />
              <span>{camp.title}</span>
            </div>
            
            <Button
              onClick={() => setShowHelp(!showHelp)}
              variant="outline"
              size="sm"
            >
              <HelpCircle size={16} className="mr-1" />
              帮助
            </Button>

            <Button variant="outline" size="sm">
              <Settings size={16} className="mr-1" />
              设置
            </Button>
          </div>
        </div>
      </div>

      {/* 帮助提示 */}
      {showHelp && (
        <div className="bg-blue-50 border-b border-blue-200 px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <Card className="bg-white border-blue-200 p-4">
              <h3 className="font-semibold text-blue-900 mb-3">🎯 智能学习系统使用指南</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-blue-800">
                <div>
                  <h4 className="font-medium mb-2">🧠 认知状态监控</h4>
                  <p>系统实时监控您的学习状态，自动调整难度和节奏</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🎭 沉浸式场景</h4>
                  <p>在真实日语环境中练习，提升实际应用能力</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🎤 多模态交互</h4>
                  <p>结合听写、语音、手势等多种方式，全方位提升</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">📊 即时反馈</h4>
                  <p>获得详细的语言分析和个性化改进建议</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🀄 汉字优势</h4>
                  <p>充分利用中文背景，加速日语学习进程</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🎯 智能规划</h4>
                  <p>AI制定个性化学习计划，优化学习效果</p>
                </div>
              </div>
              <Button
                onClick={() => setShowHelp(false)}
                variant="primary"
                size="sm"
                className="mt-4"
              >
                开始学习
              </Button>
            </Card>
          </div>
        </div>
      )}

      {/* 智能学习界面 */}
      {learningState && (
        <IntelligentLearningInterface
          initialState={learningState}
          onStateChange={handleStateChange}
        />
      )}
    </div>
  );
};

export default IntelligentLearningPage;
