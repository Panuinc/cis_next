"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { UpdateUser, FetchUserById } from "@/app/functions/hr/user/user";
import { Input, Button, RadioGroup, Radio } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";

export default function UserUpdate({ params }) {
  const { data: session } = useSession();
  const user_id = params.id;
  const router = useRouter();
  const [error, setError] = useState(null);
  const [user_number, setUser_number] = useState("");
  const [user_card_number, setUser_card_number] = useState("");
  const [user_title, setUser_title] = useState("");

  const [user_firstname, setUser_firstname] = useState("");
  const [user_lastname, setUser_lastname] = useState("");
  const [user_nickname, setUser_nickname] = useState("");
  const [user_tel, setUser_tel] = useState("");
  const [user_email, setUser_email] = useState("");

  const [user_level, setUser_level] = useState("");
  const [user_birthday, setUser_birthday] = useState("");
  const [user_gender, setUser_gender] = useState("");
  const [user_id_card, setUser_id_card] = useState("");
  const [user_citizen, setUser_citizen] = useState("");

  const [user_type, setUser_type] = useState("");
  const [branch_name, setBranch_name] = useState("");
  const [site_name, setSite_name] = useState("");
  const [division_name, setDivision_name] = useState("");
  const [department_name, setDepartment_name] = useState("");

  const [position_name, setPosition_name] = useState("");
  const [role_name, setRole_name] = useState("");
  const [parent_name, setParent_name] = useState("");
  const [user_start_work, setUser_start_work] = useState("");
  const [user_status, setUser_status] = useState("");

  const [user_picture_file, setUser_picture_file] = useState("");
  const [user_signature_file, setUser_signature_file] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await FetchUserById(user_id);
        if (data.message) {
          toast.error(data.message);
        } else {
          setUser_number(data.user_number || "");
          setUser_card_number(data.user_card_number || "");
          setUser_title(data.user_title || "");

          setUser_firstname(data.user_firstname || "");
          setUser_lastname(data.user_lastname || "");
          setUser_nickname(data.user_nickname || "");
          setUser_tel(data.user_tel || "");
          setUser_email(data.user_email || "");

          setUser_level(data.user_level || "");
          setUser_birthday(data.user_birthday || "");
          setUser_gender(data.user_gender || "");
          setUser_id_card(data.user_id_card || "");
          setUser_citizen(data.user_citizen || "");

          setUser_type(data.user_type || "");
          setBranch_name(data.branch_name || "");
          setSite_name(data.site_name || "");
          setDivision_name(data.division_name?.toString() || "");
          setDepartment_name(data.department_name?.toString() || "");
          setUser_citizen(data.user_citizen || "");

          setPosition_name(data.position_name?.toString() || "");
          setRole_name(data.role_name?.toString() || "");
          setParent_name(data.parent_name?.toString() || "");
          setUser_start_work(data.user_start_work || "");

          setUser_status(data.user_status?.toString() || "");

          setUser_picture_file(data.user_picture_file || "");
          setUser_signature_file(data.user_signature_file || "");
        }
      } catch (error) {
        toast.error("Error fetching user data");
      }
    };

    fetchUser();
  }, [user_id]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-6">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          รายละเอียด ผู้ใช้งาน
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <AddHomeOutlinedIcon />
          <span className="px-4 text-[#635bff] bg-[#635bff]/25 rounded-xl">
            รายละเอียด ผู้ใช้งาน
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-f p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-4 gap-2 font-[600] border-b-2">
          รายละเอียด ผู้ใช้งาน
        </div>
        <div className="flex items-center justify-center w-48 h-48 hover:border-[#635bff] p-2 gap-2 border-4 rounded-full">
          <img
            src={`/images/user_picture/${user_picture_file}`}
            alt="user picture"
            width={100}
            height={100}
          />
        </div>
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          ข้อมูลทั่วไป
        </div>

        <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2 border-2">
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2">
              รหัสพนักงาน
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
              {user_number}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2">
              เลขบัตรพนักงาน
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
              {user_card_number}
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2 border-2">
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2">
              คำนำหน้าชื่อ
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
              {user_title}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2">
              ชื่อ
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
              {user_firstname}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2">
              นามสกุล
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
              {user_lastname}
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2 border-2">
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2">
              ชื่อเล่น
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
              {user_nickname}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2">
              เบอร์โทรศัพท์
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
              {user_tel}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2">
              อีเมลล์
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
              {user_email}
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2 border-2">
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2">
              ระดับการใช้งาน
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
              {user_level}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2">
              วันเกิด
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
              {user_birthday}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2">
              เพศ
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
              {user_gender}
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2 border-2">
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2">
              เลขบัตรประชาชน
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
              {user_id_card}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2">
              สัญชาติ
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
              {user_citizen}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          ข้อมูลการจ้างงาน
        </div>

        <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2 border-2">
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2">
              ประเภทพนักงาน
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
              {user_type}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2">
              สาขา
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
              {branch_name}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2">
              ไซต์งาน
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
              {site_name}
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2 border-2">
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2">
              ฝ่าย
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
              {division_name}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2">
              แผนก
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
              {department_name}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2">
              ตำแหน่ง
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
              {position_name}
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2 border-2">
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2">
              บทบาทหน้าที่
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
              {role_name}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2">
              ผู้บังคับบัญชา
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
              {parent_name}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2">
              วันที่เริ่มงาน
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 rounded-xl">
              {user_start_work}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
