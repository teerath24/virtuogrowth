import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  // State for selected service card
  const [selectedService, setSelectedService] = useState("Virtual Assistants");
  const [selectedPricing, setSelectedPricing] = useState("Full-Time");

  const handleServiceCardClick = (serviceName) => {
    setSelectedService(serviceName);
  };

  const handlePricingCardClick = (planName) => {
    setSelectedPricing(planName);
  };

  const handleRequestTalent = (serviceName, price) => {
    navigate("/contact", {
      state: {
        service: serviceName,
        estimatedPrice: price,
        source: "services_page",
      },
    });
  };

  const handlePricingSelect = (planName, price) => {
    navigate("/contact", {
      state: {
        plan: planName,
        estimatedPrice: price,
        source: "pricing_section",
      },
    });
  };

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] p-6 text-center transition-colors duration-300 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-900">
        <div className="max-w-4xl mx-auto pt-32 pb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white mb-6 leading-tight">
            Premium Remote Talent
            <span className="text-[#004F7F] dark:text-[#ECC600]">
              {" "}
              Solutions
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            We connect businesses with top-tier Virtual Assistants, Web
            Designers, and Web Developers. Fully vetted, expertly matched,
            seamlessly integrated.
          </p>
        </div>
      </section>

      {/* Our Core Services Section */}
      <section
        id="core-services"
        className="bg-white dark:bg-slate-900 py-24 px-6 transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Our Core Services
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Choose from our specialized talent solutions designed to scale your
            business efficiently
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Virtual Assistants Card */}
          <ServiceCard
            badge="Most Popular"
            icon={
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            }
            title="Virtual Assistants"
            description="Professional administrative support to handle your day-to-day operations, customer service, and back-office tasks with precision."
            features={[
              "Email & calendar management",
              "Customer support & CRM",
              "Data entry & research",
              "Social media coordination",
            ]}
            price="$1,200"
            priceSubtext="per month"
            isSelected={selectedService === "Virtual Assistants"}
            onClick={() => handleServiceCardClick("Virtual Assistants")}
            onRequestTalent={() =>
              handleRequestTalent("Virtual Assistants", "$1,200")
            }
          />

          {/* Web Designers Card */}
          <ServiceCard
            icon={
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            }
            title="Web Designers"
            description="Creative design experts who craft stunning, user-centered digital experiences that elevate your brand and drive conversions."
            features={[
              "UI/UX design & prototyping",
              "Responsive web design",
              "Brand identity & graphics",
              "Landing page generation",
            ]}
            price="$2,800"
            priceSubtext="per month"
            isSelected={selectedService === "Web Designers"}
            onClick={() => handleServiceCardClick("Web Designers")}
            onRequestTalent={() =>
              handleRequestTalent("Web Designers", "$2,800")
            }
          />

          {/* Web Developers Card */}
          <ServiceCard
            icon={
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            }
            title="Web Developers"
            description="Skilled developers who build scalable web applications with clean code and cutting-edge technologies."
            features={[
              "Full-stack development",
              "Custom web applications",
              "E-commerce solutions",
              "API integration & maintenance",
            ]}
            price="$3,500"
            priceSubtext="per month"
            isSelected={selectedService === "Web Developers"}
            onClick={() => handleServiceCardClick("Web Developers")}
            onRequestTalent={() =>
              handleRequestTalent("Web Developers", "$3,500")
            }
          />
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-slate-50 dark:bg-slate-800 py-24 px-6 transition-colors duration-300">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Why Choose Virtuo?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto">
            We don't just connect you with talent — we ensure they're perfect
            fit for your business needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <BenefitCard
            icon={
              <svg
                className="w-8 h-8 dark:text-[#abcd36]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            title="Rigorously Vetted"
            description="Every professional goes through our comprehensive screening process to ensure top-quality talent."
          />
          <BenefitCard
            icon={
              <svg
                className="w-8 h-8 dark:text-[#abcd36]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            }
            title="Perfect Matching"
            description="We analyze your needs and match you with talent that fits your culture, industry, and requirements."
          />
          <BenefitCard
            icon={
              <svg
                className="w-8 h-8 dark:text-[#abcd36]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            }
            title="Fast Onboarding"
            description="Get matched with qualified professionals within 48 hours and start working within a week."
          />
          <BenefitCard
            icon={
              <svg
                className="w-8 h-8 dark:text-[#abcd36]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            }
            title="Ongoing Support"
            description="Dedicated account management and continuous support to ensure smooth collaboration."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white dark:bg-slate-900 py-24 px-6 transition-colors duration-300">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Get started with top remote talent in just four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto ">
          <ProcessStep
            number="1"
            title="Tell Us Your Needs"
            description="Share your requirements, budget, and project details through our simple intake form."
          />
          <ProcessStep
            number="2"
            title="We Find the Match"
            description="Our team reviews and selects the most qualified professionals matched to your criteria from our vetted talent pool to find your perfect match."
          />
          <ProcessStep
            number="3"
            title="Meet & Approve"
            description="Review profiles, interview candidates, and approve your preferred talent before starting."
          />
          <ProcessStep
            number="4"
            title="Start Working"
            description="Begin your project with full support from our team to ensure smooth collaboration."
          />
        </div>
      </section>

      {/* Flexible Engagement Models */}
      <section className="bg-slate-50 dark:bg-slate-800 py-24 px-6 transition-colors duration-300">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Flexible Engagement Models
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Choose the engagement model that works best for your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Part-Time Plan */}
          <PricingCard
            title="Part-Time"
            subtitle="20 hours per week"
            price="$1,500"
            period="per month"
            features={[
              "20 hours per week",
              "Dedicated talent",
              "Account manager",
              "Monthly reporting",
            ]}
            buttonText="Get Started"
            isSelected={selectedPricing === "Part-Time"}
            onClick={() => handlePricingCardClick("Part-Time")}
            onButtonClick={() => handlePricingSelect("Part-Time", "$1,500")}
          />

          {/* Full-Time Plan */}
          <PricingCard
            badge="BEST VALUE"
            title="Full-Time"
            subtitle="40 hours per week"
            price="$2,800"
            period="per month"
            features={[
              "40 hours per week",
              "Dedicated talent",
              "Priority support",
              "Weekly reporting",
              "Free replacement",
            ]}
            buttonText="Get Started"
            isSelected={selectedPricing === "Full-Time"}
            onClick={() => handlePricingCardClick("Full-Time")}
            onButtonClick={() => handlePricingSelect("Full-Time", "$2,800")}
          />

          {/* Enterprise Plan */}
          <PricingCard
            title="Enterprise"
            subtitle="Multiple team members"
            price="Custom"
            features={[
              "Multiple talents",
              "Custom hours",
              "Dedicated SLAs",
              "Volume discounts",
            ]}
            buttonText="Contact Sales"
            isSelected={selectedPricing === "Enterprise"}
            onClick={() => handlePricingCardClick("Enterprise")}
            onButtonClick={() => handlePricingSelect("Enterprise", "Custom")}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#004F7F] dark:bg-slate-900 py-24 text-center px-6">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Build Your Remote Team?
        </h2>
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          Join hundreds of companies that trust Virtuo to connect them with
          world-class remote professionals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/contact")}
            className="relative px-8 py-4 rounded-full font-bold overflow-hidden transition-all duration-300 hover:scale-105 group "
            onMouseEnter={(e) => {
              e.currentTarget.querySelector(".button-fill").style.transform =
                "translateY(0%)";
              e.currentTarget.classList.add("scale-105");
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector(".button-fill").style.transform =
                "translateY(100%)";
              e.currentTarget.classList.remove("scale-105");
            }}
          >
            <div className="absolute inset-0 bg-[#004F7F] dark:bg-[#ECC600]"></div>
            <div
              className="absolute inset-0 bg-[#ECC600] dark:bg-white transition-all duration-700 ease-out button-fill"
              style={{
                transform: "translateY(100%)",
              }}
            />
            <span className="relative z-10 text-[#004F7F] dark:text-[#004F7F]">
              Call Us Now
            </span>
          </button>
        </div>
      </section>
    </main>
  );
};

// Service Card Component
const ServiceCard = ({
  badge,
  icon,
  title,
  description,
  features,
  price,
  priceSubtext,
  isSelected,
  onClick,
  onRequestTalent,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-2xl p-8 transition-all duration-300 hover:shadow-xl cursor-pointer group ${
        isSelected
          ? "bg-[#004F7F] dark:bg-[#ECC600] text-white dark:text-[#004F7F] border-2 border-[#004F7F] dark:border-[#ECC600] transform scale-105"
          : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#004F7F]/30 dark:hover:border-[#ECC600]/30"
      }`}
    >
      {/* Show badge if it exists */}
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-[#ECC600] dark:bg-[#004F7F] text-[#004F7F] dark:text-[#ECC600] text-xs font-bold px-4 py-1 rounded-full">
            {badge}
          </span>
        </div>
      )}

      <div
        className={`flex justify-center mb-6 ${
          isSelected
            ? "text-white dark:text-[#004F7F]"
            : "text-[#004F7F] dark:text-[#ECC600]"
        }`}
      >
        {icon}
      </div>

      <h3
        className={`text-2xl font-bold mb-3 ${
          isSelected ? "" : "text-slate-900 dark:text-white"
        }`}
      >
        {title}
      </h3>

      <p
        className={`mb-6 leading-relaxed ${
          isSelected
            ? "text-white/90 dark:text-[#004F7F]/90"
            : "text-slate-600 dark:text-slate-400"
        }`}
      >
        {description}
      </p>

      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li
            key={i}
            className={`flex items-center gap-3 ${
              isSelected ? "" : "text-slate-700 dark:text-slate-300"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isSelected
                  ? "bg-white dark:bg-[#004F7F]"
                  : "bg-[#004F7F] dark:bg-[#ECC600]"
              }`}
            />
            {feature}
          </li>
        ))}
      </ul>

      <div
        className={`border-t ${
          isSelected
            ? "border-white/20 dark:border-[#004F7F]/20"
            : "border-slate-200 dark:border-slate-700"
        } pt-6 mb-6`}
      >
        <div
          className={`text-sm font-semibold mb-1 ${
            isSelected ? "" : "text-slate-900 dark:text-slate-300"
          }`}
        >
          STARTING AT
        </div>
        <div className="flex items-end gap-2">
          <span
            className={`text-4xl font-bold ${
              isSelected ? "" : "text-slate-900 dark:text-white"
            }`}
          >
            {price}
          </span>
          <span
            className={`text-sm mb-1 opacity-80 ${
              isSelected ? "" : "text-slate-600 dark:text-slate-300"
            }`}
          >
            {priceSubtext}
          </span>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRequestTalent();
        }}
        className={`relative w-full py-3 rounded-full font-bold overflow-hidden transition-all duration-300 group-hover:scale-105 ${
          isHovered ? "scale-105" : ""
        }`}
      >
        <div
          className={`absolute inset-0 ${
            isSelected
              ? "bg-white dark:bg-[#004F7F]"
              : "bg-[#004F7F] dark:bg-[#ECC600]"
          }`}
        ></div>
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            isSelected
              ? "bg-[#ECC600] dark:bg-white"
              : "bg-[#ECC600] dark:bg-white"
          }`}
          style={{
            transform: isHovered ? "translateY(0%)" : "translateY(100%)",
          }}
        />
        <span
          className={`relative z-10 ${
            isSelected
              ? "text-[#004F7F] dark:text-[#ECC600]"
              : "text-white dark:text-[#004F7F]"
          }`}
        >
          Request Talent
        </span>
      </button>
    </div>
  );
};

