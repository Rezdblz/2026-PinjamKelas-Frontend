# 2026-PinjamKelas-Frontend

A modern, responsive web application for managing classroom borrowing requests. Built with React, TypeScript, and Tailwind CSS.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Key Components](#key-components)
- [Authentication](#authentication)
- [Responsive Design](#responsive-design)

## ✨ Features

### User Features
- **User Authentication**: Secure login with role-based access (Student/Admin)
- **Create Borrowing Requests**: Submit new classroom borrowing requests with details
- **View My Posts**: See all personal borrowing requests with status tracking
- **Search & Filter**: Real-time search and filter by status (Pending, Approved, Rejected)
- **Request Management**: Update or delete personal requests
- **View Details**: See complete information about each request

### Admin Features
- **Approve/Reject Requests**: Review and approve or reject borrowing requests
- **View All Posts**: See all borrowing requests from all users
- **Request Details**: Access full details of any request
- **Search & Filter**: Filter requests by status for better management

## 🛠 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Hooks + Context API
- **HTTP Client**: Fetch API
- **Routing**: React Router
- **Form Handling**: React Hooks

## 🚀 Getting Started

### Prerequisites
- Node.js (16.x or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rezdblz/2026-PinjamKelas-Frontend.git
   cd 2026-PinjamKelas-Frontend
   ```

2. **Navigate to project directory**
   ```bash
   cd PinjamKelas
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create environment file** (if needed)
   ```bash
   # Create .env file with API configuration (see .env.example)
   VITE_API_URL=http://localhost:3000/api (use your api url)
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   - Navigate to `http://localhost:5173`

## 📁 Project Structure

```
PinjamKelas/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx              # Navigation bar with theme
│   │   ├── login.tsx               # Login page
│   │   ├── FormView.tsx            # Form for creating requests
│   │   ├── TableView.tsx           # Main table view container
│   │   ├── ButtonComponents/
│   │   │   ├── Detail.tsx          # Detail modal
│   │   │   ├── Update.tsx          # Update modal
│   │   ├── filter/
│   │   │   └── SearchFilter.tsx    # Search and filter component
│   │   └── tables/
│   │       ├── MyPostsTable.tsx    # User's posts table
│   │       ├── AllPostsTable.tsx   # Admin's all posts table
│   │       └── LogTable.tsx        # Activity logs (optional)
│   ├── context/
│   │   ├── AuthContext.tsx         # Auth context provider
│   │   └── AuthContextType.ts      # Auth types
│   ├── hooks/
│   │   └── useAuth.ts              # Custom auth hook
│   ├── config/
│   │   └── api.ts                  # API configuration
│   ├── App.tsx                     # Main App component
│   ├── main.tsx                    # Entry point
│   ├── index.css                   # Global styles
│   └── output.css                  # Tailwind output
├── public/                         # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 📝 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🎯 Key Components

### SearchFilter Component
Real-time search and filter functionality for borrowing requests.
- Search by title and description
- Filter by status (Pending, Approved, Rejected)
- Reset button to clear filters

### Tables (MyPostsTable & AllPostsTable)
Responsive tables with the following features:
- **Desktop**: All columns visible (Title, Classroom, Status, Start Time, End Time, Actions)
- **Mobile**: Compact view with hidden time columns
- Action buttons: Approve/Reject (Admin), Update/Delete (User), Detail

### Authentication
- Context-based authentication using `AuthContext`
- Automatic token management
- Role-based access control (Student/Admin)
- Custom `useAuth` hook for easy authentication access

## 🔐 Authentication

The app uses React Context API for authentication:

```typescript
const { user, login, logout } = useAuth();

// User object contains:
// {
//   id: number;
//   username: string;
//   role: 'Student' | 'Admin';
// }
```

## 📱 Responsive Design

The application is fully responsive using Tailwind CSS breakpoints:

| Breakpoint | Size | Features |
|-----------|------|----------|
| Mobile | 320-640px | Hamburger menu, hidden columns, compact spacing |
| Small | 640-768px | Transitional sizing |
| Tablet | 768-1024px | All columns visible, normal spacing |
| Desktop | 1024px+ | Full navigation, optimized layout |

### Responsive Features
- ✅ Hamburger menu navigation on mobile
- ✅ Hidden time columns on mobile devices
- ✅ Responsive font sizing
- ✅ Adaptive padding and spacing
- ✅ Touch-friendly button sizes
- ✅ Full-screen login form

## 🎨 UI/UX Features

- **Dark Theme**: Modern dark slate color scheme
- **Consistent Colors**: 
  - Blue: Primary actions
  - Green: Approve actions
  - Red: Reject/Delete actions
  - Yellow: Update actions
- **Smooth Transitions**: All interactive elements have smooth hover states
- **Mobile-First**: Optimized for mobile with progressive enhancement
- **Accessibility**: Proper semantic HTML and ARIA labels

## 📚 API Integration

The app communicates with a backend API:

```bash
Base URL: http://localhost:3000/api
```

### Key Endpoints
- `POST /Auth/login` - User login
- `GET /Posts` - Get all posts (Admin)
- `GET /Posts/user/:id` - Get user's posts
- `POST /Posts` - Create new post
- `PUT /Posts/:id` - Update post
- `DELETE /Posts/:id` - Delete post
- `PUT /Posts/:id/approval` - Approve/Reject post (Admin)

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173 (Linux/Mac)
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf .vite
npm run dev
```

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributors

- Rezdblz

**Last Updated**: February 17, 2026
