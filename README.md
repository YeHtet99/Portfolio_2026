# Ye Myint Htet Portfolio

Static React + Vite portfolio for Ye Myint Htet.

## Local development

```bash
npm install
npm run dev
npm run build
npm run lint
npm test
npx playwright test
```

## Assets

- `public/images/profile.png` contains the supplied portrait.
- `public/resume.pdf` contains the supplied résumé.
- Place approved original screenshots in `public/images/projects/` and update `src/data/projects.js` to display them. The current UI deliberately labels project imagery as a placeholder because no original screenshots were supplied.

## Optional Formspree

The site currently uses the reliable `mailto:` contact action. Add a public `VITE_FORMSPREE_FORM_ID` and implement the hosted form only when a real form endpoint is ready; never add API keys to this project.

## Deployment

Run `npm run build` and deploy as a Vite static site. The tracked `.openai/hosting.json` configures the associated static Site and its SPA hosting. `vercel.json` provides Vercel's SPA route fallback.
