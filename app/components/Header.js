import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  LayersOutlined,
  SearchOutlined,
  WorkspacesOutlined,
  DarkModeOutlined,
  NotificationsActiveOutlined,
} from "@mui/icons-material";
import { useSession } from "next-auth/react";

const Header = ({ toggleMobileSidebar }) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-row items-center justify-center w-[100%] h-full p-2 gap-2">
      <div className="flex items-center justify-start w-full h-full p-2 gap-2">
        <button
          onClick={toggleMobileSidebar}
          className=" xl:hidden flex items-center justify-center w-10 h-10 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-full"
        >
          <LayersOutlined />
        </button>
        <button className="xl:flex hidden items-center justify-center w-10 h-10 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-full">
          <SearchOutlined />
        </button>
        <button className="flex items-center justify-center w-10 h-10 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-full">
          <WorkspacesOutlined />
        </button>
      </div>

      <div className="xl:hidden flex items-center justify-center w-full min-h-16 p-2 gap-2 rounded-xl text-[#635bff] font-[600]">
        Channakorn
      </div>

      <div className="flex flex-row items-center justify-end w-full h-full gap-2">
        <button className="flex items-center justify-center w-10 h-10 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-full">
          <DarkModeOutlined />
        </button>
        <button className="flex items-center justify-center w-10 h-10 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-full">
          <NotificationsActiveOutlined />
        </button>
        <div ref={dropdownRef} className="relative">
          <div
            className="flex items-center justify-center w-10 h-10 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-full cursor-pointer"
            onClick={toggleDropdown}
          >
            <Image
              src={`/images/user_picture/${session?.user?.user_picture_file}`}
              alt="company_logo"
              width={30}
              height={30}
              priority={true}
            />
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[#FFFFFF] rounded-xl shadow-lg p-4 z-20">
              <div className="flex items-center space-x-3 pb-3 border-b">
                <Image
                  src={`/images/user_picture/${session?.user?.user_picture_file}`}
                  alt="profile_picture"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-[600]">
                    {session?.user?.user_firstname}{" "}
                    {session?.user?.user_lastname}{" "}
                    <span className="text-[#16cdc7]">
                      {session?.user?.user_nickname}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {session?.user?.user_email}
                  </p>
                </div>
              </div>
              <ul className="mt-3 space-y-2 text-gray-700">
                <li className="hover:bg-gray-100 p-2 rounded-md cursor-pointer font-[400]">
                  <a href="/profile">โปรไฟล์</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
