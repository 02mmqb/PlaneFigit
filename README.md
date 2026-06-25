# PlaneFigit ✈️

基于 Cocos Creator 3.8 开发的经典飞机大战游戏，使用 TypeScript 编写。

## 游戏演示

https://1e26e4e7ba36eadd43b14a724ef54ab4.r2.cloudflarestorage.com/store-screenapp-production/vid/6a3cf6ebda5b03f9b0257eb9/47e0afa0-2095-441b-9244-caf0eb5e0c23.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=311e7017d566d83d777c62f2aa566656%2F20260625%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260625T093805Z&X-Amz-Expires=604800&X-Amz-Signature=e04f72b96bbf7e6d567584469da0683e66379f3d4888392d682e939621967c4b&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%2247e0afa0-2095-441b-9244-caf0eb5e0c23.mp4%22%3B%20filename%2A%3D%20UTF-8%27%27QQ20260625_173423.mp4%3B&response-content-type=video%2Fmp4&x-amz-checksum-mode=ENABLED&x-id=GetObject

## 功能特性

- **触摸操控** — 手指触摸拖动控制飞机移动，手指在哪飞机就在哪
- **自动射击** — 双排子弹自动发射
- **3 种敌机** — 不同血量、速度和击杀分数
- **道具系统**
  - 🔫 子弹加速 — 临时缩短射击间隔 2 秒
  - 💣 炸弹 — 双击屏幕清屏，消灭所有敌机
- **血量系统** — 3 点生命值，受伤后短暂无敌
- **暂停/继续** — 游戏内暂停按钮
- **计分系统** — 实时分数 + 历史最高分（本地持久化）
- **游戏结束** — 显示最终分数，支持重新开始或返回主界面

## 项目结构

```
assets/
├── Code/
│   ├── Manger/
│   │   ├── gameManger.ts    # 全局游戏状态管理（单例）
│   │   └── AudioMgr.ts      # 全局音频管理（单例）
│   ├── Player.ts            # 玩家飞机
│   ├── Enemy.ts             # 敌机
│   ├── EnemyManger.ts       # 敌机与道具生成管理
│   ├── bullet.ts            # 子弹
│   ├── Rewrad.ts            # 奖励道具
│   ├── Bg.ts                # 背景循环滚动
│   ├── Score.ts             # 分数显示 & 暂停控制
│   ├── BombUI.ts            # 炸弹数量 UI
│   ├── GameOver.ts          # 游戏结束界面
│   ├── StartUI.ts           # 开始界面
│   └── game.ts              # 游戏场景入口
├── Prefabs/                 # 预制体
├── Ani/                     # 动画资源
├── Scence/                  # 场景文件
└── resources/
    ├── Audio/               # 音频资源
    └── Image/               # 图片资源
```

## 技术栈

- **引擎**：Cocos Creator 3.8
- **语言**：TypeScript
- **架构**：全局单例 + 事件驱动

## 运行项目

1. 安装 [Cocos Dashboard](https://www.cocos.com/creator)
2. 在 Dashboard 中导入本项目
3. 打开项目后选择预览即可运行
