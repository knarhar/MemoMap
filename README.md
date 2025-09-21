# MemoMap

A modern, full-stack note-taking application built with React and Django. Organize your thoughts with beautiful card-based interface, categorize notes, and manage them with an intuitive dark-themed UI.

## ✨ Features

### 🎯 Core Functionality
- **Create Notes**: Add new note cards with title, description, and categories
- **Edit Notes**: Inline editing with real-time updates
- **Delete Notes**: Secure deletion with confirmation prompts
- **Categorize**: Tag notes with multiple categories for better organization
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### 🎨 User Interface
- **Dark Theme**: Modern dark gray color scheme for comfortable viewing
- **Card Layout**: Clean, organized grid layout with smooth animations
- **Notion-Style Modals**: Professional popup interfaces for detailed editing
- **Hover Effects**: Interactive elements with smooth transitions
- **Loading States**: Clear feedback during API operations

### 🚀 User Experience
- **Quick Actions**: Fast card creation with floating action button
- **Staggered Animations**: Cards appear with elegant entrance animations
- **Form Validation**: Real-time validation with helpful error messages
- **Character Limits**: Guided input with character counters
- **Auto-save**: Immediate updates without page refresh

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Ant Design** - Professional UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Day.js** - Lightweight date formatting

### Backend
- **Django** - Python web framework
- **Django REST Framework** - API development
- **SQLite/PostgreSQL** - Database options

## 🏗️ Architecture

### Frontend Structure
```
src/
├── components/
│   ├── CardsPage.jsx          # Main cards grid view
│   ├── CardDetailModal.jsx    # Card editing modal
│   ├── AddCardModal.jsx       # Card creation modal
│   └── AddCardButton.jsx      # Floating action button
├── api/
│   └── cards.js               # API service functions
└── styles/
    └── cardsPage.css          # Custom styling
```

### API Endpoints
```
GET    /api/cards/             # Fetch all cards
POST   /api/cards/             # Create new card
PUT    /api/cards/             # Update existing card
DELETE /api/cards/             # Delete card
GET    /api/categories/        # Fetch categories (if implemented)
```

### Data Structure
```javascript
{
  "id": 1,
  "title": "Meeting Notes",
  "description": "Quarterly planning session...",
  "categories": ["work", "planning"],
  "created": "2024-01-15T10:30:00Z"
}
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+ and pip
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/note-cards-app.git
   cd note-cards-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

## 🎯 Usage

### Creating Notes
1. Click the **floating + button** in the bottom-right corner
2. Fill in the **title** (required) and **description**
3. Add **categories** by typing or selecting existing ones
4. Click **"Create Card"** to save

### Managing Notes
- **View Details**: Click on any card to open detailed view
- **Edit**: Click the edit button in the detail modal
- **Delete**: Click the delete button and confirm removal
- **Categories**: Use tags to organize and filter notes

## 🎨 Customization

### Theming
The app uses a dark theme by default. Colors can be customized in:
- `cardsPage.css` for custom components
- Tailwind config for utility classes
- Ant Design theme configuration

### Layout
- Grid responsiveness: Modify `Col` breakpoints in `CardsPage.jsx`
- Card sizing: Adjust container dimensions
- Animation timing: Update CSS transition durations

## 📱 Responsive Design

- **Desktop**: 4-6 cards per row with full features
- **Tablet**: 2-3 cards per row with touch-friendly interactions
- **Mobile**: Single column layout with optimized modals

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style
- ESLint configuration for consistent code style
- Prettier for automatic formatting
- Component-based architecture
- Custom hooks for state management


---

⭐ **Star this repository if you find it helpful!** ⭐
