# Architecture Overview

## Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router
- **Build Tool**: Vite
- **Testing**: Vitest
- **Linting**: ESLint

## Project Structure

### Components (`src/components/`)

**App Components** (`app/`)
- `DeliveryCard` - Display delivery information
- `DemoMap` - Interactive map visualization
- `StatCard` - Statistics display
- `StatusBadge` - Delivery status indicator

**Site Components** (`site/`)
- `Nav` - Navigation bar with language/theme toggles
- `SiteLayout` - Main page layout
- `LangToggle` - Language switcher
- `ThemeToggle` - Dark/light mode toggle

**UI Components** (`ui/`)
- Pre-built shadcn/ui component library
- Fully styled and accessible

### Pages (`src/pages/`)

- `HomePage` - Landing page
- `how-it-works` - How TUKLY works
- `merchants` - For merchants
- `captains` - For delivery captains
- `tracking` - Live tracking
- `zones` - Service zones
- `faq` - Frequently asked questions

### Libraries (`src/lib/`)

- `i18n.tsx` - Internationalization (Arabic/English)
- `store.tsx` - State management with React Context
- `auth.tsx` - User authentication context
- `delivery-status.ts` - Delivery status logic
- `pricing.ts` - Price calculation
- `utils.ts` - Utility functions

## State Management

Uses React Context API with `store.tsx` for centralized state:
- Delivery data
- User preferences
- Application state

## Styling

- **Tailwind CSS** for utility classes
- **CSS Variables** in `src/index.css` for theming
- Light/Dark mode support via `next-themes`
- Semantic color tokens (primary, secondary, accent, etc.)

## Routing

React Router v6 with the following routes:
- `/` - Home
- `/how-it-works` - How it works
- `/merchants` - Merchants page
- `/captains` - Captains page
- `/tracking` - Tracking page
- `/zones` - Zones page
- `/faq` - FAQ page
- `*` - 404 Not Found

## Internationalization

- Arabic (ar) and English (en)
- Translations in `src/lib/i18n.tsx`
- Language persistence in localStorage
