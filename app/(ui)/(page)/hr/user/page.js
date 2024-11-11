"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { FetchUser } from "@/app/functions/hr/user/user";
import { FetchBranch } from "@/app/functions/hr/branch";
import { FetchSite } from "@/app/functions/hr/site";
import { FetchDivision } from "@/app/functions/hr/division";
import { FetchDepartment } from "@/app/functions/hr/department";
import { FetchPosition } from "@/app/functions/hr/position";
import { EditOutlined, AddHomeOutlined } from "@mui/icons-material";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import PaginationControls from "@/app/components/PaginationControls";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
    setCurrentPage(1);
  };
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
        console.log(value)

        const filtereduser = user.filter((item) => {
            return item.branch_id.toString() === value;
        });

        if (filtereduser.length > 0) {
            setFilteredUser(filtereduser);
        } else {
            setFilteredUser([]);
        }
    }
};
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
        console.log(value)

        const filtereduser = user.filter((item) => {
            return item.site_id.toString() === value;
        });

        if (filtereduser.length > 0) {
            setFilteredUser(filtereduser);
        } else {
            setFilteredUser([]);
        }
    }
};
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
        console.log(value)

        const filtereduser = user.filter((item) => {
            return item.division_id.toString() === value;
        });

        if (filtereduser.length > 0) {
            setFilteredUser(filtereduser);
        } else {
            setFilteredUser([]);
        }
    }
};
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
        console.log(value)

        const filtereduser = user.filter((item) => {
            return item.department_id.toString() === value;
        });

        if (filtereduser.length > 0) {
            setFilteredUser(filtereduser);
        } else {
            setFilteredUser([]);
        }
    }
};
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(filtereduser)
    ? filtereduser.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-6">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          ผู้ใช้งาน
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <AddHomeOutlined />
          <span className="px-4 text-[#635bff] bg-[#635bff]/25 rounded-xl">
            ผู้ใช้งาน
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex flex-col xl:flex-row items-center justify-between w-full h-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full xl:w-1/2 p-2 gap-2">
            <Input
              type="text"
              placeholder="ค้นหาโดยข้อความ"
              size="lg"
              variant="bordered"
              value={searchText}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="flex flex-col xl:flex-row items-center justify-between w-full h-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full xl:w-1/2 p-2 gap-2">
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
          <div className="flex items-center justify-center w-full h-full xl:w-1/2 p-2 gap-2">
            <Select
              label="ค้นหา"
              placeholder="เลือกไซต์"
              size="md"
              variant="bordered"
              selectedKeys={selectedsite ? [selectedsite] : []}
              onSelectionChange={handleSelectSiteChange}
            >
              <SelectItem key="">เลือกทั้งหมด</SelectItem>
              {site.map((site) => (
                <SelectItem key={site.site_id}>{site.site_name}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex items-center justify-center w-full h-full xl:w-1/2 p-2 gap-2">
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
          <div className="flex items-center justify-center w-full h-full xl:w-1/2 p-2 gap-2">
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
          <div className="flex items-center justify-center w-full h-full xl:w-1/2 p-2 gap-2">
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
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full p-6 gap-6 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-between w-full h-full p-2 gap-2 font-[600] border-b-2">
          ข้อมูล ผู้ใช้งาน
          {(session.user.user_level === "superadmin" ||
            session.user.user_level === "admin") && (
            <Link href="/hr/user/create">
              <Button size="md" className=" bg-[#615DFF] text-[#FFFFFF]">
                เพิ่มข้อมูล
              </Button>
            </Link>
          )}
        </div>
        <div className="overflow-auto w-full rounded-xl border">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border-b p-2 py-4">ลำดับ</th>
                <th className="border-b p-2">รหัสพนักงาน</th>
                <th className="border-b p-2">เลขบัตรพนักงาน</th>
                {/* <th className="border-b p-2">รหัสผ่าน</th> */}
                <th className="border-b p-2">คำนำหน้าชื่อ</th>

                <th className="border-b p-2">ชื่อ</th>
                <th className="border-b p-2">นามสกุล</th>
                <th className="border-b p-2">ชื่อเล่น</th>
                <th className="border-b p-2">เบอร์โทรศัพท์</th>
                <th className="border-b p-2">อีเมลล์</th>

                <th className="border-b p-2">ระดับการใช้งาน</th>
                <th className="border-b p-2">วันเกิด</th>
                <th className="border-b p-2">เพศ</th>
                <th className="border-b p-2">เลขบัตรประชาชน</th>
                <th className="border-b p-2">สัญชาติ</th>

                <th className="border-b p-2">ชนิดของพนักงาน</th>
                <th className="border-b p-2">สาขา</th>
                <th className="border-b p-2">ไซต์งาน</th>
                <th className="border-b p-2">ฝ่าย</th>
                <th className="border-b p-2">แผนก</th>

                <th className="border-b p-2">ตำแหน่ง</th>
                <th className="border-b p-2">บทบาทหน้าที่</th>
                <th className="border-b p-2">ผู้บังคับบัญชา</th>
                <th className="border-b p-2">วันที่เริ่มงาน</th>

                <th className="border-b p-2">รูปถ่าย</th>
                <th className="border-b p-2">ลายเซ็น</th>

                {(session.user.user_level === "superadmin" ||
                  session.user.user_level === "admin") && (
                  <>
                    <th className="border-b p-2">สร้างโดย</th>
                    <th className="border-b p-2">วันที่สร้าง</th>
                    <th className="border-b p-2">แก้ไขโดย</th>
                    <th className="border-b p-2">วันที่แก้ไข</th>
                    <th className="border-b p-2">สถานะ</th>
                    <th className="border-b p-2">แก้ไข</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {{Array.isArray(filtereduser) ? filtereduser : []}.length > 0 ? (
                {Array.isArray(filtereduser) ? filtereduser : []}.map((row, index) => (
                  <tr key={row.user_id}>
                    <td className="min-w-40 border-b p-2 text-center text-sm py-6">
                      {indexOfFirstItem + index + 1 || "-"}
                    </td>
                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      <img
                        src={`/images/user_picture/${row.user_picture_file}`}
                        alt="user picture"
                        width={100}
                        height={100}
                      />
                    </td>
                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      {row.user_number || "-"}
                    </td>
                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      {row.user_card_number || "-"}
                    </td>
                    {/* <td className="min-w-40 border-b p-2 text-center text-sm">
                      {row.user_password || "-"}
                    </td> */}
                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      {row.user_title || "-"}
                    </td>

                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      {row.user_firstname || "-"}
                    </td>
                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      {row.user_lastname || "-"}
                    </td>
                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      {row.user_nickname || "-"}
                    </td>
                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      {row.user_tel || "-"}
                    </td>
                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      {row.user_email || "-"}
                    </td>

                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      {row.user_level || "-"}
                    </td>
                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      {row.user_birthday || "-"}
                    </td>
                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      {row.user_gender || "-"}
                    </td>
                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      {row.user_id_card || "-"}
                    </td>
                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      {row.user_citizen || "-"}
                    </td>

                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      {row.user_type || "-"}
                    </td>
                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      {row.branch_name || "-"}
                    </td>
                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      {row.site_name || "-"}
                    </td>
                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      {row.division_name || "-"}
                    </td>
                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      {row.department_name || "-"}
                    </td>

                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      {row.position_name || "-"}
                    </td>
                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      {row.role_name || "-"}
                    </td>
                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      {row.parent_name || "-"}
                    </td>
                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      {row.user_start_work || "-"}
                    </td>
                    <td className="min-w-40 border-b p-2 text-center text-sm">
                      <img
                        src={`/images/user_picture/${row.user_signature_file}`}
                        alt="user picture"
                        width={50}
                        height={50}
                      />
                    </td>
                    {(session.user.user_level === "superadmin" ||
                      session.user.user_level === "admin") && (
                      <>
                        <td className="min-w-40 border-b p-2 text-center text-sm">
                          {row.create_by || "-"}
                        </td>
                        <td className="min-w-40 border-b p-2 text-center text-sm">
                          {row.user_create_time || "-"}
                        </td>
                        <td className="min-w-40 border-b p-2 text-center text-sm">
                          {row.update_by || "-"}
                        </td>
                        <td className="min-w-40 border-b p-2 text-center text-sm">
                          {row.user_update_time || "-"}
                        </td>
                        <td className="min-w-40 border-b p-2 text-center text-sm">
                          {row.user_status === 1 ? (
                            <span className="px-4 py-2 text-[#16cdc7] bg-[#16cdc725] rounded-xl">
                              พนักงาน
                            </span>
                          ) : (
                            <span className="px-4 py-2 text-[#ff6692] bg-[#ff669225] rounded-xl">
                              ลาออก
                            </span>
                          )}
                        </td>
                        <td className="min-w-40 border-b p-2 text-center text-sm">
                          <Link
                            href={`/hr/user/${row.user_id}`}
                            className="text-[#f8c20a]"
                          >
                            <EditOutlined />
                          </Link>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={
                      session.user.user_level === "superadmin" ||
                      session.user.user_level === "admin"
                        ? 8
                        : 2
                    }
                    className="border p-2 text-center text-sm"
                  >
                    ไม่พบข้อมูล
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <PaginationControls
          itemsPerPage={itemsPerPage}
          handleItemsPerPageChange={handleItemsPerPageChange}
          currentPage={currentPage}
          totalItems={filtereduser.length}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
