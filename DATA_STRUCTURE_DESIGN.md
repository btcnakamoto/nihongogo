# Nihongogo 数据结构设计文档

---

## 概述

本文档详细定义了 Nihongogo 日语学习系统的核心数据结构设计。采用以句子为核心单元的解耦设计，专注于中文母语者学习日语的场景，同时为未来扩展其他目标语言（韩语、英语等）预留架构灵活性。

**当前重点**：中文母语者学习日语
**未来扩展**：中文母语者学习韩语、英语、西语等

---

## 1. 核心句子数据结构

### 1.1 日语句子基础结构

```json
{
  "sentence_id": "sent_restaurant_001",
  "language_pair": {
    "target_language": "ja",
    "native_language": "zh"
  },
  "content": {
    "target": "すみません、注文をお願いします。",
    "native": "不好意思，请帮我点餐。",
    "romanization": "sumimasen, chuumon wo onegaishimasu",
    "pronunciation_guide": "su-mi-ma-sen, chuu-mon wo o-ne-gai-shi-ma-su"
  },
  "linguistic_data": {
    "difficulty_level": 3,
    "grammar_points": ["〜をお願いします", "すみません"],
    "vocabulary": [
      {
        "word": "注文",
        "reading": "ちゅうもん",
        "meaning": "点餐",
        "pos": "noun",
        "difficulty": 2,
        "kanji_info": {
          "kanji": "注文",
          "hiragana": "ちゅうもん",
          "stroke_count": 11
        }
      },
      {
        "word": "お願いします",
        "reading": "おねがいします",
        "meaning": "请",
        "pos": "expression",
        "difficulty": 1,
        "keigo_type": "丁寧語"
      }
    ],
    "sentence_type": "request",
    "formality_level": "polite",
    "speech_act": "requesting_service",
    "japanese_specific": {
      "keigo_level": "丁寧語",
      "particles": ["を"],
      "verb_form": "ます形",
      "writing_systems_used": ["hiragana", "kanji"]
    }
  },
  "audio_data": {
    "file_path": "audio/sentences/sent_restaurant_001.mp3",
    "duration_ms": 2800,
    "speaker_info": {
      "gender": "female",
      "age_range": "20-30",
      "accent": "standard_tokyo",
      "speech_rate": "normal"
    },
    "phoneme_timestamps": [
      { "phoneme": "su", "start_ms": 0, "end_ms": 200 },
      { "phoneme": "mi", "start_ms": 200, "end_ms": 400 },
      { "phoneme": "ma", "start_ms": 400, "end_ms": 600 },
      { "phoneme": "sen", "start_ms": 600, "end_ms": 1000 }
    ],
    "word_timestamps": [
      { "word": "すみません", "start_ms": 0, "end_ms": 1000 },
      { "word": "注文", "start_ms": 1200, "end_ms": 1800 },
      { "word": "を", "start_ms": 1800, "end_ms": 1900 },
      { "word": "お願いします", "start_ms": 1900, "end_ms": 2800 }
    ]
  },
  "cultural_context": {
    "usage_scenarios": ["restaurant", "service_request", "customer_service"],
    "cultural_notes": "日本餐厅通常需要主动请求服务，不会主动提供结账服务",
    "appropriateness": {
      "formal_situations": true,
      "casual_situations": true,
      "business_situations": false
    },
    "regional_variations": {
      "kansai": "すんません、注文お願いします",
      "kyushu": "すみません、注文ばお願いします"
    }
  },
  "training_metadata": {
    "shadowing_difficulty": 4,
    "listening_difficulty": 3,
    "pronunciation_focus": ["long_vowel", "polite_ending", "particle_wo"],
    "common_errors": [
      "omitting_particles",
      "wrong_intonation",
      "mispronouncing_chuumon"
    ],
    "learning_objectives": [
      "master_polite_requests",
      "understand_service_context",
      "practice_clear_pronunciation"
    ],
    "japanese_learning_focus": {
      "pitch_accent_pattern": "LHL",
      "particle_emphasis": "を",
      "keigo_practice": true,
      "kanji_recognition": ["注", "文"],
      "cultural_context": "restaurant_etiquette"
    }
  },
  "tags": ["restaurant", "service", "polite_request", "beginner_friendly", "essential"],
  "metadata": {
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z",
    "version": "1.0",
    "created_by": "content_team",
    "review_status": "approved",
    "usage_frequency": 0,
    "effectiveness_score": null
  }
}
```

