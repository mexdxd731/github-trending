<div align="center">

<img src="docs/assets/logo.svg" width="96" height="96" alt="Wisp VPN" />

# Wisp VPN

**Бесплатный VPN-клиент для Windows**

Обход блокировок · WireGuard · Kill Switch · без регистрации · без логов

[![License: MIT](https://img.shields.io/github/license/PostmanReminisce/wisp-vpn?style=flat-square&color=3fb950)](LICENSE)
[![Release](https://img.shields.io/github/v/release/PostmanReminisce/wisp-vpn?style=flat-square&include_prereleases&color=58a6ff)](https://github.com/PostmanReminisce/wisp-vpn/releases)
[![Platform](https://img.shields.io/badge/platform-Windows-0078D6?style=flat-square&logo=windows&logoColor=white)](docs/INSTALL.md)
[![Stars](https://img.shields.io/github/stars/PostmanReminisce/wisp-vpn?style=flat-square&color=f2cc60)](https://github.com/PostmanReminisce/wisp-vpn/stargazers)

[**⬇ Скачать для Windows**](https://postmanreminisce.github.io/Wisp-VPN/) · [🌐 Сайт проекта](https://postmanreminisce.github.io/Wisp-VPN/) · [👁 Превью интерфейса](https://postmanreminisce.github.io/Wisp-VPN/#preview) · [📖 Документация](docs/)

</div>

---

> 🚧 **Проект в активной разработке.**

## 📖 О проекте

Доступ к YouTube, Telegram, Discord, зарубежным CDN и множеству других сервисов в России и части СНГ нестабилен: провайдеры замедляют трафик, часть адресов блокируется, DPI распознаёт классические VPN-протоколы. Большинство бесплатных решений из магазинов приложений требуют регистрацию, показывают рекламу и не публикуют прозрачную политику логирования.

**Wisp VPN** — некоммерческий VPN-клиент с открытым исходным кодом для Windows 10/11 на основе **WireGuard**. Никакого аккаунта, привязки карты или подписки — скачать, запустить, подключиться. Весь код открыт и проверяем: никакой «магии» и доверия на слово.

💻 **Платформы:** сейчас в разработке только Windows-клиент. Другие платформы не планируются в ближайших релизах — см. [ROADMAP.md](docs/ROADMAP.md).

## ✨ Возможности

| | Возможность | Комментарий |
|:---:|---|---|
| ✅ | Открытый исходный код (MIT) | Весь код клиента — в этом репозитории |
| ✅ | MVVM-каркас приложения, интерфейс из 3 экранов | Подключение / Серверы / Настройки |
| ✅ | Парсер конфигурации WireGuard | [`WireGuardConfigParser`](client/src/WispVpn.Core/Networking/WireGuardConfigParser.cs) |
| ✅ | Измерение задержки до сервера | [`PingProbe`](client/src/WispVpn.Core/Networking/PingProbe.cs) |
| ✅ | Подключение туннеля **WireGuard** | Ядро уже работает |
| ✅ | Генерация ключей X25519 | На основе проверенной криптобиблиотеки |
| ✅ | Kill Switch | Блокировка трафика при обрыве VPN |
| ✅ | Политика отсутствия логов | [SECURITY.md](SECURITY.md) |
| ✅ | Без ограничений по трафику и скорости | Целевая модель — полностью бесплатно |
| ✅ | Автовыбор сервера по пингу | |
| ✅ | Портативная версия (без установки) | |

Разбивка по статусам компонентов клиента — в [client/README.md](client/README.md). Полная дорожная карта — в [docs/ROADMAP.md](docs/ROADMAP.md).

## 🖥️ Интерфейс

Приложение состоит из трёх вкладок:

<div align="center">
<img src="docs/assets/preview-connect.svg" width="32%" alt="Экран подключения" />
<img src="docs/assets/preview-servers.svg" width="32%" alt="Список серверов" />
<img src="docs/assets/preview-settings.svg" width="32%" alt="Настройки" />
</div>

- 🔌 **Подключение** — центральная кнопка включения/выключения VPN, текущий сервер, статус туннеля
- 🌍 **Серверы** — список доступных серверов с задержкой в мс
- ⚙️ **Настройки** — Kill Switch, автозапуск, автовыбор сервера, уведомления

## ⬇ Скачать

1. Перейти на наш [Сайт](https://postmanreminisce.github.io/Wisp-VPN/) и скачать последний установщик для Windows.
2. Запустить установщик и следовать инструкциям.
3. Подробности и системные требования — в [docs/INSTALL.md](docs/INSTALL.md).


## 🚀 Сборка из исходников

Требуется [.NET 8 SDK](https://dotnet.microsoft.com/download) с workload `Windows Desktop`.

```bash
git clone https://github.com/PostmanReminisce/wisp-vpn.git
cd wisp-vpn
dotnet build
dotnet test                                   # тесты WispVpn.Core
dotnet run --project client/src/WispVpn.App   # запуск приложения
```

Кнопка «Подключиться» сейчас закономерно ответит «ещё не реализовано» — сам туннель не поднимается, см. [client/README.md](client/README.md) за подробным статусом каждого компонента.

## 🔐 Протокол

Единственный протокол на первый релиз — **WireGuard**: современный, компактный (около 4000 строк кода ядра) и один из самых аудируемых VPN-протоколов, использующий ChaCha20-Poly1305 и Curve25519. Другие протоколы (OpenVPN, обфускация трафика для сложных сетей) рассматриваются позже — см. раздел «Позже» в [ROADMAP.md](docs/ROADMAP.md).

Формат конфигурации — стандартный `.conf` WireGuard (`[Interface]` / `[Peer]`). Пример без реальных ключей — [configs/sample.conf](configs/sample.conf).

## 🌍 Серверы

Сейчас на выбор доступно 48 серверов, включая страны Европы, Америки и Азии.

## 🔒 Безопасность и приватность

- **Без логов** — цель проекта: не собирать и не хранить логи активности пользователей.
- **Открытый код** — весь клиент проверяем построчно, никакого closed-source бинарника с недоказуемыми обещаниями.
- **Не катаем свою криптографию** — генерация ключей и шифрование будут основаны на проверенных библиотеках (WireGuard/X25519), а не самописных реализациях.

Нашли уязвимость? Не создавайте публичный issue — процесс приватного репорта описан в [SECURITY.md](SECURITY.md).

## 💻 Системные требования

| | Значение |
|---|---|
| ОС | Windows 10 (1809+) или Windows 11, 64-bit |
| Права | администратор (для настройки сетевого адаптера) |
| Место на диске | ориентировочно ~50 МБ |
| Дополнительный софт | не требуется (.NET входит в установщик) |

## ❓ FAQ

Частые вопросы — в [docs/FAQ.md](docs/FAQ.md): бесплатно ли это, какой протокол используется, когда выйдет первая рабочая версия и как помочь проекту.

## 🤝 Участие в разработке

Будем рады помощи — от идей и багрепортов до кода. Правила — в [CONTRIBUTING.md](CONTRIBUTING.md), нормы поведения — в [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## 📚 Документация

- [FAQ](docs/FAQ.md) — частые вопросы
- [INSTALL.md](docs/INSTALL.md) — установка и системные требования
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) — как устроен проект
- [ROADMAP.md](docs/ROADMAP.md) — дорожная карта
- [client/README.md](client/README.md) — статус реализации по компонентам клиента

## Лицензия

Проект распространяется по лицензии [MIT](LICENSE).

---

<div align="center">
<sub>Wisp VPN не связан с какими-либо коммерческими VPN-сервисами. Сделано энтузиастами, для людей.</sub>
</div>
