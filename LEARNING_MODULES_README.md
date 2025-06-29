# Nihongogo 学习模块系统

## 概述

Nihongogo 学习模块系统是一个完整的日语句子学习解决方案，包含6个交互式学习模块，为用户提供从听力到口语的全方位学习体验。

## 🎯 设计理念

### 句子为核心的学习单元
- 每个句子约50字，符合认知负荷理论
- 完整的语境信息：日语原文、假名注音、中文翻译、语法要点
- 渐进式学习步骤，确保充分理解和掌握

### 多感官学习体验
- 听觉：音频播放和语音识别
- 视觉：文字显示和界面反馈
- 触觉：交互操作和输入练习
- 认知：思考推测和创意改写

## 📚 6个学习模块

### 1. 🎧 听音频模块 (AudioModule)
**功能特色：**
- 正常速度和慢速播放
- 播放状态指示器和次数统计
- 自动完成机制（播放3次后可完成）
- 重听功能和播放控制

**学习目标：**
- 培养日语语感和听力理解能力
- 熟悉日语的语调和节奏
- 建立语音与文字的对应关系

### 2. 🧠 意思推测模块 (ComprehensionModule)
**功能特色：**
- 隐藏中文翻译，鼓励主动思考
- "我知道意思"和"显示翻译"两种选择
- 思考时间统计和智能评分
- 语法要点详细展示

**学习目标：**
- 激发主动思考和推理能力
- 提高语义理解和语法分析能力
- 培养日语思维模式

### 3. ✍️ 听写输入模块 (DictationModule)
**功能特色：**
- 文本输入框供用户输入听到的日语
- 实时验证准确性，使用编辑距离算法
- 详细的错误提示和正确答案对比
- 重新尝试功能和进度跟踪

**学习目标：**
- 强化文字识别和拼写能力
- 提高听力理解的精确度
- 巩固假名和汉字的掌握

### 4. 🗣️ 跟读练习模块 (SpeakingModule)
**功能特色：**
- 集成 Web Speech API 语音识别
- 智能发音评分和改进建议
- 录音状态指示和时间统计
- 浏览器兼容性检测和错误处理

**学习目标：**
- 提升发音准确性和口语流利度
- 培养正确的语调和重音
- 增强口语表达信心

### 5. 🧩 改写挑战模块 (RewriteModule)
**功能特色：**
- 基于语法要点生成个性化挑战任务
- 创意句子输入和智能评分
- 多个挑战提示轮换
- 鼓励性反馈和学习建议

**学习目标：**
- 培养创造性语言运用能力
- 加深对语法结构的理解
- 提高日语表达的灵活性

### 6. 📊 数据保存模块 (ProgressModule)
**功能特色：**
- 学习进度自动保存到 localStorage
- 收藏功能和学习统计
- 智能下一个句子导航
- 完整的学习成果展示

**学习目标：**
- 巩固学习成果和进度管理
- 提供学习反馈和成就感
- 支持个性化学习节奏

## 🛠️ 技术实现

### 语音技术集成
```typescript
// 语音合成
const synthesizer = new SpeechSynthesizer({
  lang: 'ja-JP',
  rate: 0.8,
  pitch: 1.0,
  volume: 1.0
});

// 语音识别
const recognizer = new SpeechRecognizer();
const result = await recognizer.startListening();
```

### 智能评分算法
```typescript
// 文本相似度计算
const similarity = calculateTextSimilarity(userInput, targetText);

// 编辑距离算法
const editDistance = levenshteinDistance(text1, text2);
```

### 状态管理
```typescript
interface LearningModuleState {
  moduleType: LearningModuleType;
  isCompleted: boolean;
  score?: number;
  userInput?: string;
  attempts: number;
  timeSpent: number;
}
```

### 数据持久化
```typescript
// 本地存储管理
localStorage.setItem('nihongogo_progress', JSON.stringify(progressData));
localStorage.setItem('nihongogo_favorites', JSON.stringify(favorites));
```

## 🎨 UI/UX 设计

### 响应式设计
- 完美适配桌面端和移动端
- 灵活的网格布局系统
- 触控友好的交互元素

### 无障碍设计
- 符合 WCAG 2.1 AA 标准
- 键盘导航支持
- 屏幕阅读器兼容
- 高对比度色彩方案

### 视觉反馈
- 实时状态指示器
- 流畅的动画过渡
- 清晰的进度可视化
- 直观的成功/错误提示

## 🚀 使用方法

### 基本使用
1. 访问试学页面：`/trial/:courseId/learning`
2. 或访问演示页面：`/demo/learning-modules`
3. 按顺序完成6个学习模块
4. 查看学习统计和进度

### 开发集成
```tsx
import { AudioModule } from '@/components/LearningModules';

<AudioModule
  sentenceData={sentenceData}
  moduleState={moduleState}
  onStateUpdate={handleStateUpdate}
  onComplete={handleComplete}
/>
```

## 📊 学习效果

### 学习流程设计
1. **听音频** - 培养语感和听力理解
2. **意思推测** - 激发主动思考
3. **听写输入** - 强化文字识别能力
4. **跟读练习** - 提升发音和口语
5. **改写挑战** - 培养创造性运用
6. **学习总结** - 巩固成果和进度管理

### 学习效果评估
- 实时评分和反馈
- 多维度能力评估
- 个性化改进建议
- 长期进度跟踪

## 🔧 技术栈

- **前端框架**: React 18 + TypeScript
- **样式系统**: Tailwind CSS
- **语音技术**: Web Speech API
- **状态管理**: React Hooks
- **数据存储**: localStorage
- **测试框架**: Jest + React Testing Library
- **构建工具**: Vite

## 📱 浏览器支持

### 语音功能支持
- ✅ Chrome 25+
- ✅ Edge 79+
- ✅ Safari 14.1+
- ❌ Firefox (语音识别不支持)

### 基础功能支持
- ✅ 所有现代浏览器
- ✅ 移动端浏览器
- ✅ 平板设备

## 🎯 未来规划

### 功能扩展
- [ ] 离线模式支持
- [ ] 多语言界面
- [ ] 社交分享功能
- [ ] 学习排行榜
- [ ] AI 智能推荐

### 技术优化
- [ ] 性能优化和懒加载
- [ ] PWA 支持
- [ ] 更多语音引擎集成
- [ ] 实时协作功能

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

---

**Nihongogo** - 让日语学习更智能、更有趣、更高效！
