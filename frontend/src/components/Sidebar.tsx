import { Link, useLocation } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegUser, FaListCheck } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = () => {
  const location = useLocation();

  const hiddenPaths = ["signup", "signin", "admin"];

  if (hiddenPaths.includes(location.pathname.split("/")[1])) {
    return null;
  }

  return (
    <div className="fixed bg-dark h-full w-1/6">
      <h1 className="text-2xl font-bold p-10">RoomSync</h1>
      <ul className="mt-10 text-sm">
        <Link to="/">
          <li
            className={`flex items-center w-full py-5 hover:bg-[#23232E] pl-10 ${
              location.pathname === "/"
                ? "text-white bg-[#23232E]"
                : "text-gray-500"
            }`}
          >
            <MdOutlineDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </li>
        </Link>
        <Link to="/request">
          <li
            className={`flex items-center w-full py-5 hover:bg-[#23232E] pl-10 ${
              location.pathname === "/request"
                ? "text-white bg-[#23232E]"
                : "text-gray-500"
            }`}
          >
            <FaListCheck className="w-5 h-5 mr-3" /> Request
          </li>
        </Link>
        <Link to="/profile">
          <li
            className={`flex items-center w-full py-5 hover:bg-[#23232E] pl-10 ${
              location.pathname === "/profile"
                ? "text-white bg-[#23232E]"
                : "text-gray-500"
            }`}
          >
            <FaRegUser className="w-5 h-5 mr-3" />
            Profile
          </li>
        </Link>
        <Link to="/settings">
          <li
            className={`flex items-center w-full py-5 hover:bg-[#23232E] pl-10 ${
              location.pathname === "/settings"
                ? "text-white bg-[#23232E]"
                : "text-gray-500"
            }`}
          >
            <IoSettingsOutline className="w-5 h-5 mr-3" />
            Settings
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
