"use server";
import { mysqlPool } from "@/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import fs from "fs";
import path from "path";
import { headers } from "next/headers";
import { z } from "zod";

// Helper function to log actions //
const logToFile = (userId, action, ipAddress, url) => {
  const thailandTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
  });
  const logMessage = `[${thailandTime}] UserID: ${userId}, IP: ${ipAddress}, URL: ${url}, Action: ${action}\n`;
  const logDirectory = path.join(process.cwd(), "logs");
  const logFilePath = path.join(logDirectory, "api_logs.txt");

  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
  }

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) console.error("Error writing log to file:", err);
  });
};

// Helper function to get session and headers info //
const getSessionAndHeaders = async () => {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized access");

  const headersList = await headers();
  const ipAddress =
    headersList.get("x-forwarded-for") ||
    headersList.get("x-real-ip") ||
    "Unknown IP";
  const url = headersList.get("referer") || "Unknown URL";

  return { userId: session.user.user_id, ipAddress, url };
};

// Reusable function for querying the database //
const queryDatabase = async (query, params = []) => {
  const promisePool = mysqlPool.promise();
  try {
    const [rows] = await promisePool.query(query, params);
    if (rows.length === 0) return { message: "ไม่พบข้อมูล", status: 404 };
    return rows;
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล");
  }
};

// Fetch all branch //
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

// Fetch branch by ID //
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

// Create a new branch //
export const CreateBranch = async ({ formData }) => {
  const FormSchema = z.object({
    branch_name: z.coerce.string().min(1, { message: "กรุณาระบุ สาขา" }),
    branch_create_by: z.coerce
      .number()
      .min(1, { message: "กรุณาระบุ ผู้ดำเนินการ" }),
  });

  const validatedFields = FormSchema.safeParse({
    branch_name: formData.get("branch_name"),
    branch_create_by: formData.get("branch_create_by"),
  });

  if (!validatedFields.success) {
    return {
      code: 402,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "",
    };
  }

  const { branch_name, branch_create_by } = validatedFields.data;

  const { userId, ipAddress, url } = await getSessionAndHeaders();

  const existingBranch = await queryDatabase(
    `SELECT 1 FROM branch WHERE 
        branch_name = ? 
        LIMIT 1`,
    [branch_name]
  );

  if (existingBranch && existingBranch.length > 0) {
    return { message: "ข้อมูลนี้มีอยู่ในระบบแล้ว", status: 400 };
  }

  const promisePool = mysqlPool.promise();
  const [result] = await promisePool.query(
    `INSERT INTO branch (
        branch_name, 
        branch_create_by
        ) VALUES (
        ?, 
        ?
        )`,
    [branch_name, branch_create_by]
  );

  if (result.affectedRows === 1) {
    logToFile(userId, `Created branch: ${branch_name}`, ipAddress, url);
    return { message: "สร้างข้อมูลสำเร็จ", status: 201 };
  }

  throw new Error("ไม่สามารถสร้างข้อมูลได้");
};

// Update branch data //
export const UpdateBranch = async ({ formData, branch_id }) => {
  const FormSchema = z.object({
    branch_name: z.coerce.string().min(1, { message: "กรุณาระบุ สาขา" }),
    branch_update_by: z.coerce
      .number()
      .min(1, { message: "กรุณาระบุ ผู้ดำเนินการ" }),
  });

  const validatedFields = FormSchema.safeParse({
    branch_name: formData.get("branch_name"),
    branch_update_by: formData.get("branch_update_by"),
  });

  if (!validatedFields.success) {
    return {
      code: 402,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "",
    };
  }

  const { branch_name, branch_update_by } = validatedFields.data;

  const { userId, ipAddress, url } = await getSessionAndHeaders();

  const existingBranch = await queryDatabase(
    `SELECT 1 FROM branch WHERE
        branch_id = ?
        LIMIT 1`,
    [branch_id]
  );

  if (!existingBranch || existingBranch.length === 0) {
    return { message: "ไม่พบข้อมูล", status: 400 };
  }

  const promisePool = mysqlPool.promise();
  const [result] = await promisePool.query(
    `UPDATE branch 
       SET 
       branch_name = ?,
       branch_update_by = ?, 
       branch_update_time = NOW() 
       WHERE branch_id = ?`,
    [branch_name, branch_update_by, branch_id]
  );

  if (result.affectedRows === 1) {
    logToFile(userId, `PUT branch ${branch_id}`, ipAddress, url);
    return { message: "อัพเดทข้อมูลสำเร็จ", status: 200 };
  }

  throw new Error("ไม่สามารถอัพเดทข้อมูลได้");
};

// Update branch status //
export const UpdateStatusBranch = async ({
  branch_id,
  branch_status,
  branch_update_by,
}) => {
  const { userId, ipAddress, url } = await getSessionAndHeaders();

  const existingBranch = await queryDatabase(
    "SELECT 1 FROM branch WHERE branch_id = ? LIMIT 1",
    [branch_id]
  );

  if (existingBranch.status === 404) {
    return { message: "ไม่พบข้อมูล", status: 404 };
  }

  const promisePool = mysqlPool.promise();
  const [result] = await promisePool.query(
    `UPDATE branch 
     SET 
     branch_status = ?, 
     branch_update_by = ?, 
     branch_update_time = NOW() 
     WHERE branch_id = ?`,
    [branch_status, branch_update_by, branch_id]
  );

  if (result.affectedRows === 1) {
    logToFile(userId, `PUT branch status ${branch_id}`, ipAddress, url);
    return { message: "อัพเดทข้อมูลสำเร็จ", status: 200 };
  }

  throw new Error("ไม่สามารถอัพเดทข้อมูลได้");
};
