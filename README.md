# Portfolio Template

A reusable full-stack portfolio template for developers, researchers, students, and technical professionals.

This project includes:

- a single-page public portfolio
- an admin dashboard for managing all content
- an AI assistant whose knowledge is admin-controlled
- multiple glassmorphism appearance presets
- animation presets that can be changed from the admin panel

The goal of this repo is simple: clone it, brand it for a new person, fill the content from the admin panel, and deploy.

## Screenshots

![Hero Preview](frontend/public/ss/portfolio%20first%20section.png)
![Introduction Preview](frontend/public/ss/portfolio%20intro%20section.png)
![Contact Preview](frontend/public/ss/portfolio%20contact%20section.png)

## Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion
- Backend: Express, MongoDB, Mongoose
- Auth: JWT-based admin auth
- Media: Cloudinary for project images
- AI: Gemini API

## What Is Admin-Controlled

The template is meant to avoid repeated code edits for profile changes. The admin panel controls:

- Profile settings
- Appearance settings
- Hero section
- Introduction section
- AI knowledge and assistant branding
- Research publications
- Technical projects
- Work experience
- Education
- Certificates
- Skills
- Hobbies and interests
- Contact inbox

## Appearance Controls

The admin panel includes:

- 5 dark professional glassmorphism color combinations
- 5 motion presets: `Cinematic`, `Balanced`, `Subtle`, `Minimal`, and `None`

This lets you give different clients different visual personalities without rebuilding the design from scratch.

## Project Structure

```text
portfolioTemplate/
  backend/
  frontend/
  .github/workflows/
```

## Quick Start

### 1. Clone the template

```bash
git clone https://github.com/smri29/portfolioTemplate.git
cd portfolioTemplate
```

### 2. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 3. Configure the backend environment

Copy `backend/.env.sample` to `backend/.env` and fill in the required values.

Minimum required values:

- `MONGO_URI`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `FRONTEND_URL` or `FRONTEND_URLS`

Optional but recommended:

- `GEMINI_API_KEY`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- email settings for contact-form forwarding

### 4. Start the backend

```bash
cd backend
npm run dev
```

### 5. Start the frontend

```bash
cd frontend
npm run dev
```

## First-Time Setup For A New Person

After the app is running:

1. Open the admin panel.
2. Register the admin account if this is a fresh database.
3. Complete `Profile Settings` first.
4. Choose the desired theme in `Appearance`.
5. Fill `Hero`, `Introduction`, and `AI Knowledge`.
6. Add projects, experience, education, certificates, skills, hobbies, and research.
7. Replace placeholder image paths with real assets or hosted URLs.
8. Add the real resume URL.
9. Review the live homepage and adjust spacing/content.
10. Deploy frontend and backend.

## Verification

Recommended checks before shipping:

### Frontend

```bash
cd frontend
npm run lint
npm run build
```

### Backend

```bash
cd backend
node --check server.js
node --check controllers/dataController.js
node --check controllers/aiController.js
node --check routes/dataRoutes.js
```

## Deployment

Typical deployment setup:

- Frontend on Vercel
- Backend on Render
- MongoDB on MongoDB Atlas
- Media on Cloudinary

If Vercel and Render are connected directly to GitHub, then:

- GitHub Actions handles CI
- Vercel and Render handle deployment automatically on push

## How To Ship This To A Friend Or Client

There are two clean ways to hand this off.

### Option A: You manage it for them

Best if they are non-technical.

Flow:

1. Fork or clone this template into a new repo for that person.
2. Create a new MongoDB database for them.
3. Deploy the backend and frontend under their project.
4. Fill the admin panel with their content.
5. Keep the admin credentials yourself or share them if needed.

Use this when:

- you are offering a service
- they do not want to manage hosting or code
- you may keep maintaining the portfolio

### Option B: Full handoff to them

Best if they should own everything.

Flow:

1. Create a separate repo for their portfolio.
2. Deploy it using accounts they control, or transfer access after setup.
3. Set environment variables in their hosting accounts.
4. Create their admin credentials.
5. Give them:
   - repo access
   - Vercel access
   - Render access
   - MongoDB access
   - Cloudinary access
   - admin login URL and credentials

Use this when:

- the project belongs fully to the client
- they may hire someone else later
- you want a clean ownership boundary

## Suggested Handoff Package

When you give a finished portfolio to someone, hand over:

- the GitHub repo
- frontend deploy URL
- backend deploy URL
- admin panel URL
- admin credentials
- MongoDB connection owner access
- Cloudinary account access
- resume/image asset locations
- a short note explaining how to edit content from the admin panel

## Template Notes

- The backend will not boot until `MONGO_URI` and `JWT_SECRET` are provided.
- The public site can still build without live data because the frontend includes safe fallback defaults.
- Project images use Cloudinary when configured.
- The AI assistant is built from admin-managed content and structured portfolio data.

## Related Docs

- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)
