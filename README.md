# Portfolio Project

## Project Purpose
This project was developed to showcase a variety of web applications built with modern technologies. It aims to demonstrate the ability to create interactive, responsive, and user-friendly applications that solve real-world problems.

## Project Overview
The portfolio includes several projects:
- **E-commerce Platform**: A modern platform with responsive design and Stripe integration.
- **Task Management App**: A full-stack application with a drag-and-drop interface.
- **Portfolio Website**: A minimalist site showcasing projects and skills.
- **Weather Dashboard**: Displays current weather conditions and forecasts.
- **Social Media Dashboard**: Manages and analyzes social media accounts.
- **Recipe Application**: Allows users to browse, search, save, and share recipes.

## Technologies Used
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=for-the-badge)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=for-the-badge)](https://reactjs.org)
[![shadcn-ui](https://img.shields.io/badge/shadcn--ui-000000?logo=shadcn&logoColor=white&style=for-the-badge)](https://shadcn.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)](https://tailwindcss.com)

## Benefits
This project provides hands-on experience with modern web development technologies, enhances problem-solving skills, and showcases the ability to build full-stack applications. It serves as a portfolio piece to highlight skills to potential employers or clients.

## SaaS Builder (Next.js 14)
A new `saas/` workspace hosts the multi-tenant portfolio builder described in the brief. It ships with:

- **Next.js 14 App Router** + Tailwind + Shadcn-inspired UI primitives
- **Prisma ORM** targeting PostgreSQL (`User`, `Portfolio`, `Template`, `Subscription`, `ResumeUpload`, and NextAuth tables)
- **NextAuth.js** with Google, GitHub, and email/password flows (JWT sessions)
- **Redis (Upstash)** ready rate limiting for resume uploads + future caching hooks
- **Templates**: Modern, Minimal, Professional (React components + Tailwind)
- **Builder UI**: resume drag-drop → AI parser stub, multi-step form, template picker, color configuration, live preview, save/publish actions
- **Public Rendering**: `/portfolio/[username]` route with ISR + API endpoints for portfolios/templates/export stub
- **Stripe Checkout stub** with billing page + plan enforcement (Free vs Pro vs Enterprise)

### Running the SaaS locally
```bash
cd saas
npm install
npx prisma generate
npm run dev
```

1. Provision a PostgreSQL database (Neon/Vercel Postgres works great) and copy its connection string into `saas/.env`.
2. Fill out the rest of the `.env` template (NextAuth secrets, OAuth keys, Upstash, Sorcery parser key, Stripe price IDs, etc.).
3. Run `npx prisma migrate dev` once the schema is configured.
4. Start the dev server with `npm run dev` and browse to `http://localhost:3000`.

### API surface
- `GET /api/portfolios/[username]`
- `POST /api/portfolios/save`
- `POST /api/portfolios/publish`
- `POST /api/upload/resume`
- `GET /api/templates`
- `POST /api/export/pdf` (stub)
- `POST /api/billing/checkout`

### Security & multi-tenancy notes
- Rate limiting + sanitized JSON storage mitigate spam/XSS.
- Prisma ensures tenant isolation via `userId` scoping, and subdomains are slugified + unique.
- All builder routes are protected by NextAuth middleware; public portfolios stay static.

at the end you will find all my details in the way of a website 
## License
This project is licensed under the [insert license type here, e.g., MIT License].
