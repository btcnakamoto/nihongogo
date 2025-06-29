/**
 * 功能描述：90天快速突破训练营试学体验页面
 * 输入参数：无（通过路由访问）
 * 返回值：React 试学体验页面组件
 * 用途说明：提供完整的日语学习试学体验，包含6个核心学习模块
 * 作者：nakamotochen
 * 创建时间：2025-06-15
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Crown, 
  Clock, 
  Target, 
  Star,
  BookOpen,
  Zap,
  Save,
  UserPlus,
  LogIn,
  Brain
} from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { SentenceLearningData } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

// 导入组件
import TrialLearningInterface from './components/TrialLearningInterface';
import LearningProgressTracker from './components/LearningProgressTracker';

const CampBreakthroughLearning: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useAuth();
  
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [trialStartTime] = useState(Date.now());

  // 试学句子数据（3个精选句子）
  const trialSentences: SentenceLearningData[] = [
    {
      id: 'trial_sentence_1',
      japanese: 'おはようございます。今日もよろしくお願いします。',
      furigana: 'おはようございます。きょうもよろしくおねがいします。',
      chinese: '早上好。今天也请多多关照。',
      grammar: '「よろしくお願いします」是日语中非常重要的客套话，表示请求对方关照。在职场和日常生活中使用频率极高。',
      audio: '/audio/trial_sentence_1.mp3',
      difficulty: 1,
      tags: ['问候', '职场', '日常'],
      culturalNote: '这是日本人每天早上见面时的标准问候语，体现了日本文化中的礼貌和谦逊。'
    },
    {
      id: 'trial_sentence_2',
      japanese: 'すみません、駅はどこですか。まっすぐ行って、右に曲がってください。',
      furigana: 'すみません、えきはどこですか。まっすぐいって、みぎにまがってください。',
      chinese: '不好意思，车站在哪里？请直走，然后右转。',
      grammar: '「どこ」表示哪里，「まっすぐ」表示直走，「曲がる」表示转弯。这是问路和指路的基本表达方式。',
      audio: '/audio/trial_sentence_2.mp3',
      difficulty: 2,
      tags: ['问路', '方向', '旅游'],
      culturalNote: '在日本问路时，人们通常会很热心地帮助，甚至会亲自带路到目的地。'
    },
    {
      id: 'trial_sentence_3',
      japanese: 'ありがとうございます。とても助かりました。',
      furigana: 'ありがとうございます。とてもたすかりました。',
      chinese: '谢谢您。真是帮了大忙。',
      grammar: '「助かる」表示得到帮助，是表达感谢的常用表现。比单纯的「ありがとう」更能表达深度感谢。',
      audio: '/audio/trial_sentence_3.mp3',
      difficulty: 1,
      tags: ['感谢', '礼貌', '日常'],
      culturalNote: '日本人在表达感谢时会使用多种不同的表达方式，根据帮助的程度选择合适的感谢语。'
    }
  ];

  const currentSentence = trialSentences[currentSentenceIndex];

  // 处理欢迎页面完成
  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  // 处理句子学习完成
  const handleSentenceComplete = () => {
    if (currentSentenceIndex < trialSentences.length - 1) {
      setCurrentSentenceIndex(prev => prev + 1);
    } else {
      // 所有句子完成，显示试学完成页面
      handleTrialComplete();
    }
  };

  // 处理试学完成
  const handleTrialComplete = () => {
    const totalTime = Math.round((Date.now() - trialStartTime) / 1000 / 60);
    
    // 保存试学完成记录
    const completionData = {
      courseId: 'camp_breakthrough_90',
      completedAt: new Date().toISOString(),
      totalTime,
      sentencesCompleted: trialSentences.length,
      isAuthenticated: state.isAuthenticated,
    };
    
    localStorage.setItem('nihongogo_trial_completion', JSON.stringify(completionData));
    
    // 跳转到完成页面或升级页面
    navigate('/courses/camp_breakthrough_90', { 
      state: { 
        trialCompleted: true,
        completionData 
      }
    });
  };

  // 处理上一句
  const handlePrevious = () => {
    if (currentSentenceIndex > 0) {
      setCurrentSentenceIndex(prev => prev - 1);
    }
  };

  // 处理下一句
  const handleNext = () => {
    if (currentSentenceIndex < trialSentences.length - 1) {
      setCurrentSentenceIndex(prev => prev + 1);
    }
  };

  // 保存进度
  const handleSaveProgress = () => {
    if (state.isAuthenticated) {
      alert('学习进度已保存到您的账户！');
    } else {
      navigate('/register', {
        state: {
          from: { pathname: '/trial/camp_breakthrough_90/learning' },
          message: '注册账户以保存您的学习进度和成就'
        }
      });
    }
  };

  // 欢迎页面
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        {/* 头部导航 */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-green-200">
          <div className="container-responsive py-4">
            <div className="flex items-center justify-between">
              <Link 
                to="/courses/camp_breakthrough_90"
                className="flex items-center text-green-600 hover:text-green-700 transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                返回训练营详情
              </Link>
              
              <div className="flex items-center space-x-4">
                <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                  <Crown size={16} className="inline mr-1" />
                  试学体验
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 主要内容 */}
        <div className="container-responsive py-12">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/90 backdrop-blur-sm border-green-200 shadow-xl">
              <div className="text-center space-y-8">
                {/* 欢迎标题 */}
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-white font-bold text-3xl">N</span>
                  </div>
                  
                  <div>
                    <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                      🎉 欢迎体验 Nihongogo 学习系统
                    </h1>
                    <p className="text-lg text-neutral-600">
                      90天快速突破训练营 - 专业试学体验
                    </p>
                  </div>
                </div>

                {/* 体验介绍 */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-4">您将体验到：</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                        <Clock size={16} className="text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900">🎧 音频听力训练</h3>
                        <p className="text-sm text-neutral-600">专业日语发音，培养语感</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                        <Brain size={16} className="text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900">🤔 意思猜测练习</h3>
                        <p className="text-sm text-neutral-600">激发主动思考，提升理解</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                        <Target size={16} className="text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900">✍️ 听写输入训练</h3>
                        <p className="text-sm text-neutral-600">强化文字识别和拼写</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                        <Star size={16} className="text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900">🗣️ 发音练习</h3>
                        <p className="text-sm text-neutral-600">Web Speech API 智能评分</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                        <Zap size={16} className="text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900">✨ 重写挑战</h3>
                        <p className="text-sm text-neutral-600">创造性运用，深度掌握</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                        <BookOpen size={16} className="text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900">📊 进度跟踪</h3>
                        <p className="text-sm text-neutral-600">详细学习数据分析</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 试学说明 */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">📝 试学说明</h3>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p>• 免费体验 3 个精选句子的完整学习流程</p>
                    <p>• 每个句子包含 6 个学习模块，约 15-20 分钟</p>
                    <p>• 支持匿名体验，进度保存在本地</p>
                    <p>• 注册账户可永久保存学习记录和成就</p>
                  </div>
                </div>

                {/* 开始按钮 */}
                <div className="space-y-4">
                  <Button
                    onClick={handleWelcomeComplete}
                    variant="primary"
                    size="lg"
                    className="w-full max-w-md bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <Zap size={20} className="mr-2" />
                    开始试学体验
                  </Button>

                  {!state.isAuthenticated && (
                    <div className="flex justify-center space-x-3">
                      <Link to="/login">
                        <Button variant="outline" size="sm">
                          <LogIn size={16} className="mr-1" />
                          登录
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button variant="outline" size="sm">
                          <UserPlus size={16} className="mr-1" />
                          注册
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // 学习界面
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* 头部导航 */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-green-200">
        <div className="container-responsive py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/courses/camp_breakthrough_90"
              className="flex items-center text-green-600 hover:text-green-700 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              返回训练营详情
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-neutral-600">
                第 {currentSentenceIndex + 1} 句 / 共 {trialSentences.length} 句
              </div>
              <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                <Crown size={16} className="inline mr-1" />
                试学体验
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="container-responsive py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 学习界面 */}
          <div className="lg:col-span-2">
            <TrialLearningInterface
              sentenceData={currentSentence}
              onComplete={handleSentenceComplete}
              onNext={handleNext}
              onPrevious={handlePrevious}
              canGoNext={currentSentenceIndex < trialSentences.length - 1}
              canGoPrevious={currentSentenceIndex > 0}
              isLastSentence={currentSentenceIndex === trialSentences.length - 1}
            />
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 进度跟踪 */}
            <LearningProgressTracker
              currentSentence={currentSentence}
              moduleStates={{
                audio: { isCompleted: false, attempts: 0, timeSpent: 0, score: 0 },
                comprehension: { isCompleted: false, attempts: 0, timeSpent: 0, score: 0 },
                dictation: { isCompleted: false, attempts: 0, timeSpent: 0, score: 0 },
                speaking: { isCompleted: false, attempts: 0, timeSpent: 0, score: 0 },
                rewrite: { isCompleted: false, attempts: 0, timeSpent: 0, score: 0 },
              }}
              onSaveProgress={handleSaveProgress}
            />

            {/* 句子列表 */}
            <Card>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">试学句子</h3>
              <div className="space-y-3">
                {trialSentences.map((sentence, index) => (
                  <div
                    key={sentence.id}
                    className={`p-3 rounded-lg transition-colors cursor-pointer ${
                      currentSentenceIndex === index
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-neutral-50 hover:bg-neutral-100'
                    }`}
                    onClick={() => setCurrentSentenceIndex(index)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center mt-1">
                        {currentSentenceIndex > index ? (
                          <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        ) : currentSentenceIndex === index ? (
                          <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                        ) : (
                          <div className="w-4 h-4 border-2 border-neutral-300 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-neutral-900 mb-1">
                          第 {index + 1} 句
                        </div>
                        <div className="text-xs text-neutral-600 line-clamp-2">
                          {sentence.chinese}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* 升级提示 */}
            <Card className="bg-gradient-to-br from-green-600 to-emerald-700 text-white">
              <div className="text-center">
                <Crown className="mx-auto mb-4" size={32} />
                <h3 className="text-lg font-semibold mb-2">
                  解锁完整课程
                </h3>
                <p className="text-green-100 mb-4 text-sm">
                  升级到完整版，享受 90 天完整学习体验
                </p>
                <Button
                  onClick={() => navigate('/courses/camp_breakthrough_90')}
                  variant="secondary"
                  className="w-full bg-white text-green-700 hover:bg-green-50"
                >
                  <BookOpen size={16} className="mr-2" />
                  立即升级
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampBreakthroughLearning;
