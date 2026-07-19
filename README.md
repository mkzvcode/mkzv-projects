# MKZV Projects

A growing collection of front-end site projects and design studies — landing pages, product pages, small web apps. Each project lives in its own folder below, self-contained with no shared build step.

---

## [lamzu-site](./lamzu-site) — Lamzu Atlantis Mini

Apple-style concept product page for a fictional wireless gaming mouse. Every visual is hand-drawn SVG — no stock photography, no scraped product images.

![Lamzu Atlantis Mini hero](./assets/lamzu-hero.png)

**Highlights**
- Pinned scrollytelling "anatomy" section (shell → sensor → battery) with a sticky, reactive illustration
- Animated spec counters, magnetic buttons, cross-document view-transitions between pages
- Light/dark theme toggle with system-preference detection and no flash-of-wrong-theme
- Filterable shop catalog with a native `<dialog>` quick-view modal

![Lamzu shop catalog](./assets/lamzu-shop.png)

**Stack:** HTML · CSS · JavaScript — zero dependencies, zero build step.

**Run locally:**
```bash
cd lamzu-site
python -m http.server 8000
# open http://localhost:8000
```

---

## [terra](./terra) — Terra, семейная винодельня

Люкс-лендинг для вымышленной винодельни: сторителлинг «от лозы до бокала», терруар с рисованной SVG-картой виноградника и работающий интерактивный сомелье, который подбирает вино по вкусу и блюду.

![Terra hero](./assets/terra-hero.png)

**Highlights**
- Кинематографичный hero с параллаксом, кастомным курсором и построчной анимацией заголовка (GSAP + ScrollTrigger + Lenis)
- Таймлайн «4 шага ремесла» с линией, которая прорисовывается при скролле
- SVG-карта виноградника с анимированной прорисовкой рядов лозы
- Интерактивный сомелье: два вопроса → подбор вина из коллекции

**Stack:** HTML · CSS · JavaScript · GSAP · ScrollTrigger · Lenis — без сборки.

**Запуск локально:**
```bash
cd terra
python -m http.server 8000
```

---

## [nova](./nova) — Nova, необанк

Финтех-лендинг для необанка: живая аналитика трат на интерактивном donut-графике, рабочий конвертер валют и калькулятор кэшбэка.

![Nova hero](./assets/nova-hero.png)

**Highlights**
- Bento-сетка возможностей с мини-диаграммами категорий трат
- Интерактивный donut-график (Chart.js) — наведение показывает сумму и долю по категории
- Рабочий конвертер валют и калькулятор кэшбэка на слайдерах
- 3D-наклон телефона за курсором, тёмная тема, glassmorphism

**Stack:** HTML · Tailwind CSS · JavaScript · Chart.js — без сборки.

**Запуск локально:**
```bash
cd nova
python -m http.server 8000
```

---

## [forme](./forme) — Forme, архитектурное бюро

Брутально-минималистичный лендинг для архитектурного бюро: горизонтальная лента проектов на Swiper и лайтбокс с описанием каждого объекта.

![Forme hero](./assets/forme-hero.png)

**Highlights**
- Горизонтальный скролл проектов (Swiper) с прогресс-баром
- Лайтбокс с навигацией стрелками/клавиатурой и описанием проекта
- Секция «Три принципа» (свет, тишина, материал) с hover-инверсией
- Полоса чисел со счётчиками, лента наград

**Stack:** HTML · CSS · JavaScript · Swiper — без сборки.

**Запуск локально:**
```bash
cd forme
python -m http.server 8000
```

---

## [pulse](./pulse) — Pulse, фестиваль электронной музыки

Rave-лендинг для музыкального фестиваля: обратный отсчёт до старта, переключаемый по дням лайнап с цветовой легендой сцен и билеты трёх категорий.

![Pulse hero](./assets/pulse-hero.png)

**Highlights**
- Живой таймер обратного отсчёта (дни / часы / минуты / секунды)
- Лайнап по трём дням с переключателем и цветовой маркировкой сцен
- Кинетические строки с именами артистов и реагирующие на курсор цветные блобы
- Секции «Сцены» и «Инфо» с практическими деталями

**Stack:** HTML · CSS · JavaScript — без зависимостей, без сборки.

**Запуск локально:**
```bash
cd pulse
python -m http.server 8000
```

---

## [synthex](./synthex) — Synthex, AI-ассистент для команд

SaaS-лендинг для AI-ассистента: сценарии использования в табах, тумблер помесячной/годовой оплаты с анимацией цены, переключение тёмной/светлой темы и FAQ-аккордеон.

![Synthex hero](./assets/synthex-hero.png)

**Highlights**
- Анимированный gradient-mesh фон, ротация слова в заголовке
- 4 сценария использования в табах с live-превью карточек
- Тумблер тарифов помесячно/год с анимированным пересчётом цены
- Переключение тёмной/светлой темы с сохранением выбора (localStorage)

**Stack:** HTML · Tailwind CSS · JavaScript — без сборки.

**Запуск локально:**
```bash
cd synthex
python -m http.server 8000
```

---

## Adding a new project

1. Create a new top-level folder, e.g. `my-new-site/`
2. Keep it self-contained (its own `index.html`, `css/`, `js/`)
3. Add a section to this README following the pattern above — a screenshot in `assets/`, a short description, the stack, and how to run it locally
