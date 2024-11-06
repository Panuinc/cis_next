"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { FetchBranch } from "@/app/functions/hr/branch";
import { FetchDivision } from "@/app/functions/hr/division";
import { UpdateStatusDivision } from "@/app/functions/hr/division";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Input, Button, Select, SelectItem, Switch } from "@nextui-org/react";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";

export default function Division() {
  const { data: session } = useSession();
  const [branch, setBranch] = useState([]);
  const [division, setDivision] = useState([]);
  const [filteredbranch, setFilteredBranch] = useState([]);
  const [filtereddivision, setFilteredDivision] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedbranch, setSelectedBranch] = useState("");
  const [selecteddivision, setSelectedDivision] = useState("");

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

        if (session.user.user_level === "superadmin") {
          setDivision(data || []);
          setFilteredDivision(data || []);
        } else {
          const filtereddivision = (data || []).filter(
            (division) => division.division_status === 1
          );
          setDivision(filtereddivision);
          setFilteredDivision(filtereddivision);
        }
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    };

    loadBranchData();
    loadDivisionData();
  }, [session.user.user_level]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    const filtereddivision = division.filter((item) => {
      return Object.values(item)
        .filter((val) => typeof val === "string")
        .some((val) => val.toLowerCase().includes(value));
    });

    setFilteredDivision(filtereddivision);

    const filteredbranch = branch.filter((item) => {
      return Object.values(item)
        .filter((val) => typeof val === "string")
        .some((val) => val.toLowerCase().includes(value));
    });

    setFilteredBranch(filteredbranch);
  };

  const handleSelectDivisionChange = (keys) => {
    const value = [...keys][0];
    setSelectedDivision(value);

    if (value === "") {
      setFilteredDivision(division);
    } else {
      const filtereddivision = division.filter((item) => {
        return item.division_id.toString() === value;
      });

      if (filtereddivision.length > 0) {
        setFilteredDivision(filtereddivision);
      } else {
        setFilteredDivision(division);
      }
    }
  };

  const handleSelectBranchChange = (keys) => {
    const value = [...keys][0];
    if (value === selectedbranch) {
      setSelectedBranch("");
      setFilteredDivision(division);
    } else {
      setSelectedBranch(value);

      if (value === "" || value === undefined) {
        setFilteredDivision(division);
      } else {
        console.log(value);

        const filtereddivision = division.filter((item) => {
          return item.branch_id.toString() === value;
        });

        if (filtereddivision.length > 0) {
          setFilteredDivision(filtereddivision);
        } else {
          setFilteredDivision([]);
        }
      }
    }
  };

  const handleStatusChange = async (division_id, currentStatus) => {
    const newStatus = currentStatus ? 0 : 1;
    try {
      const result = await UpdateStatusDivision({
        division_id,
        division_status: newStatus,
        division_update_by: session.user.user_id,
      });

      if (result.status === 200) {
        toast.success(result.message);
        const updatedData = division.map((division) =>
          division.division_id === division_id
            ? { ...division, division_status: newStatus }
            : division
        );
        setDivision(updatedData);
        setFilteredDivision(updatedData);

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
    { name: "ชื่อย่อฝ่าย", selector: (row) => row.division_acronym || "-" },
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
        selector: (row) => row.division_create_time || "-",
      },
      { name: "แก้ไขโดย", selector: (row) => row.update_by || "-" },
      {
        name: "แก้ไขเมื่อ",
        selector: (row) => row.division_update_time || "-",
      },
      {
        name: "แก้ไข",
        cell: (row) => (
          <Link
            href={`/hr/division/${row.division_id}`}
            className="text-[#f8c20a] hover:text-[#f8c20a]/75"
          >
            <EditOutlinedIcon />
          </Link>
        ),
      },
    ];
  }

  if (session.user.user_level === "superadmin") {
    columns.push({
      name: "Status",
      cell: (row) => (
        <Switch
          isSelected={row.division_status}
          color="success"
          onChange={() =>
            handleStatusChange(row.division_id, row.division_status)
          }
        />
      ),
    });
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-6">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          ฝ่าย
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <AddHomeOutlinedIcon />
          <span className="px-4 text-[#635bff] bg-[#635bff]/25 rounded-xl">
            ฝ่าย
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
        <Link href="/hr/division/create">
          <Button className="flex items-center justify-center w-full h-full p-3 gap-2 text-[#FFFFFF] bg-[#615DFF]">
            เพิ่ม
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-f p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-4 gap-2 font-[600] border-b-2">
          ข้อมูล ฝ่าย
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
          <DataTable
            columns={columns}
            data={Array.isArray(filtereddivision) ? filtereddivision : []}
            pagination
            noDataComponent="ไม่พบข้อมูล"
            highlightOnHover
          />
        </div>
      </div>
    </div>
  );
}
