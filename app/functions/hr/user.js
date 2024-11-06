"use server";
import { mysqlPool } from "@/utils/db";
import bcrypt from "bcrypt";
import { writeFile } from "fs/promises";
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

// Fetch all user //
export const FetchUser = async () => {
    const { userId, ipAddress, url } = await getSessionAndHeaders();

    const query = `
    SELECT 
        user.user_id, 
        user.user_number,
        user.user_password,
        user.user_firstname,
        user.user_lastname,

        user.user_nickname,
        user.user_branch_id,
        user.user_site_id, 
        user.user_division_id,
        user.user_department_id,

        user.user_position_id,
        user.user_role_id,
        user.user_parent_id,
        user.user_type,
        user.user_id_card,

        user.user_citizen,
        user.user_level,
        user.user_email,
        user.user_tel,
        user.user_status,

        user.user_picture_file,
        user.user_picture_path,

        user.user_signature_file,
        user.user_signature_path,
        
        CONCAT(creator.user_firstname, ' ', creator.user_lastname) AS create_by,
        DATE_FORMAT(user.user_create_time, '%Y-%m-%d %H:%i:%s') AS user_create_time,
        CONCAT(updater.user_firstname, ' ', updater.user_lastname) AS update_by,
        DATE_FORMAT(user.user_update_time, '%Y-%m-%d %H:%i:%s') AS user_update_time,
        
        branch.branch_id,
        branch.branch_name,

        site.site_id,
        site.site_name,

        division.division_id,
        division.division_name,

        department.department_id,
        department.department_name,

        position.position_id,
        position.position_name,

        role.role_id,
        role.role_name,

        CONCAT(parent.user_firstname, ' ', parent.user_lastname) AS parent_name,

        user_log.status

        FROM user
        LEFT JOIN branch ON branch.branch_id = user.user_branch_id
        LEFT JOIN site ON site.site_id = user.user_site_id
        LEFT JOIN division ON division.division_id = user.user_division_id
        LEFT JOIN department ON department.department_id = user.user_department_id
        LEFT JOIN user AS creator ON creator.user_id = user.user_create_by
        LEFT JOIN user AS updater ON updater.user_id = user.user_update_by
        LEFT JOIN position ON position.position_id = user.user_position_id
        LEFT JOIN role ON role.role_id = user.user_role_id
        LEFT JOIN user AS parent ON parent.user_id = user.user_parent_id
        LEFT JOIN (
            SELECT log_id, user_id, status
            FROM user_log AS ul
            WHERE ul.login_time = (
                SELECT MAX(login_time) 
                FROM user_log 
                WHERE user_id = ul.user_id
            )
        ) AS user_log ON user_log.user_id = user.user_id;   
    `;
    logToFile(userId, "GET user data", ipAddress, url);
    return await queryDatabase(query);
};

