"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { FetchBranch } from "@/app/functions/hr/branch";
import { FetchSite } from "@/app/functions/hr/site";
import { UpdateStatusSite } from "@/app/functions/hr/site";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Input, Button, Select, SelectItem, Switch } from "@nextui-org/react";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";

export default function Site() {
  const { data: session } = useSession();
  const [branch, setBranch] = useState([]);
  const [site, setSite] = useState([]);
  const [filteredbranch, setFilteredBranch] = useState([]);
  const [filteredsite, setFilteredSite] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedbranch, setSelectedBranch] = useState("");
  const [selectedsite, setSelectedSite] = useState("");

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

    const loadSiteData = async () => {
      try {
        const data = await FetchSite();

        if (session.user.user_level === "superadmin") {
          setSite(data || []);
          setFilteredSite(data || []);
        } else {
          const filteredsite = (data || []).filter(
            (site) => site.site_status === 1
          );
          setSite(filteredsite);
          setFilteredSite(filteredsite);
        }
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    };

    loadBranchData();
    loadSiteData();
  }, [session.user.user_level]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    const filteredsite = site.filter((item) => {
      return Object.values(item)
        .filter((val) => typeof val === "string")
        .some((val) => val.toLowerCase().includes(value));
    });

    setFilteredSite(filteredsite);

    const filteredbranch = branch.filter((item) => {
      return Object.values(item)
        .filter((val) => typeof val === "string")
        .some((val) => val.toLowerCase().includes(value));
    });

    setFilteredBranch(filteredbranch);
  };

  const handleSelectSiteChange = (keys) => {
    const value = [...keys][0];
    setSelectedSite(value);

    if (value === "") {
      setFilteredSite(site);
    } else {
      const filteredsite = site.filter((item) => {
        return item.site_id.toString() === value;
      });

      if (filteredsite.length > 0) {
        setFilteredSite(filteredsite);
      } else {
        setFilteredSite(site);
      }
    }
  };

  const handleSelectBranchChange = (keys) => {
    const value = [...keys][0];
    if (value === selectedbranch) {
      setSelectedBranch("");
      setFilteredSite(site);
    } else {
      setSelectedBranch(value);

      if (value === "" || value === undefined) {
        setFilteredSite(site);
      } else {
        console.log(value);

        const filteredsite = site.filter((item) => {
          return item.branch_id.toString() === value;
        });

        if (filteredsite.length > 0) {
          setFilteredSite(filteredsite);
        } else {
          setFilteredSite([]);
        }
      }
    }
  };

  const handleStatusChange = async (site_id, currentStatus) => {
    const newStatus = currentStatus ? 0 : 1;
    try {
      const result = await UpdateStatusSite({
        site_id,
        site_status: newStatus,
        site_update_by: session.user.user_id,
      });

      if (result.status === 200) {
        toast.success(result.message);
        const updatedData = site.map((site) =>
          site.site_id === site_id
            ? { ...site, site_status: newStatus }
            : site
        );
        setSite(updatedData);
        setFilteredSite(updatedData);

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
    { name: "ไซต์งาน", selector: (row) => row.site_name || "-" },
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
        selector: (row) => row.site_create_time || "-",
      },
      { name: "แก้ไขโดย", selector: (row) => row.update_by || "-" },
      {
        name: "แก้ไขเมื่อ",
        selector: (row) => row.site_update_time || "-",
      },
      {
        name: "แก้ไข",
        cell: (row) => (
          <Link
            href={`/hr/site/${row.site_id}`}
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
          isSelected={row.site_status}
          color="success"
          onChange={() =>
            handleStatusChange(row.site_id, row.site_status)
          }
        />
      ),
    });
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-6">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          ไซต์งาน
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <AddHomeOutlinedIcon />
          <span className="px-4 text-[#635bff] bg-[#635bff]/25 rounded-xl">ไซต์งาน</span>
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
            placeholder="ค้นหาโดยการเลือกไซต์งาน"
            size="md"
            variant="bordered"
            selectedKeys={selectedsite ? [selectedsite] : []}
            onSelectionChange={handleSelectSiteChange}
          >
            <SelectItem key="">เลือกทั้งหมด</SelectItem>
            {site.map((site) => (
              <SelectItem key={site.site_id}>
                {site.site_name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <Link href="/hr/site/create">
          <Button className="flex items-center justify-center w-full h-full p-3 gap-2 text-[#FFFFFF] bg-[#615DFF]">
            เพิ่ม
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-f p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-4 gap-2 font-[600] border-b-2">
          ข้อมูล ไซต์งาน
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
          <DataTable
            columns={columns}
            data={Array.isArray(filteredsite) ? filteredsite : []}
            pagination
            noDataComponent="ไม่พบข้อมูล"
            highlightOnHover
          />
        </div>
      </div>
    </div>
  );
}
