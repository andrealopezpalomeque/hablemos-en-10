# Hablemos en 10 — Project Instructions

## Project Overview
"Hablemos en 10" is a writing companion web app designed for a 90-year-old grandmother from Corrientes, Argentina. She is writing a book of essays — not a memoir, but her opinions, wisdom, and thoughts on topics that matter to her. The app serves as a **guide** for her handwriting sessions: it displays a topic, keywords, guiding questions, and a 10-minute timer. She writes by hand in her physical book while using the app on her tablet.

The name means **"Let's talk in 10 minutes"** — the concept is simple: pick a topic, start the timer, and write freely for 10 minutes.

## About the Grandmother (Context for AI Prompts)
- **Age**: 90 years old, turning 91 in May 2025
- **Born in**: Corrientes, Argentina
- **Profession**: Teacher (retired)
- **Life**: Traveled extensively around the globe, enjoys dancing, artisan crafts (artesanías)
- **Family**: Mother of a single daughter (the developer's mother). Spends lots of time with her grandchildren.
- **Language**: Spanish (Argentine Spanish, Corrientes regional)
- **Current interests & essay topics she's already exploring**:
  - El dólar, el dinero, la economía
  - La escuela, la educación
  - Las leyes
  - Los políticos, la política (Argentine and international)
  - Los carnavales, fiestas populares (Corrientes context)
  - Viajes (she has traveled globally)
  - Realeza: Queens of England, Reina Letizia de España, world figures she sees on TV
  - Artesanías, danza
  - Daily life and culture of Corrientes

## Tech Stack

### Core Technologies
- **Framework**: Nuxt 4 (Vue 3)
- **Package Manager**: yarn (NEVER npm)
- **Styling**: Tailwind CSS exclusively (NO custom CSS files)
- **TypeScript**: Strict typing for all data structures
- **Icons**: Iconify (`~icons/pack-name/icon-name`)
- **Deployment (Frontend)**: Firebase Hosting
- **Deployment (Backend)**: Render

### Backend & Services
- **Server**: Express.js (in `/server` folder)
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth (Google provider only)
- **AI**: Anthropic API (Claude) — for generating topics, keywords, and guiding questions

### Project Architecture
Monorepo with `client` and `server` folders:
```
/hablemos-en-10
├── CLAUDE.md                    # This file
├── README.md
├── .gitignore
│
├── /client                      # Nuxt 4 + Tailwind frontend
│   ├── nuxt.config.ts
│   ├── tailwind.config.js
│   ├── package.json
│   ├── /assets
│   │   └── /images
│   ├── /components
│   │   ├── /ui                  # Reusable UI components
│   │   │   ├── Timer.vue        # 10-minute countdown timer
│   │   │   ├── TopicCard.vue    # Displays topic + keywords + questions
│   │   │   ├── WelcomeMessage.vue  # Personalized greeting
│   │   │   └── Button.vue       # Big, accessible buttons
│   │   └── /layout
│   │       ├── Header.vue
│   │       └── Footer.vue
│   ├── /composables
│   │   ├── useAuth.ts           # Firebase Auth logic
│   │   ├── useTopics.ts         # Topic generation & history
│   │   └── useTimer.ts          # Timer logic
│   ├── /layouts
│   │   └── default.vue
│   ├── /pages
│   │   ├── index.vue            # Landing / login
│   │   ├── home.vue             # Main screen after login
│   │   └── history.vue          # Past topics explored
│   ├── /plugins
│   │   └── firebase.client.ts   # Firebase initialization
│   ├── /stores
│   │   └── user.ts              # Pinia store for user state
│   ├── /types
│   │   └── index.ts             # TypeScript interfaces
│   └── /public
│       └── favicon.ico
│
├── /server                      # Express.js backend
│   ├── package.json
│   ├── /src
│   │   ├── index.ts             # Express entry point
│   │   ├── /routes
│   │   │   └── topics.ts        # POST /api/topics/generate
│   │   ├── /services
│   │   │   ├── anthropic.ts     # Anthropic API integration
│   │   │   └── firebase-admin.ts # Firebase Admin SDK
│   │   ├── /middleware
│   │   │   └── auth.ts          # Verify Firebase ID tokens
│   │   └── /types
│   │       └── index.ts
│   └── /config
│       └── environment.ts
│
└── /docs
    └── PHASES.md                # Development phases
```

## Design Principles

### UX for a 90-Year-Old
- **Big text**: Minimum 18px body, 24px+ for topic titles and timer
- **High contrast**: Dark text on light backgrounds, clear visual hierarchy
- **Minimal buttons**: Maximum 2-3 actions visible at any time
- **Tablet-first**: Designed for tablet screen sizes (her primary device)
- **No scrolling needed**: Everything important fits in one viewport
- **Gentle feedback**: Soft sounds or subtle animations, nothing jarring
- **Spanish only**: All UI text in Argentine Spanish, warm and familiar tone

### Visual Identity
- **Warm, inviting colors**: Think earthy tones, soft yellows, warm whites — nothing cold or corporate
- **Typography**: Clean, readable, generous line height and letter spacing
- **Feeling**: Like opening a nice notebook, not like using an app

### Personalized Messages
On login, the app greets her with warm, rotating messages like:
- "Qué lindo que estés acá, abuela ✨"
- "Hoy es un buen día para escribir"
- "Tu sabiduría merece ser contada"
- Time-of-day aware: "Buenas tardes" / "Buen día"
- Could reference her name or something personal

## API Integration — Anthropic (Claude)

### Topic Generation Prompt Strategy
The server calls the Anthropic API to generate topics. The system prompt must be deeply grounded in:
- **Corrientes, Argentina** — local culture, geography, traditions
- **Her generation** — born ~1934, lived through Perón, the dictatorship, the return of democracy, hyperinflation, dollarization, etc.
- **Her interests** — education, travel, politics, royalty, carnavales, artesanías, dance
- **Her voice** — she wants to give opinions, not just recall memories. The prompts should provoke thought, not nostalgia alone.

### What the API Returns
For each topic, the API should return:
```json
{
  "topic": "Los Carnavales de Corrientes",
  "keywords": ["comparsa", "corso", "disfraz", "murga", "tablado", "alegría"],
  "questions": [
    "¿Qué sentías cuando escuchabas la música del carnaval?",
    "¿Cómo cambió el carnaval desde que eras joven hasta hoy?",
    "¿Qué opinás sobre cómo se vive el carnaval ahora?"
  ],
  "category": "cultura"
}
```

### Categories for Topics
- `educacion` — La escuela, los maestros, la enseñanza
- `economia` — El dólar, el dinero, el trabajo
- `politica` — Políticos, leyes, gobierno, historia política
- `cultura` — Carnavales, fiestas, tradiciones, artesanías, danza
- `viajes` — Lugares que visitó, el mundo, comparaciones
- `mundo` — Realeza, figuras internacionales, lo que ve en TV
- `vida` — Familia, sabiduría, reflexiones personales, daily life in Corrientes

## Firestore Data Structure

### Collections
```
users/
  {uid}/
    displayName: string
    email: string
    photoURL: string
    createdAt: timestamp
    lastLogin: timestamp

users/{uid}/completedTopics/
  {topicId}/
    topic: string
    keywords: string[]
    questions: string[]
    category: string
    completedAt: timestamp
    timerCompleted: boolean  # Did she finish the full 10 min?
```

## Environment Variables

### Client (`/client/.env`)
```
NUXT_PUBLIC_FIREBASE_API_KEY=
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NUXT_PUBLIC_FIREBASE_PROJECT_ID=
NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NUXT_PUBLIC_FIREBASE_APP_ID=
NUXT_PUBLIC_API_BASE_URL=          # Render backend URL
```

### Server (`/server/.env`)
```
ANTHROPIC_API_KEY=
FIREBASE_SERVICE_ACCOUNT=          # JSON string or path
PORT=3001
ALLOWED_ORIGINS=                   # Firebase Hosting URL
```

## Coding Standards
- Use `<script setup lang="ts">` in all Vue components
- Use Composition API exclusively (no Options API)
- Use Pinia for state management
- All API responses typed with TypeScript interfaces
- Error handling on every API call with user-friendly Spanish messages
- Accessible HTML: proper aria labels, semantic elements, focus management
- Mobile/tablet-first responsive design with Tailwind breakpoints

## Important Reminders
- **NEVER use npm** — always yarn
- **NEVER write custom CSS** — Tailwind only
- **All text in Spanish** (Argentine Spanish)
- **Tablet-first design** — this is used on a tablet
- **Keep it simple** — the user is 90 years old. Every screen should be immediately obvious.
- **Warm tone** — this is a gift, not a product. Every interaction should feel loving.
