import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/home/Home";
import Profile from "./Pages/profile/Profile";
import Login from "./Pages/accounts/login/Login";
import Register from "./Pages/accounts/register/Register";
// import { useViewportSize } from "@mantine/hooks";
// import { getAllPosts } from './Services/api';

function App() {
  const [user, setuser] = useState({});
  const [toggle, settoggle] = useState(false);
  // const { width } = useViewportSize();

  const getUser = async () => {
    let response = await fetch(
      "https://memebook-server.onrender.com/api/auth/getuser",
      {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    let data = await response.json();
    setuser(data);
    // console.log(user);
    settoggle(!toggle);
  };

  useEffect(() => {
    // if (width< 500) {
    //   alert("Please open in desktop mode")
    // }
    getUser();
    // console.log(user.username)
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // getUser();
    // console.log(user.username)
    // eslint-disable-next-line
  }, [toggle]);

  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<Home user={user} getUser={getUser} toggle={toggle} />}
          />
          <Route
            exact
            path="/profile/:username"
            element={<Profile username={user.username} currentuser={user} />}
          />
          <Route exact path="/accounts/login" element={<Login />} />
          <Route exact path="/accounts/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
