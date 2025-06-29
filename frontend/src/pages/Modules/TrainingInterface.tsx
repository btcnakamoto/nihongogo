/**
 * 功能描述：模块训练界面组件
 * 输入参数：训练模块数据和训练状态
 * 返回值：React 训练界面组件
 * 用途说明：提供实际的训练交互界面，包含音频播放、练习题目等
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { Card, Button, ProgressBar } from '@/components/ui';
import { TrainingModule } from '@/types';
import CompletionModal from '@/components/common/CompletionModal';

interface TrainingInterfaceProps {
  module: TrainingModule;
  onComplete: () => void;
  onExit: () => void;
}

interface TrainingStep {
  id: number;
  type: 'listening' | 'vocabulary' | 'speaking' | 'comprehension' | 'test';
  title: string;
  content: {
    audio?: string;
    text?: string;
    question?: string;
    options?: string[];
    correctAnswer?: string;
    vocabulary?: Array<{ word: string; reading: string; meaning: string }>;
  };
}

const TrainingInterface: React.FC<TrainingInterfaceProps> = ({
  module,
  onComplete,
  onExit
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [startTime] = useState(Date.now());

  // 模拟训练步骤数据
  const trainingSteps: TrainingStep[] = [
    {
      id: 0,
      type: 'listening',
      title: '听力理解',
      content: {
        audio: '/audio/restaurant-conversation.mp3',
        text: '请仔细听取以下对话，理解对话内容和场景。'
      }
    },
    {
      id: 1,
      type: 'vocabulary',
      title: '词汇学习',
      content: {
        vocabulary: [
          { word: 'いらっしゃいませ', reading: 'irasshaimase', meaning: '欢迎光临' },
          { word: 'メニュー', reading: 'menyuu', meaning: '菜单' },
          { word: 'おすすめ', reading: 'osusume', meaning: '推荐' },
          { word: 'お会計', reading: 'okaikei', meaning: '结账' }
        ]
      }
    },
    {
      id: 2,
      type: 'speaking',
      title: '跟读练习',
      content: {
        text: '请跟读以下句子，注意发音和语调：',
        audio: '/audio/pronunciation-practice.mp3'
      }
    },
    {
      id: 3,
      type: 'comprehension',
      title: '理解测试',
      content: {
        question: '在餐厅点餐时，服务员通常会说什么？',
        options: [
          'いらっしゃいませ',
          'ありがとうございました',
          'すみません',
          'おはようございます'
        ],
        correctAnswer: 'いらっしゃいませ'
      }
    },
    {
      id: 4,
      type: 'test',
      title: '综合测试',
      content: {
        question: '请选择正确的餐厅用语搭配：',
        options: [
          'メニューをください',
          'メニューをあります',
          'メニューをします',
          'メニューをいます'
        ],
        correctAnswer: 'メニューをください'
      }
    }
  ];

  const currentStepData = trainingSteps[currentStep];
  const progress = ((currentStep + 1) / trainingSteps.length) * 100;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // 这里可以添加实际的音频播放逻辑
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
    // 这里可以添加实际的录音逻辑
  };

  const handleAnswer = (answer: string) => {
    setUserAnswers(prev => ({ ...prev, [currentStep]: answer }));
    setShowFeedback(true);
    
    // 检查答案是否正确
    if (currentStepData.content.correctAnswer === answer) {
      setScore(prev => prev + 1);
    }

    // 2秒后自动进入下一步
    setTimeout(() => {
      setShowFeedback(false);
      handleNext();
    }, 2000);
  };

  const handleNext = () => {
    if (currentStep < trainingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 训练完成，显示完成弹窗
      setShowCompletion(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowFeedback(false);
    }
  };

  const handleCompletionClose = () => {
    setShowCompletion(false);
    onComplete();
  };

  const handleRetry = () => {
    setCurrentStep(0);
    setUserAnswers({});
    setScore(0);
    setShowCompletion(false);
    setShowFeedback(false);
  };

  const getTimeSpent = () => {
    return Math.round((Date.now() - startTime) / 60000); // 转换为分钟
  };

  const renderStepContent = () => {
    switch (currentStepData.type) {
      case 'listening':
        return (
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Volume2 className="text-blue-600" size={48} />
            </div>
            <p className="text-gray-600 mb-6">{currentStepData.content.text}</p>
            <div className="flex items-center justify-center space-x-4">
              <Button variant="outline" onClick={() => setCurrentStep(0)}>
                <RotateCcw size={16} />
              </Button>
              <Button 
                size="lg" 
                onClick={handlePlayPause}
                className="w-16 h-16 rounded-full"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </Button>
              <Button variant="outline" onClick={handleMute}>
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </Button>
            </div>
          </div>
        );

      case 'vocabulary':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
              学习以下词汇
            </h3>
            <div className="grid gap-4">
              {currentStepData.content.vocabulary?.map((vocab, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-gray-900 font-japanese">
                        {vocab.word}
                      </div>
                      <div className="text-sm text-gray-500">{vocab.reading}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-700">{vocab.meaning}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'speaking':
        return (
          <div className="text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mic className="text-green-600" size={48} />
            </div>
            <p className="text-gray-600 mb-6">{currentStepData.content.text}</p>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Button variant="outline" onClick={handlePlayPause}>
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </Button>
              <Button 
                size="lg" 
                onClick={handleRecord}
                className={`w-16 h-16 rounded-full ${isRecording ? 'bg-red-600 hover:bg-red-700' : ''}`}
              >
                {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
              </Button>
            </div>
            {isRecording && (
              <div className="text-red-600 text-sm">
                🔴 正在录音...
              </div>
            )}
          </div>
        );

      case 'comprehension':
      case 'test':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
              {currentStepData.content.question}
            </h3>
            <div className="grid gap-3">
              {currentStepData.content.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={showFeedback}
                  className={`p-4 text-left border-2 rounded-lg transition-all ${
                    showFeedback
                      ? option === currentStepData.content.correctAnswer
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : userAnswers[currentStep] === option
                        ? 'border-red-500 bg-red-50 text-red-800'
                        : 'border-gray-200 bg-gray-50'
                      : 'border-gray-200 hover:border-primary-500 hover:bg-primary-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-japanese">{option}</span>
                    {showFeedback && option === currentStepData.content.correctAnswer && (
                      <CheckCircle className="text-green-600" size={20} />
                    )}
                    {showFeedback && userAnswers[currentStep] === option && option !== currentStepData.content.correctAnswer && (
                      <XCircle className="text-red-600" size={20} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-responsive max-w-4xl">
        {/* Header */}
        <Card className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{module.title}</h1>
              <p className="text-gray-600">{currentStepData.title}</p>
            </div>
            <Button variant="outline" onClick={onExit}>
              退出训练
            </Button>
          </div>
        </Card>

        {/* Progress */}
        <Card className="mb-6">
          <ProgressBar
            value={progress}
            max={100}
            label={`第 ${currentStep + 1} 步 / 共 ${trainingSteps.length} 步`}
            showPercentage={true}
          />
        </Card>

        {/* Training Content */}
        <Card className="mb-6">
          <div className="min-h-[400px] flex items-center justify-center">
            {renderStepContent()}
          </div>
        </Card>

        {/* Navigation */}
        <Card>
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft size={16} className="mr-2" />
              上一步
            </Button>
            
            <div className="text-sm text-gray-500">
              {currentStep + 1} / {trainingSteps.length}
            </div>

            {currentStepData.type === 'listening' || currentStepData.type === 'vocabulary' || currentStepData.type === 'speaking' ? (
              <Button onClick={handleNext}>
                下一步
                <ArrowRight size={16} className="ml-2" />
              </Button>
            ) : (
              <div className="w-20"></div> // 占位符，等待用户选择答案
            )}
          </div>
        </Card>

        {/* Completion Modal */}
        <CompletionModal
          isOpen={showCompletion}
          onClose={handleCompletionClose}
          score={score}
          totalQuestions={trainingSteps.filter(step => step.type === 'comprehension' || step.type === 'test').length}
          timeSpent={getTimeSpent()}
          moduleName={module.title}
          onRetry={handleRetry}
        />
      </div>
    </div>
  );
};

export default TrainingInterface;
