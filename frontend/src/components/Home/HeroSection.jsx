import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h1>HireSphere: Smart AI-Supported Job System</h1>
            
            <p>
            Find your dream job faster with HireSphere, the next-generation AI-powered job platform. From personalized job recommendations to AI-driven mock interviews, we help job seekers stand out and employers find top talent effortlessly.
            </p>
          </div>
          <div className="image">
            <img src="/HireSp.png" alt="hero" />
          </div>
        </div>
        
      </div>
    </>
  );
};

export default HeroSection;
