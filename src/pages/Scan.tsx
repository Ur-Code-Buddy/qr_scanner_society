import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";

const ScanPage = () => {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAndRequestPermission = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
          });
          stream.getTracks().forEach((track) => track.stop());
          setIsLoading(false);
        } else {
          setError("Camera access not supported");
        }
      } catch (err) {
        console.error("Camera permission error:", err);
        setError("Camera access required. Please grant permissions.");
      } finally {
        setIsLoading(false);
      }
    };

    checkAndRequestPermission();
  }, []);

  const handleScan = (data) => {
    if (data) {
      try {
        const trimmedData = data.trim();
        if (trimmedData) {
          console.log("Scanned:", trimmedData);
          setScanResult(trimmedData);
          setError(null);

          try {
            new URL(trimmedData);
            window.location.href = trimmedData;
          } catch {
            setError("Invalid URL scanned");
          }
        }
      } catch (processingError) {
        setError("Invalid QR code data");
      }
    }
  };

  const handleError = (err) => {
    if (err) {
      const errorMessage =
        err.name === "NotAllowedError"
          ? "Camera access denied"
          : err.name === "NotFoundError"
          ? "No camera found"
          : err.name === "OverconstrainedError"
          ? "Camera requirements not met"
          : "Scanning error";

      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-green-100 transition-colors"
          >
            {/* Back Arrow Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-green-800">Scan QR Code</h1>
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full hover:bg-green-100 transition-colors"
          >
            {/* Home Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </button>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          {/* Scanner Container */}
          <div className="aspect-square relative rounded-2xl overflow-hidden bg-white shadow-lg">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-green-50">
                {/* Camera Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-600 animate-pulse"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            ) : (
              <>
                <QrReader
                  onResult={(result, error) => {
                    if (result) {
                      handleScan(result.getText());
                    }
                    if (error) {
                      handleError(error);
                    }
                  }}
                  constraints={{
                    facingMode: "environment",
                  }}
                  className="w-full h-full"
                />
                <div className="absolute inset-0 border-2 border-green-500 border-dashed rounded-2xl pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 border-2 border-green-500 rounded-lg" />
                </div>
              </>
            )}
          </div>

          {/* Status Messages */}
          {error && (
            <div className="bg-red-100 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-red-700">{error}</span>
            </div>
          )}
          
          {scanResult && !error && (
            <div className="bg-green-100 border border-green-200 rounded-lg p-4">
              <span className="text-green-800">
                Successfully scanned QR code. Redirecting...
              </span>
            </div>
          )}

          {/* Instructions */}
          <div className="text-center text-sm text-green-600 mt-4">
            Position the QR code within the frame to scan
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanPage;