import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <>
      <h1>Dashboard</h1>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default Home;
