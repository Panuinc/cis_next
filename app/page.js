"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import React, { useRef, useEffect } from "react";
import { Input, Button } from "@nextui-org/react";
import { useSession, signIn } from "next-auth/react";

export default function Index() {
  const { data: session } = useSession();
  const router = useRouter();
  const useridcardRef = useRef(null);
  const userPasswordRef = useRef(null);

  useEffect(() => {
    if (session) {
      router.push("/home");
    }
  }, [session, router]);

  const handlerLogin = async (event) => {
    event.preventDefault();

    const useridcard = useridcardRef.current?.value?.trim();
    const userPassword = userPasswordRef.current?.value?.trim();
    const secretToken = process.env.NEXT_PUBLIC_SECRET_TOKEN;

    if (!useridcard) {
      toast.error("กรุณาระบุ เลขประจำบัตรประชาชน");
      return;
    }
    if (!userPassword) {
      toast.error("กรุณาระบุ รหัสผ่าน");
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        user_id_card: useridcard,
        user_password: userPassword,
        secret_token: secretToken,
      });

      if (result.error) {
        toast.error("Login Failed");
      } else {
        toast.success("Login Successful! Welcome To Cis System");
        setTimeout(() => {
          router.push("/home");
        }, 2000);
      }
    } catch (error) {
      toast.error("An Unexpected Error Occurred. Please Try Again Later");
      console.error("Login error:", error);
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen p-2">
        <Toaster position="top-right" reverseOrder={false} />
        <form className="flex flex-col items-center justify-center w-full h-full xl:w-4/12 xl:h-4/12 p-2 gap-2 border-2 bg-[#FFFFFF] shadow-md rounded-3xl">
          <div className="flex items-center justify-center w-full h-full p-2">
            <Image
              src="/images/other/company_logo.png"
              alt="company_logo"
              width={100}
              height={100}
              priority={true}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 text-[#000000] text-xl font-[600]">
            Channakorn Engineering
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 text-[#000000] text-xl font-[600]">
            Internal System
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2">
            <div className="flex items-center justify-start w-full h-full p-2 text-[#000000] text-ทก font-[300]">
              เลขบัตรประชาชน
            </div>
            <div className="flex items-center justify-center w-full h-full p-2">
              <Input
                type="text"
                placeholder="กรุณาระบุข้อมูล"
                size="lg"
                variant="bordered"
                ref={useridcardRef}
                required
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2">
            <div className="flex items-center justify-start w-full h-full p-2 text-[#000000] text-ทก font-[300]">
              รหัสผ่าน
            </div>
            <div className="flex items-center justify-center w-full h-full p-2">
              <Input
                type="password"
                placeholder="กรุณาระบุข้อมูล"
                size="lg"
                variant="bordered"
                ref={userPasswordRef}
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-center w-full h-full p-2">
            <Button
              onClick={handlerLogin}
              size="lg"
              className="w-1/2 bg-[#16cdc7] text-[#FFFFFF]"
            >
              เข้าสู่ระบบ
            </Button>
          </div>
        </form>
      </div>
    );
  } else {
    return null;
  }
}
