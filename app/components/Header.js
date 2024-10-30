import React from "react";
import {
  DehazeOutlined,
  SearchOutlined,
  CropFreeOutlined,
} from "@mui/icons-material";

export default function Header() {
  return (
    <div className="flex flex-row items-center justify-center w-full h-16 p-2 gap-2 bg-[#FFFFFF] border-2 border-[#000000] border-dashed text-[#000000] text-md font-[300]">
      <button className="flex items-center justify-center w-12 h-12 p-2 gap-2 border-2 border-[#000000] border-dashed rounded-xl">
        <DehazeOutlined />
      </button>
      <button className="flex items-center justify-center w-12 h-12 p-2 gap-2 border-2 border-[#000000] border-dashed rounded-xl">
        <SearchOutlined />
      </button>
      <button className="flex items-center justify-center w-12 h-12 p-2 gap-2 border-2 border-[#000000] border-dashed rounded-xl">
        <CropFreeOutlined />
      </button>
    </div>
  );
}
