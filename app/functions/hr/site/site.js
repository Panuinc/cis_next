"use server";
import { mysqlPool } from "@/utils/db";
import {
  logToFile,
  getSessionAndHeaders,
  queryDatabase,
} from "@/utils/helpers";
import {
  createSiteSchema,
  updateSiteSchema,
} from "@/app/functions/hr/site/siteSchemas";

// Fetch all site
export const FetchSite = async () => {
  const query = `
    SELECT 
      site.site_id, 
      site.site_branch_id, 
      site.site_name, 
      site.site_status,

      CONCAT(creator.user_firstname, ' ', creator.user_lastname) AS create_by,
      DATE_FORMAT(site.site_create_time, '%Y-%m-%d %H:%i:%s') AS site_create_time,

      CONCAT(updater.user_firstname, ' ', updater.user_lastname) AS update_by,
      DATE_FORMAT(site.site_update_time, '%Y-%m-%d %H:%i:%s') AS site_update_time,

      branch.branch_id,
      branch.branch_name

    FROM site
    LEFT JOIN branch AS branch ON branch.branch_id = site.site_branch_id
    LEFT JOIN user AS creator ON creator.user_id = site.site_create_by
    LEFT JOIN user AS updater ON updater.user_id = site.site_update_by;
  `;
  return await queryDatabase(query);
};

// Fetch site by ID
export const FetchSiteById = async (site_id) => {
  const query = `
    SELECT 
      site.site_id, 
      site.site_branch_id, 
      site.site_name, 
      site.site_status,

      CONCAT(creator.user_firstname, ' ', creator.user_lastname) AS create_by,
      DATE_FORMAT(site.site_create_time, '%Y-%m-%d %H:%i:%s') AS site_create_time,

      CONCAT(updater.user_firstname, ' ', updater.user_lastname) AS update_by,
      DATE_FORMAT(site.site_update_time, '%Y-%m-%d %H:%i:%s') AS site_update_time,

      branch.branch_id,
      branch.branch_name

    FROM site
    LEFT JOIN branch AS branch ON branch.branch_id = site.site_branch_id
    LEFT JOIN user AS creator ON creator.user_id = site.site_create_by
    LEFT JOIN user AS updater ON updater.user_id = site.site_update_by
    WHERE site.site_id = ?;
  `;
  const rows = await queryDatabase(query, [site_id]);
  return Array.isArray(rows) ? rows[0] : rows;
};

// Create a new site
export const CreateSite = async ({ formData }) => {
  const validatedFields = createSiteSchema.safeParse({
    site_branch_id: formData.get("site_branch_id"),
    site_name: formData.get("site_name"),
    site_create_by: parseInt(formData.get("site_create_by"), 10),
  });

  if (!validatedFields.success) {
    console.log(
      "Validation errors:",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      code: 402,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "ข้อมูลที่ได้รับไม่ถูกต้อง",
    };
  }

  const { site_branch_id, site_name, site_create_by } = validatedFields.data;
  const { userId, ipAddress, url } = await getSessionAndHeaders();
  const existingSite = await queryDatabase(
    `SELECT 1 FROM site WHERE site_branch_id = ? AND site_name = ? LIMIT 1`,
    [site_branch_id, site_name]
  );

  if (existingSite && existingSite.length > 0) {
    return { message: "ข้อมูลนี้มีอยู่ในระบบแล้ว", status: 400 };
  }

  const promisePool = mysqlPool.promise();
  const [result] = await promisePool.query(
    `INSERT INTO site (site_branch_id, site_name, site_create_by) VALUES (?, ?, ?)`,
    [site_branch_id, site_name, site_create_by]
  );

  if (result.affectedRows === 1) {
    logToFile(userId, `Created site: ${site_name}`, ipAddress, url);
    return { message: "สร้างข้อมูลสำเร็จ", status: 201 };
  }
  throw new Error("ไม่สามารถสร้างข้อมูลได้");
};

// Update site data
export const UpdateSite = async ({ formData, site_id }) => {
  const validatedFields = updateSiteSchema.safeParse({
    site_name: formData.get("site_name"),
    site_status: formData.get("site_status"),
    site_update_by: parseInt(formData.get("site_update_by"), 10),
  });

  if (!validatedFields.success) {
    console.log(
      "Validation errors:",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      code: 402,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "ข้อมูลที่ได้รับไม่ถูกต้อง",
    };
  }

  const { site_name, site_status, site_update_by } = validatedFields.data;
  const { userId, ipAddress, url } = await getSessionAndHeaders();
  const existingSite = await queryDatabase(
    `SELECT 1 FROM site WHERE site_id = ? LIMIT 1`,
    [site_id]
  );

  if (!existingSite || existingSite.length === 0) {
    return { message: "ไม่พบข้อมูล", status: 400 };
  }

  const promisePool = mysqlPool.promise();
  const [result] = await promisePool.query(
    `UPDATE site 
       SET site_name = ?, site_status = ?, site_update_by = ?, site_update_time = NOW() 
       WHERE site_id = ?`,
    [site_name, site_status, site_update_by, site_id]
  );

  if (result.affectedRows === 1) {
    logToFile(userId, `PUT site ${site_id}`, ipAddress, url);
    return { message: "อัพเดทข้อมูลสำเร็จ", status: 200 };
  }
  throw new Error("ไม่สามารถอัพเดทข้อมูลได้");
};
