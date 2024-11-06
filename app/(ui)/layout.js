// components/UiLayout.jsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { useSession, signOut } from "next-auth/react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Loading from "../components/Loading";

export default function UiLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileSidebar = () => setMobileSidebarOpen(!mobileSidebarOpen);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        await signOut({ callbackUrl: "/" });
      } else {
        const errorData = await res.json();
        console.error("ออกจากระบบไม่สำเร็จ:", errorData);
      }
    } catch (error) {
      console.error("ออกจากระบบไม่สำเร็จ:", error);
    }
  };

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      toast.error("You Are Not Logged In Yet. Please Log In.", {
        duration: 1000,
      });
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Loading />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-row items-start justify-start w-full min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        handleSignOut={handleSignOut}
      />
      <div
        className={`flex flex-col items-center justify-start w-full ${
          sidebarOpen ? "xl:w-[75%] xl:ml-[26%]" : "xl:w-[95%] xl:ml-[6%]"
        } min-h-screen gap-2 `}
      >
        <Header toggleMobileSidebar={toggleMobileSidebar} />
        <div className="flex flex-row items-start justify-center w-[100%] min-h-screen p-6 gap-2 bg-[#F3F7FB] rounded-3xl">
          {children}
        </div>
      </div>
    </div>
  );
}
