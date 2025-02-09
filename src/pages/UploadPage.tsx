import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";

const UploadPage = () => {
  const navigate = useNavigate();
  const [option, setOption] = useState<"googleDrive" | "uploadPDF">("googleDrive");
  const [inputValue, setInputValue] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [qrCode, setQrCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const authToken = getCookie("authToken");
    if (authToken !== "validSession") {
      navigate("/");
    }
  }, [navigate]);

  const handleGoogleDriveLink = async (link: string) => {
    if (!link) {
      setError("Please enter a valid Google Drive link");
      return false;
    }

    try {
      console.log(JSON.stringify({ "link": link }),
      {
        headers: { "Content-Type": "application/json" }
      });
      const response = await axios.post(
        "https://qr_scanner_backend.05baivab.workers.dev/convert/",
        JSON.stringify({ "link": link }),
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      setQrCode(response.data);
      return true;
    } catch (error) {
      console.error("QR generation error:", error);
      setError("Failed to generate QR code");
      return false;
    }
  };

  const handleFileUpload = async (file: File | null) => {
    if (!file) {
      setError("Please select a file to upload");
      return false;
    }

    if (file.type !== 'application/pdf') {
      setError("Please upload a PDF file only");
      return false;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "https://qr_scanner_backend.05baivab.workers.dev/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      return response;
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload file");
      return false;
    }
  };

  const handleSubmit = async () => {
    setError("");
    setQrCode("");
    setUploading(true);
    
    try {
      let success;
      if (option === "googleDrive") {
        success = await handleGoogleDriveLink(inputValue);
      } else {
        success = await handleFileUpload(file);
      }
      
      if (success) {
        if (option === "googleDrive") {
          // QR code is already set in handleGoogleDriveLink
        } else {
          alert("File uploaded successfully!");
        }
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setUploading(false);
    }
  };

  const handleSignOut = () => {
    deleteCookie("authToken");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">Upload Center</h1>
          <button
            onClick={handleSignOut}
            className="text-red-600 hover:text-red-800"
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto mt-10 p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Upload Options */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Choose Upload Method</h2>
            <div className="flex gap-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="googleDrive"
                  checked={option === "googleDrive"}
                  onChange={(e) => setOption(e.target.value as "googleDrive" | "uploadPDF")}
                  className="form-radio text-blue-600"
                />
                <span className="text-gray-700">Google Drive Link</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="uploadPDF"
                  checked={option === "uploadPDF"}
                  onChange={(e) => setOption(e.target.value as "googleDrive" | "uploadPDF")}
                  className="form-radio text-blue-600"
                />
                <span className="text-gray-700">Upload PDF</span>
              </label>
            </div>
          </div>

          {/* Input Fields */}
          {option === "googleDrive" ? (
            <div className="mb-6">
              <input
                type="text"
                placeholder="Enter Google Drive Image Link"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          ) : (
            <div className="mb-6">
              <div className="flex items-center justify-center w-full">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="mt-2 text-gray-600">
                    {file ? file.name : "Select a PDF file"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}

          {/* QR Code Display */}
          {qrCode && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-center" dangerouslySetInnerHTML={{ __html: qrCode }} />
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition duration-200"
          >
            {uploading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Upload'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;