"use client";
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  AutoGraphOutlined,
  CampaignOutlined,
  DocumentScannerOutlined,
  SlowMotionVideoOutlined,
  CottageOutlined,
  SettingsSuggestOutlined,
  FilterDramaOutlined,
  CalendarMonthOutlined,
  RingVolumeOutlined,
  ExtensionOutlined,
  PersonOutlineOutlined,
  ComputerOutlined,
  Face5Outlined,
  ExitToAppOutlined
} from "@mui/icons-material";

function MenuCard({ href, icons, text, onClick }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center w-36 h-36 p-2 gap-2 rounded-3xl bg-[#FFFFFF] hover:bg-[#615DFF]/50 text-[#615DFF]  hover:text-[#FFFFFF] shadow-sm"
      onClick={onClick}
    >
      <div className="flex items-center justify-center w-full h-full p-2 gap-2">
        {icons}
      </div>
      <div className="flex items-center justify-center w-full h-full p-2 gap-2 text-sm font-[300]">
        {text}
      </div>
    </Link>
  );
}

export default function Home() {
  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (res.ok) {
        await signOut({ callbackUrl: "/" });
      } else {
        const errorData = await res.json();
        console.error("Sign out failed:", errorData);
      }
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-96 p-2 gap-2 bg-[#F3F7FB] rounded-3xl">
      <div className="flex flex-row flex-wrap items-center justify-center w-full h-full p-2 gap-2">
        <MenuCard
          href="/"
          icons={<AutoGraphOutlined style={{ fontSize: "2rem" }} />}
          text="ไฟฟ้าและน้ำ"
        />
        <MenuCard
          href="/"
          icons={<CampaignOutlined style={{ fontSize: "2rem" }} />}
          text="กิจกรรมประกาศ"
        />
        <MenuCard
          href="/"
          icons={<DocumentScannerOutlined style={{ fontSize: "2rem" }} />}
          text="เอกสารล่าสุด"
        />
        <MenuCard
          href="/"
          icons={<SlowMotionVideoOutlined style={{ fontSize: "2rem" }} />}
          text="คู่มือการใช้งาน"
        />
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center w-full h-full p-2 gap-2">
        <MenuCard
          href="https://channakorn.co.th/"
          icons={<CottageOutlined style={{ fontSize: "2rem" }} />}
          text="Channakorn"
        />
        <MenuCard
          href="http://webchan.webhop.biz:8023/Main/"
          icons={<SettingsSuggestOutlined style={{ fontSize: "2rem" }} />}
          text="Cne System"
        />
        <MenuCard
          href="http://cneremote2.dyndns-ip.com:8011/cgi-bin/"
          icons={<FilterDramaOutlined style={{ fontSize: "2rem" }} />}
          text="Cne Cloud"
        />
        <MenuCard
          href="http://49.0.64.242:8088/LoginERS/login.aspx"
          icons={<CalendarMonthOutlined style={{ fontSize: "2rem" }} />}
          text="ระบบลางาน"
        />
        <MenuCard
          href="/contact"
          icons={<RingVolumeOutlined style={{ fontSize: "2rem" }} />}
          text="Contact Us"
        />
        <MenuCard
          href="/logo"
          icons={<ExtensionOutlined style={{ fontSize: "2rem" }} />}
          text="Logo"
        />
        <MenuCard
          href="/hr"
          icons={<PersonOutlineOutlined style={{ fontSize: "2rem" }} />}
          text="บุคคล"
        />
        <MenuCard
          href="/it"
          icons={<ComputerOutlined style={{ fontSize: "2rem" }} />}
          text="เทคโนโลยี"
        />
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center w-full h-full p-2 gap-2">
        <MenuCard
          href="/"
          icons={<Face5Outlined style={{ fontSize: "2rem" }} />}
          text="โปรไฟล์"
        />
        <MenuCard
          href="/#"
          icons={<ExitToAppOutlined />}
          text="ออกจากระบบ"
          onClick={handleSignOut}
        />
      </div>
    </div>
  );
}
