"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Input, Button } from "@nextui-org/react";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen p-2 gap-6">
      <div className="flex flex-row items-center justify-between w-full h-full p-2 gap-2 bg-[#FFFFFF] shadow-sm rounded-xl">
        <div className="flex items-center justify-start w-full h-full px-4 py-2 gap-2 text-[#000000] text-md font-[600]">
          User Profile
        </div>
        <div className="flex items-center justify-end w-full h-full px-4 py-2 gap-2 text-[#000000] text-sm font-[300]">
          <CottageOutlinedIcon />
          <span className="text-[#635bff] bg-[#635bff]/25 px-2 py-1 rounded-lg">
            User Profile
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] shadow-sm rounded-xl">
        <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-6">
          <div className="flex flex-col items-center justify-center w-full h-full p-2 border-2 rounded-xl">
            <div className="flex items-center justify-center w-40 h-40 p-2 rounded-full bg-[#635bff]/25">
              <Image
                src={`/images/user_picture/${session?.user?.user_picture_file}`}
                alt="profile_picture"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <a
              href="/account"
              className="mt-4 px-4 py-2 text-white bg-[#635bff] rounded-lg hover:bg-[#635bff]/80 transition-all"
            >
              Account Settings
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
          <div className="flex flex-col items-center justify-center w-full min-h-96 p-2 gap-2 border-2 rounded-xl">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-md font-[600] ">
              Personal Details
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
              To change your personal detail , edit and save from here
            </div>
            <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 ">
              <div className="flex flex-col xl:flex-row items-center justify-start w-full h-full p-2 gap-2 ">
                <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 ">
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    Employee Number
                  </div>
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    <Input
                      type="text"
                      placeholder={session?.user?.user_number}
                      size="md"
                      variant="bordered"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    NickName
                  </div>
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    <Input
                      type="text"
                      placeholder={session?.user?.user_nickname}
                      size="md"
                      variant="bordered"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col xl:flex-row items-center justify-start w-full h-full p-2 gap-2 ">
                <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 ">
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    FirstName
                  </div>
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    <Input
                      type="text"
                      placeholder={session?.user?.user_firstname}
                      size="md"
                      variant="bordered"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    LastName
                  </div>
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    <Input
                      type="text"
                      placeholder={session?.user?.user_lastname}
                      size="md"
                      variant="bordered"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col xl:flex-row items-center justify-start w-full h-full p-2 gap-2 ">
                <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 ">
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    Branch
                  </div>
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    <Input
                      type="text"
                      placeholder={session?.user?.user_branch_name}
                      size="md"
                      variant="bordered"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    Site
                  </div>
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    <Input
                      type="text"
                      placeholder={session?.user?.user_site_name}
                      size="md"
                      variant="bordered"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col xl:flex-row items-center justify-start w-full h-full p-2 gap-2 ">
                <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 ">
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    Division
                  </div>
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    <Input
                      type="text"
                      placeholder={session?.user?.user_division_name}
                      size="md"
                      variant="bordered"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    Department
                  </div>
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    <Input
                      type="text"
                      placeholder={session?.user?.user_department_name}
                      size="md"
                      variant="bordered"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col xl:flex-row items-center justify-start w-full h-full p-2 gap-2 ">
                <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 ">
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    Position
                  </div>
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    <Input
                      type="text"
                      placeholder={session?.user?.user_position_name}
                      size="md"
                      variant="bordered"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    Role
                  </div>
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    <Input
                      type="text"
                      placeholder={session?.user?.user_role_name}
                      size="md"
                      variant="bordered"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col xl:flex-row items-center justify-start w-full h-full p-2 gap-2 ">
                <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 ">
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    Parent
                  </div>
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    <Input
                      type="text"
                      placeholder={session?.user?.user_parent_name}
                      size="md"
                      variant="bordered"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    Employee ID Card
                  </div>
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    <Input
                      type="text"
                      placeholder={session?.user?.user_id_card}
                      size="md"
                      variant="bordered"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col xl:flex-row items-center justify-start w-full h-full p-2 gap-2 ">
                <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 ">
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    Email
                  </div>
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    <Input
                      type="text"
                      placeholder={session?.user?.user_email}
                      size="md"
                      variant="bordered"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    Telephone Number
                  </div>
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300] ">
                    <Input
                      type="text"
                      placeholder={session?.user?.user_tel}
                      size="md"
                      variant="bordered"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
