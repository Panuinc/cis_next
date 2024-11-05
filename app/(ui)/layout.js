"use client";
import {
  DehazeOutlined,
  AddHomeOutlined,
  Person4Outlined,
  PhonelinkOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import { styled } from "@mui/system";
import Tooltip from "@mui/material/Tooltip";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "#16cdc7",
    color: "#FFFFFF",
    fontSize: "0.875rem",
    padding: "8px 12px",
    borderRadius: "50px",
    boxShadow: theme?.shadows?.[1] || "0px 2px 4px rgba(0, 0, 0, 0.1)", // ป้องกันข้อผิดพลาดเมื่อ theme ไม่มีค่า
    fontFamily: "var(--prompt)",
  },
  [`& .MuiTooltip-arrow`]: {
    color: "#16cdc7",
  },
}));

const MainMenu = ({ icon, href = "", tooltip }) => {
  return (
    <CustomTooltip title={tooltip} arrow placement="right">
      <Link
        href={href || "#"}
        className="flex items-center justify-center min-w-16 min-h-16 p-2 gap-2 hover:text-[#635bff] hover:bg-[#635bff]/25  rounded-xl"
      >
        <div>{icon}</div>
      </Link>
    </CustomTooltip>
  );
};

export default function UiLayout({ children }) {
  return (
    <div className="flex flex-row items-start justify-start w-full min-h-screen">
      <div className="flex flex-row items-center justify-center w-[25%] min-h-screen gap-2 fixed">
        <div className="flex flex-col items-center justify-start w-[25%] h-screen p-2 gap-2 border-2 border-[#000000] border-dashed overflow-auto">
          <MainMenu icon={<DehazeOutlined />} />
          <MainMenu
            href="/home"
            icon={<AddHomeOutlined />}
            tooltip="Go to Home"
          />
          <MainMenu
            href="/home"
            icon={<Person4Outlined />}
            tooltip="HR Section"
          />
          <MainMenu
            href="/home"
            icon={<PhonelinkOutlined />}
            tooltip="IT Section"
          />
        </div>
        <div className="flex flex-col items-center justify-start w-[75%] h-screen p-2 gap-2 border-2 border-[#000000] border-dashed">
          <div className="flex items-center justify-center w-full min-h-16 p-2 gap-2 border-2 border-[#000000] border-dashed rounded-xl text-[#635bff] font-[600]">
            Channakorn Engineer
          </div>
          <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed rounded-xl overflow-auto">
            <div className="flex flex-col items-start justify-center w-full p-2 gap-2 border-2 border-[#000000] border-dashed rounded-xl">
              Setting
              <div className="flex items-center justify-center w-full min-h-16 p-2 gap-2 border-2 border-[#000000] border-dashed rounded-xl">
                2
              </div>
              <div className="flex items-center justify-center w-full min-h-16 p-2 gap-2 border-2 border-[#000000] border-dashed rounded-xl">
                3
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-start w-[75%] min-h-screen ml-[26%] gap-4">
        <div className="flex flex-row items-center justify-center w-[100%] h-full p-2 gap-2 border-2 border-[#000000] border-dashed">
          Header
        </div>
        <div className="flex flex-row items-center justify-center w-[100%] min-h-screen p-2 gap-2 border-2 border-[#000000] border-dashed rounded-3xl">
          Contents
        </div>
      </div>
    </div>
  );
}
