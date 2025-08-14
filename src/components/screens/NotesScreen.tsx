import React, { useState } from 'react';
import { FileText, ArrowRight, ArrowLeft, Upload, X, File } from 'lucide-react';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';

interface NotesScreenProps {
  notes: string;
  loading: boolean;
  error: string;
  onNotesChange: (notes: string) => void;
  onGenerateContent: () => void;
  onBack: () => void;
}

const NotesScreen: React.FC<NotesScreenProps> = ({
  notes,
  loading,
  error,
  onNotesChange,
  onGenerateContent,
  onBack
}) => {
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadedFileContent, setUploadedFileContent] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset previous states
    setUploadError('');
    setUploadedFileName('');
    setUploadedFileContent('');

    if (file.type === 'text/plain') {
      // Handle text files directly in browser
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setUploadedFileContent(content);
        setUploadedFileName(file.name);
        onNotesChange(content);
      };
      reader.onerror = () => {
        setUploadError('Failed to read text file. Please try again.');
      };
      reader.readAsText(file);
    } else if (
      file.type === 'application/pdf' ||
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      // Handle PDF and DOCX files via backend
      setUploadLoading(true);
      setUploadError('');

      const formData = new FormData();
      formData.append('document', file);

    
        
   
      // const API_URL = import.meta.env.VITE_APP_API_URL;
      const API_URL = "https://studywise-backend.up.railway.app";

      try {
        
        const response = await fetch(`${API_URL}/upload-and-analyze`, {
        
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        console.log(result);
        if (response.ok) {
          setUploadedFileName(file.name);
          setUploadedFileContent(result.summary);
          onNotesChange(result.summary);
          // You might want to handle the quiz data here as well
        } else {
          setUploadError(result.error || 'Failed to process file');
        }
      } catch (err) {
        setUploadError('Failed to upload file. Please check if the backend server is running.');
      } finally {
        setUploadLoading(false);
      }
    } else {
      setUploadError('Unsupported file type. Please upload a .txt, .pdf, or .docx file.');
    }

    // Clear the file input
    event.target.value = '';
  };

  const clearFileUpload = () => {
    setUploadedFileName('');
    setUploadedFileContent('');
    setUploadError('');
    onNotesChange('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 text-purple-600 hover:text-purple-700 font-semibold transition duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>
        
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-purple-700" />
          <h1 className="text-3xl font-bold text-purple-700">Add Your Study Materials</h1>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-2xl border border-blue-200">
        {/* File Upload Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Upload a document or paste your notes
          </h2>
          
          {/* File Upload Area */}
          <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors duration-200">
            <input
              type="file"
              id="file-upload"
              accept=".txt,.pdf,.docx"
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploadLoading}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-flex flex-col items-center gap-3"
            >
              <Upload className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-lg font-medium text-purple-700">
                  {uploadLoading ? 'Processing...' : 'Click to upload a file'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Supports .txt, .pdf, and .docx files
                </p>
              </div>
            </label>
          </div>

          {/* Uploaded File Display */}
          {uploadedFileName && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <File className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">{uploadedFileName}</span>
                  <span className="text-sm text-green-600">✓ Uploaded successfully</span>
                </div>
                <button
                  onClick={clearFileUpload}
                  className="p-1 hover:bg-green-200 rounded transition-colors duration-200"
                  title="Remove file"
                >
                  <X className="w-4 h-4 text-green-600" />
                </button>
              </div>
            </div>
          )}

          {/* Upload Error */}
          {uploadError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{uploadError}</p>
            </div>
          )}
        </div>

        {/* Notes Input Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Study Materials
          </h2>
          <p className="text-gray-600 mb-6">
            {uploadedFileName 
              ? 'Review and edit the extracted content below, or add additional notes.'
              : 'Add your notes, textbook excerpts, lecture transcripts, or any study material. Our AI will create a summary and generate quiz questions to help you learn better.'
            }
          </p>
        </div>

        <textarea
          className="w-full p-6 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg resize-y min-h-[300px] shadow-sm transition duration-200 ease-in-out"
          placeholder="Example: 'Photosynthesis is the process by which plants convert light energy into chemical energy...'"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          rows={15}
        />

        <div className="mt-8 text-center">
          <button
            onClick={onGenerateContent}
            disabled={loading || uploadLoading || !notes.trim()}
            className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 text-white font-bold text-xl rounded-lg shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading || uploadLoading ? 'Processing...' : 'Generate Summary & Quiz'}
            {!loading && !uploadLoading && <ArrowRight className="w-6 h-6" />}
          </button>
          
          {!notes.trim() && (
            <p className="mt-4 text-gray-500 text-sm">
              Please add some study material to continue
            </p>
          )}
        </div>

        {(loading || uploadLoading) && <LoadingSpinner />}
        {(error || uploadError) && <ErrorMessage error={error || uploadError} />}
      </div>
    </div>
  );
};

export default NotesScreen;