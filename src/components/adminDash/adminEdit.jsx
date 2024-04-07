import React, { useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Layout} from "antd";
import Sidebar from "./sidebar";
import ProfEdit from "../profile/editprofile"
const {Content, Sider } = Layout;
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
  const dispatch = useDispatch();
  const role = useSelector((state) => state.option);
  const router = useNavigate();
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
            <ProfEdit/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
