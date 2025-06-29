/**
 * 功能描述：通用卡片组件
 * 输入参数：CardProps 接口定义的属性
 * 返回值：React 卡片组件
 * 用途说明：提供统一样式的卡片容器，支持不同的内边距和阴影效果
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React from 'react';
import { CardProps } from '@/types';
import { clsx } from 'clsx';

const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md',
  shadow = 'sm',
  ...props
}) => {
  const baseClasses = 'card';
  
  const paddingClasses = {
    sm: 'card-padding-sm',
    md: 'card-padding-md',
    lg: 'card-padding-lg'
  };

  const shadowClasses = {
    sm: 'card-shadow-sm',
    md: 'card-shadow-md',
    lg: 'card-shadow-lg'
  };

  const cardClasses = clsx(
    baseClasses,
    paddingClasses[padding],
    shadowClasses[shadow],
    className
  );

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;
