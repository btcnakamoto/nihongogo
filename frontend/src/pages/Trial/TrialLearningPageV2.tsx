/**
 * 重新设计的试学页面 - 极简现代化版本
 * 采用极简主义设计理念，专注用户学习体验
 * 色彩体系：基于 rgb(0, 171, 85) 的低饱和度专业色调
 * 确保 WCAG 2.1 AA 无障碍合规性
 */

import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  Mic, 
  MicOff, 
  Volume2,
  CheckCircle,
  XCircle,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui';
import { mockTrainingCamps } from '@/data/mockData';
import { 
  TrialAccess
} from '@/types';
import {
  getTrialAccess
} from '@/utils/anonymousTrial';

// 5步学习流程类型
type LearningStep = 'listening' | 'dictation' | 'pronunciation' | 'transformation' | 'summary';

// 句子数据类型
interface SentenceData {
  id: string;
  japanese: string;
  furigana: string;
  chinese: string;
  grammar: string;
  audio: string;
  scene: string;
  keywords: string[];
  transformations: {
    original: string;
    replacement: string;
    newSentence: string;
  }[];
}

// 学习进度数据
interface StepProgress {
  listening: { completed: boolean; attempts: number };
  dictation: { completed: boolean; attempts: number; accuracy: number; errors: string[] };
  pronunciation: { completed: boolean; attempts: number; score: number; feedback: string[] };
  transformation: { completed: boolean; attempts: number; accuracy: number };
  summary: { completed: boolean; totalScore: number; strengths: string[]; improvements: string[] };
}

