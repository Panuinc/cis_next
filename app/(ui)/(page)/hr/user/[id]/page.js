"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { UpdateUser, FetchUserById } from "@/app/functions/hr/user";
import { FetchBranch } from "@/app/functions/hr/branch";
import { FetchSite } from "@/app/functions/hr/site";
import { FetchDivision } from "@/app/functions/hr/division";
import { FetchDepartment } from "@/app/functions/hr/department";
import { FetchPosition } from "@/app/functions/hr/position";
import { FetchRole } from "@/app/functions/hr/role";
import { FetchUser } from "@/app/functions/hr/user";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";

export default function UserUpdate({ params }) {
  const { data: session } = useSession();
  const user_id = params.id;
  const router = useRouter();
  const [error, setError] = useState(null);
  const [branch, setBranch] = useState([]);
  const [site, setSite] = useState([]);
  const [division, setDivision] = useState([]);
  const [department, setDepartment] = useState([]);
  const [position, setPosition] = useState([]);
  const [role, setRole] = useState([]);
  const [parent, setParent] = useState([]);

  const [filteredsite, setFilteredSite] = useState([]);
  const [filtereddivision, setFilteredDivision] = useState([]);
  const [filtereddepartment, setFilteredDepartment] = useState([]);
  const [filteredposition, setFilteredPosition] = useState([]);
  const [filteredparent, setFilteredParent] = useState([]);

  const [isbranchselected, setIsBranchSelected] = useState(false);
  const [isdivisionselected, setIsDivisionSelected] = useState(false);
  const [isdivisionandbranchselected, setIsDivisionAndBranchSelected] =
    useState(false);
  const [
    isdepartmentanddivisionandbranchselected,
    setIsDepartmentandDivisionAndBranchSelected,
  ] = useState(false);

  const [user_number, setUser_number] = useState("");
  const [user_password, setUser_password] = useState("");
  const [user_firstname, setUser_firstname] = useState("");
  const [user_lastname, setUser_lastname] = useState("");

  const [user_nickname, setUser_nickname] = useState("");
  const [user_branch_id, setUser_branch_id] = useState("");
  const [user_site_id, setUser_site_id] = useState("");
  const [user_division_id, setUser_division_id] = useState("");
  const [user_department_id, setUser_department_id] = useState("");

  const [user_position_id, setUser_position_id] = useState("");
  const [user_role_id, setUser_role_id] = useState("");
  const [user_parent_id, setUser_parent_id] = useState("");
  const [user_type, setUser_type] = useState("");
  const [user_id_card, setUser_id_card] = useState("");

  const [user_citizen, setUser_citizen] = useState("");
  const [user_level, setUser_level] = useState("");
  const [user_email, setUser_email] = useState("");
  const [user_tel, setUser_tel] = useState("");

  const [branch_name, setBranch_name] = useState("");
  const [site_name, setSite_name] = useState("");
  const [division_name, setDivision_name] = useState("");
  const [department_name, setDepartment_name] = useState("");
  const [position_name, setPosition_name] = useState("");
  const [role_name, setRole_name] = useState("");
  const [parent_name, setParent_name] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await FetchUserById(user_id);
        if (data.message) {
          toast.error(data.message);
        } else {
          setUser_number(data.user_number || "");
          setUser_password(data.user_password || "");
          setUser_firstname(data.user_firstname || "");
          setUser_lastname(data.user_lastname || "");

          setUser_nickname(data.user_nickname || "");

          setUser_branch_id(String(data.user_branch_id || ""));
          setBranch_name(data.branch_name || ""),
            setUser_site_id(String(data.user_site_id || ""));
          setSite_name(data.site_name || ""),
            setUser_division_id(String(data.user_division_id || ""));
          setDivision_name(data.division_name || ""),
            setUser_department_id(String(data.user_department_id || ""));
          setDepartment_name(data.department_name || ""),
            setUser_position_id(String(data.user_position_id || ""));
          setPosition_name(data.position_name || ""),
            setUser_role_id(String(data.user_role_id || ""));
          setRole_name(data.role_name || ""),
            setUser_parent_id(String(data.user_parent_id || ""));
          setParent_name(data.parent_name || ""),
            setUser_type(String(data.user_type || ""));
          setUser_id_card(data.user_id_card || "");

          setUser_citizen(String(data.user_citizen || ""));
          setUser_level(String(data.user_level || ""));
          setUser_email(data.user_email || "");
          setUser_tel(data.user_tel || "");
        }
      } catch (error) {
        toast.error("Error fetching user data");
      }
    };

    fetchUser();
  }, [user_id]);

  const loadBranch = async () => {
    try {
      const data = await FetchBranch();
      const activeBranch = data.filter((branch) => branch.branch_status === 1);
      setBranch(activeBranch);
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  };

  const loadSite = async () => {
    try {
      const data = await FetchSite();
      const activeSite = data.filter((site) => site.site_status === 1);
      setSite(activeSite);
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  };

  const loadDivision = async () => {
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

  const loadDepartment = async () => {
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

  const loadPosition = async () => {
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

  const loadRole = async () => {
    try {
      const data = await FetchRole();
      const activeRole = data.filter((role) => role.role_status === 1);
      setRole(activeRole);
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  };

  const loadUser = async () => {
    try {
      const data = await FetchUser();
      const activeUser = data.filter(
        (parent) =>
          (parent.user_status === 1 && parent.user_role_id === 1) ||
          parent.user_role_id === 2 ||
          parent.user_role_id === 3
      );
      setParent(activeUser);
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการดึงข้อมูลuser");
    }
  };

  useEffect(() => {
    loadBranch();
    loadSite();
    loadDivision();
    loadDepartment();
    loadPosition();
    loadRole();
    loadUser();
  }, []);

  useEffect(() => {
    if (user_branch_id) {
      const selectedBranchId = user_branch_id;
      const filtered = division.filter(
        (division) =>
          division.division_status == 1 &&
          division.division_branch_id == selectedBranchId
      );
      setFilteredDivision(filtered);
      setIsBranchSelected(true);
    } else {
      setFilteredDivision([]);
      setIsBranchSelected(false);
    }
  }, [user_branch_id, division]);

  useEffect(() => {
    if (user_branch_id) {
      const selectedBranchId = user_branch_id;
      const filtered = site.filter(
        (site) =>
          site.site_status == 1 && site.site_branch_id == selectedBranchId
      );
      setFilteredSite(filtered);
      setIsBranchSelected(true);
    } else {
      setFilteredSite([]);
      setIsBranchSelected(false);
    }
  }, [user_branch_id, site]);

  useEffect(() => {
    if (user_branch_id && user_division_id) {
      const selectedBranchIdandDivisionId = user_branch_id && user_division_id;
      const filtered = department.filter(
        (department) =>
          department.department_status == 1 &&
          department.department_branch_id &&
          department.department_branch_id == selectedBranchIdandDivisionId
      );
      setFilteredDepartment(filtered);
      setIsDivisionAndBranchSelected(true);
    } else {
      setFilteredDepartment([]);
      setIsDivisionAndBranchSelected(false);
    }
  }, [user_branch_id && user_division_id, department]);

  useEffect(() => {
    if (user_branch_id && user_division_id && user_department_id) {
      const selectedBranchIdandDivisionIdandDepartmentId =
        user_branch_id && user_division_id && user_department_id;
      const filtered = position.filter(
        (position) =>
          position.position_status == 1 &&
          position.position_branch_id &&
          position.position_division_id &&
          position.position_department_id ==
            selectedBranchIdandDivisionIdandDepartmentId
      );
      setFilteredPosition(filtered);
      setIsDepartmentandDivisionAndBranchSelected(true);
    } else {
      setFilteredPosition([]);
      setIsDepartmentandDivisionAndBranchSelected(false);
    }
  }, [user_branch_id && user_division_id && user_department_id, position]);

  useEffect(() => {
    if (user_division_id) {
      const selectedDivisionId = user_division_id;
      const filtered = parent.filter(
        (parent) =>
          parent.user_status == 1 &&
          parent.user_division_id == selectedDivisionId
      );
      setFilteredParent(filtered);
      setIsDivisionSelected(true);
    } else {
      setFilteredParent([]);
      setIsDivisionSelected(false);
    }
  }, [user_division_id, parent]);

  useEffect(() => {
    if (user_branch_id) {
      const selectedBranchId = user_branch_id;
      const filtered = division.filter(
        (division) =>
          division.division_status == 1 &&
          division.division_branch_id == selectedBranchId
      );
      setFilteredDivision(filtered);
      setIsBranchSelected(true);
    } else {
      setFilteredDivision([]);
      setIsBranchSelected(false);
    }
  }, [user_branch_id, division]);

  useEffect(() => {
    if (user_branch_id) {
      const selectedBranchId = user_branch_id;
      const filtered = site.filter(
        (site) =>
          site.site_status == 1 && site.site_branch_id == selectedBranchId
      );
      setFilteredSite(filtered);
      setIsBranchSelected(true);
    } else {
      setFilteredSite([]);
      setIsBranchSelected(false);
    }
  }, [user_branch_id, site]);

  useEffect(() => {
    if (user_branch_id && user_division_id) {
      const selectedBranchIdandDivisionId = user_branch_id && user_division_id;
      const filtered = department.filter(
        (department) =>
          department.department_status == 1 &&
          department.department_branch_id &&
          department.department_branch_id == selectedBranchIdandDivisionId
      );
      setFilteredDepartment(filtered);
      setIsDivisionAndBranchSelected(true);
    } else {
      setFilteredDepartment([]);
      setIsDivisionAndBranchSelected(false);
    }
  }, [user_branch_id && user_division_id, department]);

  useEffect(() => {
    if (user_branch_id && user_division_id && user_department_id) {
      const selectedBranchIdandDivisionIdandDepartmentId =
        user_branch_id && user_division_id && user_department_id;
      const filtered = position.filter(
        (position) =>
          position.position_status == 1 &&
          position.position_branch_id &&
          position.position_division_id &&
          position.position_department_id ==
            selectedBranchIdandDivisionIdandDepartmentId
      );
      setFilteredPosition(filtered);
      setIsDepartmentandDivisionAndBranchSelected(true);
    } else {
      setFilteredPosition([]);
      setIsDepartmentandDivisionAndBranchSelected(false);
    }
  }, [user_branch_id && user_division_id && user_department_id, position]);

  useEffect(() => {
    if (user_division_id) {
      const selectedDivisionId = user_division_id;
      const filtered = parent.filter(
        (parent) =>
          parent.user_status == 1 &&
          parent.user_division_id == selectedDivisionId
      );
      setFilteredParent(filtered);
      setIsDivisionSelected(true);
    } else {
      setFilteredParent([]);
      setIsDivisionSelected(false);
    }
  }, [user_division_id, parent]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("user_number", user_number);
    formData.append("user_password", user_password);
    formData.append("user_firstname", user_firstname);
    formData.append("user_lastname", user_lastname);

    formData.append("user_nickname", user_nickname);
    formData.append("user_branch_id", user_branch_id);
    formData.append("user_site_id", user_site_id);
    formData.append("user_division_id", user_division_id);
    formData.append("user_department_id", user_department_id);

    formData.append("user_position_id", user_position_id);
    formData.append("user_role_id", user_role_id);
    formData.append("user_parent_id", user_parent_id);
    formData.append("user_type", user_type);
    formData.append("user_id_card", user_id_card);

    formData.append("user_citizen", user_citizen);
    formData.append("user_level", user_level);
    formData.append("user_email", user_email);
    formData.append("user_tel", user_tel);

    formData.append("user_update_by", session?.user?.user_id);

    try {
      const response = await UpdateUser({
        formData,
        user_id,
      });
      console.log(response);
      if (response.status === 200) {
        toast.success(response.message);
        setTimeout(() => {
          router.push("/hr/user");
        }, 2000);
      } else {
        console.log("Error:", JSON.stringify(response.errors));
        setError(response);
      }
    } catch (error) {
      console.error(error);
      setError({ message: "Error updating user: " + error.message });
      toast.error("Error updating user: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-6">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          แก้ไข ผู้ใช้งาน
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <AddHomeOutlinedIcon />
          <span className="px-4 text-[#635bff] bg-[#635bff]/25 rounded-xl">
            แก้ไข ผู้ใช้งาน
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-f p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-4 gap-2 font-[600] border-b-2">
          แก้ไข ผู้ใช้งาน
        </div>
        <Toaster user="top-right" reverseOrder={false} />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full h-full p-2 gap-2"
        >
          <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                id="user_number"
                name="user_number"
                label="รหัสพนักงาน"
                placeholder="กรุณาระบุข้อมูล"
                size="md"
                variant="bordered"
                isRequired
                value={user_number}
                onChange={(e) => setUser_number(e.target.value)}
                isInvalid={
                  error && user_number.length === 0
                    ? error?.errors?.user_number
                      ? true
                      : false
                    : false
                }
                errorMessage={error?.errors?.user_number?.[0]}
              />
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="password"
                id="user_password"
                name="user_password"
                label="รหัสผ่าน"
                placeholder="กรุณาระบุข้อมูล"
                size="md"
                variant="bordered"
                isRequired
                value={user_password}
                onChange={(e) => setUser_password(e.target.value)}
                isInvalid={
                  error && user_password.length === 0
                    ? error?.errors?.user_password
                      ? true
                      : false
                    : false
                }
                errorMessage={error?.errors?.user_password?.[0]}
              />
            </div>
          </div>

          <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                id="user_firstname"
                name="user_firstname"
                label="ชื่อผู้ใช้งาน"
                placeholder="กรุณาระบุข้อมูล"
                size="md"
                variant="bordered"
                isRequired
                value={user_firstname}
                onChange={(e) => setUser_firstname(e.target.value)}
                isInvalid={
                  error && user_firstname.length === 0
                    ? error?.errors?.user_firstname
                      ? true
                      : false
                    : false
                }
                errorMessage={error?.errors?.user_firstname?.[0]}
              />
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                id="user_lastname"
                name="user_lastname"
                label="นามสกุล"
                placeholder="กรุณาระบุข้อมูล"
                size="md"
                variant="bordered"
                isRequired
                value={user_lastname}
                onChange={(e) => setUser_lastname(e.target.value)}
                isInvalid={
                  error && user_lastname.length === 0
                    ? error?.errors?.user_lastname
                      ? true
                      : false
                    : false
                }
                errorMessage={error?.errors?.user_lastname?.[0]}
              />
            </div>
          </div>

          <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                id="user_nickname"
                name="user_nickname"
                label="ชื่อเล่น"
                placeholder="กรุณาระบุข้อมูล"
                size="md"
                variant="bordered"
                isRequired
                value={user_nickname}
                onChange={(e) => setUser_nickname(e.target.value)}
                isInvalid={
                  error && user_nickname.length === 0
                    ? error?.errors?.user_nickname
                      ? true
                      : false
                    : false
                }
                errorMessage={error?.errors?.user_nickname?.[0]}
              />
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                label="เลือก สาขา"
                placeholder={branch_name}
                id="user_branch_id"
                name="user_branch_id"
                selectedKeys={[user_branch_id]}
                onChange={(e) => setUser_branch_id(e.target.value)}
                variant="bordered"
                size="md"
                isInvalid={
                  error && user_branch_id.length === 0
                    ? error?.errors?.user_branch_id
                      ? true
                      : false
                    : false
                }
                errorMessage={error?.errors?.user_branch_id?.[0]}
              >
                <SelectItem value="">เลือก สาขา</SelectItem>
                {branch.map((branch) => (
                  <SelectItem key={branch.branch_id} value={branch.branch_id}>
                    {branch.branch_name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                label="เลือก ไซต์"
                placeholder={site_name}
                id="user_site_id"
                name="user_site_id"
                selectedKeys={[user_site_id]}
                onChange={(e) => setUser_site_id(e.target.value)}
                variant="bordered"
                size="md"
                isDisabled={!isbranchselected}
                isInvalid={
                  error && user_site_id.length === 0
                    ? error?.errors?.user_site_id
                      ? true
                      : false
                    : false
                }
                errorMessage={error?.errors?.user_site_id?.[0]}
              >
                <SelectItem value="">เลือก ไซต์</SelectItem>
                {filteredsite.map((site) => (
                  <SelectItem key={site.site_id} value={site.site_id}>
                    {site.site_name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                label="เลือก ฝ่าย"
                placeholder={division_name}
                id="user_division_id"
                name="user_division_id"
                selectedKeys={[user_division_id]}
                onChange={(e) => setUser_division_id(e.target.value)}
                variant="bordered"
                size="md"
                isDisabled={!isbranchselected}
                isInvalid={
                  error && user_division_id.length === 0
                    ? error?.errors?.user_division_id
                      ? true
                      : false
                    : false
                }
                errorMessage={error?.errors?.user_division_id?.[0]}
              >
                <SelectItem value="">เลือก ฝ่าย</SelectItem>
                {filtereddivision.map((division) => (
                  <SelectItem
                    key={division.division_id}
                    value={division.division_id}
                  >
                    {division.division_name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                label="เลือก แผนก"
                placeholder={department_name}
                id="user_department_id"
                name="user_department_id"
                selectedKeys={[user_department_id]}
                onChange={(e) => setUser_department_id(e.target.value)}
                variant="bordered"
                size="md"
                isDisabled={!isdivisionandbranchselected}
                isInvalid={
                  error && user_department_id.length === 0
                    ? error?.errors?.user_department_id
                      ? true
                      : false
                    : false
                }
                errorMessage={error?.errors?.user_department_id?.[0]}
              >
                <SelectItem value="">เลือก แผนก</SelectItem>
                {filtereddepartment.map((department) => (
                  <SelectItem
                    key={department.department_id}
                    value={department.department_id}
                  >
                    {department.department_name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                label="เลือก ตำแหน่ง"
                placeholder={position_name}
                id="user_position_id"
                name="user_position_id"
                selectedKeys={[user_position_id]}
                onChange={(e) => setUser_position_id(e.target.value)}
                variant="bordered"
                size="md"
                isDisabled={!isdepartmentanddivisionandbranchselected}
                isInvalid={
                  error && user_position_id.length === 0
                    ? error?.errors?.user_position_id
                      ? true
                      : false
                    : false
                }
                errorMessage={error?.errors?.user_position_id?.[0]}
              >
                <SelectItem value="">เลือก ตำแหน่ง</SelectItem>
                {filteredposition.map((position) => (
                  <SelectItem
                    key={position.position_id}
                    value={position.position_id}
                  >
                    {position.position_name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                label="เลือก บทบาทหน้าที่"
                placeholder={role_name}
                id="user_role_id"
                name="user_role_id"
                selectedKeys={[user_role_id]}
                onChange={(e) => setUser_role_id(e.target.value)}
                variant="bordered"
                size="md"
                isInvalid={
                  error && user_role_id.length === 0
                    ? error?.errors?.user_role_id
                      ? true
                      : false
                    : false
                }
                errorMessage={error?.errors?.user_role_id?.[0]}
              >
                <SelectItem value="">เลือกบทบาทหน้าที่</SelectItem>
                {role.map((role) => (
                  <SelectItem key={role.role_id} value={role.role_id}>
                    {role.role_name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                label="เลือก สายบังคับบัญชา"
                placeholder={parent_name}
                id="user_parent_id"
                name="user_parent_id"
                selectedKeys={[user_parent_id]}
                onChange={(e) => setUser_parent_id(e.target.value)}
                variant="bordered"
                size="md"
                isDisabled={!isdivisionselected}
                isInvalid={
                  error && user_parent_id.length === 0
                    ? error?.errors?.user_parent_id
                      ? true
                      : false
                    : false
                }
                errorMessage={error?.errors?.user_parent_id?.[0]}
              >
                <SelectItem value="">เลือก สายบังคับบัญชา</SelectItem>
                {filteredparent.map((parent) => (
                  <SelectItem key={parent.user_id} value={parent.user_id}>
                    {parent.user_firstname}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                label="เลือก ชนิดพนักงาน"
                placeholder={user_type}
                id="user_type"
                name="user_type"
                selectedKeys={[user_type]}
                onChange={(e) => setUser_type(e.target.value)}
                variant="bordered"
                size="md"
                isInvalid={
                  error && user_type.length === 0
                    ? error?.errors?.user_type
                      ? true
                      : false
                    : false
                }
                errorMessage={error?.errors?.user_type?.[0]}
              >
                <SelectItem value="">เลือก ชนิดพนักงาน</SelectItem>
                <SelectItem value="รายเดือน" key="รายเดือน">
                  รายเดือน
                </SelectItem>
                <SelectItem value="รายวัน" key="รายวัน">
                  รายวัน
                </SelectItem>
              </Select>
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                id="user_id_card"
                name="user_id_card"
                label="เลขบัตรประชาชน"
                placeholder="กรุณาระบุข้อมูล"
                size="md"
                variant="bordered"
                isRequired
                value={user_id_card}
                onChange={(e) => setUser_id_card(e.target.value)}
                isInvalid={
                  error && user_id_card.length === 0
                    ? error?.errors?.user_id_card
                      ? true
                      : false
                    : false
                }
                errorMessage={error?.errors?.user_id_card?.[0]}
              />
            </div>
          </div>

          <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                label="เลือก สัญชาติ"
                placeholder={user_citizen}
                id="user_citizen"
                name="user_citizen"
                selectedKeys={[user_citizen]}
                onChange={(e) => setUser_citizen(e.target.value)}
                variant="bordered"
                size="md"
                isInvalid={
                  error && user_citizen.length === 0
                    ? error?.errors?.user_citizen
                      ? true
                      : false
                    : false
                }
                errorMessage={error?.errors?.user_citizen?.[0]}
              >
                <SelectItem value="">เลือก สัญชาติ</SelectItem>
                <SelectItem value="ไทย" key="ไทย">
                  ไทย
                </SelectItem>
                <SelectItem value="พม่า" key="พม่า">
                  พม่า
                </SelectItem>
                <SelectItem value="ลาว" key="ลาว">
                  ลาว
                </SelectItem>
                <SelectItem value="กัมพูชา" key="กัมพูชา">
                  กัมพูชา
                </SelectItem>
              </Select>
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                label="เลือก ระดับการใช้งาน"
                placeholder={user_level}
                id="user_level"
                name="user_level"
                selectedKeys={[user_level]}
                onChange={(e) => setUser_level(e.target.value)}
                variant="bordered"
                size="md"
                isInvalid={
                  error && user_level.length === 0
                    ? error?.errors?.user_level
                      ? true
                      : false
                    : false
                }
                errorMessage={error?.errors?.user_level?.[0]}
              >
                <SelectItem value="">เลือก ระดับการใช้งาน</SelectItem>
                <SelectItem value="admin" key="admin">
                  Admin
                </SelectItem>
                <SelectItem value="user" key="user">
                  User
                </SelectItem>
              </Select>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="email"
                id="user_email"
                name="user_email"
                label="อีเมลล์"
                placeholder="กรุณาระบุข้อมูล"
                size="md"
                variant="bordered"
                isRequired
                value={user_email}
                onChange={(e) => setUser_email(e.target.value)}
                isInvalid={
                  error && user_email.length === 0
                    ? error?.errors?.user_email
                      ? true
                      : false
                    : false
                }
                errorMessage={error?.errors?.user_email?.[0]}
              />
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                id="user_tel"
                name="user_tel"
                label="เบอร์โทรศัพท์"
                placeholder="กรุณาระบุข้อมูล"
                size="md"
                variant="bordered"
                isRequired
                value={user_tel}
                onChange={(e) => setUser_tel(e.target.value)}
                isInvalid={
                  error && user_tel.length === 0
                    ? error?.errors?.user_tel
                      ? true
                      : false
                    : false
                }
                errorMessage={error?.errors?.user_tel?.[0]}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                label="สร้างโดย"
                isReadOnly
                size="md"
                value={`${session?.user?.user_firstname} ${session?.user?.user_lastname}`}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-end w-full h-full p-2 gap-2">
              <Button
                type="submit"
                size="md"
                className="w-1/12 bg-[#615DFF] text-[#FFFFFF]"
              >
                บันทึก
              </Button>
              <Button
                size="md"
                className="w-1/12 bg-[#F07294] text-[#FFFFFF]"
                onClick={() => router.back()}
              >
                ย้อนกลับ
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
