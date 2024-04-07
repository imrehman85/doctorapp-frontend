import React from "react";
import noData from "../../Images/noData.gif";
import { useState } from "react";
import { Radio, Button } from "antd"
import { useNavigate, useLocation } from "react-router-dom";
import {LeftOutlined, SearchOutlined  } from "@ant-design/icons";
const Inquiries = () => {
  const router = useNavigate();
  const path = useLocation();
  const dash = path.pathname;
  const [inquiries, setInquiries] = useState([
    {
        Clinic: "Clinic XYZ",
        email: "abc@gmail.com",
        pendingamount: "$300",
        Action: "Pay"
      },
    {
      Clinic: "Clinic XYZ",
      email: "abc@gmail.com",
      pendingamount: "$400",
      Action: "Pay"
    },
    {
      Clinic: "Clinic XYZ",
      email: "abc@gmail.com",
      pendingamount: "$500",
      Action: "Pay"
    },
    {
      Clinic: "Clinic XYZ",
      email: "abc@gmail.com",
      pendingamount: "$600",
      Action: "Pay"
    },
  ]);


  const inqColumnHeaders = [
    "Clinic Name",
    "Email",
    "Pending Amount",
    "Action",
  ];
  return (
    <main className="w-full flex items-center justify-center flex-col">
      <div className="w-[95%] flex justify-center">
        <div className="w-full p-4 overflow-auto">
          <div className="w-full" style={{ opacity: 1 }}>
            <div className="z-0">
              <div className="mt-14">
                <div
                  onClick={() => {
                    if(dash==="/Admindashboard/transections")
                    router("/Admindashboard")
                else
                    router("/DoctorDashboard")}}
                  className="font-medium flex flex-row items-center text-l cursor-pointer text-primary dark:primary self-start w-min "
                >
                  <LeftOutlined className="w-3 h-3 mr-2 text-blue-600 text-primary dark:text-white"/>
                  <span className="text-sm text-blue-600 font-semibold">
                    BACK
                  </span>
                </div>
                <div className="flex flex-row justify-between items-center mobile:mt-[30px] mobile:mb-[9.35px]">
                  <h1 className="text-2xl mobile:text-xl mobile:font-bold text-gray-900 font-semibold py-4">
                    Transactions
                  </h1>
                </div>
                <div>
                  <div className="flex justify-between flex-row flex-wrap">
                    <div className="w-[384px] tablet:w-auto mobile:w-auto pb-4">
                      <div className="relative">
                        <SearchOutlined className="w-4 h-4 text-gray-800 dark:text-white absolute top-3 left-3"/>
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
                <div className="flex justify-between pb-2 flex-wrap">
                  <div>
                    <div className="flex flex-row my-4 flex-wrap">
                      <span className="text-sm font-medium text-gray-900 mr-2.5">
                        Show Only: &nbsp;
                      </span>
                      <div className="flex">
                        <Radio.Group defaultValue="ALL_IMPRESSIONS">
                          <Radio value="Pending Payments" className="mr-2.5">
                          Pending Payments
                          </Radio>
                          <Radio value="Completed payments">
                          Completed payments
                          </Radio>
                        </Radio.Group>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="overflow-x-auto">
                    {inquiries.length !== 0 ? (
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-600">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-300 text-black">
                          <tr>
                            {inqColumnHeaders.map((columnHeader, index) => (
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
                          {inquiries.map((inq, index) => (
                            <tr
                            // onClick={()=> router("/dashboard/inquiry")}
                              key={index}
                              className="border-b dark:border-gray-700 bg-gray-50 hover:bg-gray-200 text-md cursor-pointer"
                            >
                              <td
                                scope="row"
                                className="px-3 py-2 font-medium text-gray-900  whitespace-nowrap "
                              >
                                {inq.Clinic}
                              </td>
                              <td
                                className="px-6  py-2"
                                style={{ whiteSpace: "nowrap" }}
                              >
                                {inq.email}
                              </td>
                              <td className="px-6  py-2 capitalize">
                              <span class="inline-flex items-center  min-w-max px-3.5 py-0.5 rounded-md  text-xs font-medium bg-indigo-100 text-indigo-800">{inq.pendingamount}</span>
                              </td>

                              <td
                                className="px-3 py-2"
                                style={{ whiteSpace: "nowrap" }}
                              >
                                <Button
                                  type="primary"
                                  className="rounded-lg h-[40px] text-white bg-[#1890ff] px-5 flex items-center justify-center py-2.5 mr-2 mb-2 w-[90%] text-sm font-sans font-medium flex items-center justify-center"
                                >
                                  {inq.Action}
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
    </main>
  );
};

export default Inquiries;
