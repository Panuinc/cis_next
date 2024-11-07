"use server";
import { mysqlPool } from "@/utils/db";
import {
  logToFile,
  getSessionAndHeaders,
  queryDatabase,
} from "@/utils/helpers";
import {
  createDepartmentSchema,
  updateDepartmentSchema,
} from "@/app/functions/hr/department/departmentSchemas";

// Fetch all department
export const FetchDepartment = async () => {
  const query = `
    SELECT 
      department.department_id, 
      department.department_branch_id, 
      department.department_division_id, 
      department.department_name, 
      department.department_status,

      CONCAT(creator.user_firstname, ' ', creator.user_lastname) AS create_by,
      DATE_FORMAT(department.department_create_time, '%Y-%m-%d %H:%i:%s') AS department_create_time,

      CONCAT(updater.user_firstname, ' ', updater.user_lastname) AS update_by,
      DATE_FORMAT(department.department_update_time, '%Y-%m-%d %H:%i:%s') AS department_update_time,

      branch.branch_id,
      branch.branch_name,

      division.division_id,
      division.division_name

    FROM department
    LEFT JOIN branch AS branch ON branch.branch_id = department.department_branch_id
    LEFT JOIN division AS division ON division.division_id = department.department_division_id
    LEFT JOIN user AS creator ON creator.user_id = department.department_create_by
    LEFT JOIN user AS updater ON updater.user_id = department.department_update_by;
  `;
  return await queryDatabase(query);
};

// Fetch department by ID
export const FetchDepartmentById = async (department_id) => {
  const query = `
    SELECT 
      department.department_id, 
      department.department_branch_id, 
      department.department_division_id, 
      department.department_name, 
      department.department_status,

      CONCAT(creator.user_firstname, ' ', creator.user_lastname) AS create_by,
      DATE_FORMAT(department.department_create_time, '%Y-%m-%d %H:%i:%s') AS department_create_time,

      CONCAT(updater.user_firstname, ' ', updater.user_lastname) AS update_by,
      DATE_FORMAT(department.department_update_time, '%Y-%m-%d %H:%i:%s') AS department_update_time,

      branch.branch_id,
      branch.branch_name,

      division.division_id,
      division.division_name

    FROM department
    LEFT JOIN branch AS branch ON branch.branch_id = department.department_branch_id
    LEFT JOIN division AS division ON division.division_id = department.department_division_id
    LEFT JOIN user AS creator ON creator.user_id = department.department_create_by
    LEFT JOIN user AS updater ON updater.user_id = department.department_update_by
    WHERE department.department_id = ?;
  `;
  const rows = await queryDatabase(query, [department_id]);
  return Array.isArray(rows) ? rows[0] : rows;
};

// Create a new department
export const CreateDepartment = async ({ formData }) => {
  const validatedFields = createDepartmentSchema.safeParse({
    department_branch_id: formData.get("department_branch_id"),
    department_division_id: formData.get("department_division_id"),
    department_name: formData.get("department_name"),
    department_create_by: parseInt(formData.get("department_create_by"), 10),
  });

  if (!validatedFields.success) {
    return {
      code: 402,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "ข้อมูลที่ได้รับไม่ถูกต้อง",
    };
  }

  const {
    department_branch_id,
    department_division_id,
    department_name,
    department_create_by,
  } = validatedFields.data;
  const { userId, ipAddress, url } = await getSessionAndHeaders();
  const existingDepartment = await queryDatabase(
    `SELECT 1 FROM department WHERE department_branch_id = ? AND department_division_id = ? AND department_name = ? LIMIT 1`,
    [department_branch_id, department_division_id, department_name]
  );

  if (existingDepartment && existingDepartment.length > 0) {
    return { message: "ข้อมูลนี้มีอยู่ในระบบแล้ว", status: 400 };
  }

  const promisePool = mysqlPool.promise();
  const [result] = await promisePool.query(
    `INSERT INTO department (department_branch_id, department_division_id, department_name, department_create_by) VALUES (?, ?, ?, ?)`,
    [
      department_branch_id,
      department_division_id,
      department_name,
      department_create_by,
    ]
  );

  if (result.affectedRows === 1) {
    logToFile(userId, `Created department: ${department_name}`, ipAddress, url);
    return { message: "สร้างข้อมูลสำเร็จ", status: 201 };
  }
  throw new Error("ไม่สามารถสร้างข้อมูลได้");
};

// Update department data
export const UpdateDepartment = async ({ formData, department_id }) => {
  const validatedFields = updateDepartmentSchema.safeParse({
    department_name: formData.get("department_name"),
    department_status: formData.get("department_status"),
    department_update_by: parseInt(formData.get("department_update_by"), 10),
  });

  if (!validatedFields.success) {
    return {
      code: 402,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "ข้อมูลที่ได้รับไม่ถูกต้อง",
    };
  }

  const { department_name, department_status, department_update_by } =
    validatedFields.data;
  const { userId, ipAddress, url } = await getSessionAndHeaders();
  const existingDepartment = await queryDatabase(
    `SELECT 1 FROM department WHERE department_id = ? LIMIT 1`,
    [department_id]
  );

  if (!existingDepartment || existingDepartment.length === 0) {
    return { message: "ไม่พบข้อมูล", status: 400 };
  }

  const promisePool = mysqlPool.promise();
  const [result] = await promisePool.query(
    `UPDATE department 
       SET department_name = ?, department_status = ?, department_update_by = ?, department_update_time = NOW() 
       WHERE department_id = ?`,
    [department_name, department_status, department_update_by, department_id]
  );

  if (result.affectedRows === 1) {
    logToFile(userId, `PUT department ${department_id}`, ipAddress, url);
    return { message: "อัพเดทข้อมูลสำเร็จ", status: 200 };
  }
  throw new Error("ไม่สามารถอัพเดทข้อมูลได้");
};
