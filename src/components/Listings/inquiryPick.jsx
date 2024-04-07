import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../../Images/profile.png";
import down from "../../Images/download.png";
import teeth from "../../Images/teaths.jpg";
import axios from "axios";
import {  useSelector } from "react-redux";
import {
  SendOutlined,
  LeftOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";
const Inquiry = () => {
  const router = useNavigate();
  const [showExternalChat, setShowExternalChat] = useState(true);
  const [showInternalChat, setShowInternalChat] = useState(false);
  const caseId = useSelector((state) => state.caseId);
  const token = useSelector((state) => state.token);
  const [inquiries, setInquiries] = useState([]);
  const images = [
    teeth,
    teeth,
    teeth,
    teeth,
    teeth,
    teeth,
    teeth,
    teeth,
  ];
  const toggleInternalChat = () => {
    setShowExternalChat(!showExternalChat);
    setShowInternalChat(!showInternalChat);
  };

  function downloadImage(url) {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "image.jpg";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  useEffect(() => {
    axios
      .get(`http://91.108.104.16:5000/api/Case/get-case-by-id?id=${caseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        setInquiries(data?.data?.$values);
      })
      .catch((err) => {});
  }, []);

  return (
    <main>
      <div style={{ opacity: 1 }}>
        <div className="flex w-full sm:justify-center justify-start">
          <div className="w-[730px] flex flex-col gap-8 py-14 overflow-x-auto">
            <div
              onClick={() => router("/dashboard/inquires")}
              className="font-medium text-blue-600 flex flex-row items-center text-l cursor-pointer text-primary dark:primary self-start w-min"
            >
              <LeftOutlined className="w-3 h-3 mr-2 text-blue-600 text-primary dark:text-white" />
              BACK
            </div>
            <div></div>
            <div className="flex flex-row justify-between items-center w-full py-6 px-6 rounded-xl border border-blue-200 shadow-sm bg-white undefined">
              <div>
                <h1 className="text-base font-medium">Impression Status</h1>
              </div>
              <span className="inline-flex items-center min-w-max px-3.5 py-0.5 rounded-md text-xs font-medium bg-indigo-100 text-indigo-500">
                Pending Pickup
              </span>
            </div>
            <div className="border rounded-md p-6">
              <div className="flex justify-between sm:flex-row flex-col">
                <h1 className="text-lg font-semibold leading-none">
                  Patient Details
                </h1>
              </div>
              <div className="my-5 h-0.5 w-full bg-gray-200"></div>
              <div className="mb-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img className="h-20 w-20 rounded-full" src={profile} />
                  </div>
                  <div className="ml-5">
                    <p className="sm:text-2xl text-xl font-semibold text-gray-700 tracking-wide">
                      ABUBAKER Khattak
                    </p>
                    <div className="sm:text-sm text-gray-500 font-light text-xs">
                      -
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-row justify-between">
                  <span className="text-sm font-semibold leading-none text-gray-900">
                    Patient ID
                  </span>
                  <span className="text-base mt-1.5 font-normal leading-6 text-gray-500 max-w-[75%] text-end">
                    0000110
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="text-sm font-semibold leading-none text-gray-900">
                    Gender
                  </span>
                  <span className="text-base mt-1.5 font-normal leading-6 text-gray-500 max-w-[75%] text-end">
                    Male
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="text-sm font-semibold leading-none text-gray-900">
                    Arch
                  </span>
                  <span className="text-base mt-1.5 font-normal leading-6 text-gray-500 max-w-[75%] text-end">
                    DUAL
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="text-sm font-semibold leading-none text-gray-900">
                    Age
                  </span>
                  <span className="text-base mt-1.5 font-normal leading-6 text-gray-500 max-w-[75%] text-end">
                    28
                  </span>
                </div>
              </div>
            </div>
            <div className="px-6 border rounded-md">
              <div>
                <div className="w-full py-6 rounded-md">
                  <h1 className="text-lg font-semibold leading-none">
                    Treatment Details
                  </h1>
                  <div className="my-4 h-0.5 w-full bg-gray-200"></div>
                  <div className="flex flex-col mt-3">
                    <span className="font-medium text-base text-gray-900">
                      Do you want to IPR teeth?
                    </span>
                    <span className="text-base text-gray-500">
                      Teeth #: 0.1mm(27-26), 0.1mm(26-25), 0.1mm(25-24),
                      0.1mm(24-23), 0.1mm(23-22), 0.1mm(22-21), 0.1mm(8-9),
                      0.1mm(9-10), 0.1mm(7-8), 0.1mm(6-7), 0.1mm(5-6),
                      0.1mm(10-11), 0.1mm(11-12), 0.1mm(28-27)
                    </span>
                  </div>
                  <div className="flex flex-col mt-3">
                    <span className="font-medium text-base text-gray-900">
                      Note
                    </span>
                    <span className="text-base text-gray-500">
                      kindly we need to improve his smile , align his teeth and
                      to solve the open bite
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-6 border rounded-md">
              <div>
                <div class="flex justify-between items-center">
                  <h1 class="text-lg font-bold text-gray-900">Images</h1>
                </div>
                <div class="my-3 h-[1px] w-full bg-gray-100"></div>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 md:w-[668px] gap-5 sm::w-[500px] w-[350px]">
                  {images.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="group border rounded-md relative w-[162px] h-[158px] overflow-hidden m-0"
                    >
                      <img
                        src={imageUrl}
                        alt="Placeholder"
                        className="w-full h-full object-cover rounded-md group-hover:brightness-50 transition-all duration-500"
                      />
                      <button
                        className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={() => downloadImage(imageUrl)}
                      >
                        <img
                          src={down}
                          className="w-[40.39px] h-[40.39px]"
                          alt="Download"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-5 border rounded-md">
              <div className="flex justify-between sm:flex-row flex-col">
                <h1 className="text-lg font-semibold leading-none">
                  Clinic Details
                </h1>
              </div>
              <div className="my-5 h-0.5 w-full bg-gray-200"></div>
              <div className="mb-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="sm:h-20 sm:w-20 h-18 w-18 rounded-full"
                      src={profile}
                    />
                  </div>
                  <div className="ml-5">
                    <p className="sm:text-2xl text-xl font-semibold text-gray-700 tracking-wide">
                      Boston Diabetes &amp; Endocrine Center
                    </p>
                    <div className="sm:text-sm text-gray-500 font-light text-xs">
                      +923168788400
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-row justify-between">
                  <span className="text-sm font-semibold leading-none text-gray-900">
                    Dentist Name
                  </span>
                  <span className="text-base mt-1.5 font-normal leading-6 text-gray-500 max-w-[75%] text-end">
                    Dr. Abu Bakar
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="text-sm font-semibold leading-none text-gray-900">
                    Dentist Email
                  </span>
                  <span className="text-base mt-1.5 font-normal leading-6 text-gray-500 max-w-[75%] text-end">
                    bakar@hotmail.com
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center">
              <div className="rounded-xl border-2 w-full">
                {showExternalChat && (
                  <div className="font-normal bg-blue-100 p-4 py-6 rounded-t-lg underline-offset-4 flex flex-row justify-between items-center cursor-pointer">
                    <div>
                      Conversation with{" "}
                      <span className="font-semibold underline">
                        AbuBakar Khattak
                      </span>{" "}
                      &nbsp;and&nbsp;
                      <span className="font-semibold underline">1 other</span>
                    </div>
                    <UpOutlined onClick={toggleInternalChat} className="w-4 h-4 text-gray-800 dark:text-white" />
                  </div>
                )}
                {!showExternalChat && (
                  <div className="font-normal bg-blue-100 p-4 py-6 rounded-t-lg underline-offset-4 flex flex-row justify-between items-center cursor-pointer">
                    <div>
                      <span className="font-semibold">
                        General Conversation
                      </span>
                    </div>
                    <DownOutlined onClick={toggleInternalChat} className="w-4 h-4 text-gray-800 dark:text-white" />
                  </div>
                )}
                {showExternalChat && (
                  <div>
                    <div className="flex flex-col items-center justify-center h-[300px]">
                      <span className="mt-4 text-gray-500 text-sm">
                        No messages yet, start a conversation 😁
                      </span>
                    </div>
                    <div className="p-4 mt-4 bg-gray-50 flex flex-row gap-4 rounded-b-lg">
                      <input
                        className="p-3 w-full rounded-lg shadow-sm outline-none text-sm font-normal border border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="Write text here ..."
                        type="text"
                        value=""
                      />
                      <input className="hidden" type="file" />
                      <SendOutlined className="text-3xl cursor-pointer" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex mt-4 flex-row justify-center">
              <div className="rounded-xl border-2 w-full">
                {showInternalChat && (
                  <div className="font-normal bg-blue-100 p-4 py-6 rounded-t-lg underline-offset-4 flex flex-row justify-between items-center cursor-pointer">
                    <div>
                      Conversation with{" "}
                      <span className="font-semibold underline">
                        AbuBakar Khattak
                      </span>{" "}
                      &nbsp;and&nbsp;
                      <span className="font-semibold underline">1 other</span>
                    </div>
                    <UpOutlined onClick={toggleInternalChat} className="w-4 h-4 text-gray-800 dark:text-white" />
                  </div>
                )}
                {!showInternalChat && (
                  <div className="font-normal bg-blue-100 p-4 py-6 rounded-t-lg underline-offset-4 flex flex-row justify-between items-center cursor-pointer">
                    <div>
                      <span className="font-semibold">
                        Internal Conversation
                      </span>
                    </div>
                    <DownOutlined onClick={toggleInternalChat} className="w-4 h-4 text-gray-800 dark:text-white" />
                  </div>
                )}
                {showInternalChat && (
                  <div>
                    <div className="flex flex-col items-center justify-center h-[300px]">
                      <span className="mt-4 text-gray-500 text-sm">
                        No messages yet, start a conversation 😁
                      </span>
                    </div>
                    <div className="p-4 mt-4 bg-gray-50 flex flex-row gap-4 rounded-b-lg">
                      <input
                        className="p-3 w-full rounded-lg shadow-sm outline-none text-sm font-normal border border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="Write text here ..."
                        type="text"
                        value=""
                      />
                      <input className="hidden" type="file" />
                      <SendOutlined className="text-3xl cursor-pointer" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Inquiry;
