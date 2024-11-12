"use server";
import { mysqlPool } from "@/utils/db";
import {
  logToFile,
  getSessionAndHeaders,
  queryDatabase,
} from "@/utils/helpers";
import {
  createUserSchema,
  updateUserSchema,
} from "@/app/functions/hr/user/userSchemas";
import bcrypt from "bcrypt";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

// Fetch all user
export const FetchUser = async () => {
  const query = `
    SELECT 
      user.user_id, 
      user.user_number, 
      user.user_card_number, 
      user.user_password, 
      user.user_title, 

      user.user_firstname, 
      user.user_lastname, 
      user.user_nickname, 
      user.user_tel, 
      user.user_email, 

      user.user_level, 
      DATE_FORMAT(user.user_birthday, '%Y-%m-%d') AS user_birthday,
      user.user_gender, 
      user.user_id_card, 
      user.user_citizen, 

      user.user_type, 
      user.user_branch_id, 
      user.user_site_id, 
      user.user_division_id, 
      user.user_department_id, 

      user.user_position_id, 
      user.user_role_id, 
      user.user_parent_id, 
      DATE_FORMAT(user.user_start_work, '%Y-%m-%d') AS user_start_work,
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
  return await queryDatabase(query);
};

// Fetch user by ID
export const FetchUserById = async (user_id) => {
  const query = `
    SELECT 
      user.user_id, 
      user.user_number, 
      user.user_card_number, 
      user.user_password, 
      user.user_title, 

      user.user_firstname, 
      user.user_lastname, 
      user.user_nickname, 
      user.user_tel, 
      user.user_email, 

      user.user_level, 
      DATE_FORMAT(user.user_birthday, '%Y-%m-%d') AS user_birthday,
      user.user_gender, 
      user.user_id_card, 
      user.user_citizen, 

      user.user_type, 
      user.user_branch_id, 
      user.user_site_id, 
      user.user_division_id, 
      user.user_department_id, 

      user.user_position_id, 
      user.user_role_id, 
      user.user_parent_id, 
      DATE_FORMAT(user.user_start_work, '%Y-%m-%d') AS user_start_work,
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
  const rows = await queryDatabase(query, [user_id]);
  return Array.isArray(rows) ? rows[0] : rows;
};

const base64ToBuffer = (base64String) => {
  if (!base64String) return null;
  const base64Data = base64String.split(",")[1] || base64String;
  return Buffer.from(base64Data, "base64");
};

