import React, { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";

const Home = () => {
  const { isAuthorized } = useContext(Context);
  
  // Add loading state
  if (isAuthorized === undefined) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }
  
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }
  
  return (
    <>
      <section className="homePage page">
        <HeroSection />
        <HowItWorks />
        <PopularCategories />
      </section>
    </>
  );
};

export default Home;
