"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { FetchBranch } from "@/app/functions/hr/branch";
import { UpdateStatusBranch } from "@/app/functions/hr/branch";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import { Input, Button, Select, SelectItem, Switch } from "@nextui-org/react";

export default function BranchList() {
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

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-6">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          สาขา
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <CottageOutlinedIcon />
          <span className="px-4 bg-[#635bff]/25 text-[#635bff] font-[400] rounded-xl">
            สาขา
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-6 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2 border-2 rounded-xl">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              type="text"
              placeholder="ค้นหาโดยข้อความ"
              size="lg"
              variant="bordered"
              value={searchText}
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Select
              placeholder="ค้นหาโดยการเลือกสาขา"
              size="lg"
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
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-6 border-2 rounded-xl">
          <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed text-[#000000] font-[600]">
            ข้อมูล สาขา
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed">
            01
          </div>
        </div>
      </div>
    </div>
  );
}
