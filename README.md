# 📚 StudyWise AI - Your Personal AI-Powered Study Assistant

<div align="center">

![StudyWise AI Logo](https://img.shields.io/badge/StudyWise-AI%20Assistant-purple?style=for-the-badge&logo=book-open)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-22.18.0-green?style=for-the-badge&logo=node.js)

**An intelligent study companion that transforms your learning materials into comprehensive summaries and interactive quizzes using AI technology.**

[🚀 Live Demo](#) | [📖 Documentation](#features) | [🛠️ Installation](#installation) | [🤝 Contributing](#contributing)

</div>

---

## 🎯 Project Overview

**StudyWise AI** is a full-stack web application designed to revolutionize the way students interact with their study materials. By leveraging Google's Gemini AI technology, the application automatically generates concise summaries and comprehensive 25-question quizzes from uploaded documents, making learning more efficient and engaging.

### 🎓 **Target Audience**
- University students
- Professional learners
- Educators and tutors
- Anyone seeking to optimize their study process

### 🏆 **Key Achievements**
- **AI-Powered Content Generation**: Automatic summary and quiz creation
- **Multi-Format Document Support**: PDF, DOCX, and TXT files
- **Responsive Design**: Seamless experience across all devices
- **Real-time Processing**: Instant AI analysis and feedback
- **Modern Tech Stack**: Built with cutting-edge technologies

---

## ✨ Features

### 🧠 **AI-Powered Learning**
- **Smart Summarization**: AI-generated concise summaries of study materials
- **Comprehensive Quizzes**: 25-question multiple-choice quizzes with explanations
- **Adaptive Content**: Tailored questions based on document content
- **Instant Feedback**: Real-time quiz results and performance tracking

### 📄 **Document Processing**
- **Multi-Format Support**: Upload PDF, DOCX, and TXT files
- **Text Extraction**: Advanced parsing for complex documents
- **Content Analysis**: Intelligent processing of study materials
- **File Management**: Secure temporary storage and cleanup

### 🎨 **User Experience**
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Intuitive Navigation**: Hamburger menu for desktop/tablet, bottom navigation for mobile
- **Progress Tracking**: Monitor study sessions and performance
- **Focus Timer**: Pomodoro technique integration for productivity

### 🔧 **Technical Features**
- **Real-time Processing**: Instant AI analysis and response
- **Error Handling**: Robust error management and user feedback
- **Performance Optimization**: Efficient file processing and caching
- **Security**: Secure API key management and file handling
- **Local Data Persistence**: Study sessions saved to browser storage

---

## 🛠️ Technology Stack

### **Frontend**
- **React 18.3.1** - Modern UI framework
- **TypeScript 5.5.3** - Type-safe development
- **Vite 5.4.2** - Fast build tool and dev server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Local Storage** - Client-side data persistence

### **Backend**
- **Node.js 22.18.0** - JavaScript runtime
- **Express.js 5.1.0** - Web application framework
- **Multer 2.0.2** - File upload middleware
- **CORS** - Cross-origin resource sharing

### **AI & Processing**
- **Google Gemini AI** - Advanced language model
- **PDF-Parse 1.1.1** - PDF text extraction
- **Mammoth 1.10.0** - DOCX document parsing

### **Development Tools**
- **ESLint** - Code linting and formatting
- **Nodemon** - Development server with auto-restart
- **Concurrently** - Run multiple commands simultaneously

---

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **Git** (for version control)

### **API Requirements**
- **Google Gemini API Key** - [Get your API key here](https://makersuite.google.com/app/apikey)

---

## 🚀 Installation & Setup

### **1. Clone the Repository**
```bash
git clone https://github.com/badoooo1/STUDYWISE.git
cd studywise
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Environment Configuration**
```bash
# Copy the environment template
cp env.example .env

# Edit .env file and add your Gemini API key
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
```

### **4. Run Setup Script (Optional)**
```bash
npm run setup
```

### **5. Start the Application**

#### **Option A: Run Both Frontend and Backend**
```bash
npm run dev:full
```

#### **Option B: Run Separately**
```bash
# Terminal 1 - Backend Server
npm run server:dev

# Terminal 2 - Frontend Development Server
npm run dev
```

### **6. Access the Application**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

---

## 📖 Usage Guide

### **Getting Started**
1. **Open the Application**: Navigate to http://localhost:5173
2. **Upload Documents**: Use the file upload area in the Notes section
3. **Generate Content**: Click "Generate Summary & Quiz" to process your materials
4. **Study & Practice**: Review summaries and take interactive quizzes

### **Supported File Types**
- **Text Files (.txt)**: Direct text processing
- **PDF Documents (.pdf)**: Advanced text extraction
- **Word Documents (.docx)**: Complete document parsing

### **Navigation**
- **Desktop/Tablet**: Use the hamburger menu (top-left)
- **Mobile**: Use the bottom navigation bar
- **Sections**: Welcome, Notes, Study, Focus Timer, Progress

---

## 🏗️ Project Structure

```
studywise/
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer
│   │   ├── navigation/      # Desktop and mobile navigation
│   │   ├── screens/         # Main application screens
│   │   ├── study/           # Study-related components
│   │   ├── pomodoro/        # Focus timer components
│   │   ├── progress/        # Progress tracking
│   │   └── ui/              # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API services
│   ├── types/               # TypeScript type definitions
│   └── config/              # Configuration files
├── server.cjs               # Backend server
├── uploads/                 # Temporary file storage
└── package.json             # Project dependencies
```

---

## 🔧 API Endpoints

### **POST /upload-and-analyze**
Process uploaded documents and generate AI content.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `document` (file)

**Response:**
```json
{
  "summary": "AI-generated summary of the document",
  "quiz": [
    {
      "question": "Question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A"
    }
  ]
}
```

---

## 🎨 Screenshots

<div align="center">

### Welcome Screen
![Welcome Screen](https://via.placeholder.com/800x400/6366f1/ffffff?text=Welcome+Screen)

### Notes Upload
![Notes Upload](https://via.placeholder.com/800x400/8b5cf6/ffffff?text=Notes+Upload)

### Study Interface
![Study Interface](https://via.placeholder.com/800x400/06b6d4/ffffff?text=Study+Interface)

### Quiz Display
![Quiz Display](https://via.placeholder.com/800x400/10b981/ffffff?text=Quiz+Display)

</div>

---

## 🚀 Deployment

### **Frontend Deployment (Vercel)**
```bash
npm run build
# Deploy the dist/ folder to Vercel
```

### **Backend Deployment (Railway/Heroku)**
```bash
# Set environment variables
GEMINI_API_KEY=your_api_key
PORT=3001

# Deploy server.cjs
```

---

## 🤝 Contributing

We welcome contributions to improve StudyWise AI! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Maintain responsive design principles
- Add proper error handling
- Include comprehensive documentation

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Jeremiah Baddoo**
- **GitHub**: [@badoooo1](https://github.com/badoooo1)
- **Email**: baddoojeremiah85@gmail.com

---

## 🙏 Acknowledgments

- **Google Gemini AI** for providing the advanced language model
- **React Team** for the amazing frontend framework
- **Vite Team** for the fast build tool
- **Tailwind CSS** for the utility-first CSS framework
- **Open Source Community** for the various libraries and tools

---

## 📊 Project Statistics

- **Lines of Code**: 2,000+
- **Components**: 15+
- **API Endpoints**: 1
- **File Types Supported**: 3
- **AI Questions Generated**: 25 per document

---

<div align="center">

**Made with ❤️ for better learning experiences**

[⬆️ Back to Top](#-studywise-ai---your-personal-ai-powered-study-assistant)

</div>
