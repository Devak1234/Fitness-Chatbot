# 🚀 Personal Fitness & Diet Chatbot

A production-quality React-based fitness and diet planning application with AI-powered chat assistance and comprehensive fitness tracking.

## ✨ Features

### 🎨 **Modern UI & Design**
- **Responsive Design**: Mobile-first approach with centered max-width layout
- **Component Library**: Reusable UI primitives (Card, Button, Modal, Badge, IconButton)
- **Professional Styling**: CSS variables, gradients, and modern design patterns

### 🤖 **AI-Powered Features**
- **Enhanced Chat**: Quick action buttons and context-aware responses
- **Plan Generation**: AI-generated weekly workout and diet plans
- **Plan Review**: AI analysis of active plans with improvement suggestions

### 📊 **Comprehensive Tracking**
- **Progress Charts**: Interactive weight tracking with CSV export
- **Daily Checklist**: Gamified routine tracking with confetti animations
- **Streak Counter**: Consecutive perfect day tracking
- **Health Metrics**: BMI and TDEE calculations

### 🏋️ **Fitness Management**
- **Weekly Plans**: Card-based plan creation and management
- **Exercise Library**: Comprehensive workout database with video tutorials
- **Nutrition Library**: Advanced food database with filtering
- **Favorites System**: Quick access to preferred foods and exercises

### 👤 **Personalization**
- **Profile Management**: Comprehensive user profiles with validation
- **Active Plan Banner**: Dynamic display of current workout/diet plans
- **Data Persistence**: localStorage integration for all user data

## 🚀 Quick Start

1. **Install dependencies**: `npm install`
2. **Start development server**: `npm run dev`
3. **Open application**: http://localhost:5173

## 📸 Image Assets

### 🥗 Food Images (`/public/images/foods/`)
- **Path**: `/public/images/foods/{slug}.jpg`
- **Example**: `chicken_breast.jpg`, `boiled_egg.jpg`
- **Fallback**: `placeholder-food.png`
- **Dimensions**: 400x300px recommended

### 🏋️ Workout Images (`/public/images/workouts/`)
- **Path**: `/public/images/workouts/{slug}.jpg`
- **Fallback**: `placeholder-workout.png`
- **Dimensions**: 400x300px recommended

### 📋 Image Management
- See `MISSING_IMAGES.md` for complete list of required images
- Application works without images (placeholders provided)
- Images automatically lazy-load for performance

## 🗂️ Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   ├── food/                  # Nutrition components
│   ├── workout/               # Exercise components
│   └── ActivePlanBanner.jsx   # Plan status banner
├── styles/                    # Component styles
├── data/                      # Application data
├── services/                  # Storage & API services
├── utils/                     # Helper functions
└── pages/                     # Main application pages
```

## 🔧 Development

### **Tech Stack**
- **React 19**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Chart.js**: Interactive data visualization
- **CSS Variables**: Dynamic theming system

### **Key Files**
- `src/components/ui/`: Reusable component library
- `PR_SUMMARY.md`: Comprehensive feature documentation
- `MISSING_IMAGES.md`: Image asset requirements

### **Data Structure**
- **Foods**: Standardized nutrition data with macros and tags
- **Exercises**: Comprehensive workout data with video tutorials
- **Plans**: Structured weekly workout and diet plans
- **Progress**: Time-series weight and health data

## 📊 localStorage Keys

```javascript
'profile': { name, age, gender, height, weight, ... }
'activeWeeklyPlan': { workout: [...], diet: [...], settings: {...} }
'progressEntries': [{ date, weight, notes, id }, ...]
'checklist_YYYY-MM-DD': { breakfast, water, workout, sleep, ... }
'favorites': { foods: [id, ...], exercises: [id, ...] }
```

## 🧪 Testing Checklist

See `PR_SUMMARY.md` for comprehensive testing instructions covering:
- Weekly plan generation and management
- Nutrition and workout library functionality
- Progress tracking and export
- Profile management and calculations
- Daily checklist and gamification

## 🚀 Production Deployment

1. **Build**: `npm run build`
2. **Preview**: `npm run preview`
3. **Deploy**: Generated `dist/` folder to your hosting platform

## 📝 Contributing

1. Follow the established component patterns
2. Use CSS variables for theming
3. Include proper TypeScript types (when added)
4. Update documentation as needed

## 📄 License

This project is part of the Personal Fitness & Diet Chatbot application.

---

**🎯 This application provides a complete fitness tracking solution with modern UX, comprehensive features, and production-ready code quality.**
