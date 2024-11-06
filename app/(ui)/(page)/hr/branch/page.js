"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { FetchBranch } from "@/app/functions/hr/branch";
import { UpdateStatusBranch } from "@/app/functions/hr/branch";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Input, Button, Select, SelectItem, Switch } from "@nextui-org/react";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";

export default function Branch() {
  const { data: session } = useSession();
  const [branch, setBranch] = useState([]);
  const [filteredbranch, setFilteredBranch] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedbranch, setSelectedBranch] = useState("");

  useEffect(() => {
    const loadBranchData = async () => {
      try {
        const data = await FetchBranch();

        if (session.user.user_level === "superadmin") {
          setBranch(data || []);
          setFilteredBranch(data || []);
        } else {
          const filteredbranch = (data || []).filter(
            (branch) => branch.branch_status === 1
          );
          setBranch(filteredbranch);
          setFilteredBranch(filteredbranch);
        }
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    };

    loadBranchData();
  }, [session.user.user_level]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    const filteredbranch = branch.filter((item) => {
      return Object.values(item)
        .filter((val) => typeof val === "string")
        .some((val) => val.toLowerCase().includes(value));
    });

    setFilteredBranch(filteredbranch);
  };

  const handleSelectBranchChange = (keys) => {
    const value = [...keys][0];
    setSelectedBranch(value);

    if (value === "") {
      setFilteredBranch(branch);
    } else {
      const filteredbranch = branch.filter((item) => {
        return item.branch_id.toString() === value;
      });

      if (filteredbranch.length > 0) {
        setFilteredBranch(filteredbranch);
      } else {
        setFilteredBranch(branch);
      }
    }
  };

  const handleStatusChange = async (branch_id, currentStatus) => {
    const newStatus = currentStatus ? 0 : 1;
    try {
      const result = await UpdateStatusBranch({
        branch_id,
        branch_status: newStatus,
        branch_update_by: session.user.user_id,
      });

      if (result.status === 200) {
        toast.success(result.message);
        const updatedData = branch.map((branch) =>
          branch.branch_id === branch_id
            ? { ...branch, branch_status: newStatus }
            : branch
        );
        setBranch(updatedData);
        setFilteredBranch(updatedData);

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
  ];

  let columns = [...commonColumns];

  if (
    session.user.user_level === "superadmin" ||
    session.user.user_level === "admin"
  ) {
    columns = [
      ...columns,
      { name: "สร้างโดย", selector: (row) => row.create_by || "-" },
      { name: "สร้างเมื่อ", selector: (row) => row.branch_create_time || "-" },
      { name: "แก้ไขโดย", selector: (row) => row.update_by || "-" },
      { name: "แก้ไขเมื่อ", selector: (row) => row.branch_update_time || "-" },
      {
        name: "แก้ไข",
        cell: (row) => (
          <Link
            href={`/hr/branch/${row.branch_id}`}
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
          isSelected={row.branch_status}
          color="success"
          onChange={() => handleStatusChange(row.branch_id, row.branch_status)}
        />
      ),
    });
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-6">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          สาขา
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <AddHomeOutlinedIcon />
          <span className="px-4 bg-[#635bff]/25 rounded-xl">สาขา</span>
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
        <Link href="/hr/branch/create">
          <Button className="flex items-center justify-center w-full h-full p-3 gap-2 text-[#FFFFFF] bg-[#615DFF]">
            เพิ่ม
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-f p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-4 gap-2 font-[600] border-b-2">
          ข้อมูล สาขา
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
          <DataTable
            columns={columns}
            data={Array.isArray(filteredbranch) ? filteredbranch : []}
            pagination
            noDataComponent="ไม่พบข้อมูล"
            highlightOnHover
          />
        </div>
      </div>
    </div>
  );
}
