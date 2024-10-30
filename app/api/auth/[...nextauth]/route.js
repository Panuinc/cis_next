import NextAuth from "next-auth";
import { authOptions } from "@/utils/authOptions"; // นำเข้า authOptions

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
