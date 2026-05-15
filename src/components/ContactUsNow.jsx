"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactUsNow() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/contact")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative px-8 py-4 rounded-full font-bold overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer"
    >
      <div className="absolute inset-0 bg-white dark:bg-[#ECC600]"></div>
      <div
        className="absolute inset-0 bg-[#ECC600] dark:bg-white transition-all duration-700 ease-out"
        style={{ transform: isHovered ? "translateY(0%)" : "translateY(100%)" }}
      />
      <span className="relative z-10 text-[#004F7F]">Find My Match</span>
    </button>
  );
}
