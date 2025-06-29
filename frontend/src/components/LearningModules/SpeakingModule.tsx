/**
 * 功能描述：跟读练习学习模块
 * 输入参数：句子数据和状态更新回调
 * 返回值：React 跟读练习模块组件
 * 用途说明：提供语音识别功能，录音后自动进行发音评分并显示改进建议
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Play, Volume2, Award, AlertTriangle } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { SentenceLearningData, LearningModuleState, SpeechRecognitionResult } from '@/types';
import { 
  globalSpeechSynthesizer, 
  globalSpeechRecognizer, 
  isSpeechRecognitionSupported,
  calculateTextSimilarity 
} from '@/utils/speechUtils';

interface SpeakingModuleProps {
  sentenceData: SentenceLearningData;
  moduleState: LearningModuleState;
  onStateUpdate: (state: Partial<LearningModuleState>) => void;
  onComplete: () => void;
}

const SpeakingModule: React.FC<SpeakingModuleProps> = ({
  sentenceData,
  moduleState,
  onStateUpdate,
  onComplete,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<SpeechRecognitionResult | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const isSupported = isSpeechRecognitionSupported();

  useEffect(() => {
    if (!startTime) {
      setStartTime(Date.now());
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRecording]);

  const playReference = async () => {
    if (isPlaying) {
      globalSpeechSynthesizer.stop();
      setIsPlaying(false);
      return;
    }

    try {
      setIsPlaying(true);
      globalSpeechSynthesizer.updateConfig({ rate: 0.7 }); // 稍慢一点便于跟读

      await globalSpeechSynthesizer.speak(
        sentenceData.japanese,
        () => setIsPlaying(false),
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

  const startRecording = async () => {
    if (!isSupported) {
      alert('您的浏览器不支持语音识别功能');
      return;
    }

    try {
      setIsRecording(true);
      setRecognitionResult(null);

      const result = await globalSpeechRecognizer.startListening();
      
      // 计算与目标句子的相似度
      const similarity = calculateTextSimilarity(result.transcript, sentenceData.japanese);
      const finalScore = Math.round((result.confidence * 0.6 + similarity * 0.4));

      const enhancedResult: SpeechRecognitionResult = {
        ...result,
        accuracy: similarity,
        feedback: generateDetailedFeedback(similarity, result.confidence),
      };

      setRecognitionResult(enhancedResult);
      setAttempts(prev => prev + 1);
      setBestScore(prev => Math.max(prev, finalScore));

      const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
      
      onStateUpdate({
        attempts: attempts + 1,
        timeSpent,
        score: Math.max(moduleState.score || 0, finalScore),
        userInput: result.transcript,
      });

    } catch (error) {
      console.error('语音识别失败:', error);
      alert('语音识别失败，请检查麦克风权限或重试');
    } finally {
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (isRecording) {
      globalSpeechRecognizer.stopListening();
      setIsRecording(false);
    }
  };

  const generateDetailedFeedback = (accuracy: number, confidence: number): string[] => {
    const feedback: string[] = [];

    if (accuracy >= 90 && confidence >= 0.8) {
      feedback.push('🎉 发音非常标准！');
      feedback.push('语调和节奏都很好');
    } else if (accuracy >= 80) {
      feedback.push('👍 发音很不错！');
      if (confidence < 0.7) {
        feedback.push('可以说得更清晰一些');
      }
      feedback.push('继续保持这个水平');
    } else if (accuracy >= 70) {
      feedback.push('📈 发音有进步空间');
      feedback.push('建议多听几遍标准发音');
      feedback.push('注意每个音节的清晰度');
    } else if (accuracy >= 50) {
      feedback.push('💪 需要多加练习');
      feedback.push('建议先熟悉假名发音');
      feedback.push('可以分段练习');
    } else {
      feedback.push('🎯 建议从基础开始');
      feedback.push('先听懂每个词的发音');
      feedback.push('然后逐步练习整句');
    }

    return feedback;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success-600';
    if (score >= 80) return 'text-primary-600';
    if (score >= 70) return 'text-warning-600';
    return 'text-error-600';
  };

  const getScoreLevel = (score: number) => {
    if (score >= 90) return '优秀';
    if (score >= 80) return '良好';
    if (score >= 70) return '一般';
    if (score >= 60) return '及格';
    return '需要加强';
  };

  const handleComplete = () => {
    const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    
    onStateUpdate({
      isCompleted: true,
      timeSpent,
      attempts,
    });
    
    onComplete();
  };

  if (!isSupported) {
    return (
      <Card className="bg-white border-2 border-error-200 shadow-soft">
        <div className="text-center space-y-4 py-8">
          <AlertTriangle className="mx-auto text-error-600" size={48} />
          <h3 className="text-xl font-bold text-error-900">语音识别不支持</h3>
          <p className="text-error-700">
            您的浏览器不支持语音识别功能，建议使用 Chrome 或 Edge 浏览器
          </p>
          <Button onClick={handleComplete} variant="outline">
            跳过此练习
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white border-2 border-primary-200 shadow-soft">
      <div className="space-y-6">
        {/* 模块标题 */}
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <Mic className="text-orange-600" size={24} />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-neutral-900">🗣️ 跟读练习</h3>
            <p className="text-sm text-neutral-600">听标准发音，然后跟读练习</p>
          </div>
        </div>

        {/* 句子显示区域 */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
          <div className="space-y-4 text-center">
            {/* 日语原文 */}
            <div className="text-2xl font-bold text-neutral-900 font-japanese leading-relaxed">
              {sentenceData.japanese}
            </div>
            
            {/* 假名注音 */}
            <div className="text-lg text-neutral-600 font-japanese">
              {sentenceData.furigana}
            </div>
            
            {/* 中文翻译 */}
            <div className="text-base text-neutral-700">
              {sentenceData.chinese}
            </div>
          </div>
        </div>

        {/* 参考音频播放 */}
        <div className="text-center">
          <Button
            onClick={playReference}
            variant="outline"
            size="lg"
            disabled={isPlaying || isRecording}
            className="min-w-[160px]"
          >
            {isPlaying ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                播放中...
              </>
            ) : (
              <>
                <Volume2 size={20} className="mr-2" />
                听标准发音
              </>
            )}
          </Button>
        </div>

        {/* 录音控制 */}
        <div className="text-center space-y-4">
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
            isRecording ? 'bg-red-100 text-red-700' : 'bg-neutral-100 text-neutral-600'
          }`}>
            {isRecording ? (
              <>
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                <span className="font-medium">录音中... {recordingTime}s</span>
              </>
            ) : (
              <>
                <MicOff size={16} />
                <span>准备录音</span>
              </>
            )}
          </div>

          <Button
            onClick={isRecording ? stopRecording : startRecording}
            variant={isRecording ? "secondary" : "primary"}
            size="lg"
            className="min-w-[140px]"
          >
            {isRecording ? (
              <>
                <MicOff size={20} className="mr-2" />
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

        {/* 识别结果 */}
        {recognitionResult && (
          <div className="animate-fade-in-up">
            <Card className="bg-neutral-50 border-neutral-200">
              <div className="space-y-4">
                {/* 评分显示 */}
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Award className={getScoreColor(recognitionResult.accuracy)} size={24} />
                    <span className="text-lg font-bold text-neutral-900">发音评分</span>
                  </div>
                  <div className={`text-3xl font-bold ${getScoreColor(recognitionResult.accuracy)}`}>
                    {Math.round(recognitionResult.accuracy)}分
                  </div>
                  <div className={`text-sm ${getScoreColor(recognitionResult.accuracy)}`}>
                    {getScoreLevel(recognitionResult.accuracy)}
                  </div>
                </div>

                {/* 识别文本 */}
                <div className="bg-white rounded-lg p-3 border border-neutral-200">
                  <div className="text-sm text-neutral-600 mb-1">您的发音识别为：</div>
                  <div className="font-japanese text-lg text-neutral-900">
                    {recognitionResult.transcript || '未识别到内容'}
                  </div>
                </div>

                {/* 反馈建议 */}
                <div className="bg-white rounded-lg p-3 border border-neutral-200">
                  <div className="text-sm text-neutral-600 mb-2">改进建议：</div>
                  <ul className="space-y-1">
                    {recognitionResult.feedback.map((tip, index) => (
                      <li key={index} className="text-sm text-neutral-700 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* 练习统计 */}
        {attempts > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-blue-700">练习次数：{attempts} 次</span>
              <span className="text-blue-700">最高得分：{bestScore} 分</span>
            </div>
          </div>
        )}

        {/* 完成按钮 */}
        {attempts >= 1 && !moduleState.isCompleted && (
          <div className="pt-4 border-t border-neutral-200 text-center">
            <Button
              onClick={handleComplete}
              variant="primary"
              size="lg"
              className="w-full"
            >
              完成跟读练习
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
              <span className="font-medium">跟读练习已完成</span>
            </div>
            <div className="flex justify-center space-x-4 mt-2 text-sm text-success-600">
              <span>最高得分：{moduleState.score}分</span>
              <span>练习次数：{moduleState.attempts}次</span>
              <span>用时：{moduleState.timeSpent}秒</span>
            </div>
          </div>
        )}

        {/* 使用提示 */}
        {!recognitionResult && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              💡 提示：先听标准发音，然后清晰地朗读句子。确保麦克风权限已开启。
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SpeakingModule;
