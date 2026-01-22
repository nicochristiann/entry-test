# 📋 To-Do & Posts Management App

A simple **Next.js** application that demonstrates task management, API integration, search functionality, and responsive UI using modern frontend tools.

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **State Management:** Redux Toolkit
- **UI Components:** Shadcn UI + Tailwind CSS
- **Table:** TanStack React Table
- **Testing:** Jest
- **API:** JSONPlaceholder

## ✨ Features

### 📝 To-Do Management

- Add new tasks
- Mark tasks as **completed**
- Delete tasks with confirmation dialog
- Persist tasks using **localStorage**
- Filter tasks:
  - All
  - Completed
  - Pending

### 📰 Posts & Comments

- Fetch posts from:
  https://jsonplaceholder.typicode.com/posts
- Search posts by **Post ID** & Fetch comments by post ID:
  https://jsonplaceholder.typicode.com/comments?postId={id}

- Display **Posts** and **Comments** in separate tables
- Clear search to refetch all posts

### ⏳ Loading States

- Skeleton table while fetching data
- Loading indicators for async actions (create / read / update / delete)

## 🛠️ Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
#
cd your-repo-name
#
npm install
# or
yarn install
# or
pnpm install
#
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 🧪 Running Tests

```bash
npm run test
# or run on watch mode
npm run test:watch
```

### 📌 Notes for Reviewers

- localStorage is used instead of a backend for task persistence
- Async actions are simulated using createAsyncThunk
- Client Components are used where browser APIs are required
- Pagination helps keep the page concise by displaying data in smaller chunks instead of showing everything at once.
