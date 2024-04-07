import React, { useState, useRef } from "react";
import logo from "../../Images/logo.png";
import Notification from "../../Images/notification.svg";
import profile from "../../Images/profile.png";
import hamberger from "../../Images/hamburger.svg";
import { Dropdown } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
let menuItems;
const Nav = () => {
  const [ham, setHam] = useState(false);
  const role = useSelector((state) => state.option);
  const dataUser = useSelector((state) => state.dataUser);
  const router = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const dash = location.pathname;
  console.log(dash);
  if (role === "admin") {
    menuItems = [
      { id: 1, heading: "Dashboard", route: "/Admindashboard" },
      { id: 2, heading: "Inquiries", route: "/dashboard/inquires" },
      { id: 3, heading: "Clinics", route: "/Admindashboard/clinics" },
      { id: 4, heading: "Transactions", route: "/Admindashboard/transections" },
    ];
  } else if (role === "doctor") {
    menuItems = [
      { id: 1, heading: "Dashboard", route: "/DoctorDashboard" },
      { id: 2, heading: "Dentist Approvel", route: "/dashboard/dentistApproval" },
      // { id: 3, heading: "Inquiries", route: "/dashboard/inquires" },
      { id: 4, heading: "Inquiries", route: "/dashboard/tasks" },
      // { id: 5, heading: "Clinics", route: "" },
      // { id: 6, heading: "Orders", route: "/dashboard/orders" },
      // { id: 7, heading: "Transections", route: "/dashboard/transections" },
    ];
  }

  const items = [
    {
      label: "Your Profile ",
      key: "1",
    },
    {
      label: "Privacy Policy ",
      key: "2",
    },
    {
      label: "Support",
      key: "3",
    },
    {
      label: "Logout",
      key: "4",
      icon: <LogoutOutlined className="some" />,
      danger: true,
    },
  ];
  const toggleOptions = () => {
    setHam(!ham);
  };
  const onClick1 = ({ key }) => {
    if (key === "4") {
      dispatch({ type: "authStateSet", num: false });
      router("/");
    } else if (key === "1") {
      router("/dashboard/Profile");
    } else if (key === "2") {
      router("/dashboard/Privacy");
    } else if (key === "3") {
      router("/dashboard/Support");
    }
  };
  return (
    <>
      <div className="bg-gray-50 flex flex-row lg:flex md:flex sm:hidden hidden pl-4 pr-4 py-4 flex justify-between items-center  w-full">
        <div class="flex items-center space-x-1 ml-8">
          <img
            src={logo}
            alt="Deutsche Aligners"
            class="w-[6rem] h-[4rem] mr-8 cursor-pointer"
          />
          <div class="flex space-x-2 text-sm font-semibold items-center justify-center">
            {menuItems.map((item) => (
              <p
                key={item.id}
                className={`${
                  dash === item.route ? "text-blue-500" : "text-gray-600"
                } w-full cursor-pointer whitespace-nowrap px-2 hover:text-blue-500 text-[16px] font-sm`}
                onClick={() => router(item.route)}
              >
                {item.heading}
              </p>
            ))}
          </div>
        </div>
        <div class="flex space-x-4 mr-8 items-center">
          <div class="relative">
            <img
              src={Notification}
              alt="Notification"
              class="w-[1.5rem] text-primary dark:text-white cursor-pointer"
            />
            <div class="px-1 bg-red-600 max-w-[30px] h-[14px] bg-primary text-white absolute -top-1 rounded-full -right-2 text-[10px] flex justify-center">
              2
            </div>
          </div>
          <Dropdown
            placement="bottomLeft"
            overlayClassName="custom-dropdown-menu"
            menu={{
              items: items,
              onClick: onClick1,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <img
                src={dataUser?.imagePath? dataUser.imagePath:profile}
                alt="profile pic"
                className="w-[2.375rem] h-[2.375rem] rounded-full object-cover"
              />
            </a>
          </Dropdown>
        </div>
      </div>

      <div class="w-full py-1 px-4 h-[60px] lg:hidden md:hidden sm:flex flex flex flex-row items-center justify-between">
        <img
          src={logo}
          alt="Deutsche Aligners"
          class="w-[5rem] h-[3.5rem] cursor-pointer"
        />
        <div class="full h-full flex flex-row items-center">
          <div class="relative">
            <img
              src={Notification}
              alt="Notification"
              class="w-[25px] h-[25px] text-primary dark:text-white cursor-pointer"
            />
            <div class="px-1 max-w-[30px] h-[14px] bg-red-600 text-white absolute -top-1 rounded-full -right-2 text-[10px] flex justify-center z-20">
              2
            </div>
          </div>
          <img
            src={hamberger}
            alt="Message"
            class="relative w-[36px] h-[36px] ml-4 text-primary dark:text-white cursor-pointer"
            onClick={toggleOptions}
          ></img>
          {ham && (
            <div class="bg-gray-50 flex flex-col z-20 shadow-md right-0 absolute top-[50px] w-[300px] rounded-lg overflow-hidden">
              <p
                aria-current="page"
                class="w-full py-2 px-4 bg-white border-b-[1px] hover:bg-gray-50 text-gray-600 text-sm font-medium text-primary bgblue"
                onClick={() => router("/dashboard")}
              >
                Dashboard
              </p>
              <p
                class="w-full py-2 px-4 bg-white border-b-[1px] hover:bg-gray-50 text-gray-600 text-sm font-medium hover:text-primary"
                onClick={() => router("/dashboard/inquires")}
              >
                Inquiries
              </p>
              <p
                class="w-full py-2 px-4 bg-white border-b-[1px] hover:bg-gray-50 text-gray-600 text-sm font-medium hover:text-primary"
                onClick={() => router("/dashboard/tasks")}
              >
                Inquiries
              </p>
              <div class="py-1 bg-white border-b-[1px] hover:bg-gray-50">
                <button class="w-full text-red-600 text-left hover:bg-red-50 px-4 py-2 text-sm flex flex-row">
                  <LogoutOutlined className="text-l flex items-center justify-center mr-2" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
