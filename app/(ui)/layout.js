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
      className="flex items-center justify-start w-full h-full p-2 text-[#000000] hover:text-[#635bff] rounded-xl border-2 border-[#000000] border-dashed"
    >
      {text}
    </Link>
  );
}

export default function UiLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  const handleMenuClick = (menuKey) => {
    setSubMenuOpen(subMenuOpen === menuKey ? null : menuKey);
  };

  return (
    <div className="flex flex-row items-center justify-center w-full min-h-screen p-2 gap-2 border-2 border-[#000000] border-dashed">
      <div className="flex flex-col items-center justify-start w-1/12 min-h-screen p-2 gap-2 border-2 border-[#000000] border-dashed bg-[#F3F7FB] overflow-auto">
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
            icons={<Face5Outlined style={{ fontSize: "2rem" }} />}
            title="โปรไฟล์"
          />
          <button
            href="/#"
            className="flex items-center justify-center w-14 h-14 p-2 text-[#FFFFFF] bg-[#635bff] hover:bg-[#635bff]/50 rounded-xl"
          >
            <ExitToAppOutlined />
          </button>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className={`flex flex-col items-center justify-start min-h-screen p-2 gap-2 border-2 border-[#000000] border-dashed bg-[#F3F7FB] overflow-auto transition-all duration-500 ease-in-out transform ${
            sidebarOpen ? "w-2/12 opacity-100" : "w-0 opacity-0"
          }`}
          style={{ transition: "width 0.5s ease, opacity 0.5s ease" }}
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

      <div
        className={`flex flex-col items-center justify-center ${
          sidebarOpen ? "w-9/12" : "w-full"
        } min-h-screen p-2 gap-2 border-2 border-[#000000] border-dashed`}
      >
        {children}
      </div>
    </div>
  );
}
