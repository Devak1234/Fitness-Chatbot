# QA Checklist - Fitness Chatbot

## Backend API Tests
- [ ] `GET /nutrition` returns JSON array with seeded items
- [ ] `GET /workouts` returns JSON array with seeded exercises
- [ ] `POST /auth/register` creates new user and returns token
- [ ] `POST /auth/login` authenticates user and returns token
- [ ] Protected routes require valid JWT token
- [ ] Database tables created correctly in Adminer

## Frontend Integration Tests
- [ ] Nutrition page loads data from API
- [ ] Workout page loads data from API
- [ ] Weekly plan generation works
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Dark theme toggle functions correctly
- [ ] No console errors in browser

## UI/UX Tests
- [ ] Weekly workout plan cards align properly in 3-column grid
- [ ] Day card buttons don't overlap with titles
- [ ] Consistent card heights across workout days
- [ ] Images load with fallbacks for missing images
- [ ] Form inputs have proper styling and validation

## Performance Tests
- [ ] Page loads within 3 seconds
- [ ] API calls complete within 1 second
- [ ] No memory leaks in React components
- [ ] Build completes without errors

## Cross-browser Tests
- [ ] Works in Chrome, Firefox, Safari
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)
- [ ] Responsive breakpoints work correctly

## Accessibility Tests
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG standards
- [ ] Focus indicators visible

## Security Tests
- [ ] JWT tokens properly validated
- [ ] Passwords hashed with bcrypt
- [ ] CORS configured correctly
- [ ] No sensitive data in client logs