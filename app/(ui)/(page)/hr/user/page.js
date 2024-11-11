"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { FetchUser } from "@/app/functions/hr/user/user";
import { FetchBranch } from "@/app/functions/hr/branch/branch";
import { FetchSite } from "@/app/functions/hr/site/site";
import { FetchDivision } from "@/app/functions/hr/division/division";
import { FetchDepartment } from "@/app/functions/hr/department/department";
import { FetchPosition } from "@/app/functions/hr/position/position";
import { EditOutlined, AddHomeOutlined } from "@mui/icons-material";
import { Input, Button, Select, SelectItem, Checkbox } from "@nextui-org/react";
import PaginationControls from "@/app/components/PaginationControls";
import * as XLSX from "xlsx";

export default function User() {
  const { data: session } = useSession();
  const [branch, setBranch] = useState([]);
  const [site, setSite] = useState([]);
  const [division, setDivision] = useState([]);
  const [department, setDepartment] = useState([]);
  const [position, setPosition] = useState([]);
  const [user, setUser] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSite, setSelectedSite] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("");
  const [selectedCitizen, setSelectedCitizen] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedColumns, setSelectedColumns] = useState({
    user_number: { label: "รหัสพนักงาน", selected: true },
    user_firstname: { label: "ชื่อ", selected: true },
    user_lastname: { label: "นามสกุล", selected: true },
    user_tel: { label: "เบอร์โทรศัพท์", selected: true },
    user_email: { label: "อีเมลล์", selected: true },
    branch_name: { label: "สาขา", selected: true },
    division_name: { label: "ฝ่าย", selected: true },
    department_name: { label: "แผนก", selected: true },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          branchData,
          siteData,
          divisionData,
          departmentData,
          positionData,
          userData,
        ] = await Promise.all([
          FetchBranch(),
          FetchSite(),
          FetchDivision(),
          FetchDepartment(),
          FetchPosition(),
          FetchUser(),
        ]);

        setBranch(branchData.filter((b) => b.branch_status === 1));
        setSite(siteData.filter((s) => s.site_status === 1));
        setDivision(divisionData.filter((d) => d.division_status === 1));
        setDepartment(departmentData.filter((d) => d.department_status === 1));
        setPosition(positionData.filter((p) => p.position_status === 1));

        const filteredUsers =
          session?.user.user_level === "superadmin"
            ? userData
            : userData.filter((u) => u.user_status === 1);
        setUser(filteredUsers);
        setFilteredUser(filteredUsers);
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    };

    if (session?.user) {
      fetchData();
    }
  }, [session]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    const filteredUsers = user.filter((item) =>
      Object.values(item).some(
        (val) => typeof val === "string" && val.toLowerCase().includes(value)
      )
    );
    setFilteredUser(filteredUsers);
    setCurrentPage(1);
  };

  const handleSelectChange = (setter, keyField) => (keys) => {
    const value = [...keys][0];
    setter(value);

    if (!value) {
      setFilteredUser(user);
    } else {
      const filteredUsers = user.filter(
        (item) => item[keyField] && item[keyField].toString() === value
      );
      setFilteredUser(filteredUsers.length > 0 ? filteredUsers : []);
    }
  };

  const handleStatusChange = (keys) => {
    const value = [...keys][0];
    setSelectedStatus(value);

    const filteredUsers = user.filter(
      (item) =>
        (value === "" || item.user_status.toString() === value) &&
        (selectedBranch
          ? item.branch_id.toString() === selectedBranch
          : true) &&
        (selectedSite ? item.site_id.toString() === selectedSite : true) &&
        (selectedDivision
          ? item.division_id.toString() === selectedDivision
          : true) &&
        (selectedDepartment
          ? item.department_id.toString() === selectedDepartment
          : true) &&
        (selectedPosition
          ? item.position_id.toString() === selectedPosition
          : true) &&
        (selectedUserType ? item.user_type === selectedUserType : true)
    );

    setFilteredUser(filteredUsers);
  };

  const handleUserTypeChange = (keys) => {
    const value = [...keys][0];
    setSelectedUserType(value);

    const filteredUsers = user.filter(
      (item) =>
        (value === "" || item.user_type === value) &&
        (selectedBranch
          ? item.branch_id.toString() === selectedBranch
          : true) &&
        (selectedSite ? item.site_id.toString() === selectedSite : true) &&
        (selectedDivision
          ? item.division_id.toString() === selectedDivision
          : true) &&
        (selectedDepartment
          ? item.department_id.toString() === selectedDepartment
          : true) &&
        (selectedPosition
          ? item.position_id.toString() === selectedPosition
          : true) &&
        (selectedStatus ? item.user_status.toString() === selectedStatus : true)
    );

    setFilteredUser(filteredUsers);
  };

  const handleCitizenChange = (keys) => {
    const value = [...keys][0];
    setSelectedCitizen(value);

    const filteredUsers = user.filter(
      (item) =>
        (value === "" || item.user_citizen === value) &&
        (selectedBranch
          ? item.branch_id.toString() === selectedBranch
          : true) &&
        (selectedSite ? item.site_id.toString() === selectedSite : true) &&
        (selectedDivision
          ? item.division_id.toString() === selectedDivision
          : true) &&
        (selectedDepartment
          ? item.department_id.toString() === selectedDepartment
          : true) &&
        (selectedPosition
          ? item.position_id.toString() === selectedPosition
          : true) &&
        (selectedStatus
          ? item.user_status.toString() === selectedStatus
          : true) &&
        (selectedUserType ? item.user_type === selectedUserType : true)
    );

    setFilteredUser(filteredUsers);
  };

  const handlePageChange = (page) => setCurrentPage(page);
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUser.slice(indexOfFirstItem, indexOfLastItem);

  const exportToExcel = () => {
    const selectedKeys = Object.keys(selectedColumns).filter(
      (key) => selectedColumns[key].selected
    );

    const filteredData = filteredUser.map((user) =>
      selectedKeys.reduce((obj, key) => {
        obj[selectedColumns[key].label] = user[key];
        return obj;
      }, {})
    );

    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "UsersData");
    XLSX.writeFile(wb, "UsersData.xlsx");
  };

  const handleColumnChange = (key) => {
    setSelectedColumns((prev) => ({
      ...prev,
      [key]: { ...prev[key], selected: !prev[key].selected },
    }));
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
        <div className="aflex items-center justify-center w-full h-full p-2 gap-2 font-[600]">
          ค้นหารายชื่อพนักงาน
        </div>
        <div className="flex flex-col xl:flex-row items-center justify-between w-full h-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full xl:w-1/2 p-2 gap-2">
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
          <div className="flex items-center justify-center w-full h-full xl:w-1/2 p-2 gap-2">
            <Select
              label="สถานะพนักงาน"
              placeholder="เลือกสถานะ"
              size="md"
              variant="bordered"
              selectedKeys={selectedStatus ? [selectedStatus] : []}
              onSelectionChange={handleStatusChange}
            >
              <SelectItem key="">เลือกทั้งหมด</SelectItem>
              <SelectItem key="1">พนักงาน</SelectItem>
              <SelectItem key="0">ลาออก</SelectItem>
            </Select>
          </div>
          <div className="flex items-center justify-center w-full h-full xl:w-1/2 p-2 gap-2">
            <Select
              label="ประเภทพนักงาน"
              placeholder="เลือกประเภท"
              size="md"
              variant="bordered"
              selectedKeys={selectedUserType ? [selectedUserType] : []}
              onSelectionChange={handleUserTypeChange}
            >
              <SelectItem key="">เลือกทั้งหมด</SelectItem>
              <SelectItem key="รายเดือน">รายเดือน</SelectItem>
              <SelectItem key="รายวัน">รายวัน</SelectItem>
              <SelectItem key="รายเดือน (คนพิการ)">
                รายเดือน (คนพิการ)
              </SelectItem>
            </Select>
          </div>
          <div className="flex items-center justify-center w-full h-full xl:w-1/2 p-2 gap-2">
            <Select
              label="สัญชาติ"
              placeholder="เลือกสัญชาติ"
              size="md"
              variant="bordered"
              selectedKeys={selectedCitizen ? [selectedCitizen] : []}
              onSelectionChange={handleCitizenChange}
            >
              <SelectItem key="">เลือกทั้งหมด</SelectItem>
              <SelectItem key="ไทย">ไทย</SelectItem>
              <SelectItem key="พม่า">พม่า</SelectItem>
              <SelectItem key="ลาว">ลาว</SelectItem>
              <SelectItem key="กัมพูชา">กัมพูชา</SelectItem>
              <SelectItem key="เวียดนาม">เวียดนาม</SelectItem>
            </Select>
          </div>
        </div>
        <div className="flex flex-col xl:flex-row items-center justify-between w-full h-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full xl:w-1/2 p-2 gap-2">
            <Select
              label="ค้นหา"
              placeholder="เลือกสาขา"
              size="md"
              variant="bordered"
              selectedKeys={selectedBranch ? [selectedBranch] : []}
              onSelectionChange={handleSelectChange(
                setSelectedBranch,
                "branch_id"
              )}
            >
              <SelectItem key="">เลือกทั้งหมด</SelectItem>
              {branch.map((b) => (
                <SelectItem key={b.branch_id}>{b.branch_name}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex items-center justify-center w-full h-full xl:w-1/2 p-2 gap-2">
            <Select
              label="ค้นหา"
              placeholder="เลือกไซต์"
              size="md"
              variant="bordered"
              selectedKeys={selectedSite ? [selectedSite] : []}
              onSelectionChange={handleSelectChange(setSelectedSite, "site_id")}
            >
              <SelectItem key="">เลือกทั้งหมด</SelectItem>
              {site.map((s) => (
                <SelectItem key={s.site_id}>{s.site_name}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex items-center justify-center w-full h-full xl:w-1/2 p-2 gap-2">
            <Select
              label="ค้นหา"
              placeholder="เลือกฝ่าย"
              size="md"
              variant="bordered"
              selectedKeys={selectedDivision ? [selectedDivision] : []}
              onSelectionChange={handleSelectChange(
                setSelectedDivision,
                "division_id"
              )}
            >
              <SelectItem key="">เลือกทั้งหมด</SelectItem>
              {division.map((d) => (
                <SelectItem key={d.division_id}>{d.division_name}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex items-center justify-center w-full h-full xl:w-1/2 p-2 gap-2">
            <Select
              label="ค้นหา"
              placeholder="เลือกแผนก"
              size="md"
              variant="bordered"
              selectedKeys={selectedDepartment ? [selectedDepartment] : []}
              onSelectionChange={handleSelectChange(
                setSelectedDepartment,
                "department_id"
              )}
            >
              <SelectItem key="">เลือกทั้งหมด</SelectItem>
              {department.map((d) => (
                <SelectItem key={d.department_id}>
                  {d.department_name}
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
              selectedKeys={selectedPosition ? [selectedPosition] : []}
              onSelectionChange={handleSelectChange(
                setSelectedPosition,
                "position_id"
              )}
            >
              <SelectItem key="">เลือกทั้งหมด</SelectItem>
              {position.map((p) => (
                <SelectItem key={p.position_id}>{p.position_name}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2 p-4 bg-[#F3F7FB] rounded-xl">
          <div className="font-[600]">เลือกคอลัมน์ที่จะ Export:</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.keys(selectedColumns).map((key) => (
              <Checkbox
                key={key}
                isSelected={selectedColumns[key].selected}
                onChange={() => handleColumnChange(key)}
              >
                {selectedColumns[key].label}
              </Checkbox>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full p-6 gap-6 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-between w-full h-full p-2 gap-2 font-[600] border-b-2">
          ข้อมูล ผู้ใช้งาน
          {(session.user.user_level === "superadmin" ||
            session.user.user_level === "admin") && (
            <>
              <Button
                size="md"
                onClick={exportToExcel}
                className="bg-[#16cdc7] text-[#FFFFFF]"
              >
                Export to Excel
              </Button>
              <Link href="/hr/user/create">
                <Button size="md" className="bg-[#615DFF] text-[#FFFFFF]">
                  เพิ่มข้อมูล
                </Button>
              </Link>
            </>
          )}
        </div>
        <div className="overflow-auto w-full rounded-xl border">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="min-w-40 border-b p-2 py-4">ลำดับ</th>
                <th className="min-w-40 border-b p-2">รูปถ่าย</th>
                <th className="min-w-40 border-b p-2">รหัสพนักงาน</th>
                <th className="min-w-40 border-b p-2">เลขบัตรพนักงาน</th>
                <th className="min-w-40 border-b p-2">คำนำหน้าชื่อ</th>

                <th className="min-w-40 border-b p-2">ชื่อ</th>
                <th className="min-w-40 border-b p-2">นามสกุล</th>
                <th className="min-w-40 border-b p-2">ชื่อเล่น</th>
                <th className="min-w-40 border-b p-2">เบอร์โทรศัพท์</th>
                <th className="min-w-40 border-b p-2">อีเมลล์</th>

                <th className="min-w-40 border-b p-2">ระดับการใช้งาน</th>
                <th className="min-w-40 border-b p-2">วันเกิด</th>
                <th className="min-w-40 border-b p-2">เพศ</th>
                <th className="min-w-40 border-b p-2">เลขบัตรประชาชน</th>
                <th className="min-w-40 border-b p-2">สัญชาติ</th>

                <th className="min-w-40 border-b p-2">ชนิดของพนักงาน</th>
                <th className="min-w-40 border-b p-2">สาขา</th>
                <th className="min-w-40 border-b p-2">ไซต์งาน</th>
                <th className="min-w-40 border-b p-2">ฝ่าย</th>
                <th className="min-w-40 border-b p-2">แผนก</th>

                <th className="min-w-40 border-b p-2">ตำแหน่ง</th>
                <th className="min-w-40 border-b p-2">บทบาทหน้าที่</th>
                <th className="min-w-40 border-b p-2">ผู้บังคับบัญชา</th>
                <th className="min-w-40 border-b p-2">วันที่เริ่มงาน</th>

                <th className="min-w-40 border-b p-2">ลายเซ็น</th>

                {(session.user.user_level === "superadmin" ||
                  session.user.user_level === "admin") && (
                  <>
                    <th className="min-w-40 border-b p-2">สร้างโดย</th>
                    <th className="min-w-40 border-b p-2">วันที่สร้าง</th>
                    <th className="min-w-40 border-b p-2">แก้ไขโดย</th>
                    <th className="min-w-40 border-b p-2">วันที่แก้ไข</th>
                    <th className="min-w-40 border-b p-2">สถานะ</th>
                    <th className="min-w-40 border-b p-2">แก้ไข</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((row, index) => (
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
                        src={`/images/signature/${row.user_signature_file}`}
                        alt="signature"
                        width={250}
                        height={250}
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
                        ? 31
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
          totalItems={filteredUser.length}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
