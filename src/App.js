import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Auth from "./pages/auth.page";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
