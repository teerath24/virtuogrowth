"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ThankYouContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State to track hover for buttons
  const [isHomeHovered, setIsHomeHovered] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);

  const type = searchParams.get("type");

  const isApplicant = type === "applicant";
  const isClient = type === "client";

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-900 flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          {isApplicant && "Application Submitted Successfully!"}
          {isClient && "Quote Request Received!"}
          {!isApplicant && !isClient && "Thank You!"}
        </h1>

        {/* Message */}
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          {isApplicant && (
            <>
              Thank you for applying to join our talent pool! We&apos;ve
              received your application and will review it carefully. Our team
              will contact you within{" "}
              <span className="font-semibold">3-5 business days</span> via
              email.
            </>
          )}
          {isClient && (
            <>
              Thank you for your interest in our services! We&apos;ve received
              your quote request and our team will contact you within{" "}
              <span className="font-semibold">24 hours</span> with a customized
              proposal.
            </>
          )}
          {!isApplicant && !isClient && (
            <>Your submission has been received successfully!</>
          )}
        </p>

        {/* Info Box */}
        <div className="bg-[#004F7F]/5 dark:bg-[#ECC600]/5 border border-[#004F7F]/20 dark:border-[#ECC600]/20 rounded-xl p-6 mb-8">
          <ul className="text-[#004F7F]/80 dark:text-[#ECC600]/90 text-sm space-y-2 text-left max-w-md mx-auto">
            {isApplicant && (
              <>
                <li>✓ Our team reviews your application</li>
                <li>✓ We assess your skills and experience</li>
                <li>✓ If selected, we&apos;ll schedule an interview</li>
                <li>✓ Check your email for updates</li>
              </>
            )}
            {isClient && (
              <>
                <li>✓ We review your requirements</li>
                <li>✓ We prepare a customized proposal</li>
                <li>✓ Our team will contact you via email/phone</li>
                <li>✓ We&apos;ll match you with perfect talent</li>
              </>
            )}
          </ul>
        </div>

        {/* Buttons with Water Fill Effect */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Return to Home Button */}
          <button
            onClick={() => router.push("/")}
            onMouseEnter={() => setIsHomeHovered(true)}
            onMouseLeave={() => setIsHomeHovered(false)}
            className="relative px-10 py-4 rounded-full font-bold overflow-hidden transition-all duration-300 active:scale-95 group"
          >
            {/* Base Background Layer */}
            <div className="absolute inset-0 bg-[#004F7F] dark:bg-[#ECC600]"></div>

            {/* Water Fill Layer */}
            <div
              className="absolute inset-0 bg-[#ECC600] dark:bg-[#fff] transition-all duration-700 ease-out"
              style={{
                transform: isHomeHovered
                  ? "translateY(0%)"
                  : "translateY(100%)",
              }}
            />

            {/* Text Layer */}
            <span className="relative z-10 text-white dark:text-[#004F7F] transition-colors duration-300">
              Return to Home
            </span>
          </button>

          {/* View Services Button - Only shows for client submissions */}
          {isClient && (
            <button
              onClick={() => router.push("/services")}
              onMouseEnter={() => setIsServicesHovered(true)}
              onMouseLeave={() => setIsServicesHovered(false)}
              className="relative px-10 py-4 rounded-full font-bold overflow-hidden transition-all duration-300 active:scale-95 group"
            >
              {/* Base Background Layer */}
              <div className="absolute inset-0 bg-[#004F7F] dark:bg-[#ECC600]"></div>

              {/* Water Fill Layer */}
              <div
                className="absolute inset-0 bg-[#ECC600] dark:bg-[#fff] transition-all duration-700 ease-out"
                style={{
                  transform: isServicesHovered
                    ? "translateY(0%)"
                    : "translateY(100%)",
                }}
              />

              {/* Text Layer */}
              <span className="relative z-10 text-white dark:text-[#004F7F] transition-colors duration-300">
                View Services
              </span>
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default function ThankYou() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-slate-600">Loading...</p>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
