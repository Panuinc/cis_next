"use client";
import Link from "next/link";
import Image from "next/image";
import { useSelectedLayoutSegment } from "next/navigation";
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
  CurrencyExchangeOutlined,
  EngineeringOutlined,
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
          ${isActive ? "bg-[#635bff] text-[#FFFFFF]" : "hover:text-[#635bff] hover:bg-[#635bff]/25"}`}
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
  return (
    <div className="flex flex-row items-start justify-center w-full min-h-screen gap-2">
      <div className="xl:flex hidden flex-row items-center justify-center w-[20%] min-h-screen left-0 gap-2 fixed">
        <div className="flex flex-col items-center justify-between w-[25%] h-screen border-2 border-[#000000] border-dashed bg-[#F3F7FB] overflow-auto">
          <div className="flex flex-col items-center justify-center w-[100%] p-2 gap-2">
            <button className="flex items-center justify-center w-12 h-12 p-2 gap-2 text-[#000000] border-2 border-[#000000] border-dashed rounded-xl">
              <DehazeOutlined />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center w-[100%] p-2 gap-2">
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
          <div className="flex flex-col items-center justify-center w-[100%] p-2 gap-2">
            <MenuCard
              href="/profile"
              icons={<Face5Outlined />}
              title="โปรไฟล์"
            />
            <MenuCard
              href="/logout"
              icons={<ExitToAppOutlined />}
              title="ออกจากระบบ"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-[75%] min-h-screen p-2 gap-2 border-2 border-[#000000] border-dashed">
          Submenu
        </div>
      </div>
      <div className="flex flex-col items-center justify-between w-[100%] min-h-screen xl:w-[80%] xl:ml-[20.5%] gap-2">
        <div className="flex flex-col items-center justify-center w-[100%] h-full p-2 gap-2 border-2 border-[#000000] border-dashed">
          Header
        </div>
        <div className="flex flex-col items-center justify-center w-[100%] min-h-screen p-2 gap-2 bg-[#F3F7FB] border-2 border-[#000000] border-dashed rounded-3xl">
          Content
        </div>
      </div>
    </div>
  );
}
