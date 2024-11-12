"use server";
import { mysqlPool } from "@/utils/db";
import {
  logToFile,
  getSessionAndHeaders,
  queryDatabase,
} from "@/utils/helpers";
import {
  createBranchSchema,
  updateBranchSchema,
} from "@/app/functions/hr/branch/branchSchemas";

// Fetch all branch
export const FetchBranch = async () => {
  const query = `
    SELECT 
      branch.branch_id, 
      branch.branch_name, 
      branch.branch_status,

      CONCAT(creator.user_firstname, ' ', creator.user_lastname) AS create_by,
      DATE_FORMAT(branch.branch_create_time, '%Y-%m-%d %H:%i:%s') AS branch_create_time,

      CONCAT(updater.user_firstname, ' ', updater.user_lastname) AS update_by,
      DATE_FORMAT(branch.branch_update_time, '%Y-%m-%d %H:%i:%s') AS branch_update_time

    FROM branch
    LEFT JOIN user AS creator ON creator.user_id = branch.branch_create_by
    LEFT JOIN user AS updater ON updater.user_id = branch.branch_update_by;
  `;
  return await queryDatabase(query);
};

// Fetch branch by ID
export const FetchBranchById = async (branch_id) => {
  const query = `
    SELECT 
      branch.branch_id, 
      branch.branch_name, 
      branch.branch_status,

      CONCAT(creator.user_firstname, ' ', creator.user_lastname) AS create_by,
      DATE_FORMAT(branch.branch_create_time, '%Y-%m-%d %H:%i:%s') AS branch_create_time,

      CONCAT(updater.user_firstname, ' ', updater.user_lastname) AS update_by,
      DATE_FORMAT(branch.branch_update_time, '%Y-%m-%d %H:%i:%s') AS branch_update_time
      
    FROM branch
    LEFT JOIN user AS creator ON creator.user_id = branch.branch_create_by
    LEFT JOIN user AS updater ON updater.user_id = branch.branch_update_by
    WHERE branch.branch_id = ?;
  `;
  const rows = await queryDatabase(query, [branch_id]);
  return Array.isArray(rows) ? rows[0] : rows;
};

// Create a new branch
export const CreateBranch = async ({ formData }) => {
  const validatedFields = createBranchSchema.safeParse({
    branch_name: formData.get("branch_name"),
    branch_create_by: parseInt(formData.get("branch_create_by"), 10),
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

  const { branch_name, branch_create_by } = validatedFields.data;
  const { userId, ipAddress, url } = await getSessionAndHeaders();
  const existingBranch = await queryDatabase(
    `SELECT 1 FROM branch WHERE branch_name = ? LIMIT 1`,
    [branch_name]
  );

  if (existingBranch && existingBranch.length > 0) {
    return { message: "ข้อมูลนี้มีอยู่ในระบบแล้ว", status: 400 };
  }

  const promisePool = mysqlPool.promise();
  const [result] = await promisePool.query(
    `INSERT INTO branch (branch_name, branch_create_by) VALUES (?, ?)`,
    [branch_name, branch_create_by]
  );

  if (result.affectedRows === 1) {
    logToFile(userId, `Created branch: ${branch_name}`, ipAddress, url);
    return { message: "สร้างข้อมูลสำเร็จ", status: 201 };
  }
  throw new Error("ไม่สามารถสร้างข้อมูลได้");
};

// Update branch data
export const UpdateBranch = async ({ formData, branch_id }) => {
  const validatedFields = updateBranchSchema.safeParse({
    branch_name: formData.get("branch_name"),
    branch_status: formData.get("branch_status"),
    branch_update_by: parseInt(formData.get("branch_update_by"), 10),
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

  const { branch_name, branch_status, branch_update_by } = validatedFields.data;
  const { userId, ipAddress, url } = await getSessionAndHeaders();
  const existingBranch = await queryDatabase(
    `SELECT 1 FROM branch WHERE branch_id = ? LIMIT 1`,
    [branch_id]
  );

  if (!existingBranch || existingBranch.length === 0) {
    return { message: "ไม่พบข้อมูล", status: 400 };
  }

  const promisePool = mysqlPool.promise();
  const [result] = await promisePool.query(
    `UPDATE branch 
       SET branch_name = ?, branch_status = ?, branch_update_by = ?, branch_update_time = NOW() 
       WHERE branch_id = ?`,
    [branch_name, branch_status, branch_update_by, branch_id]
  );

  if (result.affectedRows === 1) {
    logToFile(userId, `PUT branch ${branch_id}`, ipAddress, url);
    return { message: "อัพเดทข้อมูลสำเร็จ", status: 200 };
  }
  throw new Error("ไม่สามารถอัพเดทข้อมูลได้");
};
