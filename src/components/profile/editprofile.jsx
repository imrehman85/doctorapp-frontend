import React, { useRef, useState, useEffect } from "react";
import profile from "../../Images/profile.png";
import logo from "../../Images/logo.png";
import { Button, Select } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import { LeftOutlined } from "@ant-design/icons";
const { Option } = Select;
let file="";
const ProfileDetails = () => {
  const router = useNavigate();
  const [prompt, setPrompt] = useState("");
  const path = useLocation();
  const dash = path.pathname;
  const token = useSelector((state) => state.token);
  const emailId = useSelector((state) => state.idSet);
  const dataUser = useSelector((state) => state.dataUser);
  const reset = useSelector((state) => state.reset);
  const [image, setImage] = useState("");
  const [show, setShow] = useState("");
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(null);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [userName, setUserName] = useState("");
  const [clinic, setClinic] = useState("");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
  };
  const handleChange = (setState, check) => (event) => {
    if (check === "tt") {
      setPrompt(event);
    } else {
      setState(event.target.value);
    }
  };
  useEffect(() => {
    if (dash != "/dashboard/Profile/Edit") {
      axios
        .get(
          `http://91.108.104.16:5000/api/User/get-user-by-email?email=${emailId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((data) => {
          console.log(data);
          setFName(data?.data?.firstName);
          setLName(data?.data?.lastName);
          setImage(data?.data?.imagePath);
          setUserName(data?.data?.userName);
          setPrompt(data?.data?.phoneNumber);
          setClinic(data?.data?.clinicName);
          setEmail(data?.data?.email);
          setRole(
            data?.data?.roles?.$values.length > 0
              ? data?.data?.roles?.$values[0]
              : null
          );
        })
        .catch((err) => {});
    } else {
      console.log(dataUser);
      setImage(dataUser?.imagePath);
      setFName(dataUser?.firstName);
      setLName(dataUser?.lastName);
      setPrompt(dataUser?.phone);
      setRole(dataUser?.roles?.$values.length > 0
        ? dataUser?.roles?.$values[0]
        : null);
    }
  }, [reset]);
  const imageHandler = async (e) => {
    file = e.target.files[0];
    const base641 = await convertToBase64(file);
    setImage(base641);
  };
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
  const AddHandler = (e) => {
    if(fName==="")
    {
      setErr("Please add First name")
      setShow(true)
    }
    else if(lName==="")
    {
      setErr("Please add Last name")
      setShow(true)
    }
    else if(userName==="")
    {
      setErr("Please add User name")
      setShow(true)
    }
    else if(email==="")
    {
      setErr("Please add Email")
      setShow(true)
    }
    else if(prompt==="")
    {
      setErr("Please add Phone Number")
      setShow(true)
    }
    else if(file==="")
    {
      setErr("Please add Profile image")
      setShow(true)
    }
    else if(role===null)
    {
      setErr("Please add Role")
      setShow(true)
    }
    else if(clinic==="")
    {
      setErr("Please add Clinic Name")
      setShow(true)
    }
    else{
    let formData = new FormData();
    formData.append("firstName", fName);
    formData.append("lastName", lName);
    formData.append("username", userName);
    formData.append("email", email);
    formData.append("phoneNumber", prompt);
    formData.append("userRole", role);
    formData.append("clinicName", clinic);
    if (file) {
      formData.append("profileImage", file);
    }

    if (dash === "/adminDashboard/DoctorEdit") {
      axios
        .put(
          `http://91.108.104.16:5000/api/User/user-edit?email=${emailId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((data) => {
          setErr("Clinic Updated")
          setShow("true")
        })
        .catch((err) => {});
    }
  }}
  console.log(role);
  return (
    <main>
      <div className="mt-14 flex flex-col mb-10 items-center justify-center">
        <div
          onClick={() => {
            if (dash === "/adminDashboard/AdminProfEdit")
              router("/adminDashboard/AdminProf");
            else if (dash === "/adminDashboard/DoctorEdit")
              router("/Admindashboard/clinics");
            else router("/dashboard/Profile");
          }}
          className="font-medium  w-7/12 mb-4 flex text-blue-600 flex-row items-center text-l cursor-pointer text-primary dark:primary p-2"
        >
          <LeftOutlined className="w-3 h-3 mr-2 text-blue-600 text-primary dark:text-white" />
          BACK
        </div>
        <div className="w-7/12 border border-gray-200 rounded-xl shadow-lg py-6 px-10">
          <div className="ml-4">
            <div className="text-xl leading-5 font-bold">
              <div className="mb-6">Edit Account Details</div>
            </div>
          </div>
          <div className="ml-4 w-full">
            <div className="flex items-center">
              <img
                src={image ? image : profile}
                alt="Clinic Avatar"
                className="w-24 h-24 rounded-full object-cover mb-6"
              />
              <div className="flex mx-4 flex-wrap">
                <label className="">
                  <div
                    type="primary"
                    className="font-medium rounded-lg focus:outline-none focus:ring-4 text-white bg-blue-500 hover:bg-blue-600 text-sm px-5 h-[33px] cursor-pointer mr-2 mb-2 flex items-center justify-center"
                  >
                    <span className="ml-2">Upload</span>
                  </div>
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={imageHandler}
                  />
                </label>
                <button
                  onClick={() => setImage("")}
                  type="button"
                  className="font-medium rounded-lg h-[33px] focus:outline-none focus:ring-4 focus:ring-primary-faded dark:bg-primary dark:hover:bg-primary-hover dark:focus:ring-primary-hover text-sm px-5 py-2.5 mr-2 mb-2 bg-transparent text-black ring-1 ring-gray-200 hover:bg-gray-100 flex items-center justify-center"
                >
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
          <form>
            <div className="flex flex-col md:grid gap-2 mb-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <div className="inline-block relative mb-0 w-full ">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"></div>
                  <input
                    type="text"
                    className="w-full border h-[35px] border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-50border-gray-200 pl-2.5 pr-2.5"
                    placeholder="First Name"
                    value={fName}
                    onChange={(e) => setFName(e.target.value)}
                  />
                  <div className="mt-2 text-sm text text-gray-500 dark:text-gray-300"></div>
                  <p className="text-sm mt-1 text-red-600"></p>
                </div>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <div className="inline-block relative mb-0 w-full ">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"></div>
                  <input
                    type="text"
                    className="w-full border h-[35px] border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-50border-gray-200 pl-2.5 pr-2.5"
                    placeholder="Last Name"
                    value={lName}
                    onChange={(e) => setLName(e.target.value)}
                  />
                  <div className="mt-2 text-sm text text-gray-500 dark:text-gray-300"></div>
                  <p className="text-sm mt-1 text-red-600"></p>
                </div>
              </div>
              {dash === "/adminDashboard/DoctorEdit" && (
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User Name
                  </label>
                  <div className="inline-block relative mb-0 w-full ">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"></div>
                    <input
                      type="text"
                      className="w-full border h-[35px] border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-50border-gray-200 pl-2.5 pr-2.5"
                      placeholder="User Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <div className="mt-2 text-sm text text-gray-500 dark:text-gray-300"></div>
                    <p className="text-sm mt-1 text-red-600"></p>
                  </div>
                </div>
              )}
              {dash === "/adminDashboard/DoctorEdit" && (
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Clinic
                  </label>
                  <div className="inline-block relative mb-0 w-full ">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"></div>
                    <input
                      type="text"
                      className="w-full border h-[35px] border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-50border-gray-200 pl-2.5 pr-2.5"
                      placeholder="Clinic"
                      value={clinic}
                      onChange={(e) => setClinic(e.target.value)}
                    />
                    <div className="mt-2 text-sm text text-gray-500 dark:text-gray-300"></div>
                    <p className="text-sm mt-1 text-red-600"></p>
                  </div>
                </div>
              )}
              <div>
                <div>
                  <label className="block text-black-500 text-sm mb-2">
                    Phone Number
                  </label>
                  <div className="inline-block relative mb-0 w-full ">
                    <PhoneInput
                      placeholder="Enter phone number"
                      defaultCountry="PK"
                      value={prompt}
                      onChange={handleChange(setPrompt, "tt")}
                      international
                      countryCallingCodeEditable={false}
                      className=".PhoneInputCountryIcon .PhoneInputCountrySelectArrow"
                    />
                  </div>
                </div>
              </div>
              {/* <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <div className="inline-block relative mb-0 w-full ">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"></div>
                  <input
                    type="text"
                    className="w-full border h-[35px] border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-50border-gray-200 pl-2.5 pr-2.5"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mt-2 text-sm text text-gray-500 dark:text-gray-300"></div>
              </div> */}
              <div>
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  <p>Role</p>
                </label>
                <Select
                  placeholder="Role"
                  value={role}
                  onChange={(value) => setRole(value)}
                  className="block w-full h-[3rem] p-2 mb-2 text-sm text-gray-900 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <Option value="Doctor">Doctor</Option>
                  <Option value="Dental laboratory">Dental laboratory</Option>
                </Select>
              </div>
            </div>
            <Button
              onClick={AddHandler}
              type="primary"
              className="font-medium rounded-lg focus:outline-none focus:ring-4 text-white bg-primary hover:bg-primary-hover focus:ring-primary-faded dark:bg-primary dark:hover:bg-primary-hover dark:focus:ring-primary-hover text-sm px-5 py-2.5 mr-2 mb-2 w-2/8 mt-6 flex items-center justify-center"
            >
              <span className="false">Save Changes</span>
            </Button>
          </form>
        </div>
      </div>
      <div
        className={`${
          show ? "" : "hidden"
        } w-[100%] h-[100%] z-[500] fixed top-0 left-0 bg-slate-500/50 flex justify-center items-center`}
      >
        <div className="relative rounded-xl w-[20rem] pb-6 flex items-center p-3 bg-white flex-col">
          <div
            className="absolute top-[8px] right-[40%]"
            onClick={() => setShow(false)}
          >
            <img src={logo} alt="" className="w-[5rem] h-[4rem]" />
          </div>
          <p className="text-center mt-[5rem] mb-[2rem]">{err}</p>
          <button
            onClick={() => setShow(false)}
            className="cursor-pointer rounded-xl pt-[0.5rem] pb-[0.5rem] pl-10 pr-10 text-white bg-[#DE2827] w-[60%]"
          >
            Ok
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProfileDetails;
