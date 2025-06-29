/**
 * 功能描述：训练营详情页面组件
 * 输入参数：通过路由参数获取训练营ID
 * 返回值：React 训练营详情页面组件
 * 用途说明：展示训练营的详细信息、学习路径、课程安排等
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  Calendar,
  Target,
  CheckCircle,
  Play,
  BookOpen,
  Award,
  TrendingUp,
  MessageCircle
} from 'lucide-react';
import { Card, Button, ProgressBar } from '@/components/ui';
import { mockTrainingCamps } from '@/data/mockData';
import { getLevelLabel, getLevelColor, formatNumber } from '@/utils';
import { useAuth } from '@/contexts/AuthContext';

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { state } = useAuth();

  // 根据ID查找训练营
  const camp = mockTrainingCamps.find(c => c.id === courseId);

  // 处理试学按钮点击
  const handleTrialClick = () => {
    // 直接跳转到新版5步学习流程试学页面，无需登录验证
    navigate(`/trial/${courseId}/learning-v2`);
  };

  if (!camp) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-responsive">
          <Card className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">训练营不存在</h2>
            <p className="text-gray-600 mb-6">抱歉，您访问的训练营不存在或已下线。</p>
            <Link to="/courses">
              <Button>返回训练营列表</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-responsive">
        {/* Breadcrumb */}
        <div className="flex items-center mb-8">
          <Link 
            to="/courses" 
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            返回训练营列表
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <Card>
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden">
                <BookOpen className="text-primary-600" size={64} />
                <div className="absolute top-4 left-4">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${getLevelColor(camp.level)}`}>
                    {getLevelLabel(camp.level)}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="flex items-center bg-white bg-opacity-90 rounded-full px-3 py-1">
                    <Star className="text-yellow-400 mr-1" size={16} />
                    <span className="font-medium">{camp.rating}</span>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {camp.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {camp.description}
              </p>

              {/* Meta Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Calendar className="mx-auto text-primary-600 mb-2" size={24} />
                  <div className="text-lg font-bold text-gray-900">{camp.duration}</div>
                  <div className="text-sm text-gray-600">天</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="mx-auto text-primary-600 mb-2" size={24} />
                  <div className="text-lg font-bold text-gray-900">{camp.dailyMinutes}</div>
                  <div className="text-sm text-gray-600">分钟/天</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="mx-auto text-primary-600 mb-2" size={24} />
                  <div className="text-lg font-bold text-gray-900">{formatNumber(camp.studentCount)}</div>
                  <div className="text-sm text-gray-600">学员</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Target className="mx-auto text-primary-600 mb-2" size={24} />
                  <div className="text-lg font-bold text-gray-900">{camp.phases.length}</div>
                  <div className="text-sm text-gray-600">阶段</div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {camp.tags.map((tag, index) => (
                  <span key={index} className="tag tag-primary">
                    {tag}
                  </span>
                ))}
              </div>
            </Card>

            {/* Features */}
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">核心特色</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {camp.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-0.5 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Learning Path */}
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">学习路径</h2>
              <div className="space-y-6">
                {camp.phases.map((phase, index) => (
                  <div key={phase.id} className="relative">
                    {/* Timeline Line */}
                    {index < camp.phases.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                    )}
                    
                    <div className="flex items-start">
                      {/* Phase Number */}
                      <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                        {index + 1}
                      </div>
                      
                      {/* Phase Content */}
                      <div className="flex-1 bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {phase.title}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {phase.duration}天
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">
                          {phase.description}
                        </p>
                        
                        {/* Goals */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">学习目标：</h4>
                          <div className="flex flex-wrap gap-2">
                            {phase.goals.map((goal, goalIndex) => (
                              <span key={goalIndex} className="tag tag-secondary">
                                {goal}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Modules */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">包含模块：</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {phase.modules.map((module, moduleIndex) => (
                              <div key={moduleIndex} className="text-xs text-gray-600 bg-white rounded px-2 py-1">
                                {module}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Sample Content */}
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">课程预览</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    第1天：基础问候表达
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleTrialClick}
                  >
                    <Play size={16} className="mr-1" />
                    免费试学
                  </Button>
                </div>
                <p className="text-gray-600 mb-4">
                  学习日语最基础的问候表达，包括早上好、你好、晚安等常用语句，掌握正确的发音和使用场景。
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock size={14} className="mr-1" />
                  预计学习时间：15分钟
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <Card>
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  限时优惠
                </div>
                <div className="text-lg text-gray-600">
                  现在加入享受早鸟价格
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <Button className="w-full" size="lg">
                  立即开始学习
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleTrialClick}
                >
                  <Play size={16} className="mr-2" />
                  免费试学3天
                </Button>
              </div>

              <div className="text-center text-sm text-gray-500">
                <p>30天无条件退款保证</p>
              </div>
            </Card>

            {/* Stats */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">学习数据</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">完课率</span>
                  <span className="font-semibold text-gray-900">95%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">平均学习时长</span>
                  <span className="font-semibold text-gray-900">{camp.duration}天</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">学员满意度</span>
                  <div className="flex items-center">
                    <Star className="text-yellow-400 mr-1" size={16} />
                    <span className="font-semibold text-gray-900">{camp.rating}/5.0</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Instructor */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">课程导师</h3>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <Award className="text-primary-600" size={20} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">AI智能导师</div>
                  <div className="text-sm text-gray-600">24小时在线指导</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                结合人工智能技术，为每位学员提供个性化的学习指导和实时反馈。
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <MessageCircle size={14} className="mr-1" />
                支持语音对话练习
              </div>
            </Card>

            {/* Related Courses */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">相关推荐</h3>
              <div className="space-y-3">
                {mockTrainingCamps
                  .filter(c => c.id !== camp.id)
                  .slice(0, 2)
                  .map((relatedCamp) => (
                    <Link 
                      key={relatedCamp.id} 
                      to={`/courses/${relatedCamp.id}`}
                      className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="font-medium text-gray-900 text-sm mb-1">
                        {relatedCamp.title}
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        {relatedCamp.duration}天 · {relatedCamp.dailyMinutes}分钟/天
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getLevelColor(relatedCamp.level)}`}>
                          {getLevelLabel(relatedCamp.level)}
                        </span>
                        <div className="flex items-center text-xs text-gray-500">
                          <Star className="text-yellow-400 mr-1" size={12} />
                          {relatedCamp.rating}
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
