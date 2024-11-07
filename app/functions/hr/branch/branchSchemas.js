import { z } from "zod";

export const createBranchSchema = z.object({
  branch_name: z.string().min(1, { message: "กรุณาระบุ สาขา" }),
  branch_create_by: z.coerce.number().positive("กรุณาระบุ ผู้ดำเนินการ"),
});

export const updateBranchSchema = z.object({
  branch_name: z.string().min(1, { message: "กรุณาระบุ สาขา" }),
  branch_status: z.enum(["0", "1"], {message: "สถานะต้องเป็น 0 (Inactive) หรือ 1 (Active) เท่านั้น",}),
  branch_update_by: z.coerce.number().positive("กรุณาระบุ ผู้ดำเนินการ"),
});