// Benefit Card Component
const BenefitCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300 hover:scale-105 transition-transform duration-300 cursor-pointer group">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-[#004F7F]/10 dark:bg-[#004F7F]/20 flex items-center justify-center text-[#004F7F] dark:text-[#004F7F] group-hover:bg-[#004F7F]/20 dark:group-hover:bg-[#004F7F]/30 transition-colors duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

// Process Step Component
const ProcessStep = ({ number, title, description }) => {
  return (
    <div className="text-center group cursor-pointer">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-[#004F7F] dark:bg-[#ECC600] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl font-bold text-white dark:text-[#004F7F]">
            {number}
          </span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#004F7F] dark:group-hover:text-[#ECC600] transition-colors duration-300">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

// Pricing Card Component
const PricingCard = ({
  badge,
  title,
  subtitle,
  price,
  period,
  features,
  buttonText,
  isSelected,
  onClick,
  onButtonClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-2xl p-8 transition-all duration-300 hover:shadow-xl cursor-pointer group ${
        isSelected
          ? "bg-[#004F7F] dark:bg-[#ECC600] text-white dark:text-[#004F7F] border-2 border-[#004F7F] dark:border-[#ECC600] transform scale-105"
          : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#004F7F]/30 dark:hover:border-[#ECC600]/30"
      }`}
    >
      {/* Show badge if it exists */}
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-[#ECC600] dark:bg-[#004F7F] text-[#004F7F] dark:text-[#ECC600] text-xs font-bold px-4 py-1 rounded-full">
            {badge}
          </span>
        </div>
      )}

      <h3
        className={`text-2xl font-bold mb-2 ${
          isSelected ? "" : "text-slate-900 dark:text-white"
        }`}
      >
        {title}
      </h3>

      <p
        className={`mb-6 text-sm ${
          isSelected
            ? "text-white/80 dark:text-[#004F7F]/80"
            : "text-slate-600 dark:text-slate-400"
        }`}
      >
        {subtitle}
      </p>

      <div className="mb-6">
        <div className="flex items-end gap-2">
          <span
            className={`text-4xl font-bold ${
              isSelected ? "" : "text-slate-900 dark:text-white"
            }`}
          >
            {price}
          </span>
          {period && (
            <span
              className={`text-sm mb-1 opacity-80 ${
                isSelected ? "" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {period}
            </span>
          )}
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li
            key={i}
            className={`flex items-center gap-3 ${
              isSelected ? "" : "text-slate-700 dark:text-slate-300"
            }`}
          >
            <svg
              className={`w-5 h-5 ${
                isSelected
                  ? "text-white dark:text-[#004F7F]"
                  : "text-[#004F7F] dark:text-[#ECC600]"
              }`}
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
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onButtonClick();
        }}
        className={`relative w-full py-3 rounded-full font-bold overflow-hidden transition-all duration-300 group-hover:scale-105 ${
          isHovered ? "scale-105" : ""
        }`}
      >
        <div
          className={`absolute inset-0 ${
            isSelected
              ? "bg-white dark:bg-[#004F7F]"
              : "bg-[#004F7F] dark:bg-[#ECC600]"
          }`}
        ></div>
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            isSelected
              ? "bg-[#ECC600] dark:bg-white"
              : "bg-[#ECC600] dark:bg-white"
          }`}
          style={{
            transform: isHovered ? "translateY(0%)" : "translateY(100%)",
          }}
        />
        <span
          className={`relative z-10 ${
            isSelected
              ? "text-[#004F7F] dark:text-[#ECC600]"
              : "text-white dark:text-[#004F7F]"
          }`}
        >
          {buttonText}
        </span>
      </button>
    </div>
  );
};

export default Services;
