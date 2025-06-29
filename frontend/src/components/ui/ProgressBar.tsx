/**
 * 功能描述：进度条组件
 * 输入参数：ProgressBarProps 接口定义的属性
 * 返回值：React 进度条组件
 * 用途说明：显示学习进度、完成度等数值进度
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React from 'react';
import { ProgressBarProps } from '@/types';
import { clsx } from 'clsx';

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  showPercentage = false,
  color = 'primary',
  size = 'md',
  className
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'progress-sm',
    md: 'progress-md',
    lg: 'progress-lg'
  };

  const colorClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    success: 'bg-success-600',
    warning: 'bg-warning-600'
  };

  return (
    <div className={clsx('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-neutral-700">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm text-neutral-500">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className={clsx('progress-bar', sizeClasses[size])}>
        <div
          className={clsx('progress-fill', colorClasses[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
