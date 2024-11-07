// utils/helpers.js
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { headers } from "next/headers";
import { mysqlPool } from "@/utils/db";

// Helper function to log actions
export const logToFile = (userId, action, ipAddress, url) => {
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

// Helper function to get session and headers info
export const getSessionAndHeaders = async () => {
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

// Reusable function for querying the database
export const queryDatabase = async (query, params = []) => {
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
