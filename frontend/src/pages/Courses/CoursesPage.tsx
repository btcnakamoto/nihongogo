/**
 * 功能描述：训练营列表页面组件
 * 输入参数：无
 * 返回值：React 训练营列表页面组件
 * 用途说明：展示所有可用的训练营，支持筛选和搜索功能
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Clock,
  Users,
  Star,
  BookOpen,
  Target,
  Calendar,
  Award,
  TrendingUp,
  Play
} from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { mockTrainingCamps } from '@/data/mockData';
import { getLevelLabel, getLevelColor, formatNumber } from '@/utils';
import { useAuth } from '@/contexts/AuthContext';

const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');

  // 处理试学按钮点击
  const handleTrialClick = (campId: string) => {
    // 直接跳转到新版5步学习流程试学页面，无需登录验证
    navigate(`/trial/${campId}/learning-v2`);
  };

  const levels = [
    { value: 'all', label: '全部级别' },
    { value: 'beginner', label: '初级' },
    { value: 'elementary', label: '初中级' },
    { value: 'intermediate', label: '中级' },
    { value: 'advanced', label: '高级' }
  ];

  const durations = [
    { value: 'all', label: '全部时长' },
    { value: 'short', label: '短期 (≤20天)' },
    { value: 'medium', label: '中期 (21-60天)' },
    { value: 'long', label: '长期 (>60天)' }
  ];

  const filteredCamps = mockTrainingCamps.filter(camp => {
    const matchesSearch = camp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         camp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || camp.level === selectedLevel;
    const matchesDuration = selectedDuration === 'all' || 
                           (selectedDuration === 'short' && camp.duration <= 20) ||
                           (selectedDuration === 'medium' && camp.duration > 20 && camp.duration <= 60) ||
                           (selectedDuration === 'long' && camp.duration > 60);
    
    return matchesSearch && matchesLevel && matchesDuration;
  });



  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            系统化训练营
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            选择最适合你的学习路径，从零基础到流畅对话，我们为你提供完整的学习体系
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="text-primary-600" size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{formatNumber(50000)}+</div>
            <div className="text-sm text-gray-600">学习用户</div>
          </Card>
          <Card className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">95%</div>
            <div className="text-sm text-gray-600">完课率</div>
          </Card>
          <Card className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Star className="text-yellow-600" size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">4.8</div>
            <div className="text-sm text-gray-600">平均评分</div>
          </Card>
          <Card className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Award className="text-blue-600" size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">30天</div>
            <div className="text-sm text-gray-600">平均突破</div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="搜索训练营..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Level Filter */}
            <div className="relative">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {levels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>

            {/* Duration Filter */}
            <div className="relative">
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {durations.map(duration => (
                  <option key={duration.value} value={duration.value}>
                    {duration.label}
                  </option>
                ))}
              </select>
              <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            找到 <span className="font-semibold text-gray-900">{filteredCamps.length}</span> 个训练营
          </p>
        </div>

        {/* Training Camps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredCamps.map((camp) => (
            <Card key={camp.id} className="overflow-hidden group">
              {/* Thumbnail */}
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center relative overflow-hidden">
                <BookOpen className="text-primary-600 group-hover:scale-110 transition-transform duration-300" size={48} />
                <div className="absolute top-4 left-4">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getLevelColor(camp.level)}`}>
                    {getLevelLabel(camp.level)}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="flex items-center bg-white bg-opacity-90 rounded-full px-2 py-1">
                    <Star className="text-yellow-400 mr-1" size={12} />
                    <span className="text-xs font-medium">{camp.rating}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {camp.title}
                </h3>
                <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                  {camp.description}
                </p>

                {/* Meta Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm text-neutral-500">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {camp.duration}天训练营
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      每日{camp.dailyMinutes}分钟
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-neutral-500">
                    <div className="flex items-center">
                      <Users size={14} className="mr-1" />
                      {formatNumber(camp.studentCount)}人已学习
                    </div>
                    <div className="flex items-center">
                      <Target size={14} className="mr-1" />
                      {camp.phases.length}个阶段
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {camp.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="tag tag-primary">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-neutral-900 mb-2">核心特色：</h4>
                  <ul className="space-y-1">
                    {camp.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center text-xs text-neutral-600">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Link to={`/courses/${camp.id}`} className="flex-1">
                    <Button className="w-full">
                      了解详情
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => handleTrialClick(camp.id)}
                  >
                    <Play size={16} className="mr-1" />
                    试学
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCamps.length === 0 && (
          <Card className="text-center py-12">
            <BookOpen className="mx-auto text-neutral-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-neutral-900 mb-2">
              没有找到匹配的训练营
            </h3>
            <p className="text-neutral-600 mb-4">
              尝试调整搜索条件或筛选器
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedLevel('all');
                setSelectedDuration('all');
              }}
            >
              重置筛选
            </Button>
          </Card>
        )}

        {/* CTA Section */}
        <Card className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              还不确定选择哪个训练营？
            </h2>
            <p className="text-neutral-600 mb-6">
              通过我们的智能评估系统，2分钟了解你的日语水平，获得个性化的训练营推荐
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/assessment">
                <Button size="lg">
                  <Target className="mr-2" size={20} />
                  开始免费评估
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="lg">
                  查看学习中心
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CoursesPage;