// Create a new user
export const CreateUser = async ({ formData }) => {
  const validatedFields = createUserSchema.safeParse({
    user_number: formData.get("user_number"),
    user_card_number: formData.get("user_card_number"),
    user_password: formData.get("user_password"),
    user_title: formData.get("user_title"),

    user_firstname: formData.get("user_firstname"),
    user_lastname: formData.get("user_lastname"),
    user_nickname: formData.get("user_nickname"),
    user_tel: formData.get("user_tel"),
    user_email: formData.get("user_email"),

    user_level: formData.get("user_level"),
    user_birthday: formData.get("user_birthday"),
    user_gender: formData.get("user_gender"),
    user_id_card: formData.get("user_id_card"),
    user_citizen: formData.get("user_citizen"),

    user_type: formData.get("user_type"),
    user_branch_id: formData.get("user_branch_id"),
    user_site_id: formData.get("user_site_id"),
    user_division_id: formData.get("user_division_id"),
    user_department_id: formData.get("user_department_id"),

    user_position_id: formData.get("user_position_id"),
    user_role_id: formData.get("user_role_id"),
    user_parent_id: formData.get("user_parent_id"),
    user_start_work: formData.get("user_start_work"),

    user_picture_file: formData.get("user_picture_file"),
    user_signature_file: formData.get("user_signature_file"),

    user_create_by: parseInt(formData.get("user_create_by"), 10),
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

  const {
    user_number,
    user_card_number,
    user_password,
    user_title,

    user_firstname,
    user_lastname,
    user_nickname,
    user_tel,
    user_email,

    user_level,
    user_birthday,
    user_gender,
    user_id_card,
    user_citizen,

    user_type,
    user_branch_id,
    user_site_id,
    user_division_id,
    user_department_id,

    user_position_id,
    user_role_id,
    user_parent_id,
    user_start_work,

    user_picture_file,
    user_signature_file,

    user_create_by,
  } = validatedFields.data;
  const { userId, ipAddress, url } = await getSessionAndHeaders();
  const existingUser = await queryDatabase(
    `SELECT 1 FROM user WHERE user_number = ? LIMIT 1`,
    [user_number]
  );

  if (existingUser && existingUser.length > 0) {
    return { message: "ข้อมูลนี้มีอยู่ในระบบแล้ว", status: 400 };
  }

  const promisePool = mysqlPool.promise();
  const Hashed_Password = await bcrypt.hash(user_password, 10);

  // Save picture file if exists
  let PictureName = "";
  let PathPicture = "";
  if (user_picture_file) {
    PictureName = `${user_number}.png`;
    PathPicture = path
      .join("public/images/user_picture", PictureName)
      .replace(/\\/g, "/");
    try {
      const pictureBuffer = base64ToBuffer(user_picture_file);
      if (pictureBuffer) {
        await writeFile(path.join(process.cwd(), PathPicture), pictureBuffer);
      }
    } catch (error) {
      console.error("Error writing picture file:", error);
      return { message: "เกิดข้อผิดพลาดในการบันทึกรูปภาพ", status: 500 };
    }
  }

  // Save signature file if exists
  let SignatureName = "";
  let PathSignature = "";
  if (user_signature_file) {
    SignatureName = `${user_number}.png`;
    PathSignature = path
      .join("public/images/signature", SignatureName)
      .replace(/\\/g, "/");
    try {
      const signatureBuffer = base64ToBuffer(user_signature_file);
      if (signatureBuffer) {
        await writeFile(
          path.join(process.cwd(), PathSignature),
          signatureBuffer
        );
      }
    } catch (error) {
      console.error("Error writing signature file:", error);
      return { message: "เกิดข้อผิดพลาดในการบันทึกลายเซ็น", status: 500 };
    }
  }

  const [result] = await promisePool.query(
    `INSERT INTO user (
    user_number, 
    user_card_number, 
    user_password, 
    user_title, 

    user_firstname, 
    user_lastname, 
    user_nickname, 
    user_tel, 
    user_email, 

    user_level, 
    user_birthday, 
    user_gender, 
    user_id_card, 
    user_citizen, 

    user_type, 
    user_branch_id, 
    user_site_id, 
    user_division_id, 
    user_department_id, 

    user_position_id, 
    user_role_id, 
    user_parent_id, 
    user_start_work, 

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
    ?, 

    ?, 
    ?, 
    ?, 
    ?, 

    ?)`,
    [
      user_number,
      user_card_number,
      Hashed_Password,
      user_title,

      user_firstname,
      user_lastname,
      user_nickname,
      user_tel,
      user_email,

      user_level,
      user_birthday,
      user_gender,
      user_id_card,
      user_citizen,

      user_type,
      user_branch_id,
      user_site_id,
      user_division_id,
      user_department_id,

      user_position_id,
      user_role_id,
      user_parent_id,
      user_start_work,

      PictureName,
      PathPicture,
      SignatureName,
      PathSignature,

      user_create_by,
    ]
  );

  if (result.affectedRows === 1) {
    logToFile(userId, `Created user: ${user_number}`, ipAddress, url);
    return { message: "สร้างข้อมูลสำเร็จ", status: 201 };
  }
  throw new Error("ไม่สามารถสร้างข้อมูลได้");
};

// Update user data
// export const UpdateUser = async ({ formData, user_id }) => {
//   const validatedFields = updateUserSchema.safeParse({
//     user_number: formData.get("user_number"),
//     user_status: formData.get("user_status"),
//     user_update_by: parseInt(formData.get("user_update_by"), 10),
//   });

//   if (!validatedFields.success) {
//     return {
//       code: 402,
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "ข้อมูลที่ได้รับไม่ถูกต้อง",
//     };
//   }

//   const { user_number, user_status, user_update_by } = validatedFields.data;
//   const { userId, ipAddress, url } = await getSessionAndHeaders();
//   const existingUser = await queryDatabase(
//     `SELECT 1 FROM user WHERE user_id = ? LIMIT 1`,
//     [user_id]
//   );

//   if (!existingUser || existingUser.length === 0) {
//     return { message: "ไม่พบข้อมูล", status: 400 };
//   }

//   const promisePool = mysqlPool.promise();
//   const [result] = await promisePool.query(
//     `UPDATE user
//        SET user_number = ?, user_status = ?, user_update_by = ?, user_update_time = NOW()
//        WHERE user_id = ?`,
//     [user_number, user_status, user_update_by, user_id]
//   );

//   if (result.affectedRows === 1) {
//     logToFile(userId, `PUT user ${user_id}`, ipAddress, url);
//     return { message: "อัพเดทข้อมูลสำเร็จ", status: 200 };
//   }
//   throw new Error("ไม่สามารถอัพเดทข้อมูลได้");
// };
