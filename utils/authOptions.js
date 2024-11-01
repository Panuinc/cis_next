import CredentialsProvider from "next-auth/providers/credentials";
import { mysqlPool } from "@/utils/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        user_id_card: { label: "User Id Card", type: "text" },
        user_password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const secretToken = process.env.SECRET_TOKEN;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
          {
            method: "POST",
            body: JSON.stringify({
              ...credentials,
              secret_token: secretToken,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        const response = await res.json();

        if (response.status === "ok") {
          const user = response.user;
console.log(user)
          const promisePool = mysqlPool.promise();
          await promisePool.query(
            `INSERT INTO user_log (user_id, login_time, status) VALUES (?, NOW(), 'online')`,
            [user.user_id]
          );
          return {
            user_id: user.user_id,
            user_number: user.user_number,
            user_password: user.user_password,
            user_firstname: user.user_firstname,
            user_lastname: user.user_lastname,
            user_nickname: user.user_nickname,
            user_branch_name: user.user_branch_name,
            user_site_name: user.user_site_name,
            user_division_name: user.user_division_name,
            user_department_name: user.user_department_name,
            user_position_name: user.user_position_name,
            user_role_name: user.user_role_name,
            user_parent_name: user.user_parent_name,
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
          };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    maxAge: 1 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user_id = user.user_id;
        token.user_number = user.user_number;
        token.user_password = user.user_password;
        token.user_firstname = user.user_firstname;
        token.user_lastname = user.user_lastname;
        token.user_nickname = user.user_nickname;
        token.user_branch_name = user.user_branch_name;
        token.user_site_name = user.user_site_name;
        token.user_division_name = user.user_division_name;
        token.user_department_name = user.user_department_name;
        token.user_position_name = user.user_position_name;
        token.user_role_name = user.user_role_name;
        token.user_parent_name = user.user_parent_name;
        token.user_type = user.user_type;
        token.user_id_card = user.user_id_card;
        token.user_citizen = user.user_citizen;
        token.user_level = user.user_level;
        token.user_email = user.user_email;
        token.user_tel = user.user_tel;
        token.user_signature_file = user.user_signature_file;
        token.user_signature_path = user.user_signature_path;
        token.user_picture_file = user.user_picture_file;
        token.user_picture_path = user.user_picture_path;
        token.user_status = user.user_status;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        user_id: token.user_id,
        user_number: token.user_number,
        user_password: token.user_password,
        user_firstname: token.user_firstname,
        user_lastname: token.user_lastname,
        user_nickname: token.user_nickname,
        user_branch_name: token.user_branch_name,
        user_site_name: token.user_site_name,
        user_division_name: token.user_division_name,
        user_department_name: token.user_department_name,
        user_position_name: token.user_position_name,
        user_role_name: token.user_role_name,
        user_parent_name: token.user_parent_name,
        user_type: token.user_type,
        user_id_card: token.user_id_card,
        user_citizen: token.user_citizen,
        user_level: token.user_level,
        user_email: token.user_email,
        user_tel: token.user_tel,
        user_signature_file: token.user_signature_file,
        user_signature_path: token.user_signature_path,
        user_picture_file: token.user_picture_file,
        user_picture_path: token.user_picture_path,
        user_status: token.user_status,
      };
      return session;
    },
  },
};
