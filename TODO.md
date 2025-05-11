# TODO

## 👉🏻 Before launch

- [x] Return a 404 when /p/[id] doesn't exist in db
- [x] CSS variables for colours
- [x] CSS variables for border radii
- [x] Style the feed errors
- [x] Mobile-friendly layout
- [x] Update name to Magnus×365
- [x] Move bucket name ("photos") to environment variable
- [x] Masonry - react-masonry-css
- [x] Add db column taken_at to store EXIF DateTimeOriginal when available
- [x] Use taken_at for photo detail page title
- [x] Show taken_at date on photo detail page
- [x] Show taken_at date in admin
- [x] Use Next.js Image instead for handling image sizes, uploading original only
- [x] Custom 404 page

## 🚀 Launch

1. Supabase setup

- [x] Set up separate DB for production
  - [x] Create project for prod
  - [x] Create 'photos' table
  - [x] Replicate db RLS rules from dev
- [x] Set up separate bucket for production
  - [x] Create bucket
  - [x] Replicate bucket policies from dev
  - [x] Upload a test photo and view anonymously (to confirm public read access)

2. Config

- [x] Create prod env config
  - [x] Create .env.production
  - [x] Add prod db
  - [x] Add prod bucket
  - [x] Test prod env locally (rename `.env.production` to `.env.local` temporarily)
    - [x] Create user (temporarily enable sign up)
    - [x] Disable sign up
    - [x] Test/verify db policies
    - [x] Test/verify bucket policies
    - [x] Rename env back to .env.production

3. Prevent indexing

- [x] Create public/robots.txt to prevent indexing (I don't want to be on Google)

4. Vercel

- [x] Create Vercel account
- [x] Enable HTTPS (auto via Vercel, but verify)
- [ ] Add temporary NEXT_PUBLIC_SITE_URL to production env
- [x] Deploy to Vercel
- [x] QA in prod

5. Custom domain

- [x] Decide on custom domain --> use existing magnusd.com
- [x] Point domain to Vercel
- [x] Add correct NEXT_PUBLIC_SITE_URL to production env
- [x] Check custom domain redirects (www → non-www or vice versa, if relevant)
- [x] Update Supabase with new domain

6. QA

- [x] QA in prod
  - [x] Photo feed
  - [x] Sign in
  - [x] Upload photos
  - [x] View photos
  - [x] Delete photos
- [x] Verify robots.txt from Google

## 🧹 After launch

- [ ] Set up Vercel's Speed Insights
- [ ] Add automated tests + re-enable SonarQube code coverage check
- [ ] Lazy loading the photo feed (once I have more than 30 photos)
- [ ] Favicon

## 🔮 Possible future enhancements

- [ ] Menu keyboard accessibility
- [ ] Add keyboard nav for alert (ESC / return)
- [ ] Add smooth transitions for adding/removing photos (e.g. with framer-motion)
- [ ] Unique page titles

---

# DONE

## 📋 Admin Features

- [x] Add image uploader to Admin page
- [x] Add auto-resize of photos when uploading
- [x] Add photo preview modal to Admin page
- [x] Better error messages when adding new photo
- [x] Better progress indication

## ⏩ Performance

- [x] Add different photo sizes for feed (small) and detail page (large) to reduce bandwidth

## ✨ Visual Polish

- [x] Show custom alert instead of browser alert when there is an error
- [x] Add a nicer "Are you sure?" dialogue when deleting photos
- [x] Remove page reload after uploading a photo
- [x] Remove page reload after deleting a photo
- [x] Spinner when uploading photos
- [x] Polish login form design
- [x] User menu for login/logout
- [x] Move sign in form to modal
- [x] Add link from Admin to Photo Feed
- [x] Add click outside menu to close menu
- [x] Add shared full-page photo modal for photo feed and admin
- [x] Better loading state for Admin page
- [x] Nicer masthead for photo feed

## 🐛 Bugs

- [x] Closing photo detail page should take you back to where you were in the feed

## 🛠 Refactoring

- [x] Remove inline styles in /login/page.tsx
- [x] Consistent use of rem, avoiding mixing with px
- [x] Add a proper Photo type for consistency

## 💡 Nice to have

- [x] Delete image files from the bucket when deleting a photo from the db

## 🧹 Maintenance

- [x] Add Prettier code formatter
- [x] Create GitHub repo
- [x] SonarQube code reviews
- [x] CodeRabbit PR summaries
