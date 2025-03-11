import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-[400px] bg-white/10 backdrop-blur-lg rounded-xl py-6 px-10 shadow-lg border border-white/20 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">404</h2>
        <p className="text-white mb-4">Page Not Found</p>
        <Link
          to="/"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
