import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const isDesktop = window.innerWidth > 768;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-green-50 to-blue-50 px-4">
      {/* Logo Section */}
      {/* Uncomment and adjust logo section if necessary */}
      {/* <div className="mt-12 flex justify-center w-full">
        <img
          src="../public/images/logo.png"
          alt="Auro Vanam Banner"
          className="rounded-lg shadow-lg w-1/4 md:w-1/4" // Adjust the size here
        />
      </div> */}
  
      {/* Header Section */}
      <div className="text-center mb-12 mt-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-green-600">Auro Vanam</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Auro Vanam is committed to preserving and restoring nature. Discover
          the stories of each tree by scanning its QR code and learn about its
          role in our ecosystem.
        </p>
      </div>
  
      {/* Button Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-lg">
        <button
          onClick={() => navigate("/admin")}
          className="w-full px-6 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Go to Admin
        </button>
        <button
          onClick={() => navigate("/scan")}
          className="w-full px-6 py-4 bg-green-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-green-700 transition duration-300"
        >
          Scan QR Code
        </button>
      </div>
  
      {/* Desktop Message */}
      {isDesktop && (
        <div className="mt-12 p-4 bg-yellow-200 rounded-lg shadow-md text-center">
          <p className="text-lg font-medium text-gray-700">
            This is a small-screen app. Please use it on a smaller screen for the best experience.
          </p>
        </div>
      )}
  
      {/* Decorative Section */}
      <div className="mt-12">
        <p className="text-sm text-gray-500 mt-4 text-center">
          Auro Vanam is dedicated to creating a greener future. 🌱
        </p>
      </div>
    </div>
  );
};

export default HomePage;
