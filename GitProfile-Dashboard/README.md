# GitHub Developer Profile Dashboard

A React application that fetches and displays public GitHub user profiles using the GitHub REST API. Search by username, view profile details, and revisit recent searches — all with loading states, error handling, and unit test coverage.

## 🛠️ Tech Stack

- React 19
- JavaScript (ES6+)
- Vite
- Tailwind CSS
- GitHub REST API
- Vitest + React Testing Library (unit tests)

### Project Structure

```tree
GitProfile-Dashboard/
├── assets/
│   └── recently.png
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── tests/
│   │   └── Profile.test.jsx
│   ├── App.jsx
│   ├── Profile.jsx
│   ├── main.jsx
│   └── index.css
├── setupTests.js
├── vitest.config.js
├── vite.config.js
└── package.json
```

---

### How It Works

1. User enters a GitHub username in the search bar.
2. The application validates the input (empty username shows a "Set username" error).
3. A request is sent to the GitHub REST API using `async/await`.
4. Based on the response:
   - Displays the user's profile (avatar, username, name, company, followers, bio).
   - Shows an appropriate error message (user not found, HTTP error, network error).
5. Successful searches are saved to **recent search history** (up to 5 usernames in `localStorage`, expires after 5 minutes).
6. Clicking a recent search re-fetches that user's profile.
7. The **Visit Profile** button opens the user's GitHub profile in a new tab.

### API Endpoint

```http
GET https://api.github.com/users/{username}
```

Example:

```text
https://api.github.com/users/suvepatra004
```

---

### Getting Started

#### Clone the repository

```bash
git clone https://github.com/suvepatra004/React-Components/tree/master/GitProfile-Dashboard
```

#### Navigate to the project

```bash
cd GitProfile-Dashboard
```

#### Install dependencies

```bash
npm install
```

#### Start the development server

```bash
npm run dev
```

#### Run unit tests

```bash
npm test
```

#### Build for production

```bash
npm run build
```

---

### 📸 Application States

- **Initial / Idle** — Search bar with a prompt to search a GitHub username
- **Loading** — Search button shows "Searching..." while the API request is in progress
- **Profile Loaded** — Avatar, profile table, and Visit Profile link
- **User Not Found** — 404 response with an error message; profile is hidden
- **Validation Error** — Empty username submission shows "Set username"
- **Network / HTTP Error** — Non-404 failures display the error message
- **Recent Searches** — Up to 5 previously searched usernames, clickable to re-search

---

### Version 2 — Completed

The core search and profile display functionality.

**Completed:**

- ✅ Search GitHub users
- ✅ Display public profile information
- ✅ Input validation
- ✅ Loading state
- ✅ HTTP & network error handling
- ✅ "User Not Found" handling
- ✅ Visit Profile redirect
- ✅ Responsive UI with Tailwind CSS

### Version 3 — Completed

Enhanced search experience, async refactor, and test coverage.

**Completed:**

- ✅ Search history (last 5 usernames stored in `localStorage`)
- ✅ Click previous searches to search again (mouse click + keyboard Enter/Space)
- ✅ Refactor API logic using `async/await`
- ✅ Improved UI state management (loading, error, profile, idle states)
- ✅ Recent history expiry (clears after 5 minutes)
- ✅ Duplicate elimination in search history
- ✅ `N/A` fallback for missing optional profile fields
- ✅ Vitest + React Testing Library setup
- ✅ Unit tests for Profile component (validation, fetch success/404/errors, localStorage, recent searches, keyboard interaction)

**Planned:**

- [ ] Enhanced error handling for API authorization failures and rate-limit responses
- [ ] Refactor `Profile` into modular, reusable sub-components
- [ ] Paginated suggestion results after username search
- [ ] Display up to 6 similar username suggestions with responsive layout
- [ ] Improved mobile responsiveness and small-screen UX
- [ ] Suggestion profiles rendered as an interactive grid card layout post-search
- [ ] Dedicated expanded profile view navigable from the suggestion grid
- [ ] Expanded profile page: avatar, username, display name, bio, optional company, GitHub-style contribution activity graph, aggregate stats (commits, PRs, issues), social links with icons, last contribution date, and active/inactive status

---

### 📚 Learning Objectives

This project was built to practice:

- React Components & JSX
- `useState` and `useEffect`
- Event Handling & Controlled Components
- Conditional Rendering
- Fetch API with `async/await`
- HTTP Status Handling & Error Handling
- UI State Management
- `localStorage` for client-side persistence
- Unit Testing with Vitest & React Testing Library
- Mocking `fetch` and `localStorage` in tests

### Features

#### Version 1

- Fetch a GitHub user's public profile
- Display:
  - Avatar
  - Username
  - Name
  - Company
  - Followers
  - Bio

#### Version 2

- Search GitHub users by username
- Input validation
- Loading state while fetching data
- HTTP error handling
- "User Not Found" handling
- Network error handling
- Visit Profile button
- Responsive UI built with Tailwind CSS

#### Version 3

- Recent search history (max 5, stored in `localStorage`, 5-minute TTL)
- Re-search by clicking a recent username
- Keyboard-accessible recent search items
- Idle state prompt when no profile is loaded
- `async/await`-based API calls
- Comprehensive unit test suite for the Profile component

---

## 📄 License

This project is built for learning and portfolio purposes.
