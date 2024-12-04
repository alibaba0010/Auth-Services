import React, { useState } from "react";
import Login from "../app/auth/Login";
import Register from "../app/auth/Register";
import Verification from "../app/auth/Verifications";

const Auth = () => {
  const [activeState, setActiveState] = useState("Login");

  return (
    <div
      className="w-full fixed top-0 left-0 h-screen z-50 flex items-center justify-center bg-[#00000027]"
      id="screen"
    >
      <div className="w-[500px] bg-slate-900 rounded shadow-sm p-3">
        {activeState === "Login" && <Login setActiveState={setActiveState} />}
        {activeState === "Register" && (
          <Register setActiveState={setActiveState} />
        )}
        {activeState === "Verification" && (
          <Verification setActiveState={setActiveState} />
        )}
      </div>
    </div>
  );
};

export default Auth;
