import Link from "next/link";
import { usePathname } from "next/navigation";
import { DataUsageOutlined } from "@mui/icons-material";

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
            className={`flex items-center w-full min-h-16 px-6 py-2 gap-2 rounded-xl ${
              isActive
                ? "bg-[#635bff] text-[#FFFFFF] rounded-xl shadow-md"
                : "hover:text-[#635bff] "
            }`}
          >
            <DataUsageOutlined /> {label}
          </Link>
        );
      })}
    </div>
  );
};

export default Section;