// Fetch user by ID //
export const FetchUserById = async (user_id) => {
    const { userId, ipAddress, url } = await getSessionAndHeaders();

    const query = `
    SELECT 
        user.user_id, 
        user.user_number,
        user.user_password,
        user.user_firstname,
        user.user_lastname,

        user.user_nickname,
        user.user_branch_id,
        user.user_site_id, 
        user.user_division_id,
        user.user_department_id,

        user.user_position_id,
        user.user_role_id,
        user.user_parent_id,
        user.user_type,
        user.user_id_card,

        user.user_citizen,
        user.user_level,
        user.user_email,
        user.user_tel,
        user.user_status,

        user.user_picture_file,
        user.user_picture_path,

        user.user_signature_file,
        user.user_signature_path,
        
        CONCAT(creator.user_firstname, ' ', creator.user_lastname) AS create_by,
        DATE_FORMAT(user.user_create_time, '%Y-%m-%d %H:%i:%s') AS user_create_time,
        CONCAT(updater.user_firstname, ' ', updater.user_lastname) AS update_by,
        DATE_FORMAT(user.user_update_time, '%Y-%m-%d %H:%i:%s') AS user_update_time,
        
        branch.branch_id,
        branch.branch_name,

        site.site_id,
        site.site_name,

        division.division_id,
        division.division_name,

        department.department_id,
        department.department_name,

        position.position_id,
        position.position_name,

        role.role_id,
        role.role_name,

        CONCAT(parent.user_firstname, ' ', parent.user_lastname) AS parent_name,

        user_log.status

        FROM user
        LEFT JOIN branch ON branch.branch_id = user.user_branch_id
        LEFT JOIN site ON site.site_id = user.user_site_id
        LEFT JOIN division ON division.division_id = user.user_division_id
        LEFT JOIN department ON department.department_id = user.user_department_id
        LEFT JOIN user AS creator ON creator.user_id = user.user_create_by
        LEFT JOIN user AS updater ON updater.user_id = user.user_update_by
        LEFT JOIN position ON position.position_id = user.user_position_id
        LEFT JOIN role ON role.role_id = user.user_role_id
        LEFT JOIN user AS parent ON parent.user_id = user.user_parent_id
        LEFT JOIN (
            SELECT log_id, user_id, status
            FROM user_log AS ul
            WHERE ul.login_time = (
                SELECT MAX(login_time) 
                FROM user_log 
                WHERE user_id = ul.user_id
            )
        ) AS user_log ON user_log.user_id = user.user_id  
    WHERE user.user_id = ?;
  `;

    logToFile(userId, "GET user data By Id", ipAddress, url);
    const rows = await queryDatabase(query, [user_id]);
    return Array.isArray(rows) ? rows[0] : rows;
};

const base64ToBuffer = (base64String) => {
    if (!base64String) return null;
    const base64Data = base64String.split(",")[1];
    return Buffer.from(base64Data, "base64");
};