### 1.2 未来扩展：其他目标语言结构示例

> **注意**：以下结构为未来扩展预留，当前开发重点仍为日语学习

#### 韩语句子结构（未来扩展）
```json
{
  "sentence_id": "sent_restaurant_ko_001",
  "language_pair": {
    "target_language": "ko",
    "native_language": "zh"
  },
  "content": {
    "target": "죄송합니다, 주문하겠습니다.",
    "native": "不好意思，我要点餐。",
    "romanization": "joesonghamnida, jumunhagesseumnida",
    "pronunciation_guide": "joe-song-ham-ni-da, ju-mun-ha-ge-sseum-ni-da"
  },
  "linguistic_data": {
    "difficulty_level": 3,
    "grammar_points": ["겠습니다", "죄송합니다"],
    "vocabulary": [
      {
        "word": "주문",
        "reading": "주문",
        "meaning": "点餐",
        "pos": "noun",
        "difficulty": 2
      }
    ],
    "sentence_type": "request",
    "formality_level": "formal",
    "speech_act": "requesting_service"
  },
  "language_specific_features": {
    "honorific_level": "formal",
    "verb_endings": ["겠습니다"],
    "particle_usage": [],
    "speech_level": "hasipsio_che"
  }
}
```

#### 英语句子结构（未来扩展）
```json
{
  "sentence_id": "sent_restaurant_en_001",
  "language_pair": {
    "target_language": "en",
    "native_language": "zh"
  },
  "content": {
    "target": "Excuse me, I'd like to place an order.",
    "native": "不好意思，我想点餐。",
    "romanization": null,
    "pronunciation_guide": "ik-skyooz mee, ahyd lahyk tu pleys an awr-der"
  },
  "linguistic_data": {
    "difficulty_level": 2,
    "grammar_points": ["I'd like to", "place an order"],
    "vocabulary": [
      {
        "word": "order",
        "reading": null,
        "meaning": "订单",
        "pos": "noun",
        "difficulty": 1
      }
    ],
    "sentence_type": "request",
    "formality_level": "polite",
    "speech_act": "requesting_service"
  },
  "language_specific_features": {
    "contractions": ["I'd"],
    "phrasal_verbs": ["place an order"],
    "stress_patterns": ["EX-cuse", "OR-der"]
  }
}
```

---

## 2. 日语对话场景数据结构

### 2.1 日语对话基础结构

```json
{
  "dialogue_id": "restaurant_ordering_basic",
  "title": "餐厅基础点餐对话",
  "language_pair": {
    "target_language": "ja",
    "native_language": "zh"
  },
  "scenario_info": {
    "setting": "restaurant",
    "situation": "ordering_food",
    "participants": [
      {
        "role": "customer",
        "description": "初次来日本的中国游客",
        "characteristics": ["polite", "slightly_nervous"]
      },
      {
        "role": "waiter",
        "description": "经验丰富的日本服务员",
        "characteristics": ["professional", "patient", "helpful"]
      }
    ],
    "context": "午餐时间，顾客刚刚坐下准备点餐"
  },
  "dialogue_flow": [
    {
      "turn": 1,
      "speaker": "customer",
      "sentence_id": "sent_restaurant_001",
      "speaker_emotion": "polite",
      "context_notes": "刚坐下，准备点餐",
      "timing_notes": "稍作停顿，表现出礼貌"
    },
    {
      "turn": 2,
      "speaker": "waiter",
      "sentence_id": "sent_restaurant_002", 
      "speaker_emotion": "professional",
      "context_notes": "服务员友好回应",
      "timing_notes": "立即回应，表现专业"
    },
    {
      "turn": 3,
      "speaker": "customer",
      "sentence_id": "sent_restaurant_003",
      "speaker_emotion": "thoughtful",
      "context_notes": "顾客思考要点什么",
      "timing_notes": "稍作思考后回答"
    }
  ],
  "learning_objectives": [
    "master_service_requests",
    "understand_restaurant_protocol",
    "practice_polite_interactions"
  ],
  "difficulty_level": 2,
  "estimated_duration_minutes": 5,
  "cultural_insights": [
    "日本餐厅服务文化特点",
    "点餐时的礼貌用语",
    "服务员与顾客的互动模式"
  ],
  "japanese_learning_focus": {
    "keigo_practice": "丁寧語を中心とした接客用語",
    "cultural_etiquette": "日本の飲食店でのマナー",
    "pronunciation_points": ["いらっしゃいませ", "ありがとうございます"],
    "grammar_emphasis": ["〜をお願いします", "〜ていただけませんか"]
  },
  "metadata": {
    "created_at": "2024-01-15T10:00:00Z",
    "version": "1.0",
    "effectiveness_score": null,
    "usage_count": 0
  }
}
```

