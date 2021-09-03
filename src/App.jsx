import React from "react";
//
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//
import FreeBoard from "./components/FreeBoard/FreeBoard";
import NotFound from "./components/NotFound";

const App = (props) => {
  return (
    <div className="init-view">
      <Router>
        <Routes>
          <Route path="/" element={<FreeBoard />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
