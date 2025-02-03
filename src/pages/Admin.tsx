import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie, getCookie } from "cookies-next";
import { z } from "zod";

const credentialsSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

const AdminPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const authToken = getCookie("authToken");
    if (authToken === "validSession") {
      navigate("/upload");
    }
  }, [navigate]);

  const handleLogin = () => {
    const result = credentialsSchema.safeParse({ username, password });
    if (!result.success) {
      setError("Invalid input format");
      return;
    }
    
    if (username === "test@test.com" && password === "adminPass") {
      setCookie("authToken", "validSession", { maxAge: 3600 });
      navigate("/upload");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-300 p-4">
      <div className="w-full flex justify-between px-4 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-green-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-green-800">Admin Page</h1>
        <button onClick={() => navigate("/")} className="p-2 rounded-full hover:bg-green-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
      </div>
      <div className="text-center bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-green-800 mb-6">Admin Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <input
          type="email"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border border-green-400 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-green-400 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        
        <button
          onClick={handleLogin}
          className="w-full px-6 py-3 bg-green-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-green-700 transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminPage;