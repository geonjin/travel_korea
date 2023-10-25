import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import NoticePage from "./components/Notice/NoticePage";
import CommunityPage from "./components/Community/CommunityPage";
import ChatGptPage from "./components/ChatGptPage";
import Login from "./components/LoginAPI/Login";
import SingleNoticPage from "./components/Notice/SingleNoticPage";
import SingleCommuPage from "./components/Community/SingleCommuPage";
import NoticeWriting from "./components/Notice/NoticeWriting";
import CommuWriting from "./components/Community/CommuWriting";
import MyPage from "./components/MyPage";
import Oauth from "./components/LoginAPI/Oauth";
import SearchCommunityPost from "./components/Community/SearchCommunityPost"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="NoticePage/:page" element={<NoticePage />} />
      <Route path="SingleNoticPage/:postNum" element={<SingleNoticPage />} />
      <Route path="SingleCommuPage/:postNum" element={<SingleCommuPage />} />
      <Route path="CommunityPage/:page" element={<CommunityPage />} />
      <Route path="ChatGptPage" element={<ChatGptPage />} />
      <Route path="Login" element={<Login />} />
      <Route path="NoticeWriting" element={<NoticeWriting />} />
      <Route path="CommuWriting" element={<CommuWriting />} />
      <Route path="MyPage" element={<MyPage />} />
      <Route path="SearchCommunityPost" element={<SearchCommunityPost />} />
      <Route path="Oauth" element={<Oauth />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();