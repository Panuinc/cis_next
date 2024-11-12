import React from "react";
import { Input, Button, RadioGroup, Radio } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import { useRouter } from "next/navigation";

export default function BranchForm({
  branch_name,
  setBranch_name,
  branch_status,
  setBranch_status,
  error,
  onSubmit,
  sessionUserName,
  isUpdate = false,
}) {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-6">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          {isUpdate ? "แก้ไข สาขา" : "เพิ่ม สาขา"}
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <AddHomeOutlinedIcon />
          <span className="px-4 text-[#635bff] bg-[#635bff]/25 rounded-xl">
            {isUpdate ? "แก้ไข สาขา" : "เพิ่ม สาขา"}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-4 gap-2 font-[600] border-b-2">
          {isUpdate ? "แก้ไข สาขา" : "เพิ่ม สาขา"}
        </div>
        <Toaster position="top-right" reverseOrder={false} />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full h-full p-2 gap-2"
        >
          <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2">
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

            {isUpdate && (
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
            )}
          </div>

          <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                label="ดำเนินการโดย"
                readOnly
                size="md"
                value={sessionUserName}
              />
            </div>
          </div>

          <div className="flex flex-row items-center justify-end w-full h-full p-2 gap-2">
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
        </form>
      </div>
    </div>
  );
}
