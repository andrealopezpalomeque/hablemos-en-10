# Hablemos en 10 — Development Phases

## Phase 1: Project Skeleton & Repository Setup
**Goal**: Get the monorepo running locally with both client and server.

- [ ] Create GitHub repository: `hablemos-en-10`
- [ ] Set up monorepo structure: `/client` and `/server` folders
- [ ] Initialize Nuxt 4 in `/client` with Tailwind CSS, TypeScript, Pinia
- [ ] Initialize Express in `/server` with TypeScript
- [ ] Add CLAUDE.md to root
- [ ] Add .gitignore (node_modules, .env, dist, .output, .nuxt)
- [ ] Verify both `yarn dev` commands work independently
- [ ] First commit and push

**Deliverable**: Running skeleton, both client and server start without errors.

---

## Phase 2: Firebase Setup & Authentication
**Goal**: Firebase project created, Google Auth working.

- [ ] Create Firebase project in console (name: `hablemos-en-10`)
- [ ] Enable Firebase Authentication with Google provider
- [ ] Enable Firestore database
- [ ] Set up Firebase Hosting
- [ ] Create `/client/plugins/firebase.client.ts` with Firebase config
- [ ] Create `useAuth.ts` composable (login, logout, onAuthStateChanged)
- [ ] Create Pinia user store
- [ ] Build login page (`/pages/index.vue`) with Google sign-in button
- [ ] Build basic protected route (`/pages/home.vue`)
- [ ] Test: Login with Google → redirects to home. Logout → redirects to login.

**Deliverable**: Working Google authentication flow on the client.

---

## Phase 3: UI Foundation & Design System
**Goal**: Core visual components built, tablet-optimized, warm aesthetic.

- [ ] Define Tailwind config: custom colors (warm palette), font sizes (large), spacing
- [ ] Build `Button.vue` — big, accessible, clear tap targets (min 48px)
- [ ] Build `Timer.vue` — large countdown display (MM:SS), start/pause/reset
- [ ] Build `TopicCard.vue` — displays topic title, keywords (as tags), questions (as list)
- [ ] Build `WelcomeMessage.vue` — personalized greeting with time-of-day awareness
- [ ] Build `Header.vue` — simple, with user name/photo and logout
- [ ] Build default layout
- [ ] Style the home page with placeholder content to test the look and feel
- [ ] Test on tablet viewport sizes

**Deliverable**: Beautiful, warm UI components. The app looks and feels like a gift.

---

## Phase 4: Express Backend & Anthropic API Integration
**Goal**: Server generates topics via Anthropic API, protected by Firebase auth.

- [ ] Set up Express server with CORS, JSON parsing
- [ ] Create Firebase Admin SDK initialization (`/server/src/services/firebase-admin.ts`)
- [ ] Create auth middleware — verifies Firebase ID token from client
- [ ] Create Anthropic service (`/server/src/services/anthropic.ts`)
- [ ] Design the system prompt for topic generation (CRITICAL — must include Corrientes context, her generation, her interests, opinion-provoking style)
- [ ] Create `POST /api/topics/generate` route:
  - Accepts: `{ category?: string, completedTopics?: string[] }`
  - Returns: `{ topic, keywords, questions, category }`
  - Excludes previously completed topics
- [ ] Test with Postman/curl: generate topics across all categories
- [ ] Refine the AI prompt until topics feel authentic and locally grounded

**Deliverable**: API endpoint that returns rich, contextual, Corrientes-grounded topics.

---

## Phase 5: Connect Frontend to Backend — Core Flow
**Goal**: The full "Dame un tema" → topic → timer → save flow works.

- [ ] Create `useTopics.ts` composable (fetch topic from API, handle loading/error states)
- [ ] Create `useTimer.ts` composable (10-min countdown, start, pause, reset, complete)
- [ ] Wire up home page:
  1. Welcome message on load
  2. "Dame un tema" button → calls API → shows TopicCard
  3. "Empezar a escribir" button → starts Timer
  4. Timer counts down from 10:00
  5. Timer ends → gentle completion message ("¡Muy bien! ¿Terminaste?")
  6. "Guardar y continuar" → saves topic to Firestore under user's completedTopics
- [ ] Handle loading states (while AI generates topic)
- [ ] Handle errors gracefully (Spanish messages, retry option)
- [ ] Test full flow end to end

**Deliverable**: Complete core experience working. She can open the app, get a topic, write, and save.

---

## Phase 6: Topic History & Personalization
**Goal**: She can see what she's written about. The app feels personal.

- [ ] Build `/pages/history.vue` — list of completed topics with dates
- [ ] Show topic count on home page ("Ya escribiste sobre 12 temas 🎉")
- [ ] Pass completed topics to API so it never repeats
- [ ] Add category filter on topic generation ("Dame un tema sobre viajes")
- [ ] Enhance welcome messages — rotate randomly, include her name
- [ ] Add gentle encouragement messages after saving a topic

**Deliverable**: Personalized experience that grows with her. History page works.

---

## Phase 7: Polish, Animations & Final Touches
**Goal**: The app feels delightful and complete.

- [ ] Add subtle transitions (topic card appearing, timer starting)
- [ ] Add a soft sound or vibration when timer ends (optional, test with her)
- [ ] Loading skeleton while topic generates
- [ ] Empty states (no history yet, etc.)
- [ ] Error boundaries
- [ ] Favicon and meta tags (title: "Hablemos en 10")
- [ ] Test thoroughly on her actual tablet
- [ ] Accessibility review: font sizes, contrast, tap targets

**Deliverable**: Polished, delightful app ready for her birthday.

---

## Phase 8: Deployment
**Goal**: Live on the internet, accessible from her tablet.

- [ ] Deploy Express backend to Render
- [ ] Configure environment variables on Render
- [ ] Deploy Nuxt client to Firebase Hosting (`yarn generate` → `firebase deploy`)
- [ ] Connect custom domain (if desired) or use Firebase default URL
- [ ] Set up Firestore security rules (users can only read/write their own data)
- [ ] Test full flow in production
- [ ] Bookmark the URL on her tablet

**Deliverable**: Live, deployed app. Ready to gift. 🎁

---

## Future Ideas (Post-Launch)
- [ ] Export her completed topics as a PDF list (table of contents for her book)
- [ ] "Tema del día" — daily notification or email with a suggested topic
- [ ] Shared mode — both you and her see the same topic and write together
- [ ] Voice mode — she taps a button and dictates instead of reading
- [ ] Add photos or illustrations per category
- [ ] Print a physical companion card deck with topics
