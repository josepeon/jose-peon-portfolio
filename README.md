# Jose Peon — Portfolio

Personal portfolio site for Jose Peon, AI Engineer. Built with Next.js, GSAP animations, and interactive 3D/voice experiences.

**Live:** [josepeon.co](https://josepeon.co)

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP + SplitText (rolling 3D text, masked reveals, staggered fades)
- **Smooth Scroll:** Lenis
- **Cursor:** Framer Motion (spring-based cursor image tracking)
- **3D:** Spline (self-hosted `.splinecode` scene for O-OH Companion)
- **Voice AI:** Digital Twin backend (FastAPI on Railway) with Whisper STT, Llama 3.3 70B, ElevenLabs TTS

## Project Structure

```
app/
  layout.tsx          # Root layout, GlobalCursor
  page.tsx            # Homepage -- project list, cursor tracking, Lenis scroll
  globals.css         # Global styles, cursor: none
  projects/[slug]/    # Dynamic project pages
components/
  Cursor.tsx          # Cursor image element
  Description.tsx     # Homepage project description overlay
  Footer.tsx          # Homepage footer
  GlobalCursor.tsx    # 12px white circle cursor
  ProjectPage.tsx     # Project detail layout (image | content | voice)
  ResumePage.tsx      # Resume page with GSAP animations
  SplineEmbed.tsx     # Spline 3D scene with click-to-activate
  TalkToJose.tsx      # Voice-only digital twin interface
data/
  projects.ts         # 9 project entries with metadata
  resume.ts           # Resume content
types/
  project.ts          # Project TypeScript interface
public/
  images/cursors/     # Project cursor images (cursor_1-8.jpg)
  spline/o-oh/        # Self-hosted Spline scene files
  videos/             # Kling video for digital twin project
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

```
NEXT_PUBLIC_TWIN_API_URL=   # Digital Twin API base URL (Railway)
NEXT_PUBLIC_TWIN_API_KEY=   # Bearer token for API auth
```

These are only needed for the Digital Twin voice chat feature. The rest of the site works without them.

## Deployment

Deployed on Vercel. Environment variables must be set in Vercel project settings.

```bash
npm run build
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
