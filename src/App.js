import './App.css';
import { Routes, Route } from "react-router-dom";
import React from 'react';
import { useSelector } from "react-redux";
import Login from './components/Pages/Login';
import Forgot from './components/Pages/Forgot';
import Dashboard from './components/Pages/DashBoard';
import Protected from "./components/protected";
import Inquiries from './components/Pages/inquiries';
import Tasks from './components/Pages/tasks';
import Profile from './components/Pages/profile';
import Privacy from './components/Pages/privacy';
import ProfileEdit from './components/Pages/editProfile';
import Support from './components/Pages/support';
import Inquiry from './components/Pages/inquiry';
import Tsk from './components/Pages/taskpage';
import Transections from './components/Pages/Transections';
import AdminDash from './components/Pages/adminDash';
import TaskComp from './components/Pages/taskComp';
import AdminProf from './components/Pages/adminProf';
import AdminProfEdit from './components/Pages/AdminEditProf';
import Cliniclisting from './components/Pages/cliniclisting';
import Orders from './components/Pages/ordersListings';
import DApproval from './components/Pages/dentistApproval';
import InquiryEdit from './components/Pages/inquiryPick';
import DViewer from './components/3D/sd';


function App() {
  const authState=  useSelector((state) => state.authState);
console.log(authState)
  return (
    <div>
      <Routes>
      {/* <Route path="/" element={<Landing />} exact></Route> */}
        <Route path="/" element={<Login />} exact></Route>
        {/* <Route path="/" element={<DViewer />} exact></Route> */}
        <Route path="/ForgotPassword" element={<Forgot />} exact></Route>
        <Route
          path="/adminDashboard"
          element={
            <Protected isSignedIn={authState}>
              <Dashboard />
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/player"
          element={
            <Protected isSignedIn={authState}>
              <DViewer />
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/DoctorDashboard"
          element={
            <Protected isSignedIn={authState}>
              <Dashboard />
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/dashboard/taskCompdetail"
          element={
            <Protected isSignedIn={authState}>
              <TaskComp />
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/adminDashboard/AdminProf"
          element={
            <Protected isSignedIn={authState}>
              <AdminProf />
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/adminDashboard/viewDoc"
          element={
            <Protected isSignedIn={authState}>
              <Profile/>
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/adminDashboard/AdminProfEdit"
          element={
            <Protected isSignedIn={authState}>
              <AdminProfEdit />
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/adminDashboard/DoctorEdit"
          element={
            <Protected isSignedIn={authState}>
              <ProfileEdit/>
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/Admindashboard/transections"
          element={
            <Protected isSignedIn={authState}>
              <Transections/>
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/dashboard/transections"
          element={
            <Protected isSignedIn={authState}>
              <Transections/>
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/dentistDashboard"
          element={
            <Protected isSignedIn={authState}>
              <AdminDash />
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/dashboard/inquires"
          element={
            <Protected isSignedIn={authState}>
              <Inquiries />
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/dashboard/inquiryEdit"
          element={
            <Protected isSignedIn={authState}>
              <InquiryEdit />
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/dashboard/tasks"
          element={
            <Protected isSignedIn={authState}>
              <Tasks />
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/dashboard/dentistApproval"
          element={
            <Protected isSignedIn={authState}>
              <DApproval />
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/dashboard/viewer"
          element={
            <Protected isSignedIn={authState}>
              <DViewer />
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/dashboard/orders"
          element={
            <Protected isSignedIn={authState}>
              <Orders />
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/Admindashboard/clinics"
          element={
            <Protected isSignedIn={authState}>
              <Cliniclisting />
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/dashboard/clinics"
          element={
            <Protected isSignedIn={authState}>
              <Cliniclisting />
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/dashboard/Profile"
          element={
            <Protected isSignedIn={authState}>
              <Profile/>
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/dashboard/Profile/Edit"
          element={
            <Protected isSignedIn={authState}>
              <ProfileEdit/>
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/dashboard/Privacy"
          element={
            <Protected isSignedIn={authState}>
              <Privacy/>
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/dashboard/Support"
          element={
            <Protected isSignedIn={authState}>
              <Support/>
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/dashboard/inquiry"
          element={
            <Protected isSignedIn={authState}>
              <Inquiry/>
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/Admindashboard/inquiry"
          element={
            <Protected isSignedIn={authState}>
              <Inquiry/>
            </Protected>
          }
          exact
        ></Route>
        <Route
          path="/dashboard/taskdetail"
          element={
            <Protected isSignedIn={authState}>
              <Tsk/>
            </Protected>
          }
          exact
        ></Route>
        </Routes>
    </div>
  );
}

export default App;
