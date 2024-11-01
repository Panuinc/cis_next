"use client";
import Link from "next/link";
import Image from "next/image";
import Loading from "../components/Loading";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { useSelectedLayoutSegment } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import {
  DehazeOutlined,
  CottageOutlined,
  AutoGraphOutlined,
  CampaignOutlined,
  DocumentScannerOutlined,
  SlowMotionVideoOutlined,
  PersonOutlineOutlined,
  ComputerOutlined,
  Face5Outlined,
  ExitToAppOutlined,
  SearchOutlined,
  WorkspacesOutlined,
  NotificationsActiveOutlined,
  LayersOutlined,
  CurrencyExchangeOutlined,
  EngineeringOutlined,
  DarkModeOutlined,
} from "@mui/icons-material";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "#16cdc7",
    color: "#FFFFFF",
    fontSize: "0.875rem",
    padding: "8px 12px",
    borderRadius: "50px",
    boxShadow: theme.shadows[1],
    fontFamily: "var(--prompt)",
  },
  [`& .MuiTooltip-arrow`]: {
    color: "#16cdc7",
  },
}));

function MenuCard({ href = "", icons, title, onClick, disableLink }) {
  const currentSegment = useSelectedLayoutSegment();
  const isActive = currentSegment === href?.split("/")[1];

  return (
    <CustomTooltip title={title} arrow placement="right">
      <Link
        href={href || "#"}
        className={`flex items-center justify-center w-12 h-12 p-2 gap-2 text-[#000000] rounded-xl
          ${
            isActive
              ? "bg-[#635bff] text-[#FFFFFF]"
              : "hover:text-[#635bff] hover:bg-[#635bff]/25"
          }`}
        onClick={(e) => {
          if (disableLink) e.preventDefault();
          if (onClick) onClick();
        }}
      >
        {icons}
      </Link>
    </CustomTooltip>
  );
}

export default function UiLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      toast.error("You Are Not Logged In Yet. Please Log In.", {
        duration: 1000,
      });
      router.push("/");
    }
  }, [session, status, router]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMobileSidebarOpen(false);
      }
    };

    if (mobileSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileSidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const handleMenuClick = (menuKey) => {
    setSubMenuOpen(subMenuOpen === menuKey ? null : menuKey);
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (res.ok) {
        await signOut({ callbackUrl: "/" });
      } else {
        const errorData = await res.json();
        console.error("ออกจากระบบไม่สำเร็จ:", errorData);
      }
    } catch (error) {
      console.error("ออกจากระบบไม่สำเร็จ:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Loading />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-row items-start justify-center w-full min-h-screen gap-2">
      <Toaster position="top-right" reverseOrder={false} />
      <div
        ref={sidebarRef}
        className={`${
          mobileSidebarOpen ? "flex" : "hidden"
        } xl:flex flex-row items-center justify-center ${
          sidebarOpen ? "w-[75%] xl:w-[20%]" : "w-[20%] xl:w-[5%]"
        } min-h-screen left-0 fixed z-10`}
      >
        <div
          className={`flex flex-col items-center justify-start ${
            sidebarOpen ? "w-[25%]" : "w-full"
          } h-screen bg-[#F3F7FB] overflow-auto `}
        >
          <div className="flex flex-col items-center justify-center w-full p-2 gap-2">
            <button
              className={`flex items-center justify-center w-12 h-12 p-2 gap-2 ${
                isClicked ? "animate-click" : ""
              }`}
              onClick={toggleSidebar}
            >
              <DehazeOutlined />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center w-full p-2 gap-2">
            <MenuCard
              href="/home"
              icons={<CottageOutlined />}
              title="หน้าหลัก"
            />
            <MenuCard
              icons={<CurrencyExchangeOutlined />}
              title="จัดซื้อ"
              onClick={() => handleMenuClick("pu")}
              disableLink={true}
            />
            <MenuCard
              icons={<EngineeringOutlined />}
              title="วิศวกรรมโครงสร้างเหล็ก"
              onClick={() => handleMenuClick("pu")}
              disableLink={true}
            />
            <MenuCard
              icons={<PersonOutlineOutlined />}
              title="บุคคล"
              onClick={() => handleMenuClick("hr")}
              disableLink={true}
            />
            <MenuCard
              icons={<ComputerOutlined />}
              title="เทคโนโลยีสารสนเทศ"
              onClick={() => handleMenuClick("it")}
              disableLink={true}
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full p-2 gap-2">
            <MenuCard
              href="/profile"
              icons={<Face5Outlined />}
              title="โปรไฟล์"
            />
            <MenuCard
              href="/#"
              icons={<ExitToAppOutlined />}
              title="ออกจากระบบ"
              onClick={handleSignOut}
            />
          </div>
        </div>
        {sidebarOpen && (
          <div
            className={`flex flex-col items-center justify-start ${
              sidebarOpen ? "w-[75%]" : "w-[0%]"
            } min-h-screen p-2 gap-2 overflow-auto bg-[#FFFFFF]`}
          >
            <div className="flex items-center justify-center w-full h-full p-2 gap-2 text-[#635bff] text-xl font-[600]">
              Channakorn
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed">
              Submenu สวัสดี
            </div>
          </div>
        )}
      </div>
      <div
        className={`flex flex-col items-center justify-between w-full ${
          sidebarOpen ? "xl:w-[80%] xl:ml-[20%]" : "xl:w-[95%] xl:ml-[5%]"
        } min-h-screen gap-2 `}
      >
        <div className="flex flex-row items-center justify-center w-full h-full p-2">
          <div className="flex flex-row items-center justify-start w-full h-full gap-2">
            <button
              onClick={toggleMobileSidebar}
              className=" xl:hidden flex items-center justify-center w-10 h-10 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-full"
            >
              <LayersOutlined />
            </button>
            <button className="flex items-center justify-center w-10 h-10 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-full">
              <SearchOutlined />
            </button>
            <button className="flex items-center justify-center w-10 h-10 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-full">
              <WorkspacesOutlined />
            </button>
          </div>
          <div className="xl:hidden flex flex-row items-center justify-center w-full h-full p-2 gap-2 text-[#635bff] text-xl font-[600]">
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
                      <p className="font-semibold">
                      {session?.user?.user_firstname} {session?.user?.user_lastname}{" "}
                        <span className="text-[#16cdc7]">{session?.user?.user_nickname}</span>
                      </p>
                      <p className="text-sm text-gray-500">{session?.user?.user_email}</p>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-2 text-gray-700">
                    <li className="hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                      My Profile
                    </li>
                    <li className="hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                      Account Settings
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full min-h-screen px-4 py-2">
          <div className="flex items-center justify-center w-full min-h-screen p-2 gap-2 bg-[#F3F7FB] rounded-3xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
