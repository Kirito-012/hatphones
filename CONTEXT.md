# Project Context: HAT PHONES

## Sub-domain / Niche
**HAT PHONES** is an application and ecommerce/service platform focused on the mobile device aftermarket. The website's primary purpose is to allow users to **Buy**, **Sell**, **Repair**, and perform **Value Checks** on smart devices. Key featured items in the codebase include flagship smartphones like the iPhone 15 Pro, Samsung S24 Ultra, and Google Pixel 9 Pro. 

## Key Technical Stack
- **Framework:** Next.js 16.1.6 (App Router paradigm).
- **UI Library:** React 19.
- **Styling:** Tailwind CSS v4 (utilizing the new `@tailwindcss/postcss` setup).
- **Animations:** Framer Motion (`framer-motion`) heavily used for scroll-linked animations, layout animations, and micro-interactions.
- **Scrolling:** Lenis (`lenis`) for momentum/smooth scrolling.
- **Icons:** Lucide React (`lucide-react`).
- **Theming:** `next-themes` (Dark/Light mode support).
- **Fonts:** Next/Font importing `Space Grotesk` (Sans-serif) and `Space Mono` (Monospace).

## Overall Design Style
The design style is highly modern, premium, and interactive:
- **Interactive & Animated:** Extensively utilizes `framer-motion` for complex initial mounting animations, floating stat chips, and hiding/showing the Navbar dynamically on scroll.
- **Glassmorphism:** Makes use of frosted glass effects (`backdrop-blur-md` mixed with translucent backgrounds).
- **Morphic UIs:** The Hero section contains a custom "Realistic phone mockup shell" built completely with CSS and Framer Motion, rather than static images.
- **Clean & Spacious:** Employs large padding, rounded corners (`rounded-xl`, `rounded-2xl`), and subtle borders to separate UI cards gracefully.

## Color Scheme & Theming
The project includes natively supported and enforced Light and Dark modes.

**Base Theme (CSS Variables in globals.css):**
- **Light Theme:**
  - Background: `#ffffff`
  - Foreground (Text): `#171717`
- **Dark Theme:**
  - Background: `#0a0a0a`
  - Foreground (Text): `#ededed`

**Tailwind Palette Highlights:**
- **Primary Backgrounds:** Uses neutral tones heavily, varying between `white`, `slate-50` (light mode) and `zinc-950`, `zinc-900` (dark mode).
- **Accent Color:** Deep Indigo (`indigo-600` for primary buttons/accents, `indigo-400` / `indigo-100` for hovers and soft highlights).
- **Secondary Gradients:** Combines indigo and purple for subtle, dreamy gradients (e.g., `from-indigo-50/50 via-white to-purple-50/50`).
- **Surface Borders:** UI elements are structured using subtle zinc borders (e.g., `zinc-200` in light mode, `zinc-800` or `white/10` in dark mode).
