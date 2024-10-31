"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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
  DarkModeOutlined,
  NotificationsActiveOutlined,
  LayersOutlined,
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
        className="flex items-center justify-center w-14 h-14 p-2 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-xl border-2 border-[#000000] border-dashed"
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
      className="flex items-center justify-start w-full h-full p-2 text-[#000000] text-md font-[300] hover:text-[#635bff] rounded-xl border-2 border-[#000000] border-dashed"
    >
      {text}
    </Link>
  );
}

export default function UiLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false); // สำหรับมือถือ

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen); // ฟังก์ชันเปิดปิดมือถือ
  };

  const handleMenuClick = (menuKey) => {
    setSubMenuOpen(subMenuOpen === menuKey ? null : menuKey);
  };

  return (
    <div className="flex flex-row items-start justify-center w-full min-h-screen gap-2">
      <div
        className={`${
          mobileSidebarOpen ? "flex" : "hidden"
        } xl:flex flex-row items-start justify-center ${
          sidebarOpen ? "w-3/12" : "w-1/12"
        } min-h-screen p-2 gap-2 border-2 border-[#000000] border-dashed bg-[#FFFFFF] transition-all duration-500 ease-in-out fixed left-0 top-0 z-10`}
      >
       <div
          className={`flex flex-col items-center justify-start ${
            sidebarOpen ? "w-3/12" : "w-full"
          } min-h-screen p-2 gap-2 border-2 border-[#000000] border-dashed bg-[#F3F7FB] overflow-auto transition-all duration-500 ease-in-out`}
        >
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-b-2">
            <button
              className={`flex items-center justify-center w-14 h-14 p-2 border-2 border-[#000000] border-dashed rounded-xl ${
                isClicked ? "animate-click" : ""
              }`}
              onClick={toggleSidebar}
            >
              <DehazeOutlined />
            </button>
            <MenuCard
              href="/"
              icons={<AutoGraphOutlined style={{ fontSize: "1.5rem" }} />}
              title="ไฟฟ้าและน้ำ"
            />
            <MenuCard
              href="/"
              icons={<CampaignOutlined style={{ fontSize: "1.5rem" }} />}
              title="ประกาศ"
            />
            <MenuCard
              href="/"
              icons={<DocumentScannerOutlined style={{ fontSize: "1.5rem" }} />}
              title="เอกสารล่าสุด"
            />
            <MenuCard
              href="/"
              icons={<SlowMotionVideoOutlined style={{ fontSize: "1.5rem" }} />}
              title="คู่มือการใช้งาน"
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-b-2">
            <MenuCard
              href="/"
              icons={<CottageOutlined style={{ fontSize: "1.5rem" }} />}
              title="หน้าหลัก"
            />
            <MenuCard
              icons={<PersonOutlineOutlined style={{ fontSize: "1.5rem" }} />}
              title="บุคคล"
              onClick={() => handleMenuClick("hr")}
              disableLink={true}
            />
            <MenuCard
              icons={<ComputerOutlined style={{ fontSize: "1.5rem" }} />}
              title="เทคโนโลยีสารสนเทศ"
              onClick={() => handleMenuClick("it")}
              disableLink={true}
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-b-2">
            <MenuCard
              href="/"
              icons={<Face5Outlined style={{ fontSize: "1.5rem" }} />}
              title="โปรไฟล์"
            />
            <button
              href="/#"
              className="flex items-center justify-center w-14 h-14 p-2 text-[#FFFFFF] bg-[#635bff] hover:bg-[#635bff]/50 rounded-xl"
            >
              <ExitToAppOutlined style={{ fontSize: "1.5rem" }} />
            </button>
          </div>
        </div>

        {sidebarOpen && (
          <div
            className={`flex flex-col items-center justify-start ${
              sidebarOpen ? "w-9/12" : "w-0"
            } min-h-screen p-2 gap-2 border-2 border-[#000000] border-dashed bg-[#FFFFFF] overflow-auto transition-all duration-500 ease-in-out`}
          >
            <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed rounded-xl">
              <Image
                src="/images/other/company_logo.png"
                alt="company_logo"
                width={50}
                height={50}
                priority={true}
              />
              Channakorn - Cis
            </div>

            {subMenuOpen === "hr" && (
              <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed rounded-xl">
                {menuItems.hr.map((item) => (
                  <SubMenuCard
                    key={item.link}
                    href={`/hr/${item.link}`}
                    text={item.nameTH}
                  />
                ))}
              </div>
            )}

            {subMenuOpen === "it" && (
              <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed rounded-xl">
                {menuItems.it.map((item) => (
                  <SubMenuCard
                    key={item.link}
                    href={`/it/${item.link}`}
                    text={item.nameTH}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div
        className={`flex flex-col items-center justify-start w-full ${
          sidebarOpen ? "xl:w-9/12 xl:ml-[25%]" : "xl:w-full xl:ml-[8.3%]"
        } min-h-screen p-2 gap-2 border-2 border-[#000000] border-dashed bg-[#F3F7FB] overflow-auto transition-all duration-500 ease-in-out`}
      >
        <div className="flex flex-row items-center justify-between w-full h-16 bg-[#FFFFFF]">
          <div className="flex flex-row items-center justify-start w-full h-full p-2 gap-2 bg-[#FFFFFF] border-2 border-[#000000] border-dashed">
          <button
              className="xl:hidden flex items-center justify-center w-12 h-12 p-2 gap-2 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-xl border-2 border-[#000000] border-dashed"
              onClick={toggleMobileSidebar}
            >
              <LayersOutlined style={{ fontSize: "1.5rem" }} />
            </button>
            <button className="flex items-center justify-center w-12 h-12 p-2 gap-2 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-xl border-2 border-[#000000] border-dashed">
              <SearchOutlined style={{ fontSize: "1.5rem" }} />
            </button>
            <button className="flex items-center justify-center w-12 h-12 p-2 gap-2 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-xl border-2 border-[#000000] border-dashed">
              <WorkspacesOutlined style={{ fontSize: "1.5rem" }} />
            </button>
          </div>
          <div className="flex flex-row items-center justify-end w-full h-full p-2 gap-2 bg-[#FFFFFF] border-2 border-[#000000] border-dashed">
            <button className="flex items-center justify-center w-12 h-12 p-2 gap-2 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-xl border-2 border-[#000000] border-dashed">
              <DarkModeOutlined style={{ fontSize: "1.5rem" }} />
            </button>
            <button className="flex items-center justify-center w-12 h-12 p-2 gap-2 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-xl border-2 border-[#000000] border-dashed">
              <NotificationsActiveOutlined style={{ fontSize: "1.5rem" }} />
            </button>
            <div className="flex items-center justify-center w-12 h-12 p-2 gap-2 border-2 border-[#000000] border-dashed rounded-xl">
              <Image
                src="/images/other/company_logo.png"
                alt="company_logo"
                width={500}
                height={100}
                priority={true}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full min-h-screen p-2 gap-2 border-2 border-[#000000] border-dashed bg-[#F3F7FB] rounded-3xl overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
