/**
 * 功能描述：学习模块组件测试
 * 输入参数：测试用例和模拟数据
 * 返回值：Jest 测试结果
 * 用途说明：测试所有学习模块的功能和交互
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { 
  AudioModule, 
  ComprehensionModule, 
  DictationModule, 
  SpeakingModule, 
  RewriteModule, 
  ProgressModule 
} from '@/components/LearningModules';
import { SentenceLearningData, LearningModuleState, LearningModuleType } from '@/types';

// 模拟数据
const mockSentenceData: SentenceLearningData = {
  id: 'test_sentence_1',
  japanese: 'おはようございます。',
  furigana: 'おはようございます。',
  chinese: '早上好。',
  grammar: '这是一个基本的问候语。',
  audio: '/audio/test.mp3',
  moduleStates: {
    audio: { moduleType: 'audio', isCompleted: false, attempts: 0, timeSpent: 0 },
    comprehension: { moduleType: 'comprehension', isCompleted: false, attempts: 0, timeSpent: 0 },
    dictation: { moduleType: 'dictation', isCompleted: false, attempts: 0, timeSpent: 0 },
    speaking: { moduleType: 'speaking', isCompleted: false, attempts: 0, timeSpent: 0 },
    rewrite: { moduleType: 'rewrite', isCompleted: false, attempts: 0, timeSpent: 0 },
    progress: { moduleType: 'progress', isCompleted: false, attempts: 0, timeSpent: 0 },
  },
  isCompleted: false,
  totalScore: 0,
};

const mockModuleState: LearningModuleState = {
  moduleType: 'audio',
  isCompleted: false,
  attempts: 0,
  timeSpent: 0,
};

const mockOnStateUpdate = jest.fn();
const mockOnComplete = jest.fn();

// 模拟 Web Speech API
Object.defineProperty(window, 'speechSynthesis', {
  writable: true,
  value: {
    speak: jest.fn(),
    cancel: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    speaking: false,
    paused: false,
  },
});

Object.defineProperty(window, 'SpeechSynthesisUtterance', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    text: '',
    lang: '',
    rate: 1,
    pitch: 1,
    volume: 1,
    onend: null,
    onerror: null,
  })),
});

describe('LearningModules', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('AudioModule', () => {
    it('应该渲染音频模块', () => {
      render(
        <AudioModule
          sentenceData={mockSentenceData}
          moduleState={mockModuleState}
          onStateUpdate={mockOnStateUpdate}
          onComplete={mockOnComplete}
        />
      );

      expect(screen.getByText('🎧 听音频')).toBeInTheDocument();
      expect(screen.getByText('播放')).toBeInTheDocument();
      expect(screen.getByText('慢速播放')).toBeInTheDocument();
      expect(screen.getByText(mockSentenceData.japanese)).toBeInTheDocument();
    });

    it('应该处理播放按钮点击', () => {
      render(
        <AudioModule
          sentenceData={mockSentenceData}
          moduleState={mockModuleState}
          onStateUpdate={mockOnStateUpdate}
          onComplete={mockOnComplete}
        />
      );

      const playButton = screen.getByText('播放');
      fireEvent.click(playButton);

      expect(window.speechSynthesis.speak).toHaveBeenCalled();
    });
  });

  describe('ComprehensionModule', () => {
    it('应该渲染意思推测模块', () => {
      render(
        <ComprehensionModule
          sentenceData={mockSentenceData}
          moduleState={mockModuleState}
          onStateUpdate={mockOnStateUpdate}
          onComplete={mockOnComplete}
        />
      );

      expect(screen.getByText('🧠 意思推测')).toBeInTheDocument();
      expect(screen.getByText('我知道意思')).toBeInTheDocument();
      expect(screen.getByText('显示中文翻译')).toBeInTheDocument();
      expect(screen.getByText(mockSentenceData.japanese)).toBeInTheDocument();
    });

    it('应该显示翻译当点击显示按钮', () => {
      render(
        <ComprehensionModule
          sentenceData={mockSentenceData}
          moduleState={mockModuleState}
          onStateUpdate={mockOnStateUpdate}
          onComplete={mockOnComplete}
        />
      );

      const showButton = screen.getByText('显示中文翻译');
      fireEvent.click(showButton);

      expect(screen.getByText(mockSentenceData.chinese)).toBeInTheDocument();
      expect(mockOnStateUpdate).toHaveBeenCalled();
    });
  });

  describe('DictationModule', () => {
    it('应该渲染听写模块', () => {
      render(
        <DictationModule
          sentenceData={mockSentenceData}
          moduleState={mockModuleState}
          onStateUpdate={mockOnStateUpdate}
          onComplete={mockOnComplete}
        />
      );

      expect(screen.getByText('✍️ 听写输入')).toBeInTheDocument();
      expect(screen.getByText('播放音频')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('在这里输入您听到的日语...')).toBeInTheDocument();
    });

    it('应该处理用户输入和提交', () => {
      render(
        <DictationModule
          sentenceData={mockSentenceData}
          moduleState={mockModuleState}
          onStateUpdate={mockOnStateUpdate}
          onComplete={mockOnComplete}
        />
      );

      const textarea = screen.getByPlaceholderText('在这里输入您听到的日语...');
      fireEvent.change(textarea, { target: { value: 'おはようございます' } });

      const submitButton = screen.getByText('提交答案');
      fireEvent.click(submitButton);

      expect(mockOnStateUpdate).toHaveBeenCalled();
    });
  });

  describe('SpeakingModule', () => {
    it('应该渲染跟读模块', () => {
      render(
        <SpeakingModule
          sentenceData={mockSentenceData}
          moduleState={mockModuleState}
          onStateUpdate={mockOnStateUpdate}
          onComplete={mockOnComplete}
        />
      );

      expect(screen.getByText('🗣️ 跟读练习')).toBeInTheDocument();
      expect(screen.getByText('听标准发音')).toBeInTheDocument();
      expect(screen.getByText('开始录音')).toBeInTheDocument();
    });
  });

  describe('RewriteModule', () => {
    it('应该渲染改写挑战模块', () => {
      render(
        <RewriteModule
          sentenceData={mockSentenceData}
          moduleState={mockModuleState}
          onStateUpdate={mockOnStateUpdate}
          onComplete={mockOnComplete}
        />
      );

      expect(screen.getByText('🧩 改写挑战')).toBeInTheDocument();
      expect(screen.getByText('我来试试')).toBeInTheDocument();
      expect(screen.getByText(mockSentenceData.japanese)).toBeInTheDocument();
    });

    it('应该显示挑战内容当点击开始', () => {
      render(
        <RewriteModule
          sentenceData={mockSentenceData}
          moduleState={mockModuleState}
          onStateUpdate={mockOnStateUpdate}
          onComplete={mockOnComplete}
        />
      );

      const startButton = screen.getByText('我来试试');
      fireEvent.click(startButton);

      expect(screen.getByText('挑战任务')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('在这里输入您的创意句子...')).toBeInTheDocument();
    });
  });

  describe('ProgressModule', () => {
    const mockAllModuleStates = {
      audio: { moduleType: 'audio' as LearningModuleType, isCompleted: true, attempts: 1, timeSpent: 30 },
      comprehension: { moduleType: 'comprehension' as LearningModuleType, isCompleted: true, attempts: 1, timeSpent: 45 },
      dictation: { moduleType: 'dictation' as LearningModuleType, isCompleted: false, attempts: 0, timeSpent: 0 },
      speaking: { moduleType: 'speaking' as LearningModuleType, isCompleted: false, attempts: 0, timeSpent: 0 },
      rewrite: { moduleType: 'rewrite' as LearningModuleType, isCompleted: false, attempts: 0, timeSpent: 0 },
      progress: { moduleType: 'progress' as LearningModuleType, isCompleted: false, attempts: 0, timeSpent: 0 },
    };

    it('应该渲染进度模块', () => {
      render(
        <ProgressModule
          sentenceData={mockSentenceData}
          moduleState={mockModuleState}
          allModuleStates={mockAllModuleStates}
          onStateUpdate={mockOnStateUpdate}
          onComplete={mockOnComplete}
          onNextSentence={jest.fn()}
          isLastSentence={false}
          totalSentences={3}
          currentSentenceIndex={0}
        />
      );

      expect(screen.getByText('📊 学习总结')).toBeInTheDocument();
      expect(screen.getByText('加入收藏')).toBeInTheDocument();
      expect(screen.getByText('下一个句子')).toBeInTheDocument();
    });

    it('应该处理收藏功能', () => {
      // 模拟 localStorage
      const localStorageMock = {
        getItem: jest.fn(() => '[]'),
        setItem: jest.fn(),
      };
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      });

      render(
        <ProgressModule
          sentenceData={mockSentenceData}
          moduleState={mockModuleState}
          allModuleStates={mockAllModuleStates}
          onStateUpdate={mockOnStateUpdate}
          onComplete={mockOnComplete}
          onNextSentence={jest.fn()}
          isLastSentence={false}
          totalSentences={3}
          currentSentenceIndex={0}
        />
      );

      const favoriteButton = screen.getByText('加入收藏');
      fireEvent.click(favoriteButton);

      expect(localStorageMock.setItem).toHaveBeenCalled();
      expect(mockOnStateUpdate).toHaveBeenCalled();
    });
  });

  describe('模块集成测试', () => {
    it('应该正确处理模块状态更新', () => {
      const { rerender } = render(
        <AudioModule
          sentenceData={mockSentenceData}
          moduleState={mockModuleState}
          onStateUpdate={mockOnStateUpdate}
          onComplete={mockOnComplete}
        />
      );

      // 模拟完成状态
      const completedState: LearningModuleState = {
        ...mockModuleState,
        isCompleted: true,
        score: 95,
        attempts: 3,
        timeSpent: 120,
      };

      rerender(
        <AudioModule
          sentenceData={mockSentenceData}
          moduleState={completedState}
          onStateUpdate={mockOnStateUpdate}
          onComplete={mockOnComplete}
        />
      );

      expect(screen.getByText('听音频练习已完成')).toBeInTheDocument();
    });
  });
});
