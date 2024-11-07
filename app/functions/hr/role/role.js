"use server";
import { mysqlPool } from "@/utils/db";
import {
  logToFile,
  getSessionAndHeaders,
  queryDatabase,
} from "@/utils/helpers";
import {
  createRoleSchema,
  updateRoleSchema,
} from "@/app/functions/hr/role/roleSchemas";

// Fetch all role
export const FetchRole = async () => {
  const query = `
    SELECT 
      role.role_id, 
      role.role_name, 
      role.role_status,

      CONCAT(creator.user_firstname, ' ', creator.user_lastname) AS create_by,
      DATE_FORMAT(role.role_create_time, '%Y-%m-%d %H:%i:%s') AS role_create_time,

      CONCAT(updater.user_firstname, ' ', updater.user_lastname) AS update_by,
      DATE_FORMAT(role.role_update_time, '%Y-%m-%d %H:%i:%s') AS role_update_time

    FROM role
    LEFT JOIN user AS creator ON creator.user_id = role.role_create_by
    LEFT JOIN user AS updater ON updater.user_id = role.role_update_by;
  `;
  return await queryDatabase(query);
};

// Fetch role by ID
export const FetchRoleById = async (role_id) => {
  const query = `
    SELECT 
      role.role_id, 
      role.role_name, 
      role.role_status,

      CONCAT(creator.user_firstname, ' ', creator.user_lastname) AS create_by,
      DATE_FORMAT(role.role_create_time, '%Y-%m-%d %H:%i:%s') AS role_create_time,

      CONCAT(updater.user_firstname, ' ', updater.user_lastname) AS update_by,
      DATE_FORMAT(role.role_update_time, '%Y-%m-%d %H:%i:%s') AS role_update_time
      
    FROM role
    LEFT JOIN user AS creator ON creator.user_id = role.role_create_by
    LEFT JOIN user AS updater ON updater.user_id = role.role_update_by
    WHERE role.role_id = ?;
  `;
  const rows = await queryDatabase(query, [role_id]);
  return Array.isArray(rows) ? rows[0] : rows;
};

// Create a new role
export const CreateRole = async ({ formData }) => {
  const validatedFields = createRoleSchema.safeParse({
    role_name: formData.get("role_name"),
    role_create_by: parseInt(formData.get("role_create_by"), 10),
  });

  if (!validatedFields.success) {
    return {
      code: 402,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "ข้อมูลที่ได้รับไม่ถูกต้อง",
    };
  }

  const { role_name, role_create_by } = validatedFields.data;
  const { userId, ipAddress, url } = await getSessionAndHeaders();
  const existingRole = await queryDatabase(
    `SELECT 1 FROM role WHERE role_name = ? LIMIT 1`,
    [role_name]
  );

  if (existingRole && existingRole.length > 0) {
    return { message: "ข้อมูลนี้มีอยู่ในระบบแล้ว", status: 400 };
  }

  const promisePool = mysqlPool.promise();
  const [result] = await promisePool.query(
    `INSERT INTO role (role_name, role_create_by) VALUES (?, ?)`,
    [role_name, role_create_by]
  );

  if (result.affectedRows === 1) {
    logToFile(userId, `Created role: ${role_name}`, ipAddress, url);
    return { message: "สร้างข้อมูลสำเร็จ", status: 201 };
  }
  throw new Error("ไม่สามารถสร้างข้อมูลได้");
};

// Update role data
export const UpdateRole = async ({ formData, role_id }) => {
  const validatedFields = updateRoleSchema.safeParse({
    role_name: formData.get("role_name"),
    role_status: formData.get("role_status"),
    role_update_by: parseInt(formData.get("role_update_by"), 10),
  });

  if (!validatedFields.success) {
    return {
      code: 402,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "ข้อมูลที่ได้รับไม่ถูกต้อง",
    };
  }

  const { role_name, role_status, role_update_by } = validatedFields.data;
  const { userId, ipAddress, url } = await getSessionAndHeaders();
  const existingRole = await queryDatabase(
    `SELECT 1 FROM role WHERE role_id = ? LIMIT 1`,
    [role_id]
  );

  if (!existingRole || existingRole.length === 0) {
    return { message: "ไม่พบข้อมูล", status: 400 };
  }

  const promisePool = mysqlPool.promise();
  const [result] = await promisePool.query(
    `UPDATE role 
       SET role_name = ?, role_status = ?, role_update_by = ?, role_update_time = NOW() 
       WHERE role_id = ?`,
    [role_name, role_status, role_update_by, role_id]
  );

  if (result.affectedRows === 1) {
    logToFile(userId, `PUT role ${role_id}`, ipAddress, url);
    return { message: "อัพเดทข้อมูลสำเร็จ", status: 200 };
  }
  throw new Error("ไม่สามารถอัพเดทข้อมูลได้");
};
