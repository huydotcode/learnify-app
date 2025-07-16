import { Route, BrowserRouter as Router, Routes } from "react-router";
import Navbar from "./components/layout/Navbar";
import { Toaster } from "sonner";
import { privateRoutes, publicRoutes } from "./constants/route";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-white">
          <Navbar />
          <Toaster position="bottom-left" />

          <div className="mt-[60px] pt-1">
            <Routes>
              {publicRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>

            <ProtectedRoute>
              <Routes>
                {privateRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </ProtectedRoute>
          </div>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
