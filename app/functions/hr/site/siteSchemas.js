import { z } from "zod";

export const createSiteSchema = z.object({
  site_branch_id: z.coerce.number().positive("กรุณาระบุ สาขา" ),
  site_name: z.string().min(1, { message: "กรุณาระบุ ไซต์งาน" }),
  site_create_by: z.coerce.number().positive("กรุณาระบุ ผู้ดำเนินการ"),
});

export const updateSiteSchema = z.object({
  site_name: z.string().min(1, { message: "กรุณาระบุ ไซต์งาน" }),
  site_status: z.enum(["0", "1"], {message: "สถานะต้องเป็น 0 (Inactive) หรือ 1 (Active) เท่านั้น",}),
  site_update_by: z.coerce.number().positive("กรุณาระบุ ผู้ดำเนินการ"),
});
