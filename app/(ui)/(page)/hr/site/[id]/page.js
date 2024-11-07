"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import {
  UpdateSite,
  FetchSiteById,
} from "@/app/functions/hr/site/site";
import { Input, Button, RadioGroup, Radio } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";

export default function SiteUpdate({ params }) {
  const { data: session } = useSession();
  const site_id = params.id;
  const router = useRouter();
  const [error, setError] = useState(null);
  const [site_branch_id, setSite_branch_id] = useState("");
  const [site_name, setSite_name] = useState("");
  const [site_status, setSite_status] = useState("");

  useEffect(() => {
    const fetchSite = async () => {
      try {
        const data = await FetchSiteById(site_id);
        if (data.message) {
          toast.error(data.message);
        } else {
          setSite_branch_id(data.branch_name || "");
          setSite_name(data.site_name || "");
          setSite_status(data.site_status?.toString() || "");
        }
      } catch (error) {
        toast.error("Error fetching site data");
      }
    };

    fetchSite();
  }, [site_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("site_name", site_name);
    formData.append("site_status", site_status);
    formData.append("site_update_by", session?.user?.user_id);

    try {
      const response = await UpdateSite({
        formData,
        site_id,
      });

      if (response.status === 200) {
        toast.success(response.message);
        setTimeout(() => {
          router.push("/hr/site");
        }, 2000);
      } else {
        setError(response);
        toast.error(response.message);
      }
    } catch (error) {
      setError({ message: "Error updating site: " + error.message });
      toast.error("Error updating site: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-6">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          แก้ไข ไซต์งาน
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <AddHomeOutlinedIcon />
          <span className="px-4 text-[#635bff] bg-[#635bff]/25 rounded-xl">
            แก้ไข ไซต์งาน
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-f p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-4 gap-2 font-[600] border-b-2">
          แก้ไข ไซต์งาน
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
                value={site_branch_id}
              />
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
                isInvalid={
                  !!error?.errors?.site_name && site_name.length === 0
                }
                errorMessage={error?.errors?.site_name?.[0]}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <RadioGroup
                label="สถานะการใช้งาน"
                color="primary"
                orientation="horizontal"
                value={site_status}
                onValueChange={(value) => setSite_status(value)}
                isInvalid={
                  !!error?.errors?.site_status &&
                  site_status.length === 0
                }
                errorMessage={error?.errors?.site_status?.[0]}
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