---

## 3. 日语训练模块配置结构

### 3.1 日语听力训练模块

```json
{
  "training_module_id": "listening_restaurant_basic",
  "module_type": "listening_comprehension",
  "title": "餐厅场景听力理解",
  "language_pair": {
    "target_language": "ja",
    "native_language": "zh"
  },
  "content_source": {
    "type": "dialogue",
    "dialogue_id": "restaurant_ordering_basic",
    "focus_sentences": ["sent_restaurant_001", "sent_restaurant_002"],
    "audio_config": {
      "playback_speeds": [0.7, 0.8, 1.0, 1.2],
      "default_speed": 1.0,
      "loop_enabled": true,
      "segment_playback": true
    }
  },
  "training_steps": [
    {
      "step": 1,
      "type": "full_listening",
      "title": "完整听取",
      "instruction": "听完整对话，理解大意",
      "target_sentences": "all",
      "config": {
        "show_transcript": false,
        "play_count": 2,
        "comprehension_questions": [
          {
            "question": "对话发生在什么场所？",
            "type": "multiple_choice",
            "options": ["餐厅", "商店", "银行", "医院"],
            "correct_answer": "餐厅"
          }
        ]
      }
    },
    {
      "step": 2,
      "type": "sentence_breakdown", 
      "title": "逐句理解",
      "instruction": "分句理解，学习关键表达",
      "target_sentences": ["sent_restaurant_001"],
      "config": {
        "show_transcript": true,
        "highlight_keywords": true,
        "vocabulary_popup": true,
        "grammar_explanation": true,
        "japanese_specific": {
          "show_furigana": true,
          "kanji_breakdown": true,
          "particle_highlighting": true,
          "keigo_explanation": true
        }
      }
    },
    {
      "step": 3,
      "type": "dictation_practice",
      "title": "听写练习", 
      "instruction": "听音频，写出日语原文",
      "target_sentences": ["sent_restaurant_001"],
      "config": {
        "input_method": "typing",
        "hint_enabled": true,
        "auto_correction": false,
        "scoring_method": "character_accuracy"
      }
    },
    {
      "step": 4,
      "type": "shadowing_practice",
      "title": "跟读训练",
      "instruction": "跟读练习，注意语调和发音",
      "target_sentences": ["sent_restaurant_001"],
      "config": {
        "playback_speed": 0.8,
        "repeat_count": 3,
        "recording_enabled": true,
        "pronunciation_feedback": true,
        "real_time_scoring": true
      }
    }
  ],
  "success_criteria": {
    "listening_comprehension": 80,
    "dictation_accuracy": 85,
    "pronunciation_score": 75,
    "completion_time_max": 600
  },
  "adaptive_config": {
    "difficulty_adjustment": true,
    "speed_adaptation": true,
    "content_recommendation": true
  },
  "metadata": {
    "estimated_duration": 15,
    "difficulty_level": 2,
    "prerequisites": [],
    "tags": ["restaurant", "listening", "beginner"],
    "created_at": "2024-01-15T10:00:00Z"
  }
}
```

