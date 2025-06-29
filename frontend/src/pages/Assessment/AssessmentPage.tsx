/**
 * 功能描述：快速水平评估页面组件
 * 输入参数：无
 * 返回值：React 评估页面组件
 * 用途说明：提供用户日语水平评估和学习目标设定功能
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Target, ArrowRight, ArrowLeft } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { mockAssessment } from '@/data/mockData';

const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = [
    {
      id: 'experience',
      title: '你的日语学习经验是？',
      options: [
        { value: 'beginner', label: '完全零基础', description: '从未接触过日语' },
        { value: 'elementary', label: '学过一些基础知识', description: '了解五十音图，会一些简单词汇' },
        { value: 'intermediate', label: '有一定基础，能进行简单对话', description: '能应对基本的日常交流' },
        { value: 'advanced', label: '中级水平，能应对大部分日常场景', description: '具备较好的听说读写能力' }
      ]
    },
    {
      id: 'goal',
      title: '你的主要学习目标是？',
      options: [
        { value: 'daily', label: '日常生活交流', description: '旅游、购物、基本社交' },
        { value: 'business', label: '职场商务沟通', description: '工作会议、邮件、客户服务' },
        { value: 'travel', label: '旅游应急需求', description: '短期旅游的基本沟通' },
        { value: 'exam', label: '考试或升学', description: 'JLPT考试、留学准备' }
      ]
    },
    {
      id: 'time',
      title: '你每天能投入多少时间学习？',
      options: [
        { value: '15', label: '15分钟', description: '利用碎片时间学习' },
        { value: '30', label: '30分钟', description: '每天固定半小时' },
        { value: '45', label: '45分钟', description: '较为充裕的学习时间' },
        { value: '60', label: '1小时以上', description: '充足的学习时间' }
      ]
    },
    {
      id: 'focus',
      title: '你最希望提升的技能是？',
      options: [
        { value: 'listening', label: '听力理解', description: '能听懂日语对话和内容' },
        { value: 'speaking', label: '口语表达', description: '流畅地用日语表达想法' },
        { value: 'conversation', label: '对话交流', description: '自然地进行日语对话' },
        { value: 'comprehensive', label: '综合提升', description: '听说读写全面发展' }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsCompleted(true);
    // 这里可以处理评估结果
    setTimeout(() => {
      navigate('/assessment/result', { state: { answers } });
    }, 2000);
  };

  const currentQuestion = questions[currentStep];
  const isAnswered = answers[currentQuestion?.id];
  const progress = ((currentStep + 1) / questions.length) * 100;

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">评估完成！</h2>
          <p className="text-gray-600 mb-6">
            正在为你分析结果并推荐最适合的学习路径...
          </p>
          <div className="animate-spin w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto"></div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-responsive max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            日语水平快速评估
          </h1>
          <p className="text-gray-600 mb-6">
            通过几个简单问题，我们将为你推荐最适合的学习路径
          </p>
          
          {/* Progress */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>第 {currentStep + 1} 题</span>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                约2分钟
              </div>
              <span>{questions.length} 题</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question */}
        <Card className="mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {currentQuestion.title}
            </h2>
            <p className="text-gray-600 text-sm">
              请选择最符合你情况的选项
            </p>
          </div>

          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start">
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 mt-0.5 flex items-center justify-center ${
                    answers[currentQuestion.id] === option.value
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300'
                  }`}>
                    {answers[currentQuestion.id] === option.value && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">
                      {option.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {option.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft size={16} className="mr-2" />
            上一题
          </Button>

          <div className="text-sm text-gray-500">
            {currentStep + 1} / {questions.length}
          </div>

          <Button
            onClick={handleNext}
            disabled={!isAnswered}
          >
            {currentStep === questions.length - 1 ? '完成评估' : '下一题'}
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>

        {/* Tips */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <div className="flex items-start">
            <Target className="text-blue-600 mr-3 mt-1" size={20} />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">评估小贴士</h3>
              <p className="text-blue-800 text-sm">
                请根据你的真实情况选择，这将帮助我们为你推荐最合适的学习路径和训练营。
                评估结果仅用于个性化推荐，你随时可以调整学习计划。
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentPage;
