import { Inter, Anuphan } from "next/font/google";
import "../public/css/globals.css";
import { CustomProviders } from "./provider";

const inter = Inter({ subsets: ["latin"] });
const anuphan = Anuphan({
  subsets: ["latin"],
  variable: "--anuphan",
  weight: "300",
  display: "swap",
});

export const metadata = {
  title: "CIS SYSTEM",
  description: "Next gen to the future",
};

export default function RootLayout({ children }) {
  return (
    <CustomProviders>
      <html lang="en">
        <head>
          <link rel="icon" href="/images/other/company_logo.png" />
        </head>

        <body className={(inter.className, anuphan.variable)}>
          <div className="font-anuphan w-full min-h-screen bg-[#FFFFFF] text-[#000000]">
            {children}
          </div>
        </body>
      </html>
    </CustomProviders>
  );
}
