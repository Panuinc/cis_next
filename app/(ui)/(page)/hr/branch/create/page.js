"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { CreateBranch } from "@/app/functions/hr/branch";
import { Input, Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";

export default function BranchCreate() {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [branch_name, setBranch_name] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("branch_name", branch_name);
    formData.append("branch_create_by", session?.user?.user_id);
  
    try {
      const response = await CreateBranch({
        formData,
      });
  
      if (response.status === 201) {
        toast.success(response.message);
        setTimeout(() => {
          router.push("/hr/branch");
        }, 2000);
      } else {
        setError(response);
        toast.error(response.message);
      }
    } catch (error) {
      setError({ message: "Error creating branch: " + error.message });
      toast.error("Error creating branch: " + error.message);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-6">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          เพิ่ม สาขา
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <AddHomeOutlinedIcon />
          <span className="px-4 bg-[#635bff]/25 rounded-xl">เพิ่ม สาขา</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-f p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-4 gap-2 font-[600] border-b-2">
          เพิ่ม สาขา
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
                id="branch_name"
                name="branch_name"
                label="ชื่อสาขา"
                placeholder="กรุณากรอกข้อมูล"
                size="md"
                variant="bordered"
                isRequired
                value={branch_name}
                onChange={(e) => setBranch_name(e.target.value)}
                isInvalid={
                  !!error?.errors?.branch_name && branch_name.length === 0
                }
                errorMessage={error?.errors?.branch_name?.[0]}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
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
