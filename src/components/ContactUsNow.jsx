import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * ContactUsNow - A reusable button component with water fill effect
 *
 * Props:
 * @param {string} to - The route to navigate to (default: "/contact")
 * @param {string} text - Button text (default: "Contact Us Now")
 * @param {string} className - Additional CSS classes
 * @param {function} onClick - Custom click handler (overrides navigation)
 * @param {object} style - Additional inline styles
 * @param {boolean} disabled - Disable the button
 * @param {string} baseColor - Base background color (default: "#ECC600")
 * @param {string} hoverColor - Water fill color (default: "#fff")
 * @param {string} textColor - Text color (default: "#004F7F")
 * @param {string} size - Button size: "sm", "md" (default), or "lg"
 */

const ContactUsNow = ({
  to = "/contact",
  text = "Contact Us Now",
  className = "",
  onClick,
  style = {},
  disabled = false,
  baseColor = "#ECC600",
  hoverColor = "#fff",
  textColor = "#004F7F",
  size = "md",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Size presets
  const sizeClasses = {
    sm: "px-6 py-3 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg",
  };

  const handleClick = (e) => {
    if (disabled) return;

    if (onClick) {
      onClick(e);
    } else {
      navigate(to);
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
      disabled={disabled}
      className={`
        relative rounded-full font-bold overflow-hidden 
        transition-all duration-300 
        ${
          !disabled
            ? "hover:scale-105 active:scale-95"
            : "opacity-50 cursor-not-allowed"
        }
        ${sizeClasses[size]} 
        ${className}
      `}
      style={style}
    >
      {/* Base background */}
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{ backgroundColor: baseColor }}
      />

      {/* Water fill effect */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{
          backgroundColor: hoverColor,
          transform:
            isHovered && !disabled ? "translateY(0%)" : "translateY(100%)",
        }}
      />

      {/* Text */}
      <span
        className="relative z-10 font-semibold tracking-wide"
        style={{ color: textColor }}
      >
        {text}
      </span>
    </button>
  );
};

export default ContactUsNow;
