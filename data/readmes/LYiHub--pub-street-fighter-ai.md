# Ultimate SFighterAI

本项目基于深度强化学习训练了一个能够打通《街头霸王 2：冠军特别版》（Street Fighter II: Special Champion Edition）全部 12 个街机关卡的卷积神经网络模型（NatureCNN）。我们使用隆（Ryu）作为玩家角色，完全基于游戏画面（RGB 像素值）进行决策，通过 PPO 算法学习移动、攻击和释放波动拳、旋风腿、升龙拳等招式。

本版本延续了[旧版项目](https://github.com/linyiLYi/street-fighter-ai/blob/master/README_CN.md)的训练思路，将训练范围从关底 BOSS 扩展至全部 12 个关卡。各关卡在独立的模拟器中并行运行，共同训练同一个 NatureCNN 模型。项目提供了终版模型权重和对应的训练记录，可以复现训练，或是运行测试观看 AI 模型的对战表现。

> 模型输入仅包含游戏画面。训练环境会读取内存变量中的敌我双方血量 `agent_hp` 和 `enemy_hp`，用于计算奖励和判断胜负。

### 文件结构

```text
.
├── data/                        # 关卡存档与游戏配置
│   ├── Champion.X.Level*.state  # 第 1～12 关开局存档
│   ├── data.json                # 游戏内存变量定义
│   └── scenario_full_frame.json # 游戏场景配置
├── main/                        # 训练与测试代码
│   ├── train.py                 # 全关卡并行训练与续训
│   ├── test.py                  # 逐关测试与连续闯关
│   ├── env_utils.py             # ROM 配置与环境构建
│   └── custom_wrappers.py       # 画面处理、动作映射与奖励计算
├── logs/
│   ├── trained_models/
│   │   └── ppo_ryu.zip          # 训练完成的模型权重
│   └── events.out.tfevents.*    # 训练记录
├── requirements.txt
├── LICENSE
└── README.md
```

游戏配置文件存储在 `data/` 文件夹下；项目的主要代码文件夹为 `main/`。`logs/` 中包含了训练过程的数据曲线，`logs/trained_models/` 中包含了模型权重文件，可以用于在 `test.py` 中运行测试，观看 AI 模型学习到的对战策略。

## 运行指南

本项目基于 Python 编程语言，主要使用了 [Gymnasium](https://gymnasium.farama.org/)、[Stable-Retro](https://github.com/Farama-Foundation/stable-retro)、[Stable-Baselines3](https://stable-baselines3.readthedocs.io/) 等开源代码库。建议使用 Python 3.10 配置环境；当前版本已在 macOS / Apple Silicon / Python 3.10.20 环境中验证 CPU 和 Apple MPS 路径。以下为控制台/终端指令，均从项目根目录执行。

### 环境配置

```bash
# 创建 Python 虚拟环境并安装依赖
python3.10 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

也可以使用 [Anaconda](https://www.anaconda.com/) 创建 Python 3.10 环境，再安装 `requirements.txt` 中的依赖。Windows 使用虚拟环境时，激活命令为 `.venv\Scripts\activate`；其他平台的安装要求请参考 Stable-Retro 和 PyTorch 的官方说明。

运行程序还需要《街头霸王·二：冠军特别版》美版的游戏 ROM 文件（可以理解为游戏程序本身）。Stable-Retro 不提供游戏 ROM，本项目也不包含该文件，需要自行通过合法途径获得。准备好支持的 ROM 后，通过环境变量指定其绝对路径：

```bash
export SF2_ROM_PATH="/absolute/path/to/your/rom.md"
```

Windows PowerShell 中使用 `$env:SF2_ROM_PATH = "C:\path\to\your\rom.md"`。也可以将 ROM 放在项目的 `data/street-fighter-ii-special-champion-edition-usa.md` 路径下。训练和测试程序会自动导入 ROM；如果当前 Python 环境的 Stable-Retro 已导入该 ROM，可以直接使用。

`data/` 中的 12 个 `.state` 文件保存了各关卡的开局状态，两个 `.json` 文件定义了游戏内存变量和场景配置。程序会直接读取这些文件，无需手动复制到 Stable-Retro 的安装目录。至此，环境配置准备工作完成。

### 运行测试

环境配置完成后，可以运行 `main/test.py`，实际体验智能代理的对战表现：

```bash
python -m main.test --episodes 1
```

默认测试会依次加载第 1～12 关的开局存档，每关采用三局两胜。`--episodes 1` 表示完整测试一轮全部 12 关对战；省略该参数时，默认测试 10 轮。某关失败后仍会继续测试后面的关卡，终端会输出每关的胜负、奖励、关卡胜率，以及十二关全部获胜的比例。

如果只关心测试结果、不需要观看对局，可以关闭游戏画面：

```bash
python -m main.test --episodes 1 --no-render --device cpu
```

如果想观看从第 1 关开始的连续闯关，可以运行：

```bash
python -m main.test --episodes 1 --no-load-level-saves
```

连续闯关只在开局加载第一关存档，之后通过游戏自身的关卡推进挑战下一位对手，失败即结束本次尝试。该模式会输出已挑战关卡的胜率和完整通关率。逐关测试中全部获胜表示模型通过了各关卡存档下的评估；完整通关率则以一次连续打通 12 关为准。

常用测试参数如下：

| 参数 | 作用 | 默认值 |
| --- | --- | --- |
| `--model-path PATH` | 指定待测试的 PPO 模型权重 | `logs/trained_models/ppo_ryu.zip` |
| `--episodes N` | 逐关评估遍数或连续闯关尝试次数 | `10` |
| `--no-render` | 关闭游戏画面 | 默认显示画面 |
| `--no-load-level-saves` | 从第 1 关连续闯关 | 默认逐关加载存档 |
| `--reset-round` | 逐关测试时，以单次 KO 为评估单位 | 默认三局两胜 |
| `--device auto/cpu/cuda/mps` | 选择模型推理设备 | `auto` |
| `--speed N` | 通过减少显示帧数加快可视化 | `4` |

### 训练模型

如果想要训练自己的模型，可以运行 `main/train.py`。建议先使用每关一个模拟器的配置，根据机器资源调整训练规模：

```bash
python -m main.train --envs-per-level 1 --batch-size 256 --log-dir runs/ryu
```

直接运行 `python -m main.train` 时，默认每关使用 64 个模拟器，共 768 个；一次更新收集 98,304 个样本，总训练目标为 7 亿步。这一配置需要充足的 CPU 和内存，应根据实际硬件调整。

常用训练参数如下：

| 参数 | 作用 | 默认值 |
| --- | --- | --- |
| `--envs-per-level N` | 指定每关的并行环境数量 | 未指定时每关 64 个 |
| `--total-timesteps N` | 本次训练的总步数；续训时为追加步数 | `700000000` |
| `--n-steps N` | 每个模拟器一次更新前的采样步数 | `128` |
| `--batch-size N` | PPO 更新的批次大小 | `8192` |
| `--n-epochs N` | 每批采样数据的训练轮数 | `3` |
| `--learning-rate N` | 学习率 | `0.0002` |
| `--device auto/cpu/cuda/mps` | 选择模型训练设备 | `mps` |
| `--log-dir PATH` | 模型和训练曲线输出目录 | `logs/ALL_MOTION_SIMULTANEOUS` |

如果想在提供的模型基础上继续训练，可以运行：

```bash
python -m main.train \
  --resume-model logs/trained_models/ppo_ryu.zip \
  --envs-per-level 1 --batch-size 256 \
  --total-timesteps 1000000 --log-dir runs/ryu-resume
```

训练和测试的完整参数可分别通过 `python -m main.train --help` 和 `python -m main.test --help` 查看。也支持 `python main/train.py` 和 `python main/test.py` 直接启动。

### 查看曲线

项目中包含了训练过程的 TensorBoard 曲线，可以查看智能代理在训练中的奖励变化和模型更新情况：

```bash
tensorboard --logdir=logs
```

在浏览器中打开 TensorBoard 服务默认地址 [http://localhost:6006/](http://localhost:6006/)，即可查看训练过程的交互式曲线。

如果想查看自己训练的模型曲线，将日志目录替换为训练时的输出目录即可，例如 `tensorboard --logdir=runs/ryu`。

## 实现说明

游戏画面经过居中裁剪、运动前景提取和缩放，生成 `84×84` 的图像。运动前景提取使用 `t-16、t-8、t` 的灰度差分，保留运动区域并将背景亮度乘以 0.35，分别取 R、G、B 通道，组成 `84×84×3` 的模型输入，帮助 AI 模型感知角色的移动和攻击。

动作空间包含 27 个离散动作，覆盖中立、移动、普通攻击、蹲攻击，以及左右朝向的三种特殊招式。每个动作对应四个模拟器帧的按键序列。

奖励主要根据双方血量变化计算：对对手造成伤害获得正奖励，自身受到伤害产生负奖励，击倒或被击倒还会获得额外奖励或惩罚。伤害奖励为 `0.01 × (3 × 对手掉血 − 自己掉血)`，击倒奖励为 `0.01 × (176 + 自己剩余血量)`，被击倒惩罚为 `0.01 × (176 + 对手剩余血量)`。每次实际执行动作还会扣除时间惩罚，默认值为 0.0005。

## 鸣谢

本项目使用了 [Gymnasium](https://gymnasium.farama.org/)、[Stable-Retro](https://github.com/Farama-Foundation/stable-retro)、[Stable-Baselines3](https://stable-baselines3.readthedocs.io/) 等开源代码库。感谢各位程序工作者对开源社区的贡献。

## 许可证

本项目基于 [Apache License 2.0](LICENSE) 发布。
