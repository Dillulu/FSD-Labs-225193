# FSD Lab 10 - Developer Portfolio (React)

Hamza Tahir | Registration ID: 225193  
Air University Kamra Campus

A responsive React developer portfolio built with Vite, functional components, custom hooks, and modular CSS.

## Run

1. Install Node.js 20.19+ or 22.12+ (a newer LTS version is also suitable).
2. Open a terminal in this folder and run:

```bash
npm ci
npm run dev
```

3. Open the local URL shown in the terminal, usually `http://localhost:5173`.
4. Keep the terminal running. Press `Ctrl+C` to stop it.

For a production build, run `npm run build`, then `npm run preview`.

## Structure

- `src/App.jsx`: combines the main portfolio sections (`Navbar`, `Hero`, `About`, `Skills`, `Projects`, `Journey`, `Contact`, `Footer`).
- `src/components/`: reusable UI and section components (`Navbar`, `Hero`, `About`, `Skills`, `SkillCard`, `Projects`, `ProjectCard`, `Journey`, `Contact`, `Footer`, `Button`, `Counter`, `Icons`, `Marquee`, `Reveal`, `RotatingWord`, `SectionHeading`).
- `src/data/portfolio.js`: structured portfolio data for skills, projects, timeline, and contact details.
- `src/hooks/`: custom React hooks (`useActiveSection`, `useInView`, `useMagnetic`).
- `src/index.css`: global design tokens, typography, and layout rules.

The lab report PDF and output screenshots are maintained in Google Drive.
