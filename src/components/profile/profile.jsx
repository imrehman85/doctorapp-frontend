import React, { useState, useEffect } from "react";
import profile from "../../Images/profile.png";
import { Button } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

const ProfileDetails = () => {
  const router = useNavigate();
  const path = useLocation();
  const dash = path.pathname;
  const token = useSelector((state) => state.token);
  const emailId = useSelector((state) => state.idSet);
  const role = useSelector((state) => state.option);
  const dataUser = useSelector((state) => state.dataUser);
  const [data, setData] = useState("");
console.log("dataUser",dataUser)
  useEffect(() => {
    if (dash !== "/dashboard/Profile") {
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
          setData(data.data);
          console.log(data);
        })
        .catch((err) => {});
    } else setData(dataUser);
  }, []);

  return (
    <main>
      <div style={{ opacity: 1 }}>
        <div className="mt-14 mb-10 flex flex-col items-center justify-center">
          <div
            onClick={() => {
              if (role === "admin" && dash==="/adminDashboard/viewDoc")
                router("/Admindashboard/clinics");
              else if (role === "admin" && dash!=="/adminDashboard/viewDoc")
              router("/adminDashboard")
              else router("/DoctorDashboard");
            }}
            class="font-medium  w-[728px] mb-4 flex text-blue-600 flex-row items-center text-l cursor-pointer text-primary dark:primary"
          >
            <LeftOutlined className="w-3 h-3 mr-2 text-blue-600 text-primary dark:text-white" />
            BACK
          </div>
          <div className="p-6 w-[728px] shadow-lg border border-gray-200 rounded-lg">
            <div className="w-full">
              <div className="flex justify-between items-center">
                <div className="flex justify-between">
                  <h1 className="text-lg font-semibold leading-none">
                    Profile Details
                  </h1>
                </div>
                <div
                  className={`${
                    dash === "/adminDashboard/viewDoc" ? "hidden" : ""
                  } flex`}
                >
                  <Button
                    onClick={() => {
                      if (dash === "/adminDashboard/AdminProf")
                        router("/adminDashboard/AdminProfEdit");
                      else router("/dashboard/Profile/Edit");
                    }}
                    type="primary"
                    className="font-medium rounded-lg text-sm px-5 py-2.5 mb-2 text-white mr-0 bg-primary hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center"
                  >
                    Edit
                  </Button>
                </div>
              </div>

              <div className="my-5 h-0.5 w-full bg-gray-200"></div>
              <div className="mb-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-20 w-20 rounded-full"
                      src={data.imagePath}
                      alt="Profile"
                    />
                  </div>
                  <div className="ml-5">
                    <p className="text-2xl font-semibold text-gray-700 tracking-wide">
                      {data.firstName}&nbsp; {data.lastName}
                    </p>
                    <div className="text-sm text-gray-500 font-light"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-row justify-between mobile:flex-col">
                  <span className="text-sm font-semibold leading-none text-gray-900">
                    Email
                  </span>
                  <span className="text-base font-normal leading-none text-gray-500">
                    {data.email}
                  </span>
                </div>
                <div className="flex flex-row justify-between mobile:flex-col">
                  <span className="text-sm font-semibold leading-none text-gray-900">
                    Phone
                  </span>
                  <span className="text-base font-normal leading-none text-gray-500">
                    {data.phoneNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileDetails;
