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

// Fetch all division //
export const FetchDivision = async () => {
    const { userId, ipAddress, url } = await getSessionAndHeaders();

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

    logToFile(userId, "GET division data", ipAddress, url);
    return await queryDatabase(query);
};

// Fetch division by ID //
export const FetchDivisionById = async (division_id) => {
    const { userId, ipAddress, url } = await getSessionAndHeaders();

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

    logToFile(userId, "GET division data By Id", ipAddress, url);
    const rows = await queryDatabase(query, [division_id]);
    return Array.isArray(rows) ? rows[0] : rows;
};

// Create a new division //
export const CreateDivision = async ({ formData }) => {
    const FormSchema = z.object({
        division_branch_id: z.coerce.number().min(1, { message: "กรุณาระบุ สาขา" }),
        division_name: z.coerce.string().min(1, { message: "กรุณาระบุ ฝ่าย" }),
        division_acronym: z.coerce.string().min(1, { message: "กรุณาระบุ ฝ่ายตัวย่อ" }),
        division_create_by: z.coerce.number().min(1, { message: "กรุณาระบุ ผู้ดำเนินการ" }),
    });

    const validatedFields = FormSchema.safeParse({
        division_branch_id: formData.get('division_branch_id'),
        division_name: formData.get('division_name'),
        division_acronym: formData.get('division_acronym'),
        division_create_by: formData.get('division_create_by'),
    });

    if (!validatedFields.success) {
        return {
            code: 402, errors: validatedFields.error.flatten().fieldErrors, message: '',
        };
    }

    const {
        division_branch_id,
        division_name,
        division_acronym,
        division_create_by
    } = validatedFields.data;

    const { userId, ipAddress, url } = await getSessionAndHeaders();

    const existingDivision = await queryDatabase(
        `SELECT 1 FROM division WHERE 
        division_branch_id = ? AND 
        division_name = ? AND 
        division_acronym = ? 
        LIMIT 1`,
        [
            division_branch_id,
            division_name,
            division_acronym
        ]
    );

    if (existingDivision && existingDivision.length > 0) {
        return { message: "ข้อมูลนี้มีอยู่ในระบบแล้ว", status: 400 };
    }

    const promisePool = mysqlPool.promise();
    const [result] = await promisePool.query(
        `INSERT INTO division (
        division_branch_id, 
        division_name, 
        division_acronym, 
        division_create_by
        ) VALUES (
        ?, 
        ?,
        ?,
        ?
        )`,
        [
            division_branch_id,
            division_name,
            division_acronym,
            division_create_by
        ]
    );

    if (result.affectedRows === 1) {
        logToFile(userId, `Created division: ${division_name}`, ipAddress, url);
        return { message: "สร้างข้อมูลสำเร็จ", status: 201 };
    }

    throw new Error("ไม่สามารถสร้างข้อมูลได้");
};

// Update division data //
export const UpdateDivision = async ({ formData, division_id }) => {
    const FormSchema = z.object({
        division_name: z.coerce.string().min(1, { message: "กรุณาระบุ ฝ่าย" }),
        division_acronym: z.coerce.string().min(1, { message: "กรุณาระบุ ฝ่ายตัวย่อ" }),
        division_update_by: z.coerce.number().min(1, { message: "กรุณาระบุ ผู้ดำเนินการ" }),
    });

    const validatedFields = FormSchema.safeParse({
        division_name: formData.get('division_name'),
        division_acronym: formData.get('division_acronym'),
        division_update_by: formData.get('division_update_by'),
    });

    if (!validatedFields.success) {
        return {
            code: 402, errors: validatedFields.error.flatten().fieldErrors, message: '',
        };
    }

    const {
        division_name,
        division_acronym,
        division_update_by
    } = validatedFields.data;

    const { userId, ipAddress, url } = await getSessionAndHeaders();

    const existingDivision = await queryDatabase(
        `SELECT 1 FROM division WHERE 
        division_id = ? 
        LIMIT 1`,
        [
            division_id
        ]
    );

    if (!existingDivision || existingDivision.length === 0) {
        return { message: "ไม่พบข้อมูล", status: 400 };
    }

    const promisePool = mysqlPool.promise();
    const [result] = await promisePool.query(
        `UPDATE division 
       SET 
       division_name = ?,
       division_acronym = ?,
       division_update_by = ?, 
       division_update_time = NOW() 
       WHERE division_id = ?`,
        [
            division_name,
            division_acronym,
            division_update_by,
            division_id
        ]
    );

    if (result.affectedRows === 1) {
        logToFile(userId, `PUT division ${division_id}`, ipAddress, url);
        return { message: "อัพเดทข้อมูลสำเร็จ", status: 200 };
    }

    throw new Error("ไม่สามารถอัพเดทข้อมูลได้");
};

// Update division status //
export const UpdateStatusDivision = async ({
    division_id,
    division_status,
    division_update_by,
}) => {
    const { userId, ipAddress, url } = await getSessionAndHeaders();

    const existingDivision = await queryDatabase(
        "SELECT 1 FROM division WHERE division_id = ? LIMIT 1",
        [division_id]
    );

    if (existingDivision.status === 404) {
        return { message: "ไม่พบข้อมูล", status: 404 };
    }

    const promisePool = mysqlPool.promise();
    const [result] = await promisePool.query(
        `UPDATE division 
     SET 
     division_status = ?, 
     division_update_by = ?, 
     division_update_time = NOW() 
     WHERE division_id = ?`,
        [
            division_status,
            division_update_by,
            division_id
        ]
    );

    if (result.affectedRows === 1) {
        logToFile(userId, `PUT division status ${division_id}`, ipAddress, url);
        return { message: "อัพเดทข้อมูลสำเร็จ", status: 200 };
    }

    throw new Error("ไม่สามารถอัพเดทข้อมูลได้");
};
