"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Input, Button } from "@nextui-org/react";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";

export default function Account() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen p-2 gap-6">
      <div className="flex flex-row items-center justify-between w-full h-full p-2 gap-2 bg-[#FFFFFF] shadow-sm rounded-xl">
        <div className="flex items-center justify-start w-full h-full px-4 py-2 gap-2 text-[#000000] text-md font-[600]">
          Account Setting
        </div>
        <div className="flex items-center justify-end w-full h-full px-4 py-2 gap-2 text-[#000000] text-sm font-[300]">
          <CottageOutlinedIcon />
          <span className="text-[#635bff] bg-[#635bff]/25 px-2 py-1 rounded-lg">
            Account Setting
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] shadow-sm rounded-xl">
        <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2">
          <div className="flex flex-col items-center justify-center w-full h-[520px] p-2 border-2 rounded-xl">
            <div className="flex items-center justify-center w-40 h-40 p-2 rounded-full bg-[#635bff]/25">
              <Image
                src={`/images/user_picture/${session?.user?.user_picture_file}`}
                alt="profile_picture"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-[520px] p-2 border-2 rounded-xl">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-md font-[600]">
              Chang Password
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300]">
              To change your password please confirm here
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300]">
              Current Password
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                placeholder="Please Enter Data"
                size="md"
                variant="bordered"
                // ref={useridcardRef}
                required
              />
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300]">
              New Password
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                placeholder="Please Enter Data"
                size="lmd"
                variant="bordered"
                // ref={useridcardRef}
                required
              />
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 text-[#000000] text-sm font-[300]">
              Confirm Password
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                placeholder="Please Enter Data"
                size="md"
                variant="bordered"
                // ref={useridcardRef}
                required
              />
            </div>
            <div className="flex items-center justify-end w-full h-full p-2 gap-2">
              <Button
                // onClick={handlerLogin}
                size="md"
                className=" bg-[#635bff] text-[#FFFFFF]"
              >
                Submit
              </Button>
            </div>
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
                      placeholder="Please Enter Data"
                      size="md"
                      variant="bordered"
                      // ref={useridcardRef}
                      required
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
                      placeholder="Please Enter Data"
                      size="md"
                      variant="bordered"
                      // ref={useridcardRef}
                      required
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
                      placeholder="Please Enter Data"
                      size="md"
                      variant="bordered"
                      // ref={useridcardRef}
                      required
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
                      placeholder="Please Enter Data"
                      size="md"
                      variant="bordered"
                      // ref={useridcardRef}
                      required
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
                      placeholder="Please Enter Data"
                      size="md"
                      variant="bordered"
                      // ref={useridcardRef}
                      required
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
                      placeholder="Please Enter Data"
                      size="md"
                      variant="bordered"
                      // ref={useridcardRef}
                      required
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
                      placeholder="Please Enter Data"
                      size="md"
                      variant="bordered"
                      // ref={useridcardRef}
                      required
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
                      placeholder="Please Enter Data"
                      size="md"
                      variant="bordered"
                      // ref={useridcardRef}
                      required
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
                      placeholder="Please Enter Data"
                      size="md"
                      variant="bordered"
                      // ref={useridcardRef}
                      required
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
                      placeholder="Please Enter Data"
                      size="md"
                      variant="bordered"
                      // ref={useridcardRef}
                      required
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
                      placeholder="Please Enter Data"
                      size="md"
                      variant="bordered"
                      // ref={useridcardRef}
                      required
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
                      placeholder="Please Enter Data"
                      size="md"
                      variant="bordered"
                      // ref={useridcardRef}
                      required
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
                      placeholder="Please Enter Data"
                      size="md"
                      variant="bordered"
                      // ref={useridcardRef}
                      required
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
                      placeholder="Please Enter Data"
                      size="md"
                      variant="bordered"
                      // ref={useridcardRef}
                      required
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
