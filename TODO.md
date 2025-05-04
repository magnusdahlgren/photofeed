# TODO

## 📋 Admin Features

- [x] Add image uploader to Admin page
- [x] Add auto-resize of photos when uploading
- [x] Add photo preview modal to Admin page
- [x] Better error messages when adding new photo
- [ ] Add keyboard nav for alert (ESC / return)
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
- [ ] Add smooth transitions for adding/removing photos (e.g. with framer-motion)
- [ ] User menu for login/logout
  - [x] Add avatar
  - [x] Add menu with login/logout
  - [x] Icons for login/logout in menu
  - [x] Link to Admin when signed in
  - [x] Update avatar based on signed in user
  - [x] Set user avatar letter based on user name
  - [x] Tidy up other icons
  - [x] Logout should take user back to feed, not sign in form
  - [ ] Move sign in form to modal
  - [ ] Take user to /, not to sign in form if going to /admin when not signed in
- [ ] Add buttons '<' and '>' to step between photos in photo details page
- [ ] Add click outside menu to close menu
- [ ] Menu keyboard accessibility

## 🐛 Bugs

## 🛠 Refactoring

- [x] Remove inline styles in /login/page.tsx
- [ ] Add a proper Photo type for consistency
- [ ] Move bucket name ("photos") to environment variable

## 💡 Nice to have

- [x] Delete image files from the bucket when deleting a photo from the db
- [ ] Give a 404 when /p/[id] doesn't exist in db
- [ ] Custom 404 page

## 🧹 Maintenance

- [x] Add Prettier code formatter
- [x] Create GitHub repo
- [x] SonarQube code reviews
- [x] CodeRabbit PR summaries
- [ ] Add automated tests + re-enable SonarQube code coverage check
