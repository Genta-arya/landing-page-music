import React from "react";
import Login from "./components/Login";
import useCheckLogin from "../../services/Hooks/useCheckLogin";

const AuthPage = () => {
    const {  loading} = useCheckLogin();
    
   
  return (
    <div>
      <Login />
    </div>
  );
};

export default AuthPage;
