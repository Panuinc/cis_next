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

// Fetch all department //
export const FetchDepartment = async () => {
    const { userId, ipAddress, url } = await getSessionAndHeaders();

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

    logToFile(userId, "GET department data", ipAddress, url);
    return await queryDatabase(query);
};

// Fetch department by ID //
export const FetchDepartmentById = async (department_id) => {
    const { userId, ipAddress, url } = await getSessionAndHeaders();

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

    logToFile(userId, "GET department data By Id", ipAddress, url);
    const rows = await queryDatabase(query, [department_id]);
    return Array.isArray(rows) ? rows[0] : rows;
};

// Create a new department //
export const CreateDepartment = async ({ formData }) => {
    const FormSchema = z.object({
        department_branch_id: z.coerce.number().min(1, { message: "กรุณาระบุ สาขา" }),
        department_division_id: z.coerce.number().min(1, { message: "กรุณาระบุ ฝ่าย" }),
        department_name: z.coerce.string().min(1, { message: "กรุณาระบุ แผนก" }),
        department_create_by: z.coerce.number().min(1, { message: "กรุณาระบุ ผู้ดำเนินการ" }),
    });

    const validatedFields = FormSchema.safeParse({
        department_branch_id: formData.get('department_branch_id'),
        department_division_id: formData.get('department_division_id'),
        department_name: formData.get('department_name'),
        department_create_by: formData.get('department_create_by'),
    });

    if (!validatedFields.success) {
        return {
            code: 402, errors: validatedFields.error.flatten().fieldErrors, message: '',
        };
    }

    const {
        department_branch_id,
        department_division_id,
        department_name,
        department_create_by
    } = validatedFields.data;

    const { userId, ipAddress, url } = await getSessionAndHeaders();

    const existingDepartment = await queryDatabase(
        `SELECT 1 FROM department WHERE 
        department_branch_id = ? AND 
        department_division_id = ? AND
        department_name = ? 
        LIMIT 1`,
        [
            department_branch_id,
            department_division_id,
            department_name,
        ]
    );

    if (existingDepartment && existingDepartment.length > 0) {
        return { message: "ข้อมูลนี้มีอยู่ในระบบแล้ว", status: 400 };
    }

    const promisePool = mysqlPool.promise();
    const [result] = await promisePool.query(
        `INSERT INTO department (
        department_branch_id, 
        department_division_id,
        department_name, 
        department_create_by
        ) VALUES (
        ?, 
        ?,
        ?,
        ?
        )`,
        [
            department_branch_id,
            department_division_id,
            department_name,
            department_create_by
        ]
    );

    if (result.affectedRows === 1) {
        logToFile(userId, `Created department: ${department_name}`, ipAddress, url);
        return { message: "สร้างข้อมูลสำเร็จ", status: 201 };
    }

    throw new Error("ไม่สามารถสร้างข้อมูลได้");
};

// Update department data //
export const UpdateDepartment = async ({ formData, department_id }) => {
    const FormSchema = z.object({
        department_name: z.coerce.string().min(1, { message: "กรุณาระบุ แผนก" }),
        department_update_by: z.coerce.number().min(1, { message: "กรุณาระบุ ผู้ดำเนินการ" }),
    });

    const validatedFields = FormSchema.safeParse({
        department_name: formData.get('department_name'),
        department_update_by: formData.get('department_update_by'),
    });

    if (!validatedFields.success) {
        return {
            code: 402, errors: validatedFields.error.flatten().fieldErrors, message: '',
        };
    }

    const {
        department_name,
        department_update_by
    } = validatedFields.data;

    const { userId, ipAddress, url } = await getSessionAndHeaders();

    const existingDepartment = await queryDatabase(
        `SELECT 1 FROM department WHERE 
        department_id = ? 
        LIMIT 1`,
        [
            department_id
        ]
    );

    if (!existingDepartment || existingDepartment.length === 0) {
        return { message: "ไม่พบข้อมูล", status: 400 };
    }

    const promisePool = mysqlPool.promise();
    const [result] = await promisePool.query(
        `UPDATE department 
       SET 
       department_name = ?,
       department_update_by = ?, 
       department_update_time = NOW() 
       WHERE department_id = ?`,
        [
            department_name,
            department_update_by,
            department_id
        ]
    );

    if (result.affectedRows === 1) {
        logToFile(userId, `PUT department ${department_id}`, ipAddress, url);
        return { message: "อัพเดทข้อมูลสำเร็จ", status: 200 };
    }

    throw new Error("ไม่สามารถอัพเดทข้อมูลได้");
};

// Update department status //
export const UpdateStatusDepartment = async ({
    department_id,
    department_status,
    department_update_by,
}) => {
    const { userId, ipAddress, url } = await getSessionAndHeaders();

    const existingDepartment = await queryDatabase(
        "SELECT 1 FROM department WHERE department_id = ? LIMIT 1",
        [department_id]
    );

    if (existingDepartment.status === 404) {
        return { message: "ไม่พบข้อมูล", status: 404 };
    }

    const promisePool = mysqlPool.promise();
    const [result] = await promisePool.query(
        `UPDATE department 
     SET 
     department_status = ?, 
     department_update_by = ?, 
     department_update_time = NOW() 
     WHERE department_id = ?`,
        [
            department_status,
            department_update_by,
            department_id
        ]
    );

    if (result.affectedRows === 1) {
        logToFile(userId, `PUT department status ${department_id}`, ipAddress, url);
        return { message: "อัพเดทข้อมูลสำเร็จ", status: 200 };
    }

    throw new Error("ไม่สามารถอัพเดทข้อมูลได้");
};
