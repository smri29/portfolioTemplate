# Frontend

The frontend contains:

- the public single-page portfolio
- the admin dashboard UI
- the appearance system
- the shared design and motion layer

## Main Entry Points

- `src/App.jsx`: app shell, routes, and motion config
- `src/pages/Home.jsx`: public portfolio page
- `src/pages/Certificates.jsx`: full certificates page
- `src/pages/Dashboard.jsx`: admin dashboard
- `src/context/SiteProvider.jsx`: shared site settings and appearance loading

## Main Public Components

- `src/components/Navbar.jsx`
- `src/components/Hero.jsx`
- `src/components/About.jsx`
- `src/components/Skills.jsx`
- `src/components/Contact.jsx`
- `src/components/ChatWidget.jsx`

## Admin Managers

The dashboard currently includes managers for:

- Profile
- Appearance
- Hero
- Introduction
- AI Knowledge
- Research
- Projects
- Experience
- Education
- Certificates
- Skills
- Hobbies
- Messages

## Appearance System

Appearance is driven by:

- `src/theme/appearancePresets.js`
- `src/theme/motion.js`
- `src/index.css`

The admin panel can switch:

- glassmorphism color combinations
- motion intensity and animation behavior

## Placeholder Assets

The template ships with neutral starter assets:

- `public/template-mark.svg`
- `public/template-hero.svg`
- `public/template-about.svg`

Screenshots used in the root README:

- `public/ss/portfolio first section.png`
- `public/ss/portfolio intro section.png`
- `public/ss/portfolio contact section.png`

## Environment

Create a frontend `.env` only if needed.

Expected variable:

```env
VITE_API_URL=http://localhost:5000/api
```

If not provided, the frontend falls back to `http://localhost:5000/api`.

## Local Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run lint
npm run build
```

## Rebranding Flow

For a new person/client, most frontend changes should happen through the admin panel rather than direct code edits.

Typical order:

1. Update `Profile`
2. Update `Appearance`
3. Update `Hero`
4. Update `Introduction`
5. Fill the rest of the sections

## Notes

- The frontend is designed to stay reusable.
- Avoid hardcoding personal details directly into components.
- If you need a new template-level setting, prefer adding it to the admin-controlled data layer first.
