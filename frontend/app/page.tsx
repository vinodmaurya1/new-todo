import Image from "next/image";
import logo from "@/public/logo.png";
import { Toaster } from "react-hot-toast";
import MainPage from "@/components/MainPage";

export default function Home() {
  return (
    <div>
      <Toaster position="top-right" />
      <div className="flex flex-col min-h-screen">
        <nav className="py-4 shadow px-4">
          <Image src={logo} alt="logo" />
        </nav>
        <MainPage />
      </div>
    </div>
    );
  }
  

