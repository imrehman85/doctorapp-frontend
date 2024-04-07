import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../../Images/profile.png";
import { Button } from "antd";
import down from "../../Images/download.png";
import teeth from "../../Images/teaths.jpg";
import {
  SendOutlined,
  LeftOutlined,
  CaretRightOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";
const TaskComp = () => {
  const router = useNavigate();
  const [showExternalChat, setShowExternalChat] = useState(true);
  const [showInternalChat, setShowInternalChat] = useState(false);
  const images = [teeth, teeth, teeth, teeth, teeth, teeth, teeth, teeth];
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
  return (
    <main>
      <div style={{ opacity: 1 }}>
        <div class="flex w-full sm:justify-center justify-start">
          <div class="w-[730px] flex flex-col gap-8 py-14 overflow-x-auto">
            <div
              onClick={() => router("/dashboard/tasks")}
              class="font-medium flex text-blue-600 flex-row items-center text-l cursor-pointer text-primary dark:primary self-start w-min"
            >
              <LeftOutlined className="w-3 h-3 mr-2 text-blue-600 text-primary dark:text-white" />
              BACK
            </div>
            <div className="">
              <div className="w-full p-6 border rounded-md mb-6">
                <div className="flex justify-between mobile:flex-col">
                  <h1 className="text-lg mobile:text-sm mobile:mb-3 font-semibold leading-none">
                    Treatment Plan
                  </h1>
                  <Button
                    type="primary"
                    className="rounded-lg focus:outline-none focus:ring-4 text-white bg-primary hover:bg-primary-hover focus:ring-primary-faded dark:bg-primary dark:hover:bg-primary-hover dark:focus:ring-primary-hover px-3 py-1.5 mr-1 h-[41px] text-sm font-medium mb-3 mobile:text-xs mobile:h-[35px] mobile:w-[170px] flex items-center justify-center"
                  >
                    <a
                      href="/player"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <CaretRightOutlined className="text-white text-2xl pb-2" />
                      <span className="ml-2">See Full Presentation</span>
                    </a>
                  </Button>
                </div>
                <div className="my-1 h-0.5 w-full bg-gray-200"></div>
                <div className="grid grid-cols-2 mobile:grid-cols-1">
                  <div className="flex flex-col mt-3">
                    <span className="font-medium text-sm text-gray-900">
                      No of Aligner Sets
                    </span>
                    <span className="text-base text-gray-500">16</span>
                  </div>
                  <div className="flex flex-col mt-3">
                    <span className="font-medium text-sm text-gray-900">
                      Dentist Name
                    </span>
                    <span className="text-base text-gray-500">
                      Omar Armouti
                    </span>
                  </div>
                  <div className="flex flex-col mt-3">
                    <span className="font-medium text-sm text-gray-900">
                      Case Complexity
                    </span>
                    <span className="text-base text-gray-500">Simple</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-row justify-between items-center w-full py-6 px-6 rounded-xl border border-blue-200 shadow-sm bg-white undefined">
              <div>
                <h1 class="text-base font-medium">Impression Status</h1>
                <div>
                  <span class=" text-gray-900 font-medium">Received By: </span>
                  <span class="text-gray-900 font-semibold">Deutsche Lab</span>
                </div>
              </div>
              <span class="inline-flex items-center  min-w-max px-3.5 py-0.5 rounded-md  text-xs font-medium bg-green-100 text-green-500">
                Delivered
              </span>
            </div>
            <div class="border rounded-md p-6">
              <div class="flex justify-between mobile:flex-col">
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
                    <p class="text-2xl mobile:text-xl font-semibold text-gray-700 tracking-wide">
                      Naqeeb
                    </p>
                    <div class="text-sm text-gray-500 font-light mobile:text-xs">
                      +92 3237625243{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-3">
                <div class="flex flex-row justify-between">
                  <span class="text-sm font-semibold leading-none text-gray-900">
                    Patient ID
                  </span>
                  <span class="text-base mobile:-mt-1.5 tablet:-mt-1.5 font-normal leading-6 text-gray-500 max-w-[75%] text-end">
                    0000120
                  </span>
                </div>
                <div class="flex flex-row justify-between">
                  <span class="text-sm font-semibold leading-none text-gray-900">
                    Gender
                  </span>
                  <span class="text-base mobile:-mt-1.5 tablet:-mt-1.5 font-normal leading-6 text-gray-500 max-w-[75%] text-end">
                    Female
                  </span>
                </div>
                <div class="flex flex-row justify-between">
                  <span class="text-sm font-semibold leading-none text-gray-900">
                    Arch
                  </span>
                  <span class="text-base mobile:-mt-1.5 tablet:-mt-1.5 font-normal leading-6 text-gray-500 max-w-[75%] text-end">
                    LOWER
                  </span>
                </div>
                <div class="flex flex-row justify-between">
                  <span class="text-sm font-semibold leading-none text-gray-900">
                    Age
                  </span>
                  <span class="text-base mobile:-mt-1.5 tablet:-mt-1.5 font-normal leading-6 text-gray-500 max-w-[75%] text-end">
                    23
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
                      Anterior
                    </span>
                    <span class="text-base text-gray-500">
                      Improve Canine Molar Relation
                    </span>
                  </div>
                  <div class="flex flex-col mt-3">
                    <span class="font-medium text-base text-gray-900">
                      Over Jet
                    </span>
                    <span class="text-base text-gray-500">
                      Improve Over Jet Ipr
                    </span>
                  </div>
                  <div class="flex flex-col mt-3">
                    <span class="font-medium text-base text-gray-900">
                      Over Bite
                    </span>
                    <span class="text-base text-gray-500">
                      Improve Over Bite
                    </span>
                  </div>
                  <div class="flex flex-col mt-3">
                    <span class="font-medium text-base text-gray-900">
                      Mid Line
                    </span>
                    <span class="text-base text-gray-500">
                      Improve Midline Ipr
                    </span>
                  </div>
                  <div class="flex flex-col mt-3">
                    <span class="font-medium text-base text-gray-900">
                      Note
                    </span>
                    <span class="text-base text-gray-500">
                      patient had history of fixed treatment for anterior
                      crossbite 5 years back and was on fixed retainer since
                      then. At present, his chief complaint is irregular upper
                      front teeth mainly 11,12 and wants realignment and
                      leveling up of all his teeth. One year back, he got
                      restored fractured teeth 21
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-6 border rounded-md">
              <div>
                <div class="flex justify-between items-center">
                  <h1 class="text-lg font-bold text-gray-900">Images</h1>
                </div>
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
            <div class="px-6 py-5 border rounded-md">
              <div class="flex justify-between mobile:flex-col">
                <h1 class="text-lg font-semibold leading-none">
                  Clinic Details
                </h1>
              </div>
              <div class="my-5 h-0.5 w-full bg-gray-200"></div>
              <div class="mb-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <img
                      class="h-20 w-20 mobile:h-18 mobile:w-18 rounded-full"
                      src={profile}
                    />
                  </div>
                  <div class="ml-5">
                    <p class="text-2xl mobile:text-xl font-semibold text-gray-700 tracking-wide">
                      Isb Dental Center
                    </p>
                    <div class="text-sm text-gray-500 font-light mobile:text-xs">
                      +92 3142545353
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-3">
                <div class="flex flex-row justify-between">
                  <span class="text-sm font-semibold leading-none text-gray-900">
                    Dentist Name
                  </span>
                  <span class="text-base mobile:-mt-1.5 tablet:-mt-1.5 font-normal leading-6 text-gray-500 max-w-[75%] text-end">
                    Dr. Abu Bakar
                  </span>
                </div>
                <div class="flex flex-row justify-between">
                  <span class="text-sm font-semibold leading-none text-gray-900">
                    Dentist Email
                  </span>
                  <span class="text-base mobile:-mt-1.5 tablet:-mt-1.5 font-normal leading-6 text-gray-500 max-w-[75%] text-end">
                    bakar.khattak007@gmail.com
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
                    <UpOutlined
                      onClick={toggleInternalChat}
                      className="w-4 h-4 text-gray-800 dark:text-white"
                    />
                  </div>
                )}
                {!showExternalChat && (
                  <div className="font-normal bg-blue-100 p-4 py-6 rounded-t-lg underline-offset-4 flex flex-row justify-between items-center cursor-pointer">
                    <div>
                      <span className="font-semibold">
                        General Conversation
                      </span>
                    </div>
                    <DownOutlined
                      onClick={toggleInternalChat}
                      className="w-4 h-4 text-gray-800 dark:text-white"
                    />
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
                    <UpOutlined
                      onClick={toggleInternalChat}
                      className="w-4 h-4 text-gray-800 dark:text-white"
                    />
                  </div>
                )}
                {!showInternalChat && (
                  <div className="font-normal bg-blue-100 p-4 py-6 rounded-t-lg underline-offset-4 flex flex-row justify-between items-center cursor-pointer">
                    <div>
                      <span className="font-semibold">
                        Internal Conversation
                      </span>
                    </div>
                    <DownOutlined
                      onClick={toggleInternalChat}
                      className="w-4 h-4 text-gray-800 dark:text-white"
                    />
                  </div>
                )}
                {showInternalChat && (
                  <div>
                    <div className="flex flex-col items-center px-[3rem] justify-center h-[300px]">
                      <div class="w-full">
                        <div class="mb-2 flex flex-row justify-between">
                          <span class="text-gray-600 text-sm mr-4">
                            Abu Bakar
                          </span>
                          <span class="text-gray-500 text-xs">
                            Saturday 12:31 PM
                          </span>
                        </div>
                        <div class="bg-gray-100 p-4 rounded-t-lg rounded-b-lg shadow-sm cursor-pointer bg-gray-100 rounded-bl-none hover:bg-gray-200">
                          Take care of yourself.
                        </div>
                      </div>
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

export default TaskComp;