// Create a new user //
export const CreateUser = async ({ formData }) => {
    const FormSchema = z.object({
        user_number: z.coerce.string().min(1, { message: "กรุณาระบุ รหัสพนักงาน" }),
        user_password: z.coerce.string().min(1, { message: "กรุณาระบุ รหัสผ่าน" }),
        user_firstname: z.coerce.string().min(1, { message: "กรุณาระบุ ชื่อ" }),
        user_lastname: z.coerce.string().min(1, { message: "กรุณาระบุ นามสกุล" }),

        user_nickname: z.coerce.string().min(1, { message: "กรุณาระบุ ชื่อเล่น" }),
        user_branch_id: z.coerce.number().min(1, { message: "กรุณาระบุ สาขา" }),
        user_site_id: z.coerce.number().min(1, { message: "กรุณาระบุ ไซต์" }),
        user_division_id: z.coerce.number().min(1, { message: "กรุณาระบุ ฝ่าย" }),
        user_department_id: z.coerce.number().min(1, { message: "กรุณาระบุ แผนก" }),

        user_position_id: z.coerce.number().min(1, { message: "กรุณาระบุ ตำแหน่ง" }),
        user_role_id: z.coerce.number().min(1, { message: "กรุณาระบุ บทบาทหน้าที่" }),
        user_parent_id: z.coerce.number().min(1, { message: "กรุณาระบุ ผู้บังคับบัญชา" }),
        user_type: z.coerce.string().min(1, { message: "กรุณาระบุ ชนิดของพนักงาน" }),
        user_id_card: z.coerce.number().min(1, { message: "กรุณาระบุ เลขบัตรประชาชน" }),

        user_citizen: z.coerce.string().min(1, { message: "กรุณาระบุ สัญชาติ" }),
        user_level: z.coerce.string().min(1, { message: "กรุณาระบุ ระดับการใช้งาน" }),
        user_email: z.coerce.string().min(1, { message: "กรุณาระบุ อีเมลล์" }),
        user_tel: z.coerce.number().min(1, { message: "กรุณาระบุ เบอร์โทรศัพท์" }),

        user_picture_file: z.coerce.string().min(1, { message: "กรุณาระบุ รูปภาพ" }),
        user_signature_file: z.coerce.string().min(1, { message: "กรุณาระบุ ลายเซ็น" }),

        user_create_by: z.coerce.number().min(1, { message: "กรุณาระบุ ผู้ดำเนินการ" }),
    });

    const validatedFields = FormSchema.safeParse({
        user_number: formData.get('user_number'),
        user_password: formData.get('user_password'),
        user_firstname: formData.get('user_firstname'),
        user_lastname: formData.get('user_lastname'),

        user_nickname: formData.get('user_nickname'),
        user_branch_id: formData.get('user_branch_id'),
        user_site_id: formData.get('user_site_id'),
        user_division_id: formData.get('user_division_id'),
        user_department_id: formData.get('user_department_id'),

        user_position_id: formData.get('user_position_id'),
        user_role_id: formData.get('user_role_id'),
        user_parent_id: formData.get('user_parent_id'),
        user_type: formData.get('user_type'),
        user_id_card: formData.get('user_id_card'),

        user_citizen: formData.get('user_citizen'),
        user_level: formData.get('user_level'),
        user_email: formData.get('user_email'),
        user_tel: formData.get('user_tel'),

        user_picture_file: formData.get('user_picture_file'),
        user_signature_file: formData.get('user_signature_file'),

        user_create_by: formData.get('user_create_by'),
    });

    if (!validatedFields.success) {
        return {
            code: 402, errors: validatedFields.error.flatten().fieldErrors, message: '',
        };
    }

    const {
        user_number,
        user_password,
        user_firstname,
        user_lastname,

        user_nickname,
        user_branch_id,
        user_site_id,
        user_division_id,
        user_department_id,

        user_position_id,
        user_role_id,
        user_parent_id,
        user_type,
        user_id_card,

        user_citizen,
        user_level,
        user_email,
        user_tel,

        user_picture_file,
        user_signature_file,

        user_create_by
    } = validatedFields.data;

    const { userId, ipAddress, url } = await getSessionAndHeaders();

    const existingUser = await queryDatabase(
        `SELECT 1 FROM user WHERE 
        user_number = ? 
        LIMIT 1`,
        [
            user_number
        ]
    );

    if (existingUser && existingUser.length > 0) {
        return { message: "ข้อมูลนี้มีอยู่ในระบบแล้ว", status: 400 };
    }

    const promisePool = mysqlPool.promise();
    const Hashed_Password = await bcrypt.hash(user_password, 10);

    let PictureName = "";
    let PathPicture = "";
    if (user_picture_file) {
        PictureName = `${user_number}.png`;
        PathPicture = path.join("public/images/user_picture", PictureName).replace(/\\/g, "/");
        const pictureBuffer = base64ToBuffer(user_picture_file);
        if (pictureBuffer) {
            await writeFile(path.join(process.cwd(), PathPicture), pictureBuffer);
        }
    }

    let SignatureName = "";
    let PathSignature = "";
    if (user_signature_file) {
        SignatureName = `${user_number}.png`;
        PathSignature = path.join("public/images/signature", SignatureName).replace(/\\/g, "/");
        const signatureBuffer = base64ToBuffer(user_signature_file);
        if (signatureBuffer) {
            await writeFile(path.join(process.cwd(), PathSignature), signatureBuffer);
        }
    }

    const [result] = await promisePool.query(
        `INSERT INTO user (
        user_number, 
        user_password, 
        user_firstname,
        user_lastname,

        user_nickname,
        user_branch_id,
        user_site_id,
        user_division_id,
        user_department_id,

        user_position_id,
        user_role_id,
        user_parent_id,
        user_type,
        user_id_card,

        user_citizen,
        user_level,
        user_email,
        user_tel,

        user_picture_file,
        user_picture_path,
        user_signature_file,
        user_signature_path,

        user_create_by
        ) VALUES (
        ?, 
        ?,
        ?,
        ?,

        ?,
        ?,
        ?,
        ?,
        ?,

        ?,
        ?,
        ?,
        ?,
        ?,

        ?,
        ?,
        ?,
        ?,

        ?,
        ?,
        ?,
        ?,

        ?
        )`,
        [
            user_number,
            Hashed_Password,
            user_firstname,
            user_lastname,

            user_nickname,
            user_branch_id,
            user_site_id,
            user_division_id,
            user_department_id,

            user_position_id,
            user_role_id,
            user_parent_id,
            user_type,
            user_id_card,

            user_citizen,
            user_level,
            user_email,
            user_tel,

            PictureName,
            PathPicture,
            SignatureName,
            PathSignature,

            user_create_by
        ]
    );

    if (result.affectedRows === 1) {
        logToFile(userId, `Created user: ${user_number}`, ipAddress, url);
        return { message: "สร้างข้อมูลสำเร็จ", status: 201 };
    }

    throw new Error("ไม่สามารถสร้างข้อมูลได้");
};

