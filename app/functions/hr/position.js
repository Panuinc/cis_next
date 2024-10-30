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

// Fetch all position //
export const FetchPosition = async () => {
    const { userId, ipAddress, url } = await getSessionAndHeaders();

    const query = `
    SELECT 
      position.position_id, 
      position.position_branch_id, 
      position.position_division_id, 
      position.position_department_id, 
      position.position_name, 
      position.position_status,

      CONCAT(creator.user_firstname, ' ', creator.user_lastname) AS create_by,
      DATE_FORMAT(position.position_create_time, '%Y-%m-%d %H:%i:%s') AS position_create_time,

      CONCAT(updater.user_firstname, ' ', updater.user_lastname) AS update_by,
      DATE_FORMAT(position.position_update_time, '%Y-%m-%d %H:%i:%s') AS position_update_time,

      branch.branch_id,
      branch.branch_name,
      
      division.division_id,
      division.division_name,
      
      department.department_id,
      department.department_name

    FROM position
    LEFT JOIN branch AS branch ON branch.branch_id = position.position_branch_id
    LEFT JOIN division AS division ON division.division_id = position.position_division_id
    LEFT JOIN department AS department ON department.department_id = position.position_department_id
    LEFT JOIN user AS creator ON creator.user_id = position.position_create_by
    LEFT JOIN user AS updater ON updater.user_id = position.position_update_by;
  `;

    logToFile(userId, "GET position data", ipAddress, url);
    return await queryDatabase(query);
};

// Fetch position by ID //
export const FetchPositionById = async (position_id) => {
    const { userId, ipAddress, url } = await getSessionAndHeaders();

    const query = `
    SELECT 
      position.position_id, 
      position.position_branch_id, 
      position.position_division_id, 
      position.position_department_id, 
      position.position_name, 
      position.position_status,

      CONCAT(creator.user_firstname, ' ', creator.user_lastname) AS create_by,
      DATE_FORMAT(position.position_create_time, '%Y-%m-%d %H:%i:%s') AS position_create_time,

      CONCAT(updater.user_firstname, ' ', updater.user_lastname) AS update_by,
      DATE_FORMAT(position.position_update_time, '%Y-%m-%d %H:%i:%s') AS position_update_time,

      branch.branch_id,
      branch.branch_name,
      
      division.division_id,
      division.division_name,
      
      department.department_id,
      department.department_name

    FROM position
    LEFT JOIN branch AS branch ON branch.branch_id = position.position_branch_id
    LEFT JOIN division AS division ON division.division_id = position.position_division_id
    LEFT JOIN department AS department ON department.department_id = position.position_department_id
    LEFT JOIN user AS creator ON creator.user_id = position.position_create_by
    LEFT JOIN user AS updater ON updater.user_id = position.position_update_by
    WHERE position.position_id = ?;
  `;

    logToFile(userId, "GET position data By Id", ipAddress, url);
    const rows = await queryDatabase(query, [position_id]);
    return Array.isArray(rows) ? rows[0] : rows;
};

