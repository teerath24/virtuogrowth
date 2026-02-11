import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State to track hover for the button effect
  const [isHovered, setIsHovered] = useState(false);

  const params = new URLSearchParams(location.search);
  const type = params.get("type");

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
              Thank you for applying to join our talent pool! We've received
              your application and will review it carefully. Our team will
              contact you within{" "}
              <span className="font-semibold">3-5 business days</span> via
              email.
            </>
          )}
          {isClient && (
            <>
              Thank you for your interest in our services! We've received your
              quote request and our team will contact you within{" "}
              <span className="font-semibold">24 hours</span> with a customized
              proposal.
            </>
          )}
          {!isApplicant && !isClient && (
            <>Your submission has been received successfully!</>
          )}
        </p>

        {/* Info Box */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            What happens next?
          </h3>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-2 text-left max-w-md mx-auto">
            {isApplicant && (
              <>
                <li>✓ Our team reviews your application</li>
                <li>✓ We assess your skills and experience</li>
                <li>✓ If selected, we'll schedule an interview</li>
                <li>✓ Check your email for updates</li>
              </>
            )}
            {isClient && (
              <>
                <li>✓ We review your requirements</li>
                <li>✓ We prepare a customized proposal</li>
                <li>✓ Our team will contact you via email/phone</li>
                <li>✓ We'll match you with perfect talent</li>
              </>
            )}
          </ul>
        </div>

        {/* Updated Button with Water Fill Effect */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative px-10 py-4 rounded-full font-bold overflow-hidden transition-all duration-300 active:scale-95 group"
          >
            {/* Base Background Layer */}
            <div className="absolute inset-0 bg-[#004F7F] dark:bg-[#ECC600]"></div>

            {/* Water Fill Layer */}
            <div
              className="absolute inset-0 bg-[#ECC600] dark:bg-[#fff] transition-all duration-700 ease-out"
              style={{
                transform: isHovered ? "translateY(0%)" : "translateY(100%)",
              }}
            />

            {/* Text Layer (Higher Z-Index) */}
            <span className="relative z-10 text-white dark:text-[#004F7F] transition-colors duration-300">
              Return to Home
            </span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default ThankYou;
