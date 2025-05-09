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

## 🚀 Launch

- [ ] Set up separate DB for production
- [ ] Set up separate bucket for production
- [ ] Create prod env config
- [ ] Create robots.txt to prevent indexing
- [ ] Deploy to prod (Vercel?)
- [ ] Register domain
- [ ] Point domain to prod site

## 🧹 After launch

- [ ] Add automated tests + re-enable SonarQube code coverage check
- [ ] Lazy loading the photo feed (once I have more than 30 photos)
- [ ] Custom 404 page

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
