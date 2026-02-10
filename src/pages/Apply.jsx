import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { ReactMediaRecorder } from "react-media-recorder";
// Toast Component
const Toast = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 left-1/2 z-[9999]  z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-down ${
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

const Apply = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // EmailJS Configuration
  const EMAILJS_SERVICE_ID = "service_uppgg2j";
  const EMAILJS_TEMPLATE_ID = "template_m1z18ca";
  const EMAILJS_PUBLIC_KEY = "1_WK7wG-r7N-xLeCE";

  // Handle URL parameters for pre-selection
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const role = params.get("role");
    if (role) {
      if (role === "va") setSelectedRole("virtual-assistant");
      else if (role === "designer") setSelectedRole("web-designer");
      else if (role === "developer") setSelectedRole("web-developer");
    }
  }, [location]);

  // Reset form when role changes
  useEffect(() => {
    setFormData({});
  }, [selectedRole]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const currentValues = formData[name] || [];
      if (checked) {
        setFormData((prev) => ({
          ...prev,
          [name]: [...currentValues, value],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: currentValues.filter((v) => v !== value),
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRole) {
      setToast({
        message: "Please select a position to apply for",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let voiceRecordingURL = "";

      // Upload voice recording to Cloudinary if it exists
      if (formData.voiceRecording) {
        const cloudinaryFormData = new FormData();
        cloudinaryFormData.append("file", formData.voiceRecording);
        cloudinaryFormData.append("upload_preset", "voice-recordings");
        cloudinaryFormData.append("resource_type", "video");

        try {
          const cloudinaryResponse = await fetch(
            "https://api.cloudinary.com/v1_1/dz3trjfj7/upload",
            {
              method: "POST",
              body: cloudinaryFormData,
            },
          );

          const cloudinaryData = await cloudinaryResponse.json();
          voiceRecordingURL = cloudinaryData.secure_url;
          console.log("Voice recording uploaded:", voiceRecordingURL);
        } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError);
          setToast({
            message: "Failed to upload voice recording. Please try again.",
            type: "error",
          });
          setIsSubmitting(false);
          return;
        }
      }

      // Format the application data nicely for email
      let formattedData = "";

      // Format arrays nicely
      Object.entries(formData).forEach(([key, value]) => {
        const label = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());

        if (key === "voiceRecording") {
          // Skip the blob, we'll add the URL separately
          return;
        }

        if (Array.isArray(value)) {
          formattedData += `${label}:\n${value.map((v) => `  • ${v}`).join("\n")}\n\n`;
        } else if (value && typeof value === "object" && value.name) {
          // Handle file objects
          formattedData += `${label}: ${value.name}\n`;
        } else if (value) {
          formattedData += `${label}: ${value}\n`;
        }
      });

      // Add voice recording URL if it exists
      if (voiceRecordingURL) {
        formattedData += `\nVoice Recording: ${voiceRecordingURL}\n`;
      }

      // Prepare template parameters for EmailJS
      const templateParams = {
        position: selectedRole.replace("-", " ").toUpperCase(),
        applicant_name: formData.fullName || "Not provided",
        applicant_email: formData.email || "Not provided",
        applicant_phone: formData.phone || "Not provided",
        applicant_location: formData.location || "Not provided",
        voice_recording_url: voiceRecordingURL || "Not provided",
        full_application: formattedData,
        timestamp: new Date().toLocaleString(),
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
        message:
          "Your application has been submitted successfully! Redirecting...",
        type: "success",
      });

      // Reset form
      setFormData({});
      setSelectedRole("");

      // Redirect to thank you page after 2 seconds
      setTimeout(() => {
        navigate("/thank-you?type=applicant");
      }, 3000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setToast({
        message:
          "Failed to submit your application. Please try again or email us directly at virtuogrowthpartners@gmail.com",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormFields = () => {
    if (!selectedRole) return null;

    switch (selectedRole) {
      case "virtual-assistant":
        return (
          <VirtualAssistantForm
            formData={formData}
            onChange={handleInputChange}
          />
        );
      case "web-designer":
        return (
          <WebDesignerForm formData={formData} onChange={handleInputChange} />
        );
      case "web-developer":
        return (
          <WebDeveloperForm formData={formData} onChange={handleInputChange} />
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-900 pt-32 pb-16 px-6">
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
            Join Our Talent Pool
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Become part of our elite network of remote professionals and get
            matched with exciting opportunities from top companies.
          </p>
        </div>

        {/* Role Selection */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 mb-8">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Select Position You're Applying For *
          </label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full px-4 py-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors text-lg"
            required
          >
            <option value="">-- Choose a position --</option>
            <option value="virtual-assistant">Virtual Assistant</option>
            <option value="web-designer">Web Designer</option>
            <option value="web-developer">Web Developer</option>
          </select>
        </div>

        {/* Application Form */}
        {selectedRole && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {renderFormFields()}

              {/* Submit Button */}
              <div className="pt-8 border-t border-slate-200 dark:border-slate-700 flex flex-col items-center">
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
                    {isSubmitting
                      ? "Submitting Application..."
                      : "Submit Application"}
                  </span>
                </button>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 text-center md:text-left">
                  By submitting, you agree to our Terms of Service and Privacy
                  Policy. We'll review your application within 3-5 business
                  days.
                </p>
              </div>
            </form>
          </div>
        )}

        {/* Info Cards */}
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
              Vetted Opportunities
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Work with pre-screened, reputable companies
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
              Competitive Pay
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Earn competitive rates for your skills
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
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
              Ongoing Support
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Dedicated account manager for your success
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

// Voice Recording Component
const VoiceRecorder = ({ formData, onChange }) => {
  const [audioURL, setAudioURL] = useState(formData.voiceRecording || null);

  const handleStop = (blobUrl, blob) => {
    setAudioURL(blobUrl);
    // Store the blob in formData
    onChange({
      target: {
        name: "voiceRecording",
        value: blob,
      },
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
        Voice Sample
      </h3>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <div className="flex items-start gap-4 mb-4">
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
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
              Record Your Voice Sample *
            </h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Please record a short (30-second) introduction. Tell us who you
              are and why you’d be a great Virtual Assistant. This helps us
              assess your English communication skills, so please speak loudly
              and clearly (microphone quality can vary).
            </p>
          </div>
        </div>

        <ReactMediaRecorder
          audio
          onStop={handleStop}
          render={({ status, startRecording, stopRecording }) => (
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={startRecording}
                  disabled={status === "recording"}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-full font-medium transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {status === "recording" ? "Recording..." : "Start Recording"}
                </button>

                <button
                  type="button"
                  onClick={stopRecording}
                  disabled={status !== "recording"}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white rounded-full font-medium transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Stop
                </button>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400">
                Status: <span className="font-semibold">{status}</span>
              </p>

              {audioURL && (
                <div className="w-full bg-white dark:bg-slate-800 p-4 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Your recording (click to play):
                  </p>
                  <audio src={audioURL} controls className="w-full" />
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setAudioURL(null);
                        onChange({
                          target: {
                            name: "voiceRecording",
                            value: null,
                          },
                        });
                      }}
                      className="mt-3 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium transition-colors"
                    >
                      Delete and re-record
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

// Virtual Assistant Form Component
const VirtualAssistantForm = ({ formData, onChange }) => {
  return (
    <>
      {/* Personal Information */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
          Personal Information
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
              placeholder="Jane Doe"
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
              value={formData.email || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
              placeholder="email@example.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Location (City, Country) *
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
              placeholder="City, Country"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            LinkedIn Profile URL
          </label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin || ""}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>
      </div>

      {/* Professional Background */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
          Professional Background
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Years of Experience *
            </label>
            <select
              name="experience"
              required
              value={formData.experience || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
            >
              <option value="">Select years</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5+ years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Current Employment Status *
            </label>
            <select
              name="employmentStatus"
              required
              value={formData.employmentStatus || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
            >
              <option value="">Select status</option>
              <option value="employed">Employed</option>
              <option value="freelancing">Freelancing</option>
              <option value="unemployed">Unemployed</option>
              <option value="student">Student</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Availability *
            </label>
            <select
              name="availability"
              required
              value={formData.availability || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
            >
              <option value="">Select availability</option>
              <option value="full-time">Full-time (40 hrs/week)</option>
              <option value="part-time">Part-time (20 hrs/week)</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              English Proficiency *
            </label>
            <select
              name="englishLevel"
              required
              value={formData.englishLevel || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
            >
              <option value="">Select level</option>
              <option value="native">Native</option>
              <option value="fluent">Fluent</option>
              <option value="advanced">Advanced</option>
              <option value="intermediate">Intermediate</option>
            </select>
          </div>
        </div>
      </div>

      {/* Skills & Tools */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
          Skills & Tools
        </h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Administrative Tools (Check all that apply) *
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Google Workspace",
              "Microsoft Office",
              "Asana/Trello/Monday",
              "CRM Software",
              "Slack/Zoom/Teams",
              "Social Media Tools",
            ].map((tool) => (
              <label
                key={tool}
                className="flex items-center gap-2 text-slate-700 dark:text-slate-300"
              >
                <input
                  type="checkbox"
                  name="tools"
                  value={tool}
                  checked={formData.tools?.includes(tool) || false}
                  onChange={onChange}
                  className="w-4 h-4 text-[#004F7F] border-slate-300 rounded focus:ring-[#004F7F]"
                />
                {tool}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Tasks You Have Experience With (Check all that apply) *
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Email Management",
              "Calendar Scheduling",
              "Data Entry",
              "Customer Service",
              "Travel Arrangements",
              "Social Media Management",
              "Basic Bookkeeping",
              "Research",
            ].map((task) => (
              <label
                key={task}
                className="flex items-center gap-2 text-slate-700 dark:text-slate-300"
              >
                <input
                  type="checkbox"
                  name="tasks"
                  value={task}
                  checked={formData.tasks?.includes(task) || false}
                  onChange={onChange}
                  className="w-4 h-4 text-[#004F7F] border-slate-300 rounded focus:ring-[#004F7F]"
                />
                {task}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Description */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Describe Your Most Relevant VA Experience (2-3 sentences) *
        </label>
        <textarea
          name="experienceDescription"
          required
          rows={4}
          value={formData.experienceDescription || ""}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors resize-none"
          placeholder="Tell us about your most relevant experience as a Virtual Assistant..."
        />
      </div>

      {/* Technical Setup */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
          Technical Setup
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Reliable Internet Connection? *
            </label>
            <select
              name="internet"
              required
              value={formData.internet || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
            >
              <option value="">Select option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Dedicated Workspace? *
            </label>
            <select
              name="workspace"
              required
              value={formData.workspace || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
            >
              <option value="">Select option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      </div>

      {/* Expectations */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
          Availability & Expectations
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              How Soon Can You Start? *
            </label>
            <select
              name="startDate"
              required
              value={formData.startDate || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
            >
              <option value="">Select timeframe</option>
              <option value="immediately">Immediately</option>
              <option value="1-week">Within 1 week</option>
              <option value="2-weeks">Within 2 weeks</option>
              <option value="1-month">Within 1 month</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Expected Hourly Rate (USD) *
            </label>
            <input
              type="number"
              name="hourlyRate"
              required
              value={formData.hourlyRate || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
              placeholder="15"
              min="1"
            />
          </div>
        </div>
      </div>

      {/* Scenario Question */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Scenario: A client emails you at 9 PM asking for an urgent task to be
          completed by tomorrow morning. How would you handle this? *
        </label>
        <textarea
          name="scenarioAnswer"
          required
          rows={4}
          value={formData.scenarioAnswer || ""}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors resize-none"
          placeholder="Describe how you would handle this situation..."
        />
      </div>
      <VoiceRecorder formData={formData} onChange={onChange} />

      {/* Resume URL */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Resume/CV URL (Google Drive, Dropbox, etc.) *
        </label>
        <input
          type="url"
          name="resumeUrl"
          required
          value={formData.resumeUrl || ""}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
          placeholder="https://drive.google.com/file/..."
        />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          💡 Upload your resume to Google Drive or Dropbox, then paste the
          shareable link here. Make sure it's set to "Anyone with the link can
          view".
        </p>
      </div>
    </>
  );
};

// Web Designer Form Component
const WebDesignerForm = ({ formData, onChange }) => {
  return (
    <>
      {/* Personal Information */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
          Personal Information
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
              placeholder="Jane Doe"
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
              value={formData.email || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
              placeholder="email@example.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Location (City, Country) *
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
              placeholder="City, Country"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Portfolio Website URL *
          </label>
          <input
            type="url"
            name="portfolio"
            required
            value={formData.portfolio || ""}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
            placeholder="https://yourportfolio.com"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Behance/Dribbble Profile
            </label>
            <input
              type="url"
              name="designProfile"
              value={formData.designProfile || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
              placeholder="https://behance.net/yourprofile"
            />
          </div>
        </div>
      </div>

      {/* Professional Background */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
          Professional Background
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Years of Design Experience *
            </label>
            <select
              name="experience"
              required
              value={formData.experience || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
            >
              <option value="">Select years</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5+ years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Current Employment Status *
            </label>
            <select
              name="employmentStatus"
              required
              value={formData.employmentStatus || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
            >
              <option value="">Select status</option>
              <option value="employed">Employed</option>
              <option value="freelancing">Freelancing</option>
              <option value="unemployed">Unemployed</option>
              <option value="student">Student</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Availability *
            </label>
            <select
              name="availability"
              required
              value={formData.availability || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
            >
              <option value="">Select availability</option>
              <option value="full-time">Full-time (40 hrs/week)</option>
              <option value="part-time">Part-time (20 hrs/week)</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              English Proficiency *
            </label>
            <select
              name="englishLevel"
              required
              value={formData.englishLevel || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
            >
              <option value="">Select level</option>
              <option value="native">Native</option>
              <option value="fluent">Fluent</option>
              <option value="advanced">Advanced</option>
              <option value="intermediate">Intermediate</option>
            </select>
          </div>
        </div>
      </div>

      {/* Design Skills */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
          Design Skills & Tools
        </h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Design Tools You're Proficient In (Check all that apply) *
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Figma",
              "Adobe XD",
              "Sketch",
              "Adobe Photoshop",
              "Adobe Illustrator",
              "Webflow",
              "Framer",
            ].map((tool) => (
              <label
                key={tool}
                className="flex items-center gap-2 text-slate-700 dark:text-slate-300"
              >
                <input
                  type="checkbox"
                  name="designTools"
                  value={tool}
                  checked={formData.designTools?.includes(tool) || false}
                  onChange={onChange}
                  className="w-4 h-4 text-[#004F7F] border-slate-300 rounded focus:ring-[#004F7F]"
                />
                {tool}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Design Areas You're Strongest In (Check all that apply) *
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "UI/UX Design",
              "Web Design",
              "Mobile App Design",
              "Responsive Design",
              "Landing Pages",
              "Wireframing & Prototyping",
              "Brand Identity",
              "Graphic Design",
            ].map((area) => (
              <label
                key={area}
                className="flex items-center gap-2 text-slate-700 dark:text-slate-300"
              >
                <input
                  type="checkbox"
                  name="designAreas"
                  value={area}
                  checked={formData.designAreas?.includes(area) || false}
                  onChange={onChange}
                  className="w-4 h-4 text-[#004F7F] border-slate-300 rounded focus:ring-[#004F7F]"
                />
                {area}
              </label>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Familiar with HTML/CSS? *
            </label>
            <select
              name="htmlCss"
              required
              value={formData.htmlCss || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
            >
              <option value="">Select option</option>
              <option value="proficient">Yes, proficient</option>
              <option value="basic">Yes, basic knowledge</option>
              <option value="no">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Projects Completed *
            </label>
            <select
              name="projectsCompleted"
              required
              value={formData.projectsCompleted || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
            >
              <option value="">Select range</option>
              <option value="1-5">1-5</option>
              <option value="6-15">6-15</option>
              <option value="16-30">16-30</option>
              <option value="30+">30+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Portfolio Projects */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Share 2-3 of Your Best Projects (Include URLs and brief descriptions)
          *
        </label>
        <textarea
          name="portfolioProjects"
          required
          rows={6}
          value={formData.portfolioProjects || ""}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors resize-none"
          placeholder="Project 1: [URL] - Brief description of your role and the project&#10;Project 2: [URL] - Brief description...&#10;Project 3: [URL] - Brief description..."
        />
      </div>

      {/* Design Process */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Describe Your Design Process from Brief to Final Deliverable (3-5
          sentences) *
        </label>
        <textarea
          name="designProcess"
          required
          rows={5}
          value={formData.designProcess || ""}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors resize-none"
          placeholder="Explain your typical workflow when taking on a new design project..."
        />
      </div>

      {/* Expectations */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
          Availability & Expectations
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              How Soon Can You Start? *
            </label>
            <select
              name="startDate"
              required
              value={formData.startDate || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
            >
              <option value="">Select timeframe</option>
              <option value="immediately">Immediately</option>
              <option value="1-week">Within 1 week</option>
              <option value="2-weeks">Within 2 weeks</option>
              <option value="1-month">Within 1 month</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Expected Hourly Rate (USD) *
            </label>
            <input
              type="number"
              name="hourlyRate"
              required
              value={formData.hourlyRate || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
              placeholder="35"
              min="1"
            />
          </div>
        </div>
      </div>

      {/* Design Challenge */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          If a client asks you to design a landing page for a new productivity
          app, what would be your first 3 questions for them? *
        </label>
        <textarea
          name="designChallenge"
          required
          rows={4}
          value={formData.designChallenge || ""}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors resize-none"
          placeholder="List your first 3 questions..."
        />
      </div>

      {/* Resume URL */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Resume/CV URL (Google Drive, Dropbox, etc.) *
        </label>
        <input
          type="url"
          name="resumeUrl"
          required
          value={formData.resumeUrl || ""}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
          placeholder="https://drive.google.com/file/..."
        />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          💡 Upload your resume to Google Drive or Dropbox, then paste the
          shareable link here. Make sure it's set to "Anyone with the link can
          view".
        </p>
      </div>
    </>
  );
};

// Web Developer Form Component
const WebDeveloperForm = ({ formData, onChange }) => {
  return (
    <>
      {/* Personal Information */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
          Personal Information
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
              placeholder="Jane Doe"
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
              value={formData.email || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
              placeholder="email@example.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Location (City, Country) *
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
              placeholder="City, Country"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            GitHub Profile URL *
          </label>
          <input
            type="url"
            name="github"
            required
            value={formData.github || ""}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
            placeholder="https://github.com/yourusername"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Portfolio Website URL
            </label>
            <input
              type="url"
              name="portfolio"
              value={formData.portfolio || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
              placeholder="https://yourportfolio.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
        </div>
      </div>

      {/* Professional Background */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
          Professional Background
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Years of Development Experience *
            </label>
            <select
              name="experience"
              required
              value={formData.experience || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
            >
              <option value="">Select years</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5+ years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Developer Type *
            </label>
            <select
              name="developerType"
              required
              value={formData.developerType || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
            >
              <option value="">Select type</option>
              <option value="frontend">Frontend Developer</option>
              <option value="backend">Backend Developer</option>
              <option value="fullstack">Full-Stack Developer</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Current Employment Status *
            </label>
            <select
              name="employmentStatus"
              required
              value={formData.employmentStatus || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
            >
              <option value="">Select status</option>
              <option value="employed">Employed</option>
              <option value="freelancing">Freelancing</option>
              <option value="unemployed">Unemployed</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Availability *
            </label>
            <select
              name="availability"
              required
              value={formData.availability || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
            >
              <option value="">Select availability</option>
              <option value="full-time">Full-time (40 hrs/week)</option>
              <option value="part-time">Part-time (20 hrs/week)</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            English Proficiency *
          </label>
          <select
            name="englishLevel"
            required
            value={formData.englishLevel || ""}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
          >
            <option value="">Select level</option>
            <option value="native">Native</option>
            <option value="fluent">Fluent</option>
            <option value="advanced">Advanced</option>
            <option value="intermediate">Intermediate</option>
          </select>
        </div>
      </div>

      {/* Technical Skills */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
          Technical Skills
        </h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Frontend Technologies (Check all that apply) *
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "HTML/CSS",
              "JavaScript (ES6+)",
              "React",
              "Vue.js",
              "Angular",
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
            ].map((tech) => (
              <label
                key={tech}
                className="flex items-center gap-2 text-slate-700 dark:text-slate-300"
              >
                <input
                  type="checkbox"
                  name="frontendTech"
                  value={tech}
                  checked={formData.frontendTech?.includes(tech) || false}
                  onChange={onChange}
                  className="w-4 h-4 text-[#004F7F] border-slate-300 rounded focus:ring-[#004F7F]"
                />
                {tech}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Backend Technologies (Check all that apply or N/A)
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Node.js",
              "Python (Django/Flask)",
              "PHP (Laravel)",
              "Ruby on Rails",
              "Java (Spring Boot)",
              ".NET/C#",
              "N/A - Frontend Only",
            ].map((tech) => (
              <label
                key={tech}
                className="flex items-center gap-2 text-slate-700 dark:text-slate-300"
              >
                <input
                  type="checkbox"
                  name="backendTech"
                  value={tech}
                  checked={formData.backendTech?.includes(tech) || false}
                  onChange={onChange}
                  className="w-4 h-4 text-[#004F7F] border-slate-300 rounded focus:ring-[#004F7F]"
                />
                {tech}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Databases (Check all that apply) *
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "MySQL",
              "PostgreSQL",
              "MongoDB",
              "Firebase",
              "Redis",
              "SQLite",
            ].map((db) => (
              <label
                key={db}
                className="flex items-center gap-2 text-slate-700 dark:text-slate-300"
              >
                <input
                  type="checkbox"
                  name="databases"
                  value={db}
                  checked={formData.databases?.includes(db) || false}
                  onChange={onChange}
                  className="w-4 h-4 text-[#004F7F] border-slate-300 rounded focus:ring-[#004F7F]"
                />
                {db}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Tools & Platforms (Check all that apply) *
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Git/GitHub",
              "Docker",
              "AWS",
              "Google Cloud",
              "Vercel/Netlify",
              "REST APIs",
              "GraphQL",
            ].map((tool) => (
              <label
                key={tool}
                className="flex items-center gap-2 text-slate-700 dark:text-slate-300"
              >
                <input
                  type="checkbox"
                  name="toolsPlatforms"
                  value={tool}
                  checked={formData.toolsPlatforms?.includes(tool) || false}
                  onChange={onChange}
                  className="w-4 h-4 text-[#004F7F] border-slate-300 rounded focus:ring-[#004F7F]"
                />
                {tool}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Projects Completed *
          </label>
          <select
            name="projectsCompleted"
            required
            value={formData.projectsCompleted || ""}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
          >
            <option value="">Select range</option>
            <option value="1-5">1-5</option>
            <option value="6-15">6-15</option>
            <option value="16-30">16-30</option>
            <option value="30+">30+</option>
          </select>
        </div>
      </div>

      {/* Projects */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Share 2-3 of Your Best Projects (Include live URLs or GitHub repos and
          brief descriptions) *
        </label>
        <textarea
          name="projects"
          required
          rows={6}
          value={formData.projects || ""}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors resize-none"
          placeholder="Project 1: [URL/GitHub] - Brief description of your role and tech stack&#10;Project 2: [URL/GitHub] - Brief description...&#10;Project 3: [URL/GitHub] - Brief description..."
        />
      </div>

      {/* Development Practices */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          How do you approach debugging and problem-solving? (2-3 sentences) *
        </label>
        <textarea
          name="problemSolving"
          required
          rows={4}
          value={formData.problemSolving || ""}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors resize-none"
          placeholder="Describe your debugging process and problem-solving approach..."
        />
      </div>

      {/* Expectations */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
          Availability & Expectations
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              How Soon Can You Start? *
            </label>
            <select
              name="startDate"
              required
              value={formData.startDate || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
            >
              <option value="">Select timeframe</option>
              <option value="immediately">Immediately</option>
              <option value="1-week">Within 1 week</option>
              <option value="2-weeks">Within 2 weeks</option>
              <option value="1-month">Within 1 month</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Expected Hourly Rate (USD) *
            </label>
            <input
              type="number"
              name="hourlyRate"
              required
              value={formData.hourlyRate || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
              placeholder="50"
              min="1"
            />
          </div>
        </div>
      </div>

      {/* Coding Challenge */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Explain how you would optimize the performance of a slow-loading web
          application. What would you check first? (3-5 sentences) *
        </label>
        <textarea
          name="codingChallenge"
          required
          rows={5}
          value={formData.codingChallenge || ""}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors resize-none"
          placeholder="Describe your approach to performance optimization..."
        />
      </div>

      {/* Resume URL */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Resume/CV URL (Google Drive, Dropbox, etc.) *
        </label>
        <input
          type="url"
          name="resumeUrl"
          required
          value={formData.resumeUrl || ""}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#004F7F] dark:focus:ring-[#ECC600] focus:border-transparent transition-colors"
          placeholder="https://drive.google.com/file/..."
        />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          💡 Upload your resume to Google Drive or Dropbox, then paste the
          shareable link here. Make sure it's set to "Anyone with the link can
          view".
        </p>
      </div>
    </>
  );
};

export default Apply;