// Update user data //
export const UpdateUser = async ({ formData, user_id }) => {
    const FormSchema = z.object({
        user_number: z.coerce.string().min(1, { message: "กรุณาระบุ รหัสพนักงาน" }),
        user_password: z.coerce.string().min(1, { message: "กรุณาระบุ รหัสผ่าน" }),
        user_firstname: z.coerce.string().min(1, { message: "กรุณาระบุ ชื่อ" }),
        user_lastname: z.coerce.string().min(1, { message: "กรุณาระบุ นามสกุล" }),

        user_nickname: z.coerce.string().min(1, { message: "กรุณาระบุ ชื่อเล่น" }),
        user_branch_id: z.coerce.number().min(1, { message: "กรุณาระบุ สาขา" }),
        user_site_id: z.coerce.number().min(1, { message: "กรุณาระบุ ไซต์" }),
        user_division_id: z.coerce.number().min(1, { message: "กรุณาระบุ ฝ่าย" }),
        user_department_id: z.coerce.number().min(1, { message: "กรุณาระบุ แผนก" }),

        user_position_id: z.coerce.number().min(1, { message: "กรุณาระบุ ตำแหน่ง" }),
        user_role_id: z.coerce.number().min(1, { message: "กรุณาระบุ บทบาทหน้าที่" }),
        user_parent_id: z.coerce.number().min(1, { message: "กรุณาระบุ ผู้บังคับบัญชา" }),
        user_type: z.coerce.string().min(1, { message: "กรุณาระบุ ชนิดของพนักงาน" }),
        user_id_card: z.coerce.number().min(1, { message: "กรุณาระบุ เลขบัตรประชาชน" }),

        user_citizen: z.coerce.string().min(1, { message: "กรุณาระบุ สัญชาติ" }),
        user_level: z.coerce.string().min(1, { message: "กรุณาระบุ ระดับการใช้งาน" }),
        user_email: z.coerce.string().min(1, { message: "กรุณาระบุ อีเมลล์" }),
        user_tel: z.coerce.number().min(1, { message: "กรุณาระบุ เบอร์โทรศัพท์" }),

        user_update_by: z.coerce.number().min(1, { message: "กรุณาระบุ ผู้ดำเนินการ" }),
    });

    const validatedFields = FormSchema.safeParse({
        user_number: formData.get('user_number'),
        user_password: formData.get('user_password'),
        user_firstname: formData.get('user_firstname'),
        user_lastname: formData.get('user_lastname'),

        user_nickname: formData.get('user_nickname'),
        user_branch_id: formData.get('user_branch_id'),
        user_site_id: formData.get('user_site_id'),
        user_division_id: formData.get('user_division_id'),
        user_department_id: formData.get('user_department_id'),

        user_position_id: formData.get('user_position_id'),
        user_role_id: formData.get('user_role_id'),
        user_parent_id: formData.get('user_parent_id'),
        user_type: formData.get('user_type'),
        user_id_card: formData.get('user_id_card'),

        user_citizen: formData.get('user_citizen'),
        user_level: formData.get('user_level'),
        user_email: formData.get('user_email'),
        user_tel: formData.get('user_tel'),

        user_update_by: formData.get('user_update_by'),
    });

    if (!validatedFields.success) {
        return {
            code: 402, errors: validatedFields.error.flatten().fieldErrors, message: '',
        };
    }

    const {
        user_number,
        user_password,
        user_firstname,
        user_lastname,

        user_nickname,
        user_branch_id,
        user_site_id,
        user_division_id,
        user_department_id,

        user_position_id,
        user_role_id,
        user_parent_id,
        user_type,
        user_id_card,

        user_citizen,
        user_level,
        user_email,
        user_tel,

        user_update_by
    } = validatedFields.data;

    const { userId, ipAddress, url } = await getSessionAndHeaders();

    const existingUser = await queryDatabase(
        `SELECT 1 FROM user WHERE 
        user_id = ? 
        LIMIT 1`,
        [
            user_id
        ]
    );

    if (!existingUser || existingUser.length === 0) {
        return { message: "ไม่พบข้อมูล", status: 400 };
    }

    const promisePool = mysqlPool.promise();
    const hashedPassword = await bcrypt.hash(user_password, 10);
    const [result] = await promisePool.query(
        `UPDATE user 
       SET 
            user_number = ?,
            user_password = ?,
            user_firstname = ?,
            user_lastname = ?,

            user_nickname = ?,
            user_branch_id = ?,
            user_site_id = ?,
            user_division_id = ?,
            user_department_id = ?,

            user_position_id = ?,
            user_role_id = ?,
            user_parent_id = ?,
            user_type = ?,
            user_id_card = ?,

            user_citizen = ?,
            user_level = ?,
            user_email = ?,
            user_tel = ?,

       user_update_by = ?, 
       user_update_time = NOW() 
       WHERE user_id = ?`,
        [
            user_number,
            hashedPassword,
            user_firstname,
            user_lastname,

            user_nickname,
            user_branch_id,
            user_site_id,
            user_division_id,
            user_department_id,

            user_position_id,
            user_role_id,
            user_parent_id,
            user_type,
            user_id_card,

            user_citizen,
            user_level,
            user_email,
            user_tel,

            user_update_by,
            user_id
        ]
    );

    if (result.affectedRows === 1) {
        logToFile(userId, `PUT user ${user_id}`, ipAddress, url);
        return { message: "อัพเดทข้อมูลสำเร็จ", status: 200 };
    }

    throw new Error("ไม่สามารถอัพเดทข้อมูลได้");
};

// Update user status //
export const UpdateStatusUser = async ({
    user_id,
    user_status,
    user_update_by,
}) => {
    const { userId, ipAddress, url } = await getSessionAndHeaders();

    const existingUser = await queryDatabase(
        "SELECT 1 FROM user WHERE user_id = ? LIMIT 1",
        [user_id]
    );

    if (existingUser.status === 404) {
        return { message: "ไม่พบข้อมูล", status: 404 };
    }

    const promisePool = mysqlPool.promise();
    const [result] = await promisePool.query(
        `UPDATE user 
     SET 
     user_status = ?, 
     user_update_by = ?, 
     user_update_time = NOW() 
     WHERE user_id = ?`,
        [
            user_status,
            user_update_by,
            user_id
        ]
    );

    if (result.affectedRows === 1) {
        logToFile(userId, `PUT user status ${user_id}`, ipAddress, url);
        return { message: "อัพเดทข้อมูลสำเร็จ", status: 200 };
    }

    throw new Error("ไม่สามารถอัพเดทข้อมูลได้");
};