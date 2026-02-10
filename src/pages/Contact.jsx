import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const Toast = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 left-1/2 z-[9999] z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-down ${
        type === "success"
          ? "bg-green-500 dark:bg-green-600"
          : "bg-red-500 dark:bg-red-600"
      }`}
      style={{ willChange: "transform" }}
    >
      <span className="text-white text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-200 transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

const Contact = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    plan: "",
    message: "",
    estimatedPrice: "",
  });

  const [prefillInfo, setPrefillInfo] = useState({
    service: null,
    plan: null,
    estimatedPrice: null,
    source: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // EmailJS Configuration
  const EMAILJS_SERVICE_ID = "service_uppgg2j";
  const EMAILJS_TEMPLATE_ID = "template_kfonuxg";
  const EMAILJS_PUBLIC_KEY = "1_WK7wG-r7N-xLeCE";

  // Price mapping for calculations
  const priceMap = {
    "Virtual Assistants": 1200,
    "Web Designers": 2800,
    "Web Developers": 3500,
    "Part-Time": 1500,
    "Full-Time": 2800,
    Enterprise: 0,
  };

  // Extract prefill data from location state
  useEffect(() => {
    const prefillData = location.state || {};

    if (prefillData.service || prefillData.plan) {
      setPrefillInfo({
        service: prefillData.service || "",
        plan: prefillData.plan || "",
        estimatedPrice: prefillData.estimatedPrice || "",
        source: prefillData.source || "",
      });

      // Auto-populate form with prefill data
      let calculatedPrice = "";

      if (prefillData.service && prefillData.plan) {
        // Both service and plan selected
        const servicePrice = priceMap[prefillData.service] || 0;
        const planPrice = priceMap[prefillData.plan] || 0;
        calculatedPrice = `$${servicePrice + planPrice}/month`;
      } else if (prefillData.service) {
        // Only service selected
        calculatedPrice = `$${priceMap[prefillData.service] || "TBD"}/month`;
      } else if (prefillData.plan) {
        // Only plan selected
        calculatedPrice =
          prefillData.plan === "Enterprise"
            ? "Custom Quote"
            : `$${priceMap[prefillData.plan] || "TBD"}/month`;
      }

      setFormData((prev) => ({
        ...prev,
        service: prefillData.service || "",
        plan: prefillData.plan || "",
        estimatedPrice: calculatedPrice,
      }));
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateEstimatedPrice = () => {
    if (!formData.service && !formData.plan) return null;

    let price = 0;
    let description = "";

    if (formData.service && formData.plan) {
      const servicePrice = priceMap[formData.service] || 0;
      const planPrice = priceMap[formData.plan] || 0;
      price = servicePrice + planPrice;
      description = `${formData.service} (${formData.plan})`;
    } else if (formData.service) {
      price = priceMap[formData.service] || 0;
      description = formData.service;
    } else if (formData.plan) {
      price = priceMap[formData.plan] || 0;
      description = formData.plan;
    }

    if (formData.plan === "Enterprise") {
      return {
        price: "Custom Quote",
        description: "Enterprise Plan (Custom Pricing)",
      };
    }

    return { price: `$${price}/month`, description };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.service ||
      !formData.plan
    ) {
      setToast({
        message: "Please fill in all required fields",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || "Not provided",
        phone: formData.phone || "Not provided",
        service: formData.service,
        plan: formData.plan,
        estimated_price: formData.estimatedPrice || "Not calculated",
        message: formData.message || "No additional message",
        timestamp: new Date().toLocaleString(),
        source: prefillInfo.source || "Direct contact form",
      };

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      // Show success message
      setToast({
        message: "Your inquiry has been sent successfully! Redirecting...",
        type: "success",
      });

      // Reset form (keep pre-filled service and plan if they came from services page)
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
        service: prefillInfo.service || "",
        plan: prefillInfo.plan || "",
        estimatedPrice: formData.estimatedPrice || "",
      });

      // Redirect to thank you page after 2 seconds
      setTimeout(() => {
        navigate("/thank-you?type=client");
      }, 3000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setToast({
        message:
          "Failed to send your inquiry. Please try again or contact us directly.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const estimatedPriceInfo = calculateEstimatedPrice();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-900 pt-32 pb-16 px-6">
      {" "}
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Get Your Custom Quote
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Tell us about your needs and we'll match you with the perfect talent
            solution.
          </p>
        </div>

        {/* Prefill Notification */}
        {prefillInfo.service || prefillInfo.plan ? (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Personalized Form
                </h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  {prefillInfo.service && prefillInfo.plan ? (
                    <>
                      We've pre-filled your request for{" "}
                      <span className="font-semibold">
                        {prefillInfo.service}
                      </span>{" "}
                      with{" "}
                      <span className="font-semibold">{prefillInfo.plan}</span>{" "}
                      plan.
                    </>
                  ) : prefillInfo.service ? (
                    <>
                      We've pre-selected{" "}
                      <span className="font-semibold">
                        {prefillInfo.service}
                      </span>{" "}
                      based on your selection.
                    </>
                  ) : (
                    <>
                      We've pre-selected{" "}
                      <span className="font-semibold">{prefillInfo.plan}</span>{" "}
                      plan based on your selection.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {/* Price Estimate Card */}
        {estimatedPriceInfo && (
          <div className="bg-gradient-to-r from-[#004F7F] to-[#0066A5] dark:from-[#ECC600] dark:to-[#FFD700] rounded-xl p-6 mb-8 text-white dark:text-[#004F7F] shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">
                  Estimated Monthly Cost
                </p>
                <h3 className="text-3xl font-bold">
                  {estimatedPriceInfo.price}
                </h3>
                <p className="text-sm opacity-90 mt-1">
                  {estimatedPriceInfo.description}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="inline-flex items-center gap-2 bg-white/20 dark:bg-[#004F7F]/20 px-4 py-2 rounded-full">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="text-sm font-medium">
                    No commitment required
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Form */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
                  placeholder="Acme Inc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Service Selection */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Service Needed *
                </label>
                <select
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
                >
                  <option value="">Select a service</option>
                  <option value="Virtual Assistants">
                    Virtual Assistants ($1,200/month)
                  </option>
                  <option value="Web Designers">
                    Web Designers ($2,800/month)
                  </option>
                  <option value="Web Developers">
                    Web Developers ($3,500/month)
                  </option>
                  <option value="Multiple Services">
                    Multiple Services (Custom Quote)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Engagement Model *
                </label>
                <select
                  name="plan"
                  required
                  value={formData.plan}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
                >
                  <option value="">Select a plan</option>
                  <option value="Part-Time">
                    Part-Time (20hrs/week - $1,500/month)
                  </option>
                  <option value="Full-Time">
                    Full-Time (40hrs/week - $2,800/month)
                  </option>
                  <option value="Enterprise">Enterprise (Custom)</option>
                </select>
              </div>
            </div>

            {/* Estimated Price Display */}
            {estimatedPriceInfo && (
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Current Estimate
                    </p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {estimatedPriceInfo.price}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                      Based on {formData.service || "service"} with{" "}
                      {formData.plan || "plan"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Price Updates Live
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                      Change selections above
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Project Details */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Project Details / Additional Requirements
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your needs and we'll match you with the perfect talent solution. Include details about your project, timeline, specific skills needed, or any other requirements..."
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex flex-col items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative w-full md:w-auto px-8 py-4 rounded-full font-bold overflow-hidden transition-all duration-300 hover:scale-105 group border-2 border-[#004F7F] dark:border-[#ECC600] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-[#004F7F] dark:bg-[#ECC600]"></div>
                <div
                  className="absolute inset-0 bg-[#ECC600] dark:bg-white transition-all duration-700 ease-out"
                  style={{
                    transform: isHovered
                      ? "translateY(0%)"
                      : "translateY(100%)",
                  }}
                />
                <span className="relative z-10 text-white dark:text-[#004F7F]">
                  {isSubmitting ? "Sending..." : "Get Your Custom Quote"}
                </span>
              </button>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 text-center md:text-left">
                By submitting, you agree to our Terms of Service. We'll contact
                you within 24 hours.
              </p>
            </div>
          </form>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
              No Commitment
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Free consultation, no obligation to hire
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
              Fast Matching
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Get matched with qualified talent within 48 hours
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-purple-600 dark:text-purple-400"
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
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
              Dedicated Support
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Personal account manager for ongoing assistance
            </p>
          </div>
        </div>
      </div>
      <style>{`
  @keyframes slide-down {
    from {
      transform: translate(-50%, -100%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }
  .animate-slide-down {
    animation: slide-down 0.3s ease-out forwards;
  }
`}</style>
    </main>
  );
};

export default Contact;
