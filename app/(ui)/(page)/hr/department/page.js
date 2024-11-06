"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { FetchBranch } from "@/app/functions/hr/branch";
import { FetchDivision } from "@/app/functions/hr/division";
import { FetchDepartment } from "@/app/functions/hr/department";
import { UpdateStatusDepartment } from "@/app/functions/hr/department";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Input, Button, Select, SelectItem, Switch } from "@nextui-org/react";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";

export default function Department() {
  const { data: session } = useSession();
  const [branch, setBranch] = useState([]);
  const [division, setDivision] = useState([]);
  const [department, setDepartment] = useState([]);
  const [filteredbranch, setFilteredBranch] = useState([]);
  const [filtereddivision, setFilteredDivision] = useState([]);
  const [filtereddepartment, setFilteredDepartment] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedbranch, setSelectedBranch] = useState("");
  const [selecteddivision, setSelectedDivision] = useState("");
  const [selecteddepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    const loadBranchData = async () => {
      try {
        const data = await FetchBranch();
        const activeBranch = data.filter(
          (branch) => branch.branch_status === 1
        );
        setBranch(activeBranch);
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    };

    const loadDivisionData = async () => {
      try {
        const data = await FetchDivision();
        const activeDivision = data.filter(
          (division) => division.division_status === 1
        );
        setDivision(activeDivision);
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    };

    const loadDepartmentData = async () => {
      try {
        const data = await FetchDepartment();

        if (session.user.user_level === "superadmin") {
          setDepartment(data || []);
          setFilteredDepartment(data || []);
        } else {
          const filtereddepartment = (data || []).filter(
            (department) => department.department_status === 1
          );
          setDepartment(filtereddepartment);
          setFilteredDepartment(filtereddepartment);
        }
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    };

    loadBranchData();
    loadDivisionData();
    loadDepartmentData();
  }, [session.user.user_level]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    const filtereddepartment = department.filter((item) => {
      return Object.values(item)
        .filter((val) => typeof val === "string")
        .some((val) => val.toLowerCase().includes(value));
    });

    setFilteredDepartment(filtereddepartment);

    const filteredbranch = branch.filter((item) => {
      return Object.values(item)
        .filter((val) => typeof val === "string")
        .some((val) => val.toLowerCase().includes(value));
    });

    setFilteredBranch(filteredbranch);

    const filtereddivision = division.filter((item) => {
      return Object.values(item)
        .filter((val) => typeof val === "string")
        .some((val) => val.toLowerCase().includes(value));
    });

    setFilteredDivision(filtereddivision);
  };

  const handleSelectDepartmentChange = (keys) => {
    const value = [...keys][0];
    setSelectedDepartment(value);

    if (value === "") {
      setFilteredDepartment(department);
    } else {
      const filtereddepartment = department.filter((item) => {
        return item.department_id.toString() === value;
      });

      if (filtereddepartment.length > 0) {
        setFilteredDepartment(filtereddepartment);
      } else {
        setFilteredDepartment(department);
      }
    }
  };

  const handleSelectBranchChange = (keys) => {
    const value = [...keys][0];
    if (value === selectedbranch) {
      setSelectedBranch("");
      setFilteredDepartment(department);
    } else {
      setSelectedBranch(value);

      if (value === "" || value === undefined) {
        setFilteredDepartment(department);
      } else {
        console.log(value);

        const filtereddepartment = department.filter((item) => {
          return item.branch_id.toString() === value;
        });

        if (filtereddepartment.length > 0) {
          setFilteredDepartment(filtereddepartment);
        } else {
          setFilteredDepartment([]);
        }
      }
    }
  };

  const handleSelectDivisionChange = (keys) => {
    const value = [...keys][0];
    if (value === selecteddivision) {
      setSelectedDivision("");
      setFilteredDepartment(department);
    } else {
      setSelectedDivision(value);

      if (value === "" || value === undefined) {
        setFilteredDepartment(department);
      } else {
        console.log(value);

        const filtereddepartment = department.filter((item) => {
          return item.division_id.toString() === value;
        });

        if (filtereddepartment.length > 0) {
          setFilteredDepartment(filtereddepartment);
        } else {
          setFilteredDepartment([]);
        }
      }
    }
  };

  const handleStatusChange = async (department_id, currentStatus) => {
    const newStatus = currentStatus ? 0 : 1;
    try {
      const result = await UpdateStatusDepartment({
        department_id,
        department_status: newStatus,
        department_update_by: session.user.user_id,
      });

      if (result.status === 200) {
        toast.success(result.message);
        const updatedData = department.map((department) =>
          department.department_id === department_id
            ? { ...department, department_status: newStatus }
            : department
        );
        setDepartment(updatedData);
        setFilteredDepartment(updatedData);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const commonColumns = [
    { name: "ลำดับ", selector: (row, index) => index + 1 || "-" },
    { name: "สาขา", selector: (row) => row.branch_name || "-" },
    { name: "ฝ่าย", selector: (row) => row.division_name || "-" },
    { name: "แผนก", selector: (row) => row.department_name || "-" },
  ];

  let columns = [...commonColumns];

  if (
    session.user.user_level === "superadmin" ||
    session.user.user_level === "admin"
  ) {
    columns = [
      ...columns,
      { name: "สร้างโดย", selector: (row) => row.create_by || "-" },
      {
        name: "สร้างเมื่อ",
        selector: (row) => row.department_create_time || "-",
      },
      { name: "แก้ไขโดย", selector: (row) => row.update_by || "-" },
      {
        name: "แก้ไขเมื่อ",
        selector: (row) => row.department_update_time || "-",
      },
      {
        name: "แก้ไข",
        cell: (row) => (
          <Link
            href={`/hr/department/${row.department_id}`}
            className="text-[#FFCE54] hover:text-[#FFCE54]/75"
          >
            <EditOutlinedIcon />
          </Link>
        ),
      },
    ];
  }

  if (session.user.user_level === "superadmin") {
    columns.push({
      name: "สถานะ",
      cell: (row) => (
        <Switch
          isSelected={row.department_status}
          color="success"
          onChange={() =>
            handleStatusChange(row.department_id, row.department_status)
          }
        />
      ),
    });
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-6">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          แผนก
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <AddHomeOutlinedIcon />
          <span className="px-4 text-[#635bff] bg-[#635bff]/25 rounded-xl">
            แผนก
          </span>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row items-center justify-center w-full h-f p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
          <Input
            type="text"
            label="ค้นหา"
            placeholder="ค้นหาโดยข้อความ"
            size="md"
            variant="bordered"
            value={searchText}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
          <Select
            label="ค้นหา"
            placeholder="เลือกสาขา"
            size="md"
            variant="bordered"
            selectedKeys={selectedbranch ? [selectedbranch] : []}
            onSelectionChange={handleSelectBranchChange}
          >
            <SelectItem key="">เลือกทั้งหมด</SelectItem>
            {branch.map((branch) => (
              <SelectItem key={branch.branch_id}>
                {branch.branch_name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
          <Select
            label="ค้นหา"
            placeholder="เลือกฝ่าย"
            size="md"
            variant="bordered"
            selectedKeys={selecteddivision ? [selecteddivision] : []}
            onSelectionChange={handleSelectDivisionChange}
          >
            <SelectItem key="">เลือกทั้งหมด</SelectItem>
            {division.map((division) => (
              <SelectItem key={division.division_id}>
                {division.division_name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
          <Select
            label="ค้นหา"
            placeholder="เลือกแผนก"
            size="md"
            variant="bordered"
            selectedKeys={selecteddepartment ? [selecteddepartment] : []}
            onSelectionChange={handleSelectDepartmentChange}
          >
            <SelectItem key="">เลือกทั้งหมด</SelectItem>
            {department.map((department) => (
              <SelectItem key={department.department_id}>
                {department.department_name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <Link href="/hr/department/create">
          <Button className="flex items-center justify-center w-full h-full p-3 gap-2 text-[#FFFFFF] bg-[#615DFF]">
            เพิ่ม
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-f p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-4 gap-2 font-[600] border-b-2">
          ข้อมูล แผนก
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
          <DataTable
            columns={columns}
            data={Array.isArray(filtereddepartment) ? filtereddepartment : []}
            pagination
            noDataComponent="ไม่พบข้อมูล"
            highlightOnHover
          />
        </div>
      </div>
    </div>
  );
}
