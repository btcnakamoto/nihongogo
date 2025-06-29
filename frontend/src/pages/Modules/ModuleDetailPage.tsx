/**
 * 功能描述：模块训练详情页面组件
 * 输入参数：通过路由参数获取模块ID
 * 返回值：React 模块训练详情页面组件
 * 用途说明：展示训练模块的详细信息和训练界面
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TrainingInterface from './TrainingInterface';
import { 
  ArrowLeft,
  Clock, 
  Users, 
  Star, 
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Headphones,
  MessageCircle,
  BookOpen,
  Globe,
  Target,
  CheckCircle,
  Award,
  TrendingUp
} from 'lucide-react';
import { Card, Button, ProgressBar } from '@/components/ui';
import { mockTrainingModules } from '@/data/mockData';
import { formatNumber } from '@/utils';

const ModuleDetailPage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [isTraining, setIsTraining] = useState(false);
  
  // 根据ID查找训练模块
  const module = mockTrainingModules.find(m => m.id === moduleId);

  if (!module) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-responsive">
          <Card className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">训练模块不存在</h2>
            <p className="text-gray-600 mb-6">抱歉，您访问的训练模块不存在或已下线。</p>
            <Link to="/modules">
              <Button>返回模块列表</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'listening': return Headphones;
      case 'speaking': return MessageCircle;
      case 'conversation': return Users;
      case 'culture': return Globe;
      default: return BookOpen;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'listening': return '听力训练';
      case 'speaking': return '口语练习';
      case 'conversation': return '场景对话';
      case 'culture': return '文化学习';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'listening': return 'bg-blue-100 text-blue-800';
      case 'speaking': return 'bg-green-100 text-green-800';
      case 'conversation': return 'bg-purple-100 text-purple-800';
      case 'culture': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return '⭐'.repeat(difficulty);
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'text-green-600';
    if (difficulty <= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setProgress(0);
    setCurrentStep(1);
    setIsPlaying(false);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleStartTraining = () => {
    setIsTraining(true);
  };

  const handleCompleteTraining = () => {
    setIsTraining(false);
    setProgress(100);
    // 这里可以添加完成训练后的逻辑，比如保存进度、显示成绩等
  };

  const handleExitTraining = () => {
    setIsTraining(false);
  };

  // 模拟训练步骤
  const trainingSteps = [
    { id: 1, title: '听力理解', description: '听取音频内容，理解对话场景' },
    { id: 2, title: '词汇学习', description: '学习关键词汇和表达方式' },
    { id: 3, title: '跟读练习', description: '模仿发音，练习口语表达' },
    { id: 4, title: '情景应用', description: '在模拟场景中应用所学内容' },
    { id: 5, title: '综合测试', description: '测试学习效果和掌握程度' }
  ];

  const TypeIcon = getTypeIcon(module.type);

  // 如果正在训练，显示训练界面
  if (isTraining) {
    return (
      <TrainingInterface
        module={module}
        onComplete={handleCompleteTraining}
        onExit={handleExitTraining}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-responsive">
        {/* Breadcrumb */}
        <div className="flex items-center mb-8">
          <Link 
            to="/modules" 
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            返回模块列表
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Training Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Module Header */}
            <Card>
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <span className={`text-sm font-medium px-3 py-1 rounded-full mr-3 ${getTypeColor(module.type)}`}>
                      {getTypeLabel(module.type)}
                    </span>
                    <div className={`text-sm font-medium ${getDifficultyColor(module.difficulty)}`}>
                      {getDifficultyStars(module.difficulty)}
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {module.title}
                  </h1>
                  <p className="text-gray-600 mb-4">
                    {module.description}
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {module.duration} 分钟
                    </div>
                    <div className="flex items-center">
                      <Target size={16} className="mr-1" />
                      {module.scenario}
                    </div>
                    <div className="flex items-center">
                      <Star className="text-yellow-400 mr-1" size={16} />
                      {module.rating}
                    </div>
                  </div>
                </div>
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                  <TypeIcon className="text-primary-600" size={32} />
                </div>
              </div>
            </Card>

            {/* Training Interface */}
            <Card>
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  训练界面
                </h2>
                <p className="text-gray-600">
                  第 {currentStep} 步：{trainingSteps[currentStep - 1]?.title}
                </p>
              </div>

              {/* Training Content Area */}
              <div className="bg-gray-100 rounded-lg p-8 mb-6 text-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <TypeIcon className="text-primary-600" size={48} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {trainingSteps[currentStep - 1]?.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {trainingSteps[currentStep - 1]?.description}
                </p>

                {/* Audio Controls (for listening modules) */}
                {module.type === 'listening' && (
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <Button variant="outline" onClick={handleReset}>
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
                )}

                {/* Progress */}
                <div className="max-w-md mx-auto">
                  <ProgressBar
                    value={progress}
                    max={100}
                    showPercentage={true}
                    label="训练进度"
                  />
                </div>
              </div>

              {/* Training Controls */}
              <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  disabled={currentStep === 1}
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                >
                  上一步
                </Button>
                <div className="text-sm text-gray-500">
                  {currentStep} / {trainingSteps.length}
                </div>
                <Button 
                  disabled={currentStep === trainingSteps.length}
                  onClick={() => setCurrentStep(Math.min(trainingSteps.length, currentStep + 1))}
                >
                  下一步
                </Button>
              </div>
            </Card>

            {/* Training Steps */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">训练步骤</h3>
              <div className="space-y-3">
                {trainingSteps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      currentStep === step.id 
                        ? 'bg-primary-50 border border-primary-200' 
                        : currentStep > step.id
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      currentStep === step.id 
                        ? 'bg-primary-600 text-white' 
                        : currentStep > step.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {currentStep > step.id ? (
                        <CheckCircle size={16} />
                      ) : (
                        <span className="text-sm font-medium">{step.id}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Module Stats */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">模块统计</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">完成人数</span>
                  <span className="font-semibold text-gray-900">{formatNumber(module.completionCount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">平均用时</span>
                  <span className="font-semibold text-gray-900">{module.duration}分钟</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">用户评分</span>
                  <div className="flex items-center">
                    <Star className="text-yellow-400 mr-1" size={16} />
                    <span className="font-semibold text-gray-900">{module.rating}/5.0</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">难度等级</span>
                  <span className={`font-semibold ${getDifficultyColor(module.difficulty)}`}>
                    {getDifficultyStars(module.difficulty)}
                  </span>
                </div>
              </div>
            </Card>

            {/* Learning Tips */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">学习建议</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Target className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <div className="text-sm text-gray-600">
                    建议在安静的环境中进行训练，确保能够专注听取音频内容
                  </div>
                </div>
                <div className="flex items-start">
                  <TrendingUp className="text-green-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <div className="text-sm text-gray-600">
                    可以重复练习多次，直到完全掌握所有表达方式
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <div className="text-sm text-gray-600">
                    完成训练后会获得相应的学习积分和成就徽章
                  </div>
                </div>
              </div>
            </Card>

            {/* Related Modules */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">相关推荐</h3>
              <div className="space-y-3">
                {mockTrainingModules
                  .filter(m => m.id !== module.id && m.type === module.type)
                  .slice(0, 2)
                  .map((relatedModule) => {
                    const RelatedIcon = getTypeIcon(relatedModule.type);
                    return (
                      <Link 
                        key={relatedModule.id} 
                        to={`/modules/${relatedModule.id}`}
                        className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-start">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
                            <RelatedIcon className="text-primary-600" size={20} />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 text-sm mb-1">
                              {relatedModule.title}
                            </div>
                            <div className="text-xs text-gray-600 mb-2">
                              {relatedModule.duration}分钟 · {relatedModule.scenario}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeColor(relatedModule.type)}`}>
                                {getTypeLabel(relatedModule.type)}
                              </span>
                              <div className="flex items-center text-xs text-gray-500">
                                <Star className="text-yellow-400 mr-1" size={12} />
                                {relatedModule.rating}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </Card>

            {/* Action Buttons */}
            <Card>
              <div className="space-y-3">
                <Button className="w-full" size="lg" onClick={handleStartTraining}>
                  开始训练
                </Button>
                <Button variant="outline" className="w-full">
                  加入收藏
                </Button>
                <Button variant="ghost" className="w-full">
                  分享模块
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetailPage;