// Create a new position //
export const CreatePosition = async ({ formData }) => {
    const FormSchema = z.object({
        position_branch_id: z.coerce.number().min(1, { message: "กรุณาระบุ สาขา" }),
        position_division_id: z.coerce.number().min(1, { message: "กรุณาระบุ ฝ่าย" }),
        position_department_id: z.coerce.number().min(1, { message: "กรุณาระบุ แผนก" }),
        position_name: z.coerce.string().min(1, { message: "กรุณาระบุ ตำแหน่ง" }),
        position_create_by: z.coerce.number().min(1, { message: "กรุณาระบุ ผู้ดำเนินการ" }),
    });

    const validatedFields = FormSchema.safeParse({
        position_branch_id: formData.get('position_branch_id'),
        position_division_id: formData.get('position_division_id'),
        position_department_id: formData.get('position_department_id'),
        position_name: formData.get('position_name'),
        position_create_by: formData.get('position_create_by'),
    });

    if (!validatedFields.success) {
        return {
            code: 402, errors: validatedFields.error.flatten().fieldErrors, message: '',
        };
    }

    const {
        position_branch_id,
        position_division_id,
        position_department_id,
        position_name,
        position_create_by
    } = validatedFields.data;

    const { userId, ipAddress, url } = await getSessionAndHeaders();

    const existingPosition = await queryDatabase(
        `SELECT 1 FROM position WHERE 
        position_branch_id = ? AND 
        position_division_id = ? AND
        position_department_id = ? AND
        position_name = ? 
        LIMIT 1`,
        [
            position_branch_id,
            position_division_id,
            position_department_id,
            position_name,
        ]
    );

    if (existingPosition && existingPosition.length > 0) {
        return { message: "ข้อมูลนี้มีอยู่ในระบบแล้ว", status: 400 };
    }

    const promisePool = mysqlPool.promise();
    const [result] = await promisePool.query(
        `INSERT INTO \`position\` (
        position_branch_id, 
        position_division_id,
        position_department_id,
        position_name, 
        position_create_by
        ) VALUES (
        ?, 
        ?,
        ?,
        ?,
        ?
        )`,
        [
            position_branch_id,
            position_division_id,
            position_department_id,
            position_name,
            position_create_by
        ]
    );

    if (result.affectedRows === 1) {
        logToFile(userId, `Created position: ${position_name}`, ipAddress, url);
        return { message: "สร้างข้อมูลสำเร็จ", status: 201 };
    }

    throw new Error("ไม่สามารถสร้างข้อมูลได้");
};

// Update position data //
export const UpdatePosition = async ({ formData, position_id }) => {
    const FormSchema = z.object({
        position_name: z.coerce.string().min(1, { message: "กรุณาระบุ ตำแหน่ง" }),
        position_update_by: z.coerce.number().min(1, { message: "กรุณาระบุ ผู้ดำเนินการ" }),
    });

    const validatedFields = FormSchema.safeParse({
        position_name: formData.get('position_name'),
        position_update_by: formData.get('position_update_by'),
    });

    if (!validatedFields.success) {
        return {
            code: 402, errors: validatedFields.error.flatten().fieldErrors, message: '',
        };
    }

    const {
        position_name,
        position_update_by
    } = validatedFields.data;

    const { userId, ipAddress, url } = await getSessionAndHeaders();

    const existingPosition = await queryDatabase(
        `SELECT 1 FROM position WHERE 
        position_id = ? 
        LIMIT 1`,
        [
            position_id
        ]
    );

    if (!existingPosition || existingPosition.length === 0) {
        return { message: "ไม่พบข้อมูล", status: 400 };
    }

    const promisePool = mysqlPool.promise();
    const [result] = await promisePool.query(
        `UPDATE position 
       SET 
       position_name = ?,
       position_update_by = ?, 
       position_update_time = NOW() 
       WHERE position_id = ?`,
        [
            position_name,
            position_update_by,
            position_id
        ]
    );

    if (result.affectedRows === 1) {
        logToFile(userId, `PUT position ${position_id}`, ipAddress, url);
        return { message: "อัพเดทข้อมูลสำเร็จ", status: 200 };
    }

    throw new Error("ไม่สามารถอัพเดทข้อมูลได้");
};

// Update position status //
export const UpdateStatusPosition = async ({
    position_id,
    position_status,
    position_update_by,
}) => {
    const { userId, ipAddress, url } = await getSessionAndHeaders();

    const existingPosition = await queryDatabase(
        "SELECT 1 FROM position WHERE position_id = ? LIMIT 1",
        [position_id]
    );

    if (existingPosition.status === 404) {
        return { message: "ไม่พบข้อมูล", status: 404 };
    }

    const promisePool = mysqlPool.promise();
    const [result] = await promisePool.query(
        `UPDATE position 
     SET 
     position_status = ?, 
     position_update_by = ?, 
     position_update_time = NOW() 
     WHERE position_id = ?`,
        [
            position_status,
            position_update_by,
            position_id
        ]
    );

    if (result.affectedRows === 1) {
        logToFile(userId, `PUT position status ${position_id}`, ipAddress, url);
        return { message: "อัพเดทข้อมูลสำเร็จ", status: 200 };
    }

    throw new Error("ไม่สามารถอัพเดทข้อมูลได้");
};
