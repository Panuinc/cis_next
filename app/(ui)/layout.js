"use client";
import Link from "next/link";
import Image from "next/image";
import {
  DehazeOutlined,
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
  ExitToAppOutlined,
} from "@mui/icons-material";

function MenuCard({ href, icons, onClick }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-center w-14 h-14 p-2 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-xl border-2 border-[#000000] border-dashed"
    >
      {icons}
    </Link>
  );
}

export default function UiLayout({ children }) {
  return (
    <div className="flex flex-row items-center justify-center w-full min-h-screen p-2 gap-2 border-2 border-[#000000] border-dashed">
      <div className="flex flex-row items-center justify-center w-3/12 min-h-screen p-2 gap-2 border-2 border-[#000000] border-dashed">
        <div className="flex flex-col items-center justify-start w-3/12 min-h-screen p-2 border-2 border-[#000000] border-dashed bg-[#F3F7FB] overflow-auto">
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-b-2">
            <button className="flex items-center justify-center w-14 h-14 p-2 border-2 border-[#000000] border-dashed rounded-xl">
              <DehazeOutlined />
            </button>
            <MenuCard
              href="/"
              icons={<AutoGraphOutlined style={{ fontSize: "1.5rem" }} />}
            />
            <MenuCard
              href="/"
              icons={<CampaignOutlined style={{ fontSize: "1.5rem" }} />}
            />
            <MenuCard
              href="/"
              icons={<DocumentScannerOutlined style={{ fontSize: "1.5rem" }} />}
            />
            <MenuCard
              href="/"
              icons={<SlowMotionVideoOutlined style={{ fontSize: "1.5rem" }} />}
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-b-2">
            <MenuCard
              href="/"
              icons={<CottageOutlined style={{ fontSize: "1.5rem" }} />}
            />
            <MenuCard
              href="/hr"
              icons={<PersonOutlineOutlined style={{ fontSize: "1.5rem" }} />}
            />
            <MenuCard
              href="/it"
              icons={<ComputerOutlined style={{ fontSize: "1.5rem" }} />}
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-b-2">
            <MenuCard
              href="/"
              icons={<Face5Outlined style={{ fontSize: "2rem" }} />}
            />
            <button
              href="/#"
              className="flex items-center justify-center w-14 h-14 p-2 text-[#FFFFFF] bg-[#635bff] rounded-xl"
            >
              <ExitToAppOutlined />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-9/12 min-h-screen p-2 gap-2 border-2 border-[#000000] border-dashed bg-[#FFFFFF] overflow-auto">
          <div className="flex flex-row items-center justify-start w-full h-16 p-2 gap-2 border-2 border-[#000000] border-dashed rounded-xl">
            <Image
              src="/images/other/company_logo.png"
              alt="company_logo"
              width={50}
              height={50}
              priority={true}
            />
            Channakorn - Cis
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed rounded-xl">
            <div className="flex items-center justify-start w-full h-full p-2 border-2 border-[#000000] border-dashed rounded-xl">
              สาขา
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 border-2 border-[#000000] border-dashed rounded-xl">
              ฝ่าย
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 border-2 border-[#000000] border-dashed rounded-xl">
              แผนก
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center w-9/12 min-h-screen p-2 gap-2 border-2 border-[#000000] border-dashed">
        01
      </div>
    </div>
  );
}
