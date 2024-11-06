"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { CreateDepartment } from "@/app/functions/hr/department";
import { FetchBranch } from "@/app/functions/hr/branch";
import { FetchDivision } from "@/app/functions/hr/division";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useSession } from "next-auth/react";

import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";

export default function DepartmentCreate() {
  const { data: session } = useSession();
  const router = useRouter();
  const [branch, setBranch] = useState([]);
  const [division, setDivision] = useState([]);
  const [filtereddivision, setFilteredDivision] = useState([]);
  const [isbranchselected, setIsBranchSelected] = useState(false);
  const [error, setError] = useState(null);
  const [department_branch_id, setDepartment_branch_id] = useState("");
  const [department_division_id, setDepartment_division_id] = useState("");
  const [department_name, setDepartment_name] = useState("");

  const loadBranch = async () => {
    try {
      const data = await FetchBranch();
      const activeBranch = data.filter((branch) => branch.branch_status === 1);
      setBranch(activeBranch);
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  };
  const loadDivision = async () => {
    try {
      const data = await FetchDivision();
      const activedivision = data.filter(
        (division) => division.division_status === 1
      );
      setDivision(activedivision);
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  };

  useEffect(() => {
    loadBranch();
    loadDivision();
  }, []);

  useEffect(() => {
    if (department_branch_id) {
      const selectedBranchId = department_branch_id;
      const filtered = division.filter(
        (division) =>
          division.division_status == 1 &&
          division.division_branch_id == selectedBranchId
      );
      setFilteredDivision(filtered);
      setIsBranchSelected(true);
    } else {
      setFilteredDivision([]);
      setIsBranchSelected(false);
    }
  }, [department_branch_id, division]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("department_branch_id", department_branch_id);
    formData.append("department_division_id", department_division_id);
    formData.append("department_name", department_name);
    formData.append("department_create_by", session?.user?.user_id);

    try {
      const response = await CreateDepartment({
        formData,
      });

      if (response.status === 201) {
        toast.success(response.message);
        setTimeout(() => {
          router.push("/hr/department");
        }, 2000);
      } else {
        setError(response);
      }
    } catch (error) {
      setError({ message: "Error creating department: " + error.message });
      toast.error("Error creating department: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-6">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          เพิ่ม แผนก
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <AddHomeOutlinedIcon />
          <span className="px-4 text-[#635bff] bg-[#635bff]/25 rounded-xl">
            เพิ่ม แผนก
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-f p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-4 gap-2 font-[600] border-b-2">
          เพิ่ม แผนก
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
                id="department_branch_id"
                name="department_branch_id"
                value={department_branch_id}
                onChange={(e) => setDepartment_branch_id(e.target.value)}
                variant="bordered"
                size="md"
                isInvalid={
                  !!error?.errors?.department_branch_id &&
                  department_branch_id.length === 0
                }
                errorMessage={error?.errors?.department_branch_id?.[0]}
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
              <Select
                label="เลือกฝ่าย"
                placeholder="กรุณาเลือกฝ่าย"
                id="department_division_id"
                name="department_division_id"
                value={department_division_id}
                onChange={(e) => setDepartment_division_id(e.target.value)}
                variant="bordered"
                size="lg"
                isDisabled={!isbranchselected}
                isInvalid={error && department_division_id.length === 0}
                errorMessage={error?.errors?.department_division_id?.[0]}
              >
                <SelectItem value="">เลือกฝ่าย</SelectItem>
                {filtereddivision.map((division) => (
                  <SelectItem
                    key={division.division_id}
                    value={division.division_id}
                  >
                    {division.division_name}
                  </SelectItem>
                ))}
              </Select>
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
