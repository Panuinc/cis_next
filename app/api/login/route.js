import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { mysqlPool } from "@/utils/db";

export async function POST(request) {
  try {
    const { user_id_card, user_password, secret_token } = await request.json();

    if (secret_token !== process.env.SECRET_TOKEN) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 403 }
      );
    }

    if (!user_id_card) {
      return NextResponse.json(
        { message: "Please Enter User Id Card" },
        { status: 400 }
      );
    } else if (!user_password) {
      return NextResponse.json(
        { message: "Please Enter Password" },
        { status: 400 }
      );
    }

    const promisePool = mysqlPool.promise();
    const [users] = await promisePool.query(
      `SELECT * FROM user WHERE user_id_card = ?`,
      [user_id_card]
    );

    if (users.length === 0) {
      return NextResponse.json({ message: "Data Not Found" }, { status: 404 });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(
      user_password,
      user.user_password
    );

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "The Password Is Incorrect" },
        { status: 401 }
      );
    }

    const [branch] = await promisePool.query(
      `SELECT * FROM branch WHERE branch_id = ?`,
      [user.user_branch_id]
    );
    const [division] = await promisePool.query(
      `SELECT * FROM division WHERE division_id = ?`,
      [user.user_division_id]
    );
    const [department] = await promisePool.query(
      `SELECT * FROM department WHERE department_id = ?`,
      [user.user_department_id]
    );
    const [position] = await promisePool.query(
      `SELECT * FROM position WHERE position_id = ?`,
      [user.user_position_id]
    );
    const [role] = await promisePool.query(
      `SELECT * FROM role WHERE role_id = ?`,
      [user.user_role_id]
    );
    const [site] = await promisePool.query(
      `SELECT * FROM site WHERE site_id = ?`,
      [user.user_site_id]
    );

    const [parent] = await promisePool.query(
      `SELECT CONCAT(user_firstname, ' ', user_lastname) AS full_name FROM user WHERE user_id = ?`,
      [user.user_parent_id]
    );

    return NextResponse.json({
      message: "Login Successful",
      status: "ok",
      user: {
        user_id: user.user_id,
        user_number: user.user_number,
        user_password: user.user_password,
        user_firstname: user.user_firstname,
        user_lastname: user.user_lastname,

        user_nickname: user.user_nickname,
        user_branch_name: branch[0]?.branch_name,
        user_site_name: site[0]?.site_name,
        user_division_name: division[0]?.division_name,
        user_department_name: department[0]?.department_name,

        user_position_name: position[0]?.position_name,
        user_role_name: role[0]?.role_name,
        user_parent_firstname: parent[0]?.full_name,
        user_type: user.user_type,
        user_id_card: user.user_id_card,
        user_citizen: user.user_citizen,

        user_level: user.user_level,
        user_email: user.user_email,
        user_tel: user.user_tel,
        user_signature_file: user.user_signature_file,
        user_signature_path: user.user_signature_path,

        user_picture_file: user.user_picture_file,
        user_picture_path: user.user_picture_path,
        user_status: user.user_status,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "There Was A Problem Logging In" },
      { status: 500 }
    );
  }
}
