"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Input, Button } from "@nextui-org/react";

export default function Account() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen p-2 gap-8 border-2 border-[#000000] border-dashed">
      <div className="flex items-center justify-start w-full h-full p-2 gap-2 bg-[#FFFFFF] shadow-sm rounded-lg">
        การตั้งค่าบัญชี
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed bg-[#FFFFFF] shadow-sm rounded-lg">
        <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed">
          <div className="flex flex-col items-center justify-center w-full h-96 p-2 border-2 border-[#000000] border-dashed">
            01
          </div>
          <div className="flex flex-col items-center justify-center w-full h-96 p-2 border-2 border-[#000000] border-dashed">
            01
          </div>
        </div>
        <div className="flex items-center justify-center w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed">
          <div className="flex flex-col items-center justify-center w-full min-h-96 p-2 gap-2 border-2 border-[#000000] border-dashed">
            01
          </div>
        </div>
      </div>
    </div>
  );
}
