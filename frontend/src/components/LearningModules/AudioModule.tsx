/**
 * 功能描述：听音频学习模块
 * 输入参数：句子数据和状态更新回调
 * 返回值：React 听音频模块组件
 * 用途说明：提供音频播放、慢速播放、重听功能，显示播放状态指示器
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { SentenceLearningData, LearningModuleState } from '@/types';
import { globalSpeechSynthesizer } from '@/utils/speechUtils';

interface AudioModuleProps {
  sentenceData: SentenceLearningData;
  moduleState: LearningModuleState;
  onStateUpdate: (state: Partial<LearningModuleState>) => void;
  onComplete: () => void;
}

const AudioModule: React.FC<AudioModuleProps> = ({
  sentenceData,
  moduleState,
  onStateUpdate,
  onComplete,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<'normal' | 'slow'>('normal');
  const [playCount, setPlayCount] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (!startTime) {
      setStartTime(Date.now());
    }
  }, []);

  useEffect(() => {
    // 当播放次数达到3次时自动完成模块
    if (playCount >= 3 && !moduleState.isCompleted) {
      handleComplete();
    }
  }, [playCount, moduleState.isCompleted]);

  const handlePlay = async (rate: 'normal' | 'slow' = 'normal') => {
    if (isPlaying) {
      globalSpeechSynthesizer.stop();
      setIsPlaying(false);
      return;
    }

    try {
      setIsPlaying(true);
      setPlaybackRate(rate);

      // 设置播放速度
      const speechRate = rate === 'slow' ? 0.6 : 0.8;
      globalSpeechSynthesizer.updateConfig({ rate: speechRate });

      await globalSpeechSynthesizer.speak(
        sentenceData.japanese,
        () => {
          setIsPlaying(false);
          setPlayCount(prev => prev + 1);
          
          // 更新模块状态
          const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
          onStateUpdate({
            attempts: playCount + 1,
            timeSpent,
          });
        },
        (error) => {
          console.error('语音播放失败:', error);
          setIsPlaying(false);
        }
      );
    } catch (error) {
      console.error('语音播放失败:', error);
      setIsPlaying(false);
    }
  };

  const handleReplay = () => {
    handlePlay(playbackRate);
  };

  const handleComplete = () => {
    const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    onStateUpdate({
      isCompleted: true,
      timeSpent,
      attempts: playCount,
    });
    onComplete();
  };

  return (
    <Card className="bg-white border-2 border-primary-200 shadow-soft">
      <div className="text-center space-y-6">
        {/* 模块标题 */}
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <Volume2 className="text-primary-600" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-neutral-900">🎧 听音频</h3>
            <p className="text-sm text-neutral-600">仔细听句子的发音，注意语调和重音</p>
          </div>
        </div>

        {/* 句子显示区域 */}
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-6">
          <div className="space-y-4">
            {/* 日语原文 */}
            <div className="text-2xl font-bold text-neutral-900 font-japanese leading-relaxed">
              {sentenceData.japanese}
            </div>
            
            {/* 假名注音 */}
            <div className="text-lg text-neutral-600 font-japanese">
              {sentenceData.furigana}
            </div>
            
            {/* 中文翻译 */}
            <div className="text-lg text-neutral-800 font-medium">
              {sentenceData.chinese}
            </div>
          </div>
        </div>

        {/* 播放状态指示器 */}
        <div className="flex items-center justify-center space-x-4">
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-colors ${
            isPlaying ? 'bg-primary-100 text-primary-700' : 'bg-neutral-100 text-neutral-600'
          }`}>
            {isPlaying ? (
              <>
                <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">
                  播放中 ({playbackRate === 'slow' ? '慢速' : '正常'})
                </span>
              </>
            ) : (
              <>
                <VolumeX size={16} />
                <span className="text-sm">未播放</span>
              </>
            )}
          </div>
          
          <div className="text-sm text-neutral-500">
            已播放 {playCount} 次
          </div>
        </div>

        {/* 控制按钮 */}
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => handlePlay('normal')}
            variant={isPlaying && playbackRate === 'normal' ? 'secondary' : 'primary'}
            size="lg"
            className="min-w-[120px]"
          >
            {isPlaying && playbackRate === 'normal' ? (
              <>
                <Pause size={20} className="mr-2" />
                暂停
              </>
            ) : (
              <>
                <Play size={20} className="mr-2" />
                播放
              </>
            )}
          </Button>

          <Button
            onClick={() => handlePlay('slow')}
            variant={isPlaying && playbackRate === 'slow' ? 'secondary' : 'outline'}
            size="lg"
            className="min-w-[120px]"
          >
            {isPlaying && playbackRate === 'slow' ? (
              <>
                <Pause size={20} className="mr-2" />
                暂停慢速
              </>
            ) : (
              <>
                <Play size={20} className="mr-2" />
                慢速播放
              </>
            )}
          </Button>

          <Button
            onClick={handleReplay}
            variant="outline"
            size="lg"
            disabled={playCount === 0}
          >
            <RotateCcw size={20} className="mr-2" />
            重听
          </Button>
        </div>

        {/* 进度提示 */}
        {playCount > 0 && !moduleState.isCompleted && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              {playCount < 3 ? (
                <>建议再听 {3 - playCount} 次以加深印象</>
              ) : (
                <>很好！您已经充分练习了听力，可以进入下一步了</>
              )}
            </p>
          </div>
        )}

        {/* 完成按钮 */}
        {playCount >= 1 && !moduleState.isCompleted && (
          <div className="pt-4 border-t border-neutral-200">
            <Button
              onClick={handleComplete}
              variant="primary"
              size="lg"
              className="w-full"
            >
              完成听音频练习
            </Button>
          </div>
        )}

        {/* 已完成状态 */}
        {moduleState.isCompleted && (
          <div className="bg-success-50 border border-success-200 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 text-success-700">
              <div className="w-5 h-5 bg-success-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="font-medium">听音频练习已完成</span>
            </div>
            <p className="text-sm text-success-600 mt-2">
              播放次数：{moduleState.attempts} 次 · 用时：{moduleState.timeSpent} 秒
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AudioModule;
