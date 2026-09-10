# Setup Guide

## Prerequisites

- Node.js 18+
- npm or yarn
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Mostafa-SAID7/tukly-local-logistics.git
cd tukly-local-logistics
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
src/
├── components/       # React components
│   ├── app/         # App-specific components
│   ├── site/        # Site layout components
│   └── ui/          # UI library components
├── pages/           # Page components
├── lib/             # Utilities and services
└── assets/          # Images and media
```

## Environment Variables

No environment variables required for local development.

## Troubleshooting

### Port already in use
Change port in `vite.config.ts` server configuration

### Dependencies installation fails
Try clearing npm cache: `npm cache clean --force`

### Hot reload not working
Restart dev server: `npm run dev`
