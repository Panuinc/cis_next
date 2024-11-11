"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { CreatePosition } from "@/app/functions/hr/position/position";
import { FetchBranch } from "@/app/functions/hr/branch/branch";
import { FetchDivision } from "@/app/functions/hr/division/division";
import { FetchDepartment } from "@/app/functions/hr/department/department";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";

export default function PositionCreate() {
  const { data: session } = useSession();
  const router = useRouter();
  const [branch, setBranch] = useState([]);
  const [division, setDivision] = useState([]);
  const [department, setDepartment] = useState([]);
  const [filtereddivision, setFilteredDivision] = useState([]);
  const [filtereddepartment, setFilteredDepartment] = useState([]);
  const [isbranchselected, setIsBranchSelected] = useState(false);
  const [isdivisionandbranchselected, setIsDivisionAndBranchSelected] =
    useState(false);
  const [error, setError] = useState(null);
  const [position_branch_id, setPosition_branch_id] = useState("");
  const [position_division_id, setPosition_division_id] = useState("");
  const [position_department_id, setPosition_department_id] = useState("");
  const [position_name, setPosition_name] = useState("");

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

  const loadDepartment = async () => {
    try {
      const data = await FetchDepartment();
      const activedepartment = data.filter(
        (department) => department.department_status === 1
      );
      setDepartment(activedepartment);
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  };

  useEffect(() => {
    loadBranch();
    loadDivision();
    loadDepartment();
  }, []);

  useEffect(() => {
    if (position_branch_id) {
      const selectedBranchId = position_branch_id;
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
  }, [position_branch_id, division]);

  useEffect(() => {
    if (position_branch_id && position_division_id) {
      const selectedBranchIdandDivisionId =
        position_branch_id && position_division_id;
      const filtered = department.filter(
        (department) =>
          department.department_status == 1 &&
          department.department_branch_id &&
          department.department_division_id == selectedBranchIdandDivisionId
      );
      setFilteredDepartment(filtered);
      setIsDivisionAndBranchSelected(true);
    } else {
      setFilteredDepartment([]);
      setIsDivisionAndBranchSelected(false);
    }
  }, [position_branch_id && position_division_id, department]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("position_branch_id", position_branch_id);
    formData.append("position_division_id", position_division_id);
    formData.append("position_department_id", position_department_id);
    formData.append("position_name", position_name);
    formData.append("position_create_by", session?.user?.user_id);

    try {
      const response = await CreatePosition({
        formData,
      });

      if (response.status === 201) {
        toast.success(response.message);
        setTimeout(() => {
          router.push("/hr/position");
        }, 2000);
      } else {
        setError(response);
        toast.error(response.message);
      }
    } catch (error) {
      setError({ message: "Error creating position: " + error.message });
      toast.error("Error creating position: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-6">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          เพิ่ม ตำแหน่ง
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <AddHomeOutlinedIcon />
          <span className="px-4 text-[#635bff] bg-[#635bff]/25 rounded-xl">
            เพิ่ม ตำแหน่ง
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-f p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-4 gap-2 font-[600] border-b-2">
          เพิ่ม ตำแหน่ง
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
                id="position_branch_id"
                name="position_branch_id"
                value={position_branch_id}
                onChange={(e) => setPosition_branch_id(e.target.value)}
                variant="bordered"
                size="lg"
                isInvalid={
                  !!error?.errors?.position_branch_id &&
                  position_branch_id.length === 0
                }
                errorMessage={error?.errors?.position_branch_id?.[0]}
              >
                <SelectItem value="">เลือกสาขา</SelectItem>
                {branch.map((branch) => (
                  <SelectItem key={branch.branch_id} value={branch.branch_id}>
                    {branch.branch_name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Select
              label="เลือกฝ่าย"
              placeholder="กรุณาเลือกฝ่าย"
              id="position_division_id"
              name="position_division_id"
              value={position_division_id}
              onChange={(e) => setPosition_division_id(e.target.value)}
              variant="bordered"
              size="lg"
              isDisabled={!isbranchselected}
              isInvalid={
                !!error?.errors?.position_division_id &&
                position_division_id.length === 0
              }
              errorMessage={error?.errors?.position_division_id?.[0]}
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
          <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                label="เลือกแผนก"
                placeholder="กรุณาเลือกแผนก"
                id="position_department_id"
                name="position_department_id"
                value={position_department_id}
                onChange={(e) => setPosition_department_id(e.target.value)}
                variant="bordered"
                size="lg"
                isDisabled={!isdivisionandbranchselected}
                isInvalid={
                  !!error?.errors?.position_department_id &&
                  position_department_id.length === 0
                }
                errorMessage={error?.errors?.position_department_id?.[0]}
              >
                <SelectItem value="">เลือกแผนก</SelectItem>
                {filtereddepartment.map((department) => (
                  <SelectItem
                    key={department.department_id}
                    value={department.department_id}
                  >
                    {department.department_name}
                  </SelectItem>
                ))}
              </Select>
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
