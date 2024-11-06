"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { FetchRole } from "@/app/functions/hr/role";
import { UpdateStatusRole } from "@/app/functions/hr/role";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Input, Button, Select, SelectItem, Switch } from "@nextui-org/react";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";

export default function Role() {
  const { data: session } = useSession();
  const [role, setRole] = useState([]);
  const [filteredrole, setFilteredRole] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedrole, setSelectedRole] = useState("");

  useEffect(() => {
    const loadRoleData = async () => {
      try {
        const data = await FetchRole();

        if (session.user.user_level === "superadmin") {
          setRole(data || []);
          setFilteredRole(data || []);
        } else {
          const filteredrole = (data || []).filter(
            (role) => role.role_status === 1
          );
          setRole(filteredrole);
          setFilteredRole(filteredrole);
        }
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    };

    loadRoleData();
  }, [session.user.user_level]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    const filteredrole = role.filter((item) => {
      return Object.values(item)
        .filter((val) => typeof val === "string")
        .some((val) => val.toLowerCase().includes(value));
    });

    setFilteredRole(filteredrole);
  };

  const handleSelectRoleChange = (keys) => {
    const value = [...keys][0];
    setSelectedRole(value);

    if (value === "") {
      setFilteredRole(role);
    } else {
      const filteredrole = role.filter((item) => {
        return item.role_id.toString() === value;
      });

      if (filteredrole.length > 0) {
        setFilteredRole(filteredrole);
      } else {
        setFilteredRole(role);
      }
    }
  };

  const handleStatusChange = async (role_id, currentStatus) => {
    const newStatus = currentStatus ? 0 : 1;
    try {
      const result = await UpdateStatusRole({
        role_id,
        role_status: newStatus,
        role_update_by: session.user.user_id,
      });

      if (result.status === 200) {
        toast.success(result.message);
        const updatedData = role.map((role) =>
          role.role_id === role_id ? { ...role, role_status: newStatus } : role
        );
        setRole(updatedData);
        setFilteredRole(updatedData);

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
    { name: "บทบาทหน้าที่", selector: (row) => row.role_name || "-" },
  ];

  let columns = [...commonColumns];

  if (
    session.user.user_level === "superadmin" ||
    session.user.user_level === "admin"
  ) {
    columns = [
      ...columns,
      { name: "สร้างโดย", selector: (row) => row.create_by || "-" },
      { name: "สร้างเมื่อ", selector: (row) => row.role_create_time || "-" },
      { name: "แก้ไขโดย", selector: (row) => row.update_by || "-" },
      { name: "แก้ไขเมื่อ", selector: (row) => row.role_update_time || "-" },
      {
        name: "แก้ไข",
        cell: (row) => (
          <Link
            href={`/hr/role/${row.role_id}`}
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
          isSelected={row.role_status}
          color="success"
          onChange={() => handleStatusChange(row.role_id, row.role_status)}
        />
      ),
    });
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-6">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          บทบาทหน้าที่
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <AddHomeOutlinedIcon />
          <span className="px-4 text-[#635bff] bg-[#635bff]/25 rounded-xl">
            บทบาทหน้าที่
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
            placeholder="เลือกบทบาทหน้าที่"
            size="md"
            variant="bordered"
            selectedKeys={selectedrole ? [selectedrole] : []}
            onSelectionChange={handleSelectRoleChange}
          >
            <SelectItem key="">เลือกทั้งหมด</SelectItem>
            {role.map((role) => (
              <SelectItem key={role.role_id}>{role.role_name}</SelectItem>
            ))}
          </Select>
        </div>
        <Link href="/hr/role/create">
          <Button className="flex items-center justify-center w-full h-full p-3 gap-2 text-[#FFFFFF] bg-[#615DFF]">
            เพิ่ม
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-f p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-4 gap-2 font-[600] border-b-2">
          ข้อมูล บทบาทหน้าที่
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
          <DataTable
            columns={columns}
            data={Array.isArray(filteredrole) ? filteredrole : []}
            pagination
            noDataComponent="ไม่พบข้อมูล"
            highlightOnHover
          />
        </div>
      </div>
    </div>
  );
}
