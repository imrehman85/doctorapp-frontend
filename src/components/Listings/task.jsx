import React, {useState} from "react";
import { Button } from "antd";
import profile from "../../Images/profile.png";
import { useNavigate } from "react-router-dom";
import { SendOutlined, LeftOutlined, UpOutlined, DownOutlined } from "@ant-design/icons";
const Task = () => {
  const router = useNavigate();
  const [showExternalChat, setShowExternalChat] = useState(true);
  const [showInternalChat, setShowInternalChat] = useState(false);

  const toggleInternalChat = () => {
    setShowExternalChat(!showExternalChat);
    setShowInternalChat(!showInternalChat);
  };
  return (
    <main>
      <div style={{ opacity: 1 }}>
        <div class="flex w-full sm:justify-center justify-start">
          <div class="w-[730px] flex flex-col gap-8 py-14 overflow-x-auto">
            <div
              onClick={() => router("/dashboard/tasks")}
              class="font-medium flex text-blue-600 flex-row items-center text-l cursor-pointer text-primary dark:primary self-start w-min"
            >
                <LeftOutlined className="w-3 h-3 mr-2 text-blue-600 text-primary dark:text-white"/>
              BACK
            </div>
            <div class="flex flex-row justify-between items-center w-full py-6 px-6 rounded-xl border border-blue-200 shadow-sm bg-white undefined">
              <div>
                <h1 class="text-base font-medium">Impression Status</h1>
              </div>
              <span class="inline-flex items-center  min-w-max px-3.5 py-0.5 rounded-md  text-xs font-medium bg-indigo-100 text-indigo-500">
                Pending Pickup
              </span>
            </div>
            <div class="p-6 border border-gray-200 shadow-sm rounded-md">
              <label class="font-bold text-lg">
                Delivery Presentation Date
              </label>
              <p class="text-sm text-gray-500 mb-3">
                When do you plan to Delivery this over to the admin for
                approval?
              </p>
              <div>
                <div>
                  <div class="w-full">
                    <input
                      type="date"
                      class="w-full mb-2 p-2 h-10 text-gray-800 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-gray-700"
                      placeholder="Select Date"
                      value=""
                    />
                  </div>
                </div>
              </div>
              <Button
                type="primary"
                class="font-medium mt-4 rounded-lg focus:outline-none focus:ring-4 text-white bg-primary hover:bg-primary-hover focus:ring-primary-faded dark:bg-primary dark:hover:bg-primary-hover dark:focus:ring-primary-hover text-sm px-5 py-2.5 mr-2 mb-2 cursor-not-allowed opacity-50 mt-4 flex items-center justify-center"
              >
                <span class="false">Set & Confirm</span>
              </Button>
            </div>
            <div class="border rounded-md p-6">
              <div class="flex justify-between sm:flex-row flex-col">
                <h1 class="text-lg font-semibold leading-none">
                  Patient Details
                </h1>
              </div>
              <div class="my-5 h-0.5 w-full bg-gray-200"></div>
              <div class="mb-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <img class="h-20 w-20 rounded-full" src={profile} />
                  </div>
                  <div class="ml-5">
                    <p class="sm:text-2xl text-xl font-semibold text-gray-700 tracking-wide">
                      Patient Name
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-3">
                <div class="flex flex-row justify-between">
                  <span class="text-sm font-semibold leading-none text-gray-900">
                    Patient ID
                  </span>
                  <span class="text-base mt-1.5 font-normal leading-6 text-gray-500 max-w-[75%] text-end">
                    007
                  </span>
                </div>
                <div class="flex flex-row justify-between">
                  <span class="text-sm font-semibold leading-none text-gray-900">
                    Gender
                  </span>
                  <span class="text-base mt-1.5 font-normal leading-6 text-gray-500 max-w-[75%] text-end">
                    Male
                  </span>
                </div>
                <div class="flex flex-row justify-between">
                  <span class="text-sm font-semibold leading-none text-gray-900">
                    Arch
                  </span>
                  <span class="text-base mt-1.5 font-normal leading-6 text-gray-500 max-w-[75%] text-end">
                    DUAL
                  </span>
                </div>
                <div class="flex flex-row justify-between">
                  <span class="text-sm font-semibold leading-none text-gray-900">
                    Age
                  </span>
                  <span class="text-base mt-1.5 font-normal leading-6 text-gray-500 max-w-[75%] text-end">
                    35
                  </span>
                </div>
              </div>
            </div>
            <div class="px-6 border rounded-md">
              <div>
                <div class="w-full py-6 rounded-md">
                  <h1 class="text-lg font-semibold leading-none">
                    Treatment Details
                  </h1>
                  <div class="my-4 h-0.5 w-full bg-gray-200"></div>
                  <div class="flex flex-col mt-3">
                    <span class="font-medium text-base text-gray-900">
                      Note
                    </span>
                    <span class="text-base text-gray-500">version 2</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-6 py-5 border rounded-md">
              <div class="flex justify-between sm:flex-row flex-col">
                <h1 class="text-lg font-semibold leading-none">
                  Clinic Details
                </h1>
              </div>
              <div class="my-5 h-0.5 w-full bg-gray-200"></div>
              <div class="mb-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <img
                      class="sm:h-20 sm:w-20 h-18 w-18 rounded-full"
                      src={profile}
                    />
                  </div>
                  <div class="ml-5">
                    <p class="sm:text-2xl text-xl font-semibold text-gray-700 tracking-wide">
                      Modern Medical Center - MMC
                    </p>
                    <div class="sm:text-sm text-gray-500 font-light text-xs">
                      +923168788400
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-3">
                <div class="flex flex-row justify-between">
                  <span class="text-sm font-semibold leading-none text-gray-900">
                    Dentist Name
                  </span>
                  <span class="text-base mt-1.5 font-normal leading-6 text-gray-500 max-w-[75%] text-end">
                    AbuBakar
                  </span>
                </div>
                <div class="flex flex-row justify-between">
                  <span class="text-sm font-semibold leading-none text-gray-900">
                    Dentist Email
                  </span>
                  <span class="text-base mt-1.5 font-normal leading-6 text-gray-500 max-w-[75%] text-end">
                    bakar@gmail.com
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
                    <UpOutlined onClick={toggleInternalChat} className="w-4 h-4 text-gray-800 dark:text-white"/>
                  </div>
                )}
                {!showExternalChat && (
                  <div className="font-normal bg-blue-100 p-4 py-6 rounded-t-lg underline-offset-4 flex flex-row justify-between items-center cursor-pointer">
                    <div>
                      <span className="font-semibold">
                        General Conversation
                      </span>
                    </div>
                    <DownOutlined onClick={toggleInternalChat} className="w-4 h-4 text-gray-800 dark:text-white"/>
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
                    <UpOutlined onClick={toggleInternalChat} className="w-4 h-4 text-gray-800 dark:text-white"/>
                  </div>
                )}
                {!showInternalChat && (
                  <div className="font-normal bg-blue-100 p-4 py-6 rounded-t-lg underline-offset-4 flex flex-row justify-between items-center cursor-pointer">
                    <div>
                      <span className="font-semibold">
                        Internal Conversation
                      </span>
                    </div>
                    <DownOutlined onClick={toggleInternalChat} className="w-4 h-4 text-gray-800 dark:text-white"/>
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

export default Task;
