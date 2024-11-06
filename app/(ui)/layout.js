"use client";
import {
  DehazeOutlined,
  AddHomeOutlined,
  Person4Outlined,
  PhonelinkOutlined,
  StarBorderOutlined,
  DataUsageOutlined,
  SettingsSuggestOutlined,
  ReportProblemOutlined,
  CloudSyncOutlined,
  AutoGraphOutlined,
  ExitToAppOutlined,
  LayersOutlined,
  SearchOutlined,
  WorkspacesOutlined,
  DarkModeOutlined,
  NotificationsActiveOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import { styled } from "@mui/system";
import Tooltip from "@mui/material/Tooltip";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";
import { usePathname } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { useSession, signOut } from "next-auth/react";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "#16cdc7",
    color: "#FFFFFF",
    fontSize: "0.875rem",
    padding: "8px 12px",
    borderRadius: "50px",
    boxShadow: theme?.shadows?.[1] || "0px 2px 4px rgba(0, 0, 0, 0.1)",
    fontFamily: "var(--prompt)",
  },
  [`& .MuiTooltip-arrow`]: {
    color: "#16cdc7",
  },
}));

const MainMenu = ({ icon, href = "", tooltip, onClick }) => {
  const pathname = usePathname();
  const isActive = `/${pathname.split("/")[1]}` === href;

  return (
    <CustomTooltip title={tooltip} arrow placement="right">
      <Link
        href={href || "#"}
        className={`flex items-center justify-center min-w-16 min-h-16 p-2 gap-2 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-xl ${
          isActive
            ? "bg-[#635bff] text-[#FFFFFF]"
            : "hover:text-[#635bff] hover:bg-[#635bff]/25"
        }`}
        onClick={onClick}
      >
        <div>{icon}</div>
      </Link>
    </CustomTooltip>
  );
};

const Section = ({ title, icon, links }) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col items-center w-full p-2 gap-2 border-b-2">
      <div className="flex items-center w-full p-2 gap-2 font-[600]">
        {icon} {title}
      </div>
      {links.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center w-full min-h-16 px-6 py-2 gap-2 rounded-xl ${
              isActive
                ? "bg-[#635bff] text-[#FFFFFF] rounded-xl shadow-md"
                : "hover:text-[#635bff] "
            }`}
          >
            <DataUsageOutlined /> {label}
          </Link>
        );
      })}
    </div>
  );
};

export default function UiLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const pathname = usePathname();
  const arraypath = pathname.split("/");
  const cleanedPathname = arraypath[1];
  const [subMenuOpen, setSubMenuOpen] = useState(cleanedPathname);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [openSubMenus, setOpenSubMenus] = useState({
    hr: false,
    hrWarning: false,
    itMaintenance: false,
    itEquipment: false,
  });

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
  const toggleSubMenu = (menuKey) => {
    setOpenSubMenus((prevState) => ({
      ...prevState,
      [menuKey]: !prevState[menuKey],
    }));
  };

  const [selectedMenu, setSelectedMenu] = useState(null);
  useEffect(() => {
    const savedMenu = localStorage.getItem("selectedMenu");
    if (savedMenu) {
      setSelectedMenu(savedMenu);
    }
  }, []);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    localStorage.setItem("selectedMenu", menu);
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
    <div className="flex flex-row items-start justify-start w-full min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <div
        ref={sidebarRef}
        className={`${
          mobileSidebarOpen ? "flex" : "hidden"
        } xl:flex flex-row items-center justify-center ${
          sidebarOpen ? "w-[75%] xl:w-[25%]" : "w-[25%] xl:w-[5%]"
        } min-h-screen fixed z-10`}
      >
        <div
          className={`flex flex-col items-center justify-start ${
            sidebarOpen ? "w-[25%]" : "w-full"
          } h-screen p-2 gap-2 bg-[#F3F7FB] overflow-auto`}
        >
          <MainMenu icon={<DehazeOutlined />} onClick={toggleSidebar} />
          <MainMenu
            href="/home"
            icon={<AddHomeOutlined />}
            tooltip="HOME"
            onClick={() => handleMenuClick("HOME")}
          />
          <MainMenu
            href="/hr"
            icon={<Person4Outlined />}
            tooltip="HR"
            onClick={() => handleMenuClick("HR")}
          />
          <MainMenu
            href="/it"
            icon={<PhonelinkOutlined />}
            tooltip="IT"
            onClick={() => handleMenuClick("IT")}
          />
          <MainMenu href="/iso" icon={<StarBorderOutlined />} tooltip="ISO" />
          <MainMenu
            href="/#"
            icon={<ExitToAppOutlined />}
            tooltip="Logout"
            onClick={handleSignOut}
          />
        </div>
        {sidebarOpen && (
          <div
            className={`flex flex-col items-center justify-start ${
              sidebarOpen ? "w-[75%]" : "w-[0%]"
            } h-screen p-2 gap-2 bg-[#FFFFFF]`}
          >
            <div className="flex items-center justify-center w-full min-h-16 p-2 gap-2 rounded-xl text-[#635bff] font-[600]">
              Channakorn Engineer
            </div>
            <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 rounded-xl overflow-auto">
              {selectedMenu === "HOME" && (
                <>
                  <Section
                    title="Home"
                    icon={<AutoGraphOutlined />}
                    links={[{ href: "/home", label: "Dashboard 1" }]}
                  />
                </>
              )}
              {selectedMenu === "HR" && (
                <>
                  <Section
                    title="Setting"
                    icon={<SettingsSuggestOutlined />}
                    links={[
                      { href: "/hr/branch", label: "Branch" },
                      { href: "/hr/site", label: "Site" },
                      { href: "/hr/division", label: "Division" },
                      { href: "/hr/department", label: "Department" },
                      { href: "/hr/position", label: "Position" },
                      { href: "/hr/role", label: "Role" },
                      { href: "/hr/user", label: "User" },
                    ]}
                  />
                  <Section
                    title="Warning"
                    icon={<ReportProblemOutlined />}
                    links={[
                      { href: "/hr/warning_topic", label: "Warning Topic" },
                      { href: "/hr/warning_detail", label: "Warning Detail" },
                      { href: "/hr/warning_user", label: "Warning User" },
                    ]}
                  />
                </>
              )}
              {selectedMenu === "IT" && (
                <>
                  <Section
                    title="Back Up"
                    icon={<CloudSyncOutlined />}
                    links={[
                      { href: "/it/backup", label: "BackUp" },
                      { href: "/it/maintenance", label: "Maintenance" },
                    ]}
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div
        className={`flex flex-col items-center justify-start w-full ${
          sidebarOpen ? "xl:w-[75%] xl:ml-[26%]" : "xl:w-[95%] xl:ml-[6%]"
        } min-h-screen gap-2 `}
      >
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
                      <p className="font-semibold">
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
        <div className="flex flex-row items-start justify-center w-[100%] min-h-screen p-10 gap-2 bg-[#F3F7FB] rounded-3xl">
          {children}
        </div>
      </div>
    </div>
  );
}
