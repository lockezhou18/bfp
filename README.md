This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

1. Ensure Node 20 locally:
   ```bash
   nvm use
   ```
2. Initialize and push to GitHub:
   ```bash
   git init
   git add -A
   git commit -m "feat: initial site with sections"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
3. Import the repo at [Vercel](https://vercel.com/import) and deploy. Framework preset: Next.js.

Notes:
- Static by default; contact form is client-side only (use mailto or connect a form backend if needed).
