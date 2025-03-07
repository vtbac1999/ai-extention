import { QueryProvider } from "@/query-provider/QueryProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Montserrat } from "next/font/google";
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

const montserrat = Montserrat({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children}) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale}>
    <head>{/* Dev Need Add Tags Meta To Up SEO */}</head>
    <body className={`${montserrat.className} `}>
      <NextIntlClientProvider messages={messages}>
        <QueryProvider>
          <TooltipProvider>
            <AntdRegistry>
              {children}
            <ToastContainer 
              position="top-right"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover={false}
              theme="light"
              transition={Bounce}
            />
            </AntdRegistry>
          </TooltipProvider>
        </QueryProvider>
      </NextIntlClientProvider>
    </body>
  </html>
  );
}