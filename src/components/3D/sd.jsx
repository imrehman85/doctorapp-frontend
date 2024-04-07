import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import logo from "../../Images/logo.png";
import center from "../../Images/Center.svg";
import left from "../../Images/Left.svg";
import right from "../../Images/Right.svg";
import upper from "../../Images/Upper.svg";
import lower from "../../Images/Lower.svg";
import clock from "../../Images/clock.svg";
import {
  DownOutlined,
  DownloadOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
// import plyaaa from "../../Images/Maxillary28.ply";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Switch } from "antd";

const PlayerViewer = () => {
  const containerRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [pDetails, setPdetails] = useState(false);
  const [tDetails, setTdetails] = useState(false);
  const [value, setValue] = useState(0);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const toggleDarkMode = (checked) => {
    setIsDarkMode(checked);
  };

  useEffect(() => {
    let camera, scene, renderer;

    const container = document.getElementById("canvas-container");

    if (file) {
      const loader = new PLYLoader();

      loader.load(URL.createObjectURL(file), function (geometry) {
        // const material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors }); 
        const mesh = new THREE.Mesh(geometry, );//material

        scene = new THREE.Scene();
        scene.add(mesh);

        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);

        container.appendChild(renderer.domElement);

        renderer.render(scene, camera);
      });
    }

    // Cleanup function to remove renderer when component unmounts
    return () => {
      if (renderer) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };

  }, [file]);



  return (
    <main>
      <div className="w-full flex justify-center">
        <div
          className={`w-[1400px] h-screen flex flex-col items-center justify-start relative ${
            isDarkMode ? "bg-[#282828]" : "bg-gray-50"
          }`}
        >
          <div className="flex flex-row justify-between w-full py-[70px] px-[44px]">
            <div className="w-[265px] z-20 flex flex-col justify-start">
              <div className="space-y-4 mobile:w-48">
                <div
                  className={`w-full rounded-md ${
                    isDarkMode
                      ? "bg-gray-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  <div
                    className={`w-full h-11 rounded-lg border border-gray-60 cursor-pointer flex justify-between items-center px-4 ${
                      isDarkMode
                        ? " bg-gray-700 border-gray-600 text-white"
                        : "bg-blue-50 border-blue-300 text-gray-700"
                    }`}
                  >
                    <span className="text-sm font-normal">
                      Treatment Details
                    </span>
                    <DownOutlined
                      onClick={() => {
                        if (pDetails) setPdetails(false);
                        setTdetails(!tDetails);
                      }}
                    />
                    {/* </div> */}
                  </div>
                  {tDetails && (
                    <div className="p-2 flex flex-col gap-2">
                      <div>
                        <h1>No of Aligner Sets</h1>
                        <p>28</p>
                      </div>
                      <div className="w-full h-[1px] bg-gray-300"></div>
                      <div>
                        <h1>Case Complexity</h1>
                        <p>COMPLEX</p>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={`w-full rounded-md ${
                    isDarkMode
                      ? "bg-gray-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  <div
                    className={`w-full h-11 rounded-lg border border-gray-60 cursor-pointer flex justify-between items-center px-4 ${
                      isDarkMode
                        ? " bg-gray-700 border-gray-600 text-white"
                        : "bg-blue-50 border-blue-300 text-gray-700"
                    }`}
                  >
                    <span className="text-sm font-normal">Patient Details</span>
                    <DownOutlined
                      onClick={() => {
                        if (tDetails) setTdetails(false);
                        setPdetails(!pDetails);
                      }}
                    />
                  </div>
                  {pDetails && (
                    <div className="p-2 flex flex-col gap-2">
                      <div>
                        <h1>Name</h1>
                        <p>Ayesha</p>
                      </div>
                      <div className="w-full h-[1px] bg-gray-300"></div>
                      <div>
                        <h1>Gender</h1>
                        <p>Female</p>
                      </div>
                      <div className="w-full h-[1px] bg-gray-300"></div>
                      <div>
                        <h1>ID</h1>
                        <p>007</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <img
              className="w-[132.49px] h-[40px] mt-6"
              src={logo}
              alt="Logo"
            />
            <div className="flex flex-col gap-y-4">
              <button
                type="button"
                className="font-medium focus:outline-none focus:ring-4 hover:bg-primary-hover focus:ring-primary-faded dark:bg-primary dark:hover:bg-primary-hover dark:focus:ring-primary-hover text-sm w-[185px] h-[51px] z-20 p-2.5 bg-blue-600 rounded-lg justify-center items-center inline-flex text-white m-0 flex items-center justify-center"
              >
                <DownloadOutlined className="font-bold text-xl" />
                <span className="ml-2">Download PDF</span>
              </button>
              <div
                className={`w-[185px] h-[51px] z-20 p-2.5 cursor-pointer rounded-lg border justify-center items-center gap-2 inline-flex ${
                  isDarkMode
                    ? " bg-gray-700 border-gray-600 text-white"
                    : "bg-blue-50 border-blue-300 text-gray-700"
                }`}
              >
                <div className="items-center gap-2 flex justify-between">
                  <span className="text-white cursor-pointer">
                    <Switch
                      checked={isDarkMode}
                      onChange={toggleDarkMode}
                      checkedChildren="Dark"
                      unCheckedChildren="Light"
                    />
                  </span>
                  <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                    <div
                      className={`text-sm font-medium font-["Inter"] leading-[17.50px] ${
                        isDarkMode ? "text-white" : "text-[#282828]"
                      }`}
                    >
                      Dark Mode
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute w-full h-full">
          <div>
      <input
        type="file"
        accept=".ply"
        onChange={handleFileChange}
      />
      <div id="canvas-container" style={{ width: "100%", height: "419px", border: "1px solid white" }}></div>
    </div>
          </div>
          <div className="absolute bottom-0 w-full flex flex-row gap-x-[60px] justify-between px-[44px] pb-[33px]">
            <div className="relative flex flex-col items-center w-full">
              <div
                className={`w-[1050px] h-[90px] rounded-lg border flex items-center px-16 relative  ${
                  isDarkMode
                    ? " bg-gray-700 border-gray-600 text-white"
                    : "bg-blue-50 border-blue-300 text-gray-700"
                }`}
              >
                <div className="flex flex-col w-full relative">
                  <div className="w-full">
                    <input
                      id="default-range"
                      type="range"
                      className="w-full h-2 mb-4 rounded-lg appearance-none cursor-pointer z-20 bg-blue-50 border-blue-300"
                      min="0"
                      max="27"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      style={{
                        height: "0.125rem",
                        background: `linear-gradient(to right, white 0%, white ${
                          (value / 27) * 100
                        }%, gray ${((value + 1) / 27) * 100}%, gray 100%)`,
                      }}
                    />
                    {/* <datalist className="tick-marks">
                      {[...Array(28)].map((_, index) => (
                        <div
                          key={index}
                          className="w-[0.0625rem] h-full bg-[#A4CAFE] absolute top-0"
                          style={{
                            left: `${(index / 27) * 100}%`,
                            transform: "translateX(-50%)",
                          }}
                        ></div>
                      ))}
                    </datalist> */}
                  </div>
                </div>
              </div>
              <div
                className={`w-[360px] mt-[30px] h-16 rounded-lg border justify-start items-center inline-flex  ${
                  isDarkMode
                    ? " bg-gray-700 border-gray-500 text-white"
                    : "bg-blue-50 border-blue-300 text-gray-700"
                }`}
              >
                <div className="grow shrink basis-0 self-stretch py-2 flex-col justify-center items-center inline-flex cursor-pointer border-r border-[#6B7280]">
                  <div className="w-5 h-5 relative">
                    <button>
                      <ArrowLeftOutlined
                        className={`${
                          isDarkMode ? "text-gray-50" : "text-blue-600"
                        }`}
                      />
                    </button>
                  </div>
                </div>
                <div className="grow shrink basis-0 self-stretch py-2 flex-col justify-center items-center inline-flex cursor-pointer ">
                  <div className="w-[46px] h-[46px] bg-blue-600 rounded-[999px] flex-col justify-center items-center flex">
                    <div className="w-5 h-5 relative cursor-pointer">
                      <svg
                        className="w-5 h-5 text-white dark:text-white false"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 10 16"
                      >
                        <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="grow shrink basis-0 self-stretch py-2 flex-col justify-center items-center inline-flex cursor-pointer border-l border-[#6B7280]">
                  <div className="w-5 h-5 relative">
                    <button>
                      <ArrowRightOutlined
                        className={`${
                          isDarkMode ? "text-gray-50" : "text-blue-600"
                        }`}
                      />
                    </button>
                  </div>
                </div>
                <div className="absolute top-[70%] right-[12.85rem]">
                  <div
                    className={`cursor-pointer w-[101px] h-[45px] px-2.5 rounded-lg border justify-center items-center gap-2.5 inline-flex ${
                      isDarkMode
                        ? "text-gray-50 border-gray-500"
                        : "text-blue-600 border-blue-300 bg-blue-50"
                    }`}
                  >
                    <div className="w-[21.46px] h-[20.06px] relative">
                      <img
                        src={clock}
                        height="20.06"
                        width="21.46px"
                        alt="Clock"
                        style={{ transform: "rotate(0deg)" }}
                      />
                    </div>
                    <div
                      className={`text-lg font-medium font-["Inter"] leading-[27px] ${
                        isDarkMode ? "text-gray-300" : "text-blue-600"
                      }`}
                    >
                      1X
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`flex flex-col items-center w-[183px] h-[183px] p-4 border rounded-lg justify-center ${
                isDarkMode
                  ? " bg-gray-700 border-gray-500 text-white"
                  : "bg-blue-50 border-blue-300 text-gray-700"
              }`}
            >
              <img
                src={upper}
                className="w-[50.23px] h-[44.45px] mb-1.5 cursor-pointer select-none"
                alt="Upper"
              />
              <div className="flex flex-row w-full items-center justify-center">
                <img
                  src={left}
                  className="w-[38.55px] h-[38.55] mr-1.5 cursor-pointer select-none"
                  alt="Left"
                />
                <img
                  src={center}
                  className="w-[50.23px] cursor-pointer select-none"
                  alt="Center Active"
                />
                <img
                  src={right}
                  className="w-[38.55px] h-[38.55] ml-1.5 cursor-pointer select-none"
                  alt="Right"
                />
              </div>
              <img
                src={lower}
                className="w-[50.23px] h-[44.45px] mt-1.5 cursor-pointer select-none"
                alt="Lower"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PlayerViewer;
