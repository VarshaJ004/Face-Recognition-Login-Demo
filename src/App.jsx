import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import RegisterFace from "./pages/RegisterFace";

import Dashboard from "./pages/Dashboard";
import FaceLogin from "./pages/Loginface";
import Loginface from "./pages/Loginface";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterFace />} />
        <Route path="/login" element={<Loginface />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;