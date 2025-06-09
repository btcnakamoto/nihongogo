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
  "scenario_classification": {
    "primary_category": "food_dining",
    "secondary_category": "restaurant_ordering",
    "scenario_tags": ["restaurant", "service_request", "polite_ordering"],
    "usage_frequency": "high",
    "practical_importance": "essential",
    "cultural_context": "japanese_restaurant_etiquette"
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

## 2. 学习材料语境分类设计

### 2.1 核心语境大分类

基于中文母语者学习日语的实际需求，设计10个核心语境大分类，确保完整覆盖在日生活的所有重要场景：

```json
{
  "scenario_categories": {
    // === 基础生存类 (Level 1) ===
    "daily_life": {
      "category_id": "daily_life",
      "name": "日常生活",
      "description": "基础生活场景，包含问候、家庭、时间等核心表达",
      "priority": 1,
      "difficulty_range": [1, 3],
      "target_sentences": 160,
      "subcategories": [
        {
          "id": "greetings_basic",
          "name": "基础问候",
          "description": "日常见面问候和告别用语",
          "target_count": 20,
          "examples": ["おはようございます", "こんにちは", "さようなら"]
        },
        {
          "id": "greetings_polite",
          "name": "礼貌寒暄",
          "description": "正式场合和陌生人的礼貌用语",
          "target_count": 15,
          "examples": ["お疲れ様でした", "はじめまして", "失礼します"]
        },
        {
          "id": "family_introduction",
          "name": "家庭介绍",
          "description": "家庭成员介绍和家庭关系表达",
          "target_count": 18,
          "examples": ["家族紹介", "両親です", "兄弟がいます"]
        },
        {
          "id": "home_activities",
          "name": "家庭活动",
          "description": "家务、用餐、休息等家庭日常活动",
          "target_count": 20,
          "examples": ["ご飯できたよ", "掃除します", "テレビを見ます"]
        },
        {
          "id": "time_expressions",
          "name": "时间表达",
          "description": "时间、日期、星期的基础表达",
          "target_count": 18,
          "examples": ["今日は何曜日", "明日の朝", "来週の予定"]
        },
        {
          "id": "schedule_planning",
          "name": "日程安排",
          "description": "约会、计划、时间安排相关表达",
          "target_count": 15,
          "examples": ["約束の時間", "スケジュール確認", "遅刻の連絡"]
        },
        {
          "id": "weather_daily",
          "name": "天气描述",
          "description": "日常天气状况和感受表达",
          "target_count": 18,
          "examples": ["今日は暑いですね", "雨が降っています", "風が強いです"]
        },
        {
          "id": "seasons_festivals",
          "name": "季节节日",
          "description": "四季变化和传统节日相关表达",
          "target_count": 16,
          "examples": ["桜が咲きました", "夏祭りです", "お正月おめでとう"]
        },
        {
          "id": "personal_feelings",
          "name": "个人感受",
          "description": "情绪、感觉、身体状态的基础表达",
          "target_count": 20,
          "examples": ["嬉しいです", "疲れました", "元気です"]
        }
      ]
    },
    "food_dining": {
      "category_id": "food_dining",
      "name": "餐饮美食",
      "description": "餐厅用餐、点餐、美食相关的高频实用场景",
      "priority": 2,
      "difficulty_range": [1, 4],
      "target_sentences": 140,
      "subcategories": [
        {
          "id": "restaurant_entering",
          "name": "进店入座",
          "description": "进入餐厅、等位、入座的基础流程",
          "target_count": 15,
          "examples": ["いらっしゃいませ", "何名様ですか", "こちらの席へどうぞ"]
        },
        {
          "id": "menu_browsing",
          "name": "菜单浏览",
          "description": "看菜单、询问推荐、了解菜品",
          "target_count": 18,
          "examples": ["メニューをください", "おすすめは何ですか", "これは何ですか"]
        },
        {
          "id": "food_ordering",
          "name": "点餐下单",
          "description": "正式点餐和确认订单",
          "target_count": 20,
          "examples": ["注文をお願いします", "これをください", "同じものを二つ"]
        },
        {
          "id": "dietary_requirements",
          "name": "饮食要求",
          "description": "过敏、忌口、特殊饮食需求",
          "target_count": 15,
          "examples": ["アレルギーがあります", "辛いものが苦手です", "ベジタリアンです"]
        },
        {
          "id": "dining_etiquette",
          "name": "用餐礼仪",
          "description": "用餐过程中的礼貌用语和行为",
          "target_count": 12,
          "examples": ["いただきます", "ごちそうさま", "お箸をください"]
        },
        {
          "id": "convenience_store",
          "name": "便利店购物",
          "description": "便利店购买食品和日用品",
          "target_count": 18,
          "examples": ["温めてください", "袋は要りません", "ポイントカードはありますか"]
        },
        {
          "id": "payment_checkout",
          "name": "结账付款",
          "description": "各种付款方式和结账流程",
          "target_count": 15,
          "examples": ["お会計をお願いします", "カードで払えますか", "レシートをください"]
        },
        {
          "id": "takeout_delivery",
          "name": "外卖打包",
          "description": "外带、打包、外卖相关表达",
          "target_count": 12,
          "examples": ["持ち帰りでお願いします", "配達はできますか", "包装してください"]
        },
        {
          "id": "food_feedback",
          "name": "用餐反馈",
          "description": "对食物的评价和反馈",
          "target_count": 15,
          "examples": ["美味しいです", "少し塩辛いです", "もう少し温かくしてください"]
        }
      ]
    },
    "transportation": {
      "category_id": "transportation",
      "name": "交通出行",
      "description": "交通工具、路线咨询、出行相关的必需场景",
      "priority": 3,
      "difficulty_range": [1, 4],
      "target_sentences": 120,
      "subcategories": [
        {
          "id": "train_basics",
          "name": "电车基础",
          "description": "电车购票、进站、基础乘车流程",
          "target_count": 18,
          "examples": ["切符を買います", "改札を通ります", "ホームはどこですか"]
        },
        {
          "id": "train_navigation",
          "name": "电车导航",
          "description": "路线查询、换乘、时刻表相关",
          "target_count": 20,
          "examples": ["どの電車に乗ればいいですか", "乗り換えはどこですか", "終電は何時ですか"]
        },
        {
          "id": "subway_metro",
          "name": "地铁系统",
          "description": "地铁特有的表达和导航",
          "target_count": 15,
          "examples": ["地下鉄の入口", "出口は何番ですか", "エスカレーターはどこ"]
        },
        {
          "id": "bus_public",
          "name": "公交巴士",
          "description": "公交车乘坐和询问",
          "target_count": 15,
          "examples": ["バス停はどこですか", "○○行きのバス", "次のバス停で降ります"]
        },
        {
          "id": "taxi_ride",
          "name": "出租车",
          "description": "打车、告知目的地、付费",
          "target_count": 18,
          "examples": ["○○まで行ってください", "料金はいくらですか", "ここで降ります"]
        },
        {
          "id": "directions_asking",
          "name": "问路指路",
          "description": "迷路时的求助和指路表达",
          "target_count": 15,
          "examples": ["道に迷いました", "○○はどこにありますか", "地図を見せてください"]
        },
        {
          "id": "airport_procedures",
          "name": "机场流程",
          "description": "机场办理手续和导航",
          "target_count": 12,
          "examples": ["チェックインをお願いします", "搭乗券はどこでもらえますか", "手荷物検査はどこですか"]
        },
        {
          "id": "travel_planning",
          "name": "出行规划",
          "description": "行程规划和交通选择",
          "target_count": 7,
          "examples": ["一番早い方法は", "所要時間はどのくらい", "料金を比較したい"]
        }
      ]
    },
    "shopping_services": {
      "category_id": "shopping_services",
      "name": "购物服务",
      "description": "购物消费、银行金融、邮寄快递、通信网络等生活服务",
      "priority": 4,
      "difficulty_range": [2, 5],
      "target_sentences": 150,
      "subcategories": [
        {
          "id": "clothing_shopping",
          "name": "服装购物",
          "description": "服装试穿、尺码、款式选择",
          "target_count": 20,
          "examples": ["試着してもいいですか", "サイズはありますか", "他の色はありますか"]
        },
        {
          "id": "electronics_shopping",
          "name": "电子产品",
          "description": "电子产品购买和咨询",
          "target_count": 15,
          "examples": ["保証期間はどのくらい", "使い方を教えてください", "修理はできますか"]
        },
        {
          "id": "grocery_shopping",
          "name": "日用品购物",
          "description": "超市购物和日用品选择",
          "target_count": 18,
          "examples": ["賞味期限はいつまで", "国産ですか", "オーガニックはありますか"]
        },
        {
          "id": "price_bargaining",
          "name": "价格咨询",
          "description": "价格询问、折扣、优惠活动",
          "target_count": 15,
          "examples": ["割引はありますか", "セール中ですか", "ポイントは使えますか"]
        },
        {
          "id": "banking_basic",
          "name": "银行基础",
          "description": "开户、存取款、基础银行业务",
          "target_count": 18,
          "examples": ["口座を開きたいです", "お金を引き出したいです", "残高を確認したい"]
        },
        {
          "id": "banking_advanced",
          "name": "银行高级",
          "description": "转账、汇款、投资理财",
          "target_count": 12,
          "examples": ["振込をお願いします", "海外送金はできますか", "定期預金について"]
        },
        {
          "id": "postal_services",
          "name": "邮政服务",
          "description": "邮寄包裹、信件、快递服务",
          "target_count": 15,
          "examples": ["荷物を送りたいです", "受け取りサインをお願いします", "追跡番号を教えてください"]
        },
        {
          "id": "mobile_contracts",
          "name": "手机合约",
          "description": "手机合约、套餐选择",
          "target_count": 12,
          "examples": ["携帯電話の契約をしたいです", "プランを変更したい", "解約したいです"]
        },
        {
          "id": "internet_wifi",
          "name": "网络服务",
          "description": "网络连接、WiFi、网络故障",
          "target_count": 10,
          "examples": ["WiFiのパスワードは何ですか", "通信速度が遅いです", "インターネットが繋がらない"]
        },
        {
          "id": "customer_service",
          "name": "客户服务",
          "description": "投诉、退换货、售后服务",
          "target_count": 15,
          "examples": ["返品したいです", "交換してください", "苦情を言いたいです"]
        }
      ]
    },

    // === 生活安居类 (Level 2) ===
    "accommodation": {
      "category_id": "accommodation",
      "name": "住宿居住",
      "description": "酒店住宿、租房找房、水电煤气、邻里关系等居住相关",
      "priority": 5,
      "difficulty_range": [2, 5],
      "target_sentences": 110,
      "subcategories": [
        {
          "id": "hotel_checkin",
          "name": "酒店入住",
          "description": "酒店预订、入住手续、房间安排",
          "target_count": 15,
          "examples": ["チェックインをお願いします", "予約をしています", "部屋をアップグレードできますか"]
        },
        {
          "id": "hotel_services",
          "name": "酒店服务",
          "description": "酒店设施使用、服务请求",
          "target_count": 15,
          "examples": ["ルームサービスをお願いします", "タオルを交換してください", "WiFiのパスワードは"]
        },
        {
          "id": "hotel_checkout",
          "name": "酒店退房",
          "description": "退房手续、账单确认、行李寄存",
          "target_count": 10,
          "examples": ["チェックアウトをお願いします", "荷物を預けられますか", "領収書をください"]
        },
        {
          "id": "house_hunting",
          "name": "找房看房",
          "description": "房屋搜索、看房、房屋条件咨询",
          "target_count": 18,
          "examples": ["部屋を探しています", "見学させてください", "駅から何分ですか"]
        },
        {
          "id": "rental_contract",
          "name": "租房合同",
          "description": "租房合同、押金、租金相关",
          "target_count": 15,
          "examples": ["家賃はいくらですか", "敷金は必要ですか", "契約書にサインします"]
        },
        {
          "id": "utilities_setup",
          "name": "水电开通",
          "description": "水电煤气开通、缴费、故障报修",
          "target_count": 15,
          "examples": ["電気の開通をお願いします", "ガス料金を払いたい", "水道が出ません"]
        },
        {
          "id": "neighborhood_relations",
          "name": "邻里关系",
          "description": "邻居交往、社区规则、噪音问题",
          "target_count": 12,
          "examples": ["隣の住人です", "騒音でご迷惑をおかけしました", "ゴミの出し方を教えてください"]
        },
        {
          "id": "home_maintenance",
          "name": "房屋维护",
          "description": "房屋维修、设备故障、清洁服务",
          "target_count": 10,
          "examples": ["エアコンが壊れました", "修理をお願いします", "掃除サービスはありますか"]
        }
      ]
    },
    "government_admin": {
      "category_id": "government_admin",
      "name": "行政手续",
      "description": "市役所办事、签证手续、居民登录、税务申报等行政事务",
      "priority": 6,
      "difficulty_range": [3, 6],
      "target_sentences": 100,
      "subcategories": [
        {
          "id": "resident_registration",
          "name": "居民登录",
          "description": "住民票、转入转出手续",
          "target_count": 18,
          "examples": ["住民票をください", "転入届を出したいです", "住所変更をしたい"]
        },
        {
          "id": "official_documents",
          "name": "官方文件",
          "description": "各种证明书、印鑑登录",
          "target_count": 15,
          "examples": ["印鑑登録をしたいです", "証明書が必要です", "戸籍謄本をください"]
        },
        {
          "id": "visa_procedures",
          "name": "签证手续",
          "description": "签证申请、更新、变更",
          "target_count": 20,
          "examples": ["ビザの更新をしたいです", "在留資格を変更したい", "永住権を申請したいです"]
        },
        {
          "id": "immigration_issues",
          "name": "入管问题",
          "description": "在留卡、再入国许可等入管事务",
          "target_count": 15,
          "examples": ["在留カードを紛失しました", "再入国許可をお願いします", "期限が切れそうです"]
        },
        {
          "id": "tax_procedures",
          "name": "税务手续",
          "description": "所得税、住民税等税务申报",
          "target_count": 12,
          "examples": ["確定申告をしたいです", "税金を払いたいです", "納税証明書をください"]
        },
        {
          "id": "health_insurance",
          "name": "健康保险",
          "description": "国民健康保险加入和手续",
          "target_count": 12,
          "examples": ["健康保険に加入したいです", "保険証を紛失しました", "保険料を払いたい"]
        },
        {
          "id": "pension_system",
          "name": "年金制度",
          "description": "国民年金相关手续",
          "target_count": 8,
          "examples": ["年金の手続きをお願いします", "年金手帳をなくしました", "免除申請をしたい"]
        }
      ]
    }
  }
}
```

    // === 社会融入类 (Level 3) ===
    "workplace": {
      "category_id": "workplace",
      "name": "职场商务",
      "description": "商务会议、邮件沟通、职场文化、求职面试等职业发展",
      "priority": 7,
      "difficulty_range": [3, 6],
      "target_sentences": 140,
      "subcategories": [
        {
          "id": "job_searching",
          "name": "求职找工作",
          "description": "求职网站、简历投递、工作咨询",
          "target_count": 15,
          "examples": ["仕事を探しています", "履歴書を送りました", "面接の予定はいつですか"]
        },
        {
          "id": "job_interview",
          "name": "面试过程",
          "description": "面试问答、自我介绍、能力展示",
          "target_count": 20,
          "examples": ["自己紹介をお願いします", "志望動機を教えてください", "いつから働けますか"]
        },
        {
          "id": "workplace_greetings",
          "name": "职场问候",
          "description": "职场日常问候和礼貌用语",
          "target_count": 15,
          "examples": ["お疲れ様です", "おはようございます", "失礼します"]
        },
        {
          "id": "business_meetings",
          "name": "商务会议",
          "description": "会议发言、讨论、决策表达",
          "target_count": 20,
          "examples": ["会議を始めましょう", "資料を配布します", "質問はありますか"]
        },
        {
          "id": "email_business",
          "name": "商务邮件",
          "description": "邮件写作、回复、文件传送",
          "target_count": 18,
          "examples": ["メールを送りました", "返信をお待ちしています", "添付ファイルをご確認ください"]
        },
        {
          "id": "phone_business",
          "name": "商务电话",
          "description": "电话接听、转接、留言",
          "target_count": 15,
          "examples": ["お電話ありがとうございます", "少々お待ちください", "伝言をお願いします"]
        },
        {
          "id": "client_service",
          "name": "客户服务",
          "description": "客户接待、服务提供、问题解决",
          "target_count": 15,
          "examples": ["いらっしゃいませ", "ご不明な点はございますか", "申し訳ございません"]
        },
        {
          "id": "office_culture",
          "name": "职场文化",
          "description": "同事关系、加班、职场规则",
          "target_count": 12,
          "examples": ["先輩にお聞きします", "残業をお願いします", "お先に失礼します"]
        },
        {
          "id": "presentations",
          "name": "演示汇报",
          "description": "工作汇报、演示文稿、数据展示",
          "target_count": 10,
          "examples": ["発表させていただきます", "グラフをご覧ください", "ご質問をお受けします"]
        }
      ]
    },
    "social_culture": {
      "category_id": "social_culture",
      "name": "社交文化",
      "description": "社交互动、娱乐休闲、文化活动、教育培训等社会融入",
      "priority": 8,
      "difficulty_range": [2, 5],
      "target_sentences": 120,
      "subcategories": [
        {
          "id": "making_friends",
          "name": "结交朋友",
          "description": "认识新朋友、社交邀请、联系方式",
          "target_count": 18,
          "examples": ["友達になりませんか", "今度一緒に飲みませんか", "連絡先を交換しましょう"]
        },
        {
          "id": "party_gathering",
          "name": "聚会活动",
          "description": "聚会邀请、活动安排、集体活动",
          "target_count": 15,
          "examples": ["パーティーに来ませんか", "みんなで集まりましょう", "飲み会をしませんか"]
        },
        {
          "id": "entertainment_movies",
          "name": "娱乐观影",
          "description": "电影、电视、娱乐节目相关",
          "target_count": 15,
          "examples": ["映画を見に行きませんか", "面白い番組があります", "コンサートに行きたい"]
        },
        {
          "id": "karaoke_games",
          "name": "卡拉OK游戏",
          "description": "卡拉OK、游戏、娱乐活动",
          "target_count": 12,
          "examples": ["カラオケに行きましょう", "ゲームをしませんか", "ボウリングはどうですか"]
        },
        {
          "id": "sports_exercise",
          "name": "运动健身",
          "description": "运动、健身、户外活动",
          "target_count": 15,
          "examples": ["一緒に運動しませんか", "ジムに通っています", "テニスをしましょう"]
        },
        {
          "id": "cultural_festivals",
          "name": "文化节庆",
          "description": "传统节日、祭典、文化活动",
          "target_count": 15,
          "examples": ["お祭りに参加したいです", "花見をしませんか", "お正月の準備"]
        },
        {
          "id": "traditional_arts",
          "name": "传统艺术",
          "description": "茶道、花道、书法等传统文化",
          "target_count": 10,
          "examples": ["茶道を習いたいです", "書道に興味があります", "着物を着てみたい"]
        },
        {
          "id": "education_learning",
          "name": "教育学习",
          "description": "语言学习、技能培训、资格考试",
          "target_count": 12,
          "examples": ["日本語学校に通っています", "資格試験を受けます", "勉強を教えてください"]
        },
        {
          "id": "travel_sightseeing",
          "name": "旅游观光",
          "description": "旅游计划、景点推荐、观光活动",
          "target_count": 8,
          "examples": ["観光地を教えてください", "一緒に旅行しませんか", "写真を撮ってください"]
        }
      ]
    },

    // === 应急保障类 (Level 4) ===
    "medical_health": {
      "category_id": "medical_health",
      "name": "医疗健康",
      "description": "医院就诊、药店购药、健康咨询、保险理赔等医疗保健",
      "priority": 9,
      "difficulty_range": [2, 5],
      "target_sentences": 110,
      "subcategories": [
        {
          "id": "hospital_appointment",
          "name": "医院预约",
          "description": "预约挂号、科室选择、时间安排",
          "target_count": 15,
          "examples": ["予約を取りたいです", "何科に行けばいいですか", "いつ空いていますか"]
        },
        {
          "id": "symptom_description",
          "name": "症状描述",
          "description": "身体不适、疼痛、症状详细描述",
          "target_count": 20,
          "examples": ["頭が痛いです", "熱があります", "咳が止まりません"]
        },
        {
          "id": "medical_examination",
          "name": "医疗检查",
          "description": "体检、检查项目、检查结果",
          "target_count": 15,
          "examples": ["検査をお願いします", "結果はいつ分かりますか", "レントゲンを撮ります"]
        },
        {
          "id": "doctor_consultation",
          "name": "医生问诊",
          "description": "与医生交流、病情咨询、治疗方案",
          "target_count": 15,
          "examples": ["具合が悪いです", "どのくらいで治りますか", "薬は必要ですか"]
        },
        {
          "id": "pharmacy_medicine",
          "name": "药店购药",
          "description": "购买药品、用药咨询、副作用",
          "target_count": 15,
          "examples": ["薬をください", "副作用はありますか", "処方箋を持ってきました"]
        },
        {
          "id": "health_insurance",
          "name": "医疗保险",
          "description": "保险使用、费用支付、报销手续",
          "target_count": 12,
          "examples": ["保険は使えますか", "自己負担はいくらですか", "領収書をください"]
        },
        {
          "id": "dental_care",
          "name": "牙科治疗",
          "description": "牙科问题、治疗、口腔护理",
          "target_count": 10,
          "examples": ["歯が痛いです", "虫歯があります", "歯のクリーニングをお願いします"]
        },
        {
          "id": "emergency_medical",
          "name": "急诊医疗",
          "description": "急诊、紧急医疗、救护车",
          "target_count": 8,
          "examples": ["救急車を呼んでください", "緊急です", "すぐに診てください"]
        }
      ]
    },
    "emergency_disaster": {
      "category_id": "emergency_disaster",
      "name": "紧急灾害",
      "description": "地震、火灾、台风等自然灾害和紧急情况的应对",
      "priority": 10,
      "difficulty_range": [2, 5],
      "target_sentences": 80,
      "subcategories": [
        {
          "id": "earthquake_response",
          "name": "地震应对",
          "description": "地震发生时的应急反应和安全措施",
          "target_count": 15,
          "examples": ["地震です！", "机の下に隠れてください", "避難してください"]
        },
        {
          "id": "fire_emergency",
          "name": "火灾逃生",
          "description": "火灾报警、逃生路线、消防安全",
          "target_count": 15,
          "examples": ["火事です！", "119番に電話してください", "非常口はどこですか"]
        },
        {
          "id": "typhoon_weather",
          "name": "台风天气",
          "description": "台风预警、避难准备、停电停水",
          "target_count": 12,
          "examples": ["台風警報が出ています", "避難所はどこですか", "停電しています"]
        },
        {
          "id": "emergency_calls",
          "name": "紧急呼救",
          "description": "紧急电话、求助、报警",
          "target_count": 15,
          "examples": ["助けてください！", "救急車を呼んでください", "警察に連絡してください"]
        },
        {
          "id": "crime_safety",
          "name": "犯罪安全",
          "description": "遇到犯罪、人身安全、财物安全",
          "target_count": 10,
          "examples": ["泥棒です！", "財布を盗まれました", "安全な場所はどこですか"]
        },
        {
          "id": "lost_found",
          "name": "遗失物品",
          "description": "物品遗失、寻找帮助、失物招领",
          "target_count": 8,
          "examples": ["財布をなくしました", "パスポートを紛失しました", "交番はどこですか"]
        },
        {
          "id": "traffic_accidents",
          "name": "交通事故",
          "description": "交通事故处理、伤害报告",
          "target_count": 5,
          "examples": ["事故が起きました", "怪我をしています", "保険会社に連絡します"]
        }
      ]
    }
  }
}
```

### 2.3 分类设计原则

#### 实用性优先原则
```
高频使用场景 > 低频场景
生存必需 > 娱乐补充
通用场景 > 特殊场景
```

#### 学习梯度设计
```
Level 1: 日常生活、餐饮美食 (生存基础)
Level 2: 购物消费、交通出行 (生活便利)
Level 3: 住宿服务、职场商务 (深度融入)
Level 4: 社交互动、医疗急救 (全面掌握)
```

#### 中文母语者特点
```
利用汉字优势: 职场商务、正式场合
文化差异重点: 社交礼仪、餐饮文化
实用导向: 交通出行、购物消费
安全保障: 医疗急救、紧急情况
```

### 2.4 AI内容生成规模

```json
{
  "content_generation_targets": {
    // === MVP阶段 (Level 1) - 基于高频性重新分配 ===
    "daily_life": {
      "sentences": 800,
      "subcategories": 9,
      "frequency_breakdown": {
        "greetings_basic": 120,        // 超高频：每天必用
        "greetings_polite": 80,        // 高频：工作场合常用
        "family_introduction": 60,     // 中频：社交需要
        "home_activities": 100,        // 高频：家庭日常
        "time_expressions": 120,       // 超高频：每天必用
        "schedule_planning": 80,       // 高频：工作生活
        "weather_daily": 100,          // 高频：日常话题
        "seasons_festivals": 60,       // 中频：季节性
        "personal_feelings": 80        // 高频：情感表达
      },
      "dialogues": 25,
      "vocabulary": 400,
      "cultural_notes": 20,
      "estimated_hours": 80
    },
    "food_dining": {
      "sentences": 700,
      "subcategories": 9,
      "frequency_breakdown": {
        "restaurant_entering": 60,     // 高频：外出用餐
        "menu_browsing": 100,          // 超高频：每次用餐
        "food_ordering": 120,          // 超高频：每次用餐
        "dietary_requirements": 60,    // 中频：特殊需求
        "dining_etiquette": 80,        // 高频：礼貌必需
        "convenience_store": 120,      // 超高频：日常购物
        "payment_checkout": 100,       // 超高频：每次消费
        "takeout_delivery": 40,        // 中频：外卖需求
        "food_feedback": 20            // 低频：评价反馈
      },
      "dialogues": 22,
      "vocabulary": 350,
      "cultural_notes": 18,
      "estimated_hours": 70
    },
    "transportation": {
      "sentences": 600,
      "subcategories": 8,
      "frequency_breakdown": {
        "train_basics": 100,           // 超高频：日常通勤
        "train_navigation": 120,       // 超高频：路线查询
        "subway_metro": 80,            // 高频：城市交通
        "bus_public": 60,              // 中频：补充交通
        "taxi_ride": 80,               // 高频：便利出行
        "directions_asking": 100,      // 高频：问路需求
        "airport_procedures": 40,      // 低频：旅行需求
        "travel_planning": 20          // 低频：规划需求
      },
      "dialogues": 18,
      "vocabulary": 300,
      "cultural_notes": 15,
      "estimated_hours": 60
    },
    "shopping_services": {
      "sentences": 700,
      "subcategories": 10,
      "frequency_breakdown": {
        "clothing_shopping": 80,       // 高频：服装需求
        "electronics_shopping": 40,   // 中频：电子产品
        "grocery_shopping": 120,       // 超高频：日常采购
        "price_bargaining": 80,        // 高频：价格咨询
        "banking_basic": 100,          // 高频：银行业务
        "banking_advanced": 40,        // 中频：复杂业务
        "postal_services": 60,         // 中频：邮寄需求
        "mobile_contracts": 60,        // 中频：通信服务
        "internet_wifi": 80,           // 高频：网络问题
        "customer_service": 40         // 中频：售后服务
      },
      "dialogues": 20,
      "vocabulary": 350,
      "cultural_notes": 18,
      "estimated_hours": 70
    },

    // === Phase 2 (Level 2) ===
    "accommodation": {
      "sentences": 110,
      "subcategories": 8,
      "dialogues": 12,
      "vocabulary": 165,
      "cultural_notes": 10,
      "estimated_hours": 32
    },
    "government_admin": {
      "sentences": 100,
      "subcategories": 7,
      "dialogues": 10,
      "vocabulary": 150,
      "cultural_notes": 12,
      "estimated_hours": 30
    },

    // === Phase 3 (Level 3) ===
    "workplace": {
      "sentences": 140,
      "subcategories": 9,
      "dialogues": 15,
      "vocabulary": 210,
      "cultural_notes": 18,
      "estimated_hours": 40
    },
    "social_culture": {
      "sentences": 120,
      "subcategories": 9,
      "dialogues": 12,
      "vocabulary": 180,
      "cultural_notes": 15,
      "estimated_hours": 35
    },

    // === Phase 4 (Level 4) ===
    "medical_health": {
      "sentences": 110,
      "subcategories": 8,
      "dialogues": 12,
      "vocabulary": 165,
      "cultural_notes": 12,
      "estimated_hours": 32
    },
    "emergency_disaster": {
      "sentences": 80,
      "subcategories": 7,
      "dialogues": 8,
      "vocabulary": 120,
      "cultural_notes": 10,
      "estimated_hours": 25
    }
  },

  "development_phases": {
    "mvp_phase": {
      "categories": ["daily_life", "food_dining", "transportation", "shopping_services"],
      "total_sentences": 2800,
      "total_subcategories": 36,
      "total_dialogues": 85,
      "total_vocabulary": 1400,
      "total_cultural_notes": 71,
      "estimated_development_hours": 280,
      "frequency_distribution": {
        "ultra_high_frequency": 1200,  // 超高频：43%
        "high_frequency": 1000,        // 高频：36%
        "medium_frequency": 480,       // 中频：17%
        "low_frequency": 120          // 低频：4%
      }
    },
    "phase_2": {
      "categories": ["accommodation", "government_admin"],
      "total_sentences": 210,
      "total_subcategories": 15,
      "total_dialogues": 22,
      "total_vocabulary": 315,
      "total_cultural_notes": 22,
      "estimated_development_hours": 62
    },
    "phase_3": {
      "categories": ["workplace", "social_culture"],
      "total_sentences": 260,
      "total_subcategories": 18,
      "total_dialogues": 27,
      "total_vocabulary": 390,
      "total_cultural_notes": 33,
      "estimated_development_hours": 75
    },
    "phase_4": {
      "categories": ["medical_health", "emergency_disaster"],
      "total_sentences": 190,
      "total_subcategories": 15,
      "total_dialogues": 20,
      "total_vocabulary": 285,
      "total_cultural_notes": 22,
      "estimated_development_hours": 57
    },
    "complete_system": {
      "total_sentences": 5200,
      "total_subcategories": 84,
      "total_dialogues": 180,
      "total_vocabulary": 2600,
      "total_cultural_notes": 180,
      "estimated_development_hours": 520,
      "mvp_percentage": "53.8%"
    }
  }
}
```

---

## 3. 日语对话场景数据结构

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
    "primary_category": "food_dining",
    "secondary_category": "restaurant_ordering",
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
    "context": "午餐时间，顾客刚刚坐下准备点餐",
    "difficulty_level": 2,
    "cultural_importance": "high"
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

### 9.4 数据去重和增量更新机制

#### 9.4.1 多层次去重检查

为确保将来补充数据时不与已有数据重复，系统采用三层去重机制：

```json
{
  "deduplication_strategy": {
    "level_1_exact_match": {
      "method": "content_hash",
      "description": "基于日语原文的MD5哈希完全匹配检查",
      "threshold": 1.0,
      "action": "reject"
    },
    "level_2_semantic_similarity": {
      "method": "semantic_hash",
      "description": "基于中文翻译的语义相似度检查",
      "threshold": 0.85,
      "action": "warn_and_suggest_modification"
    },
    "level_3_structural_similarity": {
      "method": "structure_hash",
      "description": "基于语法模式和词性序列的结构相似度检查",
      "threshold": 0.90,
      "action": "limit_quantity"
    }
  }
}
```

#### 9.4.2 句子指纹系统

每个句子生成唯一指纹用于去重检查：

```json
{
  "sentence_fingerprint": {
    "sentence_id": "sent_food_dining_ordering_001",
    "content_hash": "a1b2c3d4e5f6...",
    "semantic_hash": "x1y2z3w4v5u6...",
    "structure_hash": "p1q2r3s4t5u6...",
    "category": "food_dining",
    "subcategory": "food_ordering",
    "difficulty_level": 3,
    "created_at": "2024-01-15T10:00:00Z",
    "generation_batch": "batch_food_dining_ordering_20240115_100000"
  }
}
```

#### 9.4.3 版本管理和增量计划

```json
{
  "version_management": {
    "current_version": {
      "version_id": "v_food_dining_ordering_20240115_100000",
      "sentence_count": 120,
      "file_path": "data/food_dining/ordering_v1.json",
      "checksum": "abc123def456...",
      "is_active": true
    },
    "increment_plan": {
      "target_count": 700,
      "current_count": 120,
      "increment_needed": 580,
      "priority": "high",
      "estimated_hours": 58.0,
      "batch_strategy": {
        "batch_size": 30,
        "max_retries": 5,
        "duplicate_tolerance": 0.1
      }
    }
  }
}
```

#### 9.4.4 智能生成策略

```json
{
  "smart_generation": {
    "diversity_requirements": {
      "target_difficulty_distribution": {
        "N5": 0.05, "N4": 0.25, "N3": 0.30, "N2": 0.20, "N1": 0.20
      },
      "grammar_diversity_required": true,
      "vocabulary_diversity_required": true,
      "cultural_context_variety": ["casual", "polite", "formal"]
    },
    "quality_thresholds": {
      "grammar_score_min": 0.8,
      "translation_score_min": 0.8,
      "cultural_score_min": 0.8,
      "duplicate_tolerance": 0.1
    },
    "generation_monitoring": {
      "success_rate_target": 0.8,
      "duplicate_rate_limit": 0.2,
      "retry_strategy": "exponential_backoff"
    }
  }
}
```

#### 9.4.5 增量更新工作流

1. **现状分析**: 扫描现有数据，统计各分类当前数量
2. **缺口识别**: 对比目标分配，识别需要补充的分类和数量
3. **策略制定**: 根据优先级和重复风险制定生成策略
4. **批量生成**: 按批次生成新内容，实时去重检查
5. **质量验证**: 多维度质量检查，确保内容质量
6. **版本注册**: 注册新版本，更新活跃状态
7. **报告生成**: 生成详细的增量更新报告

这套机制确保了：
- ✅ **零重复**: 三层去重检查确保内容唯一性
- ✅ **可追溯**: 完整的版本历史和生成记录
- ✅ **智能化**: 基于现状自动调整生成策略
- ✅ **高质量**: 多维度质量控制和监控
- ✅ **可扩展**: 支持任意规模的增量更新

---

**文档版本**: 1.1
**最后更新**: 2024-01-15
**维护团队**: nakamotochen
