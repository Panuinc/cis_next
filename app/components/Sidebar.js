import { useState, useEffect, useRef } from "react";
import MainMenu from "./MainMenu";
import Section from "./Section";
import {
  DehazeOutlined,
  AddHomeOutlined,
  Person4Outlined,
  PhonelinkOutlined,
  StarBorderOutlined,
  ExitToAppOutlined,
  SettingsSuggestOutlined,
  ReportProblemOutlined,
  CloudSyncOutlined,
  AutoGraphOutlined,
} from "@mui/icons-material";

const Sidebar = ({
  sidebarOpen,
  toggleSidebar,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  selectedMenu,
  setSelectedMenu,
  handleSignOut,
}) => {
  const sidebarRef = useRef(null);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    localStorage.setItem("selectedMenu", menu);
  };

  useEffect(() => {
    const savedMenu = localStorage.getItem("selectedMenu");
    if (savedMenu) {
      setSelectedMenu(savedMenu);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMobileSidebarOpen(false);
      }
    };

    if (mobileSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileSidebarOpen, setMobileSidebarOpen]);

  return (
    <div
      ref={sidebarRef}
      className={`${
        mobileSidebarOpen ? "flex" : "hidden"
      } xl:flex flex-row items-center justify-center ${
        sidebarOpen ? "w-[75%] xl:w-[25%]" : "w-[25%] xl:w-[5%]"
      } min-h-screen fixed z-10`}
    >
      <div
        className={`flex flex-col items-center justify-start ${
          sidebarOpen ? "w-[25%]" : "w-full"
        } h-screen p-2 gap-2 bg-[#F3F7FB] overflow-auto`}
      >
        <MainMenu icon={<DehazeOutlined />} onClick={toggleSidebar} />
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
        <MainMenu
          href="/iso"
          icon={<StarBorderOutlined />}
          tooltip="iso"
          onClick={() => handleMenuClick("ISO")}
        />
        <MainMenu
          href="/#"
          icon={<ExitToAppOutlined />}
          tooltip="Logout"
          onClick={handleSignOut}
        />
      </div>
      {sidebarOpen && (
        <div
          className={`flex flex-col items-center justify-start ${
            sidebarOpen ? "w-[75%]" : "w-[0%]"
          } h-screen p-2 gap-2 bg-[#FFFFFF]`}
        >
          <div className="flex items-center justify-center w-full min-h-16 p-2 gap-2 rounded-xl text-[#635bff] font-[600]">
            Channakorn Engineer
          </div>
          <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 rounded-xl overflow-auto">
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
                  title="ทั่วไป"
                  icon={<SettingsSuggestOutlined />}
                  links={[
                    { href: "/hr/branch", label: "สาขา" },
                    { href: "/hr/site", label: "ไซต์งาน" },
                    { href: "/hr/division", label: "ฝ่าย" },
                    { href: "/hr/department", label: "แผนก" },
                    { href: "/hr/position", label: "ตำแหน่ง" },
                    { href: "/hr/role", label: "บทบาทหน้าที่" },
                    { href: "/hr/employee_thai", label: "พนักงาน ชาวไทย" },
                    { href: "/hr/employees_foreign", label: "พนักงาน ชาวต่าวชาติ" },
                  ]}
                />
                {/* <Section
                  title="Warning"
                  icon={<ReportProblemOutlined />}
                  links={[
                    { href: "/hr/warning_topic", label: "Warning Topic" },
                    { href: "/hr/warning_detail", label: "Warning Detail" },
                    { href: "/hr/warning_user", label: "Warning User" },
                  ]}
                /> */}
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
      )}
    </div>
  );
};

export default Sidebar;
