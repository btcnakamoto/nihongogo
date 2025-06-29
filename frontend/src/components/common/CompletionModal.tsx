/**
 * 功能描述：训练完成弹窗组件
 * 输入参数：完成状态、分数、回调函数等
 * 返回值：React 完成弹窗组件
 * 用途说明：显示训练完成后的成绩和奖励信息
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React from 'react';
import { 
  CheckCircle, 
  Star, 
  Award, 
  TrendingUp, 
  X,
  Share2,
  RotateCcw
} from 'lucide-react';
import { Card, Button } from '@/components/ui';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  totalQuestions: number;
  timeSpent: number; // 分钟
  moduleName: string;
  onRetry?: () => void;
  onShare?: () => void;
  onContinue?: () => void;
}

const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  onClose,
  score,
  totalQuestions,
  timeSpent,
  moduleName,
  onRetry,
  onShare,
  onContinue
}) => {
  if (!isOpen) return null;

  const percentage = Math.round((score / totalQuestions) * 100);
  const isPerfect = score === totalQuestions;
  const isGood = percentage >= 80;
  const isPass = percentage >= 60;

  const getPerformanceMessage = () => {
    if (isPerfect) return '完美表现！';
    if (isGood) return '表现优秀！';
    if (isPass) return '通过训练！';
    return '继续努力！';
  };

  const getPerformanceColor = () => {
    if (isPerfect) return 'text-purple-600';
    if (isGood) return 'text-green-600';
    if (isPass) return 'text-blue-600';
    return 'text-orange-600';
  };

  const getStarCount = () => {
    if (isPerfect) return 3;
    if (isGood) return 2;
    if (isPass) return 1;
    return 0;
  };

  const achievements = [
    { 
      condition: isPerfect, 
      title: '完美主义者', 
      description: '全部答对！', 
      icon: '🏆' 
    },
    { 
      condition: timeSpent <= 10, 
      title: '速度之星', 
      description: '快速完成训练', 
      icon: '⚡' 
    },
    { 
      condition: isGood, 
      title: '学习达人', 
      description: '优秀的学习表现', 
      icon: '📚' 
    }
  ].filter(achievement => achievement.condition);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">训练完成</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-600" size={48} />
          </div>
          <h3 className={`text-2xl font-bold mb-2 ${getPerformanceColor()}`}>
            {getPerformanceMessage()}
          </h3>
          <p className="text-gray-600">
            你已完成「{moduleName}」的训练
          </p>
        </div>

        {/* Stars */}
        <div className="flex justify-center mb-6">
          {[1, 2, 3].map((star) => (
            <Star
              key={star}
              className={`mx-1 ${
                star <= getStarCount()
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
              size={32}
            />
          ))}
        </div>

        {/* Score */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-600">
                {score}/{totalQuestions}
              </div>
              <div className="text-sm text-gray-600">正确率</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600">
                {percentage}%
              </div>
              <div className="text-sm text-gray-600">得分</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600">
                {timeSpent}
              </div>
              <div className="text-sm text-gray-600">分钟</div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Award className="mr-2 text-yellow-600" size={20} />
              获得成就
            </h4>
            <div className="space-y-2">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="text-2xl mr-3">{achievement.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900">{achievement.title}</div>
                    <div className="text-sm text-gray-600">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Info */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2">
            <TrendingUp className="text-blue-600 mr-2" size={16} />
            <span className="text-sm font-medium text-blue-900">学习进度</span>
          </div>
          <p className="text-sm text-blue-800">
            恭喜你完成了这个训练模块！继续保持学习的节奏，你的日语水平正在稳步提升。
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {onContinue && (
            <Button className="w-full" onClick={onContinue}>
              继续下一个模块
            </Button>
          )}
          
          <div className="grid grid-cols-2 gap-3">
            {onRetry && (
              <Button variant="outline" onClick={onRetry}>
                <RotateCcw size={16} className="mr-2" />
                重新训练
              </Button>
            )}
            {onShare && (
              <Button variant="outline" onClick={onShare}>
                <Share2 size={16} className="mr-2" />
                分享成果
              </Button>
            )}
          </div>

          <Button variant="ghost" className="w-full" onClick={onClose}>
            返回模块详情
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CompletionModal;
