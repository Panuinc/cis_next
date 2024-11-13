import { z } from "zod";

export const createUserSchema = z.object({
  user_number: z.string().min(1, { message: "กรุณาระบุ รหัสพนักงาน" }),
  user_card_number: z.string().min(1, { message: "กรุณาระบุ เลขบัตรพนักงาน" }),
  user_password: z.string().min(1, { message: "กรุณาระบุ รหัสผ่าน" }),
  user_title: z.string().min(1, { message: "กรุณาระบุ คำนำหน้าชื่อ" }),

  user_firstname: z.string().min(1, { message: "กรุณาระบุ ชื่อ" }),
  user_lastname: z.string().min(1, { message: "กรุณาระบุ นามสกุล" }),
  user_nickname: z.string().min(1, { message: "กรุณาระบุ ชื่อเล่น" }),
  user_tel: z.string().min(1, { message: "กรุณาระบุ เบอร์โทรศัพท์" }),
  user_email: z.string().email({ message: "กรุณาระบุ อีเมลล์ที่ถูกต้อง" }).min(1, { message: "กรุณาระบุ อีเมลล์" }),

  user_level: z.string().min(1, { message: "กรุณาระบุ ระดับการใช้งาน" }),
  user_birthday: z.string().min(1, { message: "กรุณาระบุ วันเกิด" }),
  user_gender: z.string().min(1, { message: "กรุณาระบุ เพศ" }),
  user_id_card: z.string().min(1, { message: "กรุณาระบุ เลขบัตรประชาชน" }),
  user_citizen: z.string().min(1, { message: "กรุณาระบุ สัญชาติ" }),

  user_type: z.string().min(1, { message: "กรุณาระบุ ชนิดของพนักงาน" }),
  user_branch_id: z.coerce.number().positive("กรุณาระบุ สาขา" ),
  user_site_id: z.coerce.number().positive("กรุณาระบุ ไซต์งาน" ),
  user_division_id: z.coerce.number().positive("กรุณาระบุ ฝ่าย" ),
  user_department_id: z.coerce.number().positive("กรุณาระบุ แผนก" ),

  user_position_id: z.coerce.number().positive("กรุณาระบุ ตำแหน่ง" ),
  user_role_id: z.coerce.number().positive("กรุณาระบุ บทบาทหน้าที่" ),
  user_parent_id: z.coerce.number().positive("กรุณาระบุ ผู้บังคับบัญชา" ),
  user_start_work: z.string().min(1, { message: "กรุณาระบุ วันที่เริ่มงาน" }),

  user_picture_file: z.string().min(1, { message: "กรุณาระบุ รูปภาพ" }),
  user_signature_file: z.string().min(1, { message: "กรุณาระบุ ลายเซ็น" }),

  user_create_by: z.coerce.number().positive("กรุณาระบุ ผู้ดำเนินการ"),
});

export const updateUserSchema = z.object({
  user_number: z.string().min(1, { message: "กรุณาระบุ รหัสพนักงาน" }),
  user_card_number: z.string().min(1, { message: "กรุณาระบุ เลขบัตรพนักงาน" }),
  user_title: z.string().min(1, { message: "กรุณาระบุ คำนำหน้าชื่อ" }),

  user_firstname: z.string().min(1, { message: "กรุณาระบุ ชื่อ" }),
  user_lastname: z.string().min(1, { message: "กรุณาระบุ นามสกุล" }),
  user_nickname: z.string().min(1, { message: "กรุณาระบุ ชื่อเล่น" }),
  user_tel: z.string().min(1, { message: "กรุณาระบุ เบอร์โทรศัพท์" }),
  user_email: z.string().email({ message: "กรุณาระบุ อีเมลล์ที่ถูกต้อง" }).min(1, { message: "กรุณาระบุ อีเมลล์" }),

  user_level: z.string().min(1, { message: "กรุณาระบุ ระดับการใช้งาน" }),
  user_birthday: z.string().min(1, { message: "กรุณาระบุ วันเกิด" }),
  user_gender: z.string().min(1, { message: "กรุณาระบุ เพศ" }),
  user_id_card: z.string().min(1, { message: "กรุณาระบุ เลขบัตรประชาชน" }),
  user_citizen: z.string().min(1, { message: "กรุณาระบุ สัญชาติ" }),

  user_type: z.string().min(1, { message: "กรุณาระบุ ชนิดของพนักงาน" }),
  user_branch_id: z.coerce.number().positive("กรุณาระบุ สาขา" ),
  user_site_id: z.coerce.number().positive("กรุณาระบุ ไซต์งาน" ),
  user_division_id: z.coerce.number().positive("กรุณาระบุ ฝ่าย" ),
  user_department_id: z.coerce.number().positive("กรุณาระบุ แผนก" ),

  user_position_id: z.coerce.number().positive("กรุณาระบุ ตำแหน่ง" ),
  user_role_id: z.coerce.number().positive("กรุณาระบุ บทบาทหน้าที่" ),
  user_parent_id: z.coerce.number().positive("กรุณาระบุ ผู้บังคับบัญชา" ),
  user_start_work: z.string().min(1, { message: "กรุณาระบุ วันที่เริ่มงาน" }),
  user_status: z.enum(["0", "1"], {message: "สถานะต้องเป็น 0 (Inactive) หรือ 1 (Active) เท่านั้น",}),
  
  user_update_by: z.coerce.number().positive("กรุณาระบุ ผู้ดำเนินการ"),
});

export const resetPasswordSchema = z.object({
  user_password: z.string().min(1, { message: "กรุณาระบุ รหัสผ่าน" }),  
  user_update_by: z.coerce.number().positive("กรุณาระบุ ผู้ดำเนินการ"),
});
