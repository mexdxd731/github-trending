# VoiceTransleter V3

![VoiceTransleter V3](VoiceTransleter_V3.png)

**Дубляж видео с переводом речи на русский язык с синтезом голоса (любой язык → RU).**

[![Build All Platforms](https://github.com/AndranikFutureLabs/VoiceTransleter_V3/actions/workflows/build.yml/badge.svg)](https://github.com/AndranikFutureLabs/VoiceTransleter_V3/actions/workflows/build.yml)

**Версия:** 3.0.0  
**Автор:** Андраник Алавердян ([@AndranikFutureLabs](https://t.me/AndranikFutureLabs))  
**Сайт:** [andranik-future-labs.ru](https://andranik-future-labs.ru)  
**GitHub:** [github.com/AndranikFutureLabs/VoiceTransleter_V3](https://github.com/AndranikFutureLabs/VoiceTransleter_V3)

---

## ⚠️ Важно: DeepSeek API (платный)

**VoiceTransleter V3 использует DeepSeek API для перевода — это платный сервис.**

DeepSeek API предоставляет высококачественный перевод с сохранением контекста по всему видео, правильной обработкой технических терминов и единую терминологию. Это значительно точнее бесплатного Google Translate, но требует оплаты.

### Как получить DeepSeek API ключ

1. Зарегистрируйтесь на [platform.deepseek.com](https://platform.deepseek.com)
2. Перейдите в **API Keys** → **Create New Key**
3. Скопируйте ключ (начинается с `sk-...`)
4. **Пополните баланс** — перевод стоит доли цента за минуту видео
   - 10-минутное видео ≈ $0.01–0.02
   - 60-минутное видео ≈ $0.05–0.10
5. Вставьте ключ в приложение:
   - **В интерфейсе:** поле «DeepSeek API ключ» → введите `sk-...` → нажмите OK
   - **Или в .env файле:** `DEEPSEEK_API_KEY=sk-ваш_ключ`

### Нет денег на DeepSeek?

Используйте **VoiceTransleter V2** — бесплатную версию с Google Translate:
- Репозиторий: [github.com/AndranikFutureLabs/VoiceTransleter_V2](https://github.com/AndranikFutureLabs/VoiceTransleter_V2)
- Перевод через `google-translate-api-x` (бесплатно, без ключа)
- Модель Whisper `medium` (легче и быстрее)

---

## Возможности

- **Распознавание речи** — faster-whisper (модель medium, CUDA с fallback на CPU)
- **Перевод на русский** — DeepSeek API, batch-режим с сохранением контекста по всему видео
- **Синтез речи** — XTTS v2 (Coqui TTS) с клонированием голоса по WAV-образцу
- **Per-segment синхронизация** — индивидуальная подгонка каждого сегмента под тайм-слот
- **Устранение ASR-галлюцинаций** — детекция и схлопывание повторяющихся сегментов
- **Склейка рублёных фраз** — объединение сегментов, разрезанных внутри одной фразы
- **Дробление под лимит XTTS** — корректное разделение длинного текста (char_limits[ru]=182)
- **Словарь акронимов** — правильное произношение технических терминов (BGP, VXLAN, etc.)
- **8 текстовых файлов** — SRT + plain, исходный текст, перевод, транслитерация
- **Кроссплатформенность** — Windows, macOS, Linux

---

## Технологии

| Компонент | Технология |
|-----------|-----------|
| Интерфейс | Electron 33 + Vue 3 + TypeScript + Tailwind CSS |
| Распознавание речи | faster-whisper (CTranslate2, модель medium, **CUDA**) |
| Перевод | **DeepSeek API** (deepseek-v4-flash), batch-режим с контекстом |
| Синтез речи | coqui-tts — XTTS v2 (**CUDA**, клонирование голоса) |
| Обработка видео | FFmpeg (system или встроенный) |
| Синхронизация | Per-segment (FFmpeg atempo/adelay/apad) |
| Сборка | electron-vite + electron-builder (NSIS / DMG / AppImage) |

---

## Установка

### Требования

- Node.js 20+
- Python 3.9–3.12 (проверено на 3.11.9)
- NVIDIA GPU с CUDA (опционально; без GPU работает на CPU, но медленнее)
- FFmpeg (можно загрузить через интерфейс)
- **DeepSeek API ключ** ([platform.deepseek.com](https://platform.deepseek.com))

### Сборка из исходников

```bash
git clone https://github.com/AndranikFutureLabs/VoiceTransleter_V3.git
cd VoiceTransleter_V3

# Node.js зависимости
npm install

# Python окружение
python3 -m venv .venv
source .venv/bin/activate  # Linux/Mac | .venv\Scripts\activate  # Windows

# Python пакеты
pip install faster-whisper coqui-tts[codec] transformers==4.57.6
pip install torch torchvision torchaudio  # CPU версия

# Запуск
export DEEPSEEK_API_KEY=sk-ваш_ключ
npm run dev
```

### Сборка дистрибутива

```bash
npm run dist          # Windows x64 (NSIS)
npm run dist:mac      # macOS (DMG)
npm run dist:linux    # Linux (AppImage + DEB)
npm run dist:all      # все платформы
```

---

## Использование

> ⚠️ **Загрузите образец голоса перед первым дубляжем!**  
> Без образца XTTS v2 использует нестабильную заглушку — голос будет звучать по-разному на каждом сегменте.  
> Загрузите WAV с чистой речью (6–30 секунд, без шума) через кнопку **«Добавить голос»**.

### Дубляж видео

1. Запустите VoiceTransleter V3
2. Введите DeepSeek API ключ в поле «DeepSeek API ключ» (или задайте через `.env`)
3. Дождитесь загрузки моделей — Whisper medium (~1.5 ГБ) и XTTS v2 (~2.5 ГБ) скачиваются один раз
4. **Загрузите образец голоса** через «Добавить голос»
5. Загрузите видеофайл (MP4, AVI, MKV, MOV, WebM)
6. Выберите язык оригинала (или «Автоопределение»)
7. Выберите голос
8. Нажмите **«Начать дубляж»**

### Этапы пайплайна

| Шаг | Описание |
|---|---|
| **[1/5]** | Извлечение аудио из видео (FFmpeg) |
| **[2/5]** | Распознавание речи (Whisper) + дедупликация галлюцинаций + склейка рублёных сегментов |
| **[3/5]** | Перевод на русский (DeepSeek API, batch-режим с контекстом) |
| **[4/5]** | Синтез речи (XTTS v2) + дробление длинных сегментов + произношение акронимов |
| **[5/5]** | Сборка видео (per-segment синхронизация через FFmpeg) |

### Результаты

| Файл | Описание |
|------|----------|
| `*_dubbed.mp4` | Готовое видео с русской озвучкой |
| `*_source.txt` | Исходный текст (SRT с таймингами) |
| `*_source_plain.txt` | Исходный текст без таймингов |
| `*_translation.txt` | Перевод на русский (SRT) |
| `*_translation_plain.txt` | Перевод без таймингов |
| `*_source_translit.txt` | Транслитерация оригинала (SRT) |
| `*_source_translit_plain.txt` | Транслитерация оригинала без таймингов |
| `*_translation_translit.txt` | Транслитерация перевода (SRT) |
| `*_translation_translit_plain.txt` | Транслитерация перевода без таймингов |

---

## DeepSeek API — подробно

### Почему DeepSeek вместо Google Translate?

| | Google Translate (V2) | DeepSeek API (V3) |
|---|---|---|
| Стоимость | Бесплатно | Платно (доли цента/мин) |
| Качество перевода | Хорошее | Отличное |
| Контекст между сегментами | ❌ (построчно) | ✅ (batch-режим, весь текст сразу) |
| Технические термины | Буквальный перевод | Контекстный (как говорят инженеры) |
| Согласованность терминологии | ❌ | ✅ (единая терминология по всему видео) |
| Retry при ошибках | ❌ | ✅ (exponential backoff на 503/429) |

### Как работает перевод в V3

1. **Batch-режим:** все сегменты видео отправляются одним запросом с маркерами `[[[PART_N]]]...[[[/PART_N]]]`
2. **Контекст:** модель видит весь текст сразу → согласованная терминология
3. **Технический промпт:** системный промпт настроен под перевод для озвучки IT-контента
4. **Fallback:** если DeepSeek нарушит структуру маркеров → автоматический откат на построчный перевод
5. **Retry:** при 503/429 (перегрузка) — автоматический retry с exponential backoff (до 3 попыток)

### Стоимость

| Длина видео | Примерная стоимость |
|---|---|
| 5 минут | ~$0.005 |
| 10 минут | ~$0.01–0.02 |
| 30 минут | ~$0.03–0.05 |
| 60 минут | ~$0.05–0.10 |

---

## Переменные окружения

| Переменная | По умолчанию | Описание |
|-----------|-------------|----------|
| `DEEPSEEK_API_KEY` | — | API ключ DeepSeek (**обязательно для перевода**) |
| `DEEPSEEK_MODEL` | `deepseek-v4-flash` | Модель DeepSeek |
| `WHISPER_MODEL` | `medium` | Модель Whisper (medium / large-v3) |
| `WHISPER_DEVICE` | `cuda` | Устройство Whisper (cuda / cpu) |
| `TTS_DEVICE` | `cuda` | Устройство TTS (cuda / cpu) |
| `VOICE_TRANSLATOR_PYTHON` | авто | Путь к Python интерпретатору |

---

## Структура проекта

```
VoiceTransleter_V3/
├── src/renderer/src/             # Vue 3 фронтенд
│   ├── components/
│   │   ├── DeepSeekKey.vue        # Виджет ввода DeepSeek API ключа
│   │   ├── StatusBadge.vue        # Бейджи статуса (CUDA / CPU / кэш)
│   │   ├── VideoDropZone.vue      # Зона загрузки видео
│   │   └── ...
│   └── App.vue
├── electron/
│   ├── main/
│   │   ├── index.ts              # Главный процесс Electron
│   │   ├── pipeline.ts           # Пайплайн дубляжа
│   │   ├── whisper.ts            # Whisper sidecar (CUDA + fallback CPU)
│   │   ├── tts.ts                # XTTS sidecar (CUDA + fallback CPU)
│   │   ├── translator.ts         # DeepSeek batch-перевод
│   │   ├── sync.ts               # Per-segment синхронизация
│   │   ├── acronyms.ts           # Словарь произношения акронимов
│   │   ├── ffmpeg.ts             # FFmpeg обёртка
│   │   ├── python_deps.ts        # Python-зависимости (автоустановка)
│   │   └── ...
│   └── preload/
├── scripts/
│   ├── whisper_server.py         # Python ASR сервер
│   └── tts_server.py             # Python TTS сервер
├── resources/                    # Иконки, FFmpeg
├── .github/workflows/build.yml   # CI: сборка для всех платформ
├── package.json
└── AGENTS.md
```

---

## Системные требования

- **ОС:** Windows 10+, macOS 11+, Linux (Ubuntu 20.04+)
- **ОЗУ:** 8 ГБ минимум, 16 ГБ рекомендуется
- **GPU:** NVIDIA с CUDA (опционально; без GPU — CPU mode, в 5-10 раз медленнее)
- **Диск:** 10 ГБ (модели ~4 ГБ)
- **Python:** 3.9–3.12
- **DeepSeek API:** платный, ~$0.05 за 60-минутное видео

---

## Устранение неполадок

### `DEEPSEEK_API_KEY не задан`
Введите ключ в интерфейсе (поле «DeepSeek API ключ») или в `.env` файле.

### `DeepSeek API error 402: Insufficient Balance`
Пополните баланс на [platform.deepseek.com](https://platform.deepseek.com) → Billing.

### `ImportError: cannot import name 'isin_mps_friendly'`
Несовместимость transformers с coqui-tts: `pip install "transformers==4.57.6"`

### `Coqui TTS requires PyTorch`
Установите PyTorch: `pip install torch torchvision torchaudio`

### Голос звучит по-разному / как шум
Загрузите WAV-образец (6–30 сек, чистая речь) через «Добавить голос».

### `CUDA out of memory`
Проверьте зависшие процессы: `nvidia-smi` → `kill <PID>`

---

## Сравнение V2 и V3

| | V2 (бесплатно) | V3 (платный DeepSeek) |
|---|---|---|
| Перевод | Google Translate (бесплатно) | DeepSeek API (платно) |
| Whisper модель | medium | medium (large-v3 опционально) |
| Batch-перевод | ❌ | ✅ |
| Контекст между сегментами | ❌ | ✅ |
| Per-segment синхронизация | ❌ | ✅ |
| Устранение галлюцинаций | ❌ | ✅ |
| Словарь акронимов | ❌ | ✅ |
| CUDA поддержка | ❌ | ✅ |

**Репозиторий V2:** [github.com/AndranikFutureLabs/VoiceTransleter_V2](https://github.com/AndranikFutureLabs/VoiceTransleter_V2)

---

## Лицензия

MIT License

Copyright (c) 2026 Андраник Алавердян (AndranikFutureLabs)

---

## Благодарности

Данная версия построена на ветке от основного продукта [VoiceTransleter_V2](https://github.com/slashix/VoiceTransleter_V2) от [@slashix](https://github.com/slashix).

### Что изменено в этой версии:
- Исправлена структура проекта, ошибки, таймауты
- Убрана тяжёлая модель распознавания (`large-v3`) — заменена на лёгкую `medium` с таким же хорошим результатом
- Убрана тяжёлая модель синтеза — оптимизирована для CPU
- Добавлен интерфейс для ввода DeepSeek API ключа
- Добавлены CUDA-бейджи статуса в интерфейсе
- Увеличены таймауты для длинных видео
- Добавлен кэш Python-зависимостей (не проверяет повторно)
- Добавлены иконки приложения и favicon

---

© 2024-2026 AndranikFutureLabs. Все права защищены.
