# GKMSMainWheel

学園アイドルマスター 的考试引擎与原生核心、培育模拟器、出牌网络。

Ver1.0 Morgendämmerung

| 目录 | 内容 |
|---|---|
| `GakumasCLI/` | 考试引擎、C++ 原生核心 |
| `GKMSPS/` | 培育模拟器 |
| `GKMSUINet/` | 出牌网络 |

## 准备

Python 3.11 以上。仓库不含游戏数据，master 由 [vertesan/gakumasu-diff](https://github.com/vertesan/gakumasu-diff) 在本地生成。

```
pip install -r requirements.txt
git clone --depth 1 https://github.com/vertesan/gakumasu-diff ../gakumasu-diff
python -B GakumasCLI/gkms.py master-bootstrap build --mirror ../gakumasu-diff
```

原生核心：

- Linux：`sh GakumasCLI/native/build.sh`
- Windows：在仓库根目录的 `gkms.local.cmd` 写入 `set "GKMS_VCVARS=<vcvars64.bat 的路径>"`，再运行 `GakumasCLI\native\build.cmd GakumasCLI\native\build`

GKMSUINet 的训练与导出另需 `torch`、`onnxruntime`。

## 使用

```
python -B -m GKMSPS.ps.cli play GKMSPS/examples/formation.json
python -B -m GKMSPS.ps.cli auto GKMSPS/examples/formation.json --engine
pip install pytest
python -m pytest -q tests
```

## 许可证

[AGPL-3.0-or-later](LICENSE)
