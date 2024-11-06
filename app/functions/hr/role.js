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

// Fetch all role //
export const FetchRole = async () => {
    const { userId, ipAddress, url } = await getSessionAndHeaders();

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

    logToFile(userId, "GET role data", ipAddress, url);
    return await queryDatabase(query);
};

// Fetch role by ID //
export const FetchRoleById = async (role_id) => {
    const { userId, ipAddress, url } = await getSessionAndHeaders();

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

    logToFile(userId, "GET role data By Id", ipAddress, url);
    const rows = await queryDatabase(query, [role_id]);
    return Array.isArray(rows) ? rows[0] : rows;
};

// Create a new role //
export const CreateRole = async ({ formData }) => {
    const FormSchema = z.object({
        role_name: z.coerce.string().min(1, { message: "กรุณาระบุ บทบาทหน้าที่" }),
        role_create_by: z.coerce.number().min(1, { message: "กรุณาระบุ ผู้ดำเนินการ" }),
    });

    const validatedFields = FormSchema.safeParse({
        role_name: formData.get('role_name'),
        role_create_by: formData.get('role_create_by'),
    });

    if (!validatedFields.success) {
        return {
            code: 402, errors: validatedFields.error.flatten().fieldErrors, message: '',
        };
    }

    const {
        role_name,
        role_create_by
    } = validatedFields.data;

    const { userId, ipAddress, url } = await getSessionAndHeaders();

    const existingRole = await queryDatabase(
        `SELECT 1 FROM role WHERE 
        role_name = ? 
        LIMIT 1`,
        [
            role_name
        ]
    );

    if (existingRole && existingRole.length > 0) {
        return { message: "ข้อมูลนี้มีอยู่ในระบบแล้ว", status: 400 };
    }

    const promisePool = mysqlPool.promise();
    const [result] = await promisePool.query(
        `INSERT INTO role (
        role_name, 
        role_create_by
        ) VALUES (
        ?, 
        ?
        )`,
        [
            role_name,
            role_create_by
        ]
    );

    if (result.affectedRows === 1) {
        logToFile(userId, `Created role: ${role_name}`, ipAddress, url);
        return { message: "สร้างข้อมูลสำเร็จ", status: 201 };
    }

    throw new Error("ไม่สามารถสร้างข้อมูลได้");
};

// Update role data //
export const UpdateRole = async ({ formData, role_id }) => {
    const FormSchema = z.object({
        role_name: z.coerce.string().min(1, { message: "กรุณาระบุ บทบาทหน้าที่" }),
        role_update_by: z.coerce.number().min(1, { message: "กรุณาระบุ ผู้ดำเนินการ" }),
    });

    const validatedFields = FormSchema.safeParse({
        role_name: formData.get('role_name'),
        role_update_by: formData.get('role_update_by'),
    });

    if (!validatedFields.success) {
        return {
            code: 402, errors: validatedFields.error.flatten().fieldErrors, message: '',
        };
    }

    const {
        role_name,
        role_update_by
    } = validatedFields.data;

    const { userId, ipAddress, url } = await getSessionAndHeaders();

    const existingRole = await queryDatabase(
        `SELECT 1 FROM role WHERE
        role_id = ?
        LIMIT 1`,
        [
            role_id
        ]
    );

    if (!existingRole || existingRole.length === 0) {
        return { message: "ไม่พบข้อมูล", status: 400 };
    }

    const promisePool = mysqlPool.promise();
    const [result] = await promisePool.query(
        `UPDATE role 
       SET 
       role_name = ?,
       role_update_by = ?, 
       role_update_time = NOW() 
       WHERE role_id = ?`,
        [
            role_name,
            role_update_by,
            role_id
        ]
    );

    if (result.affectedRows === 1) {
        logToFile(userId, `PUT role ${role_id}`, ipAddress, url);
        return { message: "อัพเดทข้อมูลสำเร็จ", status: 200 };
    }

    throw new Error("ไม่สามารถอัพเดทข้อมูลได้");
};

// Update role status //
export const UpdateStatusRole = async ({
    role_id,
    role_status,
    role_update_by,
}) => {
    const { userId, ipAddress, url } = await getSessionAndHeaders();

    const existingRole = await queryDatabase(
        "SELECT 1 FROM role WHERE role_id = ? LIMIT 1",
        [role_id]
    );

    if (existingRole.status === 404) {
        return { message: "ไม่พบข้อมูล", status: 404 };
    }

    const promisePool = mysqlPool.promise();
    const [result] = await promisePool.query(
        `UPDATE role 
     SET 
     role_status = ?, 
     role_update_by = ?, 
     role_update_time = NOW() 
     WHERE role_id = ?`,
        [
            role_status,
            role_update_by,
            role_id
        ]
    );

    if (result.affectedRows === 1) {
        logToFile(userId, `PUT role status ${role_id}`, ipAddress, url);
        return { message: "อัพเดทข้อมูลสำเร็จ", status: 200 };
    }

    throw new Error("ไม่สามารถอัพเดทข้อมูลได้");
};
