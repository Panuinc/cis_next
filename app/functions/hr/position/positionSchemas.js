import { z } from "zod";

export const createPositionSchema = z.object({
  position_branch_id: z.coerce.number().positive("กรุณาระบุ สาขา" ),
  position_division_id: z.coerce.number().positive("กรุณาระบุ ฝ่าย" ),
  position_department_id: z.coerce.number().positive("กรุณาระบุ แผนก" ),
  position_name: z.string().min(1, { message: "กรุณาระบุ ตำแหน่ง" }),
  position_create_by: z.coerce.number().positive("กรุณาระบุ ผู้ดำเนินการ"),
});

export const updatePositionSchema = z.object({
  position_name: z.string().min(1, { message: "กรุณาระบุ ตำแหน่ง" }),
  position_status: z.enum(["0", "1"], {message: "สถานะต้องเป็น 0 (Inactive) หรือ 1 (Active) เท่านั้น",}),
  position_update_by: z.coerce.number().positive("กรุณาระบุ ผู้ดำเนินการ"),
});
