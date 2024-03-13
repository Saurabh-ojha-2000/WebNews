import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import Signup from './components/Signup';
import Login from './components/Login';

const App = () => {
  const pageSize = 9;
  const apikey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)


  return (
    <>

      <Router>
          <Navbar />
        <LoadingBar
          height='3px'
          color='#f11946'
          progress={progress}
        />
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} key="General" country="in" category="General" />} />
            <Route exact path="/Business" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} key="Business" country="in" category="Business" />} />
            <Route exact path="/Entertainment" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} key="Entertainment" country="in" category="Entertainment" />} />
            <Route exact path="/General" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} key="General" country="in" category="General" />} />
            <Route exact path="/Health" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} key="Health" country="in" category="Health" />} />
            <Route exact path="/Science" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} key="Science" country="in" category="Science" />} />
            <Route exact path="/Sports" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} key="Sports" country="in" category="Sports" />} />
            <Route exact path="/Technology" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} key="Technology" country="in" category="Technology" />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Signup" element={<Signup />} />
          </Routes>
      </Router>
    </>
  )
}

export default App;