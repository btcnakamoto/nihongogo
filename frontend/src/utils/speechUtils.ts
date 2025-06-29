/**
 * 功能描述：语音识别和合成工具
 * 输入参数：语音相关配置和文本
 * 返回值：语音识别结果和合成控制方法
 * 用途说明：封装 Web Speech API，提供语音识别、语音合成和发音评分功能
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import { SpeechRecognitionResult } from '@/types';

// 检查浏览器是否支持语音识别
export const isSpeechRecognitionSupported = (): boolean => {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
};

// 检查浏览器是否支持语音合成
export const isSpeechSynthesisSupported = (): boolean => {
  return 'speechSynthesis' in window;
};

// 语音合成配置
export interface SpeechSynthesisConfig {
  lang: string;
  rate: number;
  pitch: number;
  volume: number;
}

// 默认日语语音配置
export const defaultJapaneseSpeechConfig: SpeechSynthesisConfig = {
  lang: 'ja-JP',
  rate: 0.8,
  pitch: 1.0,
  volume: 1.0,
};

// 语音合成类
export class SpeechSynthesizer {
  private synth: SpeechSynthesis;
  private config: SpeechSynthesisConfig;

  constructor(config: SpeechSynthesisConfig = defaultJapaneseSpeechConfig) {
    this.synth = window.speechSynthesis;
    this.config = config;
  }

  // 播放文本
  speak(text: string, onEnd?: () => void, onError?: (error: Error) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!isSpeechSynthesisSupported()) {
        const error = new Error('语音合成不支持');
        onError?.(error);
        reject(error);
        return;
      }

      // 停止当前播放
      this.stop();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = this.config.lang;
      utterance.rate = this.config.rate;
      utterance.pitch = this.config.pitch;
      utterance.volume = this.config.volume;

      utterance.onend = () => {
        onEnd?.();
        resolve();
      };

      utterance.onerror = (event) => {
        const error = new Error(`语音合成错误: ${event.error}`);
        onError?.(error);
        reject(error);
      };

      this.synth.speak(utterance);
    });
  }

  // 停止播放
  stop(): void {
    if (this.synth.speaking) {
      this.synth.cancel();
    }
  }

  // 暂停播放
  pause(): void {
    if (this.synth.speaking) {
      this.synth.pause();
    }
  }

  // 恢复播放
  resume(): void {
    if (this.synth.paused) {
      this.synth.resume();
    }
  }

  // 检查是否正在播放
  isSpeaking(): boolean {
    return this.synth.speaking;
  }

  // 更新配置
  updateConfig(config: Partial<SpeechSynthesisConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

// 语音识别类
export class SpeechRecognizer {
  private recognition: any;
  private isListening: boolean = false;

  constructor() {
    if (isSpeechRecognitionSupported()) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.setupRecognition();
    }
  }

  private setupRecognition(): void {
    if (!this.recognition) return;

    this.recognition.lang = 'ja-JP';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;
  }

  // 开始语音识别
  startListening(): Promise<SpeechRecognitionResult> {
    return new Promise((resolve, reject) => {
      if (!isSpeechRecognitionSupported() || !this.recognition) {
        reject(new Error('语音识别不支持'));
        return;
      }

      if (this.isListening) {
        reject(new Error('正在录音中'));
        return;
      }

      this.isListening = true;

      this.recognition.onresult = (event: any) => {
        const result = event.results[0];
        const transcript = result[0].transcript;
        const confidence = result[0].confidence;

        const recognitionResult: SpeechRecognitionResult = {
          transcript,
          confidence,
          accuracy: confidence * 100,
          feedback: this.generateFeedback(confidence),
        };

        resolve(recognitionResult);
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        reject(new Error(`语音识别错误: ${event.error}`));
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      try {
        this.recognition.start();
      } catch (error) {
        this.isListening = false;
        reject(error);
      }
    });
  }

  // 停止语音识别
  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  // 检查是否正在录音
  isRecording(): boolean {
    return this.isListening;
  }

  // 生成反馈信息
  private generateFeedback(confidence: number): string[] {
    const feedback: string[] = [];

    if (confidence >= 0.8) {
      feedback.push('发音很棒！');
    } else if (confidence >= 0.6) {
      feedback.push('发音不错，可以再清晰一些');
    } else if (confidence >= 0.4) {
      feedback.push('发音需要改进，请注意语调');
    } else {
      feedback.push('发音不够清晰，建议多练习');
    }

    return feedback;
  }
}

// 比较两个文本的相似度（简单实现）
export const calculateTextSimilarity = (text1: string, text2: string): number => {
  const normalize = (text: string) => text.toLowerCase().replace(/\s+/g, '');
  const normalized1 = normalize(text1);
  const normalized2 = normalize(text2);

  if (normalized1 === normalized2) return 100;

  // 计算编辑距离
  const editDistance = levenshteinDistance(normalized1, normalized2);
  const maxLength = Math.max(normalized1.length, normalized2.length);
  
  if (maxLength === 0) return 100;
  
  const similarity = ((maxLength - editDistance) / maxLength) * 100;
  return Math.max(0, similarity);
};

// 计算编辑距离
const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) {
    matrix[0][i] = i;
  }

  for (let j = 0; j <= str2.length; j++) {
    matrix[j][0] = j;
  }

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  return matrix[str2.length][str1.length];
};

// 创建全局语音合成器实例
export const globalSpeechSynthesizer = new SpeechSynthesizer();

// 创建全局语音识别器实例
export const globalSpeechRecognizer = new SpeechRecognizer();