const TrialLearningPageV2: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  // 状态管理
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState<LearningStep>('listening');
  const [trialAccess, setTrialAccess] = useState<TrialAccess | null>(null);
  
  // 音频控制状态
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(1.0);
  const [showHint, setShowHint] = useState(true);
  
  // 听写相关状态
  const [dictationInput, setDictationInput] = useState('');
  const [dictationErrors, setDictationErrors] = useState<{position: number; error: string}[]>([]);
  const [dictationAttempts, setDictationAttempts] = useState(0);
  
  // 发音相关状态
  const [isRecording, setIsRecording] = useState(false);
  const [pronunciationScore, setPronunciationScore] = useState<{clarity: number; tone: number}>({clarity: 0, tone: 0});
  const [pronunciationFeedback, setPronunciationFeedback] = useState<string[]>([]);
  const [recordingAttempts, setRecordingAttempts] = useState(0);
  
  // 转化训练状态
  const [transformationAttempts, setTransformationAttempts] = useState(0);
  const [transformationScore, setTransformationScore] = useState(0);
  
  // 总体进度状态
  const [stepProgress, setStepProgress] = useState<StepProgress>({
    listening: { completed: false, attempts: 0 },
    dictation: { completed: false, attempts: 0, accuracy: 0, errors: [] },
    pronunciation: { completed: false, attempts: 0, score: 0, feedback: [] },
    transformation: { completed: false, attempts: 0, accuracy: 0 },
    summary: { completed: false, totalScore: 0, strengths: [], improvements: [] }
  });

  // 查找训练营
  const camp = mockTrainingCamps.find(c => c.id === courseId);

  // 试学句子数据
  const sentenceData: SentenceData[] = [
    {
      id: 'sentence_1',
      japanese: '駅までどうやって行きますか？',
      furigana: 'えきまでどうやっていきますか？',
      chinese: '到车站怎么走？',
      grammar: '「どうやって」表示询问方式方法，「まで」表示到达某地点',
      audio: '/audio/station_direction.mp3',
      scene: '车站问路',
      keywords: ['駅', 'どうやって', '行きます'],
      transformations: [
        {
          original: '駅',
          replacement: '郵便局',
          newSentence: '郵便局までどうやって行きますか？'
        },
        {
          original: '駅',
          replacement: '病院',
          newSentence: '病院までどうやって行きますか？'
        }
      ]
    },
    {
      id: 'sentence_2',
      japanese: 'すみません、ちょっと待ってください。',
      furigana: 'すみません、ちょっとまってください。',
      chinese: '不好意思，请稍等一下。',
      grammar: '「ちょっと」可以用来缓和语气，使请求更加礼貌',
      audio: '/audio/wait_please.mp3',
      scene: '日常请求',
      keywords: ['すみません', 'ちょっと', '待って'],
      transformations: [
        {
          original: '待って',
          replacement: '手伝って',
          newSentence: 'すみません、ちょっと手伝ってください。'
        }
      ]
    },
    {
      id: 'sentence_3',
      japanese: 'お疲れさまでした。今日もありがとうございました。',
      furigana: 'おつかれさまでした。きょうもありがとうございました。',
      chinese: '辛苦了。今天也谢谢您。',
      grammar: '「お疲れさま」是日本职场文化中重要的问候语',
      audio: '/audio/thank_you_today.mp3',
      scene: '职场道别',
      keywords: ['お疲れさま', '今日', 'ありがとう'],
      transformations: [
        {
          original: '今日',
          replacement: '昨日',
          newSentence: 'お疲れさまでした。昨日もありがとうございました。'
        }
      ]
    }
  ];

  const currentSentence = sentenceData[currentSentenceIndex];

  // 初始化试学数据
  useEffect(() => {
    if (!courseId) return;

    const access = getTrialAccess(courseId);
    setTrialAccess(access);
  }, [courseId]);

  // 音频播放控制
  const handlePlayAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.playbackRate = audioSpeed;
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 音频结束处理
  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  // 听写实时检查
  const checkDictation = (input: string) => {
    const errors: {position: number; error: string}[] = [];
    const target = currentSentence.japanese;
    
    // 简单的实时错误检查逻辑
    for (let i = 0; i < Math.min(input.length, target.length); i++) {
      if (input[i] !== target[i]) {
        errors.push({ position: i, error: `应该是 "${target[i]}"` });
      }
    }
    
    setDictationErrors(errors);
  };

  // 听写输入处理
  const handleDictationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDictationInput(value);
    checkDictation(value);
  };

  // 听写提交
  const handleDictationSubmit = () => {
    const attempts = dictationAttempts + 1;
    setDictationAttempts(attempts);
    
    const accuracy = calculateDictationAccuracy(dictationInput, currentSentence.japanese);
    const isCompleted = accuracy >= 80 || attempts >= 5;
    
    setStepProgress(prev => ({
      ...prev,
      dictation: {
        completed: isCompleted,
        attempts,
        accuracy,
        errors: dictationErrors.map(e => e.error)
      }
    }));
    
    if (isCompleted) {
      setCurrentStep('pronunciation');
    }
  };

  // 计算听写准确率
  const calculateDictationAccuracy = (input: string, target: string): number => {
    const minLength = Math.min(input.length, target.length);
    const maxLength = Math.max(input.length, target.length);
    
    let correctChars = 0;
    for (let i = 0; i < minLength; i++) {
      if (input[i] === target[i]) {
        correctChars++;
      }
    }
    
    return Math.round((correctChars / maxLength) * 100);
  };

  // 开始录音
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = () => {
        // 处理音频数据
      };
      
      mediaRecorder.onstop = () => {
        // 模拟发音评分
        const clarity = Math.floor(Math.random() * 40) + 60; // 60-100
        const tone = Math.floor(Math.random() * 40) + 60; // 60-100
        setPronunciationScore({ clarity, tone });
        
        const feedback: string[] = [];
        if (clarity < 70) feedback.push('发音清晰度需要提升');
        if (tone < 70) feedback.push('语调需要更自然');
        if (clarity >= 90 && tone >= 90) feedback.push('发音非常标准！');
        
        setPronunciationFeedback(feedback);
        
        const attempts = recordingAttempts + 1;
        setRecordingAttempts(attempts);
        
        const avgScore = (clarity + tone) / 2;
        const isCompleted = avgScore >= 75 || attempts >= 3;
        
        setStepProgress(prev => ({
          ...prev,
          pronunciation: {
            completed: isCompleted,
            attempts,
            score: avgScore,
            feedback
          }
        }));
        
        if (isCompleted) {
          setCurrentStep('transformation');
        }
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('录音失败:', error);
    }
  };

  // 停止录音
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // 步骤导航
  const goToStep = (step: LearningStep) => {
    setCurrentStep(step);
  };

  // 下一个句子
  const handleNextSentence = () => {
    if (currentSentenceIndex < sentenceData.length - 1) {
      setCurrentSentenceIndex(prev => prev + 1);
      setCurrentStep('listening');
      // 重置状态
      setDictationInput('');
      setDictationErrors([]);
      setDictationAttempts(0);
      setRecordingAttempts(0);
      setTransformationAttempts(0);
      setStepProgress({
        listening: { completed: false, attempts: 0 },
        dictation: { completed: false, attempts: 0, accuracy: 0, errors: [] },
        pronunciation: { completed: false, attempts: 0, score: 0, feedback: [] },
        transformation: { completed: false, attempts: 0, accuracy: 0 },
        summary: { completed: false, totalScore: 0, strengths: [], improvements: [] }
      });
    }
  };

  // 计算总分
  const calculateTotalScore = (): number => {
    const scores = [
      stepProgress.dictation.accuracy,
      stepProgress.pronunciation.score,
      stepProgress.transformation.accuracy
    ].filter(score => score > 0);
    
    return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b) / scores.length) : 0;
  };

  if (!camp || !trialAccess || !currentSentence) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">加载中</h2>
            <p className="text-neutral-600">正在准备您的学习内容</p>
          </div>
        </div>
      </div>
    );
  }

  const stepNames = {
    listening: '听力输入',
    dictation: '听写识别', 
    pronunciation: '跟读评分',
    transformation: '表达转化',
    summary: '学习总结'
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* 简化的 Header */}
        <div className="py-6 border-b border-neutral-100">
          <div className="flex items-center justify-between">
            <Link 
              to={`/courses/${courseId}`}
              className="flex items-center text-teal-700 hover:text-teal-800 transition-colors font-medium"
            >
              <ArrowLeft size={18} className="mr-2" />
              返回
            </Link>
            
            <div className="text-sm text-neutral-600">
              试学剩余 {trialAccess.remainingDays} 天
            </div>
          </div>
        </div>

        {/* 简化的学习提示 */}
        <section className="py-6 sm:py-8 animate-fade-in" aria-labelledby="sentence-info">
          <div className="bg-neutral-50 rounded-lg p-4 sm:p-6 border border-neutral-200 hover:shadow-md transition-all duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 id="sentence-info" className="text-base sm:text-lg font-semibold text-neutral-900 mb-1">
                  {currentSentence.chinese}
                </h2>
                <p className="text-sm text-neutral-600">场景：{currentSentence.scene}</p>
              </div>
              <button 
                onClick={() => setShowHint(!showHint)}
                className="px-3 py-1 text-sm text-teal-700 hover:text-teal-800 border border-teal-200 rounded hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 flex-shrink-0"
                aria-expanded={showHint}
                aria-controls="hint-content"
              >
                {showHint ? '隐藏提示' : '显示提示'}
              </button>
            </div>
          </div>
        </section>

        {/* 简化的进度指示 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-neutral-900">
              句子 {currentSentenceIndex + 1} / {sentenceData.length}
            </h1>
            <div className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full">
              {stepNames[currentStep]}
            </div>
          </div>
          
          {/* 现代化的步骤导航 */}
          <div className="flex space-x-1 mb-6">
            {Object.entries(stepNames).map(([step, name]) => {
              const isActive = currentStep === step;
              const isCompleted = stepProgress[step as keyof StepProgress].completed;
              
              return (
                <button
                  key={step}
                  onClick={() => goToStep(step as LearningStep)}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 transform hover:scale-105 ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-sm'
                      : isCompleted
                      ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {isCompleted && (
                    <CheckCircle size={14} className="inline mr-1" />
                  )}
                  {name}
                </button>
              );
            })}
          </div>
          
          {/* 简化的进度条 */}
          <div className="w-full bg-neutral-200 rounded-full h-1.5">
            <div 
              className="bg-teal-600 h-1.5 rounded-full transition-all duration-500 ease-out transform origin-left"
              style={{ width: `${(Object.values(stepProgress).filter(p => p.completed).length / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* 主学习区域 */}
        <div className="max-w-3xl mx-auto">
          {/* Step 1: 简化的听力输入 */}
          {currentStep === 'listening' && (
            <div className="bg-white border border-neutral-200 rounded-lg p-8 mb-6">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">听力输入</h2>
                
                {showHint && (
                  <div className="bg-neutral-50 rounded-lg p-4 mb-6 text-left">
                    <p className="text-sm text-neutral-700">
                      想象您在{currentSentence.scene}的场景中，仔细听语调和关键词。
                    </p>
                  </div>
                )}
                
                {/* 日语句子显示 */}
                <div className="mb-8">
                  <div className="text-2xl font-bold text-neutral-900 mb-3 leading-relaxed tracking-wide">
                    {currentSentence.japanese}
                  </div>
                  <div className="text-base text-neutral-600 mb-4">
                    {currentSentence.furigana}
                  </div>
                  <div className="text-lg text-neutral-800 font-medium">
                    {currentSentence.chinese}
                  </div>
                </div>
                
                {/* 简化的音频控制 */}
                <div className="flex justify-center items-center space-x-3 mb-8">
                  <Button
                    onClick={handlePlayAudio}
                    className={`bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                      isPlaying ? 'animate-pulse' : ''
                    }`}
                  >
                    {isPlaying ? (
                      <><Pause size={18} className="mr-2" />暂停</>
                    ) : (
                      <><Play size={18} className="mr-2" />播放</>
                    )}
                  </Button>
                  
                  <Button
                    onClick={handlePlayAudio}
                    className="border border-neutral-300 text-neutral-700 hover:bg-neutral-50 px-4 py-2 rounded-md transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
                  >
                    <RotateCcw size={16} className="mr-2 transition-transform duration-200 hover:rotate-180" />
                    重播
                  </Button>
                  
                  <select
                    value={audioSpeed}
                    onChange={(e) => setAudioSpeed(parseFloat(e.target.value))}
                    className="px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={0.75}>0.75x</option>
                    <option value={1.0}>1.0x</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                  </select>
                </div>
                
                <Button
                  onClick={() => setCurrentStep('dictation')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-md transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
                >
                  开始听写
                  <ChevronRight size={18} className="ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </div>
              
              <audio
                ref={audioRef}
                src={currentSentence.audio}
                onEnded={handleAudioEnd}
                preload="auto"
              />
            </div>
          )}
          
          {/* Step 2: 简化的听写识别 */}
          {currentStep === 'dictation' && (
            <div className="bg-white border border-neutral-200 rounded-lg p-8 mb-6">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">听写识别</h2>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-base font-medium text-neutral-900">
                      请输入您听到的内容
                    </label>
                    <div className="text-sm text-neutral-500">
                      {dictationAttempts}/5
                    </div>
                  </div>
                  
                  <input
                    type="text"
                    value={dictationInput}
                    onChange={handleDictationChange}
                    placeholder="请在此输入..."
                    className={`w-full px-4 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 transform focus:scale-[1.02] ${
                      dictationErrors.length > 0 ? 'border-red-300 bg-red-50 animate-shake' : 'border-neutral-300 hover:border-neutral-400'
                    }`}
                  />
                  
                  {/* 简化的错误提示 */}
                  {dictationErrors.length > 0 && (
                    <div className="mt-3 p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center text-sm text-red-700">
                        <XCircle size={16} className="mr-2" />
                        发现 {dictationErrors.length} 个错误，请仔细检查
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center space-x-3">
                  <Button
                    onClick={handlePlayAudio}
                    className="border border-neutral-300 text-neutral-700 hover:bg-neutral-50 px-4 py-2 rounded-md transition-colors"
                  >
                    <Volume2 size={16} className="mr-2" />
                    再听
                  </Button>
                  
                  <Button
                    onClick={() => {
                      const hint = currentSentence.keywords[0];
                      if (!dictationInput.includes(hint)) {
                        setDictationInput(prev => prev + hint);
                      }
                    }}
                    className="border border-neutral-300 text-neutral-700 hover:bg-neutral-50 px-4 py-2 rounded-md transition-colors"
                  >
                    提示
                  </Button>
                  
                  <Button
                    onClick={handleDictationSubmit}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md transition-colors"
                  >
                    提交
                    <CheckCircle size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: 简化的跟读评分 */}
          {currentStep === 'pronunciation' && (
            <div className="bg-white border border-neutral-200 rounded-lg p-8 mb-6">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">跟读评分</h2>
                
                <div className="mb-8">
                  <div className="text-xl font-bold text-neutral-900 mb-3">
                    {currentSentence.japanese}
                  </div>
                  <div className="text-base text-neutral-600 mb-6">
                    {currentSentence.furigana}
                  </div>
                  
                  {/* 简化的录音控制 */}
                  <div className="flex justify-center items-center space-x-4 mb-6">
                    <Button
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`px-6 py-3 rounded-md transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-offset-2 shadow-md hover:shadow-lg ${
                        isRecording 
                          ? 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 animate-pulse' 
                          : 'bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500'
                      }`}
                    >
                      {isRecording ? (
                        <><MicOff size={18} className="mr-2 animate-bounce" />停止</>
                      ) : (
                        <><Mic size={18} className="mr-2" />开始录音</>
                      )}
                    </Button>
                    
                    <div className="text-sm text-neutral-500">
                      {recordingAttempts}/3
                    </div>
                  </div>
                  
                  {/* 简化的评分显示 */}
                  {pronunciationScore.clarity > 0 && (
                    <div className="bg-neutral-50 rounded-lg p-6 mb-6">
                      <h4 className="text-base font-semibold text-neutral-900 mb-4">评分结果</h4>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-teal-600">
                            {pronunciationScore.clarity}
                          </div>
                          <div className="text-sm text-neutral-600">清晰度</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-teal-600">
                            {pronunciationScore.tone}
                          </div>
                          <div className="text-sm text-neutral-600">音调</div>
                        </div>
                      </div>
                      
                      {pronunciationFeedback.length > 0 && (
                        <div className="bg-white border border-neutral-200 rounded-lg p-4">
                          <div className="text-sm text-neutral-700">
                            <div className="font-medium mb-2">改进建议：</div>
                            <ul className="space-y-1">
                              {pronunciationFeedback.map((feedback, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-neutral-400 mr-2">•</span>
                                  {feedback}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-center space-x-3">
                    <Button
                      onClick={isRecording ? stopRecording : startRecording}
                      className="border border-neutral-300 text-neutral-700 hover:bg-neutral-50 px-4 py-2 rounded-md transition-colors"
                      disabled={recordingAttempts >= 3}
                    >
                      <RotateCcw size={16} className="mr-2" />
                      重录
                    </Button>
                    
                    <Button
                      onClick={() => setCurrentStep('transformation')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md transition-colors"
                      disabled={!stepProgress.pronunciation.completed}
                    >
                      下一步
                      <ChevronRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 4: 简化的表达转化 */}
          {currentStep === 'transformation' && (
            <div className="bg-white border border-neutral-200 rounded-lg p-8 mb-6">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">表达转化</h2>
                
                <div className="mb-8">
                  <div className="bg-neutral-50 rounded-lg p-6 mb-6">
                    <h4 className="text-base font-semibold text-neutral-900 mb-4">
                      替换关键词练习
                    </h4>
                    <div className="space-y-4">
                      {currentSentence.transformations.map((transformation, index) => (
                        <div key={index} className="bg-white border border-neutral-200 rounded-lg p-4">
                          <div className="flex items-center space-x-3 mb-3 text-sm">
                            <span className="text-neutral-600">将</span>
                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-medium">
                              {transformation.original}
                            </span>
                            <span className="text-neutral-600">换成</span>
                            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-sm font-medium">
                              {transformation.replacement}
                            </span>
                          </div>
                          <div className="text-base font-medium text-neutral-900">
                            {transformation.newSentence}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-neutral-50 rounded-lg p-6">
                    <h4 className="text-base font-semibold text-neutral-900 mb-4">
                      自由复述挑战
                    </h4>
                    <p className="text-sm text-neutral-600 mb-4">
                      请用您自己的话复述一个类似的句子
                    </p>
                    
                    <div className="flex justify-center mb-4">
                      <Button
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`px-6 py-3 rounded-md transition-colors ${
                          isRecording 
                            ? 'bg-red-600 hover:bg-red-700 text-white' 
                            : 'bg-teal-600 hover:bg-teal-700 text-white'
                        }`}
                      >
                        {isRecording ? (
                          <><MicOff size={18} className="mr-2" />停止</>
                        ) : (
                          <><Mic size={18} className="mr-2" />开始复述</>
                        )}
                      </Button>
                    </div>
                    
                    {transformationScore > 0 && (
                      <div className="bg-white border border-neutral-200 rounded-lg p-4 animate-scale-in">
                        <div className="text-sm text-neutral-700">
                          <span className="font-medium text-emerald-700">准确率：{transformationScore}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-center">
                  <Button
                    onClick={() => {
                      setTransformationScore(85);
                      setStepProgress(prev => ({
                        ...prev,
                        transformation: {
                          completed: true,
                          attempts: transformationAttempts + 1,
                          accuracy: 85
                        }
                      }));
                      setCurrentStep('summary');
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-md transition-colors"
                  >
                    完成转化
                    <ChevronRight size={18} className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 5: 简化的学习总结 */}
          {currentStep === 'summary' && (
            <div className="bg-white border border-neutral-200 rounded-lg p-8 mb-6">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">学习总结</h2>
                
                <div className="space-y-6">
                  {/* 简化的总体得分 */}
                  <div className="bg-neutral-50 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-white">
                        {calculateTotalScore()}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-neutral-900 mb-2">
                      本句掌握得分：{calculateTotalScore()}分
                    </h4>
                    <p className="text-sm text-neutral-600">
                      {calculateTotalScore() >= 90 ? '优秀' : calculateTotalScore() >= 80 ? '良好' : calculateTotalScore() >= 70 ? '及格' : '需要加强练习'}
                    </p>
                  </div>
                  
                  {/* 简化的各模块得分 */}
                  <div className="bg-neutral-50 rounded-lg p-6">
                    <h4 className="text-base font-semibold text-neutral-900 mb-4">
                      各模块得分
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center justify-between p-3 bg-white rounded border border-neutral-200">
                        <span className="text-sm font-medium text-neutral-700">听写</span>
                        <span className="text-sm font-semibold text-teal-600">
                          {stepProgress.dictation.accuracy}%
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-white rounded border border-neutral-200">
                        <span className="text-sm font-medium text-neutral-700">跟读</span>
                        <span className="text-sm font-semibold text-teal-600">
                          {Math.round(stepProgress.pronunciation.score)}%
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-white rounded border border-neutral-200">
                        <span className="text-sm font-medium text-neutral-700">复述</span>
                        <span className="text-sm font-semibold text-teal-600">
                          {stepProgress.transformation.accuracy}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* 简化的学习趋势 */}
                  <div className="bg-neutral-50 rounded-lg p-6">
                    <h4 className="text-base font-semibold text-neutral-900 mb-4">
                      学习趋势
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-neutral-600 mb-1">65</div>
                        <div className="text-xs text-neutral-500">初始成绩</div>
                      </div>
                      <div className="flex-1 mx-4 h-1.5 bg-gradient-to-r from-neutral-300 to-teal-500 rounded-full"></div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-teal-600 mb-1">{calculateTotalScore()}</div>
                        <div className="text-xs text-neutral-500">当前成绩</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 简化的下一句推荐 */}
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h4 className="text-base font-semibold text-neutral-900 mb-4">
                    下一句子
                  </h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-neutral-900">
                        {currentSentenceIndex < sentenceData.length - 1 
                          ? sentenceData[currentSentenceIndex + 1]?.chinese 
                          : '恭喜完成所有句子！'
                        }
                      </div>
                    </div>
                    <Button
                      onClick={handleNextSentence}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors"
                      disabled={currentSentenceIndex >= sentenceData.length - 1}
                    >
                      下一句
                      <ChevronRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        
        {/* 简化的侧边栏信息 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">语法要点</h3>
            <p className="text-sm text-neutral-700">
              {currentSentence.grammar}
            </p>
          </div>
          
          <div className="bg-neutral-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">学习进度</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">总体进度</span>
                <span className="font-medium text-teal-600">
                  {Math.round(((currentSentenceIndex + 1) / sentenceData.length) * 100)}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">完成步骤</span>
                <span className="font-medium text-neutral-800">
                  {Object.values(stepProgress).filter(p => p.completed).length}/5
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-neutral-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">试学状态</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">剩余天数</span>
                <span className="font-medium text-teal-600">
                  {trialAccess.remainingDays} 天
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">当前得分</span>
                <span className="font-medium text-emerald-600">
                  {calculateTotalScore()} 分
                </span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TrialLearningPageV2;