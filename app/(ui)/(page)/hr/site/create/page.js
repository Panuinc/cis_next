"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { CreateSite } from "@/app/functions/hr/site";
import { FetchBranch } from "@/app/functions/hr/branch";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";

export default function SiteCreate() {
  const { data: session } = useSession();
  const router = useRouter();
  const [branch, setBranch] = useState([]);
  const [error, setError] = useState(null);
  const [site_branch_id, setSite_branch_id] = useState("");
  const [site_name, setSite_name] = useState("");

  const loadBranch = async () => {
    try {
      const data = await FetchBranch();
      const activeBranch = data.filter((branch) => branch.branch_status === 1);
      setBranch(activeBranch);
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  };

  useEffect(() => {
    loadBranch();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("site_branch_id", site_branch_id);
    formData.append("site_name", site_name);
    formData.append("site_create_by", session?.user?.user_id);

    try {
      const response = await CreateSite({
        formData,
      });

      if (response.status === 201) {
        toast.success(response.message);
        setTimeout(() => {
          router.push("/hr/site");
        }, 2000);
      } else {
        setError(response);
        toast.error(response.message);
      }
    } catch (error) {
      setError({ message: "Error creating site: " + error.message });
      toast.error("Error creating site: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-6">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          เพิ่ม ไซต์งาน
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <AddHomeOutlinedIcon />
          <span className="px-4 bg-[#635bff]/25 rounded-xl">เพิ่ม ไซต์งาน</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-f p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-4 gap-2 font-[600] border-b-2">
          เพิ่ม ไซต์งาน
        </div>
        <Toaster position="top-right" reverseOrder={false} />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full h-full p-2 gap-2"
        >
          <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                label="เลือกสาขา"
                placeholder="กรุณาเลือกสาขา"
                id="site_branch_id"
                name="site_branch_id"
                value={site_branch_id}
                onChange={(e) => setSite_branch_id(e.target.value)}
                variant="bordered"
                size="md"
                isInvalid={
                  !!error?.errors?.site_branch_id && site_branch_id.length === 0
                }
                errorMessage={error?.errors?.site_branch_id?.[0]}
              >
                <SelectItem value="">เลือกสาขา</SelectItem>
                {branch.map((branch) => (
                  <SelectItem key={branch.branch_id} value={branch.branch_id}>
                    {branch.branch_name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                id="site_name"
                name="site_name"
                label="ชื่อไซต์งาน"
                placeholder="กรุณากรอกข้อมูล"
                size="md"
                variant="bordered"
                isRequired
                value={site_name}
                onChange={(e) => setSite_name(e.target.value)}
                isInvalid={!!error?.errors?.site_name && site_name.length === 0}
                errorMessage={error?.errors?.site_name?.[0]}
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
