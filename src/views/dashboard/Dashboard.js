import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}auth/login`, { headers })
      .then((responce) => {
        localStorage.setItem("username", responce.data.user_name);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response.status == 401) {
          navigate("/login");
        }
      });
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <h1>Welcome</h1>
    </div>
  );
};

export default Dashboard;
