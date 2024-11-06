import React from "react";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";

export default function Branch() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-6 border-2 border-[#000000] border-dashed">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed font-[600]">
          Branch
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed">
          <AddHomeOutlinedIcon />
          <span className="px-4 bg-[#635bff]/25 rounded-xl">Branch</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-f p-2 gap-2 border-2 border-[#000000] border-dashed bg-[#FFFFFF] rounded-xl shadow-sm">
        Fillter
      </div>
      <div className="flex flex-col items-center justify-center w-full h-f p-2 gap-2 border-2 border-[#000000] border-dashed bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed font-[600]">
          Branch List
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed">
          Table
        </div>
      </div>
    </div>
  );
}
