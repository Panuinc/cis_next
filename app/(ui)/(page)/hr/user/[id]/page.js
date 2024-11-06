"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { UpdatePosition, FetchPositionById } from "@/app/functions/hr/position";
import { Input, Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";

export default function PositionUpdate({ params }) {
  const { data: session } = useSession();
  const position_id = params.id;
  const router = useRouter();
  const [error, setError] = useState(null);
  const [position_branch_id, setPosition_branch_id] = useState("");
  const [position_division_id, setPosition_division_id] = useState("");
  const [position_department_id, setPosition_department_id] = useState("");
  const [position_name, setPosition_name] = useState("");

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const data = await FetchPositionById(position_id);
        if (data.message) {
          toast.error(data.message);
        } else {
          setPosition_branch_id(data.branch_name || "");
          setPosition_division_id(data.division_name || "");
          setPosition_department_id(data.department_name || "");
          setPosition_name(data.position_name || "");
        }
      } catch (error) {
        toast.error("Error fetching position data");
      }
    };

    fetchPosition();
  }, [position_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("position_name", position_name);
    formData.append("position_update_by", session?.user?.user_id);

    try {
      const response = await UpdatePosition({
        formData,
        position_id,
      });

      if (response.status === 200) {
        toast.success(response.message);
        setTimeout(() => {
          router.push("/hr/position");
        }, 2000);
      } else {
        setError(response);
      }
    } catch (error) {
      setError({ message: "Error updating position: " + error.message });
      toast.error("Error updating position: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-6">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          แก้ไข ตำแหน่ง
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <AddHomeOutlinedIcon />
          <span className="px-4 text-[#635bff] bg-[#635bff]/25 rounded-xl">
            แก้ไข ตำแหน่ง
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-f p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-4 gap-2 font-[600] border-b-2">
          แก้ไข ตำแหน่ง
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
                label="สาขา"
                isReadOnly
                size="md"
                value={position_branch_id}
              />
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                label="ฝ่าย"
                isReadOnly
                size="md"
                value={position_division_id}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                label="แผนก"
                isReadOnly
                size="md"
                value={position_department_id}
              />
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                id="position_name"
                name="position_name"
                label="ชื่อตำแหน่ง"
                placeholder="กรุณากรอกข้อมูล"
                size="md"
                variant="bordered"
                isRequired
                value={position_name}
                onChange={(e) => setPosition_name(e.target.value)}
                isInvalid={
                  !!error?.errors?.position_name && position_name.length === 0
                }
                errorMessage={error?.errors?.position_name?.[0]}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                label="สร้างโดย"
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
