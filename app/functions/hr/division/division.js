"use server";
import { mysqlPool } from "@/utils/db";
import {
  logToFile,
  getSessionAndHeaders,
  queryDatabase,
} from "@/utils/helpers";
import {
  createDivisionSchema,
  updateDivisionSchema,
} from "@/app/functions/hr/division/divisionSchemas";

// Fetch all division
export const FetchDivision = async () => {
  const query = `
    SELECT 
      division.division_id, 
      division.division_branch_id, 
      division.division_name, 
      division.division_acronym, 
      division.division_status,

      CONCAT(creator.user_firstname, ' ', creator.user_lastname) AS create_by,
      DATE_FORMAT(division.division_create_time, '%Y-%m-%d %H:%i:%s') AS division_create_time,

      CONCAT(updater.user_firstname, ' ', updater.user_lastname) AS update_by,
      DATE_FORMAT(division.division_update_time, '%Y-%m-%d %H:%i:%s') AS division_update_time,

      branch.branch_id,
      branch.branch_name

    FROM division
    LEFT JOIN branch AS branch ON branch.branch_id = division.division_branch_id
    LEFT JOIN user AS creator ON creator.user_id = division.division_create_by
    LEFT JOIN user AS updater ON updater.user_id = division.division_update_by;
  `;
  return await queryDatabase(query);
};

// Fetch division by ID
export const FetchDivisionById = async (division_id) => {
  const query = `
    SELECT 
      division.division_id, 
      division.division_branch_id, 
      division.division_name, 
      division.division_acronym, 
      division.division_status,

      CONCAT(creator.user_firstname, ' ', creator.user_lastname) AS create_by,
      DATE_FORMAT(division.division_create_time, '%Y-%m-%d %H:%i:%s') AS division_create_time,

      CONCAT(updater.user_firstname, ' ', updater.user_lastname) AS update_by,
      DATE_FORMAT(division.division_update_time, '%Y-%m-%d %H:%i:%s') AS division_update_time,

      branch.branch_id,
      branch.branch_name

    FROM division
    LEFT JOIN branch AS branch ON branch.branch_id = division.division_branch_id
    LEFT JOIN user AS creator ON creator.user_id = division.division_create_by
    LEFT JOIN user AS updater ON updater.user_id = division.division_update_by
    WHERE division.division_id = ?;
  `;
  const rows = await queryDatabase(query, [division_id]);
  return Array.isArray(rows) ? rows[0] : rows;
};

// Create a new division
export const CreateDivision = async ({ formData }) => {
  const validatedFields = createDivisionSchema.safeParse({
    division_branch_id: formData.get("division_branch_id"),
    division_name: formData.get("division_name"),
    division_acronym: formData.get("division_acronym"),
    division_create_by: parseInt(formData.get("division_create_by"), 10),
  });

  if (!validatedFields.success) {
    return {
      code: 402,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "ข้อมูลที่ได้รับไม่ถูกต้อง",
    };
  }

  const {
    division_branch_id,
    division_name,
    division_acronym,
    division_create_by,
  } = validatedFields.data;
  const { userId, ipAddress, url } = await getSessionAndHeaders();
  const existingDivision = await queryDatabase(
    `SELECT 1 FROM division WHERE division_branch_id = ? AND division_name = ? AND division_acronym = ? LIMIT 1`,
    [division_branch_id, division_name, division_acronym]
  );

  if (existingDivision && existingDivision.length > 0) {
    return { message: "ข้อมูลนี้มีอยู่ในระบบแล้ว", status: 400 };
  }

  const promisePool = mysqlPool.promise();
  const [result] = await promisePool.query(
    `INSERT INTO division (division_branch_id, division_name, division_acronym, division_create_by) VALUES (?, ?, ?, ?)`,
    [division_branch_id, division_name, division_acronym, division_create_by]
  );

  if (result.affectedRows === 1) {
    logToFile(userId, `Created division: ${division_name}`, ipAddress, url);
    return { message: "สร้างข้อมูลสำเร็จ", status: 201 };
  }
  throw new Error("ไม่สามารถสร้างข้อมูลได้");
};

// Update division data
export const UpdateDivision = async ({ formData, division_id }) => {
  const validatedFields = updateDivisionSchema.safeParse({
    division_name: formData.get("division_name"),
    division_acronym: formData.get("division_acronym"),
    division_status: formData.get("division_status"),
    division_update_by: parseInt(formData.get("division_update_by"), 10),
  });

  if (!validatedFields.success) {
    return {
      code: 402,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "ข้อมูลที่ได้รับไม่ถูกต้อง",
    };
  }

  const {
    division_name,
    division_acronym,
    division_status,
    division_update_by,
  } = validatedFields.data;
  const { userId, ipAddress, url } = await getSessionAndHeaders();
  const existingDivision = await queryDatabase(
    `SELECT 1 FROM division WHERE division_id = ? LIMIT 1`,
    [division_id]
  );

  if (!existingDivision || existingDivision.length === 0) {
    return { message: "ไม่พบข้อมูล", status: 400 };
  }

  const promisePool = mysqlPool.promise();
  const [result] = await promisePool.query(
    `UPDATE division 
       SET division_name = ?, division_acronym = ?, division_status = ?, division_update_by = ?, division_update_time = NOW() 
       WHERE division_id = ?`,
    [
      division_name,
      division_acronym,
      division_status,
      division_update_by,
      division_id,
    ]
  );

  if (result.affectedRows === 1) {
    logToFile(userId, `PUT division ${division_id}`, ipAddress, url);
    return { message: "อัพเดทข้อมูลสำเร็จ", status: 200 };
  }
  throw new Error("ไม่สามารถอัพเดทข้อมูลได้");
};
