# Grass Lane Lawn Co.

Production marketing site for Grass Lane Lawn Co. — premium lawn care in Toledo, Ohio.

**Live:** https://grasslanelawnco.com

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Anton + Inter + Fraunces (Google Fonts)
- Deployed on Vercel
- Optional: Upstash Redis for lead storage

## Local Dev
```bash
npm install
npm run dev
```

## Environment Variables (optional)
Add these in Vercel project settings to persist leads to Upstash:
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

If not set, leads are written to Vercel function logs (searchable in the Vercel dashboard).

## Pages
- `/` — Home
- `/services` — Service detail
- `/about` — About / values
- `/reviews` — Testimonials
- `/contact` — Quote form

## TODO
- [ ] Replace placeholder phone `(419) 555-1234` with real number
- [ ] Replace placeholder email `hello@grasslanelawnco.com` with real address (or set up forwarding)
- [ ] Swap placeholder Unsplash photos with real Grass Lane lawn photos
- [ ] Replace placeholder reviews with real Google/Facebook testimonials
- [ ] Add real social links (Facebook, Instagram)
- [ ] Optional: connect Upstash for lead storage
- [ ] Optional: hook up email forwarding so contact form delivers to inbox
