"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import {
  UpdateBranch,
  FetchBranchById,
} from "@/app/functions/hr/branch/branch";
import { Input, Button, RadioGroup, Radio } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";

export default function BranchUpdate({ params }) {
  const { data: session } = useSession();
  const branch_id = params.id;
  const router = useRouter();
  const [error, setError] = useState(null);
  const [branch_name, setBranch_name] = useState("");
  const [branch_status, setBranch_status] = useState("");

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const data = await FetchBranchById(branch_id);
        if (data.message) {
          toast.error(data.message);
        } else {
          setBranch_name(data.branch_name || "");
          setBranch_status(data.branch_status?.toString() || "");
        }
      } catch (error) {
        toast.error("Error fetching branch data");
      }
    };

    fetchBranch();
  }, [branch_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("branch_name", branch_name);
    formData.append("branch_status", branch_status);
    formData.append("branch_update_by", session?.user?.user_id);

    try {
      const response = await UpdateBranch({
        formData,
        branch_id,
      });

      if (response.status === 200) {
        toast.success(response.message);
        setTimeout(() => {
          router.push("/hr/branch");
        }, 2000);
      } else {
        setError(response);
        toast.error(response.message);
      }
    } catch (error) {
      setError({ message: "Error updating branch: " + error.message });
      toast.error("Error updating branch: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-6">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          แก้ไข สาขา
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <AddHomeOutlinedIcon />
          <span className="px-4 text-[#635bff] bg-[#635bff]/25 rounded-xl">
            แก้ไข สาขา
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-f p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-4 gap-2 font-[600] border-b-2">
          แก้ไข สาขา
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
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <RadioGroup
                label="สถานะการใช้งาน"
                color="primary"
                orientation="horizontal"
                value={branch_status}
                onValueChange={(value) => setBranch_status(value)}
                isInvalid={
                  !!error?.errors?.branch_status && branch_status.length === 0
                }
                errorMessage={error?.errors?.branch_status?.[0]}
              >
                <Radio value="0">ไม่ใช้งาน</Radio>
                <Radio value="1">ใช้งาน</Radio>
              </RadioGroup>
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
                size="md"
                className="w-1/12 bg-[#615DFF]/25 text-[#615DFF]"
              >
                บันทึก
              </Button>
              <Button
                size="md"
                className="w-1/12 bg-[#F07294]/25 text-[#F07294]"
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
