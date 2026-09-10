# Deployment Guide

## Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## Preview Production Build

```bash
npm run preview
```

## Deployment Options

### Vercel (Recommended)

1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Select framework: Vite
4. Deploy

Vercel will automatically detect and build your project.

### Netlify

1. Push code to GitHub
2. Connect repository on [netlify.com](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages

1. Update `vite.config.ts` base path
2. Run `npm run build`
3. Deploy `dist/` folder

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## Environment Configuration

No environment variables required for basic deployment.

For custom configurations, create `.env.production`:
```
VITE_API_URL=https://api.example.com
```

## Performance Optimization

- Build output is automatically optimized by Vite
- Assets are minified and tree-shaken
- Images should be optimized before deployment
- Use CDN for static assets

## Monitoring

- Monitor build logs for warnings
- Test in staging before production
- Keep dependencies updated
- Monitor performance metrics
