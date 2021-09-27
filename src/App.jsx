import React from "react";
import Header from "./components/Header";
//
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//
import FreeBoard from "./components/FreeBoard/FreeBoard.jsx";
import PostDetail from "./components/FreeBoard/PostDetail";
import PostCreate from "./components/FreeBoard/PostCreate";
//
import ReviewBoard from "./components/ReviewBoard/ReviewBoard.jsx";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
//
import UserProvider from "./context";
import QuestionBoard from "./components/QuestionBoard/QuestionBoard";
import NoticeBoard from "./components/NoticeBoard/NoticeBoard";
import Join from "./components/Join";

const App = (props) => {
  return (
    <div className="init-view">
      <Router>
        <UserProvider>
          <Header />
          <Routes>
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
            <Route path="/community/post" element={<FreeBoard />} />
            <Route path="/community/post/:postId" element={<PostDetail />} />
            <Route path="/community/post/create" element={<PostCreate />} />
            <Route path="/community/review" element={<ReviewBoard />} />
            <Route path="/community/question" element={<QuestionBoard />} />
            <Route path="/community/notice" element={<NoticeBoard />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
};

export default App;
