import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800">
      <header className="bg-gray-800 text-white py-4 text-center">
        <div className="mx-auto">
          <h1 className="text-2xl font-bold">Welcome to KMLVision</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto py-6">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} KMLVision. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
