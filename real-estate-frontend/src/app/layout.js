"use client";
import ScrollToTop from "@/components/common/ScrollTop";
import Aos from "aos";
import "react-modal-video/scss/modal-video.scss";
import "aos/dist/aos.css";
import "../../public/scss/main.scss";
import "rc-slider/assets/index.css";
import { DM_Sans, Poppins } from "next/font/google";
import { useEffect } from "react";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

if (typeof window !== "undefined") {
  import("bootstrap");
}

// DM_Sans font
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--body-font-family",
});

// Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--title-font-family",
});

export default function RootLayout({ children }) {
  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <html lang="en">
      <body
        className={`body ${poppins.variable} ${dmSans.variable}`}
        cz-shortcut-listen="false"
      >
        <div className="wrapper ovh">
          <StoreProvider>
            <ToastContainer autoClose={3000} />
            {children}
          </StoreProvider>
        </div>
        <ScrollToTop />
      </body>
    </html>
  );
}
