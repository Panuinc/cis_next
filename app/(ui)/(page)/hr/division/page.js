"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { FetchDivision } from "@/app/functions/hr/division/division";
import { EditOutlined, AddHomeOutlined } from "@mui/icons-material";
import { Input, Button } from "@nextui-org/react";
import PaginationControls from "@/app/components/PaginationControls";

export default function Division() {
  const { data: session } = useSession();
  const [division, setDivision] = useState([]);
  const [filtereddivision, setFilteredDivision] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
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
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(filtereddivision)
    ? filtereddivision.slice(indexOfFirstItem, indexOfLastItem)
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
          ฝ่าย
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <AddHomeOutlined />
          <span className="px-4 text-[#635bff] bg-[#635bff]/25 rounded-xl">
            ฝ่าย
          </span>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row items-center justify-between w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
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
      <div className="flex flex-col items-center justify-center w-full h-full p-6 gap-6 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-between w-full h-full p-2 gap-2 font-[600] border-b-2">
          ข้อมูล ฝ่าย
          {(session.user.user_level === "superadmin" ||
            session.user.user_level === "admin") && (
            <Link href="/hr/division/create">
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
                <th className="border-b p-2">สาขา</th>
                <th className="border-b p-2">ฝ่าย</th>
                <th className="border-b p-2">ชื่อย่อ</th>
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
              {currentItems.length > 0 ? (
                currentItems.map((row, index) => (
                  <tr key={row.division_id}>
                    <td className="border-b p-2 text-center text-sm py-6">
                      {indexOfFirstItem + index + 1 || "-"}
                    </td>
                    <td className="border-b p-2 text-center text-sm">
                      {row.branch_name || "-"}
                    </td>
                    <td className="border-b p-2 text-center text-sm">
                      {row.division_name || "-"}
                    </td>
                    <td className="border-b p-2 text-center text-sm">
                      {row.division_acronym || "-"}
                    </td>
                    {(session.user.user_level === "superadmin" ||
                      session.user.user_level === "admin") && (
                      <>
                        <td className="border-b p-2 text-center text-sm">
                          {row.create_by || "-"}
                        </td>
                        <td className="border-b p-2 text-center text-sm">
                          {row.division_create_time || "-"}
                        </td>
                        <td className="border-b p-2 text-center text-sm">
                          {row.update_by || "-"}
                        </td>
                        <td className="border-b p-2 text-center text-sm">
                          {row.division_update_time || "-"}
                        </td>
                        <td className="border-b p-2 text-center text-sm">
                          {row.division_status === 1 ? (
                            <span className="px-4 py-2 text-[#16cdc7] bg-[#16cdc725] rounded-xl">
                              Active
                            </span>
                          ) : (
                            <span className="px-4 py-2 text-[#ff6692] bg-[#ff669225] rounded-xl">
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="border-b p-2 text-center text-sm">
                          <Link
                            href={`/hr/division/${row.division_id}`}
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
          totalItems={filtereddivision.length}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