### 3.2 日语口语训练模块

```json
{
  "training_module_id": "speaking_restaurant_basic",
  "module_type": "speaking_practice",
  "title": "餐厅场景口语练习",
  "language_pair": {
    "target_language": "ja",
    "native_language": "zh"
  },
  "content_source": {
    "type": "dialogue",
    "dialogue_id": "restaurant_ordering_basic",
    "user_role": "customer",
    "ai_role": "waiter"
  },
  "training_steps": [
    {
      "step": 1,
      "type": "pronunciation_drill",
      "title": "发音练习",
      "instruction": "跟读关键句子，注意发音准确性",
      "target_sentences": ["sent_restaurant_001"],
      "config": {
        "phoneme_focus": ["long_vowel", "particle_pronunciation"],
        "repetition_count": 5,
        "feedback_detail": "detailed",
        "japanese_specific": {
          "pitch_accent_training": true,
          "mora_timing_practice": true,
          "keigo_pronunciation": true,
          "particle_stress": ["を", "が", "は"]
        }
      }
    },
    {
      "step": 2,
      "type": "role_play_simulation",
      "title": "角色扮演",
      "instruction": "扮演顾客，与AI服务员对话",
      "config": {
        "scenario": "restaurant_ordering",
        "ai_personality": "patient_waiter",
        "conversation_turns": 5,
        "error_correction": "gentle",
        "cultural_guidance": true
      }
    }
  ],
  "success_criteria": {
    "pronunciation_accuracy": 80,
    "fluency_score": 70,
    "conversation_completion": true,
    "cultural_appropriateness": 85
  }
}
```

---

## 4. 日语训练营配置数据结构

### 4.1 日语训练营模板结构

```json
{
  "template_id": "90day_japanese_breakthrough",
  "title": "90天日语快速突破训练营",
  "description": "专为中文母语者设计的日语零基础到日常对话流畅的系统化学习路径",
  "language_pair": {
    "target_language": "ja",
    "native_language": "zh"
  },
  "camp_config": {
    "duration_days": 90,
    "daily_time_minutes": 35,
    "difficulty_progression": "gradual",
    "target_level": "intermediate",
    "learning_style": "comprehensive"
  },
  "target_audience": {
    "current_level": ["beginner", "false_beginner"],
    "goals": ["daily_conversation", "travel", "basic_business", "jlpt_preparation"],
    "time_availability": "regular",
    "motivation_level": "high",
    "chinese_speaker_specific": {
      "kanji_advantage": true,
      "common_difficulties": ["particles", "keigo", "pronunciation"],
      "cultural_bridge": "chinese_japanese_cultural_comparison"
    }
  },
  "learning_path": [
    {
      "phase": 1,
      "title": "基础发音与问候",
      "duration_days": 14,
      "start_day": 1,
      "end_day": 14,
      "objectives": [
        "掌握假名发音规则",
        "学会基本问候用语",
        "建立日语语感基础",
        "理解基础敬语概念"
      ],
      "modules": [
        "hiragana_katakana_basics",
        "pronunciation_fundamentals",
        "greetings_formal",
        "greetings_casual",
        "self_introduction_japanese"
      ],
      "daily_structure": {
        "listening_minutes": 10,
        "speaking_practice": 15,
        "vocabulary_count": 8,
        "grammar_points": 1,
        "cultural_notes": 1,
        "japanese_specific": {
          "hiragana_practice": 5,
          "katakana_practice": 3,
          "basic_kanji": 2,
          "pitch_accent_drill": 2
        }
      },
      "milestone_test": {
        "day": 14,
        "type": "pronunciation_assessment",
        "passing_score": 75
      }
    },
    {
      "phase": 2,
      "title": "日常生活场景",
      "duration_days": 28,
      "start_day": 15,
      "end_day": 42,
      "objectives": [
        "掌握日常生活核心表达",
        "能够应对基本生活场景",
        "提升听力理解能力"
      ],
      "modules": [
        "shopping_basics",
        "restaurant_ordering",
        "transportation",
        "asking_directions",
        "medical_emergency"
      ],
      "daily_structure": {
        "listening_minutes": 15,
        "speaking_practice": 20,
        "vocabulary_count": 12,
        "grammar_points": 2,
        "cultural_notes": 1
      },
      "milestone_test": {
        "day": 42,
        "type": "scenario_simulation",
        "passing_score": 80
      }
    }
  ],
  "assessment_schedule": [
    { "day": 14, "type": "pronunciation_check", "weight": 0.2 },
    { "day": 42, "type": "scenario_simulation", "weight": 0.3 },
    { "day": 70, "type": "conversation_fluency", "weight": 0.3 },
    { "day": 90, "type": "comprehensive_final", "weight": 0.2 }
  ],
  "adaptive_features": {
    "difficulty_adjustment": true,
    "pace_modification": true,
    "content_personalization": true,
    "weakness_reinforcement": true
  },
  "success_metrics": {
    "completion_rate_target": 0.65,
    "satisfaction_score_target": 4.5,
    "skill_improvement_target": 0.80,
    "retention_rate_target": 0.45
  },
  "metadata": {
    "created_at": "2024-01-15T10:00:00Z",
    "version": "1.0",
    "created_by": "curriculum_team",
    "last_updated": "2024-01-15T10:00:00Z",
    "usage_count": 0,
    "effectiveness_score": null
  }
}
```

