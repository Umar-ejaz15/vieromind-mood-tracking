Vieromind Mood Tracking 🧠💫

A modern mood tracking web application built with Next.js for speed, SEO, and scalability.

🚀 Overview

Vieromind is a next-gen mood tracking web app designed to help users visualize, analyze, and manage their emotional health.
Built with Next.js 14+, it leverages SSR (Server-Side Rendering), SSG (Static Site Generation), and modern API integrations to deliver a seamless and interactive experience.

Powered by Gemini API for intelligent mood insights and ShadCN/UI for a sleek interface — it’s a blend of design and intelligence.

🧩 Tech Stack
Technology	Purpose
Next.js 14+	Core framework for SSR/SSG and API routes
React 19	Frontend library for UI components
Tailwind CSS	Utility-first CSS framework for styling
ShadCN/UI	Elegant UI component library
Gemini API	AI-driven mood analysis
Clerk	Authentication and user management
Recharts	Data visualization and interactive charts
Vercel	Hosting and CI/CD
ESLint & Prettier	Code quality and formatting tools
next/font	Built-in font optimization (Geist by Vercel)
🗂 Folder Structure
📦 vieromind-mood-tracking
 ┣ 📂 app/
 ┃ ┣ 📜 page.js             # Home Page
 ┃ ┣ 📜 dashboard/page.js   # Dashboard Page
 ┃ ┣ 📜 summary/page.js     # Summary Page
 ┃ ┗ 📜 moodlog/page.js     # Mood Log Page
 ┣ 📂 public/               # Static assets (icons, images)
 ┣ 📂 styles/               # Global styles (optional)
 ┣ 📜 package.json          # Dependencies & scripts
 ┣ 📜 next.config.js        # Next.js configuration
 ┗ 📜 README.md             # Documentation

⚙️ Getting Started

Follow these steps to set up the project locally:

1️⃣ Clone the Repository
git clone https://github.com/Umar-ejaz15/vieromind-mood-tracking

2️⃣ Install Dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install

3️⃣ Run the Development Server
npm run dev
# or
yarn dev


Now visit 👉 http://localhost:3000

🧠 Pages Overview

🏠 Home Page – The main landing page introducing Vieromind’s purpose and flow.

📊 Dashboard Page – Displays user moods, charts, and insights powered by Gemini API.

📈 Summary Page – Summarized emotional analytics and AI-driven insights.

📝 Mood Log Page – Allows users to log their moods and experiences.

🔑 Environment Variables

Create a .env.local file in the root directory with the following variables:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database Connection
DATABASE_URL="postgresql://your_database_url_here"

# Gemini API Key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key


⚠️ Note: Never commit .env.local to version control.

☁️ Deployment

Deploy instantly with Vercel — the official hosting platform for Next.js.

Push your code to GitHub.

Go to Vercel
.

Connect your repository.

Click “Deploy”.

Your app will be live within seconds! ⚡

🧩 Future Enhancements

✨ Integration with AI-based emotion recommendations via Gemini
📆 Add mood journaling and daily reflections
📱 Build mobile responsiveness and PWA support
🎨 Add animations with Framer Motion for smoother transitions
📊 Advanced analytics with interactive Recharts visualizations

👨‍💻 Author

Developer: Umar Ejaz
Role: Full Stack MERN Developer
Portfolio: umarmernstack.vercel.app

Specialties: React | Next.js | Tailwind | ShadCN/UI | GSAP | Framer Motion | Clerk | Recharts | Gemini AI

🧘‍♂️ Closing Note

“Mood tracking meets intelligence — Vieromind helps you not just feel but understand.” 🌙