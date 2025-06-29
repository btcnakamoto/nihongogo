/**
 * 功能描述：个性化学习中心页面组件
 * 输入参数：无
 * 返回值：React 学习中心页面组件
 * 用途说明：展示学习进度、AI推荐、统计数据和今日推荐内容
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Play,
  Calendar,
  Settings,
  TrendingUp,
  Clock,
  Target,
  Star,
  BookOpen,
  Headphones,
  MessageCircle,
  Award,
  Zap
} from 'lucide-react';
import { Card, Button, ProgressBar } from '@/components/ui';
import { 
  mockUser, 
  mockLearningProgress, 
  mockLearningStats, 
  mockAIRecommendations,
  mockDailyRecommendations 
} from '@/data/mockData';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container-responsive">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-3">
                我的学习中心
              </h1>
              <p className="text-xl text-neutral-600">
                欢迎回来，<span className="text-primary-700 font-semibold">{mockUser.name}</span>！继续你的日语学习之旅
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-700">{mockUser.currentStreak}</div>
                <div className="text-sm text-neutral-500">连续天数</div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl flex items-center justify-center shadow-soft">
                <Award className="text-primary-700" size={28} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Course Progress */}
            <Card className="bg-gradient-card border-0 shadow-soft-lg">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                    <BookOpen className="text-white" size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900">主线学习</h2>
                </div>
                <Link to="/courses/settings">
                  <Button variant="ghost" size="sm" className="hover:bg-neutral-100">
                    <Settings size={16} className="mr-2" />
                    调整进度
                  </Button>
                </Link>
              </div>

              <div className="bg-gradient-to-r from-primary-50 via-white to-accent-50 rounded-2xl p-8 mb-8 border border-primary-100/50 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">
                      {mockLearningProgress.courseName}
                    </h3>
                    <p className="text-neutral-600 flex items-center">
                      <Calendar size={16} className="mr-2 text-primary-500" />
                      第{mockLearningProgress.currentDay}天 | 进度 {mockLearningProgress.completionRate}%
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                      {mockLearningProgress.currentDay}/{mockLearningProgress.totalDays}
                    </div>
                    <div className="text-sm text-neutral-500 font-medium">天</div>
                  </div>
                </div>

                <ProgressBar
                  value={mockLearningProgress.completionRate}
                  max={100}
                  showPercentage={false}
                  className="mb-6"
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-neutral-700">
                    <Target size={16} className="mr-2 text-secondary-500" />
                    <span className="font-medium">今日目标：商务会议表达 ({mockLearningProgress.dailyGoalMinutes}分钟)</span>
                  </div>
                  <div className="text-sm text-neutral-500 bg-white/80 px-3 py-1 rounded-lg">
                    已学习 <span className="font-semibold text-primary-600">{mockLearningProgress.todayStudiedMinutes}</span>/{mockLearningProgress.dailyGoalMinutes} 分钟
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Link to="/courses/current/continue" className="flex-1">
                  <Button className="w-full py-3 shadow-lg hover:shadow-xl">
                    <Play size={18} className="mr-2" />
                    继续学习
                  </Button>
                </Link>
                <Link to="/courses/current/plan">
                  <Button variant="outline" className="py-3 border-2 bg-white/80 hover:bg-white">
                    <Calendar size={18} className="mr-2" />
                    查看计划
                  </Button>
                </Link>
              </div>
            </Card>

            {/* AI Recommendations */}
            <Card className="bg-gradient-card border-0 shadow-soft-lg">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-secondary-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="text-white" size={20} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900">技能强化区</h2>
                    <p className="text-sm text-neutral-500">AI智能推荐</p>
                  </div>
                </div>
                <div className="bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-xs font-semibold">
                  🤖 AI推荐
                </div>
              </div>

              <div className="space-y-6">
                {mockAIRecommendations.map((rec) => (
                  <div key={rec.id} className="bg-gradient-to-r from-warning-50 to-secondary-50 border border-warning-200/50 rounded-2xl p-6 shadow-soft">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-warning-100 rounded-lg flex items-center justify-center mr-3">
                            <Target size={16} className="text-warning-600" />
                          </div>
                          <span className="text-sm font-semibold text-warning-800 bg-warning-100 px-3 py-1 rounded-full">
                            检测到"{rec.title.includes('敬语') ? '敬语表达' : rec.title}"需要加强
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-neutral-900 mb-2">{rec.title}</h3>
                        <p className="text-neutral-600 mb-4 leading-relaxed">{rec.description}</p>
                        <div className="flex items-center text-sm text-neutral-500 bg-white/80 px-3 py-1.5 rounded-lg w-fit">
                          <Clock size={14} className="mr-2 text-primary-500" />
                          <span className="font-medium">{rec.estimatedTime} 分钟</span>
                        </div>
                      </div>
                      <div className="ml-6 flex flex-col space-y-3">
                        <Button size="sm" className="px-6 shadow-lg">开始强化</Button>
                        <Button variant="ghost" size="sm" className="text-neutral-500 hover:text-neutral-700">稍后提醒</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Learning Stats */}
            <Card className="bg-gradient-card border-0 shadow-soft-lg">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-success-500 to-primary-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="text-white" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900">本周学习数据</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 text-center border border-primary-100/50">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {mockLearningStats.weeklyMinutes}
                  </div>
                  <div className="text-sm text-neutral-600 font-medium mb-2">学习时长(分钟)</div>
                  <div className="text-xs text-success-600 flex items-center justify-center bg-success-50 px-2 py-1 rounded-full">
                    <TrendingUp size={12} className="mr-1" />
                    比上周+{mockLearningStats.weeklyGrowth}%
                  </div>
                </div>

                <div className="bg-gradient-to-br from-success-50 to-primary-50 rounded-2xl p-6 text-center border border-success-100/50">
                  <div className="text-3xl font-bold text-success-600 mb-2">
                    {mockLearningStats.completionRate}%
                  </div>
                  <div className="text-sm text-neutral-600 font-medium mb-2">完成率</div>
                  <div className="text-lg">🎉</div>
                </div>

                <div className="bg-gradient-to-br from-warning-50 to-secondary-50 rounded-2xl p-6 border border-warning-100/50">
                  <div className="text-sm text-neutral-700 font-semibold mb-3">技能提升</div>
                  <div className="space-y-2">
                    {mockLearningStats.improvementAreas.slice(0, 2).map((area, index) => (
                      <div key={index} className="bg-white/80 rounded-lg p-2">
                        <div className="text-sm font-medium text-neutral-800">{area.skill}</div>
                        <div className="text-xs text-success-600 flex items-center mt-1">
                          <TrendingUp size={10} className="mr-1" />
                          已提升{area.improvement}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card className="bg-gradient-card border-0 shadow-soft-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-secondary-500 to-warning-500 rounded-lg flex items-center justify-center">
                  <Zap className="text-white" size={16} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">快速训练</h3>
              </div>
              <div className="space-y-4">
                {[
                  { to: "/modules/listening", icon: Headphones, label: "听力强化", color: "from-blue-500 to-blue-600" },
                  { to: "/modules/speaking", icon: MessageCircle, label: "口语练习", color: "from-green-500 to-green-600" },
                  { to: "/modules/conversation", icon: BookOpen, label: "场景对话", color: "from-purple-500 to-purple-600" }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link key={index} to={item.to}>
                      <Button variant="outline" className="w-full justify-start py-3 border-2 bg-white/80 hover:bg-white hover:shadow-lg group">
                        <div className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon size={16} className="text-white" />
                        </div>
                        <span className="font-medium">{item.label}</span>
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </Card>

            {/* Daily Recommendations */}
            <Card className="bg-gradient-card border-0 shadow-soft-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-primary-500 rounded-lg flex items-center justify-center">
                  <Star className="text-white" size={16} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">今日推荐</h3>
              </div>
              <div className="space-y-6">
                {mockDailyRecommendations.map((item) => (
                  <div key={item.id} className="bg-gradient-to-br from-white to-neutral-50/80 border border-neutral-200/50 rounded-2xl p-5 shadow-soft hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-neutral-900">{item.title}</h4>
                      <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                        <Star className="text-yellow-500 mr-1" size={12} />
                        <span className="text-xs font-semibold text-yellow-700">{item.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600 mb-4 leading-relaxed">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-neutral-500 bg-neutral-50 px-3 py-1 rounded-lg">
                        <Clock size={12} className="mr-1.5 text-primary-500" />
                        <span className="font-medium">{item.duration} 分钟</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-xs">收藏</Button>
                        <Button size="sm" className="text-xs shadow-lg">练习</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Achievement */}
            <Card className="bg-gradient-card border-0 shadow-soft-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-warning-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <Award className="text-white" size={16} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">学习成就</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-yellow-50 to-warning-50 border border-yellow-200/50 rounded-2xl p-4 shadow-soft">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-warning-500 rounded-xl flex items-center justify-center mr-4">
                      <Award className="text-white" size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-neutral-900">连续学习达人</div>
                      <div className="text-sm text-neutral-600">连续学习 <span className="font-semibold text-warning-600">{mockUser.currentStreak}</span> 天</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-primary-50 border border-blue-200/50 rounded-2xl p-4 shadow-soft">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-primary-500 rounded-xl flex items-center justify-center mr-4">
                      <Target className="text-white" size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-neutral-900">学习时长王者</div>
                      <div className="text-sm text-neutral-600">累计学习 <span className="font-semibold text-primary-600">{mockUser.totalStudyTime}</span> 分钟</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
