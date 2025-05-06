# TODO

## 📋 Admin Features

- [x] Add image uploader to Admin page
- [x] Add auto-resize of photos when uploading
- [x] Add photo preview modal to Admin page
- [x] Better error messages when adding new photo
- [x] Better progress indication

## ⏩ Performance

- [x] Add different photo sizes for feed (small) and detail page (large) to reduce bandwidth
- [ ] Lazy loading the photo feed (once I have more than 30 photos)

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
- [ ] Add smooth transitions for adding/removing photos (e.g. with framer-motion)
- [ ] Mobile-friendly layout
- [ ] Style feed error
- [ ] Masonry - build my own

## 🐛 Bugs

- [x] Closing photo detail page should take you back to where you were in the feed

## 🛠 Refactoring

- [x] Remove inline styles in /login/page.tsx
- [x] Consistent use of rem, avoiding mixing with px
- [x] Add a proper Photo type for consistency
- [ ] Move bucket name ("photos") to environment variable
- [ ] CSS variables for colours

## 💡 Nice to have

- [x] Delete image files from the bucket when deleting a photo from the db
- [ ] Give a 404 when /p/[id] doesn't exist in db
- [ ] Custom 404 page
- [ ] Menu keyboard accessibility
- [ ] Add keyboard nav for alert (ESC / return)

## 🧹 Maintenance

- [x] Add Prettier code formatter
- [x] Create GitHub repo
- [x] SonarQube code reviews
- [x] CodeRabbit PR summaries
- [ ] Add automated tests + re-enable SonarQube code coverage check
- [ ] Deploy to prod (Vercel?)
