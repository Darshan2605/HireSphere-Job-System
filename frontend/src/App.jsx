import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostJob from "./components/Job/PostJob";
import NotFound from "./components/NotFound/NotFound";
import MyJobs from "./components/Job/MyJobs";
import RecommendJobs from './components/Job/RecommendJobs';

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_URL}api/v1/user/getuser`,
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        console.error('Authentication error:', error);
        setIsAuthorized(false);
        // Clear any invalid tokens
        await axios.post(
          `${import.meta.env.VITE_BACKEND_API_URL}api/v1/user/logout`,
          {},
          { withCredentials: true }
        );
      }
    };
    
    // Only fetch user if not already authorized
    if (!isAuthorized) {
      fetchUser();
    }
  }, []);


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={!isAuthorized ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthorized ? <Register /> : <Navigate to="/" />} />
          <Route path="/" element={isAuthorized ? <Home /> : <Navigate to="/login" />} />

          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/recommend-jobs" element={<RecommendJobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
       
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
