import React from "react";
import noData from "../../Images/noData.gif";
import { useState, useEffect } from "react";
import { Radio, Button } from "antd";
import axios from "axios";
import { Popover } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LeftOutlined, SearchOutlined } from "@ant-design/icons";
const Tasks = () => {
  const token = useSelector((state) => state.token);
  const reset = useSelector((state) => state.reset);
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([
    {
      Clinic: "Boston Diabetes & Endocrine Center",
      Dentist: "Dr. Mahmoud AbuRahma",
      Patient: "ABOBAKER SALAH OSMAN / 0000110",
      Impression: "Type A",
      ImpressionStatus: "Pending Pickups",
      Action: "Set Date",
    },
    {
      Clinic: "Clinic XYZ",
      Dentist: "Dr. Jane Doe",
      Patient: "John Doe / 0000123",
      Impression: "Type B",
      ImpressionStatus: "No Status",
      Action: "Set Date",
    },
    {
      Clinic: "Dental Clinic ABC",
      Dentist: "Dr. John Smith",
      Patient: "Jane Smith / 0000456",
      Impression: "Type C",
      ImpressionStatus: "Pending Pickups",
      Action: "Set Date",
    },
  ]);
  const [tasksComp, setTasksComp] = useState([
    {
      Clinic: "Boston Diabetes & Endocrine Center",
      Dentist: "Dr. Mahmoud AbuRahma",
      Patient: "ABOBAKER SALAH OSMAN",
      PatientId: "000110",
      CompletedDate: "24/01/2024",
      OrderStatus: "ORDERED",
    },
  ]);
  const [radioValue, setRadioValue] = useState("NEW_ASSIGNED");

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };
  const router = useNavigate();

  const tskColumnHeaders = [
    "Case Id",
    "Patient Name/ID",
    "Patient Gender",
    "Patient Age",
    "Impression Type",
    "Status",
  ];
  useEffect(() => {
    axios
      .get(`http://91.108.104.16:5000/api/Case/get-all-cases`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setTasks(data?.data?.$values);
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
                  onClick={() => router("/DoctorDashboard")}
                  className="font-medium flex flex-row items-center text-l cursor-pointer text-primary dark:primary self-start w-min "
                >
                  <LeftOutlined className="w-3 h-3 mr-2 text-blue-600 text-primary dark:text-white" />
                  <span className="text-sm text-blue-600 font-semibold">
                    BACK
                  </span>
                </div>
                <div className="flex flex-row justify-between items-center mt-[30px] mb-[9.35px]">
                  <h1 className="sm:text-2xl text-xl font-bold text-gray-900 sm:font-semibold py-4">
                    Inquiries
                  </h1>
                </div>
                <div>
                  <div className="flex justify-between flex-row flex-wrap">
                    <div className="md:w-[384px] w-auto pb-4">
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
                        <Radio.Group
                          defaultValue={radioValue}
                          onChange={handleRadioChange}
                        >
                          <Radio value="NEW_ASSIGNED" className="mr-2.5">
                            New Assigned
                          </Radio>
                          <Radio value="IN_PROGRESS" className="mr-2.5">
                            In Progress
                          </Radio>
                          <Radio value="PENDING_APPROVAL" className="mr-2.5">
                            Pending Approval
                          </Radio>
                          <Radio value="COMPLETED" className="mr-2.5">
                            Completed
                          </Radio>
                        </Radio.Group>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {radioValue !== "COMPLETED" && (
                    <div className="overflow-x-auto">
                      {tasks.length !== 0 ? (
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-600">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-300 text-black">
                            <tr>
                              {tskColumnHeaders.map((columnHeader, index) => (
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
                          {tasks.map((inq, index) => (
                                  <tr
                                    key={index}
                                    className="border-b dark:border-gray-700 bg-gray-50 hover:bg-gray-200 text-md cursor-pointer"
                                    onClick={() => { {
                                      dispatch({
                                        type: "setCaseId",
                                        num: inq.caseId,
                                      });
                                      router("/dashboard/taskdetail")}}}
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
                                      {inq?.firstName} {inq.lastName} / {inq?.$id}
                                    </td>
                                    <td className="px-6  py-5"> {inq?.gender}</td>
                                    <td className="px-6  py-5 capitalize">{inq?.age}</td>

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
                  )}
                  {/* {radioValue === "COMPLETED" && (
                    <div className="overflow-x-auto">
                      {tasks.length !== 0 && radioValue === "COMPLETED" ? (
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-600">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-300 text-black">
                            <tr>
                              {tskColumnHeadersComp.map(
                                (columnHeader, index) => (
                                  <th
                                    key={index}
                                    scope="col"
                                    className="px-6 py-3 font-semibold tracking-wider"
                                  >
                                    {columnHeader}
                                  </th>
                                )
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {tasksComp.map((inq, index) => (
                              <tr
                                onClick={() =>
                                  router("/dashboard/taskCompdetail")
                                }
                                key={index}
                                className="border-b dark:border-gray-700 bg-gray-50 hover:bg-gray-200 text-md cursor-pointer"
                              >
                                <td
                                  scope="row"
                                  className="px-3 py-5 font-medium text-gray-900  whitespace-nowrap "
                                >
                                  {inq.Clinic}
                                </td>
                                <td
                                  className="px-6  py-5"
                                  style={{ whiteSpace: "nowrap" }}
                                >
                                  {inq.Dentist}
                                </td>
                                <td className="px-6  py-5">{inq.Patient} / {inq.PatientId}</td>
                                <td className="px-6  py-5 capitalize">
                                  {inq.CompletedDate}
                                </td>
                                <td className="px-6  py-5 capitalize">
                                  <span class="inline-flex items-center  min-w-max px-3.5 py-0.5 rounded-md  text-xs font-medium bg-indigo-100 text-indigo-800">
                                    {inq.OrderStatus}
                                  </span>
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
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Tasks;
