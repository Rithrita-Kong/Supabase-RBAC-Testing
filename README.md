<p align="center">
<h1 align="center">React Supabase Auth with Protected Routes</h1>
</p>

<p align="center">
<img src="remove_me.png" width="450">
</p>

## App Demo: [Vercel Link](https://supabase-role-based-access.vercel.app/)

## Features

- 🚀 Protected Routes
- 🚀 Supabase Session Object in Global Context via `useSession`
- 🚀 User Authentication
- 🚀 Routing and Route Guards
- 🚀 Updating User Role

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` using the `.env.example` as a template

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

4. Run the app: `npm run dev`

## What you need to know

- `/router/index.tsx` is where you declare your routes
- `/context/SessionContext.tsx` is where you can find the `useSession` hook
  - This hook gives you access to the `session` object from Supabase globally
- `/Providers.tsx` is where you can add more `providers` or `wrappers`
