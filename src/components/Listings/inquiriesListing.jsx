import React from "react";
import noData from "../../Images/noData.gif";
import { useState } from "react";
import { Popover } from "antd";
import { useEffect } from "react";
import axios from "axios";
import { Radio, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { LeftOutlined, SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const Inquiries = () => {
  const router = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.option);
  const token = useSelector((state) => state.token);
  const reset = useSelector((state) => state.reset);
  const [inquiries, setInquiries] = useState([]);

  const inqColumnHeaders = [
    "Case Id",
    "Patient Name/ID",
    "Patient Gender",
    "Patient Age",
    "Impression Type",
    "Status",
    "Action",
  ];
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
      })
      .catch((err) => {});
  }, [reset]);
  return (
    <main className="w-full flex items-center justify-center flex-col">
      <div className="w-[95%] flex justify-center">
        <div className="w-full p-4 overflow-auto">
          <div className="w-full" style={{ opacity: 1 }}>
            <div className="z-0">
              <div className="mt-14">
                <div
                  onClick={() => {
                    if (user === "doctor") router("/DoctorDashboard");
                    else if (user === "admin") router("/adminDashboard");
                  }}
                  className="font-medium flex flex-row items-center text-l cursor-pointer text-primary dark:primary self-start w-min "
                >
                  <LeftOutlined className="w-3 h-3 mr-2 text-blue-600 text-primary dark:text-white" />
                  <span className="text-sm text-blue-600 font-semibold">
                    BACK
                  </span>
                </div>
                <div className="flex flex-row justify-between items-center mobile:mt-[30px] mobile:mb-[9.35px]">
                  <h1 className="text-2xl mobile:text-xl mobile:font-bold text-gray-900 font-semibold py-4">
                    Inquiries
                  </h1>
                </div>
                <div>
                  <div className="flex justify-between flex-row flex-wrap">
                    <div className="w-[384px] tablet:w-auto mobile:w-auto pb-4">
                      <div className="relative">
                        <SearchOutlined className="w-4 h-4 text-gray-800 dark:text-white absolute top-3 left-3" />
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
                        <Radio.Group defaultValue="New Inquiries">
                          <Radio value="New Inquiries" className="mr-2.5">
                            New Inquiries
                          </Radio>
                          <Radio value="Pending Approval" className="mr-2.5">
                            Pending Approval
                          </Radio>
                          <Radio value="Pending Revisions">
                            Pending Revisions
                          </Radio>
                          <Radio value="Pending Complete">
                            Pending Complete
                          </Radio>
                          <Radio value="Completed">Completed</Radio>
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
                              key={index}
                              className="border-b dark:border-gray-700 bg-gray-50 hover:bg-gray-200 text-md cursor-pointer"
                              onClick={() => {
                                {
                                  dispatch({
                                    type: "setCaseId",
                                    num: inq.caseId,
                                  });
                                  router("/dashboard/inquiry");
                                }
                              }}
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
                                {inq?.firstName} {inq.lastName}{" "}
                                {inq?.$id ? "/" : ""} {inq?.$id}
                              </td>
                              <td className="px-6  py-5"> {inq?.gender}</td>
                              <td className="px-6  py-5 capitalize">
                                {inq?.age}
                              </td>

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
    </main>
  );
};

export default Inquiries;
