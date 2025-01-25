import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';

const ScanPage: React.FC = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAndRequestPermission = async () => {
      try {
        // Explicitly request camera permission
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
              facingMode: "environment" 
            } 
          });
          stream.getTracks().forEach(track => track.stop());
        } else {
          setError('Camera access not supported');
        }
      } catch (err) {
        console.error("Camera permission error:", err);
        setError('Camera access required. Please grant permissions.');
      }
    };

    checkAndRequestPermission();
  }, []);

  const handleScan = (data: string | null) => {
    if (data) {
      try {
        const trimmedData = data.trim();
        if (trimmedData) {
          console.log("Scanned:", trimmedData);
          setScanResult(trimmedData);
          setError(null);
          
          // Validate URL before redirecting
          try {
            new URL(trimmedData);
            window.location.href = trimmedData;
          } catch {
            setError('Invalid URL scanned');
          }
        }
      } catch (processingError) {
        setError('Invalid QR code data');
      }
    }
  };

  const handleError = (err: any) => {
    if (err) {
      const errorMessage = 
        err.name === 'NotAllowedError' ? 'Camera access denied.' :
        err.name === 'NotFoundError' ? 'No camera found.' :
        err.name === 'OverconstrainedError' ? 'Camera requirements not met.' :
        'Scanning error';
      
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="relative h-80 bg-gray-100">
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
              width: { ideal: 640 },
              height: { ideal: 480 }
            }}
            style={{ width: "100%", height: "100%" }}
          />
          
          <div className="absolute inset-0 border-4 border-dashed border-blue-300 pointer-events-none"></div>
        </div>
        
        <div className="p-4 text-center">
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-2">
              {error}
            </div>
          )}
          
          {scanResult && (
            <div className="bg-green-100 text-green-700 p-2 rounded mb-2">
              Scanned: {scanResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanPage;