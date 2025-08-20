require('dotenv').config(); // Load environment variables from .env file
console.log(process.env.PORT, process.env.GEMINI_API_KEY)

const express = require('express');
const multer = require('multer'); // Middleware for handling multipart/form-data (file uploads)
const fs = require('fs'); // Node.js file system module
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing
const path = require('path'); // Node.js path module

// --- Third-party Libraries for Document Parsing ---
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

const app = express();
const port = process.env.PORT; // The port your backend server will listen on

// Middleware Setup
// Enable CORS for your frontend application to make requests to this backend.
// In a production environment, you should restrict this to your specific frontend URL.
app.use(cors());
// Parse JSON bodies for incoming requests
app.use(express.json());

// Configure Multer for file uploads
// 'uploads/' is a temporary directory where files will be stored before processing.
// Make sure this directory exists or create it.
const upload = multer({ dest: 'uploads/' });

// --- API Endpoint for File Upload and AI Analysis ---
app.post('/upload-and-analyze', upload.single('document'), async (req, res) => {
    // 'document' is the name of the form field that will contain the file.
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    const filePath = req.file.path;
    const fileMimeType = req.file.mimetype;
    let extractedText = '';
    let extractionError = '';

    
    console.log(`Received file: ${req.file.originalname} with type: ${fileMimeType}`);


    try {
        if (fileMimeType === 'text/plain') {
            // Directly read content for plain text files
            extractedText = fs.readFileSync(filePath, 'utf8');
            console.log('Text file content read successfully.');
        } else if (fileMimeType === 'application/pdf') {
            // PDF Parsing Logic using pdf-parse library
            try {
                const dataBuffer = fs.readFileSync(filePath);
                const data = await pdfParse(dataBuffer);
                extractedText = data.text;
                console.log('PDF text extraction completed successfully.');
            } catch (pdfError) {
                console.error('PDF parsing error:', pdfError);
                extractionError = `Failed to extract text from PDF: ${pdfError.message}`;
                return res.status(400).json({ error: extractionError });
            }

        } else if (fileMimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            // DOCX Parsing Logic using mammoth library
            try {
                const docxBuffer = fs.readFileSync(filePath);
                const result = await mammoth.extractRawText({ arrayBuffer: docxBuffer });
                extractedText = result.value;
                console.log('DOCX text extraction completed successfully.');
            } catch (docxError) {
                console.error('DOCX parsing error:', docxError);
                extractionError = `Failed to extract text from DOCX: ${docxError.message}`;
                return res.status(400).json({ error: extractionError });
            }

        } else {
            extractionError = `Unsupported file type: ${fileMimeType}. Only .txt, .pdf, and .docx are currently recognized for processing.`;
            console.error(extractionError);
            return res.status(400).json({ error: extractionError });
        }

        // Ensure extractedText is not empty after parsing (unless it's an error case handled above)
        if (!extractedText.trim() && !extractionError) {
             extractionError = "No usable text could be extracted from the uploaded file.";
             console.warn(extractionError);
             return res.status(400).json({ error: extractionError });
        }

        // --- Important: Clean up the uploaded file from temporary storage ---
        fs.unlinkSync(filePath);
        console.log(`Cleaned up temporary file: ${filePath}`);

        // --- Call Gemini API with the Extracted Text ---
        // Your Gemini API key should be securely stored (e.g., in environment variables).
        // Replace with your actual Gemini API Key from your environment.
        const geminiApiKey = process.env.GEMINI_API_KEY; 
        if (!geminiApiKey) {
            console.error("GEMINI_API_KEY is not set in environment variables.");
            return res.status(500).json({ error: 'Server configuration error: Gemini API Key missing.' });
        }

        // --- Generate Summary ---
        const summaryPrompt = `Summarize the following notes concisely and clearly. Focus on the main points and key information:\n\n${extractedText}`;
        let chatHistorySummary = [{ role: "user", parts: [{ text: summaryPrompt }] }];

        const payloadSummary = { contents: chatHistorySummary };
        const apiUrlSummary = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;

        const responseSummary = await fetch(apiUrlSummary, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payloadSummary)
        });
        const resultSummary = await responseSummary.json();

        let aiSummary = 'Could not generate summary.';
        if (resultSummary.candidates && resultSummary.candidates.length > 0 &&
            resultSummary.candidates[0].content && resultSummary.candidates[0].content.parts &&
            resultSummary.candidates[0].content.parts.length > 0) {
            aiSummary = resultSummary.candidates[0].content.parts[0].text;
            console.log('AI Summary generated.');
        } else {
            console.warn('Gemini API did not return a valid summary.');
        }

        // --- Generate Quiz ---
        const quizPrompt = `Based on the following text, generate a 25-question multiple-choice quiz. Each question should have 4 options, and one must be the correct answer. The quiz should directly test understanding of the provided text. Format the response as a JSON array of objects. Each object should have a 'question' (string), 'options' (array of 4 strings), and 'correctAnswer' (string, one of the options). If it is not possible to generate a quiz from the provided text, return an empty array.`;
        // Include the original extracted text for context in the quiz prompt
        let chatHistoryQuiz = [
            { role: "user", parts: [{ text: quizPrompt + '\n\nText:\n' + extractedText }] }
        ];

        const payloadQuiz = {
            contents: chatHistoryQuiz,
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "ARRAY",
                    items: {
                        type: "OBJECT",
                        properties: {
                            "question": { "type": "STRING" },
                            "options": {
                                "type": "ARRAY",
                                "items": { "type": "STRING" },
                                "minItems": 4,
                                "maxItems": 4
                            },
                            "correctAnswer": { "type": "STRING" }
                        },
                        "required": ["question", "options", "correctAnswer"]
                    }
                }
            }
        };

        const apiUrlQuiz = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;
        const quizResponse = await fetch(apiUrlQuiz, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payloadQuiz)
        });
        const quizResult = await quizResponse.json();

        let aiQuiz = [];
        if (quizResult.candidates && quizResult.candidates.length > 0 &&
            quizResult.candidates[0].content && quizResult.candidates[0].content.parts &&
            quizResult.candidates[0].content.parts.length > 0) {
            try {
                aiQuiz = JSON.parse(quizResult.candidates[0].content.parts[0].text);
                console.log('AI Quiz generated and parsed.');
            } catch (parseError) {
                console.error("Failed to parse quiz JSON from AI:", parseError);
                aiQuiz = []; // Fallback to empty quiz
            }
        } else {
            console.warn('Gemini API did not return a valid quiz.');
        }

        // Send the AI generated summary and quiz back to the frontend
        res.json({ summary: aiSummary, quiz: aiQuiz });

    } catch (error) {
        console.error('Backend processing error:', error);
        // Ensure temporary file is cleaned up even if an error occurs
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        res.status(500).json({ error: 'Failed to process document and generate AI content: ' + error.message });
    }
});

// Start the server

app.listen(port, () => {
    console.log(`🚀 StudyWise backend server listening on:${port}`);
    
    // Check if GEMINI_API_KEY is set
    if (!process.env.GEMINI_API_KEY) {
        console.log('⚠  WARNING: GEMINI_API_KEY not found in environment variables');
        console.log('   File uploads will work, but AI processing will fail');
    } else {
        console.log('✅Ai Connected');
    }
});
