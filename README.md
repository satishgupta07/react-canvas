# React Canvas

A learning playground of small, self-contained React modules — each one a focused exercise in a common UI pattern. Built on Vite, Tailwind CSS, and a hand-rolled UI component library, with full light/dark theming.

## Features

- **UI component library** — 12 reusable primitives: `Accordion`, `Alert`, `Badge`, `Button`, `Card`, `Checkbox`, `Input`, `Modal`, `RadioButton`, `Select`, `Spinner`, `Typography`.
- **Light / Dark theme** — toggled from the sidebar, persisted in `localStorage`, applied synchronously on first paint to avoid theme flash.
- **Feature modules** — each route is an isolated exercise:
  - `/` — **Home** — gallery showcasing every UI primitive.
  - `/counter` — **Counter** — `useState` basics with increment, decrement, and reset.
  - `/autocomplete` — **AutoComplete** — debounced filtering with a suggestions dropdown.
  - `/tablist` — **TabList** — controlled tab switching pattern.
  - `/tabform` — **TabForm** — multi-step form with `Profile`, `Interest`, and `Settings` tabs.
- **Single-source routing** — `App.jsx` holds one `routes` array that drives both the sidebar nav and the React Router `<Route>` registry.

## Tech stack

| Layer    | Tool                                 |
| -------- | ------------------------------------ |
| Build    | Vite 8                               |
| Runtime  | React 19                             |
| Routing  | React Router DOM 7                   |
| Styling  | Tailwind CSS 4 (via `@tailwindcss/vite`) |
| Linting  | ESLint 9 with `react-hooks` and `react-refresh` plugins |

## Getting started

### Prerequisites

- Node.js 20.19+ or 22.12+ (required by Vite 8)
- npm 10+

### Install

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

Then open the URL Vite prints (default: http://localhost:5173).

### Other scripts

```bash
npm run build      # production build to dist/
npm run preview    # preview the production build locally
npm run lint       # run ESLint over the project
```

## Project structure

```
src/
├── App.jsx                      # Layout + route registry (single source of truth)
├── main.jsx                     # Entry point: StrictMode → BrowserRouter → ThemeProvider → App
├── index.css                    # Global styles + Tailwind directives + CSS variables
├── assets/                      # Static images (hero.png, react.svg, vite.svg)
├── contexts/
│   └── ThemeContext.jsx         # Light/dark theme state, syncs <html class="dark"> + localStorage
├── components/
│   ├── Sidebar/                 # Fixed nav panel with theme switcher
│   └── ui/                      # 12 reusable UI primitives + ui.css
└── modules/
    ├── Home/                    # Component gallery (one section per primitive)
    ├── Counter/
    ├── AutoComplete/
    ├── TabList/
    └── TabForm/
public/
├── favicon.svg
└── icons.svg                    # Sprite sheet for sidebar icons
```

Each module under `src/modules/` is self-contained: a folder with its `*.jsx` entry, an `index.js` barrel export, and any local subcomponents. This keeps modules portable — they can be deleted, copied, or reorganized without ripple effects.

## Adding a new module

1. Create `src/modules/MyModule/MyModule.jsx` and an `index.js` that re-exports it.
2. Import it in `src/App.jsx` and add an entry to the `routes` array:

   ```jsx
   import MyModule from './modules/MyModule'

   const routes = [
     // ...existing routes
     { path: '/mymodule', label: 'MyModule', element: <MyModule /> },
   ]
   ```

That's it — the sidebar link and the route both update from this single registration.

## Theming

The app ships with light and dark modes. The active theme is controlled by `ThemeContext`:

- Reads from `localStorage['rc-theme']` on startup (defaults to `dark`).
- Toggles the `dark` class on `<html>` so Tailwind's `dark:` utilities work.
- Applies the class **synchronously in the state initializer** to prevent any flash of the wrong theme on first paint.

Use the `useTheme()` hook from any component:

```jsx
import { useTheme } from './contexts/ThemeContext'

const { theme, setTheme } = useTheme()
```

CSS variables for theme colors (e.g. `--rc-bg`) are declared in `src/index.css` so non-Tailwind styles can also respond to the active theme.

## License

Private project — no license granted.
