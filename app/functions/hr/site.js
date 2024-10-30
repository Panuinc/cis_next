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

// Fetch all site //
export const FetchSite = async () => {
    const { userId, ipAddress, url } = await getSessionAndHeaders();

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

    logToFile(userId, "GET site data", ipAddress, url);
    return await queryDatabase(query);
};

// Fetch site by ID //
export const FetchSiteById = async (site_id) => {
    const { userId, ipAddress, url } = await getSessionAndHeaders();

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

    logToFile(userId, "GET site data By Id", ipAddress, url);
    const rows = await queryDatabase(query, [site_id]);
    return Array.isArray(rows) ? rows[0] : rows;
};

// Create a new site //
export const CreateSite = async ({ formData }) => {
    const FormSchema = z.object({
        site_branch_id: z.coerce.number().min(1, { message: "กรุณาระบุ สาขา" }),
        site_name: z.coerce.string().min(1, { message: "กรุณาระบุ ไซต์" }),
        site_create_by: z.coerce.number().min(1, { message: "กรุณาระบุ ผู้ดำเนินการ" }),
    });

    const validatedFields = FormSchema.safeParse({
        site_branch_id: formData.get('site_branch_id'),
        site_name: formData.get('site_name'),
        site_create_by: formData.get('site_create_by'),
    });

    if (!validatedFields.success) {
        return {
            code: 402, errors: validatedFields.error.flatten().fieldErrors, message: '',
        };
    }

    const {
        site_branch_id,
        site_name,
        site_create_by
    } = validatedFields.data;

    const { userId, ipAddress, url } = await getSessionAndHeaders();

    const existingSite = await queryDatabase(
        `SELECT 1 FROM site WHERE 
        site_branch_id = ? AND 
        site_name = ?  
        LIMIT 1`,
        [
            site_branch_id,
            site_name,
        ]
    );

    if (existingSite && existingSite.length > 0) {
        return { message: "ข้อมูลนี้มีอยู่ในระบบแล้ว", status: 400 };
    }

    const promisePool = mysqlPool.promise();
    const [result] = await promisePool.query(
        `INSERT INTO site (
        site_branch_id, 
        site_name, 
        site_create_by
        ) VALUES (
        ?, 
        ?,
        ?
        )`,
        [
            site_branch_id,
            site_name,
            site_create_by
        ]
    );

    if (result.affectedRows === 1) {
        logToFile(userId, `Created site: ${site_name}`, ipAddress, url);
        return { message: "สร้างข้อมูลสำเร็จ", status: 201 };
    }

    throw new Error("ไม่สามารถสร้างข้อมูลได้");
};

// Update site data //
export const UpdateSite = async ({ formData, site_id }) => {
    const FormSchema = z.object({
        site_name: z.coerce.string().min(1, { message: "กรุณาระบุ ไซต์" }),
        site_update_by: z.coerce.number().min(1, { message: "กรุณาระบุ ผู้ดำเนินการ" }),
    });

    const validatedFields = FormSchema.safeParse({
        site_name: formData.get('site_name'),
        site_update_by: formData.get('site_update_by'),
    });

    if (!validatedFields.success) {
        return {
            code: 402, errors: validatedFields.error.flatten().fieldErrors, message: '',
        };
    }

    const {
        site_name,
        site_update_by
    } = validatedFields.data;

    const { userId, ipAddress, url } = await getSessionAndHeaders();

    const existingSite = await queryDatabase(
        `SELECT 1 FROM site WHERE 
        site_id = ? 
        LIMIT 1`,
        [
            site_id
        ]
    );

    if (!existingSite || existingSite.length === 0) {
        return { message: "ไม่พบข้อมูล", status: 400 };
    }

    const promisePool = mysqlPool.promise();
    const [result] = await promisePool.query(
        `UPDATE site 
       SET 
       site_name = ?,
       site_update_by = ?, 
       site_update_time = NOW() 
       WHERE site_id = ?`,
        [
            site_name,
            site_update_by,
            site_id
        ]
    );

    if (result.affectedRows === 1) {
        logToFile(userId, `PUT site ${site_id}`, ipAddress, url);
        return { message: "อัพเดทข้อมูลสำเร็จ", status: 200 };
    }

    throw new Error("ไม่สามารถอัพเดทข้อมูลได้");
};

// Update site status //
export const UpdateStatusSite = async ({
    site_id,
    site_status,
    site_update_by,
}) => {
    const { userId, ipAddress, url } = await getSessionAndHeaders();

    const existingSite = await queryDatabase(
        "SELECT 1 FROM site WHERE site_id = ? LIMIT 1",
        [site_id]
    );

    if (existingSite.status === 404) {
        return { message: "ไม่พบข้อมูล", status: 404 };
    }

    const promisePool = mysqlPool.promise();
    const [result] = await promisePool.query(
        `UPDATE site 
     SET 
     site_status = ?, 
     site_update_by = ?, 
     site_update_time = NOW() 
     WHERE site_id = ?`,
        [
            site_status,
            site_update_by,
            site_id
        ]
    );

    if (result.affectedRows === 1) {
        logToFile(userId, `PUT site status ${site_id}`, ipAddress, url);
        return { message: "อัพเดทข้อมูลสำเร็จ", status: 200 };
    }

    throw new Error("ไม่สามารถอัพเดทข้อมูลได้");
};
