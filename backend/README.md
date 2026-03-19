# Backend

The backend powers:

- admin authentication
- CRUD APIs for portfolio content
- appearance settings
- AI assistant settings and context assembly
- contact form storage and email forwarding

## Main Files

- `server.js`: app bootstrap, CORS, routes, health endpoint
- `controllers/dataController.js`: content CRUD and template settings
- `controllers/aiController.js`: AI assistant logic
- `routes/dataRoutes.js`: public and protected data routes
- `routes/authRoutes.js`: authentication routes

## Models

Core models include:

- `SiteProfile`
- `AppearanceSettings`
- `HeroContent`
- `Introduction`
- `AISettings`
- `Project`
- `Research`
- `Experience`
- `Education`
- `Certificate`
- `Skill`
- `Hobby`
- `Message`
- `User`

## Environment Setup

Use `backend/.env.sample` as the starting point.

Minimum required values:

- `MONGO_URI`
- `JWT_SECRET`

Recommended values:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `FRONTEND_URL`
- `FRONTEND_URLS`
- `GEMINI_API_KEY`
- email settings
- Cloudinary settings

## Important Variables

```env
PORT=
MONGO_URI=
JWT_SECRET=
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash

EMAIL_SERVICE=
EMAIL_HOST=
EMAIL_PORT=
EMAIL_SECURE=
EMAIL_USER=portfolio@example.com
EMAIL_PASS=
EMAIL_RECEIVER=owner@example.com

FRONTEND_URL=http://localhost:5173
FRONTEND_URLS=http://localhost:5173,https://your-frontend-domain.vercel.app

ADMIN_EMAIL=
ADMIN_PASSWORD=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_FOLDER=portfolio-template/projects
```

## Local Development

```bash
npm install
npm run dev
```

The API health endpoint is:

```text
GET /api/health
```

## Public Routes

Examples:

- `GET /api/data/profile`
- `GET /api/data/appearance`
- `GET /api/data/hero`
- `GET /api/data/introduction`
- `GET /api/data/projects`
- `GET /api/data/research`
- `GET /api/data/certificates`
- `GET /api/data/experience`
- `GET /api/data/education`
- `GET /api/data/skills`
- `GET /api/data/hobbies`
- `GET /api/data/ai-public`
- `POST /api/data/contact`
- `POST /api/data/chat`

## Protected Routes

Examples:

- `POST /api/data/profile`
- `POST /api/data/appearance`
- `POST /api/data/hero`
- `POST /api/data/introduction`
- `GET /api/data/ai-settings`
- `POST /api/data/ai-settings`
- project, research, experience, education, certificate, hobby, and skill management routes
- `PUT /api/data/reorder`
- inbox delete routes

## Verification

Static verification:

```bash
node --check server.js
node --check controllers/dataController.js
node --check controllers/aiController.js
node --check routes/dataRoutes.js
```

Runtime verification:

1. Fill `MONGO_URI` and `JWT_SECRET`
2. Start the server
3. Open `GET /api/health`
4. Verify the public data routes respond

## Handoff Guidance

When creating a new portfolio for another person:

- use a separate database for that person
- use separate deploy environments
- use separate Cloudinary folders or accounts if needed
- create separate admin credentials

That keeps one client or friend from affecting another person's site.
