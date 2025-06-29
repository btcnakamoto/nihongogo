/**
 * 功能描述：多模态输入区组件
 * 输入参数：多模态输入数据和回调函数
 * 返回值：React 多模态输入组件
 * 用途说明：提供听写、语音和手势三种输入方式的综合练习
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React, { useState } from 'react';
import { PenTool, Mic, Hand, BarChart3, Clock, Music, TrendingUp, Camera } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { MultiModalInput as MultiModalInputType } from '@/types';

interface MultiModalInputProps {
  inputData: MultiModalInputType;
  onDictationChange: (text: string) => void;
  onVoiceStart: () => void;
  onVoiceStop: () => void;
  onGestureStart: () => void;
  onGestureStop: () => void;
  className?: string;
}

const MultiModalInput: React.FC<MultiModalInputProps> = ({
  inputData,
  onDictationChange,
  onVoiceStart,
  onVoiceStop,
  onGestureStart,
  onGestureStop,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'dictation' | 'voice' | 'gesture'>('dictation');

  const getScoreColor = (score: string) => {
    switch (score) {
      case 'A+': case 'A': return 'text-success-600';
      case 'B+': case 'B': return 'text-primary-600';
      case 'C+': case 'C': return 'text-warning-600';
      default: return 'text-error-600';
    }
  };

  const renderToneCurve = (curve: number[]) => {
    const maxHeight = 40;
    const width = 120;
    const points = curve.map((value, index) => {
      const x = (index / (curve.length - 1)) * width;
      const y = maxHeight - (value / 4) * maxHeight; // 假设音调范围是0-4
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={width} height={maxHeight} className="border border-neutral-200 rounded">
        <polyline
          points={points}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          className="drop-shadow-sm"
        />
        {curve.map((value, index) => {
          const x = (index / (curve.length - 1)) * width;
          const y = maxHeight - (value / 4) * maxHeight;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="3"
              fill="#3B82F6"
              className="drop-shadow-sm"
            />
          );
        })}
      </svg>
    );
  };

  return (
    <div className={`bg-white border-b border-neutral-200 px-6 py-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 听写框 */}
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <PenTool className="text-purple-600" size={20} />
              <h3 className="font-semibold text-purple-900">听写输入</h3>
            </div>

            <div className="space-y-4">
              {/* 输入框 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-purple-800">
                  请输入听到的内容：
                </label>
                <textarea
                  value={inputData.dictation.text}
                  onChange={(e) => onDictationChange(e.target.value)}
                  placeholder="ラーメン を ____"
                  className="w-full h-20 px-3 py-2 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors resize-none font-japanese text-lg"
                />
              </div>

              {/* 语法结构可视化 */}
              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <div className="text-sm font-medium text-purple-800 mb-2">
                  🎨 语法结构可视化：
                </div>
                <div className="flex items-center space-x-2">
                  {inputData.dictation.grammarVisualization.map((part, index) => (
                    <div
                      key={index}
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        part.includes('名词') ? 'bg-blue-100 text-blue-700' :
                        part.includes('を') ? 'bg-green-100 text-green-700' :
                        part.includes('动词') ? 'bg-red-100 text-red-700' :
                        'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {part}
                    </div>
                  ))}
                </div>
              </div>

              {/* 中日对比 */}
              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <div className="text-sm font-medium text-purple-800 mb-2">
                  🔄 中日对比：
                </div>
                <div className="text-sm text-purple-700">
                  {inputData.dictation.chineseComparison}
                </div>
              </div>
            </div>
          </Card>

          {/* 语音输入 */}
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Mic className="text-orange-600" size={20} />
              <h3 className="font-semibold text-orange-900">语音输入</h3>
            </div>

            <div className="space-y-4">
              {/* 录音控制 */}
              <div className="text-center">
                <Button
                  onClick={inputData.voiceInput.isRecording ? onVoiceStop : onVoiceStart}
                  variant={inputData.voiceInput.isRecording ? "secondary" : "primary"}
                  size="lg"
                  className={`w-full ${
                    inputData.voiceInput.isRecording 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : ''
                  }`}
                >
                  {inputData.voiceInput.isRecording ? (
                    <>
                      <div className="w-4 h-4 bg-white rounded-full animate-pulse mr-2"></div>
                      停止录音
                    </>
                  ) : (
                    <>
                      <Mic size={20} className="mr-2" />
                      开始录音
                    </>
                  )}
                </Button>
              </div>

              {/* 音调检测 */}
              <div className="bg-white rounded-lg p-3 border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-orange-800">
                    📊 音调检测：
                  </span>
                  <span className="text-sm font-bold text-orange-700">
                    {inputData.voiceInput.toneDetection}
                  </span>
                </div>
              </div>

              {/* 录音时长 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="text-orange-600" size={16} />
                  <span className="text-sm font-medium text-orange-800">录音时长：</span>
                </div>
                <span className="text-sm font-bold text-orange-700">
                  {inputData.voiceInput.duration}s
                </span>
              </div>

              {/* 发音评分 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="text-orange-600" size={16} />
                  <span className="text-sm font-medium text-orange-800">发音评分：</span>
                </div>
                <span className={`text-sm font-bold ${getScoreColor(inputData.voiceInput.pronunciationScore)}`}>
                  {inputData.voiceInput.pronunciationScore}
                </span>
              </div>

              {/* 音调曲线显示 */}
              <div className="bg-white rounded-lg p-3 border border-orange-200">
                <div className="text-sm font-medium text-orange-800 mb-2">
                  🎵 音调曲线：
                </div>
                <div className="flex justify-center">
                  {renderToneCurve(inputData.voiceInput.toneCurve)}
                </div>
              </div>
            </div>
          </Card>

          {/* 手势输入 */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Hand className="text-green-600" size={20} />
              <h3 className="font-semibold text-green-900">手势练习</h3>
            </div>

            <div className="space-y-4">
              {/* 录制手势 */}
              <div className="text-center">
                <Button
                  onClick={onGestureStart}
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  <Camera size={20} className="mr-2" />
                  录制手势
                </Button>
              </div>

              {/* 当前手势 */}
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="text-sm font-medium text-green-800 mb-2">
                  🖐️ 当前手势：
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🙇</div>
                  <div className="text-sm font-medium text-green-700">
                    {inputData.gestureInput.currentGesture}
                  </div>
                </div>
              </div>

              {/* 日式手势库 */}
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="text-sm font-medium text-green-800 mb-2">
                  💡 日式手势库：
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {inputData.gestureInput.gestureLibrary.map((gesture, index) => (
                    <button
                      key={index}
                      className="p-2 text-xs bg-green-50 hover:bg-green-100 rounded transition-colors text-green-700"
                    >
                      {gesture}
                    </button>
                  ))}
                </div>
              </div>

              {/* 肢体语言得分 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="text-green-600" size={16} />
                  <span className="text-sm font-medium text-green-800">肢体语言得分：</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-green-700">
                    {inputData.gestureInput.bodyLanguageScore}/100
                  </span>
                  <div className="w-16 h-2 bg-green-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500"
                      style={{ width: `${inputData.gestureInput.bodyLanguageScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MultiModalInput;
