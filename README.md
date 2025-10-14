Vieromind Mood Tracking

A modern web application for mood tracking built with Next.js, focusing on performance, SEO, and scalability.

Overview

Vieromind is a next-generation mood tracking platform that allows users to visualize, analyze, and manage their emotional health. The application leverages the latest features of Next.js to provide Server-Side Rendering (SSR), Static Site Generation (SSG), and modern API integrations for a seamless and interactive experience.

The app is powered by the Gemini API for AI-driven mood insights and utilizes ShadCN/UI for a clean, elegant interface. The combination of design and intelligence ensures an intuitive user experience.

Tech Stack
Technology	Purpose
Next.js 14+	Core framework for SSR, SSG, and API routes
React 19	Frontend UI library
Tailwind CSS	Utility-first CSS framework
ShadCN/UI	UI component library
Gemini API	AI-driven mood analysis
Clerk	Authentication and user management
Recharts	Data visualization and interactive charts
Vercel	Hosting and CI/CD
ESLint & Prettier	Code quality and formatting tools
next/font	Built-in font optimization
Folder Structure
vieromind-mood-tracking
 ┣ app/
 ┃ ┣ page.js             # Home page
 ┃ ┣ dashboard/page.js   # Dashboard page
 ┃ ┣ summary/page.js     # Summary page
 ┃ ┗ moodlog/page.js     # Mood log page
 ┣ public/               # Static assets (images, icons)
 ┣ styles/               # Global styles (optional)
 ┣ package.json          # Dependencies and scripts
 ┣ next.config.js        # Next.js configuration
 ┗ README.md             # Documentation

Getting Started
Prerequisites

Node.js 18+

npm, yarn, pnpm, or bun

Installation

Clone the repository:

git clone https://github.com/Umar-ejaz15/vieromind-mood-tracking


Install dependencies:

npm install
# or
yarn install
# or
pnpm install
# or
bun install


Start the development server:

npm run dev
# or
yarn dev


Visit http://localhost:3000 to access the application.

Pages Overview

Home Page: Introduces the platform and highlights its features.

Dashboard Page: Displays user mood trends and visual analytics powered by Gemini API.

Summary Page: Provides summarized emotional insights using AI.

Mood Log Page: Allows users to record daily moods and experiences.

Environment Variables

Create a .env.local file in the project root:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database Connection
DATABASE_URL="postgresql://your_database_url_here"

# Gemini API Key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key


Note: Never commit .env.local to version control.

Deployment

Deploy the application with Vercel:

Push code to GitHub.

Connect your repository to Vercel.

Click Deploy.

The app will be live within minutes.

Future Enhancements

Full integration of AI-based emotional recommendations via Gemini.

Daily mood journaling and reflections.

Mobile responsiveness and PWA support.

Smooth transitions and animations using Framer Motion.

Advanced analytics with interactive Recharts visualizations.

Author

Umar Ejaz – Full Stack Developer
Portfolio: umarmernstack.vercel.app

Specialties: React, Next.js, Tailwind CSS, ShadCN/UI, Framer Motion, Clerk, Recharts, Gemini AI

Summary:
Vieromind is designed to help users not only track moods but gain actionable insights into their emotional wellbeing through intelligent visualization and AI assistance.