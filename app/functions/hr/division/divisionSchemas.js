import { z } from "zod";

export const createDivisionSchema = z.object({
  division_branch_id: z.coerce.number().positive("กรุณาระบุ สาขา" ),
  division_name: z.string().min(1, { message: "กรุณาระบุ ฝ่าย" }),
  division_acronym: z.string().min(1, { message: "กรุณาระบุ ชื่อย่อฝ่าย" }),
  division_create_by: z.coerce.number().positive("กรุณาระบุ ผู้ดำเนินการ"),
});

export const updateDivisionSchema = z.object({
  division_name: z.string().min(1, { message: "กรุณาระบุ ฝ่าย" }),
  division_acronym: z.string().min(1, { message: "กรุณาระบุ ชื่อย่อฝ่าย" }),
  division_status: z.enum(["0", "1"], {message: "สถานะต้องเป็น 0 (Inactive) หรือ 1 (Active) เท่านั้น",}),
  division_update_by: z.coerce.number().positive("กรุณาระบุ ผู้ดำเนินการ"),
});
