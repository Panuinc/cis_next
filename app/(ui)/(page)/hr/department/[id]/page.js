"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import {
  UpdateDepartment,
  FetchDepartmentById,
} from "@/app/functions/hr/department";
import { Input, Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";

export default function DepartmentUpdate({ params }) {
  const { data: session } = useSession();
  const department_id = params.id;
  const router = useRouter();
  const [error, setError] = useState(null);
  const [department_branch_id, setDepartment_branch_id] = useState("");
  const [department_division_id, setDepartment_division_id] = useState("");
  const [department_name, setDepartment_name] = useState("");

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const data = await FetchDepartmentById(department_id);
        if (data.message) {
          toast.error(data.message);
        } else {
          setDepartment_branch_id(data.branch_name || "");
          setDepartment_division_id(data.division_name || "");
          setDepartment_name(data.department_name || "");
        }
      } catch (error) {
        toast.error("Error fetching department data");
      }
    };

    fetchDepartment();
  }, [department_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("department_name", department_name);
    formData.append("department_update_by", session?.user?.user_id);

    try {
      const response = await UpdateDepartment({
        formData,
        department_id,
      });

      if (response.status === 200) {
        toast.success(response.message);
        setTimeout(() => {
          router.push("/hr/department");
        }, 2000);
      } else {
        setError(response);
      }
    } catch (error) {
      setError({ message: "Error updating department: " + error.message });
      toast.error("Error updating department: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-6">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          แก้ไข แผนก
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <AddHomeOutlinedIcon />
          <span className="px-4 text-[#635bff] bg-[#635bff]/25 rounded-xl">
            แก้ไข แผนก
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-f p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-4 gap-2 font-[600] border-b-2">
          แก้ไข แผนก
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
                value={department_branch_id}
              />
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                label="ฝ่าย"
                isReadOnly
                size="md"
                value={department_division_id}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                <Input
                  type="text"
                  id="department_name"
                  name="department_name"
                  label="ชื่อแผนก"
                  placeholder="กรุณากรอกข้อมูล"
                  size="md"
                  variant="bordered"
                  isRequired
                  value={department_name}
                  onChange={(e) => setDepartment_name(e.target.value)}
                  isInvalid={
                    !!error?.errors?.department_name &&
                    department_name.length === 0
                  }
                  errorMessage={error?.errors?.department_name?.[0]}
                />
              </div>
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
                size="lg"
                className="w-1/12 bg-[#615DFF] text-[#FFFFFF]"
              >
                บันทึก
              </Button>
              <Button
                size="lg"
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
