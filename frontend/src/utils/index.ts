/**
 * 功能描述：通用工具函数集合
 * 输入参数：各种工具函数的参数
 * 返回值：各种工具函数的返回值
 * 用途说明：提供应用中常用的工具函数
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

/**
 * 格式化数字，添加千分位分隔符
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

/**
 * 格式化日期
 */
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('zh-CN');
};

/**
 * 截断文本
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * 获取级别标签
 */
export const getLevelLabel = (level: string): string => {
  switch (level) {
    case 'beginner': return '初级';
    case 'elementary': return '初中级';
    case 'intermediate': return '中级';
    case 'advanced': return '高级';
    default: return level;
  }
};

/**
 * 获取级别颜色样式
 */
export const getLevelColor = (level: string): string => {
  switch (level) {
    case 'beginner': return 'bg-green-100 text-green-800';
    case 'elementary': return 'bg-blue-100 text-blue-800';
    case 'intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'advanced': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

/**
 * 计算学习进度百分比
 */
export const calculateProgress = (current: number, total: number): number => {
  if (total === 0) return 0;
  return Math.min(Math.max((current / total) * 100, 0), 100);
};

/**
 * 格式化学习时长
 */
export const formatStudyTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}分钟`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}小时`;
  }
  return `${hours}小时${remainingMinutes}分钟`;
};

/**
 * 生成随机ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * 延迟函数
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * 检查是否为移动设备
 */
export const isMobile = (): boolean => {
  return window.innerWidth < 768;
};

/**
 * 平滑滚动到元素
 */
export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
