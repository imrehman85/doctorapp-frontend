import { Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogoutOutlined } from "@ant-design/icons";
import profile from "../../Images/profile.png";
import { useSelector } from "react-redux";
import {DownOutlined} from "@ant-design/icons"
const Header = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.option);
  const router = useNavigate();

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
  const onClick1 = ({ key }) => {
    if (key === "4") {
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
    <div className="p-4 flex justify-end px-14 py-10 items-center sm:flex-row flex-col-reverse">
      <Dropdown
        className="mr-5"
        placement="bottomLeft"
        overlayClassName="custom-dropdown-menu"
        menu={{
          items: items,
          onClick: onClick1,
        }}
      >
        <div className="w-[14rem] h-[4rem] flex items-center justify-center rounded-lg bg-indigo-100 shadow-md">
          <a
            className="flex items-center justify-between w-full px-4"
            onClick={(e) => e.preventDefault()}
          >
            <div className="flex">
              <img
                src={profile}
                alt="profile pic"
                className="w-[2.375rem] h-[2.375rem] rounded-full mr-2 object-cover"
              />
              <div>
              <h1 className="font-semibold">Abu Bakar</h1>
              <p className="capitalize">{role}</p>
            </div></div>
            <DownOutlined/>
          </a>
        </div>
      </Dropdown>
    </div>
  );
};

export default Header;
