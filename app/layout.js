import { Inter, Prompt } from "next/font/google";
import "../public/css/globals.css";
import { CustomProviders } from "./provider";

const inter = Inter({ subsets: ["latin"] });
const prompt = Prompt({
  subsets: ["latin"],
  variable: "--prompt",
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

        <body className={(inter.className, prompt.variable)}>
          <div className="font-prompt bg-[#FFFFFF]">
            {children}
          </div>
        </body>
      </html>
    </CustomProviders>
  );
}
