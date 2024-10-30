"use client";
import Link from "next/link";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import {
  DehazeOutlined,
  AutoGraphOutlined,
  CampaignOutlined,
  DocumentScannerOutlined,
  SlowMotionVideoOutlined,
  CottageOutlined,
  PersonOutlineOutlined,
  ComputerOutlined,
  Face5Outlined,
  ExitToAppOutlined,
} from "@mui/icons-material";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "#16cdc7",
    color: "#FFFFFF",
    fontSize: "0.875rem",
    padding: "8px 12px",
    borderRadius: "50px",
    boxShadow: theme.shadows[1],
  },
  [`& .MuiTooltip-arrow`]: {
    color: "#16cdc7",
  },
}));

function MenuCard({ href, icons, title }) {
  return (
    <CustomTooltip title={title} arrow placement="right">
      <Link
        href={href}
        className="flex items-center justify-center w-14 h-14 p-2 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-xl border-2 border-[#000000] border-dashed"
      >
        {icons}
      </Link>
    </CustomTooltip>
  );
}

export default function UiLayout({ children }) {
  return (
    <div className="flex flex-row items-center justify-center w-full min-h-screen p-2 gap-2 border-2 border-[#000000] border-dashed">
      <div className="flex flex-col items-center justify-start w-1/12 min-h-screen p-2 gap-2 border-2 border-[#000000] border-dashed bg-[#F3F7FB] overflow-auto">
        <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-b-2">
          <button className="flex items-center justify-center w-14 h-14 p-2 border-2 border-[#000000] border-dashed rounded-xl">
            <DehazeOutlined />
          </button>
          <MenuCard
            href="/"
            icons={<AutoGraphOutlined style={{ fontSize: "1.5rem" }} />}
            title="ไฟฟ้าและน้ำ"
          />
          <MenuCard
            href="/"
            icons={<CampaignOutlined style={{ fontSize: "1.5rem" }} />}
            title="ประกาศ"
          />
          <MenuCard
            href="/"
            icons={<DocumentScannerOutlined style={{ fontSize: "1.5rem" }} />}
            title="เอกสารล่าสุด"
          />
          <MenuCard
            href="/"
            icons={<SlowMotionVideoOutlined style={{ fontSize: "1.5rem" }} />}
            title="คู่มือการใช้งาน"
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-b-2">
          <MenuCard
            href="/"
            icons={<CottageOutlined style={{ fontSize: "1.5rem" }} />}
            title="หน้าหลัก"
          />
          <MenuCard
            href="/hr"
            icons={<PersonOutlineOutlined style={{ fontSize: "1.5rem" }} />}
            title="บุคคล"
          />
          <MenuCard
            href="/it"
            icons={<ComputerOutlined style={{ fontSize: "1.5rem" }} />}
            title="เทคโนโลยีสารสนเทศ"
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-b-2">
          <MenuCard
            href="/"
            icons={<Face5Outlined style={{ fontSize: "2rem" }} />}
            title="โปรไฟล์"
          />
          <button
            href="/#"
            className="flex items-center justify-center w-14 h-14 p-2 text-[#FFFFFF] bg-[#635bff] rounded-xl"
          >
            <ExitToAppOutlined />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-start w-2/12 min-h-screen p-2 gap-2 border-2 border-[#000000] border-dashed bg-[#F3F7FB] overflow-auto">
        <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed rounded-xl">
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

      <div className="flex flex-colitems-center justify-center w-9/12 min-h-screen p-2 gap-2 border-2 border-[#000000] border-dashed">
        01
      </div>
    </div>
  );
}
