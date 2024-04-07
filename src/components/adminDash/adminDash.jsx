import React, { useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Upload} from 'antd';
import PhoneInput from "react-phone-number-input";
import { Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogoutOutlined } from "@ant-design/icons";
import profile from "../../Images/profile.png";
import image from "../../Images/teethwebImg.png";
import { useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { Layout, theme, Button } from "antd";
import Sidebar from "./sidebar";
import { useRef, useEffect } from "react";
import * as THREE from "three";
let file;
const { Header, Content, Footer, Sider } = Layout;
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));
const App = () => {
  const [addD, setAddD] = useState(false);
  const [addCase, setAddCase] = useState(false);
  const dispatch = useDispatch();
  const [prompt, setPrompt] = useState("");
  const [display, setDisplay] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [specialization, setSpecialization] = useState(null);
  const [experience, setExperience] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const role = useSelector((state) => state.option);
  const router = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const texture = new THREE.TextureLoader().load(profile);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  const data = [
    {
      key: "2",
      date: "24/01/2023",
      labelP: `Patient`,
      pName: "Naqeeb Ahmed",
      labelD: "Dentist",
      dName: "Abu Bakar Siddique",
    },
    {
      key: "2",
      date: "24/01/2023",
      labelP: `Patient`,
      pName: "Naqeeb Ahmed",
      labelD: "Dentist",
      dName: "Abu Bakar Siddique",
    },
  ];
  const items = [
    {
      label: "Your Profile ",
      key: "1",
    },
    // {
    //   label: "Privacy Policy ",
    //   key: "2",
    // },
    // {
    //   label: "Support",
    //   key: "3",
    // },
    {
      label: "Logout",
      key: "4",
      icon: <LogoutOutlined className="some" />,
      danger: true,
    },
  ];
  const onClick1 = ({ key }) => {
    if (key === "4") {
      router("/");
    } else if (key === "1") {
      router("/adminDashboard/AdminProf");
    } else if (key === "2") {
      router("/dashboard/Privacy");
    } else if (key === "3") {
      router("/dashboard/Support");
    }
  };
  const handleChange = (setState, check) => (event) => {
    if (check === "tt") {
      setPrompt(event);
    } else {
      setState(event.target.value);
    }
  };
  const handleClose = () => {
    setName("");
    setAddD(false);
    setEmail("");
    setPrompt("");
    setAddress("");
    setDisplay("");
    setSpecialization("");
    setExperience("");
    setPassword("");
    setConfirmPassword("");
  };

  const imageHandler = (setState) => async (e) => {
    file = e.target.files[0];
    const base641 = await convertToBase64(file);
    setState(base641);
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
  return (
    <Layout className="bg-gray-50">
      <Sider
        breakpoint="lg"
        width={260}
        collapsedWidth="0"
        className="flex flex-col justify-between h-full"
        style={{
          width: "20px",
          minHeight: "100%",
        }}
      >
        <Sidebar />
      </Sider>

      <Layout className="bg-gray-50">
        <Content
          className="p-26 bg-colorBgContainer border-l border-gray-300"
          style={{
            minHeight: "fit-content",
          }}
        >
          <div className="p-4 py-8 flex">
            <div className="w-[70%] gap-y-2">
              <h1 className="text-[32px]">My Cases</h1>
              <p className="text-[16px]">Get summary of your weekly updates.</p>
              <div className="relative h-[45px] w-[85%] mt-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="absolute inset-0 p-2 rounded-l-md rounded-md w-[85%] border outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                />
                <button className="absolute w-[16%] border-gray-400 hover:bg-gray-600 text-white font-semibold h-full right-0 top-0 bottom-0 border bg-gray-500 rounded-r-md">
                  {" "}
                  Case #
                </button>
              </div>
              <div className="p-2 min-h-[30rem] mt-10  w-full">
                <div className="flex flex-wrap gap-2">
                  {data.map((item, index) => (
                    <div
                      key={index}
                      className="w-[32%] h-[11rem]  rounded-md rounded-t-lg pb-[1rem] flex flex-col justify-center items-center border border-gray-300"
                    >
                      <div className="text-center border border-2 border-gray-400 top-0 bg-gray-400 rounded-t-md text-white h-[2rem] border-b w-full font-semibold flex items-center justify-center">
                        {item.date}
                      </div>
                      <div className="text-primary flex-col mt-4 flex items-center justify-center mb-2">
                        <h1 className="font-semibold">{item.labelP}</h1>
                        <p>{item.pName}</p>
                      </div>
                      <div className="text-primary flex flex-col mt-4 items-center justify-center mb-2">
                        <h1 className="font-semibold">{item.labelD}</h1>
                        <p>{item.dName}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div ref={containerRef} />
              </div>
            </div>
            <div className="w-[30%] h-full flex flex-col gap-y-4 items-center">
              <Dropdown
                placement="bottomLeft"
                overlayClassName="custom-dropdown-menu"
                menu={{
                  items: items,
                  onClick: onClick1,
                }}
              >
                <div className="w-full min-h-[4rem] flex items-center justify-center rounded-lg bg-indigo-100 shadow-md">
                  <a
                    className="flex items-center justify-between w-full px-2"
                    onClick={(e) => e.preventDefault()}
                  >
                    <div className="flex">
                      <img
                        src={profile}
                        alt="profile pic"
                        className="w-[2.375rem] h-[2.375rem] rounded-full mr-2 object-cover"
                      />
                      <div>
                        <h1 className="font-semibold">Abu Bakar Siddique</h1>
                        <p className="capitalize">{role}</p>
                      </div>
                    </div>
                    <DownOutlined />
                  </a>
                </div>
              </Dropdown>
              <div className="flex gap-1 w-full">
                <button
                  onClick={() => setAddCase(true)}
                  class="w-full bg-gray-500 rounded-md hover:bg-gray-600 text-white cursor-pointer font-semibold h-[40px] px-2 py-2"
                >
                  New Case
                </button>
                <button class="w-full bg-gray-500 rounded-md hover:bg-gray-600 text-white cursor-pointer font-semibold h-[40px] px-2 py-2">
                  Refinement
                </button>
                <button class="w-full whitespace-nowrap hover:bg-gray-600 text-white bg-gray-500 cursor-pointer rounded-md font-semibold h-[40px] px-2 py-2">
                  Refresh Cases
                </button>
              </div>
              <button
                onClick={() => setAddD(true)}
                class="w-full whitespace-nowrap hover:bg-gray-600 text-white bg-gray-500 cursor-pointer rounded-md font-semibold h-[40px] px-2 py-2"
              >
                Add Dentist
              </button>
            </div>
          </div>
        </Content>
      </Layout>
      <div
        className={`${
          addD ? "" : "hidden"
        } fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center bg-black bg-opacity-50`}
      >
        <div class="relative rounded-xl w-[40rem] pb-6 pt-4 px-6 bg-white flex flex-col items-center">
          <h2 class="text-xl font-semibold mb-6">Add Dentist</h2>
          <div className="flex items-center justify-center mb-4">
            <label htmlFor="special-input" className="cursor-pointer relative">
              <div className="relative w-[6rem] h-[6rem] overflow-hidden border-2 border-[#686262]  rounded-full mb-2 ">
                <img
                  className="object-cover w-[6rem] h-[6rem]"
                  src={display !== "" ? display : profile}
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
                onInput={imageHandler(setDisplay)}
              />
            </label>
          </div>
          <div className="w-full grid sm:grid-cols-2 gap-4 grid-cols-1 ">
            <div>
              <div class="w-full mb-4">
                <label class="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={handleChange(setName)}
                  class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter name"
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
              <div class="w-full mb-4">
                <label class="block mb-1 font-medium">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={handleChange(setAddress)}
                  class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter address"
                />
              </div>
            </div>
            <div>
              <div class="w-full mb-4">
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  <p>Role</p>
                </label>
                <select
                  id="role"
                  onChange={handleChange(setSpecialization)}
                  name="role"
                  value={specialization}
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
                <label class="block mb-1 font-medium">
                  Years of Experience
                </label>
                <input
                  type="number"
                  value={experience}
                  onChange={handleChange(setExperience)}
                  class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter years of experience"
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
              <div class="w-full mb-4">
                <label class="block mb-1 font-medium">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleChange(setConfirmPassword)}
                  class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Confirm password"
                />
              </div>
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
          addCase ? "" : "hidden"
        } fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center bg-black bg-opacity-50`}
      >
        <div class="relative rounded-xl w-[60rem] pb-6 pt-4 px-6 bg-white flex flex-col items-center">
          <h2 class="text-xl font-semibold mb-6">New Case</h2>
          <div className="w-full grid sm:grid-cols-2 gap-4 grid-cols-1 ">
            <div>
              <div class="w-full mb-4 mt-1 flex flex-col">
                <label class="block mb-1 font-medium">Patient</label>
                <div className="flex gap-x-2">
                  <input
                    type="text"
                    value={name}
                    onChange={handleChange(setName)}
                    class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="First name"
                  />
                  <label class="block mb-1 font-medium"></label>
                  <input
                    type="text"
                    value={name}
                    onChange={handleChange(setName)}
                    class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div class="w-full mb-4">
                <label class="block mb-1 font-medium">Age</label>
                <input
                  type="number"
                  value={email}
                  onChange={handleChange(setEmail)}
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
                  onChange={handleChange(setSpecialization)}
                  name="role"
                  value={specialization}
                  className="block w-full p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled=""
                  placeholder="Select Role"
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
                  onChange={handleChange(setSpecialization)}
                  name="role"
                  value={specialization}
                  className="block w-full p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled=""
                  placeholder="Select Role"
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
              <div class="w-full mb-4">
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                  <label class="block mb-2 font-medium">File 1</label>
                    <Upload
                      className="border-dotted w-full border-2 border-gray-300 cursor-pointer rounded-md p-2 w-full text-center"
                      showUploadList={false}
                      accept=".ply,.doc,.docx,image/*"
                    >
                     <UploadOutlined /> Upload image or zip files
                    </Upload></div>
                    <div>
                  <label class="block mb-2 font-medium">File 2</label>
                    <Upload
                      className="border-dotted border-2 border-gray-300 cursor-pointer rounded-md p-2 w-full text-center"
                      showUploadList={false}
                      accept=".ply,.doc,.docx,image/*"
                    >
                     <UploadOutlined /> Upload image or zip files
                    </Upload></div>
                    <div>
                  <label class="block mb-2 font-medium">File 3</label>
                    <Upload
                      className="border-dotted border-2 border-gray-300 cursor-pointer rounded-md p-2 w-full text-center"
                      showUploadList={false}
                      accept=".ply,.doc,.docx,image/*"
                    >
                     <UploadOutlined /> Upload image or zip files
                    </Upload></div>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                  <div>
                  <label class="block mb-2 font-medium">File 4</label>
                    <Upload
                      className="border-dotted border-2 border-gray-300 cursor-pointer rounded-md p-2 w-full text-center"
                      showUploadList={false}
                      accept=".ply,.doc,.docx,image/*"
                    >
                     <UploadOutlined /> Upload image or zip files
                    </Upload></div>
                    <div>
                  <label class="block mb-2 font-medium">File 5</label>
                    <Upload
                      className="border-dotted border-2 border-gray-300 cursor-pointer rounded-md p-2 w-full text-center"
                      showUploadList={false}
                      accept=".ply,.doc,.docx,image/*"
                    >
                     <UploadOutlined /> Upload image or zip files
                    </Upload></div>
                    <div>
                  <label class="block mb-2 font-medium">File 6</label>
                    <Upload
                      className="border-dotted border-2 border-gray-300 cursor-pointer rounded-md p-2 w-full text-center"
                      showUploadList={false}
                      accept=".ply,.doc,.docx,image/*"
                    >
                     <UploadOutlined /> Upload image or zip files
                    </Upload></div>
                  </div>
                </div>
              </div>
              <div class="w-full mb-4">
                <label class="block mb-1 font-medium">Notes</label>
                <textarea
                  type="text"
                  value={confirmPassword}
                  onChange={handleChange(setConfirmPassword)}
                  class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter notes"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-between w-full mt-6">
            <button
              onClick={() => setAddCase(false)}
              class="w-[4rem] whitespace-nowrap hover:bg-gray-600 text-white bg-gray-500 cursor-pointer rounded"
            >
              Close
            </button>
            <Button
              type="primary"
              class="rounded-lg focus:outline-none focus:ring-4 text-white bg-primary hover:bg-primary-hover focus:ring-primary-faded dark:bg-primary dark:hover:bg-primary-hover dark:focus:ring-primary-hover px-3 py-1.5 mr-1 h-[41px] text-sm font-medium mobile:text-xs mobile:h-[35px] mobile:w-[170px] flex items-center justify-center"
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default App;
