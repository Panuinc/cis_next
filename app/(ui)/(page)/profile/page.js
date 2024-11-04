"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import Link from "next/link";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-6">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-lg font-[600]">
          โปรไฟล์
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <CottageOutlinedIcon />
          <span className="px-4 bg-[#635bff]/25 text-[#635bff] text-md font-[300] rounded-xl">
            โปรไฟล์
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-6 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full gap-6">
          <div className="flex flex-col items-center justify-center w-full min-h-80 p-2 gap-2 border-2 rounded-xl shadow-sm">
            <div className="flex items-center justify-center min-w-40 min-h-40 p-2 gap-2 bg-[#635bff]/25 rounded-full">
              <Image
                src={`/images/user_picture/${session?.user?.user_picture_file}`}
                alt="profile_picture"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Button
                size="lg"
                className="w-2/12 bg-[#635bff] text-[#FFFFFF] text-md font-[300]"
              >
                <a href={`/profile/${session?.user?.user_id}`}>ตั้งค่าบัญชี</a>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-2 rounded-xl shadow-sm">
          <div className="flex items-center justify-start w-full h-full p-2 gap-2text-[#000000] text-lg font-[600]">
            รายละเอียดส่วนบุคคล
          </div>
          <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full gap-6">
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="flex items-center justify-start w-full h-full p-2 text-[#000000] text-md font-[600]">
                รหัสพนักงาน
              </div>
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
                {session?.user?.user_number}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="flex items-center justify-start w-full h-full p-2 text-[#000000] text-md font-[600]">
                ชื่อเล่น
              </div>
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
                {session?.user?.user_nickname}
              </div>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full gap-6">
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="flex items-center justify-start w-full h-full p-2 text-[#000000] text-md font-[600]">
                ชื่อ
              </div>
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
                {session?.user?.user_firstname}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="flex items-center justify-start w-full h-full p-2 text-[#000000] text-md font-[600]">
                นามสกุล
              </div>
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
                {session?.user?.user_lastname}
              </div>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full gap-6">
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="flex items-center justify-start w-full h-full p-2 text-[#000000] text-md font-[600]">
                สาขา
              </div>
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
                {session?.user?.user_branch_name}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="flex items-center justify-start w-full h-full p-2 text-[#000000] text-md font-[600]">
                ไซต์
              </div>
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
                {session?.user?.user_site_name}
              </div>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full gap-6">
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="flex items-center justify-start w-full h-full p-2 text-[#000000] text-md font-[600]">
                ฝ่าย
              </div>
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
                {session?.user?.user_division_name}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="flex items-center justify-start w-full h-full p-2 text-[#000000] text-md font-[600]">
                แผนก
              </div>
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
                {session?.user?.user_department_name}
              </div>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full gap-6">
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="flex items-center justify-start w-full h-full p-2 text-[#000000] text-md font-[600]">
                ตำแหน่ง
              </div>
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
                {session?.user?.user_position_name}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="flex items-center justify-start w-full h-full p-2 text-[#000000] text-md font-[600]">
                บทบาทหน้าที่
              </div>
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
                {session?.user?.user_role_name}
              </div>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full gap-6">
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="flex items-center justify-start w-full h-full p-2 text-[#000000] text-md font-[600]">
                ผู้บังคับบัญชา
              </div>
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
                {session?.user?.user_parent_name}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="flex items-center justify-start w-full h-full p-2 text-[#000000] text-md font-[600]">
                เลขบัตรประชาชน
              </div>
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
                {session?.user?.user_id_card}
              </div>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full gap-6">
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="flex items-center justify-start w-full h-full p-2 text-[#000000] text-md font-[600]">
                อีเมลล์
              </div>
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
                {session?.user?.user_email}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="flex items-center justify-start w-full h-full p-2 text-[#000000] text-md font-[600]">
                เบอร์โทรศัพท์
              </div>
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
                {session?.user?.user_tel}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
