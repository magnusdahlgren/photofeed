# TODO

## 📋 Admin Features

- [x] Add image uploader to Admin page
- [x] Add auto-resize of photos when uploading
- [x] Add photo preview modal to Admin page
- [x] Better error messages when adding new photo
- [ ] Add keyboard nav for alert (ESC / return)
- [ ] Better progress indication

## ⏩ Performance

- [x] Add different photo sizes for feed (small) and detail page (large) to reduce bandwidth
- [ ] Lazy loading the photo feed (once you have more than 30 photos)

## ✨ Visual Polish

- [x] Show custom alert instead of browser alert when there is an error
- [x] Add a nicer "Are you sure?" dialogue when deleting photos
- [x] Remove page reload after uploading a photo
- [x] Remove page reload after deleting a photo
- [ ] Spinner when uploading photos
- [ ] Add standardised error callouts
- [ ] Add smooth transitions for adding/removing photos (e.g. with framer-motion)
- [ ] Better-looking sign out button (user menu?)
- [x] Polish login form design

## 🐛 Bugs

## 🛠 Refactoring

- [x] Remove inline styles in /login/page.tsx

## 💡 Nice to have

- [ ] Delete image files from the bucket when deleting a photo from the db
- [ ] Give a 404 when /p/[id] doesn't exist in db
- [ ] Custom 404 page

## 🧹 Maintenance

- [x] Add Prettier code formatter
- [x] Create GitHub repo
- [x] SonarQube code reviews
- [x] CodeRabbit PR summaries
- [ ] Add automated tests + re-enable SonarQube code coverage check
