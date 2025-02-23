import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
  <div className="container">
    <h3>How HireSphere Works</h3>
    <div className="banner">
      <div className="card">
        <FaUserPlus />
        <p>Create an Account</p>
        <p>
          Sign up as a job seeker or employer and get access to AI-driven hiring solutions.
        </p>
      </div>
      <div className="card">
        <MdFindInPage />
        <p>Find Jobs or Post Openings</p>
        <p>
          Job seekers can explore AI-recommended jobs, while employers can list job openings effortlessly.
        </p>
      </div>
      <div className="card">
        <IoMdSend />
        <p>AI Mock Interviews & Applications</p>
        <p>
          Prepare for interviews with AI-powered mock sessions or hire the best candidates efficiently.
        </p>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default HowItWorks;
