/**
 * 功能描述：模块训练列表页面组件
 * 输入参数：无
 * 返回值：React 模块训练列表页面组件
 * 用途说明：展示所有可用的训练模块，支持按类型和难度筛选
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Clock, 
  Users, 
  Star, 
  Headphones,
  MessageCircle,
  BookOpen,
  Globe,
  Play,
  Target,
  TrendingUp
} from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { mockTrainingModules } from '@/data/mockData';
import { formatNumber } from '@/utils';

const ModulesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const moduleTypes = [
    { value: 'all', label: '全部类型', icon: BookOpen },
    { value: 'listening', label: '听力训练', icon: Headphones },
    { value: 'speaking', label: '口语练习', icon: MessageCircle },
    { value: 'conversation', label: '场景对话', icon: Users },
    { value: 'culture', label: '文化学习', icon: Globe }
  ];

  const difficulties = [
    { value: 'all', label: '全部难度' },
    { value: '1', label: '入门 ⭐' },
    { value: '2', label: '初级 ⭐⭐' },
    { value: '3', label: '中级 ⭐⭐⭐' },
    { value: '4', label: '中高级 ⭐⭐⭐⭐' },
    { value: '5', label: '高级 ⭐⭐⭐⭐⭐' }
  ];

  const filteredModules = mockTrainingModules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.scenario.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || module.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'all' || module.difficulty.toString() === selectedDifficulty;
    
    return matchesSearch && matchesType && matchesDifficulty;
  });

  const getTypeIcon = (type: string) => {
    const typeConfig = moduleTypes.find(t => t.value === type);
    return typeConfig?.icon || BookOpen;
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
    if (difficulty <= 2) return 'text-primary-600';
    if (difficulty <= 3) return 'text-warning-600';
    return 'text-error-600';
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            模块化训练
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            灵活选择训练模块，针对性提升特定技能，适合碎片化时间学习
          </p>
        </div>

        {/* Quick Access */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {moduleTypes.slice(1).map((type) => {
            const Icon = type.icon;
            const count = mockTrainingModules.filter(m => m.type === type.value).length;
            return (
              <Card 
                key={type.value} 
                className="text-center cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setSelectedType(type.value)}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${
                  selectedType === type.value ? 'bg-primary-600' : 'bg-primary-100'
                }`}>
                  <Icon className={selectedType === type.value ? 'text-white' : 'text-primary-600'} size={24} />
                </div>
                <div className="font-medium text-neutral-900 text-sm mb-1">{type.label}</div>
                <div className="text-xs text-neutral-500">{count} 个模块</div>
              </Card>
            );
          })}
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="text"
                placeholder="搜索训练模块..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="appearance-none bg-white border border-neutral-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {moduleTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-400" size={16} />
            </div>

            {/* Difficulty Filter */}
            <div className="relative">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="appearance-none bg-white border border-neutral-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </option>
                ))}
              </select>
              <Target className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-400" size={16} />
            </div>
          </div>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-neutral-600">
            找到 <span className="font-semibold text-neutral-900">{filteredModules.length}</span> 个训练模块
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredModules.map((module) => {
            const TypeIcon = getTypeIcon(module.type);
            return (
              <Card key={module.id} className="overflow-hidden group hover:shadow-lg transition-all">
                {/* Header */}
                <div className="relative">
                  <div className={`aspect-video flex items-center justify-center relative overflow-hidden ${
                    module.type === 'listening' ? 'bg-gradient-to-br from-accent-100 to-accent-200' :
                    module.type === 'speaking' ? 'bg-gradient-to-br from-primary-100 to-primary-200' :
                    module.type === 'conversation' ? 'bg-gradient-to-br from-secondary-100 to-secondary-200' :
                    'bg-gradient-to-br from-warning-100 to-warning-200'
                  }`}>
                    <TypeIcon className={`group-hover:scale-110 transition-transform duration-300 ${
                      module.type === 'listening' ? 'text-accent-600' :
                      module.type === 'speaking' ? 'text-primary-600' :
                      module.type === 'conversation' ? 'text-secondary-600' :
                      'text-warning-600'
                    }`} size={48} />
                    
                    {/* Type Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getTypeColor(module.type)}`}>
                        {getTypeLabel(module.type)}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-3 right-3">
                      <div className="flex items-center bg-white bg-opacity-90 rounded-full px-2 py-1">
                        <Star className="text-yellow-400 mr-1" size={12} />
                        <span className="text-xs font-medium">{module.rating}</span>
                      </div>
                    </div>

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-20">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <Play className="text-neutral-700 ml-1" size={20} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                      {module.title}
                    </h3>
                    <div className={`text-sm font-medium ${getDifficultyColor(module.difficulty)}`}>
                      {getDifficultyStars(module.difficulty)}
                    </div>
                  </div>

                  <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                    {module.description}
                  </p>

                  {/* Scenario */}
                  <div className="mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                      📍 {module.scenario}
                    </span>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {module.duration} 分钟
                    </div>
                    <div className="flex items-center">
                      <Users size={14} className="mr-1" />
                      {formatNumber(module.completionCount)} 人完成
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <Link to={`/modules/${module.id}`} className="flex-1">
                      <Button className="w-full">
                        开始训练
                      </Button>
                    </Link>
                    <Button variant="outline" size="md">
                      预览
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredModules.length === 0 && (
          <Card className="text-center py-12">
            <BookOpen className="mx-auto text-neutral-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-neutral-900 mb-2">
              没有找到匹配的训练模块
            </h3>
            <p className="text-neutral-600 mb-4">
              尝试调整搜索条件或筛选器
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
                setSelectedDifficulty('all');
              }}
            >
              重置筛选
            </Button>
          </Card>
        )}

        {/* CTA Section */}
        <Card className="text-center bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              想要更系统的学习？
            </h2>
            <p className="text-neutral-600 mb-6">
              模块训练适合针对性提升，如果你想要更完整的学习体验，可以尝试我们的系统化训练营
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button size="lg">
                  <BookOpen className="mr-2" size={20} />
                  查看训练营
                </Button>
              </Link>
              <Link to="/assessment">
                <Button variant="outline" size="lg">
                  <Target className="mr-2" size={20} />
                  水平评估
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ModulesPage;
