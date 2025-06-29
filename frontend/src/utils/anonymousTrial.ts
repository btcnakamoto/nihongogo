/**
 * 功能描述：匿名试学管理工具
 * 输入参数：试学相关数据
 * 返回值：试学会话管理方法
 * 用途说明：管理匿名用户的试学会话、进度存储和数据持久化
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import { AnonymousTrialSession, TrialProgress, TrialAccess } from '@/types';

const STORAGE_KEY = 'nihongogo_anonymous_trials';
const SESSION_DURATION_DAYS = 3;

// 生成唯一会话ID
export const generateSessionId = (): string => {
  return `trial_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// 获取所有匿名试学会话
export const getAnonymousTrialSessions = (): AnonymousTrialSession[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('获取匿名试学会话失败:', error);
    return [];
  }
};

// 保存匿名试学会话
export const saveAnonymousTrialSession = (session: AnonymousTrialSession): void => {
  try {
    const sessions = getAnonymousTrialSessions();
    const existingIndex = sessions.findIndex(s => s.sessionId === session.sessionId);
    
    if (existingIndex >= 0) {
      sessions[existingIndex] = session;
    } else {
      sessions.push(session);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.error('保存匿名试学会话失败:', error);
  }
};

// 获取特定训练营的试学会话
export const getTrialSessionForCamp = (campId: string): AnonymousTrialSession | null => {
  const sessions = getAnonymousTrialSessions();
  return sessions.find(s => s.campId === campId) || null;
};

// 创建新的匿名试学会话
export const createAnonymousTrialSession = (campId: string): AnonymousTrialSession => {
  const sessionId = generateSessionId();
  const startDate = new Date().toISOString();
  
  const session: AnonymousTrialSession = {
    sessionId,
    campId,
    startDate,
    createdAt: startDate,
    progress: {
      campId,
      sessionId,
      currentLesson: 1,
      totalTrialLessons: 3,
      completedLessons: [],
      timeSpent: 0,
      lastAccessDate: startDate,
      isAnonymous: true,
    }
  };
  
  saveAnonymousTrialSession(session);
  return session;
};

// 更新试学进度
export const updateTrialProgress = (sessionId: string, progress: Partial<TrialProgress>): void => {
  const sessions = getAnonymousTrialSessions();
  const sessionIndex = sessions.findIndex(s => s.sessionId === sessionId);
  
  if (sessionIndex >= 0) {
    sessions[sessionIndex].progress = {
      ...sessions[sessionIndex].progress,
      ...progress,
      lastAccessDate: new Date().toISOString(),
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }
};

// 获取试学访问权限
export const getTrialAccess = (campId: string): TrialAccess => {
  let session = getTrialSessionForCamp(campId);
  
  if (!session) {
    session = createAnonymousTrialSession(campId);
  }
  
  const startDate = new Date(session.startDate);
  const expiryDate = new Date(startDate.getTime() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000);
  const now = new Date();
  const remainingTime = expiryDate.getTime() - now.getTime();
  const remainingDays = Math.max(0, Math.ceil(remainingTime / (24 * 60 * 60 * 1000)));
  
  const status = remainingDays > 0 ? 'active' : 'expired';
  
  return {
    campId,
    sessionId: session.sessionId,
    startDate: session.startDate,
    expiryDate: expiryDate.toISOString(),
    remainingDays,
    accessedLessons: session.progress.completedLessons,
    maxLessons: session.progress.totalTrialLessons,
    status,
    isAnonymous: true,
  };
};

// 检查是否可以访问课程
export const canAccessLesson = (sessionId: string, lessonIndex: number): boolean => {
  const sessions = getAnonymousTrialSessions();
  const session = sessions.find(s => s.sessionId === sessionId);
  
  if (!session) return false;
  
  const access = getTrialAccess(session.campId);
  if (access.status === 'expired') return false;
  
  // 第一课总是可以访问，后续课程需要完成前面的课程
  return lessonIndex === 0 || session.progress.completedLessons.length >= lessonIndex;
};

// 标记课程完成
export const markLessonCompleted = (sessionId: string, lessonId: string): void => {
  const sessions = getAnonymousTrialSessions();
  const sessionIndex = sessions.findIndex(s => s.sessionId === sessionId);
  
  if (sessionIndex >= 0) {
    const session = sessions[sessionIndex];
    if (!session.progress.completedLessons.includes(lessonId)) {
      session.progress.completedLessons.push(lessonId);
      session.progress.lastAccessDate = new Date().toISOString();
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    }
  }
};

// 增加学习时间
export const addStudyTime = (sessionId: string, minutes: number): void => {
  const sessions = getAnonymousTrialSessions();
  const sessionIndex = sessions.findIndex(s => s.sessionId === sessionId);
  
  if (sessionIndex >= 0) {
    sessions[sessionIndex].progress.timeSpent += minutes;
    sessions[sessionIndex].progress.lastAccessDate = new Date().toISOString();
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }
};

// 清理过期的试学会话
export const cleanupExpiredSessions = (): void => {
  try {
    const sessions = getAnonymousTrialSessions();
    const now = new Date();
    
    const validSessions = sessions.filter(session => {
      const expiryDate = new Date(session.startDate);
      expiryDate.setDate(expiryDate.getDate() + SESSION_DURATION_DAYS + 7); // 保留7天缓冲期
      return expiryDate > now;
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(validSessions));
  } catch (error) {
    console.error('清理过期会话失败:', error);
  }
};

// 获取试学统计信息
export const getTrialStats = (): {
  totalSessions: number;
  activeSessions: number;
  totalStudyTime: number;
  completedLessons: number;
} => {
  const sessions = getAnonymousTrialSessions();
  const now = new Date();
  
  let activeSessions = 0;
  let totalStudyTime = 0;
  let completedLessons = 0;
  
  sessions.forEach(session => {
    const expiryDate = new Date(session.startDate);
    expiryDate.setDate(expiryDate.getDate() + SESSION_DURATION_DAYS);
    
    if (expiryDate > now) {
      activeSessions++;
    }
    
    totalStudyTime += session.progress.timeSpent;
    completedLessons += session.progress.completedLessons.length;
  });
  
  return {
    totalSessions: sessions.length,
    activeSessions,
    totalStudyTime,
    completedLessons,
  };
};

// 导出试学数据（用于用户注册后迁移数据）
export const exportTrialData = (): AnonymousTrialSession[] => {
  return getAnonymousTrialSessions();
};

// 清除所有匿名试学数据
export const clearAllTrialData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('清除试学数据失败:', error);
  }
};
