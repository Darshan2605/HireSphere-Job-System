import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
  const [loading, setLoading] = useState(true);

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
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [setIsAuthorized, setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={isAuthorized ? <Home /> : <Navigate to="/login" />} />
          <Route path="/job/getall" element={isAuthorized ? <Jobs /> : <Navigate to="/login" />} />
          <Route path="/recommend-jobs" element={isAuthorized ? <RecommendJobs /> : <Navigate to="/login" />} />
          <Route path="/job/:id" element={isAuthorized ? <JobDetails /> : <Navigate to="/login" />} />
          <Route path="/application/:id" element={isAuthorized ? <Application /> : <Navigate to="/login" />} />
          <Route path="/applications/me" element={isAuthorized ? <MyApplications /> : <Navigate to="/login" />} />
          <Route path="/job/post" element={isAuthorized && user.role === "Employer" ? <PostJob /> : <Navigate to="/login" />} />
          <Route path="/job/me" element={isAuthorized && user.role === "Employer" ? <MyJobs /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
