"use client";
import Link from "next/link";
import Image from "next/image";
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
  FiberManualRecord,
} from "@mui/icons-material";
import { menuHeader, menuItems } from "@/utils/menuConfig";

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
  },
  [`& .MuiTooltip-arrow`]: {
    color: "#16cdc7",
  },
}));

function MenuCard({ href, icons, title, onClick, disableLink }) {
  return (
    <CustomTooltip title={title} arrow placement="right">
      <Link
        href={href || "#"}
        className="flex items-center justify-center w-12 h-12 p-2 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-xl"
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

function SubMenuCard({ href, text }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-start w-full h-full p-2 text-[#000000] text-md font-[300] hover:text-[#635bff]"
    >
      {text}
    </Link>
  );
}

export default function UiLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

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

  const handleMenuClick = (menuKey) => {
    setSubMenuOpen(subMenuOpen === menuKey ? null : menuKey);
  };

  return (
    <div className="flex flex-row items-start justify-center w-full min-h-screen">
      <div
        ref={sidebarRef}
        className={`${
          mobileSidebarOpen ? "flex" : "hidden"
        } xl:flex flex-row items-start justify-center ${
          sidebarOpen ? "w-[75%] xl:w-[20%]" : "w-[5%]"
        } min-h-screen  fixed left-1 top-1 z-12`}
      >
        <div
          className={`flex flex-col items-center justify-start ${
            sidebarOpen ? "w-[25%]" : "w-[100%]"
          } min-h-screen p-2 bg-[#F3F7FB] overflow-auto `}
        >
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-b-2">
            <button
              className={`flex items-center justify-center w-12 h-12 p-2 ${
                isClicked ? "animate-click" : ""
              }`}
              onClick={toggleSidebar}
            >
              <DehazeOutlined />
            </button>
            <MenuCard
              href="/"
              icons={<AutoGraphOutlined />}
              title="ไฟฟ้าและน้ำ"
            />
            <MenuCard href="/" icons={<CampaignOutlined />} title="ประกาศ" />
            <MenuCard
              href="/"
              icons={<DocumentScannerOutlined />}
              title="เอกสารล่าสุด"
            />
            <MenuCard
              href="/"
              icons={<SlowMotionVideoOutlined />}
              title="คู่มือการใช้งาน"
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-b-2">
            <MenuCard href="/" icons={<CottageOutlined />} title="หน้าหลัก" />
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
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-b-2">
            <MenuCard href="/" icons={<Face5Outlined />} title="โปรไฟล์" />
            <button
              href="/#"
              className="flex items-center justify-center w-12 h-12 p-2 text-[#FFFFFF] bg-[#635bff] hover:bg-[#635bff]/50 rounded-xl"
            >
              <ExitToAppOutlined />
            </button>
          </div>
        </div>

        {sidebarOpen && (
          <div
            className={`flex flex-col items-center justify-start ${
              sidebarOpen ? "w-[75%]" : "w-[0%]"
            } min-h-screen p-2 gap-4 bg-[#FFFFFF] overflow-auto `}
          >
            <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
              <Image
                src="/images/other/company_logo.png"
                alt="company_logo"
                width={50}
                height={50}
                priority={true}
              />
              <p className="p-2 text-[#635bff] text-xl font-[600]">
                Channakorn
              </p>
            </div>

            {subMenuOpen === "hr" && (
              <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                {menuItems.hr.map((item) => (
                  <SubMenuCard
                    key={item.link}
                    href={`/hr/${item.link}`}
                    text={
                      <>
                        <FiberManualRecord
                          style={{ fontSize: "0.5rem", marginRight: "0.5rem" }}
                        />
                        {item.nameTH}
                      </>
                    }
                  />
                ))}
              </div>
            )}

            {subMenuOpen === "it" && (
              <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                {menuItems.it.map((item) => (
                  <SubMenuCard
                    key={item.link}
                    href={`/it/${item.link}`}
                    text={
                      <>
                        <FiberManualRecord
                          style={{ fontSize: "0.5rem", marginRight: "0.5rem" }}
                        />
                        {item.nameTH}
                      </>
                    }
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div
        className={`flex flex-col items-center justify-start w-full ${
          sidebarOpen ? "xl:w-[80%] xl:ml-[20%]" : "xl:w-[95%] xl:ml-[5%]"
        } min-h-screen gap-2 bg-[#FFFFFF] overflow-auto `}
      >
        <div className="flex flex-row items-center justify-between w-full h-16 bg-[#FFFFFF]">
          <div className="flex flex-row items-center justify-start w-full h-full p-2 gap-2">
            <button
              className="xl:hidden flex items-center justify-center w-12 h-12 p-2 gap-2 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-full"
              onClick={toggleMobileSidebar}
            >
              <LayersOutlined />
            </button>
            <button className="xl:flex hidden items-center justify-center w-12 h-12 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-full">
              <SearchOutlined />
            </button>
            <button className="flex items-center justify-center w-12 h-12 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-full">
              <WorkspacesOutlined />
            </button>
          </div>
          <div className="xl:hidden flex flex-row items-center justify-center w-full h-full p-2 gap-2 text-[#635bff] text-xl font-[600]">
            Channakorn
          </div>
          <div className="flex flex-row items-center justify-end w-full h-full p-2 gap-2">
            <button className="flex items-center justify-center w-12 h-12 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-full">
              <NotificationsActiveOutlined />
            </button>
            <div className="flex items-center justify-center w-12 h-12 ">
              <Image
                src="/images/other/company_logo.png"
                alt="company_logo"
                width={500}
                height={120}
                priority={true}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full p-4 min-h-screen">
          <div className="flex items-center justify-center w-full min-h-screen bg-[#F3F7FB] rounded-3xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
