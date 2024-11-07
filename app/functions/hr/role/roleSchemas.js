import { z } from "zod";

export const createRoleSchema = z.object({
  role_name: z.string().min(1, { message: "กรุณาระบุ สาขา" }),
  role_create_by: z.coerce.number().positive("กรุณาระบุ ผู้ดำเนินการ"),
});

export const updateRoleSchema = z.object({
  role_name: z.string().min(1, { message: "กรุณาระบุ สาขา" }),
  role_status: z.enum(["0", "1"], {message: "สถานะต้องเป็น 0 (Inactive) หรือ 1 (Active) เท่านั้น",}),
  role_update_by: z.coerce.number().positive("กรุณาระบุ ผู้ดำเนินการ"),
});
