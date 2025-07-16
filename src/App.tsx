import { Route, BrowserRouter as Router, Routes } from "react-router";
import Navbar from "./components/layout/Navbar";
import { Toaster } from "sonner";
import { publicRoutes } from "./constants/route";
import "./styles/App.css";
import { AuthProvider } from "./context/AuthContext";

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
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
