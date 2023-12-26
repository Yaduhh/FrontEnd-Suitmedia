import React from "react";
import Home from "./pages/home/home";
import Post from "./component/post/post";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar/navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Post />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
