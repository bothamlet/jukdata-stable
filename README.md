# JUKdata

Marketing site for JUK Data, a data-solutions studio. One page with sections for services,
technologies, projects, team and contact, plus a privacy policy. Lithuanian language. Static
export: no server and no API.

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 App Router, `output: 'export'` |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4 via PostCSS |
| Motion | `motion` for section transitions, a hand-written canvas hero |
| Icons | `lucide-react` |
| Analytics | Vercel Analytics; Google Tag Manager and Consent Mode when configured |
| Forms | Formspree endpoint from `NEXT_PUBLIC_FORMSPREE_ENDPOINT` |
| Consent | Silktide consent manager from jsDelivr, pinned with SRI |

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Dev server on `http://localhost:3000` |
| `pnpm build` | Static export to `out/` |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm start` | Serve a production build |

Node 20.9 or newer (Next 16 requirement).

## Environment

Copy `.env.example` to `.env.local`. Both values end up in the rendered page; they are settings,
not secrets.

| Variable | Purpose | When unset |
| --- | --- | --- |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Contact form submissions | The form posts to a placeholder endpoint |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container | No Tag Manager script is rendered |

## Structure

```text
app/
├─ layout.tsx                 metadata, fonts, consent defaults, Tag Manager
├─ page.tsx                   the page: section order
└─ privatumo-politika/        privacy policy
components/
├─ hero.tsx, hero-canvas.tsx  canvas hero
├─ navbar.tsx                 navigation
├─ anchor-navigation.tsx      anchor scroll offsets
├─ services.tsx               services section
├─ technologies.tsx           technology grid
├─ projects.tsx               project case studies
├─ team.tsx                   team section
├─ contact.tsx                contact details and the Formspree form
└─ footer.tsx, logo.tsx, icons.tsx
public/                       static assets and technology icons
```

## Content

- Section copy lives in its component. `team.tsx` and `projects.tsx` hold their entries as
  constants at the top of the file.
- Contact details are in `components/contact.tsx`. The email, phone and LinkedIn values are
  placeholders (`info@example.com`, `+370 600 00xxx`, `href="#"`).
- `app/privatumo-politika/page.tsx` renders a heading and a date only.

## Notes

- `next.config.mjs` sets `output: 'export'` and `trailingSlash: true`, so a build produces a
  static `out/` directory of HTML and assets. Images are unoptimized because a static export has
  no image server.
- Consent Mode defaults to denied until the Silktide banner records a choice;
  `security_storage` is granted by default. Both are set in `app/layout.tsx`.
- `DEPLOYMENT-CSP.md` is a local deployment note and is gitignored.
