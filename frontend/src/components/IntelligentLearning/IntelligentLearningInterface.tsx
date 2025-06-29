/**
 * 功能描述：智能学习界面主组件
 * 输入参数：学习数据和回调函数
 * 返回值：React 智能学习界面组件
 * 用途说明：整合所有智能学习模块，提供完整的智能化学习体验
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React, { useState, useEffect } from 'react';
import CognitiveStatusBar from './CognitiveStatusBar';
import MultiModalActivation from './MultiModalActivation';
import SceneImmersion from './SceneImmersion';
import MultiModalInput from './MultiModalInput';
import InstantFeedback from './InstantFeedback';
import { IntelligentLearningState, LearningStrategy } from '@/types';

interface IntelligentLearningInterfaceProps {
  initialState?: Partial<IntelligentLearningState>;
  onStateChange?: (state: IntelligentLearningState) => void;
  className?: string;
}

const IntelligentLearningInterface: React.FC<IntelligentLearningInterfaceProps> = ({
  initialState,
  onStateChange,
  className = '',
}) => {
  // 初始化智能学习状态
  const [learningState, setLearningState] = useState<IntelligentLearningState>({
    cognitiveState: {
      mode: 'focus',
      loadIndex: 5,
      suggestedDuration: 15,
      personalTrack: '假名→汉字混合→敬语进阶',
      energyLevel: 82,
    },
    multiModalActivation: {
      chineseJapaneseBridge: {
        chineseWord: '点餐',
        japaneseWord: '注文',
        kanjiAdvantage: true,
        comprehensionRate: 95,
      },
      strategySelection: 'analytical',
      culturalContext: {
        theme: '居酒屋文化',
        etiquette: ['用餐礼仪', '点餐流程'],
        keigo: '敬语系统入门',
      },
    },
    sceneImmersion: {
      videoUrl: '/videos/ramen-shop.mp4',
      characterRole: '客人',
      culturalTips: ['进店要说「失礼します」', '点餐时使用敬语'],
      comprehensionLevel: 6,
      difficulty: 'intermediate',
    },
    multiModalInput: {
      dictation: {
        text: 'ラーメン を ____',
        grammarVisualization: ['[名词]', '[を]', '[动词]'],
        chineseComparison: '拉面(を)吃',
      },
      voiceInput: {
        isRecording: false,
        duration: 0,
        toneDetection: '2-1-3-1音调',
        pronunciationScore: 'B+',
        toneCurve: [2, 1, 3, 1],
      },
      gestureInput: {
        currentGesture: '鞠躬练习',
        gestureLibrary: ['鞠躬练习', '指向菜单', '招手示意', '双手接物'],
        bodyLanguageScore: 75,
      },
    },
    instantFeedback: {
      languageAnalysis: {
        grammar: { correct: true, message: '助词使用正确' },
        pronunciation: { score: 'B+', issues: ['音调需调整(2声调)', '清音浊音区分'] },
        chineseInfluence: '语序迁移成功',
        cognitiveLoad: 'medium',
        keigoUsage: '丁宁语使用恰当',
      },
      learningDiagnosis: {
        strengths: ['汉字理解', '语法结构'],
        weaknesses: ['音调掌握', '发音清晰度'],
        suggestions: ['多练音调变化', '注意清浊音区分', '增加口语练习'],
        efficiency: 88,
        nextChallenge: '谦让语',
      },
      progressTracking: {
        weeklyTrend: [65, 72, 78, 81, 85, 88, 92],
        breakthroughs: ['音调突破！', '敬语掌握'],
      },
    },
    socialPractice: {
      rolePlay: {
        currentRole: '客人',
        availableRoles: ['客人', '店员', '其他客人观察'],
        sceneOptions: ['拉面店', '寿司店', '便利店'],
      },
      collaboration: {
        onlinePeers: 3,
        peerMessages: [
          { name: '小田', message: '试试这个音调' },
          { name: '山田', message: '敬语用法很棒！' },
        ],
        teamChallenges: ['敬语接龙', '情景对话'],
      },
      culturalExploration: {
        dailyCulturalPoint: '拉面文化历史',
        topics: ['用餐礼仪详解', '关西vs关东方言'],
      },
    },
    japaneseFeatures: {
      kanjiAssociation: {
        kanji: '注文',
        chineseRoot: '注(专注)',
        japaneseExtensions: ['注意', '注目', '注射'],
        associations: ['注册', '文字', '专注'],
      },
      keigoTraining: {
        level: 'teineigo',
        scenarios: ['客人→店员', '自己→他人'],
        exercises: ['敬语等级选择', '使用场景训练'],
      },
      tonePractice: {
        word: 'ラーメン',
        tonePattern: '2-1-3-1',
        visualization: '○－＼○',
        audioUrl: '/audio/ramen-tone.mp3',
      },
    },
    creativeApplication: {
      situationInnovation: {
        dynamicScenario: '在忙碌的新宿车站便当店...',
        impromptuElements: ['突然售罄热门品', '排队人很多'],
      },
      personalizedChallenge: {
        aiCustomChallenge: '用3种敬语等级表达同一需求',
        creativeMode: '关西腔挑战',
        unlockConditions: '敬语准确率>85%',
      },
    },
    intelligentPlanning: {
      dailySummary: {
        score: 85,
        breakthroughs: ['音调掌握'],
        practiceTime: 30,
        badges: ['音调大师'],
      },
      tomorrowPrediction: {
        optimalTime: '明天晚上7:00-7:30',
        recommendedContent: '敬语系统',
        expectedEffect: '敬语提升',
      },
      longTermGoals: {
        monthlyGoal: '居酒屋流利对话',
        progress: 38,
        consecutiveDays: 12,
      },
    },
    ...initialState,
  });

  // 状态更新处理
  const updateLearningState = (updates: Partial<IntelligentLearningState>) => {
    const newState = { ...learningState, ...updates };
    setLearningState(newState);
    onStateChange?.(newState);
  };

  // 策略选择处理
  const handleStrategyChange = (strategy: LearningStrategy) => {
    updateLearningState({
      multiModalActivation: {
        ...learningState.multiModalActivation,
        strategySelection: strategy,
      },
    });
  };

  // 场景控制处理
  const [sceneControls, setSceneControls] = useState({
    isPlaying: false,
    currentSpeed: 1,
    showSubtitles: true,
    replayCount: 2,
  });

  const handlePlayPause = () => {
    setSceneControls(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const handleSpeedChange = (speed: number) => {
    setSceneControls(prev => ({ ...prev, currentSpeed: speed }));
  };

  const handleToggleSubtitles = () => {
    setSceneControls(prev => ({ ...prev, showSubtitles: !prev.showSubtitles }));
  };

  const handleReplay = () => {
    setSceneControls(prev => ({ ...prev, replayCount: prev.replayCount + 1 }));
  };

  const handleDifficultyChange = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    updateLearningState({
      sceneImmersion: {
        ...learningState.sceneImmersion,
        difficulty,
      },
    });
  };

  // 多模态输入处理
  const handleDictationChange = (text: string) => {
    updateLearningState({
      multiModalInput: {
        ...learningState.multiModalInput,
        dictation: {
          ...learningState.multiModalInput.dictation,
          text,
        },
      },
    });
  };

  const handleVoiceStart = () => {
    updateLearningState({
      multiModalInput: {
        ...learningState.multiModalInput,
        voiceInput: {
          ...learningState.multiModalInput.voiceInput,
          isRecording: true,
          duration: 0,
        },
      },
    });
  };

  const handleVoiceStop = () => {
    updateLearningState({
      multiModalInput: {
        ...learningState.multiModalInput,
        voiceInput: {
          ...learningState.multiModalInput.voiceInput,
          isRecording: false,
        },
      },
    });
  };

  const handleGestureStart = () => {
    console.log('开始手势录制');
  };

  const handleGestureStop = () => {
    console.log('停止手势录制');
  };

  return (
    <div className={`min-h-screen bg-neutral-50 ${className}`}>
      {/* 智能状态栏 */}
      <CognitiveStatusBar cognitiveState={learningState.cognitiveState} />

      {/* 多元能力激活区 */}
      <MultiModalActivation
        activationData={learningState.multiModalActivation}
        onStrategyChange={handleStrategyChange}
      />

      {/* 场景沉浸区 */}
      <SceneImmersion
        sceneData={learningState.sceneImmersion}
        onPlayPause={handlePlayPause}
        onSpeedChange={handleSpeedChange}
        onToggleSubtitles={handleToggleSubtitles}
        onReplay={handleReplay}
        onDifficultyChange={handleDifficultyChange}
        isPlaying={sceneControls.isPlaying}
        currentSpeed={sceneControls.currentSpeed}
        showSubtitles={sceneControls.showSubtitles}
        replayCount={sceneControls.replayCount}
      />

      {/* 多模态输入区 */}
      <MultiModalInput
        inputData={learningState.multiModalInput}
        onDictationChange={handleDictationChange}
        onVoiceStart={handleVoiceStart}
        onVoiceStop={handleVoiceStop}
        onGestureStart={handleGestureStart}
        onGestureStop={handleGestureStop}
      />

      {/* 即时反馈与分析区 */}
      <InstantFeedback feedbackData={learningState.instantFeedback} />
    </div>
  );
};

export default IntelligentLearningInterface;
