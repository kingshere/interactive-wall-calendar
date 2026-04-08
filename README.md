# 🗓️ Interactive Wall Calendar Widget

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

> A premium, production-ready React calendar component featuring dynamic Glassmorphism theming, fluid animations, and enterprise-grade accessibility.

**[🔴 Live Demo](https://interactive-wall-calendar-blush.vercel.app/) | [🎥 Video Walkthrough(Laptop)](https://drive.google.com/file/d/1JR3IrybWBxbSQZ-MeepWfkyjAQiE33nx/view?usp=drive_link) | [🎥 Video Walkthrough(Mobile)](https://drive.google.com/file/d/1JsdZcC_1SuB4ZW4XdwArRsvx2xKLubfo/view?usp=drive_link)**

---

## ✨ Features That Stand Out

This project goes beyond a standard grid. It was built to demonstrate product sense and deep technical execution:

* **🎨 Dynamic Glassmorphism:** The entire component—from the background blur to the text tinting—smoothly crossfades to match the primary color of the selected hero image.
* **🎞️ Fluid Physics-Based Animation:** Utilizing `framer-motion` to handle complex DOM unmounting, ensuring that switching months feels like a tactile, physical interaction.
* **♿ Enterprise Accessibility (a11y):** Fully navigable via keyboard (`Tab`, `Space`, `Enter`). Every interactive element contains strict ARIA labels, making it 100% screen-reader compliant.
* **💾 Local Data Persistence:** Integrated notes feature that automatically debounces and syncs to `localStorage`, preserving user state across sessions.

---

## 🏗️ Architecture & Technical Decisions

I intentionally avoided mixing UI rendering with business logic. 

**The `useCalendar` Custom Hook:** All date math, matrix generation for the empty cells, and state management were extracted into a centralized hook. 
* **Why?** This ensures strict Separation of Concerns (SoC). The UI components remain completely "dumb" and purely presentational, making the codebase highly testable and easy to maintain.
* **Performance:** Implemented `useMemo` to cache the calendar matrix generation, ensuring the heavy date-math only re-renders when the specific month or year changes, not on every keystroke in the notes app.

**Modern Material UI (v6):**
Leveraged the latest `slotProps` API over deprecated prop drilling, utilizing the `sx` prop engine to eliminate the need for heavy external CSS compilation.

---

## 🚀 Quick Start

Want to run this locally? It takes less than a minute.

```bash
# 1. Clone the repository
git clone [https://github.com/kingshere/interactive-wall-calendar.git](https://github.com/kingshere/interactive-wall-calendar.git)

# 2. Navigate into the directory
cd interactive-wall-calendar

# 3. Install dependencies
npm install

# 4. Start the Vite development server
npm run dev