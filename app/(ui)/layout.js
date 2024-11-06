"use client";
import {
  DehazeOutlined,
  AddHomeOutlined,
  Person4Outlined,
  PhonelinkOutlined,
  StarBorderOutlined,
  DataUsageOutlined,
  SettingsSuggestOutlined,
  ReportProblemOutlined,
  CloudSyncOutlined,
  AutoGraphOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import { styled } from "@mui/system";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "#16cdc7",
    color: "#FFFFFF",
    fontSize: "0.875rem",
    padding: "8px 12px",
    borderRadius: "50px",
    boxShadow: theme?.shadows?.[1] || "0px 2px 4px rgba(0, 0, 0, 0.1)",
    fontFamily: "var(--prompt)",
  },
  [`& .MuiTooltip-arrow`]: {
    color: "#16cdc7",
  },
}));

const MainMenu = ({ icon, href = "", tooltip, onClick }) => {
  const pathname = usePathname();
  const isActive = `/${pathname.split("/")[1]}` === href;

  return (
    <CustomTooltip title={tooltip} arrow placement="right">
      <Link
        href={href || "#"}
        className={`flex items-center justify-center min-w-16 min-h-16 p-2 gap-2 hover:text-[#635bff] hover:bg-[#635bff]/25  rounded-xl ${
          isActive
            ? "bg-[#635bff] text-[#FFFFFF]"
            : "hover:text-[#635bff] hover:bg-[#635bff]/25"
        }`}
        onClick={onClick}
      >
        <div>{icon}</div>
      </Link>
    </CustomTooltip>
  );
};

const Section = ({ title, icon, links }) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col items-center w-full p-2 gap-2 border-b-2">
      <div className="flex items-center w-full p-2 gap-2 font-[600]">
        {icon} {title}
      </div>
      {links.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center w-full min-h-16 px-6 py-2 gap-2 hover:text-[#635bff] rounded-xl ${
              isActive ? "bg-[#635bff] text-[#FFFFFF] rounded-xl shadow-md" : ""
            }`}
          >
            <DataUsageOutlined /> {label}
          </Link>
        );
      })}
    </div>
  );
};

export default function UiLayout({ children }) {
  const [selectedMenu, setSelectedMenu] = useState(null);
  useEffect(() => {
    const savedMenu = localStorage.getItem("selectedMenu");
    if (savedMenu) {
      setSelectedMenu(savedMenu);
    }
  }, []);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    localStorage.setItem("selectedMenu", menu);
  };
  return (
    <div className="flex flex-row items-start justify-start w-full min-h-screen">
      <div className="flex flex-row items-center justify-center w-[25%] min-h-screen gap-2 fixed">
        <div className="flex flex-col items-center justify-start w-[25%] h-screen p-2 gap-2 border-2 border-[#000000] border-dashed overflow-auto">
          <MainMenu icon={<DehazeOutlined />} />
          <MainMenu
            href="/home"
            icon={<AddHomeOutlined />}
            tooltip="HOME"
            onClick={() => handleMenuClick("HOME")}
          />
          <MainMenu
            href="/hr"
            icon={<Person4Outlined />}
            tooltip="HR"
            onClick={() => handleMenuClick("HR")}
          />
          <MainMenu
            href="/it"
            icon={<PhonelinkOutlined />}
            tooltip="IT"
            onClick={() => handleMenuClick("IT")}
          />
          <MainMenu href="/iso" icon={<StarBorderOutlined />} tooltip="ISO" />
        </div>
        <div className="flex flex-col items-center justify-start w-[75%] h-screen p-2 gap-2 border-2 border-[#000000] border-dashed">
          <div className="flex items-center justify-center w-full min-h-16 p-2 gap-2 border-2 border-[#000000] border-dashed rounded-xl text-[#635bff] font-[600]">
            Channakorn Engineer
          </div>
          <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 border-2 border-[#000000] border-dashed rounded-xl overflow-auto">
            {selectedMenu === "HOME" && (
              <>
                <Section
                  title="Home"
                  icon={<AutoGraphOutlined />}
                  links={[{ href: "/home", label: "Dashboard 1" }]}
                />
              </>
            )}
            {selectedMenu === "HR" && (
              <>
                <Section
                  title="Setting"
                  icon={<SettingsSuggestOutlined />}
                  links={[
                    { href: "/hr/branch", label: "Branch" },
                    { href: "/hr/site", label: "Site" },
                    { href: "/hr/division", label: "Division" },
                    { href: "/hr/department", label: "Department" },
                    { href: "/hr/position", label: "Position" },
                    { href: "/hr/role", label: "Role" },
                    { href: "/hr/user", label: "User" },
                  ]}
                />
                <Section
                  title="Warning"
                  icon={<ReportProblemOutlined />}
                  links={[
                    { href: "/hr/warning_topic", label: "Warning Topic" },
                    { href: "/hr/warning_detail", label: "Warning Detail" },
                    { href: "/hr/warning_user", label: "Warning User" },
                  ]}
                />
              </>
            )}
            {selectedMenu === "IT" && (
              <>
                <Section
                  title="Back Up"
                  icon={<CloudSyncOutlined />}
                  links={[
                    { href: "/it/backup", label: "BackUp" },
                    { href: "/it/maintenance", label: "Maintenance" },
                  ]}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start w-[75%] min-h-screen ml-[26%] gap-4">
        <div className="flex flex-row items-center justify-center w-[100%] h-full p-2 gap-2 border-2 border-[#000000] border-dashed">
          Header
        </div>
        <div className="flex flex-row items-center justify-center w-[100%] min-h-screen p-2 gap-2 border-2 border-[#000000] border-dashed rounded-3xl">
          Contents
        </div>
      </div>
    </div>
  );
}
