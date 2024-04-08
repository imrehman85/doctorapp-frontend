import React, { useState, useEffect } from "react";
import { Button, DatePicker, Collapse, } from "antd";
import axios from "axios";
import profile from "../../Images/profile.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  SendOutlined,
  LeftOutlined,
  UpOutlined,
  DownOutlined,
  CaretRightOutlined
} from "@ant-design/icons";
const { Panel } = Collapse;
const Task = () => {
  const router = useNavigate();
  const dispatch= useDispatch();
  const [showExternalChat, setShowExternalChat] = useState(true);
  const [showInternalChat, setShowInternalChat] = useState(false);
  const dataUser = useSelector((state) => state.dataUser)
  const [date, setDate] = useState(false);
  const [dateP, setDateP] = useState(false);
  const token = useSelector((state) => state.token);
  const caseId = useSelector((state) => state.caseId);
  const reset = useSelector((state) => state.reset);
  const [inquiries, setInquiries] = useState([]);
  const [status, setStatus] = useState("");
console.log("data user",dataUser)
  const toggleInternalChat = () => {
    setShowExternalChat(!showExternalChat);
    setShowInternalChat(!showInternalChat);
  };

  useEffect(() => {
    axios
      .get(`http://91.108.104.16:5000/api/case/get-case-by-id/${caseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setStatus(data?.data?.status);
        setInquiries(data?.data);
        const datee = data?.data?.deliveryPresentationDate.split("T")[0];
        setDateP(datee);
        console.log(data);
      })
      .catch((err) => {});
  }, [reset]);

  const handleConfirm = () => {
    console.log("Doneeeeeeeeeeee");
    axios
      .post(
        `http://91.108.104.16:5000/api/Case/case-status-pending-complete?id=${caseId}&date=${date}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch({ type: "RESET" });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleComplete = () => {
    console.log("Doneeeeeeeeeeee");
    axios
      .post(
        `http://91.108.104.16:5000/api/case/case-status-complete?id=${caseId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch({ type: "RESET" });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
              <LeftOutlined className="w-3 h-3 mr-2 text-blue-600 text-primary dark:text-white" />
              BACK
            </div>
            <div class="flex flex-row justify-between items-center w-full py-6 px-6 rounded-xl border border-blue-200 shadow-sm bg-white undefined">
              <div>
                <h1 class="text-base font-medium">Impression Status</h1>
              </div>
              <span class="inline-flex items-center  min-w-max px-3.5 py-0.5 rounded-md  text-xs font-medium bg-indigo-100 text-indigo-500">
                {inquiries?.status}
              </span>
            </div>
            {status==="Complete" && <div className="">
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
            </div>}
            {status === "Reviewed" && (
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
                      <DatePicker
                        className="w-full mb-2 p-2 h-10 text-gray-800 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-gray-700"
                        placeholder="Select Date"
                        value={date}
                        onChange={(e) => setDate(e)}
                      />
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleConfirm}
                  type="primary"
                  class="rounded-lg focus:outline-none focus:ring-4 text-white bg-blue-400 hover:bg-blue-500 focus:ring-blue-faded px-3 py-1.5 mr-1 h-[41px] text-sm font-medium mobile:text-xs mobile:h-[35px] mobile:w-[170px] flex items-center justify-center"
                >
                  Set & Confirm
                </Button>
              </div>
            )}
            {status === "Pending Complete" && (
              <div class="p-6 border border-gray-200 shadow-sm rounded-md">
                <label class="font-bold text-lg">
                  Delivery Presentation Date
                </label>
                <p class="text-sm text-gray-500 mb-3">
                  {dateP}
                </p>
                <Button
                  onClick={handleComplete}
                  type="primary"
                  class="rounded-lg focus:outline-none focus:ring-4 text-white bg-blue-400 hover:bg-blue-500 focus:ring-blue-faded px-3 py-1.5 mr-1 h-[41px] text-sm font-medium mobile:text-xs mobile:h-[35px] mobile:w-[170px] flex items-center justify-center"
                >
                  Mark as Completed
                </Button>
              </div>
            )}
            {status==="Pending Complete" && <div class="border rounded-md p-4 bg-blue-100">
              <div class="flex justify-between p-4 sm:flex-row flex-col">
                <h1 class="text-lg font-semibold leading-none">
                  Pay Now
                </h1>
              </div>
                    <Collapse
                        // defaultActiveKey={["1"]}
                        accordion={true}
                        // onChange={callback}
                        style={{ backgroundColor: "white" }}
                    >
                        <Panel
                            header="Citibank"
                            key="1"
                            className="p-3 text-md text-gray-800 flex flex-col gap-4"
                        >
                          <div className="w-full flex flex-wrap flex-col gap-2">
                          <div className="flex gap-6"><h1 className="font-semibold w-[7rem]">Bank name</h1>
                          <p>Citibank</p></div>
                          <div className="flex gap-6"><h1 className="font-semibold w-[7rem]">Transfer type</h1>
                          <p>Local transfer</p></div>
                          <div className="flex gap-6"><h1 className="font-semibold w-[7rem]">Bank Address</h1>
                          <p>111 Wall Street New York, NY 10043 USA</p></div>
                          <div className="flex gap-6"><h1 className="font-semibold w-[7rem]">Routing (ABA)</h1>
                          <p>031100209</p></div>
                          <div className="flex gap-6"><h1 className="font-semibold w-[7rem]">SWIFT Code</h1>
                          <p>CITIUS33</p></div>
                          <div className="flex gap-6"><h1 className="font-semibold w-[7rem]">Account number</h1>
                          <p id="accountNumber" className="cursor-pointer font-semibold">70580380000271071</p></div>
                          <div className="flex gap-6"><h1 className="font-semibold w-[7rem]">Account type</h1>
                          <p>CHECKING</p></div>
                          <div className="flex gap-6"><h1 className="font-semibold w-[7rem]">Beneficiary name</h1>
                          <p>Ayesha Aslam</p></div>
                          </div>
                        </Panel>
                        <Panel
                            header="Banking Circle S.A."
                            key="2"
                            className="p-3 text-md text-gray-800"
                        >
                            <div className="w-full flex flex-wrap flex-col gap-2">
                          <div className="flex gap-6"><h1 className="font-semibold w-[7rem]">Bank name</h1>
                          <p>Banking Circle S.A.</p></div>
                          <div className="flex gap-6"><h1 className="font-semibold w-[7rem]">Transfer type</h1>
                          <p>Local transfer</p></div>
                          <div className="flex gap-6"><h1 className="font-semibold w-[7rem]">Bank Address</h1>
                          <p>2, Boulevard de la Foire L-1528 LUXEMBOURG </p></div>
                          <div className="flex gap-6"><h1 className="font-semibold w-[7rem]">IBAN</h1>
                          <p className="cursor-pointer font-semibold">LU524080000023502874</p></div>
                          <div className="flex gap-6"><h1 className="font-semibold w-[7rem]">BIC</h1>
                          <p>BCIRLULL</p></div>
                          <div className="flex gap-6"><h1 className="font-semibold w-[7rem]">Beneficiary name</h1>
                          <p>Ayesha Aslam</p></div>
                          </div>
                        </Panel>

                        <Panel
                            header="Barclays"
                            key="3"
                            className="p-3 text-md text-gray-800"
                        >
                            <div className="w-full flex flex-wrap flex-col gap-2">
                          <div className="flex gap-6"><h1 className="font-semibold w-[7rem]">Bank name</h1>
                          <p>Barclays</p></div>
                          <div className="flex gap-6"><h1 className="font-semibold w-[7rem]">Transfer type</h1>
                          <p>Local transfer</p></div>
                          <div className="flex gap-6"><h1 className="font-semibold w-[7rem]">Sort code</h1>
                          <p>231486</p></div>
                          <div className="flex gap-6"><h1 className="font-semibold w-[7rem]">Account number</h1>
                          <p className="cursor-pointer font-semibold">15011390</p></div>
                          <div className="flex gap-6"><h1 className="font-semibold w-[7rem]">Beneficiary name</h1>
                          <p>Ayesha Aslam</p></div>
                          </div>
                        </Panel>
                        <Panel
                            header="PayPal"
                            key="4"
                            className="p-3 text-md text-gray-800"
                        >
                          <div className="w-full flex flex-wrap flex-col gap-2">
                          <div className="flex gap-6"><h1 className="font-semibold w-[7rem]">Email</h1>
                          <p className="cursor-pointer font-semibold">ayeshaaslam0987@gmail.com</p></div></div>
                        </Panel>
                    </Collapse>
                </div>}
            {(status === "Reviewed" ||
              status === "Pending Complete" ||
              status === "Complete") && (
              <div class="p-6 border border-gray-200 shadow-sm rounded-md">
                <label class="font-bold text-lg">Comment By Admin</label>
                <p class="text-sm text-gray-500 mb-3">{inquiries?.comments}</p>
              </div>
            )}
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
                      {inquiries?.firstName} {inquiries?.lastName}
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
                    {inquiries?.$id}
                  </span>
                </div>
                <div class="flex flex-row justify-between">
                  <span class="text-sm font-semibold leading-none text-gray-900">
                    Gender
                  </span>
                  <span class="text-base mt-1.5 font-normal leading-6 text-gray-500 max-w-[75%] text-end">
                    {inquiries?.gender}
                  </span>
                </div>
                <div class="flex flex-row justify-between">
                  <span className="text-sm font-semibold leading-none text-gray-900">
                    Impression Type
                  </span>
                  <span className="text-base mt-1.5 font-normal leading-6 text-gray-500 max-w-[75%] text-end">
                    {inquiries?.impressionType}
                  </span>
                </div>
                <div class="flex flex-row justify-between">
                  <span class="text-sm font-semibold leading-none text-gray-900">
                    Age
                  </span>
                  <span class="text-base mt-1.5 font-normal leading-6 text-gray-500 max-w-[75%] text-end">
                    {inquiries?.age}
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
                    <span class="text-base text-gray-500">{inquiries?.notes}</span>
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
                      {dataUser?.clinicName}
                    </p>
                    <div class="sm:text-sm text-gray-500 font-light text-xs">
                      {dataUser?.phoneNumber}
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
                    {dataUser?.firstName} {dataUser?.lastName}
                  </span>
                </div>
                <div class="flex flex-row justify-between">
                  <span class="text-sm font-semibold leading-none text-gray-900">
                    Dentist Email
                  </span>
                  <span class="text-base mt-1.5 font-normal leading-6 text-gray-500 max-w-[75%] text-end">
                    {dataUser?.email}
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
