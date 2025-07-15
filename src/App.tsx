import { Route, BrowserRouter as Router, Routes } from "react-router";
import Navbar from "./components/layout/Navbar";

import { publicRoutes } from "./constants/route";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="bg-white">
        <Navbar />

        <div className="mt-[60px] pt-1 container mx-auto">
          <Routes>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
