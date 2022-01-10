import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "../contexts/UserContext";
import Login from "./Login";
import SignUp from "./SignUp";
import Today from "./Today";
import Habits from "./Habits";
import Historic from "./Historic";

import "../styles/reset.css";
import "../styles/fonts.css";

export default function App() {
  const [userImage, setUserImage] = useState("");
  const [token, setToken] = useState("");
  const [todayProgress, setTodayProgress] = useState(0.0);

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          token,
          setToken,
          userImage,
          setUserImage,
          todayProgress,
          setTodayProgress,
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/hoje" element={<Today />} />
          <Route path="/habitos" element={<Habits />} />
          <Route path="/historico" element={<Historic />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
