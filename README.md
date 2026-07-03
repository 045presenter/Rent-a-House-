# Rent a House

Production-ready React/Vite app exported from Hostinger Horizons.

## Local setup

```sh
npm install
npm run build
npm run preview
```

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist/apps/web`
- Root directory: repository root
- Node version: `20.19.0`

Set these environment variables as needed:

- `VITE_API_BASE_URL`: deployed API URL used by property and inquiry requests.
- `VITE_POCKETBASE_URL`: deployed PocketBase URL.
- `VITE_ECOMMERCE_API_URL`: checkout/subscription products API URL, if used.
