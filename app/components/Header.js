import React from "react";
import Image from "next/image";
import {
  DehazeOutlined,
  SearchOutlined,
  WorkspacesOutlined,
  DarkModeOutlined,
  NotificationsActiveOutlined,
} from "@mui/icons-material";

export default function Header() {
  return (
    <div className="flex flex-row items-center justify-between w-full h-16 bg-[#FFFFFF]">
      <div className="flex flex-row items-center justify-start w-full h-full p-2 gap-2 bg-[#FFFFFF] border-2 border-[#000000] border-dashed">
        <button className="flex items-center justify-center w-12 h-12 p-2 gap-2 border-2 border-[#000000] border-dashed rounded-xl">
          <DehazeOutlined />
        </button>
        <button className="flex items-center justify-center w-12 h-12 p-2 gap-2 border-2 border-[#000000] border-dashed rounded-xl">
          <SearchOutlined />
        </button>
        <button className="flex items-center justify-center w-12 h-12 p-2 gap-2 border-2 border-[#000000] border-dashed rounded-xl">
          <WorkspacesOutlined />
        </button>
      </div>
      <div className="flex flex-row items-center justify-end w-full h-full p-2 gap-2 bg-[#FFFFFF] border-2 border-[#000000] border-dashed">
        <button className="flex items-center justify-center w-12 h-12 p-2 gap-2 border-2 border-[#000000] border-dashed rounded-xl">
          <DarkModeOutlined />
        </button>
        <button className="flex items-center justify-center w-12 h-12 p-2 gap-2 border-2 border-[#000000] border-dashed rounded-xl">
          <NotificationsActiveOutlined />
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
  );
}
