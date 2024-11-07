"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { FetchBranch } from "@/app/functions/hr/branch/branch";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Input, Button } from "@nextui-org/react";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import PaginationControls from "@/app/components/PaginationControls";

export default function Branch() {
  const { data: session } = useSession();
  const [branch, setBranch] = useState([]);
  const [filteredbranch, setFilteredBranch] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredbranch.slice(indexOfFirstItem, indexOfLastItem);

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
          สาขา
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <AddHomeOutlinedIcon />
          <span className="px-4 text-[#635bff] bg-[#635bff]/25 rounded-xl">
            สาขา
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
        <Link href="/hr/branch/create">
          <Button className="flex items-center justify-center w-full h-full p-3 gap-2 text-[#FFFFFF] bg-[#615DFF]">
            เพิ่มข้อมูล
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full p-6 gap-6 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600] border-b-2">
          ข้อมูล สาขา
        </div>
        <div className="overflow-auto w-full rounded-xl border">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border-b p-2 py-4">ลำดับ</th>
                <th className="border-b p-2">สาขา</th>
                {(session.user.user_level === "superadmin" ||
                  session.user.user_level === "admin") && (
                  <>
                    <th className="border-b p-2">สร้างโดย</th>
                    <th className="border-b p-2">สร้างเมื่อ</th>
                    <th className="border-b p-2">แก้ไขโดย</th>
                    <th className="border-b p-2">แก้ไขเมื่อ</th>
                    <th className="border-b p-2">สถานะ</th>
                    <th className="border-b p-2">แก้ไข</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((row, index) => (
                  <tr key={row.branch_id}>
                    <td className="border-b p-2 text-center text-sm py-4">
                      {indexOfFirstItem + index + 1 || "-"}
                    </td>
                    <td className="border-b p-2 text-center text-sm">
                      {row.branch_name || "-"}
                    </td>
                    {(session.user.user_level === "superadmin" ||
                      session.user.user_level === "admin") && (
                      <>
                        <td className="border-b p-2 text-center text-sm">
                          {row.create_by || "-"}
                        </td>
                        <td className="border-b p-2 text-center text-sm">
                          {row.branch_create_time || "-"}
                        </td>
                        <td className="border-b p-2 text-center text-sm">
                          {row.update_by || "-"}
                        </td>
                        <td className="border-b p-2 text-center text-sm">
                          {row.branch_update_time || "-"}
                        </td>
                        <td className="border-b p-2 text-center text-sm">
                          {row.branch_status === 1 ? (
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
                            href={`/hr/branch/${row.branch_id}`}
                            className="text-[#f8c20a]"
                          >
                            <EditOutlinedIcon />
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
          totalItems={filteredbranch.length}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
