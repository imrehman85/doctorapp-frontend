import React from "react";
import logo from "../../Images/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const router = useNavigate(); 

  const handleAdminLogin = () => {
    dispatch({type:"Admin"});
    router("/login");
  };
  const handleDoctorLogin = () => {
    dispatch({type:"Doctor"});
    router("/login");
  };

  const handleDentistLogin = () => {
    dispatch({type:"Dentist"});
    router("/login"); 
  };

  return (
    <div className="h-[100vh] w-full flex-col p-4 bg-gray-50 flex items-center justify-center dark:bg-gray-800">
      <img src={logo} width="250" alt="Logo" />
      <div className="w-[60%] flex h-[25rem] mt-10 flex-col pb-8 items-center justify-center bg-gray-400 rounded-md shadow-lg p-2">
        <h1 className="text-3xl font-semibold mb-8">Login</h1>
        <div className="flex gap-2 items-center justify-center h-[12rem] w-full">
          <div
            onClick={handleAdminLogin}
            className="w-[8rem] bg-gray-100 cursor-pointer rounded-md hover:bg-gray-200 font-semibold h-[8rem] bg-white shadow-xl flex items-center justify-center p-2"
          >
            <h2>Admin</h2>
          </div>
          <div
            onClick={handleDoctorLogin}
            className="w-[8rem] bg-gray-100 cursor-pointer rounded-md hover:bg-gray-200 font-semibold h-[8rem] bg-white shadow-xl flex items-center justify-center p-2"
          >
            <h2>Doctor</h2>
          </div>
          <div
            onClick={handleDentistLogin}
            className="w-[8rem]  bg-gray-100 cursor-pointer rounded-md hover:bg-gray-200 font-semibold h-[8rem] bg-white shadow-xl flex items-center justify-center p-2"
          >
            <h2>Dentist</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
