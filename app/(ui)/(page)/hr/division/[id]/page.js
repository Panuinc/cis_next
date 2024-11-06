"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { UpdateDivision, FetchDivisionById } from "@/app/functions/hr/division";
import { Input, Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";

export default function DivisionUpdate({ params }) {
  const { data: session } = useSession();
  const division_id = params.id;
  const router = useRouter();
  const [error, setError] = useState(null);
  const [division_branch_id, setDivision_branch_id] = useState("");
  const [division_name, setDivision_name] = useState("");
  const [division_acronym, setDivision_acronym] = useState("");

  useEffect(() => {
    const fetchDivision = async () => {
      try {
        const data = await FetchDivisionById(division_id);
        if (data.message) {
          toast.error(data.message);
        } else {
          setDivision_branch_id(data.branch_name || "");
          setDivision_name(data.division_name || "");
          setDivision_acronym(data.division_acronym || "");
        }
      } catch (error) {
        toast.error("Error fetching division data");
      }
    };

    fetchDivision();
  }, [division_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("division_name", division_name);
    formData.append("division_acronym", division_acronym);
    formData.append("division_update_by", session?.user?.user_id);

    try {
      const response = await UpdateDivision({
        formData,
        division_id,
      });

      if (response.status === 200) {
        toast.success(response.message);
        setTimeout(() => {
          router.push("/hr/division");
        }, 2000);
      } else {
        setError(response);
      }
    } catch (error) {
      setError({ message: "Error updating division: " + error.message });
      toast.error("Error updating division: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-6">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          เพิ่ม ฝ่าย
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <AddHomeOutlinedIcon />
          <span className="px-4 text-[#635bff] bg-[#635bff]/25 rounded-xl">เพิ่ม ฝ่าย</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-f p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-4 gap-2 font-[600] border-b-2">
          เพิ่ม ฝ่าย
        </div>
        <Toaster position="top-right" reverseOrder={false} />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full h-full p-2 gap-2"
        >
          <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                label="สร้างโดย"
                isReadOnly
                size="md"
                value={division_branch_id}
              />
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                id="division_name"
                name="division_name"
                label="ชื่อฝ่าย"
                placeholder="กรุณากรอกข้อมูล"
                size="md"
                variant="bordered"
                isRequired
                value={division_name}
                onChange={(e) => setDivision_name(e.target.value)}
                isInvalid={
                  !!error?.errors?.division_name && division_name.length === 0
                }
                errorMessage={error?.errors?.division_name?.[0]}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                id="division_acronym"
                name="division_acronym"
                label="ชื่อย่อฝ่าย"
                placeholder="กรุณากรอกข้อมูล"
                size="md"
                variant="bordered"
                isRequired
                value={division_acronym}
                onChange={(e) => setDivision_acronym(e.target.value)}
                isInvalid={
                  !!error?.errors?.division_acronym &&
                  division_acronym.length === 0
                }
                errorMessage={error?.errors?.division_acronym?.[0]}
              />
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                label="ดำเนินการโดย"
                isReadOnly
                size="md"
                value={`${session?.user?.user_firstname} ${session?.user?.user_lastname}`}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-end w-full h-full p-2 gap-2">
              <Button
                type="submit"
                size="md"
                className="w-1/12 bg-[#615DFF] text-[#FFFFFF]"
              >
                บันทึก
              </Button>
              <Button
                size="md"
                className="w-1/12 bg-[#F07294] text-[#FFFFFF]"
                onClick={() => router.back()}
              >
                ย้อนกลับ
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
