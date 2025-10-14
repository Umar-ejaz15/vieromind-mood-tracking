This project is a modern web application built with Next.js, a React-based framework designed for server-side rendering (SSR), static site generation (SSG), and API routes — giving you the perfect balance of speed, SEO, and scalability.

It was bootstrapped with create-next-app, providing a powerful developer setup to build production-grade apps with minimal configuration.

Tech Stack
Technology	Purpose
Next.js 14+	Core framework for React-based SSR/SSG apps
React 19	Frontend library for UI components
Tailwind CSS (Optional)	Utility-first styling (if added)
Vercel Hosting	Deployment and CI/CD
ESLint & Prettier	Code linting and formatting
next/font	Built-in font optimization with Geist (by Vercel)
Clerk	Authentication and user management
Recharts	Data visualization and interactive charts
Folder Structure
📦 project-root
 ┣ 📂 app/                  # App router for pages
 ┃ ┣ 📜 page.js             # Home page
 ┃ ┗ 📜 layout.js           # Root layout
 ┣ 📂 public/               # Static assets
 ┣ 📂 styles/               # Global styles (if using CSS)
 ┣ 📜 package.json          # Dependencies & scripts
 ┣ 📜 next.config.js        # Next.js configuration
 ┗ 📜 README.md             # Project documentation

Getting Started

Follow these steps to run the project locally:

1. Clone the Repository
git clone https://github.com/Umar-ejaz15/vieromind-mood-tracking

2. Install Dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install

3. Run the Development Server
npm run dev
# or
yarn dev


Now open your browser and visit http://localhost:3000

Project Structure Explained

app/page.js – The main landing page of your project. You can modify this to update your home screen UI.

app/layout.js – Wraps your entire app; ideal for global layouts, headers, and footers.

next/font – Automatically optimizes and loads fonts, like Geist by Vercel.

public/ – Store all static assets such as images and icons here.

Learning & Resources

Enhance your Next.js knowledge through these official resources:

Next.js Docs: Explore core features and APIs

Interactive Tutorial: Learn Next.js by building projects step-by-step

Next.js GitHub: Contribute or explore the source code

Deployment

Deploy easily on Vercel, the official platform for Next.js.

Steps:

Push your code to GitHub.

Go to Vercel
.

Connect your repository.

Click “Deploy”.

Your app will be live in seconds.

For more information, see the Next.js Deployment Guide
.

Environment Variables (Optional)

If your project uses environment variables, create a .env.local file in the root directory:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_dG91Y2hpbmctaGlwcG8tMTguY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_oiPo7wfO6Il5Gu96pe0OZPOR6DJGvqVMFtmMhNPWiF
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/

# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

# The following `prisma+postgres` URL is similar to the URL produced by running a local Prisma Postgres 
# server with the `prisma dev` CLI command, when not choosing any non-default ports or settings. The API key, unlike the 
# one found in a remote Prisma Postgres URL, does not contain any sensitive information.

# .env
DATABASE_URL="postgresql://neondb_owner:npg_zZD7B6pOMfSx@ep-red-star-adhv4t53.c-2.us-east-1.aws.neon.tech/db_umarejaz?sslmode=require&channel_binding=require%22"


Note: Never commit .env.local to your Git repository.

Future Enhancements

Add API routes for backend integration

Integrate authentication with Clerk

Add database support with Prisma or MongoDB

Improve SEO using Next.js Metadata API

Add animations using Framer Motion

Include advanced data visualizations using Recharts

Author

Developer: Umar Ejaz
Role: Full Stack MERN Developer
Portfolio: umarmernstack.vercel.app

Specialties: React, Next.js, Tailwind, GSAP, Framer Motion, Clerk, Recharts, AI Tools