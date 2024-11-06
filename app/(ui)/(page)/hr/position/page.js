"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { FetchBranch } from "@/app/functions/hr/branch";
import { FetchDivision } from "@/app/functions/hr/division";
import { FetchDepartment } from "@/app/functions/hr/department";
import { FetchPosition } from "@/app/functions/hr/position";
import { UpdateStatusPosition } from "@/app/functions/hr/position";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Input, Button, Select, SelectItem, Switch } from "@nextui-org/react";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";

export default function Position() {
  const { data: session } = useSession();
  const [branch, setBranch] = useState([]);
  const [division, setDivision] = useState([]);
  const [department, setDepartment] = useState([]);
  const [position, setPosition] = useState([]);
  const [filteredbranch, setFilteredBranch] = useState([]);
  const [filtereddivision, setFilteredDivision] = useState([]);
  const [filtereddepartment, setFilteredDepartment] = useState([]);
  const [filteredposition, setFilteredPosition] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedbranch, setSelectedBranch] = useState("");
  const [selecteddivision, setSelectedDivision] = useState("");
  const [selecteddepartment, setSelectedDepartment] = useState("");
  const [selectedposition, setSelectedPosition] = useState("");

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
        const activeDepartment = data.filter(
          (department) => department.department_status === 1
        );
        setDepartment(activeDepartment);
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    };

    const loadPositionData = async () => {
      try {
        const data = await FetchPosition();

        if (session.user.user_level === "superadmin") {
          setPosition(data || []);
          setFilteredPosition(data || []);
        } else {
          const filteredposition = (data || []).filter(
            (position) => position.position_status === 1
          );
          setPosition(filteredposition);
          setFilteredPosition(filteredposition);
        }
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    };

    loadBranchData();
    loadDivisionData();
    loadDepartmentData();
    loadPositionData();
  }, [session.user.user_level]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    const filteredposition = position.filter((item) => {
      return Object.values(item)
        .filter((val) => typeof val === "string")
        .some((val) => val.toLowerCase().includes(value));
    });

    setFilteredPosition(filteredposition);

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

    const filtereddepartment = department.filter((item) => {
      return Object.values(item)
        .filter((val) => typeof val === "string")
        .some((val) => val.toLowerCase().includes(value));
    });

    setFilteredDepartment(filtereddepartment);
  };

  const handleSelectPositionChange = (keys) => {
    const value = [...keys][0];
    setSelectedPosition(value);

    if (value === "") {
      setFilteredPosition(position);
    } else {
      const filteredposition = position.filter((item) => {
        return item.position_id.toString() === value;
      });

      if (filteredposition.length > 0) {
        setFilteredPosition(filteredposition);
      } else {
        setFilteredPosition(position);
      }
    }
  };

  const handleSelectBranchChange = (keys) => {
    const value = [...keys][0];
    if (value === selectedbranch) {
      setSelectedBranch("");
      setFilteredPosition(position);
    } else {
      setSelectedBranch(value);

      if (value === "" || value === undefined) {
        setFilteredPosition(position);
      } else {
        console.log(value);

        const filteredposition = position.filter((item) => {
          return item.branch_id.toString() === value;
        });

        if (filteredposition.length > 0) {
          setFilteredPosition(filteredposition);
        } else {
          setFilteredPosition([]);
        }
      }
    }
  };

  const handleSelectDivisionChange = (keys) => {
    const value = [...keys][0];
    if (value === selecteddivision) {
      setSelectedDivision("");
      setFilteredPosition(position);
    } else {
      setSelectedDivision(value);

      if (value === "" || value === undefined) {
        setFilteredPosition(position);
      } else {
        console.log(value);

        const filteredposition = position.filter((item) => {
          return item.division_id.toString() === value;
        });

        if (filteredposition.length > 0) {
          setFilteredPosition(filteredposition);
        } else {
          setFilteredPosition([]);
        }
      }
    }
  };

  const handleSelectDepartmentChange = (keys) => {
    const value = [...keys][0];
    if (value === selecteddepartment) {
      setSelectedDepartment("");
      setFilteredPosition(position);
    } else {
      setSelectedDepartment(value);

      if (value === "" || value === undefined) {
        setFilteredPosition(position);
      } else {
        console.log(value);

        const filteredposition = position.filter((item) => {
          return item.department_id.toString() === value;
        });

        if (filteredposition.length > 0) {
          setFilteredPosition(filteredposition);
        } else {
          setFilteredPosition([]);
        }
      }
    }
  };

  const handleStatusChange = async (position_id, currentStatus) => {
    const newStatus = currentStatus ? 0 : 1;
    try {
      const result = await UpdateStatusPosition({
        position_id,
        position_status: newStatus,
        position_update_by: session.user.user_id,
      });

      if (result.status === 200) {
        toast.success(result.message);
        const updatedData = position.map((position) =>
          position.position_id === position_id
            ? { ...position, position_status: newStatus }
            : position
        );
        setPosition(updatedData);
        setFilteredPosition(updatedData);

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
    { name: "ตำแหน่ง", selector: (row) => row.position_name || "-" },
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
        selector: (row) => row.position_create_time || "-",
      },
      { name: "แก้ไขโดย", selector: (row) => row.update_by || "-" },
      {
        name: "แก้ไขเมื่อ",
        selector: (row) => row.position_update_time || "-",
      },
      {
        name: "แก้ไข",
        cell: (row) => (
          <Link
            href={`/hr/position/${row.position_id}`}
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
          isSelected={row.position_status}
          color="success"
          onChange={() =>
            handleStatusChange(row.position_id, row.position_status)
          }
        />
      ),
    });
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-6">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          ตำแหน่ง
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <AddHomeOutlinedIcon />
          <span className="px-4 text-[#635bff] bg-[#635bff]/25 rounded-xl">
            ตำแหน่ง
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
            placeholder="ค้นหาโดยการเลือกสาขา"
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
            placeholder="ค้นหาโดยการเลือกฝ่าย"
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
            placeholder="ค้นหาโดยการเลือกแผนก"
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
        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
          <Select
            label="ค้นหา"
            placeholder="ค้นหาโดยการเลือกตำแหน่ง"
            size="md"
            variant="bordered"
            selectedKeys={selectedposition ? [selectedposition] : []}
            onSelectionChange={handleSelectPositionChange}
          >
            <SelectItem key="">เลือกทั้งหมด</SelectItem>
            {position.map((position) => (
              <SelectItem key={position.position_id}>
                {position.position_name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <Link href="/hr/position/create">
          <Button className="flex items-center justify-center w-full h-full p-3 gap-2 text-[#FFFFFF] bg-[#615DFF]">
            เพิ่ม
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-f p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-4 gap-2 font-[600] border-b-2">
          ข้อมูล ตำแหน่ง
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
          <DataTable
            columns={columns}
            data={Array.isArray(filteredposition) ? filteredposition : []}
            pagination
            noDataComponent="ไม่พบข้อมูล"
            highlightOnHover
          />
        </div>
      </div>
    </div>
  );
}
