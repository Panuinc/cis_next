"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { CreateUser } from "@/app/functions/hr/user/user";
import { FetchBranch } from "@/app/functions/hr/branch/branch";
import { FetchSite } from "@/app/functions/hr/site/site";
import { FetchDivision } from "@/app/functions/hr/division/division";
import { FetchDepartment } from "@/app/functions/hr/department/department";
import { FetchPosition } from "@/app/functions/hr/position/position";
import { FetchRole } from "@/app/functions/hr/role/role";
import { FetchUser } from "@/app/functions/hr/user/user";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import imageCompression from "browser-image-compression";
import Face5OutlinedIcon from "@mui/icons-material/Face5Outlined";
import SignatureCanvas from "react-signature-canvas";

export default function UserCreate() {
  const { data: session } = useSession();
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
  const [user_card_number, setUser_card_number] = useState("");
  const [user_password, setUser_password] = useState("");
  const [user_title, setUser_title] = useState("");

  const [user_firstname, setUser_firstname] = useState("");
  const [user_lastname, setUser_lastname] = useState("");
  const [user_nickname, setUser_nickname] = useState("");
  const [user_tel, setUser_tel] = useState("");
  const [user_email, setUser_email] = useState("");

  const [user_level, setUser_level] = useState("");
  const [user_birthday, setUser_birthday] = useState("");
  const [user_gender, setUser_gender] = useState("");
  const [user_id_card, setUser_id_card] = useState("");
  const [user_citizen, setUser_citizen] = useState("");

  const [user_type, setUser_type] = useState("");
  const [user_branch_id, setUser_branch_id] = useState("");
  const [user_site_id, setUser_site_id] = useState("");
  const [user_division_id, setUser_division_id] = useState("");
  const [user_department_id, setUser_department_id] = useState("");

  const [user_position_id, setUser_position_id] = useState("");
  const [user_role_id, setUser_role_id] = useState("");
  const [user_parent_id, setUser_parent_id] = useState("");
  const [user_start_work, setUser_start_work] = useState("");

  const [user_picture_file, setUser_picture_file] = useState(null);
  const [user_signature_file, setUser_signature_file] = useState(null);

  const [preview_picture_file, setPreview_picture_file] = useState(null);
  const [preview_signature_file, setPreview_signature_file] = useState(null);

  const signatureRef = useRef(null);

  const handleClearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
  };
  const handleSaveSignature = () => {
    if (signatureRef.current) {
      const signatureData = signatureRef.current.toDataURL();
      setUser_signature_file(signatureData);
    }
  };

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
          department.department_division_id == selectedBranchIdandDivisionId
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

  const handleChange = (e) => {
    const { name, files } = e.target;
    if (name === "user_picture_file" && files.length > 0) {
      const file = files[0];
      setUser_picture_file(file);
      setPreview_picture_file(URL.createObjectURL(file));
    }
    if (name === "user_signature_file" && files.length > 0) {
      const file = files[0];
      setUser_signature_file(file);
      setPreview_signature_file(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let base64Picture = null;
    let base64Signature = null;

    const fileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    const compressImage = async (imageFile) => {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(imageFile, options);
        return compressedFile;
      } catch (error) {
        console.log("Error compressing image:", error);
        throw error;
      }
    };

    if (user_picture_file instanceof File || user_picture_file instanceof Blob) {
      const compressedPictureFile = await compressImage(user_picture_file);
      base64Picture = await fileToBase64(compressedPictureFile);
    } else {
      console.error("user_picture_file is not a File or Blob instance");
    }
    
    if (user_signature_file instanceof File || user_signature_file instanceof Blob) {
      const compressedSignatureFile = await compressImage(user_signature_file);
      base64Signature = await fileToBase64(compressedSignatureFile);
    } else {
      console.error("user_signature_file is not a File or Blob instance");
    }
    
    const formData = new FormData(event.target);
    formData.append("user_number", user_number);
    formData.append("user_card_number", user_card_number);
    formData.append("user_password", user_password);
    formData.append("user_title", user_title);

    formData.append("user_firstname", user_firstname);
    formData.append("user_lastname", user_lastname);
    formData.append("user_nickname", user_nickname);
    formData.append("user_tel", user_tel);
    formData.append("user_email", user_email);

    formData.append("user_level", user_level);
    formData.append("user_birthday", user_birthday);
    formData.append("user_gender", user_gender);
    formData.append("user_id_card", user_id_card);
    formData.append("user_citizen", user_citizen);

    formData.append("user_type", user_type);
    formData.append("user_branch_id", user_branch_id);
    formData.append("user_site_id", user_site_id);
    formData.append("user_division_id", user_division_id);
    formData.append("user_department_id", user_department_id);

    formData.append("user_position_id", user_position_id);
    formData.append("user_role_id", user_role_id);
    formData.append("user_parent_id", user_parent_id);
    formData.append("user_start_work", user_start_work);

    formData.append("user_picture_file", base64Picture || "");
    formData.append("user_signature_file", base64Signature || "");

    formData.append("user_create_by", session?.user?.user_id);

    try {
      const response = await CreateUser({
        formData,
      });

      if (response.status === 201) {
        toast.success(response.message);
        setTimeout(() => {
          router.push("/hr/user");
        }, 2000);
      } else {
        setError(response);
        toast.error(response.message);
      }
    } catch (error) {
      setError({ message: "Error creating user: " + error.message });
      toast.error("Error creating user: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-6">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          เพิ่ม ผู้ใช้งาน
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          <AddHomeOutlinedIcon />
          <span className="px-4 text-[#635bff] bg-[#635bff]/25 rounded-xl">
            เพิ่ม ผู้ใช้งาน
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-f p-2 gap-2 bg-[#FFFFFF] rounded-xl shadow-sm">
        <div className="flex items-center justify-start w-full h-full p-4 gap-2 font-[600] border-b-2">
          เพิ่ม ผู้ใช้งาน
        </div>
        <Toaster position="top-right" reverseOrder={false} />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full h-full p-2 gap-2"
        >
          <label
            htmlFor="user_picture_file"
            className="flex flex-col items-center justify-center w-48 h-48 border-4 hover:border-[#635bff] rounded-full p-2 gap-2 cursor-pointer relative"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Face5OutlinedIcon style={{ fontSize: "48px" }} />
              <p className="mt-4">
                <span className="font-[600]">รูปพนักงาน</span>
              </p>
            </div>
            <input
              type="file"
              id="user_picture_file"
              name="user_picture_file"
              onChange={handleChange}
              className="hidden"
              isrequired="true"
            />
            {preview_picture_file && (
              <img
                src={preview_picture_file}
                alt="Preview"
                className="w-full h-full object-cover rounded-full z-10 absolute"
              />
            )}
          </label>

          <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
            ข้อมูลทั่วไป
          </div>

          <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                id="user_number"
                name="user_number"
                label="รหัสพนักงาน"
                placeholder="กรุณาระบุข้อมูล"
                size="md"
                variant="bordered"
                isrequired="true"
                value={user_number}
                onChange={(e) => setUser_number(e.target.value)}
                isInvalid={
                  !!error?.errors?.user_number && user_number.length === 0
                }
                errorMessage={error?.errors?.user_number?.[0]}
              />
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                id="user_card_number"
                name="user_card_number"
                label="เลขบัตรพนักงาน"
                placeholder="กรุณาระบุข้อมูล"
                size="md"
                variant="bordered"
                isrequired="true"
                value={user_card_number}
                onChange={(e) => setUser_card_number(e.target.value)}
                isInvalid={
                  !!error?.errors?.user_card_number &&
                  user_card_number.length === 0
                }
                errorMessage={error?.errors?.user_card_number?.[0]}
              />
            </div>
          </div>

          <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                id="user_password"
                name="user_password"
                value={user_password}
                label="รหัสผ่าน"
                placeholder="กำหนดให้รหัสผ่านเริ่มต้นเป็น 12345"
                size="md"
                isrequired="true"
                onChange={(e) => setUser_password(e.target.value)}
                isInvalid={
                  !!error?.errors?.user_password && user_password.length === 0
                }
                errorMessage={error?.errors?.user_password?.[0]}
              />
            </div>
          </div>

          <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                label="คำนำหน้าชื่อ"
                placeholder="กรุณาระบุข้อมูล"
                id="user_title"
                name="user_title"
                value={user_title}
                onChange={(e) => setUser_title(e.target.value)}
                variant="bordered"
                size="md"
                isInvalid={
                  !!error?.errors?.user_title && user_title.length === 0
                }
                errorMessage={error?.errors?.user_title?.[0]}
              >
                <SelectItem value="นาย" key="นาย">
                  นาย
                </SelectItem>
                <SelectItem value="นาง" key="นาง">
                  นาง
                </SelectItem>
                <SelectItem value="นางสาว" key="นานางสาวง">
                  นางสาว
                </SelectItem>
              </Select>
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                id="user_firstname"
                name="user_firstname"
                label="ขื่อ"
                placeholder="กรุณาระบุข้อมูล"
                size="md"
                variant="bordered"
                isrequired="true"
                value={user_firstname}
                onChange={(e) => setUser_firstname(e.target.value)}
                isInvalid={
                  !!error?.errors?.user_firstname && user_firstname.length === 0
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
                isrequired="true"
                value={user_lastname}
                onChange={(e) => setUser_lastname(e.target.value)}
                isInvalid={
                  !!error?.errors?.user_lastname && user_lastname.length === 0
                }
                errorMessage={error?.errors?.user_lastname?.[0]}
              />
            </div>
          </div>

          <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                id="user_nickname"
                name="user_nickname"
                label="ขื่อเล่น"
                placeholder="กรุณาระบุข้อมูล"
                size="md"
                variant="bordered"
                isrequired="true"
                value={user_nickname}
                onChange={(e) => setUser_nickname(e.target.value)}
                isInvalid={
                  !!error?.errors?.user_nickname && user_nickname.length === 0
                }
                errorMessage={error?.errors?.user_nickname?.[0]}
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
                isrequired="true"
                value={user_tel}
                onChange={(e) => setUser_tel(e.target.value)}
                isInvalid={!!error?.errors?.user_tel && user_tel.length === 0}
                errorMessage={error?.errors?.user_tel?.[0]}
              />
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="email"
                id="user_email"
                name="user_email"
                label="อีเมลล์"
                placeholder="กรุณาระบุข้อมูล"
                size="md"
                variant="bordered"
                isrequired="true"
                value={user_email}
                onChange={(e) => setUser_email(e.target.value)}
                isInvalid={
                  !!error?.errors?.user_email && user_email.length === 0
                }
                errorMessage={error?.errors?.user_email?.[0]}
              />
            </div>
          </div>

          <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                label="ระดับการใช้งาน"
                placeholder="กรุณาระบุข้อมูล"
                id="user_level"
                name="user_level"
                value={user_level}
                onChange={(e) => setUser_level(e.target.value)}
                variant="bordered"
                size="md"
                isInvalid={
                  !!error?.errors?.user_level && user_level.length === 0
                }
                errorMessage={error?.errors?.user_level?.[0]}
              >
                <SelectItem value="admin" key="admin">
                  admin
                </SelectItem>
                <SelectItem value="user" key="user">
                  user
                </SelectItem>
              </Select>
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="date"
                id="user_birthday"
                name="user_birthday"
                label="วันเกิด"
                placeholder="กรุณาระบุข้อมูล"
                size="md"
                variant="bordered"
                isrequired="true"
                value={user_birthday}
                onChange={(e) => setUser_birthday(e.target.value)}
                isInvalid={
                  !!error?.errors?.user_birthday && user_birthday.length === 0
                }
                errorMessage={error?.errors?.user_birthday?.[0]}
              />
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                label="เพศ"
                placeholder="กรุณาระบุข้อมูล"
                id="user_gender"
                name="user_gender"
                value={user_gender}
                onChange={(e) => setUser_gender(e.target.value)}
                variant="bordered"
                size="md"
                isInvalid={
                  !!error?.errors?.user_gender && user_gender.length === 0
                }
                errorMessage={error?.errors?.user_gender?.[0]}
              >
                <SelectItem value="ชาย" key="ชาย">
                  ชาย
                </SelectItem>
                <SelectItem value="หญิง" key="หญิง">
                  หญิง
                </SelectItem>
                <SelectItem value="ไม่ต้องการระบุ" key="ไม่ต้องการระบุ">
                  ไม่ต้องการระบุ
                </SelectItem>
              </Select>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                id="user_id_card"
                name="user_id_card"
                label="เลขบัตรประชาชน"
                placeholder="กรุณาระบุข้อมูล"
                size="md"
                variant="bordered"
                isrequired="true"
                value={user_id_card}
                onChange={(e) => setUser_id_card(e.target.value)}
                isInvalid={
                  !!error?.errors?.user_id_card && user_id_card.length === 0
                }
                errorMessage={error?.errors?.user_id_card?.[0]}
              />
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                label="สัญชาติ"
                placeholder="กรุณาระบุข้อมูล"
                id="user_citizen"
                name="user_citizen"
                value={user_citizen}
                onChange={(e) => setUser_citizen(e.target.value)}
                variant="bordered"
                size="md"
                isInvalid={
                  !!error?.errors?.user_citizen && user_citizen.length === 0
                }
                errorMessage={error?.errors?.user_citizen?.[0]}
              >
                <SelectItem value="ไทย" key="ไทย">
                  ไทย
                </SelectItem>
                <SelectItem value="ต่างชาติ" key="ต่างชาติ">
                  ต่างชาติ
                </SelectItem>
              </Select>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row items-center justify-start w-full h-full p-2 gap-2 font-[600]">
            ข้อมูลการจ้างงาน
          </div>

          <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                label="ประเภทพนักงาน"
                placeholder="กรุณาระบุข้อมูล"
                id="user_type"
                name="user_type"
                value={user_type}
                onChange={(e) => setUser_type(e.target.value)}
                variant="bordered"
                size="md"
                isInvalid={!!error?.errors?.user_type && user_type.length === 0}
                errorMessage={error?.errors?.user_type?.[0]}
              >
                <SelectItem value="รายเดือน" key="รายเดือน">
                  รายเดือน
                </SelectItem>
                <SelectItem value="รายเดือน (คนพิการ)" key="รายเดือน (คนพิการ)">
                  รายเดือน (คนพิการ)
                </SelectItem>
                <SelectItem value="รายวัน" key="รายวัน">
                  รายวัน
                </SelectItem>
              </Select>
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                label="เลือกสาขา"
                placeholder="กรุณาเลือกสาขา"
                id="user_branch_id"
                name="user_branch_id"
                value={user_branch_id}
                onChange={(e) => setUser_branch_id(e.target.value)}
                variant="bordered"
                size="md"
                isInvalid={
                  !!error?.errors?.user_branch_id && user_branch_id.length === 0
                }
                errorMessage={error?.errors?.user_branch_id?.[0]}
              >
                {branch.map((branch) => (
                  <SelectItem key={branch.branch_id} value={branch.branch_id}>
                    {branch.branch_name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                label="เลือก ไซต์"
                placeholder="กรุณาระบุ ไซต์"
                id="user_site_id"
                name="user_site_id"
                value={user_site_id}
                onChange={(e) => setUser_site_id(e.target.value)}
                variant="bordered"
                isDisabled={!isbranchselected}
                size="md"
                isInvalid={
                  !!error?.errors?.user_site_id && user_site_id.length === 0
                }
                errorMessage={error?.errors?.user_site_id?.[0]}
              >
                {filteredsite.map((site) => (
                  <SelectItem key={site.site_id} value={site.site_id}>
                    {site.site_name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                label="เลือก ฝ่าย"
                placeholder="กรุณาระบุ ฝ่าย"
                id="user_division_id"
                name="user_division_id"
                value={user_division_id}
                onChange={(e) => setUser_division_id(e.target.value)}
                variant="bordered"
                size="md"
                isDisabled={!isbranchselected}
                isInvalid={
                  !!error?.errors?.user_division_id &&
                  user_division_id.length === 0
                }
                errorMessage={error?.errors?.user_division_id?.[0]}
              >
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
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                label="เลือก แผนก"
                placeholder="กรุณาระบุ แผนก"
                id="user_department_id"
                name="user_department_id"
                value={user_department_id}
                onChange={(e) => setUser_department_id(e.target.value)}
                variant="bordered"
                size="md"
                isDisabled={!isdivisionandbranchselected}
                isInvalid={
                  !!error?.errors?.user_department_id &&
                  user_department_id.length === 0
                }
                errorMessage={error?.errors?.user_department_id?.[0]}
              >
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
                placeholder="กรุณาระบุ ตำแหน่ง"
                id="user_position_id"
                name="user_position_id"
                value={user_position_id}
                onChange={(e) => setUser_position_id(e.target.value)}
                variant="bordered"
                size="md"
                isDisabled={!isdepartmentanddivisionandbranchselected}
                isInvalid={
                  !!error?.errors?.user_position_id &&
                  user_position_id.length === 0
                }
                errorMessage={error?.errors?.user_position_id?.[0]}
              >
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

          <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                label="เลือก บทบาทหน้าที่"
                placeholder="กรุณาระบุ บทบาทหน้าที่"
                id="user_role_id"
                name="user_role_id"
                value={user_role_id}
                onChange={(e) => setUser_role_id(e.target.value)}
                variant="bordered"
                size="md"
                isInvalid={
                  !!error?.errors?.user_role_id && user_role_id.length === 0
                }
                errorMessage={error?.errors?.user_role_id?.[0]}
              >
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
                placeholder="กรุณาระบุ สายบังคับบัญชา"
                id="user_parent_id"
                name="user_parent_id"
                value={user_parent_id}
                onChange={(e) => setUser_parent_id(e.target.value)}
                variant="bordered"
                size="md"
                isDisabled={!isdivisionselected}
                isInvalid={
                  !!error?.errors?.user_parent_id && user_parent_id.length === 0
                }
                errorMessage={error?.errors?.user_parent_id?.[0]}
              >
                {filteredparent.map((parent) => (
                  <SelectItem key={parent.user_id} value={parent.user_id}>
                    {parent.user_firstname + " " + parent.user_lastname}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="date"
                id="user_start_work"
                name="user_start_work"
                label="วันที่เริ่มงาน"
                placeholder="กรุณาระบุข้อมูล"
                size="md"
                variant="bordered"
                isrequired="true"
                value={user_start_work}
                onChange={(e) => setUser_start_work(e.target.value)}
                isInvalid={
                  !!error?.errors?.user_start_work &&
                  user_start_work.length === 0
                }
                errorMessage={error?.errors?.user_start_work?.[0]}
              />
            </div>
          </div>

          <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <label className="font-semibold">ลายเซ็น</label>
              <SignatureCanvas
                ref={signatureRef}
                penColor="black"
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: "border-2 border-gray-300 rounded-md",
                }}
              />
            </div>
            <div className="flex flex-row gap-2 mt-2">
              <Button onClick={handleSaveSignature}>บันทึกลายเซ็น</Button>
              <Button onClick={handleClearSignature}>ล้างลายเซ็น</Button>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                type="text"
                label="ดำเนินการโดย"
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
                className="w-1/12 bg-[#615DFF]/25 text-[#615DFF]"
              >
                บันทึก
              </Button>
              <Button
                size="md"
                className="w-1/12 bg-[#F07294]/25 text-[#F07294]"
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
