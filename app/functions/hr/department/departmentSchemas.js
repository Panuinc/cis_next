import { z } from "zod";

export const createDepartmentSchema = z.object({
  department_branch_id: z.coerce.number().positive("กรุณาระบุ สาขา" ),
  department_division_id: z.coerce.number().positive("กรุณาระบุ ฝ่าย" ),
  department_name: z.string().min(1, { message: "กรุณาระบุ แผนก" }),
  department_create_by: z.coerce.number().positive("กรุณาระบุ ผู้ดำเนินการ"),
});

export const updateDepartmentSchema = z.object({
  department_name: z.string().min(1, { message: "กรุณาระบุ แผนก" }),
  department_status: z.enum(["0", "1"], {message: "สถานะต้องเป็น 0 (Inactive) หรือ 1 (Active) เท่านั้น",}),
  department_update_by: z.coerce.number().positive("กรุณาระบุ ผู้ดำเนินการ"),
});
