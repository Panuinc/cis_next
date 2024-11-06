import Link from "next/link";
import { usePathname } from "next/navigation";
import CustomTooltip from "./CustomTooltip";

const MainMenu = ({ icon, href = "", tooltip, onClick }) => {
  const pathname = usePathname();
  const isActive = `/${pathname.split("/")[1]}` === href;

  return (
    <CustomTooltip title={tooltip} arrow placement="right">
      <Link
        href={href || "#"}
        className={`flex items-center justify-center min-w-16 min-h-16 p-2 gap-2 hover:text-[#635bff] hover:bg-[#635bff]/25 rounded-xl ${
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

export default MainMenu;