### 4.2 个性化训练营实例

```json
{
  "instance_id": "camp_user123_90day_001",
  "user_id": "user_123",
  "template_id": "90day_breakthrough",
  "personalization": {
    "start_date": "2024-02-01",
    "estimated_completion": "2024-05-01",
    "daily_time_budget": 40,
    "preferred_study_time": "evening",
    "difficulty_adjustment": 0.1,
    "focus_areas": ["pronunciation", "listening"],
    "skip_modules": [],
    "additional_modules": ["business_basics"]
  },
  "progress_tracking": {
    "current_day": 12,
    "current_phase": 1,
    "completion_percentage": 13.3,
    "days_active": 10,
    "days_missed": 2,
    "average_daily_time": 38,
    "skill_scores": {
      "listening": 65,
      "speaking": 58,
      "vocabulary": 72,
      "grammar": 61,
      "cultural_awareness": 55
    }
  },
  "adaptive_adjustments": [
    {
      "date": "2024-02-10",
      "type": "difficulty_increase",
      "reason": "user_performing_above_average",
      "adjustment": 0.15
    },
    {
      "date": "2024-02-12",
      "type": "additional_practice",
      "reason": "pronunciation_weakness_detected",
      "added_modules": ["pronunciation_drill_advanced"]
    }
  ],
  "milestone_results": [
    {
      "day": 14,
      "test_type": "pronunciation_check",
      "score": 82,
      "passed": true,
      "feedback": "发音准确度良好，语调需要加强"
    }
  ]
}
```

---

## 5. 语言配置数据结构

### 5.1 日语语言特征配置（当前重点）

