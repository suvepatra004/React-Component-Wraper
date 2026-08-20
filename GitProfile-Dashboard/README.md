# GitHub Developer Profile Dashboard

A React application that searches and displays public GitHub user profiles using the GitHub REST API. Search by username, browse matching users in a card grid, open an expanded profile view, paginate through results, and revisit recent searches — with loading states, error handling, and unit test coverage.

**Live demo:** [https://gitprofile-two.vercel.app/](https://gitprofile-two.vercel.app/)

## 🛠️ Tech Stack

- React 19
- JavaScript (ES6+)
- Vite
- Tailwind CSS v4
- GitHub REST API
- Vitest + React Testing Library (unit tests)
- Deployed on [Vercel](https://gitprofile-two.vercel.app/)

### Project Structure

```tree
GitProfile-Dashboard/
├── assets/
│   └── recently.png
├── components/
│   ├── Dashboard.jsx      # Expanded profile view
│   ├── RecentUser.jsx     # Recent search history panel
│   └── UserCard.jsx       # Search result card
├── public/
│   ├── favicon.svg        # GitHub-inspired app icon
│   └── icons.svg
├── src/
│   ├── tests/
│   │   └── Profile.test.jsx
│   ├── App.jsx
│   ├── Profile.jsx        # Search, results, and state orchestration
│   ├── main.jsx
│   └── index.css
├── setupTests.js
├── vitest.config.js
├── vite.config.js
└── package.json
```

---

### How It Works

1. User enters a GitHub username (or partial match) in the search bar.
2. The application validates the input (empty username shows a "Set username" error).
3. A request is sent to the GitHub Search Users API using `async/await`.
4. Up to 6 matching users are shown as interactive **UserCard** components in a responsive grid.
5. Clicking a **UserCard** opens the **Dashboard** expanded profile view (avatar, username, name, company, followers, bio, and Visit Profile link).
6. **Load more** fetches additional pages of search results (10 users per page).
7. Successful searches are saved to **recent search history** (up to 5 usernames in `localStorage`, expires after 5 minutes).
8. Clicking a recent search re-runs that query.
9. The **Visit Profile** button opens the user's GitHub profile in a new tab.

### API Endpoints

```http
GET https://api.github.com/search/users?q={query}&per_page=6&page=1
GET https://api.github.com/search/users?q={query}&per_page=10&page={n}
GET https://api.github.com/users/{username}
```

Example search:

```text
https://api.github.com/search/users?q=suvepatra004&per_page=6&page=1
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

#### Preview production build locally

```bash
npm run preview
```

---

### 📸 Application States

- **Initial / Idle** — Search bar with a prompt to search a GitHub username
- **Loading** — Search button shows "Searching..." while the API request is in progress
- **Search Results** — Grid of UserCard components for matching GitHub users
- **Profile Selected** — Dashboard expanded view with full profile details
- **Load More** — Paginated fetch of additional search results
- **User Not Found** — No matching users; error message displayed
- **Validation Error** — Empty username submission shows "Set username"
- **Network / HTTP Error** — Non-success responses display the error message
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

Enhanced search experience, component modularization, and test coverage.

**Completed:**

- ✅ Search history (last 5 usernames stored in `localStorage`)
- ✅ Click previous searches to search again (mouse click + keyboard Enter/Space)
- ✅ Refactor API logic using `async/await`
- ✅ Improved UI state management (loading, error, profile, idle states)
- ✅ Recent history expiry (clears after 5 minutes)
- ✅ Duplicate elimination in search history
- ✅ `N/A` fallback for missing optional profile fields
- ✅ Vitest + React Testing Library setup
- ✅ Unit tests for Profile component (validation, fetch success/404/errors, localStorage, recent searches, keyboard interaction, edge cases)
- ✅ Refactor `Profile` into modular sub-components (`Dashboard`, `UserCard`, `RecentUser`)
- ✅ Paginated search results with Load more button
- ✅ Up to 10 results per page with full pagination support
- ✅ Initial search displays up to 10 matching users
- ✅ Improved mobile responsiveness and small-screen UX
- ✅ Interactive UserCard grid after search
- ✅ Expanded profile view via Dashboard when a card is selected
- ✅ Error handling for API rate limits (403, 429 status codes)
- ✅ Comprehensive edge case testing
- ✅ Live deployment on Vercel

### Version 4 — Planned

Advanced features, enhanced profile display, and optimization.

**Planned:**

- [ ] Migrate from Fetch API to Axios/react-query/react-swr for improved state management
- [ ] Enhanced error handling for API authorization failures and timeout handling
- [ ] Expanded profile page with:
  - GitHub-style contribution activity graph
  - Aggregate stats (total commits, PRs, issues)
  - Social links with icons (Twitter, LinkedIn, etc.)
  - Last contribution date indicator
  - Active/Inactive status badge
  - Repository showcase grid
- [ ] Display "since ${created_at}" instead of generic "Profile" text in UserCard
- [ ] Implement GitHub GraphQL API for richer data queries
- [ ] Alt text on hover for accessibility
- [ ] Scroll-to-view behavior for UserCard components
- [ ] Clear selected profile when a new search is submitted
- [ ] Add favorites/bookmarks feature with persistence
- [ ] Dark/Light theme toggle
- [ ] Performance optimization with React.memo and useMemo
- [ ] Host the page on GitHub Pages (currently deployed on Vercel)

---

### 📚 Learning Objectives

This project was built to practice:

- React Components & JSX
- Component composition and modular architecture
- `useState` and `useEffect`
- Event Handling & Controlled Components
- Conditional Rendering
- Fetch API with `async/await`
- GitHub Search Users API and pagination
- HTTP Status Handling & Error Handling
- UI State Management
- `localStorage` for client-side persistence
- Unit Testing with Vitest & React Testing Library
- Mocking `fetch` and `localStorage` in tests
- Production deployment with Vercel

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
- Comprehensive unit test suite for the Profile component with edge case coverage
- Modular components: `Profile`, `Dashboard`, `UserCard`, `RecentUser`
- GitHub Search Users API with paginated results (10 results per page)
- UserCard grid for browsing matching profiles
- Dashboard expanded profile view on card selection
- Load more pagination for search results
- Rate limit error handling (403, 429 status codes)
- Live demo at [gitprofile-two.vercel.app](https://gitprofile-two.vercel.app/)

---

## 📄 License

This project is built for learning and portfolio purposes.
