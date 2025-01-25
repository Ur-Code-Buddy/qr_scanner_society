import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Welcome to the Home Page!
        </h1>
        <p className="text-gray-600 text-lg text-center mb-6">
          This is a basic homepage for your React application.
        </p>
        <nav className="flex justify-center">
          <ul className="space-y-2 sm:space-y-0 sm:flex sm:space-x-4">
            <li>
              <Link
                to="/scan"
                className="block bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
              >
                Go to Scan Page
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Home;