```json
{
  "language_configs": {
    "ja": {
      "language_name": "Japanese",
      "native_name": "日本語",
      "iso_code": "ja-JP",
      "writing_systems": ["hiragana", "katakana", "kanji"],
      "romanization_system": "romaji",
      "text_direction": "ltr",
      "formality_levels": ["casual", "polite", "formal", "honorific"],
      "unique_features": {
        "has_particles": true,
        "has_honorifics": true,
        "has_pitch_accent": true,
        "word_order": "SOV",
        "has_counters": true,
        "context_dependent": true
      },
      "pronunciation_features": {
        "phoneme_inventory": {
          "vowels": ["a", "i", "u", "e", "o"],
          "consonants": ["k", "g", "s", "z", "t", "d", "n", "h", "b", "p", "m", "y", "r", "w"],
          "special_sounds": ["long_vowels", "geminate_consonants", "moraic_nasal"]
        },
        "prosodic_features": ["pitch_accent", "mora_timing"],
        "common_difficulties": [
          "l_r_distinction",
          "long_vowel_duration",
          "pitch_accent_patterns",
          "geminate_timing"
        ]
      },
      "grammar_complexity": {
        "verb_conjugation": "complex",
        "noun_cases": "none",
        "gender_system": "none",
        "honorific_system": "complex",
        "particle_system": "complex"
      },
      "cultural_factors": {
        "context_importance": "very_high",
        "hierarchy_awareness": "essential",
        "indirect_communication": "common",
        "silence_tolerance": "high"
      },
      "chinese_learner_specific": {
        "kanji_advantage": "significant",
        "common_mistakes": ["particle_confusion", "keigo_overuse", "pitch_accent"],
        "learning_strategies": ["kanji_to_vocabulary", "pattern_recognition"],
        "cultural_bridges": ["confucian_values", "business_hierarchy"]
      }
    },
    // 未来扩展语言配置（预留结构）
    "ko": {
      "language_name": "Korean",
      "native_name": "한국어",
      "iso_code": "ko-KR",
      "writing_systems": ["hangul"],
      "romanization_system": "revised_romanization",
      "text_direction": "ltr",
      "formality_levels": ["informal", "formal", "honorific"],
      "development_priority": "phase_2",
      "chinese_learner_specific": {
        "hanja_advantage": "moderate",
        "common_mistakes": ["honorific_levels", "pronunciation"],
        "cultural_bridges": ["confucian_heritage", "modern_pop_culture"]
      }
    },
    "en": {
      "language_name": "English",
      "native_name": "English",
      "iso_code": "en-US",
      "writing_systems": ["latin"],
      "romanization_system": null,
      "text_direction": "ltr",
      "formality_levels": ["informal", "formal"],
      "development_priority": "phase_3",
      "chinese_learner_specific": {
        "pronunciation_challenges": ["th_sounds", "r_l_distinction"],
        "grammar_difficulties": ["articles", "tenses"],
        "cultural_bridges": ["business_english", "academic_english"]
      }
    }
  }
}
```

---

## 6. 用户数据结构

### 6.1 用户档案结构

```json
{
  "user_id": "user_123",
  "profile": {
    "basic_info": {
      "username": "tanaka_san",
      "email": "tanaka@example.com",
      "display_name": "田中さん",
      "avatar_url": "https://cdn.nihongogo.com/avatars/user123.jpg",
      "timezone": "Asia/Shanghai",
      "preferred_language": "zh"
    },
    "learning_profile": {
      "native_language": "zh",
      "target_languages": ["ja"],
      "primary_target": "ja",
      "current_level": {
        "ja": "beginner"
      },
      "learning_goals": [
        "daily_conversation",
        "travel_communication",
        "business_basics",
        "jlpt_preparation"
      ],
      "japanese_specific": {
        "kanji_background": "traditional_chinese",
        "preferred_writing_system": "hiragana_first",
        "keigo_comfort_level": "beginner",
        "cultural_interest": ["anime", "business", "travel"]
      },
      "motivation": "work_requirement",
      "available_time": {
        "daily_minutes": 30,
        "preferred_times": ["evening"],
        "flexible_schedule": false
      },
      "learning_style": {
        "visual_learner": 0.7,
        "auditory_learner": 0.8,
        "kinesthetic_learner": 0.5,
        "reading_writing": 0.6
      }
    },
    "skill_assessment": {
      "ja": {
        "listening": {
          "level": 2,
          "score": 65,
          "last_assessed": "2024-01-15T10:00:00Z"
        },
        "speaking": {
          "level": 1,
          "score": 45,
          "last_assessed": "2024-01-15T10:00:00Z"
        },
        "vocabulary": {
          "level": 2,
          "score": 70,
          "known_words": 150,
          "last_assessed": "2024-01-15T10:00:00Z"
        },
        "grammar": {
          "level": 1,
          "score": 55,
          "last_assessed": "2024-01-15T10:00:00Z"
        },
        "cultural_awareness": {
          "level": 1,
          "score": 40,
          "last_assessed": "2024-01-15T10:00:00Z"
        }
      }
    }
  },
  "learning_history": {
    "current_training_camp": {
      "instance_id": "camp_user123_90day_001",
      "template_id": "90day_breakthrough",
      "start_date": "2024-02-01",
      "current_day": 12,
      "status": "active"
    },
    "completed_camps": [],
    "module_history": [
      {
        "module_id": "pronunciation_basics",
        "completed_date": "2024-02-10",
        "score": 82,
        "time_spent_minutes": 45
      }
    ],
    "total_study_time": 480,
    "streak_days": 10,
    "longest_streak": 15
  },
  "preferences": {
    "audio_playback_speed": 1.0,
    "subtitle_display": true,
    "pronunciation_feedback": "detailed",
    "difficulty_preference": "adaptive",
    "notification_settings": {
      "daily_reminder": true,
      "reminder_time": "19:00",
      "achievement_notifications": true,
      "progress_reports": "weekly"
    }
  },
  "metadata": {
    "created_at": "2024-01-15T10:00:00Z",
    "last_login": "2024-02-12T19:30:00Z",
    "account_status": "active",
    "subscription_type": "premium",
    "subscription_expires": "2024-12-31T23:59:59Z"
  }
}
```

