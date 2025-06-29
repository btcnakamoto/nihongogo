/**
 * 功能描述：Nihongogo 系统核心类型定义
 * 输入参数：无
 * 返回值：TypeScript 类型定义
 * 用途说明：定义整个应用的数据结构和接口类型
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

// 用户相关类型
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level: 'beginner' | 'elementary' | 'intermediate' | 'advanced';
  joinDate: string;
  totalStudyTime: number; // 分钟
  currentStreak: number; // 连续学习天数
  isAuthenticated?: boolean;
}

// 认证相关类型
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// 试学相关类型
export interface TrialAccess {
  campId: string;
  sessionId: string; // 改为会话ID，支持匿名用户
  userId?: string; // 可选，登录用户才有
  startDate: string;
  expiryDate: string;
  remainingDays: number;
  accessedLessons: string[];
  maxLessons: number;
  status: 'active' | 'expired' | 'completed';
  isAnonymous: boolean; // 是否为匿名用户
}

export interface TrialProgress {
  campId: string;
  sessionId: string;
  currentLesson: number;
  totalTrialLessons: number;
  completedLessons: string[];
  timeSpent: number; // 分钟
  lastAccessDate: string;
  isAnonymous: boolean;
}

export interface TrialRestriction {
  maxDays: number;
  maxLessons: number;
  allowedFeatures: string[];
  restrictedFeatures: string[];
}

// 匿名试学会话类型
export interface AnonymousTrialSession {
  sessionId: string;
  campId: string;
  startDate: string;
  progress: TrialProgress;
  createdAt: string;
}

// 学习进度类型
export interface LearningProgress {
  courseId: string;
  courseName: string;
  currentDay: number;
  totalDays: number;
  completionRate: number; // 0-100
  dailyGoalMinutes: number;
  todayStudiedMinutes: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'paused';
}

// 学习模块类型
export type LearningModuleType = 'audio' | 'comprehension' | 'dictation' | 'speaking' | 'rewrite' | 'progress';

export interface LearningModuleState {
  moduleType?: LearningModuleType;
  isCompleted: boolean;
  score?: number;
  userInput?: string;
  attempts: number;
  timeSpent: number; // 秒
}

// 句子学习数据
export interface SentenceLearningData {
  id: string;
  japanese: string;
  furigana: string;
  chinese: string;
  grammar: string;
  audio: string;
  difficulty?: number;
  tags?: string[];
  culturalNote?: string;
  moduleStates?: Record<LearningModuleType, LearningModuleState>;
  isCompleted?: boolean;
  totalScore?: number;
}

// 语音识别结果
export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  accuracy: number;
  feedback: string[];
}

// 听写验证结果
export interface DictationResult {
  isCorrect: boolean;
  accuracy: number;
  errors: {
    position: number;
    expected: string;
    actual: string;
  }[];
  feedback: string;
}

// 智能学习状态
export interface CognitiveState {
  mode: 'focus' | 'relaxed' | 'intensive' | 'review';
  loadIndex: number; // 1-10
  suggestedDuration: number; // 分钟
  personalTrack: string;
  energyLevel: number; // 0-100
}

// 学习策略类型
export type LearningStrategy = 'analytical' | 'intuitive' | 'adaptive';

// 多元能力激活
export interface MultiModalActivation {
  chineseJapaneseBridge: {
    chineseWord: string;
    japaneseWord: string;
    kanjiAdvantage: boolean;
    comprehensionRate: number;
  };
  strategySelection: LearningStrategy;
  culturalContext: {
    theme: string;
    etiquette: string[];
    keigo: string;
  };
}

// 场景沉浸数据
export interface SceneImmersion {
  videoUrl: string;
  characterRole: string;
  culturalTips: string[];
  comprehensionLevel: number; // 0-10
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// 多模态输入状态
export interface MultiModalInput {
  dictation: {
    text: string;
    grammarVisualization: string[];
    chineseComparison: string;
  };
  voiceInput: {
    isRecording: boolean;
    duration: number;
    toneDetection: string;
    pronunciationScore: string;
    toneCurve: number[];
  };
  gestureInput: {
    currentGesture: string;
    gestureLibrary: string[];
    bodyLanguageScore: number;
  };
}

// 即时反馈分析
export interface InstantFeedback {
  languageAnalysis: {
    grammar: { correct: boolean; message: string };
    pronunciation: { score: string; issues: string[] };
    chineseInfluence: string;
    cognitiveLoad: 'low' | 'medium' | 'high';
    keigoUsage: string;
  };
  learningDiagnosis: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
    efficiency: number;
    nextChallenge: string;
  };
  progressTracking: {
    weeklyTrend: number[];
    breakthroughs: string[];
  };
}

// 社会化实践
export interface SocialPractice {
  rolePlay: {
    currentRole: string;
    availableRoles: string[];
    sceneOptions: string[];
  };
  collaboration: {
    onlinePeers: number;
    peerMessages: { name: string; message: string }[];
    teamChallenges: string[];
  };
  culturalExploration: {
    dailyCulturalPoint: string;
    topics: string[];
  };
}

// 日语特色学习
export interface JapaneseSpecialFeatures {
  kanjiAssociation: {
    kanji: string;
    chineseRoot: string;
    japaneseExtensions: string[];
    associations: string[];
  };
  keigoTraining: {
    level: 'sonkeigo' | 'kenjougo' | 'teineigo';
    scenarios: string[];
    exercises: string[];
  };
  tonePractice: {
    word: string;
    tonePattern: string;
    visualization: string;
    audioUrl: string;
  };
}

// 创造性应用
export interface CreativeApplication {
  situationInnovation: {
    dynamicScenario: string;
    impromptuElements: string[];
  };
  personalizedChallenge: {
    aiCustomChallenge: string;
    creativeMode: string;
    unlockConditions: string;
  };
}

// 智能规划
export interface IntelligentPlanning {
  dailySummary: {
    score: number;
    breakthroughs: string[];
    practiceTime: number;
    badges: string[];
  };
  tomorrowPrediction: {
    optimalTime: string;
    recommendedContent: string;
    expectedEffect: string;
  };
  longTermGoals: {
    monthlyGoal: string;
    progress: number;
    consecutiveDays: number;
  };
}

// 智能学习界面状态
export interface IntelligentLearningState {
  cognitiveState: CognitiveState;
  multiModalActivation: MultiModalActivation;
  sceneImmersion: SceneImmersion;
  multiModalInput: MultiModalInput;
  instantFeedback: InstantFeedback;
  socialPractice: SocialPractice;
  japaneseFeatures: JapaneseSpecialFeatures;
  creativeApplication: CreativeApplication;
  intelligentPlanning: IntelligentPlanning;
}

// 训练营类型
export interface TrainingCamp {
  id: string;
  title: string;
  description: string;
  duration: number; // 天数
  dailyMinutes: number;
  level: 'beginner' | 'elementary' | 'intermediate' | 'advanced';
  tags: string[];
  thumbnail: string;
  rating: number;
  studentCount: number;
  features: string[];
  phases: CampPhase[];
}

export interface CampPhase {
  id: string;
  title: string;
  description: string;
  duration: number; // 天数
  modules: string[];
  goals: string[];
}

// 训练模块类型
export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  type: 'listening' | 'speaking' | 'conversation' | 'culture';
  duration: number; // 分钟
  difficulty: 1 | 2 | 3 | 4 | 5;
  scenario: string;
  thumbnail: string;
  rating: number;
  completionCount: number;
}

// 学习统计类型
export interface LearningStats {
  weeklyMinutes: number;
  weeklyGrowth: number; // 百分比
  completionRate: number; // 百分比
  weakSkills: string[];
  strongSkills: string[];
  improvementAreas: {
    skill: string;
    improvement: number; // 百分比
  }[];
}

// AI 推荐类型
export interface AIRecommendation {
  id: string;
  type: 'skill_improvement' | 'daily_practice' | 'course_suggestion';
  title: string;
  description: string;
  reason: string;
  estimatedTime: number; // 分钟
  priority: 'low' | 'medium' | 'high';
  moduleId?: string;
  courseId?: string;
}

// 评估相关类型
export interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  estimatedTime: number; // 分钟
}

export interface AssessmentQuestion {
  id: string;
  type: 'multiple_choice' | 'listening' | 'speaking' | 'scenario';
  question: string;
  options?: string[];
  audioUrl?: string;
  correctAnswer?: string;
  points: number;
}

export interface AssessmentResult {
  assessmentId: string;
  score: number;
  maxScore: number;
  level: 'beginner' | 'elementary' | 'intermediate' | 'advanced';
  recommendations: string[];
  weakAreas: string[];
  strongAreas: string[];
}

// 今日推荐类型
export interface DailyRecommendation {
  id: string;
  title: string;
  type: 'scenario' | 'grammar' | 'vocabulary' | 'culture';
  duration: number; // 分钟
  rating: number;
  thumbnail: string;
  description: string;
  tags: string[];
}

// 路由相关类型
export type RouteParams = {
  courseId?: string;
  moduleId?: string;
  assessmentId?: string;
};

// API 响应类型
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 通用组件 Props 类型
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
