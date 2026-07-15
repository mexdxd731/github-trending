<div align="center">

# Spixy — свой лаунчер для Minecraft-сервера без кода

**Конструктор лаунчеров, сайт сервера, донат-магазин и RCON — в одной платформе.**
Собери брендированный `.exe`-лаунчер с модами и автообновлением за несколько минут — без программирования и без VPS.

[**spixy.site**](https://spixy.site) · [Видео-демонстрация](https://youtu.be/YNBeOg4bV5E) · [Гайды](https://spixy.site/guides) · [Как создать лаунчер](https://spixy.site/create-minecraft-launcher)

*Spixy is a no-code platform for Minecraft server owners: a custom branded launcher (.exe), a server website with a donation store, RCON panel and Discord player login — built in minutes. [English section below](#english).*

</div>

---

## Что такое Spixy

Spixy — это облачная платформа для владельцев Minecraft-серверов. Вместо того чтобы писать собственный лаунчер на C#/Java/Python или разворачивать self-hosted решение, ты собираешь всё в веб-дашборде мышкой:

1. **Создай сборку** — выбери версию Minecraft и загрузчик (Forge, Fabric, NeoForge, Quilt), добавь моды из Modrinth/CurseForge или свои `.jar` (можно импортировать целый модпак-архив).
2. **Добавь серверы** — один лаунчер может содержать несколько серверов проекта.
3. **Оформи лаунчер** — название, логотип, цвета, фон, премиум-шаблоны интерфейса. На выходе — готовый `Windows .exe` под твой бренд (с твоей иконкой файла).
4. **Раздай игрокам** — Spixy хранит и раздаёт сборку сам. Поменял мод — игрокам при следующем запуске докачается **только этот файл** (обновления по воздуху, пофайлово).

## Возможности

| | |
|---|---|
| 🚀 **Лаунчер-конструктор** | Брендированный `.exe` без кода: логотип, цвета, шаблоны интерфейса |
| 🔄 **Автообновление сборки** | Пофайловые обновления по воздуху — без перекачивания и пересборки |
| 🧩 **Моды и модпаки** | Modrinth и CurseForge с авто-зависимостями, свои `.jar`, импорт архивов |
| 🌐 **Сайт сервера** | Конструктор сайта: шаблоны, живой статус серверов, свой поддомен |
| 💰 **Донат-магазин** | Оплата картой (₽/$/€), мгновенная автовыдача через RCON, кошелёк и промокоды |
| 🖥 **RCON-панель** | Команды на сервер прямо из браузера |
| 👥 **Аккаунты игроков** | Вход через Discord или логин+пароль (Discord как 2FA), роли, баны |
| 📊 **Аналитика** | Запуски, игроки, продажи — с экспортом отчёта |
| 🔒 **Защита сборки** | Манифесты подписаны Ed25519, привязка устройств; бан отзывает доступ к файлам |
| 🌍 **RU / EN** | Интерфейс сайта, дашборда и лаунчера на русском и английском |

## Spixy или свой лаунчер на коде?

| | Spixy (no-code, облако) | Свой лаунчер (C#/Java) или self-hosted (например, GravitLauncher) |
|---|---|---|
| Время до результата | ~5 минут | Дни–недели |
| Нужен программист | Нет | Да (написать/настроить, поддерживать) |
| Хостинг раздачи файлов | Включён (облако Spixy) | Свой VPS + настройка |
| Обновления игрокам | Автоматически, пофайлово | Настраиваешь сам |
| Сайт + донат + RCON | Встроены | Отдельные инструменты |
| Полный контроль над кодом | Нет (SaaS) | Да |

Если нужен полный контроль и есть разработчик — self-hosted решения отличны. Если нужен результат сегодня и без кода — это Spixy.

## Цены

- **Free — навсегда**: лаунчер, 1 сервер, сборка до 200 МБ. Карта не нужна.
- **Pro — $15/мес (~1000 ₽)**: до 5 серверов, 5 ГБ, сайт с донат-магазином, аккаунты игроков, RCON, аналитика, без брендинга Spixy. Пробный день бесплатно.
- **Pro навсегда — разово $300 (25 000 ₽)**: всё из Pro без ежемесячной оплаты.
- **Enterprise**: безлимит, White Label, API — по запросу.

## Частые вопросы

**Это open-source?**
Нет, Spixy — облачный сервис (SaaS). Этот репозиторий — витрина проекта. Генерируемые лаунчеры раздаются через [spixy.site](https://spixy.site) и GitHub-релизы владельцев.

**Лаунчер сломается после обновления Minecraft?**
Нет: версию игры и загрузчик фиксирует владелец сборки. Игроки получают обновления только когда владелец их публикует.

**Есть документация?**
Да: [пошаговые гайды](https://spixy.site/guides), база знаний в дашборде и поддержка через тикеты.

**Где посмотреть, как это выглядит?**
[Видео реальной работы](https://youtu.be/YNBeOg4bV5E) — сборка лаунчера от нуля до `.exe`.

**А для игроков есть что-то?**
Да — [Spixy Play](https://spixy.site/play): бесплатный лаунчер с модпаками Modrinth, любыми версиями и загрузчиками, без регистрации.

---

<a name="english"></a>

## English

**Spixy** is a no-code cloud platform for Minecraft server owners. Instead of writing a custom launcher in C#/Java or maintaining a self-hosted solution, you build everything in a web dashboard:

- **Custom branded launcher** — a Windows `.exe` with your logo, colors and UI templates, built in ~5 minutes.
- **Over-the-air updates** — change a mod and players download only that file on next start.
- **Mods & modpacks** — Modrinth and CurseForge with automatic dependencies, custom `.jar` files, archive import. Forge, Fabric, NeoForge, Quilt.
- **Server website builder** with live server status, **donation store** (card payments in RUB/USD/EUR, instant RCON auto-delivery), **browser RCON panel**, **player accounts** (Discord login or login+password with Discord 2FA), **analytics**.
- **Security**: Ed25519-signed manifests, device binding; banning a player revokes launcher and file access.
- **Pricing**: Free forever (1 server, 200 MB build) · Pro $15/mo (5 servers, 5 GB, website + store) · Pro lifetime $300 · Enterprise.

Links: [Website](https://spixy.site) · [Video demo](https://youtu.be/YNBeOg4bV5E) · [Guides](https://spixy.site/guides) · [Spixy Play (player launcher)](https://spixy.site/play)

---

<div align="center">

Сделано для владельцев Minecraft-серверов · [spixy.site](https://spixy.site)

</div>
