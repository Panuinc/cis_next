import { mysqlPool } from "@/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const promisePool = mysqlPool.promise();

  try {
    const [result] = await promisePool.query(
      `UPDATE user_log 
       SET logout_time = NOW(), status = 'offline' 
       WHERE user_id = ? 
       AND logout_time IS NULL`,
      [session.user.user_id]
    );

    if (result.affectedRows > 0) {
      return new Response("Logout time updated successfully", { status: 200 });
    } else {
      return new Response("No rows updated", { status: 400 });
    }
  } catch (error) {
    return new Response("Error updating logout time", { status: 500 });
  }
}
