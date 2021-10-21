import React from 'react';
import Header from './components/Header';
//
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//
import FreeBoard from './components/FreeBoard/FreeBoard.jsx';
import PostDetail from './components/FreeBoard/PostDetail';
import PostCreate from './components/FreeBoard/PostCreate';
//
import ReviewBoard from './components/ReviewBoard/ReviewBoard.jsx';
import ReviewDetail from './components/ReviewBoard/ReviewDetail.jsx';
import ReviewCreate from './components/ReviewBoard/ReviewCreate.jsx';
import NotFound from './components/NotFound';
import Login from './components/Login';
//
import UserProvider from './context';
import QuestionBoard from './components/QuestionBoard/QuestionBoard';
import QuestionCreate from './components/QuestionBoard/QuestionCreate';
import NoticeBoard from './components/NoticeBoard/NoticeBoard';
import Join from './components/Join';
import RaffleList from './components/Raffle/RaffleList';
import RaffleDetail from './components/Raffle/RaffleDetail';
import Index from './components/Index/Index';

const App = (props) => {
  return (
    <div className="init-view">
      <Router>
        <UserProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
            <Route path="/raffles" element={<RaffleList />} />
            <Route path="/raffles/:raffleId" element={<RaffleDetail />} />
            <Route path="/community/posts" element={<FreeBoard />} />
            <Route path="/community/posts/:postId" element={<PostDetail />} />
            <Route path="/community/posts/create" element={<PostCreate />} />
            <Route path="/community/reviews" element={<ReviewBoard />} />
            <Route
              path="/community/reviews/:reviewId"
              element={<ReviewDetail />}
            />
            <Route
              path="/community/reviews/create"
              element={<ReviewCreate />}
            />
            <Route path="/community/questions" element={<QuestionBoard />} />
            <Route
              path="/community/questions/create"
              element={<QuestionCreate />}
            />
            <Route path="/community/notices" element={<NoticeBoard />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
};

export default App;
