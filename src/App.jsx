import React, { useEffect } from "react";
import Header from "./components/Header";
//
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//
import FreeBoard from "./components/FreeBoard/FreeBoard.jsx";
import PostDetail from "./components/FreeBoard/PostDetail";
import NotFound from "./components/NotFound";

const App = (props) => {
  return (
    <div className="init-view">
      <Router>
        <Header />
        <Routes>
          <Route path="/community/post" element={<FreeBoard />} />
          <Route path="/community/post/:postId" element={<PostDetail />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
