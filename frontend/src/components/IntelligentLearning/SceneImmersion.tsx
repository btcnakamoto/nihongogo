/**
 * 功能描述：场景沉浸区组件
 * 输入参数：场景数据和控制回调
 * 返回值：React 场景沉浸组件
 * 用途说明：提供沉浸式场景学习体验，包含视频场景和控制面板
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Settings, Eye, EyeOff, Target } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { SceneImmersion as SceneImmersionType } from '@/types';

interface SceneImmersionProps {
  sceneData: SceneImmersionType;
  onPlayPause: () => void;
  onSpeedChange: (speed: number) => void;
  onToggleSubtitles: () => void;
  onReplay: () => void;
  onDifficultyChange: (difficulty: 'beginner' | 'intermediate' | 'advanced') => void;
  isPlaying: boolean;
  currentSpeed: number;
  showSubtitles: boolean;
  replayCount: number;
  className?: string;
}

const SceneImmersion: React.FC<SceneImmersionProps> = ({
  sceneData,
  onPlayPause,
  onSpeedChange,
  onToggleSubtitles,
  onReplay,
  onDifficultyChange,
  isPlaying,
  currentSpeed,
  showSubtitles,
  replayCount,
  className = '',
}) => {
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-success-600 bg-success-100';
      case 'intermediate': return 'text-warning-600 bg-warning-100';
      case 'advanced': return 'text-error-600 bg-error-100';
      default: return 'text-neutral-600 bg-neutral-100';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '初级';
      case 'intermediate': return '中级';
      case 'advanced': return '高级';
      default: return '中级';
    }
  };

  const getSpeedText = (speed: number) => {
    if (speed === 0.5) return '慢速';
    if (speed === 0.75) return '较慢';
    if (speed === 1) return '正常';
    if (speed === 1.25) return '较快';
    if (speed === 1.5) return '快速';
    return '正常';
  };

  return (
    <div className={`bg-white border-b border-neutral-200 px-6 py-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* 视觉场景区 */}
          <div className="lg:col-span-3">
            <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 p-4 h-full">
              <div className="relative">
                {/* 视频播放区域 */}
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden relative">
                  {/* 模拟视频内容 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white space-y-4">
                      <div className="text-6xl">🎬</div>
                      <div className="text-lg font-medium">东京拉面店场景</div>
                      <div className="text-sm opacity-80">
                        {isPlaying ? '播放中...' : '已暂停'}
                      </div>
                    </div>
                  </div>

                  {/* 播放控制覆盖层 */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                    <Button
                      onClick={onPlayPause}
                      variant="secondary"
                      size="lg"
                      className="bg-white bg-opacity-90 hover:bg-opacity-100"
                    >
                      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </Button>
                  </div>
                </div>

                {/* 场景信息 */}
                <div className="mt-4 space-y-3">
                  {/* 角色信息 */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">👨‍🍳</span>
                      <span className="text-sm font-medium text-slate-700">
                        店员：いらっしゃいませ！
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">👤</span>
                      <span className="text-sm font-medium text-slate-700">
                        你的角色：客人
                      </span>
                    </div>
                  </div>

                  {/* 文化提示 */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <span className="text-lg">💭</span>
                      <div>
                        <div className="text-sm font-medium text-blue-800 mb-1">文化提示</div>
                        <div className="text-sm text-blue-700">
                          {sceneData.culturalTips.join(' • ')}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 理解度检测 */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">理解度检测：</span>
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {Array.from({ length: 10 }, (_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-sm ${
                              i < sceneData.comprehensionLevel
                                ? 'bg-success-400'
                                : 'bg-neutral-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-success-600">
                        ({sceneData.comprehensionLevel}/10)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* 控制面板 */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-primary-50 to-accent-50 border-primary-200 p-4 h-full">
              <div className="space-y-4">
                {/* 播放控制 */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-primary-900 flex items-center space-x-2">
                    <Volume2 className="text-primary-600" size={18} />
                    <span>播放控制</span>
                  </h3>

                  {/* 播放/暂停按钮 */}
                  <Button
                    onClick={onPlayPause}
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    {isPlaying ? (
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

                  {/* 语速控制 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary-800">语速：</span>
                      <span className="text-sm font-bold text-primary-700">
                        {getSpeedText(currentSpeed)}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      {[0.5, 0.75, 1, 1.25, 1.5].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => onSpeedChange(speed)}
                          className={`flex-1 py-1 px-2 text-xs rounded transition-colors ${
                            currentSpeed === speed
                              ? 'bg-primary-600 text-white'
                              : 'bg-white text-primary-600 hover:bg-primary-100'
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 音量控制 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary-800">音量：</span>
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </button>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* 学习辅助 */}
                <div className="space-y-3 pt-4 border-t border-primary-200">
                  <h3 className="font-semibold text-primary-900 flex items-center space-x-2">
                    <Settings className="text-primary-600" size={18} />
                    <span>学习辅助</span>
                  </h3>

                  {/* 中文提示开关 */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary-800">中文提示：</span>
                    <button
                      onClick={onToggleSubtitles}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        showSubtitles
                          ? 'bg-success-100 text-success-700'
                          : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {showSubtitles ? <Eye size={14} /> : <EyeOff size={14} />}
                      <span>{showSubtitles ? '开启' : '关闭'}</span>
                    </button>
                  </div>

                  {/* 重播次数 */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary-800">重播次数：</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-primary-700">
                        {replayCount}/∞
                      </span>
                      <Button
                        onClick={onReplay}
                        variant="outline"
                        size="sm"
                      >
                        <RotateCcw size={14} className="mr-1" />
                        重播
                      </Button>
                    </div>
                  </div>

                  {/* 难度选择 */}
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-primary-800">难度：</span>
                    <div className="flex space-x-1">
                      {(['beginner', 'intermediate', 'advanced'] as const).map((difficulty) => (
                        <button
                          key={difficulty}
                          onClick={() => onDifficultyChange(difficulty)}
                          className={`flex-1 py-2 px-3 text-xs font-medium rounded transition-colors ${
                            sceneData.difficulty === difficulty
                              ? getDifficultyColor(difficulty)
                              : 'bg-white text-neutral-600 hover:bg-neutral-50'
                          }`}
                        >
                          {getDifficultyText(difficulty)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SceneImmersion;
