import React, { useState } from "react";
import logo from "../../Images/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MenuFoldOutlined } from "@ant-design/icons";

const Sidebar = () => {
  const sidebar = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const router = useNavigate();


  // Define an array of menu items
  const menuItems = [
    {
      key: "1",
    //   activeIcon: activehome,
      text: "New Cases",
    //   inactiveIcon: home,
    //   router: "/Merchant/dashboard",
    },
    {
      key: "2",
    //   activeIcon: account_balance,
      text: "Pending Approvel",
    //   inactiveIcon: bank,
    },
    {
      key: "3",
    //   activeIcon: activedemography,
      text: "Pending Revision",
    //   router: "/Merchant/Reports",
    //   inactiveIcon: demography,
    },

    {
      key: "4",
    //   activeIcon: Inactivenotifications,
      text: "Pending Completions",
    //   inactiveIcon: notifications,
    },
    {
      key: "5",
    //   activeIcon: Activeperson_pin,
      text: "Completed cases",
    //   router: "/Merchant/profile",
    //   inactiveIcon: person_pin,
    },
  ];

  return (
    <div className="bg-gray-50 p-2 flex space-between flex-col h-full ">
      <aside
        id="logo-sidebar"
        aria-label="Sidebar"
        className="h-full"
      >
        <div className="px-1 py-4">
          <div className="flex items-center">
            <a
              href="#"
              className="flex items-center mb-6 pl-6"
              onClick={(event) => {
              }}
            >
              <img src={logo} className="h-16" alt="Flowbite Logo" />
            </a>
          </div>

          <ul className="space-y-2 pl-4 font-medium text-primary text-[1rem]">
            {menuItems.map((menuItem) => (
              <li
                key={menuItem.key}
                onClick={() => {
                  dispatch({ type: "SIDEBAR", num: menuItem.key });
                }}
              >
                <a
                  href="#"
                  className={`flex items-center p-3 rounded-lg ${
                    sidebar === menuItem.key
                      ? "bg-gray-400 text-white"
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    router(menuItem.router);
                    dispatch({ type: "OPEN_SIDEBAR", num: false });
                  }}
                >
                  <span
                    className={
                      sidebar === menuItem.key ? "text-white" : "text-primary"
                    }
                  >
                    {menuItem.text}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
