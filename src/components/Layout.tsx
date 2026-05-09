import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getProgress = () => {
    switch (location.pathname) {
      case "/step-1":
        return 33;
      case "/step-2":
        return 66;
      case "/step-3":
        return 100;
      default:
        return 0;
    }
  };

  const handleBack = () => {
    if (location.pathname !== "/step-1") {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
        <div className="w-full px-8 py-4 flex items-center">
          {location.pathname !== "/step-3" && (
            <>
              <button
                onClick={handleBack}
                className={`p-2 rounded-full hover:bg-gray-100 ${location.pathname === "/step-1" ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={location.pathname === "/step-1"}
              >
                <ArrowLeft size={24} />
              </button>
              <div className="flex-1 ml-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#6DBFB8] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgress()}%` }}
                  ></div>
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center pt-20 pb-4">
        <div className="w-full max-w-md mx-4">
          <div className="bg-white rounded-3xl shadow-sm p-6">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
