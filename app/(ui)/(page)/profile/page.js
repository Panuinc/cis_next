"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Input, Button } from "@nextui-org/react";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import Link from "next/link";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-4 py-2 gap-6 border-2 border-[#000000] border-dashed">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed text-[#000000] text-md font-[600]">
          โปรไฟล์
        </div>
        <Link
          href="/home"
          className="flex items-center justify-center h-full p-2 gap-2 border-2 border-[#000000] border-dashed"
        >
          <CottageOutlinedIcon />
          <span className="px-4 bg-[#635bff]/25 text-[#635bff] text-sm font-[300] rounded-xl">
            โปรไฟล์
          </span>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full px-4 py-2 gap-6 border-2 border-[#000000] border-dashed bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-6 border-2 border-[#000000] border-dashed">
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed">
            01
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed">
            01
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed">
            01
          </div>
          <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full gap-6">
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="flex items-center justify-start w-full h-full p-2 text-[#000000] text-md font-[600]">
                01
              </div>
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
                01
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="flex items-center justify-start w-full h-full p-2 text-[#000000] text-md font-[600]">
                01
              </div>
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
                01
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
