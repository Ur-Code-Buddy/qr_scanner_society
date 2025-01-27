import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="text-center bg-white rounded-xl shadow-xl p-8 max-w-lg">
        {/* Header */}
        <h1 className="text-5xl font-bold text-gray-800 mb-6">Admin Page</h1>
        {/* Message */}
        <p className="text-lg text-gray-600 mb-8">
          This page is currently under construction. 🚧 <br />
          Please visit the <span className="text-blue-500 font-medium cursor-pointer hover:underline" onClick={() => navigate("/")}>Home Page</span>.
        </p>
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
