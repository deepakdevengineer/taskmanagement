# Task Management Application

A full-stack Task Management application built with **Django REST Framework** (backend) and **Angular 17** (frontend), featuring JWT authentication, CRUD operations, search, filtering, and pagination.

## 🌐 Live Demo & Deployment Links

| Deployment | URL |
|------------|-----|
| 🚀 **Live Frontend (Vercel)** | [https://taskmanagement-five-kappa.vercel.app/](https://taskmanagement-five-kappa.vercel.app/) |
| ⚡ **Live Backend API (Render)** | [https://taskmanagement-6aww.onrender.com/api/](https://taskmanagement-6aww.onrender.com/api/) |
| 📦 **GitHub Repository** | [https://github.com/deepakdevengineer/taskmanagement](https://github.com/deepakdevengineer/taskmanagement) |

### 🔑 Demo Login Credentials
- **Username / Email**: `kdsad@gmail.com`
- **Password**: `kdsad@gmail.com`

---

## Tech Stack

### Backend
- **Python 3.10+** / **Django 5.x**
- **Django REST Framework** — RESTful API
- **djangorestframework-simplejwt** — JWT Authentication
- **django-cors-headers** — Cross-Origin Resource Sharing
- **django-filter** — Filtering support
- **SQLite** — Database (default)

### Frontend
- **Angular 17** — Standalone components architecture
- **RxJS** — Reactive programming
- **TypeScript** — Type safety
- **Vanilla CSS** — Premium dark theme with glassmorphism design

---

## Features

| Feature | Description |
|---------|-------------|
| ✅ CRUD Operations | Create, Read, Update, Delete tasks |
| ✅ JWT Authentication | Secure login/register with token refresh |
| ✅ Search | Search tasks by title (debounced) |
| ✅ Filter by Status | Filter tasks by Pending / In Progress / Completed |
| ✅ Pagination | Server-side pagination (10 items per page) |
| ✅ Input Validation | Both frontend (reactive forms) and backend (DRF serializers) |
| ✅ Responsive UI | Mobile-friendly premium dark theme |
| ✅ User Scoping | Each user sees only their own tasks |

---

## Project Structure

```
├── backend/                    # Django REST Framework API
│   ├── manage.py
│   ├── requirements.txt
│   ├── task_manager/           # Django project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── tasks/                  # Tasks app
│       ├── models.py           # Task model
│       ├── serializers.py      # DRF serializers + validation
│       ├── views.py            # ViewSet + RegisterView
│       ├── pagination.py       # Custom pagination
│       ├── urls.py             # API routes
│       ├── admin.py
│       └── tests.py
│
├── frontend/                   # Angular 17 SPA
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/     # UI components
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   ├── navbar/
│   │   │   │   ├── task-list/
│   │   │   │   ├── task-form/
│   │   │   │   └── task-delete-dialog/
│   │   │   ├── services/       # HTTP services
│   │   │   ├── guards/         # Route guards
│   │   │   ├── interceptors/   # Auth interceptor
│   │   │   └── models/         # TypeScript interfaces
│   │   └── styles.css          # Global dark theme
│   └── angular.json
│
├── postman_collection.json     # API documentation
└── README.md
```

---

## Setup Instructions

### Prerequisites
- Python 3.10 or higher
- Node.js 18+ and npm
- Git

### Backend Setup

```bash
# 1. Navigate to backend directory
cd backend

# 2. Create and activate virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run database migrations
python manage.py migrate

# 5. Create superuser (optional, for admin panel)
python manage.py createsuperuser

# 6. Start the development server
python manage.py runserver
```

The backend API will be available at: `http://localhost:8000/api/`

### Frontend Setup

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start the development server
ng serve
# or
npm start
```

The frontend will be available at: `http://localhost:4200`

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register/` | Register a new user |
| POST | `/api/token/` | Login (obtain JWT tokens) |
| POST | `/api/token/refresh/` | Refresh access token |

### Tasks (Requires Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks/` | List all tasks (paginated) |
| POST | `/api/tasks/` | Create a new task |
| GET | `/api/tasks/{id}/` | Get task details |
| PUT | `/api/tasks/{id}/` | Update a task |
| DELETE | `/api/tasks/{id}/` | Delete a task |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `search` | Search by title/description | `?search=meeting` |
| `status` | Filter by status | `?status=PENDING` |
| `page` | Page number | `?page=2` |
| `ordering` | Sort results | `?ordering=-due_date` |

### Task Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Task title (max 200 chars) |
| `description` | string | No | Task description |
| `status` | string | No | `PENDING` / `IN_PROGRESS` / `COMPLETED` (default: `PENDING`) |
| `due_date` | date | Yes | Due date in `YYYY-MM-DD` format |

---

## Validation Rules

### Backend (DRF Serializers)
- **Title**: Cannot be blank
- **Due Date**: Cannot be in the past (for new tasks)
- **Status**: Must be one of: `PENDING`, `IN_PROGRESS`, `COMPLETED`
- **Registration**: Password and confirm password must match

### Frontend (Angular Reactive Forms)
- **Title**: Required, minimum 3 characters
- **Status**: Required
- **Due Date**: Required
- **Registration**: All fields required, passwords must match

---

## Running Tests

```bash
# Backend tests
cd backend
python manage.py test

# Frontend (if test files are configured)
cd frontend
ng test
```

---

## Time Taken

Approximately **2 hours**

---

## License

This project was built as part of a Web Developer Assessment.
