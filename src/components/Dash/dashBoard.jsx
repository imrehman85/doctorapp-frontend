import React from "react";
import search from "../../Images/search.svg";
import noData from "../../Images/noData.gif";
import logo from "../../Images/logo.png";
import { Popover } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { RightOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import image from "../../Images/teethwebImg.png";
import { UploadOutlined } from "@ant-design/icons";
const DashBoard = () => {
  const dispatch = useDispatch();
  const path = useLocation();
  const dash = path.pathname;
  const [inquiries, setInquiries] = useState([]);
  const [addCase, setAddCase] = useState(false);
  const token = useSelector((state) => state.token);
  const reset = useSelector((state) => state.reset);
  const dataUser = useSelector((state) => state.dataUser);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [age, setAge] = useState("");
  const [show, setShow] = useState("");
  const [err, setErr] = useState("");
  const [gender, setGender] = useState(null);
  const [notes, setNotes] = useState(null);
  const user = useSelector((state) => state.option);
  let files = Array.from({ length: 6 }, () => null);
  const [impressionType, setImpressionType] = useState("");
  const [tasks, setTasks] = useState([]);
  const router = useNavigate();
  console.log("data", dataUser);
  const inqColumnHeaders = [
    "Case Id",
    "Patient Name/ID",
    "Patient Gender",
    "Patient Age",
    "Impression Type",
    "Status",
    "Action",
  ];
  const tskColumnHeaders = [
    "Case Id",
    "Patient Name/ID",
    "Patient Gender",
    "Patient Age",
    "Impression Type",
    "Status",
  ];
  const handleFileChange = (event, index) => {
    const selectedFile = event.target.files[0];
    files[index] = selectedFile;
  };
  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };
  const submitHandler = async () => {
    const formData = new FormData();
    formData.append("firstName", fName);
    formData.append("lastName", lName);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("impressionType", impressionType);
    formData.append("isRequestPickup", true);
    formData.append("status", "New Case");
    await files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("notes", notes);

    axios
      .post("http://91.108.104.16:5000/api/Case/create-case", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setAddCase(false);
        setErr("New Case Added");
        setShow(true);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    axios
      .get(`http://91.108.104.16:5000/api/Case/get-all-cases`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        setInquiries(data?.data?.$values);
        setTasks(data?.data?.$values)
      })
      .catch((err) => {});
  }, [reset]);
  return (
    <main>
      <div className="flex items-center justify-center flex-col">
        <div class="flex flex-row justify-center w-full">
          <div class="flex bg-slate-100 justify-center flex-col w-full">
            <div className="flex w-full pl-2 pr-2 mt-4 w-[97%] items-center justify-end">
              {user === "doctor" && (
                <div className="flex gap-4 w-[25%]">
                  <button
                    onClick={() => setAddCase(true)}
                    class="w-full bg-gray-500 rounded-md hover:bg-gray-600 text-white cursor-pointer font-semibold h-[40px] px-2 py-2"
                  >
                    New Case
                  </button>
                  <button class="w-full bg-gray-500 rounded-md hover:bg-gray-600 text-white cursor-pointer font-semibold h-[40px] px-2 py-2">
                    Refinement
                  </button>
                </div>
              )}
            </div>
            <div class="sm:block hidden">
              <div class="bg-gray-50 py-10 px-10 rounded-lg shadow-sm mb-8 mt-4 flex flex-col items-center justify-between sm:flex-row">
                <div class="w-full">
                  <div style={{ opacity: "1", transform: "none" }}>
                    <div class="flex flex-col">
                      <h2 class="text-4xl font-normal text-blue-600 leading-[54px]">
                        Good Morning{" "}
                        <b class="font-extrabold">
                          {dataUser?.firstName} {dataUser?.lastName}
                        </b>
                      </h2>
                      <div class="flex flex-row text-gray-800 mt-2 font-semibold items-center">
                        <div class="flex flex-row text-lg font-medium text-gray-900 items-start">
                          <img
                            src="//cdn.weatherapi.com/weather/64x64/day/302.png"
                            width="25"
                          />
                          <span class="ml-1 text-base font-medium text-gray-900">
                            11°C A perfect day to spread smiles!
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex items-end gap-4 flex-col w-full">
                  <div class="w-full">
                    <div class="relative z-10 w-full">
                      <div class="relative flex flex-col items-center">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <SearchOutlined className="w-5 h-5 ml-2 text-gray-500 dark:text-gray-400" />
                        </div>
                        <input
                          autocomplete="off"
                          type="search"
                          id="default-search"
                          class="block w-full h-[52px] p-4 py-6 pl-12 text-base text-gray-900 placeholder:text-gray-400 border border-gray-300 border-opacity-50 rounded-lg focus:ring-gray-50 focus:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-sm"
                          placeholder="Quick search for Patient"
                          required=""
                          value=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="sm:hidden block">
              <div>
                <div class="w-full rounded-md mt-4 px-4 py-10 bg-gray-100 flex-col justify-start items-start gap-4 inline-flex">
                  <div class="flex-col justify-start items-start gap-3 flex">
                    <div class="flex-col justify-start items-start gap-[5.76px] flex">
                      <div class="flex-col justify-start items-start gap-[1.92px] flex">
                        <div>
                          <span class="text-blue-600 text-lg font-normal font-['Inter'] leading-[27px]">
                            Good Morning&nbsp;
                          </span>
                          <span class="text-blue-600 text-lg font-extrabold font-['Inter'] leading-[27px]">
                            {dataUser?.firstName} {dataUser?.lastName}
                          </span>
                        </div>
                      </div>
                      <div class="text-gray-900 flex flex-row text-[10px] font-medium font-['Inter'] leading-[15px]">
                        <img
                          src="//cdn.weatherapi.com/weather/64x64/day/302.png"
                          width="16"
                          class="mr-1"
                        />
                        11°C A perfect day to spread smiles!
                      </div>
                    </div>
                  </div>
                  <div class="w-full justify-start items-center gap-2 flex flex-wrap">
                    <div class="w-full h-[42px] justify-between items-start flex">
                      <div class="relative z-10 w-full">
                        <div class="w-full grow shrink basis-0 h-[42px] rounded-lg flex-col justify-start items-start gap-[46px] inline-flex">
                          <div class="w-full h-[42px] pl-[9px] pr-4 py-3.5 bg-white rounded-lg border border-gray-300 justify-start items-center gap-2.5 inline-flex">
                            <div class="w-full h-[20.88px] justify-start items-center gap-2 flex">
                              <div class="w-[20.88px] h-[20.88px] relative">
                                <img
                                  src={search}
                                  alt="search"
                                  class="w-full h-full"
                                />
                              </div>
                              <input
                                autocomplete="off"
                                type="search"
                                class="w-full h-[12.84px] text-gray-500 text-xs font-normal font-['Inter'] leading-[18px] placeholder-gray-500 placeholder-opacity-50 border-none outline-none p-0 focus:ring-0 focus:border-0"
                                placeholder="Search by Patient Name"
                                value=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          {dash === "/adminDashboard" && (
            <div class="my-11 w-[96%]">
              <div class="w-full p-2" style={{ opacity: "1" }}>
                <div class="z-0">
                  <div>
                    <div class="">
                      <div class="flex flex-row justify-between items-center mt-[30px]">
                        <h1 class="text-2xl text-gray-900 ml-2 font-semibold">
                          New Inquiries
                        </h1>
                        <div
                          onClick={() => router("/dashboard/inquires")}
                          class="flex mr-2 flex-row items-center cursor-pointer"
                        >
                          <span class="text-sm text-primary text-blue-600 font-semibold mr-1">
                            VIEW ALL
                          </span>
                          <RightOutlined className="w-3 h-3 text-primary text-blue-600 dark:text-white" />
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="overflow-x-auto">
                          {inquiries.length !== 0 ? (
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-600">
                              <thead className="text-xs text-gray-700 uppercase bg-gray-300 text-black">
                                <tr>
                                  {inqColumnHeaders.map(
                                    (columnHeader, index) => (
                                      <th
                                        key={index}
                                        scope="col"
                                        className="px-6 py-3 font-semibold tracking-wider"
                                      >
                                        {columnHeader}
                                      </th>
                                    )
                                  )}
                                </tr>
                              </thead>
                              <tbody>
                                {inquiries.map((inq, index) => (
                                  <tr
                                    key={index}
                                    className="border-b dark:border-gray-700 bg-gray-50 hover:bg-gray-200 text-md cursor-pointer"
                                    onClick={() => { {
                                      dispatch({
                                        type: "setCaseId",
                                        num: inq.caseId,
                                      });
                                      router("/dashboard/inquiry")}}}
                                  >
                                    <th
                                      scope="row"
                                      className="px-3 py-5 font-medium text-gray-900  whitespace-nowrap "
                                    >
                                      <Popover content={inq?.caseId}>
                                        <div className="inline-block max-w-[120px] whitespace-nowrap overflow-hidden overflow-ellipsis">
                                          {inq?.caseId}
                                        </div>
                                      </Popover>
                                    </th>
                                    <td
                                      className="px-6  py-5"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      {inq?.firstName} {inq.lastName} / {inq?.$id}
                                    </td>
                                    <td className="px-6  py-5"> {inq?.gender}</td>
                                    <td className="px-6  py-5 capitalize">{inq?.age}</td>

                                    <td
                                      className="px-3 py-5"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      {inq?.impressionType}
                                    </td>
                                    <td
                                      className="px-3 py-5 "
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      <span class="inline-flex items-center  min-w-[5rem] flex items-center justify-center text-center px-3.5 py-0.5 rounded-md  text-xs font-medium bg-indigo-100 text-indigo-800">
                                  {inq.status}
                                </span>
                                    </td>
                                    <td
                                      className="px-3 py-5"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                     <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch({
                                      type: "setCaseId",
                                      num: inq.caseId,
                                    });
                                    router("/dashboard/inquiryEdit");
                                  }}
                                  type="primary"
                                  className="rounded-lg h-[40px] text-white bg-[#1890ff] px-3 py-2.5 mr-2 mb-2 w-[6rem] text-sm font-sans font-medium flex items-center justify-center"
                                >
                                  Pick Task
                                </Button>
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
          )}
          {dash !== "/adminDashboard" && (
            <div class="mb-11 w-[96%]">
              <div class="w-full p-2" style={{ opacity: "1" }}>
                <div class="z-0">
                  <div>
                    <div class="">
                      <div class="flex flex-row justify-between items-center">
                        <h1 class="text-2xl ml-2 mtext-xl font-bold text-gray-900 font-semibold">
                          Inquiries
                        </h1>
                        <div
                          onClick={() => router("/dashboard/tasks")}
                          class="flex mr-2 flex-row items-center cursor-pointer"
                        >
                          <span class="text-sm text-primary text-blue-600 font-semibold mr-1">
                            VIEW ALL
                          </span>
                          <RightOutlined className="w-3 h-3 text-primary text-blue-600 dark:text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="p-2">
                          <div className="overflow-x-auto">
                            {tasks.length !== 0 ? (
                              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-600">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-300 text-black">
                                  <tr>
                                    {tskColumnHeaders.map(
                                      (columnHeader, index) => (
                                        <th
                                          key={index}
                                          scope="col"
                                          className="px-6 py-3 font-semibold tracking-wider"
                                        >
                                          {columnHeader}
                                        </th>
                                      )
                                    )}
                                  </tr>
                                </thead>
                                <tbody>
                                {tasks.map((inq, index) => (
                                  <tr
                                    key={index}
                                    className="border-b dark:border-gray-700 bg-gray-50 hover:bg-gray-200 text-md cursor-pointer"
                                    onClick={() => { {
                                      dispatch({
                                        type: "setCaseId",
                                        num: inq.caseId,
                                      });
                                      router("/dashboard/taskdetail")}}}
                                  >
                                    <th
                                      scope="row"
                                      className="px-3 py-5 font-medium text-gray-900  whitespace-nowrap "
                                    >
                                      <Popover content={inq?.caseId}>
                                        <div className="inline-block max-w-[120px] whitespace-nowrap overflow-hidden overflow-ellipsis">
                                          {inq?.caseId}
                                        </div>
                                      </Popover>
                                    </th>
                                    <td
                                      className="px-6  py-5"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      {inq?.firstName} {inq.lastName} / {inq?.$id}
                                    </td>
                                    <td className="px-6  py-5"> {inq?.gender}</td>
                                    <td className="px-6  py-5 capitalize">{inq?.age}</td>

                                    <td
                                      className="px-3 py-5"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      {inq?.impressionType}
                                    </td>
                                    <td
                                      className="px-3 py-5 "
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      <span class="inline-flex items-center  min-w-[5rem] flex items-center justify-center text-center px-3.5 py-0.5 rounded-md  text-xs font-medium bg-indigo-100 text-indigo-800">
                                  {inq.status}
                                </span>
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
            </div>
          )}
        </div>
      </div>
      <div
        className={`${
          addCase ? "" : "hidden"
        } fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center bg-black bg-opacity-50`}
      >
        <div class="relative rounded-xl w-[60rem] pb-6 pt-4 px-6 bg-white flex flex-col items-center">
          <h2 class="text-xl font-semibold mb-2">New Case</h2>
          <div className="w-full grid sm:grid-cols-2 gap-4 grid-cols-1 ">
            <div>
              <div class="w-full mb-2 mt-1 flex flex-col">
                <label class="block mb-1 font-medium">Patient</label>
                <div className="flex gap-x-2">
                  <input
                    type="text"
                    value={fName}
                    onChange={handleChange(setFName)}
                    class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="First name"
                  />
                  <label class="block mb-1 font-medium"></label>
                  <input
                    type="text"
                    value={lName}
                    onChange={handleChange(setLName)}
                    class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div class="w-full mb-4">
                <label class="block mb-1 font-medium">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={handleChange(setAge)}
                  class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter Age"
                />
              </div>
              <h1 className="font-semibold">Selected teeth to align</h1>
              <h1>Select teeth from below</h1>
              <div class="w-[18rem] mb-4">
                <img src={image} alt="" />
              </div>
            </div>
            <div>
              <div class="w-full mb-4">
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  <p>Gender</p>
                </label>
                <select
                  id="role"
                  onChange={handleChange(setGender)}
                  name="role"
                  value={gender}
                  className="block w-full p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled=""
                  placeholder="Select Gender"
                >
                  <option selected hidden className="text-gray-400">
                    Select Gender
                  </option>
                  <option id="male" value="male">
                    Male
                  </option>
                  <option id="female" value="female">
                    Female
                  </option>
                  <option id="not specified" value="not specified">
                    Not Specified
                  </option>
                </select>
              </div>
              <div class="w-full mb-4">
                <label class="block mb-1 font-medium">Impression TYpe</label>
                <select
                  id="role"
                  onChange={handleChange(setImpressionType)}
                  name="role"
                  value={impressionType}
                  className="block w-full p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled=""
                  placeholder="Select Impression"
                >
                  <option value="" selected hidden>
                    Select Impression Type
                  </option>
                  <option value="alginate">Alginate Impressions</option>
                  <option value="pvs">
                    Polyvinyl Siloxane (PVS) Impressions
                  </option>
                  <option value="polyether">Polyether Impressions</option>
                  <option value="digital">Digital Impressions</option>
                  <option value="full-arch">Full Arch Impressions</option>
                  <option value="partial">Partial Impressions</option>
                  <option value="triple-tray">Triple Tray Impressions</option>
                </select>
              </div>
              <div className="w-full mb-4">
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="grid grid-cols-1 gap-2">
                      <div>
                        <label className="block mb-2 font-medium">
                          File {index + 1}
                        </label>
                        <div className="border-dotted border-2 border-gray-300 cursor-pointer rounded-md p-2 w-full text-center">
                          <label className="w-full flex items-center justify-between">
                            <UploadOutlined style={{ fontSize: "24px" }} />
                            <p className="text-sm">Upload image or zip files</p>
                            <input
                              type="file"
                              hidden
                              accept=".ply,.doc,.docx,image/*"
                              onChange={(event) =>
                                handleFileChange(event, index)
                              }
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div class="w-full mb-4">
                <label class="block mb-1 font-medium">Notes</label>
                <textarea
                  type="text"
                  value={notes}
                  onChange={handleChange(setNotes)}
                  class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter notes"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-between w-full mt-4">
            <button
              onClick={() => setAddCase(false)}
              class="w-[4rem] whitespace-nowrap hover:bg-gray-600 text-white bg-gray-500 cursor-pointer rounded"
            >
              Close
            </button>
            <Button
              onClick={submitHandler}
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
    </main>
  );
};

export default DashBoard;
