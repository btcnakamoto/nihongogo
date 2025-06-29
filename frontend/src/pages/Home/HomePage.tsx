/**
 * 功能描述：智能引导首页组件
 * 输入参数：无
 * 返回值：React 首页组件
 * 用途说明：提供学习方式选择、快速评估和智能推荐功能
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Zap, BookOpen, Headphones, MessageCircle, Users, Star, Clock, Brain, Sparkles } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { mockTrainingCamps } from '@/data/mockData';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Target,
      title: '智能评估',
      description: '2分钟快速了解你的日语水平'
    },
    {
      icon: BookOpen,
      title: '系统化训练营',
      description: '90天快速突破、30天职场专项等完整学习路径'
    },
    {
      icon: Headphones,
      title: '听力强化',
      description: '真实场景长句听力理解训练'
    },
    {
      icon: MessageCircle,
      title: 'AI对话练习',
      description: '智能对话引导与实时纠错反馈'
    }
  ];

  const popularCamps = mockTrainingCamps.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/15 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-200/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

        <div className="container-responsive relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-primary-200/50 text-primary-700 text-sm font-semibold mb-8 animate-fade-in-up">
              <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse-soft"></span>
              全新 AI 驱动的日语学习体验
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span className="text-primary-800">开始你的</span>
              <br />
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 bg-clip-text text-transparent">
                日语学习之旅
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-primary-700 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              专为中文母语学习者打造的日语实用场景输出训练平台
              <br />
              <span className="text-primary-800 font-semibold">聚焦真实场景下的听力理解与口语表达能力</span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/assessment" className="group">
                <Button size="lg" className="w-full sm:w-auto px-8 py-4 text-lg shadow-xl hover:shadow-2xl">
                  <Target className="mr-3 group-hover:rotate-12 transition-transform duration-300" size={22} />
                  开始免费评估
                </Button>
              </Link>
              <Link to="/courses" className="group">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4 text-lg border-2 bg-white/80 backdrop-blur-sm hover:bg-white">
                  <BookOpen className="mr-3 group-hover:scale-110 transition-transform duration-300" size={22} />
                  浏览训练营
                </Button>
              </Link>
              <Link to="/demo/learning-modules" className="group">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8 py-4 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0 shadow-lg hover:shadow-xl">
                  <Zap className="mr-3 group-hover:scale-110 transition-transform duration-300" size={22} />
                  体验学习模块
                </Button>
              </Link>
            </div>

            {/* 智能学习系统预览 */}
            <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl p-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Brain className="text-purple-600" size={32} />
                  <h2 className="text-2xl font-bold text-purple-900">🧠 智能学习系统</h2>
                </div>
                <p className="text-purple-800 mb-6 text-lg">
                  全新AI驱动的个性化学习体验，实时监控认知状态，多模态交互，沉浸式场景练习
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl mb-2">🧠</div>
                    <div className="text-sm font-medium text-purple-800">认知监控</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl mb-2">🎭</div>
                    <div className="text-sm font-medium text-purple-800">沉浸场景</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl mb-2">🎤</div>
                    <div className="text-sm font-medium text-purple-800">多模交互</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl mb-2">📊</div>
                    <div className="text-sm font-medium text-purple-800">智能分析</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/demo/intelligent-learning" className="group">
                    <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white border-0 shadow-lg hover:shadow-xl px-6 py-3">
                      <Brain className="mr-2 group-hover:rotate-12 transition-transform duration-300" size={20} />
                      演示体验
                    </Button>
                  </Link>
                  <Link to="/intelligent-learning/camp_1" className="group">
                    <Button variant="outline" size="lg" className="border-2 border-purple-600 text-purple-700 hover:bg-purple-50 px-6 py-3">
                      <Sparkles className="mr-2 group-hover:scale-110 transition-transform duration-300" size={20} />
                      完整体验
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {[
                { number: '50,000+', label: '学习用户', icon: '👥' },
                { number: '95%', label: '完课率', icon: '🎯' },
                { number: '4.8', label: '用户评分', icon: '⭐' },
                { number: '30天', label: '平均突破', icon: '🚀' }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl shadow-soft group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-primary-700 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path Selection */}
      <section className="py-24 relative">
        <div className="container-responsive">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-primary-50 rounded-full text-primary-700 text-sm font-semibold mb-6">
              🎯 个性化学习路径
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
              选择最适合你的
              <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent"> 学习方式</span>
            </h2>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto leading-relaxed">
              我们提供两种学习路径，让你根据自己的时间安排和学习目标选择最佳方案
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* 系统化训练营 */}
            <Card className="relative overflow-hidden group card-hover bg-gradient-card border-0 shadow-soft-lg">
              {/* 推荐标签 */}
              <div className="absolute top-6 right-6 z-10">
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  🔥 推荐
                </div>
              </div>

              {/* 背景装饰 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100/50 to-primary-200/30 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

              <div className="p-10 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="text-white" size={28} />
                </div>

                <h3 className="text-2xl font-bold text-primary-800 mb-4">系统化训练营</h3>
                <p className="text-primary-700 mb-8 text-lg leading-relaxed">
                  明确的学习目标和时间规划，循序渐进的难度设计，完整的学习闭环和成就感
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    { text: '90天快速突破训练营', icon: '🚀' },
                    { text: '30天职场专项训练', icon: '💼' },
                    { text: '14天旅游应急速成', icon: '✈️' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center text-primary-800">
                      <span className="text-lg mr-3">{item.icon}</span>
                      <span className="font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>

                <Link to="/assessment">
                  <Button className="w-full py-4 text-lg shadow-lg hover:shadow-xl">
                    开始评估推荐
                  </Button>
                </Link>
              </div>
            </Card>

            {/* 模块化训练 */}
            <Card className="relative overflow-hidden group card-hover bg-gradient-card border-0 shadow-soft-lg">
              {/* 背景装饰 */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-secondary-100/40 to-secondary-200/30 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

              <div className="p-10 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="text-white" size={28} />
                </div>

                <h3 className="text-2xl font-bold text-primary-800 mb-4">自由模块训练</h3>
                <p className="text-primary-700 mb-8 text-lg leading-relaxed">
                  灵活的学习安排，针对性技能提升，快速解决特定问题，适合碎片化时间
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    { text: '听力强化训练', icon: '🎧' },
                    { text: '口语练习模块', icon: '🗣️' },
                    { text: '场景对话模拟', icon: '💬' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center text-primary-800">
                      <span className="text-lg mr-3">{item.icon}</span>
                      <span className="font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>

                <Link to="/modules">
                  <Button variant="outline" className="w-full py-4 text-lg border-2 hover:bg-white hover:shadow-lg">
                    进入模块库
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container-responsive">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-primary-50 rounded-full text-primary-700 text-sm font-semibold mb-6">
              ✨ 核心优势
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
              为什么选择
              <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent"> Nihongogo</span>
            </h2>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto leading-relaxed">
              专注实用场景，AI智能辅助，让你的日语学习更高效
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center group card-hover bg-gradient-card border-0 shadow-soft">
                  <div className="w-16 h-16 bg-gradient-to-br from-fresh-100 to-fresh-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
                    <Icon className="text-primary-600" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-primary-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-primary-700 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-24 relative">
        <div className="container-responsive">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-secondary-100 rounded-full text-secondary-700 text-sm font-semibold mb-6">
              🏆 热门推荐
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
              热门
              <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent"> 训练营</span>
            </h2>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto leading-relaxed">
              最受欢迎的学习路径，帮助你快速提升日语能力
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {popularCamps.map((camp) => (
              <Card key={camp.id} className="overflow-hidden group card-hover bg-gradient-card border-0 shadow-soft-lg">
                <div className="aspect-video bg-gradient-to-br from-fresh-100 via-primary-50 to-fresh-100 flex items-center justify-center relative overflow-hidden">
                  <BookOpen className="text-primary-600 group-hover:scale-110 transition-transform duration-500" size={56} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      camp.level === 'beginner' ? 'bg-success-100 text-success-800' :
                      camp.level === 'intermediate' ? 'bg-warning-100 text-warning-800' :
                      'bg-error-100 text-error-800'
                    }`}>
                      {camp.level === 'beginner' ? '初级' : camp.level === 'intermediate' ? '中级' : '高级'}
                    </span>
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                      <Star className="text-yellow-500 mr-1" size={14} />
                      <span className="text-sm font-semibold text-yellow-700">{camp.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-primary-800 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    {camp.title}
                  </h3>
                  <p className="text-primary-700 mb-6 leading-relaxed">
                    {camp.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-primary-600 mb-6">
                    <div className="flex items-center bg-fresh-50 px-3 py-1.5 rounded-lg">
                      <Clock size={14} className="mr-1.5 text-primary-500" />
                      <span className="font-medium">{camp.duration}天 · 每日{camp.dailyMinutes}分钟</span>
                    </div>
                    <div className="flex items-center bg-fresh-50 px-3 py-1.5 rounded-lg">
                      <Users size={14} className="mr-1.5 text-accent-500" />
                      <span className="font-medium">{camp.studentCount.toLocaleString()}人</span>
                    </div>
                  </div>

                  <Link to={`/courses/${camp.id}`}>
                    <Button variant="outline" className="w-full py-3 border-2 hover:bg-white hover:shadow-lg group-hover:border-primary-300">
                      了解详情
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/courses">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-xl">
                查看全部训练营
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
