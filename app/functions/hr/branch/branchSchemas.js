import { z } from "zod";

export const createBranchSchema = z.object({
  branch_name: z.string().min(1, { message: "กรุณาระบุ สาขา" }),
  branch_create_by: z.number().positive("กรุณาระบุ ผู้ดำเนินการ"),
});

export const updateBranchSchema = z.object({
  branch_name: z.string().min(1, { message: "กรุณาระบุ สาขา" }),
  branch_update_by: z.number().positive("กรุณาระบุ ผู้ดำเนินการ"),
  branch_status: z.enum(["0", "1"], {message: "สถานะต้องเป็น 0 (ไม่ใช้งาน) หรือ 1 (ใช้งาน) เท่านั้น",}),
});
