"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { FetchBranch } from "@/app/functions/hr/branch";
import { FetchSite } from "@/app/functions/hr/site";
import { FetchDivision } from "@/app/functions/hr/division";
import { FetchDepartment } from "@/app/functions/hr/department";
import { FetchPosition } from "@/app/functions/hr/position";
import { FetchUser } from "@/app/functions/hr/user";
import { UpdateStatusUser } from "@/app/functions/hr/user";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Input, Button, Select, SelectItem, Switch } from "@nextui-org/react";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";

export default function User() {
  const { data: session } = useSession();
  const [branch, setBranch] = useState([]);
  const [site, setSite] = useState([]);
  const [division, setDivision] = useState([]);
  const [department, setDepartment] = useState([]);
  const [position, setPosition] = useState([]);
  const [user, setUser] = useState([]);
  const [filteredbranch, setFilteredBranch] = useState([]);
  const [filteredsite, setFilteredSite] = useState([]);
  const [filtereddivision, setFilteredDivision] = useState([]);
  const [filtereddepartment, setFilteredDepartment] = useState([]);
  const [filteredposition, setFilteredPosition] = useState([]);
  const [filtereduser, setFilteredUser] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedbranch, setSelectedBranch] = useState("");
  const [selectedsite, setSelectedSite] = useState("");
  const [selecteddivision, setSelectedDivision] = useState("");
  const [selecteddepartment, setSelectedDepartment] = useState("");
  const [selectedposition, setSelectedPosition] = useState("");
  const [selecteduser, setSelectedUser] = useState("");

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
        const activeSite = data.filter((site) => site.site_status === 1);
        setSite(activeSite);
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
        const activePosition = data.filter(
          (position) => position.position_status === 1
        );
        setPosition(activePosition);
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    };

    const loadUserData = async () => {
      try {
        const data = await FetchUser();

        if (session.user.user_level === "superadmin") {
          setUser(data || []);
          setFilteredUser(data || []);
        } else {
          const filtereduser = (data || []).filter(
            (user) => user.user_status === 1
          );
          setUser(filtereduser);
          setFilteredUser(filtereduser);
        }
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    };

    loadBranchData();
    loadSiteData();
    loadDivisionData();
    loadDepartmentData();
    loadPositionData();
    loadUserData();
  }, [session.user.user_level]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    const filtereduser = user.filter((item) => {
      return Object.values(item)
        .filter((val) => typeof val === "string")
        .some((val) => val.toLowerCase().includes(value));
    });

    setFilteredUser(filtereduser);

    const filteredbranch = branch.filter((item) => {
      return Object.values(item)
        .filter((val) => typeof val === "string")
        .some((val) => val.toLowerCase().includes(value));
    });

    setFilteredBranch(filteredbranch);

    const filteredsite = site.filter((item) => {
      return Object.values(item)
        .filter((val) => typeof val === "string")
        .some((val) => val.toLowerCase().includes(value));
    });

    setFilteredSite(filteredsite);

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

    const filteredposition = position.filter((item) => {
      return Object.values(item)
        .filter((val) => typeof val === "string")
        .some((val) => val.toLowerCase().includes(value));
    });

    setFilteredPosition(filteredposition);
  };

  const handleSelectUserChange = (keys) => {
    const value = [...keys][0];
    setSelectedUser(value);

    if (value === "") {
      setFilteredUser(user);
    } else {
      const filtereduser = user.filter((item) => {
        return item.user_id.toString() === value;
      });

      if (filtereduser.length > 0) {
        setFilteredUser(filtereduser);
      } else {
        setFilteredUser(user);
      }
    }
  };

  const handleSelectBranchChange = (keys) => {
    const value = [...keys][0];
    if (value === selectedbranch) {
      setSelectedBranch("");
      setFilteredUser(user);
    } else {
      setSelectedBranch(value);

      if (value === "" || value === undefined) {
        setFilteredUser(user);
      } else {
        console.log(value);

        const filtereduser = user.filter((item) => {
          return item.branch_id.toString() === value;
        });

        if (filtereduser.length > 0) {
          setFilteredUser(filtereduser);
        } else {
          setFilteredUser([]);
        }
      }
    }
  };

  const handleSelectSiteChange = (keys) => {
    const value = [...keys][0];
    if (value === selectedsite) {
      setSelectedSite("");
      setFilteredUser(user);
    } else {
      setSelectedSite(value);

      if (value === "" || value === undefined) {
        setFilteredUser(user);
      } else {
        console.log(value);

        const filtereduser = user.filter((item) => {
          return item.site_id.toString() === value;
        });

        if (filtereduser.length > 0) {
          setFilteredUser(filtereduser);
        } else {
          setFilteredUser([]);
        }
      }
    }
  };

  const handleSelectDivisionChange = (keys) => {
    const value = [...keys][0];
    if (value === selecteddivision) {
      setSelectedDivision("");
      setFilteredUser(user);
    } else {
      setSelectedDivision(value);

      if (value === "" || value === undefined) {
        setFilteredUser(user);
      } else {
        console.log(value);

        const filtereduser = user.filter((item) => {
          return item.division_id.toString() === value;
        });

        if (filtereduser.length > 0) {
          setFilteredUser(filtereduser);
        } else {
          setFilteredUser([]);
        }
      }
    }
  };

  const handleSelectDepartmentChange = (keys) => {
    const value = [...keys][0];
    if (value === selecteddepartment) {
      setSelectedDepartment("");
      setFilteredUser(user);
    } else {
      setSelectedDepartment(value);

      if (value === "" || value === undefined) {
        setFilteredUser(user);
      } else {
        console.log(value);

        const filtereduser = user.filter((item) => {
          return item.department_id.toString() === value;
        });

        if (filtereduser.length > 0) {
          setFilteredUser(filtereduser);
        } else {
          setFilteredUser([]);
        }
      }
    }
  };

  const handleSelectPositionChange = (keys) => {
    const value = [...keys][0];
    if (value === selectedposition) {
      setSelectedPosition("");
      setFilteredUser(user);
    } else {
      setSelectedPosition(value);

      if (value === "" || value === undefined) {
        setFilteredUser(user);
      } else {
        console.log(value);

        const filtereduser = user.filter((item) => {
          return item.position_id && item.position_id.toString() === value;
        });

        if (filtereduser.length > 0) {
          setFilteredUser(filtereduser);
        } else {
          setFilteredUser([]);
        }
      }
    }
  };

  const handleStatusChange = async (user_id, currentStatus) => {
    const newStatus = currentStatus ? 0 : 1;
    try {
      const result = await UpdateStatusUser({
        user_id,
        user_status: newStatus,
        user_update_by: session.user.user_id,
      });

      if (result.status === 200) {
        toast.success(result.message);
        const updatedData = user.map((user) =>
          user.user_id === user_id ? { ...user, user_status: newStatus } : user
        );
        setUser(updatedData);
        setFilteredUser(updatedData);

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
    { name: "รหัสพนักงาน", selector: (row) => row.user_number || "-" },
    { name: "ชื่อจริง", selector: (row) => row.user_firstname || "-" },
    { name: "นามสกุล", selector: (row) => row.user_lastname || "-" },

    { name: "ชื่อเล่น", selector: (row) => row.user_nickname || "-" },
    { name: "ชื่อสาขา", selector: (row) => row.branch_name || "-" },
    { name: "ชื่อไซต์", selector: (row) => row.site_name || "-" },
    { name: "ชื่อฝ่าย", selector: (row) => row.division_name || "-" },
    { name: "ชื่อแผนก", selector: (row) => row.department_name || "-" },

    { name: "ตำแหน่ง", selector: (row) => row.position_name || "-" },
    { name: "บทบาทหน้าที่", selector: (row) => row.role_name || "-" },
    { name: "ผู้บังคับบัญชา", selector: (row) => row.parent_name || "-" },
    { name: "ประเภทพนักงาน", selector: (row) => row.user_type || "-" },
    { name: "เลขบัตรประชาชน", selector: (row) => row.user_id_card || "-" },

    { name: "สัญชาติ", selector: (row) => row.user_citizen || "-" },
    { name: "ระดับผู้ใช้", selector: (row) => row.user_level || "-" },
    { name: "อีเมลล์", selector: (row) => row.user_email || "-" },
    { name: "เบอร์ติดต่อ", selector: (row) => row.user_tel || "-" },

    {
      name: "รูป",
      selector: (row) =>
        row.user_picture_file ? (
          <img
            src={`/images/user_picture/${row.user_picture_file}`}
            alt="user picture"
            width={50}
            height={50}
          />
        ) : (
          "-"
        ),
    },
    {
      name: "ลายเซ็น",
      selector: (row) =>
        row.user_signature_file ? (
          <img
            src={`/images/signature/${row.user_picture_file}`}
            alt="signature"
            width={50}
            height={50}
          />
        ) : (
          "-"
        ),
    },
    {
      name: "สถานะบัญชี",
      selector: (row) => row.user_status,
      sortable: true,
      cell: (row) => (
        <div>
          {row.user_status == "1" ? (
            <span style={{ color: "green" }}>●</span>
          ) : (
            <span style={{ color: "red" }}>●</span>
          )}
        </div>
      ),
    },
    {
      name: "สถานะการใช้งาน",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <div>
          {row.status === "online" ? (
            <span style={{ color: "green" }}>●</span>
          ) : (
            <span style={{ color: "red" }}>●</span>
          )}
        </div>
      ),
    },
  ];

  let columns = [...commonColumns];

  if (
    session.user.user_level === "superadmin" ||
    session.user.user_level === "admin"
  ) {
    columns = [
      ...columns,
      { name: "สร้างโดย", selector: (row) => row.create_by || "-" },
      { name: "สร้างเมื่อ", selector: (row) => row.user_create_time || "-" },
      { name: "แก้ไขโดย", selector: (row) => row.update_by || "-" },
      { name: "แก้ไขเมื่อ", selector: (row) => row.user_update_time || "-" },
      {
        name: "แก้ไข",
        cell: (row) => (
          <Link
            href={`/hr/user/${row.user_id}`}
            className="text-[#FFD000] hover:text-[#FFD000]/75"
          >
            <EditOutlinedIcon className="h-6 w-6" />
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
          isSelected={row.user_status}
          color="success"
          onChange={() => handleStatusChange(row.user_id, row.user_status)}
        />
      ),
    });
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-6">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          ผู้ใช้งาน
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <AddHomeOutlinedIcon />
          <span className="px-4 text-[#635bff] bg-[#635bff]/25 rounded-xl">
            ผู้ใช้งาน
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
        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
          <Select
            label="ค้นหา"
            placeholder="เลือกตำแหน่ง"
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
        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
          <Select
            label="ค้นหา"
            placeholder="เลือกผู้ใช้งาน"
            size="md"
            variant="bordered"
            selectedKeys={selecteduser ? [selecteduser] : []}
            onSelectionChange={handleSelectUserChange}
          >
            <SelectItem key="">เลือกทั้งหมด</SelectItem>
            {user.map((user) => (
              <SelectItem key={user.user_id}>{user.user_firstname}</SelectItem>
            ))}
          </Select>
        </div>
        <Link href="/hr/user/create">
          <Button className="flex items-center justify-center w-full h-full p-3 gap-2 text-[#FFFFFF] bg-[#615DFF]">
            เพิ่ม
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-f p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-4 gap-2 font-[600] border-b-2">
          ข้อมูล ผู้ใช้งาน
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
          <DataTable
            columns={columns}
            data={Array.isArray(filtereduser) ? filtereduser : []}
            pagination
            noDataComponent="ไม่พบข้อมูล"
            highlightOnHover
          />
        </div>
      </div>
    </div>
  );
}
