# StudyWise AI - Your Personal AI-Powered Study Assistant

A comprehensive study application that uses AI to help you learn more effectively through intelligent summarization, quiz generation, and focus tracking.

## Features

- 📝 **Smart Note Processing**: Upload documents or paste notes for AI analysis
- 🤖 **AI-Powered Summaries**: Get concise, clear summaries of your study materials
- 🧠 **Interactive Quizzes**: Test your knowledge with AI-generated questions
- ⏱️ **Pomodoro Timer**: Stay focused with customizable study sessions
- 📊 **Progress Tracking**: Monitor your study habits and improvements
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🍔 **Smart Navigation**: Hamburger menu for desktop/tablet, bottom nav for mobile

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Lucide React for icons
- Firebase for data persistence

### Backend
- Node.js with Express
- Multer for file uploads
- CORS for cross-origin requests
- PDF parsing with pdf-parse
- DOCX parsing with mammoth
- Google Gemini AI integration

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### 1. Quick Setup

```bash
# Install all dependencies
npm install

# Run setup script to configure environment
npm run setup

# Edit .env file and add your GEMINI_API_KEY
# Then start the application
npm run dev:full
```

### 2. Backend Setup

1. **Install backend dependencies:**
   ```bash
   npm install express multer cors pdf-parse mammoth dotenv
   npm install --save-dev nodemon
   ```

2. **Set up environment variables:**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env and add your Gemini API key
   # Get your API key from: https://makersuite.google.com/app/apikey
   ```
   
   Your `.env` file should look like:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   PORT=3001
   ```

3. **Start the backend server:**
   ```bash
   node server.js
   # or for development with auto-restart:
   npm run dev
   ```

   The backend will run on `http://localhost:3001`

### 3. Frontend Setup

1. **Install frontend dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

### 4. Firebase Setup (Optional)

If you want to use Firebase for data persistence:

1. **Create a Firebase project:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select existing one

2. **Enable services:**
   - Enable **Anonymous Authentication** (for user sessions)
   - Enable **Firestore Database** (for data storage)

3. **Configure Firestore Security Rules:**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /artifacts/{appId}/users/{userId}/pomodoro_sessions/{document=**} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

4. **Add Firebase config:**
   - Copy your Firebase config from the project settings
   - Add it to `src/services/firebase.ts` or use environment variables

**Important:** When running locally, you'll need to manually provide your Firebase config. The app will work without Firebase, but features like progress tracking and session persistence will be limited.

## File Upload Support

The application supports uploading the following file types:

- **Text Files (.txt)**: Direct browser processing
- **PDF Files (.pdf)**: Backend processing with pdf-parse
- **Word Documents (.docx)**: Backend processing with mammoth

## API Endpoints

### POST /upload-and-analyze
Upload a document for AI analysis.

**Request:**
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

## Project Structure

```
studywise/
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer
│   │   ├── navigation/      # Desktop and mobile navigation
│   │   ├── screens/         # Main application screens
│   │   ├── study/           # Study-related components
│   │   ├── pomodoro/        # Timer components
│   │   ├── progress/        # Progress tracking
│   │   └── ui/              # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API and external services
│   ├── types/               # TypeScript type definitions
│   └── config/              # Configuration constants
├── server.js                # Backend Express server
├── uploads/                 # Temporary file storage
└── package.json
```

## Development

### Running Both Frontend and Backend

**Option 1: Run both simultaneously (Recommended)**
```bash
npm run dev:full
```

**Option 2: Run in separate terminals**

1. **Terminal 1 - Backend:**
   ```bash
   npm run server:dev
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

**Option 3: Run backend only**
```bash
npm run server
```

### Building for Production

```bash
# Build frontend
npm run build

# Start backend in production
NODE_ENV=production node server.js
```

## Important Considerations

### File Type Processing
- **Text Files (.txt)**: Fully supported with direct browser processing
- **PDF Files (.pdf)**: Backend processing available but requires uncommenting pdf-parse code in server.js
- **Word Documents (.docx)**: Backend processing available but requires uncommenting mammoth code in server.js

### Running Both Frontend and Backend
You'll need to run both the frontend and backend simultaneously:
- **Frontend**: Runs on `http://localhost:5173` (Vite dev server)
- **Backend**: Runs on `http://localhost:3001` (Express server)

### Firebase Integration
- The app works without Firebase, but with limited functionality
- For full features, set up Firebase with Anonymous Authentication and Firestore
- Progress tracking and session persistence require Firebase

## Troubleshooting

### Common Issues

1. **Backend not starting:**
   - Check if port 3001 is available
   - Ensure all dependencies are installed
   - Verify GEMINI_API_KEY is set in .env file
   - Check console for detailed error messages

2. **File upload not working:**
   - Ensure backend server is running on port 3001
   - Check if uploads directory exists
   - Verify file type is supported (.txt, .pdf, .docx)
   - Check browser console for CORS errors

3. **AI processing not working:**
   - Verify GEMINI_API_KEY is set correctly
   - Check if the API key is valid and has quota
   - Ensure backend server is running

4. **CORS errors:**
   - Backend CORS is configured for development
   - For production, update CORS settings in server.js
   - Ensure frontend is running on the expected port

5. **Firebase errors:**
   - Check if Firebase project is properly configured
   - Verify Anonymous Authentication is enabled
   - Check Firestore security rules

### Getting Help

If you encounter issues:

1. Check the browser console for frontend errors
2. Check the terminal for backend errors
3. Verify all dependencies are installed
4. Ensure environment variables are set correctly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support or questions, please open an issue on GitHub.