---

## 7. 学习分析数据结构

### 7.1 学习会话记录

```json
{
  "session_id": "session_user123_20240212_001",
  "user_id": "user_123",
  "session_info": {
    "start_time": "2024-02-12T19:00:00Z",
    "end_time": "2024-02-12T19:35:00Z",
    "duration_minutes": 35,
    "session_type": "training_camp",
    "content_type": "listening_practice"
  },
  "content_engagement": {
    "training_camp_id": "camp_user123_90day_001",
    "day_number": 12,
    "modules_completed": [
      {
        "module_id": "listening_restaurant_basic",
        "completion_status": "completed",
        "score": 85,
        "time_spent_minutes": 15,
        "attempts": 1,
        "difficulty_level": 2
      },
      {
        "module_id": "speaking_restaurant_basic",
        "completion_status": "completed",
        "score": 78,
        "time_spent_minutes": 20,
        "attempts": 2,
        "difficulty_level": 2
      }
    ],
    "sentences_practiced": [
      {
        "sentence_id": "sent_restaurant_001",
        "practice_type": ["listening", "shadowing", "speaking"],
        "listening_score": 90,
        "pronunciation_score": 75,
        "attempts": 3,
        "mastery_level": "good"
      }
    ]
  },
  "performance_metrics": {
    "overall_session_score": 82,
    "skill_improvements": {
      "listening": 2,
      "speaking": 3,
      "vocabulary": 1,
      "pronunciation": 2
    },
    "errors_made": [
      {
        "error_type": "pronunciation",
        "sentence_id": "sent_restaurant_001",
        "specific_error": "long_vowel_duration",
        "correction_provided": true
      }
    ],
    "strengths_demonstrated": [
      "vocabulary_retention",
      "listening_comprehension"
    ],
    "areas_for_improvement": [
      "pronunciation_accuracy",
      "speaking_fluency"
    ]
  },
  "ai_feedback": {
    "session_summary": "今天的学习表现很好！听力理解有明显提升，发音方面还需要多练习长音的发音。",
    "next_session_recommendations": [
      "focus_on_pronunciation_drills",
      "practice_long_vowel_sounds"
    ],
    "difficulty_adjustment": 0.05,
    "estimated_mastery_progress": 0.15
  }
}
```

### 7.2 学习分析报告

