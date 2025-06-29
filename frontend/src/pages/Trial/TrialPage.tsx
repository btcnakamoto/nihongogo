/**
 * 功能描述：训练营试学页面组件
 * 输入参数：通过路由参数获取训练营ID
 * 返回值：React 试学页面组件
 * 用途说明：提供训练营试学功能，包含试学内容预览和限制提示
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Play,
  Lock,
  Star,
  CheckCircle,
  AlertCircle,
  Crown,
  Zap,
  BookOpen,
  Target,
  UserPlus,
  LogIn,
  Save,
  Volume2,
  RotateCcw,
  Brain
} from 'lucide-react';
import { Card, Button, ProgressBar } from '@/components/ui';
import { mockTrainingCamps } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { TrialAccess, TrialProgress } from '@/types';
import {
  getTrialAccess,
  getTrialSessionForCamp,
  updateTrialProgress,
  canAccessLesson,
  markLessonCompleted,
  addStudyTime
} from '@/utils/anonymousTrial';

const TrialPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { state } = useAuth();

  const [currentLesson, setCurrentLesson] = useState(1);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [learningStep, setLearningStep] = useState<'listen' | 'repeat' | 'understand' | 'apply'>('listen');
  const [trialAccess, setTrialAccess] = useState<TrialAccess | null>(null);
  const [trialProgress, setTrialProgress] = useState<TrialProgress | null>(null);

  // 查找训练营
  const camp = mockTrainingCamps.find(c => c.id === courseId);

  // 初始化试学数据
  useEffect(() => {
    if (courseId) {
      const access = getTrialAccess(courseId);
      const session = getTrialSessionForCamp(courseId);

      setTrialAccess(access);
      if (session) {
        setTrialProgress(session.progress);
        setCurrentLesson(session.progress.currentLesson);
      }
    }
  }, [courseId]);

  // 试学课程内容 - 以句子为核心
  const trialLessons = [
    {
      id: 'lesson_1',
      title: '基础问候与自我介绍',
      description: '学习日语的基本问候语和自我介绍方式',
      duration: 15,
      isUnlocked: true,
      isCompleted: trialProgress?.completedLessons.includes('lesson_1') || false,
      sentences: [
        {
          id: 'sentence_1_1',
          japanese: 'おはようございます。今日もよろしくお願いします。',
          furigana: 'おはようございます。きょうもよろしくおねがいします。',
          chinese: '早上好。今天也请多多关照。',
          grammar: '「よろしくお願いします」是日语中非常重要的客套话，表示请求对方关照。',
          audio: '/audio/lesson1_sentence1.mp3'
        },
        {
          id: 'sentence_1_2',
          japanese: 'はじめまして、田中と申します。どうぞよろしくお願いいたします。',
          furigana: 'はじめまして、たなかともうします。どうぞよろしくおねがいいたします。',
          chinese: '初次见面，我叫田中。请多多关照。',
          grammar: '「申します」是「言います」的谦让语，用于自我介绍时更加礼貌。',
          audio: '/audio/lesson1_sentence2.mp3'
        },
        {
          id: 'sentence_1_3',
          japanese: 'お疲れさまでした。また明日お会いしましょう。',
          furigana: 'おつかれさまでした。またあしたおあいしましょう。',
          chinese: '辛苦了。明天再见。',
          grammar: '「お疲れさま」是日语职场中常用的问候语，表示对对方辛苦工作的慰问。',
          audio: '/audio/lesson1_sentence3.mp3'
        }
      ]
    },
    {
      id: 'lesson_2',
      title: '数字与时间表达',
      description: '掌握日语中的数字和时间表达方法',
      duration: 20,
      isUnlocked: trialAccess ? canAccessLesson(trialAccess.sessionId, 1) : false,
      isCompleted: trialProgress?.completedLessons.includes('lesson_2') || false,
      sentences: [
        {
          id: 'sentence_2_1',
          japanese: '今何時ですか。午後三時半です。',
          furigana: 'いまなんじですか。ごごさんじはんです。',
          chinese: '现在几点了？下午三点半。',
          grammar: '时间表达中，「半」表示30分，「午後」表示下午。',
          audio: '/audio/lesson2_sentence1.mp3'
        },
        {
          id: 'sentence_2_2',
          japanese: '電車は八時十五分に出発します。遅れないでください。',
          furigana: 'でんしゃははちじじゅうごふんにしゅっぱつします。おくれないでください。',
          chinese: '电车8点15分出发。请不要迟到。',
          grammar: '「に」用于表示具体时间点，「遅れる」表示迟到。',
          audio: '/audio/lesson2_sentence2.mp3'
        },
        {
          id: 'sentence_2_3',
          japanese: '会議は一時間ぐらいかかります。二時に終わる予定です。',
          furigana: 'かいぎはいちじかんぐらいかかります。にじにおわるよていです。',
          chinese: '会议大概需要一小时。预定两点结束。',
          grammar: '「ぐらい」表示大概，「予定」表示预定、计划。',
          audio: '/audio/lesson2_sentence3.mp3'
        }
      ]
    },
    {
      id: 'lesson_3',
      title: '简单的日常对话',
      description: '练习基本的日常生活对话场景',
      duration: 25,
      isUnlocked: trialAccess ? canAccessLesson(trialAccess.sessionId, 2) : false,
      isCompleted: trialProgress?.completedLessons.includes('lesson_3') || false,
      sentences: [
        {
          id: 'sentence_3_1',
          japanese: 'すみません、駅はどこですか。まっすぐ行って、右に曲がってください。',
          furigana: 'すみません、えきはどこですか。まっすぐいって、みぎにまがってください。',
          chinese: '不好意思，车站在哪里？请直走，然后右转。',
          grammar: '「どこ」表示哪里，「まっすぐ」表示直走，「曲がる」表示转弯。',
          audio: '/audio/lesson3_sentence1.mp3'
        },
        {
          id: 'sentence_3_2',
          japanese: 'ありがとうございます。とても助かりました。',
          furigana: 'ありがとうございます。とてもたすかりました。',
          chinese: '谢谢您。真是帮了大忙。',
          grammar: '「助かる」表示得到帮助，是表达感谢的常用表现。',
          audio: '/audio/lesson3_sentence2.mp3'
        },
        {
          id: 'sentence_3_3',
          japanese: 'お元気ですか。おかげさまで、元気です。',
          furigana: 'おげんきですか。おかげさまで、げんきです。',
          chinese: '您身体好吗？托您的福，很好。',
          grammar: '「おかげさまで」是日语中表示感谢的谦逊表达方式。',
          audio: '/audio/lesson3_sentence3.mp3'
        }
      ]
    }
  ];

  const currentLessonData = trialLessons[currentLesson - 1];

  if (!camp || !trialAccess || !trialProgress) {
    if (!camp) {
      return (
        <div className="min-h-screen bg-white py-8">
          <div className="container-responsive">
            <Card className="text-center py-12">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">训练营不存在</h2>
              <p className="text-neutral-600 mb-6">抱歉，您访问的训练营不存在或已下线。</p>
              <Link to="/courses">
                <Button>返回训练营列表</Button>
              </Link>
            </Card>
          </div>
        </div>
      );
    }

    // 加载中状态
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <span className="text-white font-bold text-2xl">N</span>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">正在加载试学内容...</p>
        </div>
      </div>
    );
  }

  // 播放当前句子音频
  const handlePlaySentence = () => {
    if (!currentLessonData || !currentLessonData.sentences[currentSentence]) return;

    setIsPlaying(true);
    // 模拟音频播放
    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  };

  // 下一个学习步骤
  const handleNextStep = () => {
    const steps: Array<'listen' | 'repeat' | 'understand' | 'apply'> = ['listen', 'repeat', 'understand', 'apply'];
    const currentStepIndex = steps.indexOf(learningStep);

    if (currentStepIndex < steps.length - 1) {
      setLearningStep(steps[currentStepIndex + 1]);
    } else {
      // 完成当前句子，进入下一句
      handleNextSentence();
    }
  };

  // 上一句
  const handlePrevSentence = () => {
    if (currentSentence > 0) {
      setCurrentSentence(prev => prev - 1);
      setLearningStep('listen');
    }
  };

  // 下一句
  const handleNextSentence = () => {
    if (!currentLessonData) return;

    if (currentSentence < currentLessonData.sentences.length - 1) {
      setCurrentSentence(prev => prev + 1);
      setLearningStep('listen');
    } else {
      // 完成当前课程
      handleCompleteLesson();
    }
  };

  // 完成当前课程
  const handleCompleteLesson = () => {
    if (!trialAccess || !currentLessonData) return;

    // 标记课程完成
    markLessonCompleted(trialAccess.sessionId, currentLessonData.id);

    // 增加学习时间
    addStudyTime(trialAccess.sessionId, currentLessonData.duration);

    // 更新本地状态
    if (trialProgress) {
      const updatedProgress = {
        ...trialProgress,
        completedLessons: [...trialProgress.completedLessons, currentLessonData.id],
        timeSpent: trialProgress.timeSpent + currentLessonData.duration,
      };
      setTrialProgress(updatedProgress);

      // 如果还有下一课，解锁下一课
      if (currentLesson < trialLessons.length) {
        setCurrentLesson(prev => prev + 1);
        setCurrentSentence(0);
        setLearningStep('listen');
        updateTrialProgress(trialAccess.sessionId, { currentLesson: currentLesson + 1 });
      }
    }
  };

  const handleUpgrade = () => {
    navigate(`/courses/${courseId}`);
  };

  const handleSaveProgress = () => {
    if (state.isAuthenticated) {
      // 已登录用户，显示保存成功消息
      alert('学习进度已保存到您的账户！');
    } else {
      // 未登录用户，引导注册/登录
      navigate('/register', {
        state: {
          from: { pathname: `/trial/${courseId}` },
          message: '注册账户以保存您的学习进度'
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 py-8">
      <div className="container-responsive">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trial Info Banner */}
            <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Zap className="text-amber-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">
                    🎉 欢迎试学 {camp.title}
                  </h3>
                  <p className="text-amber-800 mb-3">
                    您可以免费体验前 {trialProgress.totalTrialLessons} 节课程，感受我们的教学质量和学习体验。
                    {!state.isAuthenticated && '试学进度将保存在本地，注册账户可永久保存学习记录。'}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-amber-700">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      已学习 {trialProgress.timeSpent} 分钟
                    </div>
                    <div className="flex items-center">
                      <Target size={16} className="mr-1" />
                      {trialProgress.completedLessons.length}/{trialProgress.totalTrialLessons} 课程完成
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Anonymous User Save Progress Banner */}
            {!state.isAuthenticated && (
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Save className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">保存学习进度</h4>
                      <p className="text-sm text-blue-800">
                        注册账户以永久保存您的学习进度和成就
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link to="/login">
                      <Button variant="outline" size="sm">
                        <LogIn size={16} className="mr-1" />
                        登录
                      </Button>
                    </Link>
                    <Button size="sm" onClick={handleSaveProgress}>
                      <UserPlus size={16} className="mr-1" />
                      注册
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Current Lesson */}
            <Card>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-neutral-900">
                    第 {currentLesson} 课：{currentLessonData.title}
                  </h2>
                  <div className="flex items-center text-sm text-neutral-500">
                    <Clock size={16} className="mr-1" />
                    {currentLessonData.duration} 分钟
                  </div>
                </div>
                <p className="text-neutral-600 mb-4">
                  {currentLessonData.description}
                </p>

                {/* Sentence Progress */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-neutral-600">
                    第 {currentSentence + 1} 句 / 共 {currentLessonData.sentences.length} 句
                  </span>
                  <span className="text-sm text-neutral-600">
                    学习步骤：{learningStep === 'listen' ? '听句子' :
                              learningStep === 'repeat' ? '跟读练习' :
                              learningStep === 'understand' ? '理解测试' : '应用练习'}
                  </span>
                </div>

                <ProgressBar
                  value={currentSentence + (learningStep === 'apply' ? 1 : 0)}
                  max={currentLessonData.sentences.length}
                  label="句子进度"
                  showPercentage
                  color="primary"
                />
              </div>

              {/* Sentence Learning Content */}
              {currentLessonData.isUnlocked ? (
                <div className="space-y-8">
                  {/* Current Sentence Display */}
                  <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 text-center">
                    <div className="space-y-6">
                      {/* Japanese Text */}
                      <div>
                        <h3 className="text-3xl font-bold text-neutral-900 mb-3 leading-relaxed">
                          {currentLessonData.sentences[currentSentence]?.japanese}
                        </h3>

                        {/* Furigana */}
                        <p className="text-lg text-neutral-600 mb-4">
                          {currentLessonData.sentences[currentSentence]?.furigana}
                        </p>

                        {/* Chinese Translation */}
                        <p className="text-xl text-neutral-800 font-medium">
                          {currentLessonData.sentences[currentSentence]?.chinese}
                        </p>
                      </div>

                      {/* Audio Control */}
                      <div className="flex justify-center">
                        <Button
                          onClick={handlePlaySentence}
                          variant="outline"
                          size="lg"
                          loading={isPlaying}
                          disabled={isPlaying}
                          className="bg-white/80 hover:bg-white"
                        >
                          <Play size={24} className="mr-2" />
                          {isPlaying ? '播放中...' : '播放句子'}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Grammar Point */}
                  <Card className="bg-blue-50 border-blue-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                        <BookOpen size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">语法要点</h4>
                        <p className="text-blue-800">
                          {currentLessonData.sentences[currentSentence]?.grammar}
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Learning Step Content */}
                  <div className="bg-neutral-50 rounded-xl p-6">
                    {learningStep === 'listen' && (
                      <div className="text-center">
                        <h4 className="text-lg font-semibold text-neutral-900 mb-3">
                          👂 听句子
                        </h4>
                        <p className="text-neutral-600 mb-4">
                          仔细听句子的发音，注意语调和重音
                        </p>
                      </div>
                    )}

                    {learningStep === 'repeat' && (
                      <div className="text-center">
                        <h4 className="text-lg font-semibold text-neutral-900 mb-3">
                          🗣️ 跟读练习
                        </h4>
                        <p className="text-neutral-600 mb-4">
                          跟着音频大声朗读，模仿正确的发音
                        </p>
                      </div>
                    )}

                    {learningStep === 'understand' && (
                      <div className="text-center">
                        <h4 className="text-lg font-semibold text-neutral-900 mb-3">
                          🧠 理解测试
                        </h4>
                        <p className="text-neutral-600 mb-4">
                          确认你理解了句子的含义和语法结构
                        </p>
                      </div>
                    )}

                    {learningStep === 'apply' && (
                      <div className="text-center">
                        <h4 className="text-lg font-semibold text-neutral-900 mb-3">
                          ✨ 应用练习
                        </h4>
                        <p className="text-neutral-600 mb-4">
                          尝试在类似场景中使用这个句子
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Control Buttons */}
                  <div className="flex justify-between items-center pt-4">
                    <Button
                      onClick={handlePrevSentence}
                      variant="outline"
                      disabled={currentSentence === 0}
                    >
                      <ArrowLeft size={16} className="mr-2" />
                      上一句
                    </Button>

                    <Button
                      onClick={handleNextStep}
                      size="lg"
                    >
                      {learningStep === 'apply' ? (
                        currentSentence === currentLessonData.sentences.length - 1 ? (
                          <>
                            <CheckCircle size={20} className="mr-2" />
                            完成课程
                          </>
                        ) : (
                          <>
                            <ArrowLeft size={16} className="mr-2 rotate-180" />
                            下一句
                          </>
                        )
                      ) : (
                        <>
                          <Target size={16} className="mr-2" />
                          下一步
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Lock className="mx-auto text-neutral-400 mb-4" size={48} />
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">
                    课程已锁定
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    请先完成前面的课程
                  </p>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trial Status */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-neutral-900">
                  试学状态
                </h3>
                {!state.isAuthenticated && (
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                    匿名试学
                  </span>
                )}
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">剩余天数</span>
                  <span className="font-semibold text-primary-600">
                    {trialAccess.remainingDays} 天
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">可学课程</span>
                  <span className="font-semibold text-primary-600">
                    {trialAccess.maxLessons} 节
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">已完成</span>
                  <span className="font-semibold text-success-600">
                    {trialProgress.completedLessons.length} 节
                  </span>
                </div>
                <div className="pt-3 border-t border-neutral-200 space-y-2">
                  <Link to={`/trial/${courseId}/learning-v2`}>
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                    >
                      <Zap size={16} className="mr-2" />
                      体验新版学习模式
                    </Button>
                  </Link>
                  <Link to={`/intelligent-learning/${courseId}`}>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0 hover:from-purple-600 hover:to-indigo-700"
                    >
                      <Brain size={16} className="mr-2" />
                      🧠 智能学习系统
                    </Button>
                  </Link>
                  {!state.isAuthenticated && (
                    <>
                      <p className="text-xs text-neutral-500 mb-2">
                        💡 注册账户可享受：
                      </p>
                      <ul className="text-xs text-neutral-600 space-y-1">
                        <li>• 永久保存学习进度</li>
                        <li>• 解锁更多学习功能</li>
                        <li>• 获得学习成就徽章</li>
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </Card>

            {/* Current Lesson Sentences */}
            <Card>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                本课句子
              </h3>
              <div className="space-y-3">
                {currentLessonData.sentences.map((sentence, index) => (
                  <div
                    key={sentence.id}
                    className={`p-3 rounded-lg transition-colors cursor-pointer ${
                      currentSentence === index
                        ? 'bg-primary-50 border border-primary-200'
                        : 'bg-neutral-50 hover:bg-neutral-100'
                    }`}
                    onClick={() => {
                      setCurrentSentence(index);
                      setLearningStep('listen');
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center mt-1">
                        {currentSentence > index ? (
                          <CheckCircle className="text-success-600" size={16} />
                        ) : currentSentence === index ? (
                          <div className="w-4 h-4 bg-primary-600 rounded-full"></div>
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

            {/* Lesson List */}
            <Card>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                试学课程
              </h3>
              <div className="space-y-3">
                {trialLessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      currentLesson === index + 1
                        ? 'bg-primary-50 border border-primary-200'
                        : lesson.isUnlocked
                        ? 'bg-neutral-50 hover:bg-neutral-100 cursor-pointer'
                        : 'bg-neutral-50 opacity-50'
                    }`}
                    onClick={() => {
                      if (lesson.isUnlocked) {
                        setCurrentLesson(index + 1);
                        setCurrentSentence(0);
                        setLearningStep('listen');
                        if (trialAccess) {
                          updateTrialProgress(trialAccess.sessionId, { currentLesson: index + 1 });
                        }
                      }
                    }}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                      {lesson.isCompleted ? (
                        <CheckCircle className="text-success-600" size={20} />
                      ) : lesson.isUnlocked ? (
                        <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                      ) : (
                        <Lock className="text-neutral-400" size={16} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-neutral-900 truncate">
                        {lesson.title}
                      </div>
                      <div className="text-sm text-neutral-500">
                        {lesson.sentences.length} 个句子 · {lesson.duration} 分钟
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Upgrade CTA */}
            <Card className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
              <div className="text-center">
                <Crown className="mx-auto mb-4" size={32} />
                <h3 className="text-lg font-semibold mb-2">
                  解锁完整课程
                </h3>
                <p className="text-primary-100 mb-4 text-sm">
                  升级到完整版，享受 {camp.duration} 天完整学习体验
                </p>
                <Button
                  onClick={handleUpgrade}
                  variant="secondary"
                  className="w-full bg-white text-primary-700 hover:bg-primary-50"
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

export default TrialPage;
