import React from "react";
import img from "../../Images/loginP.png";
import logo from "../../Images/logo.png";
import { Button } from "antd";
import { useState } from "react";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState("");
  const [err, setErr] = useState("");

  const handleForgot = () => {
    axios
      .post(`http://91.108.104.16:5000/api/User/reset-password-request`, {
        Email: email,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setErr(err?.response?.data?.message);
        setShow(true);
      });
  };

  return (
    <div className="h-[100vh] w-full bg-gray-50 flex items-center justify-center dark:bg-gray-800">
      <div className="rounded-xl flex flex-row h-[75%] w-[1024px] md:w-3/4 sm:w-full sm:mx-4 bg-white">
        <img
          src={img}
          alt=""
          className="rounded-l-xl lg:block md:hidden sm:hidden hidden h-full"
        />
        <div className="p-12 rounded-r-xl w-full flex items-start flex-col justify-center dark:bg-gray-900">
          <img src={logo} width="150" />
          <form class="space-y-4 md:space-y-6 mt-6 w-full">
            <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Log in to platform
            </h1>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Button
                onClick={handleForgot}
                type="primary"
                className="rounded-lg h-[40px] text-white bg-[#1890ff] px-5 py-2.5 mr-2 mb-2 w-full text-sm font-sans font-medium flex items-center justify-center"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div
        className={`${
          show ? "" : "hidden"
        } w-[100%] h-[100%] fixed top-0 left-0 bg-slate-500/50 flex justify-center items-center`}
      >
        <div className="relative rounded-xl w-[20rem] pb-6 flex items-center p-3 bg-white flex-col">
          <div
            className="absolute top-[8px] right-[40%]"
            onClick={() => setShow(false)}
          >
            <img src={logo} alt="" className="w-[5rem] h-[4rem]" />
          </div>
          <p className="text-center mt-[3rem] mb-5">{err}</p>
          <button
            onClick={() => setShow(false)}
            className="cursor-pointer rounded-xl pt-[0.5rem] pb-[0.5rem] pl-10 pr-10 text-white bg-[#DE2827] w-[60%]"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