```json
{
  "report_id": "weekly_report_user123_week6",
  "user_id": "user_123",
  "report_period": {
    "start_date": "2024-02-05",
    "end_date": "2024-02-11",
    "period_type": "weekly"
  },
  "overall_progress": {
    "study_time_total": 210,
    "study_time_target": 245,
    "completion_rate": 0.86,
    "streak_days": 6,
    "sessions_completed": 7,
    "modules_completed": 12
  },
  "skill_progress": {
    "listening": {
      "start_score": 63,
      "end_score": 68,
      "improvement": 5,
      "trend": "improving",
      "practice_time": 70
    },
    "speaking": {
      "start_score": 55,
      "end_score": 61,
      "improvement": 6,
      "trend": "improving",
      "practice_time": 85
    },
    "vocabulary": {
      "start_score": 70,
      "end_score": 74,
      "improvement": 4,
      "trend": "steady",
      "new_words_learned": 25,
      "retention_rate": 0.88
    },
    "pronunciation": {
      "start_score": 58,
      "end_score": 62,
      "improvement": 4,
      "trend": "improving",
      "focus_areas": ["long_vowels", "pitch_accent"]
    }
  },
  "content_analysis": {
    "most_challenging_modules": [
      {
        "module_id": "pronunciation_advanced",
        "difficulty_score": 8.5,
        "completion_rate": 0.6,
        "average_attempts": 3.2
      }
    ],
    "best_performing_modules": [
      {
        "module_id": "vocabulary_restaurant",
        "difficulty_score": 6.0,
        "completion_rate": 1.0,
        "average_score": 92
      }
    ],
    "sentence_mastery": {
      "mastered_sentences": 15,
      "practicing_sentences": 8,
      "struggling_sentences": 3
    }
  },
  "ai_insights": {
    "key_achievements": [
      "显著提升了听力理解能力",
      "餐厅场景对话已基本掌握",
      "词汇记忆效果良好"
    ],
    "areas_needing_attention": [
      "发音准确度需要加强",
      "语速适应能力有待提高"
    ],
    "personalized_recommendations": [
      {
        "type": "additional_practice",
        "content": "pronunciation_drill_long_vowels",
        "reason": "检测到长音发音困难",
        "priority": "high"
      },
      {
        "type": "pace_adjustment",
        "content": "slow_down_speaking_modules",
        "reason": "语速过快影响理解",
        "priority": "medium"
      }
    ],
    "next_week_focus": [
      "加强发音练习",
      "增加口语流畅度训练",
      "复习已学词汇"
    ]
  }
}
```

---

## 8. API响应格式

### 8.1 统一响应格式

```json
{
  "code": 200,
  "message": "success",
  "data": {
    // 具体数据内容
  },
  "meta": {
    "timestamp": "2024-02-12T19:30:00Z",
    "request_id": "req_123456789",
    "version": "v1.0",
    "pagination": {
      "current_page": 1,
      "per_page": 20,
      "total": 100,
      "total_pages": 5
    }
  }
}
```

### 8.2 错误响应格式

```json
{
  "code": 400,
  "message": "validation_error",
  "errors": [
    {
      "field": "sentence_id",
      "code": "required",
      "message": "句子ID不能为空"
    },
    {
      "field": "difficulty_level",
      "code": "invalid_range",
      "message": "难度等级必须在1-10之间"
    }
  ],
  "meta": {
    "timestamp": "2024-02-12T19:30:00Z",
    "request_id": "req_123456789",
    "version": "v1.0"
  }
}
```

---

## 9. 数据结构设计原则总结

### 9.1 核心设计原则

1. **解耦性**：以句子为核心单元，实现内容与逻辑分离
2. **可扩展性**：支持多语言扩展，无需重构核心结构
3. **灵活性**：模块化设计，支持灵活组合和配置
4. **一致性**：统一的数据格式和命名规范
5. **可追溯性**：完整的元数据和版本控制
6. **性能优化**：合理的数据结构设计，支持高效查询

### 9.2 当前开发重点与扩展指南

**当前重点（Phase 1）**：
- **日语功能深化**：完善日语特有的学习功能（假名、汉字、敬语、语调）
- **中文母语优化**：利用汉字优势，针对中文母语者的学习特点优化
- **核心场景完善**：餐厅、购物、交通、职场等核心场景的深度开发

**未来扩展指南**：
- **新增目标语言**：在language_configs中添加韩语、英语配置
- **新增训练模式**：扩展training_module的module_type枚举
- **新增场景**：创建新的对话模板和句子集合
- **新增评估方式**：扩展success_criteria和assessment_schedule

### 9.3 版本控制策略

- 所有数据结构包含version字段
- 向后兼容的修改递增小版本号
- 破坏性变更递增大版本号
- 保持多版本API支持，平滑迁移

---

**文档版本**: 1.0
**最后更新**: 2024-01-15
**维护团队**: nakamotochen
