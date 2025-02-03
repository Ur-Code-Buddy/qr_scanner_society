import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";

const UploadPage = () => {
  const navigate = useNavigate();
  const [option, setOption] = useState("googleDrive");
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const authToken = getCookie("authToken");
    if (authToken !== "validSession") {
      navigate("/");
    }
  }, [navigate]);

  const handleUpload = async () => {
    setUploading(true);
    try {
      let fileUrl = inputValue;
      if (option === "uploadPDF" && file) {
        const formData = new FormData();
        formData.append("file", file);
        
        const response = await axios.post("http://localhost:5000/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        
        fileUrl = response.data.fileUrl;
      }
      
      await axios.post("http://localhost:5000/store", { fileUrl });
      alert("Upload successful!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    }
    setUploading(false);
  };

  const handleSignOut = () => {
    deleteCookie("authToken");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-300 p-4">
      <div className="w-full flex justify-between px-4 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-green-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-green-800">Upload Page</h1>
        <button onClick={() => navigate("/")} className="p-2 rounded-full hover:bg-green-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
      </div>
      
      <div className="text-center bg-white rounded-xl shadow-xl p-8 max-w-md w-full mt-6">
        <h1 className="text-4xl font-bold text-green-800 mb-6">Upload Page</h1>
        
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-green-800">Do you have a Google Drive image link?</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="googleDrive"
                checked={option === "googleDrive"}
                onChange={() => setOption("googleDrive")}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="uploadPDF"
                checked={option === "uploadPDF"}
                onChange={() => setOption("uploadPDF")}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        {option === "googleDrive" ? (
          <input
            type="text"
            placeholder="Enter Google Drive Image Link"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-3 border border-green-400 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        ) : (
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFile(e.target.files[0]);
              }
            }}
            
            className="w-full p-3 border border-green-400 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        )}

        <button
          onClick={handleUpload}
          className="w-full px-6 py-3 bg-green-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        <button
          onClick={handleSignOut}
          className="w-full mt-4 px-6 py-3 bg-red-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-red-700 transition duration-300"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UploadPage;