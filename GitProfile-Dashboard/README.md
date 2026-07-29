# GitHub Developer Profile Dashboard

A React application that fetches and displays public GitHub user profiles using the GitHub REST API.

## 🛠️ Tech Stack

- React
- JavaScript (ES6+)
- Tailwind CSS
- GitHub REST API

### Project Structure

```tree
src/
├── components/
│   └── Profile.jsx
├── App.jsx
├── main.jsx
└── index.css
```

---

### How It Works

1. User enters a GitHub username.
2. The application validates the input.
3. A request is sent to the GitHub REST API.
4. Based on the response:
   - Displays the user's profile.
   - Shows an appropriate error message.
5. The **Visit Profile** button opens the user's GitHub profile in a new tab.

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

---

### 📸 Application States

- Initial Screen
- Loading
- Profile Loaded
- User Not Found
- Network Error

---

### Version 2 - Completed

The core functionality of the application has been implemented.

**Completed:**

- ✅ Search GitHub users
- ✅ Display public profile information
- ✅ Input validation
- ✅ Loading state
- ✅ HTTP & network error handling
- ✅ "User Not Found" handling
- ✅ Visit Profile redirect

### Version 3 

- [ ] Search history
- [ ] Click previous searches to search again
- [ ] Refactor API logic using `async/await`
- [ ] Better UI state management
- [ ] Handle GitHub API rate limit errors
- [ ] Split UI into reusable components

### 📚 Learning Objectives

This project was built to practice:

- React Components
- JSX
- useState
- Event Handling
- Controlled Components
- Conditional Rendering
- Fetch API
- HTTP Status Handling
- Error Handling
- UI State Management

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

---

## 📄 License

This project is built for learning and portfolio purposes.
