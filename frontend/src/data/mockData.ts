/**
 * 功能描述：Mock 数据定义，用于前端开发和测试
 * 输入参数：无
 * 返回值：各种模拟数据对象
 * 用途说明：提供开发阶段的模拟数据，避免依赖后端 API
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import { 
  User, 
  LearningProgress, 
  TrainingCamp, 
  TrainingModule, 
  LearningStats, 
  AIRecommendation, 
  Assessment,
  DailyRecommendation 
} from '@/types';

// 模拟用户数据
export const mockUser: User = {
  id: 'user_001',
  name: '田中さん',
  email: 'tanaka@example.com',
  avatar: '/avatars/user-avatar.jpg',
  level: 'elementary',
  joinDate: '2024-11-01',
  totalStudyTime: 1250, // 分钟
  currentStreak: 12
};

// 模拟学习进度
export const mockLearningProgress: LearningProgress = {
  courseId: 'camp_business_30',
  courseName: '30天职场专项训练营',
  currentDay: 12,
  totalDays: 30,
  completionRate: 40,
  dailyGoalMinutes: 25,
  todayStudiedMinutes: 15,
  status: 'in_progress'
};

// 模拟训练营数据
export const mockTrainingCamps: TrainingCamp[] = [
  {
    id: 'camp_breakthrough_90',
    title: '90天快速突破训练营',
    description: '从零基础到日常对话流畅，系统化学习路径',
    duration: 90,
    dailyMinutes: 35,
    level: 'beginner',
    tags: ['系统化', '零基础', '全面提升'],
    thumbnail: '/images/camp-90day.jpg',
    rating: 4.8,
    studentCount: 15420,
    features: [
      '90天完整学习路径',
      '每日35分钟高效训练',
      '4个阶段循序渐进',
      'AI智能纠错反馈',
      '真实场景模拟'
    ],
    phases: [
      {
        id: 'phase_1',
        title: '基础发音与问候',
        description: '掌握日语发音规则和基本问候表达',
        duration: 14,
        modules: ['pronunciation_basics', 'greetings', 'self_introduction'],
        goals: ['正确发音', '基本问候', '自我介绍']
      },
      {
        id: 'phase_2',
        title: '日常生活场景',
        description: '学习购物、用餐、交通等生活场景表达',
        duration: 28,
        modules: ['shopping', 'restaurant', 'transportation'],
        goals: ['生活对话', '场景应用', '文化理解']
      }
    ]
  },
  {
    id: 'camp_business_30',
    title: '30天职场专项训练',
    description: '掌握职场核心表达，胜任基础工作沟通',
    duration: 30,
    dailyMinutes: 25,
    level: 'intermediate',
    tags: ['职场专项', '商务沟通', '实用性强'],
    thumbnail: '/images/camp-business.jpg',
    rating: 4.9,
    studentCount: 8750,
    features: [
      '职场核心场景覆盖',
      '商务敬语系统学习',
      '会议沟通实战训练',
      '邮件写作技巧',
      '客户服务表达'
    ],
    phases: [
      {
        id: 'phase_business_1',
        title: '商务基础礼仪',
        description: '学习日本职场基本礼仪和表达',
        duration: 10,
        modules: ['business_greetings', 'office_etiquette'],
        goals: ['职场礼仪', '基础敬语', '自我介绍']
      }
    ]
  },
  {
    id: 'camp_travel_14',
    title: '14天旅游应急速成',
    description: '解决旅游中的基本沟通需求',
    duration: 14,
    dailyMinutes: 20,
    level: 'beginner',
    tags: ['旅游专用', '应急速成', '实用表达'],
    thumbnail: '/images/camp-travel.jpg',
    rating: 4.7,
    studentCount: 12300,
    features: [
      '旅游核心场景',
      '应急情况处理',
      '高频实用表达',
      '文化背景介绍',
      '发音重点训练'
    ],
    phases: [
      {
        id: 'phase_travel_1',
        title: '出行准备',
        description: '机场、酒店等基础场景',
        duration: 7,
        modules: ['airport', 'hotel', 'transportation'],
        goals: ['出行沟通', '住宿安排', '交通询问']
      }
    ]
  },
  {
    id: 'camp_conversation_45',
    title: '45天对话流畅训练营',
    description: '专注提升日语对话能力，从简单交流到复杂讨论',
    duration: 45,
    dailyMinutes: 30,
    level: 'intermediate',
    tags: ['对话专项', '口语提升', '实战训练'],
    thumbnail: '/images/camp-conversation.jpg',
    rating: 4.7,
    studentCount: 6890,
    features: [
      '真实对话场景模拟',
      'AI对话伙伴练习',
      '发音纠错系统',
      '表达能力评估',
      '文化背景讲解'
    ],
    phases: [
      {
        id: 'phase_conv_1',
        title: '基础对话技巧',
        description: '掌握日常对话的基本技巧和表达方式',
        duration: 15,
        modules: ['daily_conversation', 'question_answer', 'opinion_expression'],
        goals: ['流畅对话', '自然表达', '听力理解']
      },
      {
        id: 'phase_conv_2',
        title: '复杂话题讨论',
        description: '学习讨论复杂话题和表达个人观点',
        duration: 20,
        modules: ['topic_discussion', 'debate_skills', 'cultural_topics'],
        goals: ['深度交流', '观点表达', '文化理解']
      },
      {
        id: 'phase_conv_3',
        title: '高级对话技巧',
        description: '掌握高级对话技巧和修辞手法',
        duration: 10,
        modules: ['advanced_rhetoric', 'humor_expression', 'formal_discussion'],
        goals: ['高级表达', '幽默运用', '正式场合']
      }
    ]
  },
  {
    id: 'camp_jlpt_60',
    title: '60天JLPT N2冲刺营',
    description: '针对JLPT N2考试的系统化备考训练',
    duration: 60,
    dailyMinutes: 40,
    level: 'intermediate',
    tags: ['考试备考', 'JLPT N2', '系统复习'],
    thumbnail: '/images/camp-jlpt.jpg',
    rating: 4.9,
    studentCount: 4560,
    features: [
      'N2考点全覆盖',
      '真题模拟练习',
      '弱项针对训练',
      '考试技巧指导',
      '进度实时跟踪'
    ],
    phases: [
      {
        id: 'phase_jlpt_1',
        title: '基础知识巩固',
        description: '复习和巩固N3-N2级别的基础知识',
        duration: 20,
        modules: ['grammar_review', 'vocabulary_expansion', 'kanji_practice'],
        goals: ['语法掌握', '词汇扩充', '汉字熟练']
      },
      {
        id: 'phase_jlpt_2',
        title: '专项技能提升',
        description: '针对听力、阅读、语法等专项进行强化',
        duration: 25,
        modules: ['listening_practice', 'reading_comprehension', 'grammar_application'],
        goals: ['听力提升', '阅读理解', '语法运用']
      },
      {
        id: 'phase_jlpt_3',
        title: '模拟考试冲刺',
        description: '真题模拟和考试技巧训练',
        duration: 15,
        modules: ['mock_exams', 'test_strategies', 'time_management'],
        goals: ['考试技巧', '时间管理', '心理调节']
      }
    ]
  },
  {
    id: 'camp_anime_30',
    title: '30天动漫日语入门营',
    description: '通过动漫学习日语，轻松有趣的学习方式',
    duration: 30,
    dailyMinutes: 20,
    level: 'beginner',
    tags: ['动漫日语', '兴趣学习', '轻松入门'],
    thumbnail: '/images/camp-anime.jpg',
    rating: 4.6,
    studentCount: 9870,
    features: [
      '经典动漫台词学习',
      '日本文化背景',
      '有趣的学习方式',
      '声优发音模仿',
      '二次元文化解读'
    ],
    phases: [
      {
        id: 'phase_anime_1',
        title: '动漫基础表达',
        description: '学习动漫中常见的基础表达和问候语',
        duration: 10,
        modules: ['anime_greetings', 'basic_expressions', 'character_speech'],
        goals: ['基础表达', '发音模仿', '文化理解']
      },
      {
        id: 'phase_anime_2',
        title: '情感表达学习',
        description: '通过动漫学习各种情感的日语表达',
        duration: 15,
        modules: ['emotion_expression', 'relationship_terms', 'daily_situations'],
        goals: ['情感表达', '人际关系', '日常应用']
      },
      {
        id: 'phase_anime_3',
        title: '文化深度理解',
        description: '深入了解动漫背后的日本文化',
        duration: 5,
        modules: ['cultural_background', 'social_customs', 'modern_japan'],
        goals: ['文化理解', '社会认知', '现代日本']
      }
    ]
  }
];

// 模拟训练模块
export const mockTrainingModules: TrainingModule[] = [
  {
    id: 'module_listening_restaurant',
    title: '餐厅场景听力强化',
    description: '提升餐厅用餐场景的听力理解能力',
    type: 'listening',
    duration: 15,
    difficulty: 3,
    scenario: '餐厅用餐',
    thumbnail: '/images/module-restaurant.jpg',
    rating: 4.6,
    completionCount: 2340
  },
  {
    id: 'module_speaking_business',
    title: '商务会议口语练习',
    description: '练习商务会议中的核心表达',
    type: 'speaking',
    duration: 20,
    difficulty: 4,
    scenario: '商务会议',
    thumbnail: '/images/module-business.jpg',
    rating: 4.8,
    completionCount: 1890
  },
  {
    id: 'module_conversation_shopping',
    title: '购物场景对话模拟',
    description: '模拟真实购物场景的对话练习',
    type: 'conversation',
    duration: 12,
    difficulty: 2,
    scenario: '购物消费',
    thumbnail: '/images/module-shopping.jpg',
    rating: 4.5,
    completionCount: 3120
  },
  {
    id: 'module_listening_airport',
    title: '机场广播听力训练',
    description: '练习理解机场广播和航班信息',
    type: 'listening',
    duration: 18,
    difficulty: 3,
    scenario: '机场出行',
    thumbnail: '/images/module-airport.jpg',
    rating: 4.4,
    completionCount: 1560
  },
  {
    id: 'module_speaking_interview',
    title: '面试口语表达训练',
    description: '掌握日语面试中的自我介绍和回答技巧',
    type: 'speaking',
    duration: 25,
    difficulty: 4,
    scenario: '求职面试',
    thumbnail: '/images/module-interview.jpg',
    rating: 4.7,
    completionCount: 980
  },
  {
    id: 'module_conversation_hotel',
    title: '酒店入住对话练习',
    description: '学习酒店预订、入住、退房等场景对话',
    type: 'conversation',
    duration: 16,
    difficulty: 2,
    scenario: '酒店住宿',
    thumbnail: '/images/module-hotel.jpg',
    rating: 4.3,
    completionCount: 2780
  },
  {
    id: 'module_culture_festivals',
    title: '日本传统节日文化',
    description: '了解日本传统节日的文化背景和相关表达',
    type: 'culture',
    duration: 22,
    difficulty: 3,
    scenario: '文化学习',
    thumbnail: '/images/module-festivals.jpg',
    rating: 4.6,
    completionCount: 1340
  },
  {
    id: 'module_listening_train',
    title: '电车站台听力练习',
    description: '练习理解电车站台广播和乘车信息',
    type: 'listening',
    duration: 14,
    difficulty: 2,
    scenario: '交通出行',
    thumbnail: '/images/module-train.jpg',
    rating: 4.2,
    completionCount: 3450
  },
  {
    id: 'module_speaking_phone',
    title: '电话沟通口语训练',
    description: '练习电话预约、咨询、投诉等场景的口语表达',
    type: 'speaking',
    duration: 18,
    difficulty: 3,
    scenario: '电话沟通',
    thumbnail: '/images/module-phone.jpg',
    rating: 4.5,
    completionCount: 1670
  },
  {
    id: 'module_conversation_doctor',
    title: '医院就诊对话模拟',
    description: '学习在医院看病时的基本对话和表达',
    type: 'conversation',
    duration: 20,
    difficulty: 3,
    scenario: '医疗健康',
    thumbnail: '/images/module-doctor.jpg',
    rating: 4.4,
    completionCount: 890
  },
  {
    id: 'module_culture_business',
    title: '日本商务文化礼仪',
    description: '深入了解日本商务场合的文化礼仪和注意事项',
    type: 'culture',
    duration: 28,
    difficulty: 4,
    scenario: '商务文化',
    thumbnail: '/images/module-business-culture.jpg',
    rating: 4.8,
    completionCount: 1120
  },
  {
    id: 'module_listening_news',
    title: '新闻听力理解训练',
    description: '提升对日语新闻和时事报道的理解能力',
    type: 'listening',
    duration: 30,
    difficulty: 5,
    scenario: '新闻时事',
    thumbnail: '/images/module-news.jpg',
    rating: 4.7,
    completionCount: 560
  },
  {
    id: 'module_speaking_presentation',
    title: '演讲发表口语训练',
    description: '练习日语演讲和发表的技巧与表达',
    type: 'speaking',
    duration: 35,
    difficulty: 5,
    scenario: '演讲发表',
    thumbnail: '/images/module-presentation.jpg',
    rating: 4.9,
    completionCount: 340
  },
  {
    id: 'module_conversation_family',
    title: '家庭日常对话练习',
    description: '学习家庭成员间的日常对话和亲密表达',
    type: 'conversation',
    duration: 15,
    difficulty: 1,
    scenario: '家庭生活',
    thumbnail: '/images/module-family.jpg',
    rating: 4.3,
    completionCount: 4560
  },
  {
    id: 'module_culture_food',
    title: '日本饮食文化探索',
    description: '了解日本饮食文化和相关的表达方式',
    type: 'culture',
    duration: 25,
    difficulty: 2,
    scenario: '饮食文化',
    thumbnail: '/images/module-food.jpg',
    rating: 4.5,
    completionCount: 2890
  }
];

// 模拟学习统计
export const mockLearningStats: LearningStats = {
  weeklyMinutes: 180,
  weeklyGrowth: 20,
  completionRate: 95,
  weakSkills: ['敬语表达', '听力理解'],
  strongSkills: ['基础对话', '发音'],
  improvementAreas: [
    { skill: '听力理解', improvement: 15 },
    { skill: '敬语表达', improvement: 8 },
    { skill: '商务沟通', improvement: 12 }
  ]
};

// 模拟 AI 推荐
export const mockAIRecommendations: AIRecommendation[] = [
  {
    id: 'rec_001',
    type: 'skill_improvement',
    title: '敬语听力专项',
    description: '检测到"敬语表达"需要加强',
    reason: '在最近的学习中，敬语相关内容的正确率较低',
    estimatedTime: 15,
    priority: 'high',
    moduleId: 'module_keigo_listening'
  },
  {
    id: 'rec_002',
    type: 'daily_practice',
    title: '敬语口语练习',
    description: '巩固敬语表达的口语应用',
    reason: '配合听力训练，提升敬语综合运用能力',
    estimatedTime: 10,
    priority: 'medium',
    moduleId: 'module_keigo_speaking'
  }
];

// 模拟今日推荐
export const mockDailyRecommendations: DailyRecommendation[] = [
  {
    id: 'daily_001',
    title: '电话预约场景',
    type: 'scenario',
    duration: 8,
    rating: 4.8,
    thumbnail: '/images/daily-phone.jpg',
    description: '学习电话预约的常用表达和礼貌用语',
    tags: ['电话沟通', '预约', '礼貌用语']
  },
  {
    id: 'daily_002',
    title: '季节问候表达',
    type: 'culture',
    duration: 5,
    rating: 4.6,
    thumbnail: '/images/daily-seasons.jpg',
    description: '了解日本四季问候的文化背景和表达方式',
    tags: ['文化背景', '季节', '问候']
  }
];

// 模拟评估数据
export const mockAssessment: Assessment = {
  id: 'assessment_level',
  title: '日语水平快速评估',
  description: '通过2分钟的快速测试，了解你的当前日语水平',
  estimatedTime: 2,
  questions: [
    {
      id: 'q1',
      type: 'multiple_choice',
      question: '你的日语学习经验是？',
      options: [
        '完全零基础',
        '学过一些基础知识',
        '有一定基础，能进行简单对话',
        '中级水平，能应对大部分日常场景'
      ],
      points: 1
    },
    {
      id: 'q2',
      type: 'multiple_choice',
      question: '你的主要学习目标是？',
      options: [
        '日常生活交流',
        '职场商务沟通',
        '旅游应急需求',
        '考试或升学'
      ],
      points: 1
    }
  ]
};
