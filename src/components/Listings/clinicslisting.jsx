import React from "react";
import noData from "../../Images/noData.gif";
import logo from "../../Images/logo.png";
import { useState, useEffect } from "react";
import { Dropdown, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { LeftOutlined, SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import profile from "../../Images/profile.png";
import PhoneInput from "react-phone-number-input";
let file;
const Tasks = () => {
  const token = useSelector((state) => state.token);
  const reset = useSelector((state) => state.reset);
  const user = useSelector((state) => state.option);
  const [addD, setAddD] = useState(false);
  const dispatch = useDispatch();
  const [prompt, setPrompt] = useState("");
  const [data, setData] = useState("");
  const [display, setDisplay] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [image, setImage] = useState("");
  const [show, setShow] = useState("");
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [deleteModal, setDeleteModal] = useState("");
  const [del, setDel] = useState("");
  const [role, setRole] = useState(null);
  const [clinicName, setClinicName] = useState("");
  const [password, setPassword] = useState("");
  const [items, setItems] = useState([
    {
      label: "View ",
      key: "1",
    },
    {
      label: "Edit ",
      key: "2",
    },
    {
      label: "Delete ",
      key: "3",
    },
  ]);

  useEffect(() => {
    axios
      .get(`http://91.108.104.16:5000/api/User/get-all-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        setData(data?.data?.$values);
      })
      .catch((err) => {});
  }, [reset]);
  const router = useNavigate();

  const clinicHeaders = [
    "Clinic Name",
    "Email",
    "Phone Number",
    "Active Account",
    "Status",
    "Actions",
  ];
  const handleClose = () => {
    setLName("");
    setFName("");
    setAddD(false);
    setEmail("");
    setPrompt("");
    setUserName("");
    setClinicName("");
    setDisplay("");
    setRole(null);
    setPassword("");
  };

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
  const handleChange = (setState, check) => (event) => {
    if (check === "tt") {
      setPrompt(event);
    } else {
      setState(event.target.value);
    }
  };
  const AddHandler = (e) => {
    let formData = new FormData();
    formData.append("firstName", fName);
    formData.append("lastName", lName);
    formData.append("username", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", prompt);
    formData.append("profileImage", file);
    formData.append("userRole", role);
    formData.append("clinicName", clinicName);
    axios
      .post("http://91.108.104.16:5000/api/User/register", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        handleClose();
        setErr("Doctor Added")
        setShow(true);
      })
      .catch((err) => {});
  };
  const onClick = (key, item) => {
    if (key.key === "1") {
      dispatch({ type: "SetId", num: item.email });
      router("/adminDashboard/viewDoc");
    }
    if (key.key === "2") {
      dispatch({ type: "SetId", num: item.email });
      router("/adminDashboard/DoctorEdit");
    }
    if (key.key === "3") {
      setDel(item.email);
      setDeleteModal(true);
    }
  };
  return (
    <main className="w-full flex items-center justify-center flex-col">
      <div className="w-full flex justify-center w-[95%]">
        <div className="w-full p-4 overflow-auto">
          <div className="w-full" style={{ opacity: 1 }}>
            <div className="z-0">
              <div className="mt-14">
                <div className="w-full flex items-center justify-between">
                  <div
                    onClick={() => router("/adminDashboard")}
                    className="font-medium flex flex-row items-center text-l cursor-pointer text-primary dark:primary self-start w-min "
                  >
                    <LeftOutlined className="w-3 h-3 mr-2 text-blue-600 text-primary dark:text-white" />
                    <span className="text-sm text-blue-600 font-semibold">
                      BACK
                    </span>
                  </div>
                 { user==="admin" && <button
                    onClick={() => setAddD(true)}
                    class="w-[10rem] whitespace-nowrap hover:bg-gray-600 text-white bg-gray-500 cursor-pointer rounded-md font-semibold h-[40px] px-2 py-2"
                  >
                    Add Clinic
                  </button>}
                </div>
                <div className="flex flex-row justify-between items-center mt-[30px] mb-[9.35px]">
                  <h1 className="sm:text-2xl text-xl font-bold text-gray-900 sm:font-semibold py-4">
                    Clinics
                  </h1>
                </div>
                <div>
                  <div className="flex justify-between flex-row flex-wrap">
                    <div className="md:w-[384px] w-auto pb-4">
                      <div className="relative">
                        <SearchOutlined className="w-4 h-4 text-gray-800 dark:text-white absolute top-3 left-3" />
                        <input
                          type="search"
                          id="search-dropdown"
                          className="block p-2.5 pl-10 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                          placeholder="Search"
                          required=""
                          value=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="flex justify-between pb-2 flex-wrap">
                  <div>
                    <div className="flex flex-row my-4 flex-wrap">
                      <span className="text-sm font-medium text-gray-900 mr-2.5">
                        Show Only: &nbsp;
                      </span>
                      <div className="flex">
                        <Radio.Group
                          defaultValue={radioValue}
                          onChange={handleRadioChange}
                        >
                          <Radio value="NEW_ASSIGNED" className="mr-2.5">
                            New Assigned
                          </Radio>
                          <Radio value="IN_PROGRESS" className="mr-2.5">
                            In Progress
                          </Radio>
                          <Radio value="PENDING_APPROVAL" className="mr-2.5">
                            Pending Approval
                          </Radio>
                          <Radio value="COMPLETED" className="mr-2.5">
                            Completed
                          </Radio>
                        </Radio.Group>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div>
                  <div className="overflow-x-auto">
                    {data.length !== 0 ? (
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-600">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-300 text-black">
                          <tr>
                            {clinicHeaders.map((columnHeader, index) => (
                              <th
                                key={index}
                                scope="col"
                                className="px-6 py-3 font-semibold tracking-wider"
                              >
                                {columnHeader}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((inq, index) => (
                            <tr
                              // onClick={() => router("/dashboard/taskdetail")}
                              key={index}
                              className="border-b dark:border-gray-700 bg-gray-50 hover:bg-gray-200 text-md cursor-pointer"
                            >
                              <td
                                scope="row"
                                className="px-6 py-5 font-medium text-gray-900  whitespace-nowrap "
                              >
                                {inq.clinicName}
                              </td>
                              <td
                                className="px-6  py-5"
                                style={{ whiteSpace: "nowrap" }}
                              >
                                {inq.email}
                              </td>
                              <td className="px-6  py-5">{inq.phoneNumber}</td>
                              <td className="px-6  py-5 capitalize">
                                {/* {inq.phoneNumber} */}
                              </td>
                              <td className="px-6  py-5 capitalize">
                                <span class="inline-flex items-center  min-w-max px-3.5 py-0.5 rounded-md  text-xs font-medium bg-indigo-100 text-indigo-800">
                                  {/* {inq.ImpressionStatus} */}
                                </span>
                              </td>

                              <td
                                className="px-3 py-5"
                                style={{ whiteSpace: "nowrap" }}
                              >
                                <Dropdown
                                  menu={{
                                    items,
                                    onClick: (key) => onClick(key, inq),
                                  }}
                                  trigger={["click"]}
                                  onClick={() => {
                                    // onClick2(
                                    //   item.beneficiaryuserId,
                                    //   item.pensionprogram.id,
                                    //   item.isActive,
                                    //   item.isDefault,
                                    //   item.signupStepsCompleted
                                    // );
                                  }}
                                >
                                  <div className="w-[2.8rem] flex gap-1 cursor-pointer bg-[#f5f6fb] justify-center items-center h-[1.2rem] rounded-[1rem]">
                                    <div className="h-[4px] w-[4px] rounded-full bg-gray-900"></div>
                                    <div className="h-[4px] w-[4px] rounded-full bg-gray-900"></div>
                                    <div className="h-[4px] w-[4px] rounded-full bg-gray-900"></div>
                                  </div>
                                </Dropdown>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div class="mb-10 ">
                        <div class="flex items-center justify-center w-full h-72 text-lg text-gray-500 dark:text-gray-400 flex-col shadow">
                          <img src={noData} class="mr-3" />
                          No Data
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          addD ? "" : "hidden"
        } fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center bg-black bg-opacity-50`}
      >
        <div class="relative rounded-xl w-[40rem] pb-6 pt-4 px-6 bg-white flex flex-col items-center">
          <h2 class="text-xl font-semibold mb-6">Add Doctor</h2>
          <div className="flex items-center justify-center mb-4">
            <label htmlFor="special-input" className="cursor-pointer relative">
              <div className="relative w-[6rem] h-[6rem] overflow-hidden border-2 border-[#686262]  rounded-full mb-2 ">
                <img
                  className="object-cover w-[6rem] h-[6rem]"
                  src={image !== "" ? image : profile}
                  alt=""
                />
              </div>

              {/* <div
                className={`bg-primary rounded-full absolute bottom-4 right-2`}
              >
                <img src={check} className="lg:w-7 w-5" alt="" />
              </div> */}
              <input
                type="file"
                className="hidden"
                id="special-input"
                accept="image/png, image/gif, image/jpeg"
                onChange={imageHandler}
              />
            </label>
          </div>
          <div className="w-full grid sm:grid-cols-2 gap-4 grid-cols-1 ">
            <div>
              <div class="w-full mb-4">
                <label class="block mb-1 font-medium">First name</label>
                <input
                  type="text"
                  value={fName}
                  onChange={handleChange(setFName)}
                  class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="First name"
                />
              </div>
              <div class="w-full mb-4">
                <label class="block mb-1 font-medium">Last name</label>
                <input
                  type="text"
                  value={lName}
                  onChange={handleChange(setLName)}
                  class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Last name"
                />
              </div>
              <div class="w-full mb-4">
                <label class="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleChange(setEmail)}
                  class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter email"
                />
              </div>
              <div class="w-full mb-4">
                <label class="block mb-1 font-medium">Phone</label>
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
            <div>
              <div class="w-full mb-4">
                <label class="block mb-1 font-medium">User name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={handleChange(setUserName)}
                  class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="User Name"
                />
              </div>
              <div class="w-full mb-4">
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  <p>Role</p>
                </label>
                <select
                  id="role"
                  onChange={handleChange(setRole)}
                  name="role"
                  value={role}
                  className="block w-full p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled=""
                  placeholder="Select Role"
                >
                  <option selected hidden className="text-gray-400">
                    Select Role
                  </option>
                  <option id="TREATMENT_PLANNER" value="Treatment Planner">
                    Treatment Planner
                  </option>
                  <option id="PRODUCTION_MANAGER" value="Production Manager">
                    Production Manager
                  </option>
                  <option
                    id="DELIVERY_COORDINAOTR"
                    value="Delivery Coordinator"
                  >
                    Delivery Coordinator
                  </option>
                  <option id="LAB_ADMIN" value="Lab Admin">
                    Lab Admin
                  </option>
                </select>
              </div>
              <div class="w-full mb-4">
                <label class="block mb-1 font-medium">Clinic Name</label>
                <input
                  type="text"
                  value={clinicName}
                  onChange={handleChange(setClinicName)}
                  class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Clinic Name"
                />
              </div>
              <div class="w-full mb-4">
                <label class="block mb-1 font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={handleChange(setPassword)}
                  class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter password"
                />
              </div>
              {/* <div class="w-full mb-4">
                <label class="block mb-1 font-medium">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleChange(setConfirmPassword)}
                  class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Confirm password"
                />
              </div> */}
            </div>
          </div>
          <div class="flex justify-between w-full mt-6">
            <button
              onClick={handleClose}
              class="w-[4rem] whitespace-nowrap hover:bg-gray-600 text-white bg-gray-500 cursor-pointer rounded"
            >
              Close
            </button>
            <Button
              onClick={AddHandler}
              type="primary"
              class="rounded-lg focus:outline-none focus:ring-4 text-white bg-primary hover:bg-primary-hover focus:ring-primary-faded dark:bg-primary dark:hover:bg-primary-hover dark:focus:ring-primary-hover px-3 py-1.5 mr-1 h-[41px] text-sm font-medium mobile:text-xs mobile:h-[35px] mobile:w-[170px] flex items-center justify-center"
            >
              Done
            </Button>
          </div>
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
          <p className="text-center mt-[5rem] mb-[2rem]">{err}</p>
          <button
            onClick={() => setShow(false)}
            className="cursor-pointer rounded-xl pt-[0.5rem] pb-[0.5rem] pl-10 pr-10 text-white bg-[#DE2827] w-[60%]"
          >
            Ok
          </button>
        </div>
      </div>
      <div
        className={`${
          deleteModal ? "" : "hidden"
        } w-[100%] h-[100%] fixed top-0 left-0 bg-slate-500/50 flex justify-center items-center z-[200]`}
      >
        <div className="relative rounded-xl w-[20rem] pb-6 flex items-center p-3 bg-white flex-col">
          <div
            className="absolute top-[8px] right-[40%]"
            onClick={() => setDeleteModal(false)}
          >
            <img src={logo} alt="" className="w-[5rem] h-[4rem]" />
          </div>
          <p className="text-center mt-[5rem] mb-5">
            Are you sure you want to delete this Doctor?
          </p>
          <div className="flex">
            <button
              onClick={() => setDeleteModal(false)}
              className="cursor-pointer rounded-xl pt-[0.5rem] pb-[0.5rem] pl-10 pr-10  bg-[#F2F4F8] w-[60%]"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                let Url;
                Url = `http://91.108.104.16:5000/api/User/user-delete?email=${del}`;
                axios
                  .delete(Url, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                  .then((data) => {
                    setDeleteModal(false);
                    dispatch({ type: "Reset" });
                  })
                  .catch((err) => {
                    console.log(err);
                    setDeleteModal(false);
                    setTimeout(() => {
                      setShow(true);
                      // setErr(err.response.data.message);
                    }, 1000);
                  });
              }}
              className="cursor-pointer ml-4 rounded-xl pt-[0.5rem] pb-[0.5rem] pl-10 pr-10 text-white bg-[#DE2827] w-[60%]"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Tasks;
