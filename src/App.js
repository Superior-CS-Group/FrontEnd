import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/auth.page";
import Estimates from "./pages/home.pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/*" element={<Estimates />} />
        <Route path="/" element={<Navigate replace={true} to="/auth" />} />
      </Routes>
    </div>
  );
}

export default App;
