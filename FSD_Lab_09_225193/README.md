# FSD Lab 09 - Image Steganography Dashboard

Hamza Tahir | Registration ID: 225193  
Air University Kamra Campus

A hard-coded React dashboard for the Image Steganography semester project.
Its layout follows the existing project's main screen: title, Hide image / Reveal image tabs,
cover and secret image placeholders, and green action buttons.

## Run

1. Install Node.js 20.19+ or 22.12+ (a newer LTS version is also suitable).
2. Extract the ZIP and open this folder in VS Code.
3. Open its terminal and run:

```bash
npm ci
npm run dev
```

4. Open the local URL shown in the terminal, usually http://localhost:5173.
5. Keep the terminal running. Press Ctrl+C to stop it.

For a production build, use `npm run build`, then `npm run preview`.
No XAMPP, database or backend server is needed for this lab.

## Components

- `Header.jsx`: project heading, subtitle and static theme button.
- `Dashboard.jsx`: two CSS-controlled view selectors and the two panels.
- `HideImage.jsx`: cover/secret placeholders and the disabled hide button.
- `RevealImage.jsx`: stego placeholder and the disabled reveal button.
- `App.jsx`: imports and combines the main components.
- `index.css`: global styles and local Inter font definitions.
- `App.css`: dashboard layout, colors, cards and responsive rules.

All major components are separate functional components with hardcoded JSX.
There are no custom component props, React hooks, API calls or external UI libraries.
Native radio inputs and CSS switch the views. File selection, image processing,
downloads and theme switching are intentionally inactive in this UI-only lab.

The report and output screenshots are in `documentation/`.

## Design reference

Original project: https://github.com/AK-4O4/Image-Stegnography
Reference files: `frontend/src/app/page.tsx` and `frontend/src/app/globals.css`.
The Next.js screen was recreated with Vite, JavaScript JSX and ordinary CSS for Lab 09.
Local Inter fonts are distributed under the included SIL Open Font License in `public/fonts/LICENSE.txt`.
