import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const handleFooterLinkClick = (href) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (href.includes("#")) {
      // Handle links with both route and hash (like /services#core-services)
      const [path, hash] = href.split("#");
      navigate(path);
      // Scroll to the section after navigation (with a small delay)
      setTimeout(() => {
        const element = document.querySelector(`#${hash}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      navigate(href);
    }
  };

  return (
    <footer
      ref={footerRef}
      className="bg-[#0a0a0a] text-white py-20 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Large Logo with Animation - Behind everything */}
        <div className="relative overflow-hidden h-[120px] sm:h-[160px] md:h-[220px] lg:h-[320px]">
          {/* Animated VIRTUO text */}
          <h2
            className="text-[80px] sm:text-[120px] md:text-[180px] lg:text-[280px] font-black tracking-tighter text-[#2a2a2a] leading-none transition-all duration-1000 ease-out absolute bottom-0 left-0"
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(100%)",
              opacity: isVisible ? 1 : 0,
            }}
          >
            VIRTUO<span className="text-[#2a2a2a]">.</span>
          </h2>
        </div>

        {/* Footer Columns - Left Aligned with Dotted Separators - On top with background */}
        <div className="grid grid-cols-2 md:flex gap-8 md:gap-0 mb-16 border-t border-[#2a2a2a] pt-12 relative bg-[#0a0a0a]">
          {/* Column 1 - Platform */}
          <div className="md:w-64 md:pr-8 md:border-r md:border-dotted md:border-[#333]">
            <h3 className="text-[#666] text-xs font-bold tracking-widest uppercase mb-6">
              PLATFORM
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/services"
                  onClick={() => handleFooterLinkClick("/services")}
                  className="text-white/80 hover:text-[#ECC600] transition-colors text-sm block"
                >
                  Services
                </Link>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    handleFooterLinkClick("/about");
                  }}
                  className="text-white/80 hover:text-[#ECC600] transition-colors text-sm block"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => {
                    e.preventDefault();
                    handleFooterLinkClick("#how-it-works");
                  }}
                  className="text-white/80 hover:text-[#ECC600] transition-colors text-sm block"
                >
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 - Network */}
          <div className="md:w-64 md:px-8 md:border-r md:border-dotted md:border-[#333]">
            <h3 className="text-[#666] text-xs font-bold tracking-widest uppercase mb-6">
              NETWORK
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/services#core-services"
                  onClick={(e) => {
                    e.preventDefault();
                    handleFooterLinkClick("/services#core-services");
                  }}
                  className="text-white/80 hover:text-[#ECC600] transition-colors text-sm block"
                >
                  Virtual Assistants
                </a>
              </li>
              <li>
                <a
                  href="/services#core-services"
                  onClick={(e) => {
                    e.preventDefault();
                    handleFooterLinkClick("/services#core-services");
                  }}
                  className="text-white/80 hover:text-[#ECC600] transition-colors text-sm block"
                >
                  Web Designers
                </a>
              </li>
              <li>
                <a
                  href="/services#core-services"
                  onClick={(e) => {
                    e.preventDefault();
                    handleFooterLinkClick("/services#core-services");
                  }}
                  className="text-white/80 hover:text-[#ECC600] transition-colors text-sm block"
                >
                  Web Developers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - For Talent */}
          <div className="md:w-64 md:px-8 md:border-r md:border-dotted md:border-[#333]">
            <h3 className="text-[#666] text-xs font-bold tracking-widest uppercase mb-6">
              FOR TALENT
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/apply"
                  onClick={() => handleFooterLinkClick("/apply")}
                  className="text-white/80 hover:text-[#ECC600] transition-colors text-sm block"
                >
                  Join Our Network
                </Link>
              </li>
              <li>
                <Link
                  to="/apply?role=va"
                  onClick={() => handleFooterLinkClick("/apply?role=va")}
                  className="text-white/80 hover:text-[#ECC600] transition-colors text-sm block"
                >
                  Apply as VA
                </Link>
              </li>
              <li>
                <Link
                  to="/apply?role=designer"
                  onClick={() => handleFooterLinkClick("/apply?role=designer")}
                  className="text-white/80 hover:text-[#ECC600] transition-colors text-sm block"
                >
                  Apply as Designer
                </Link>
              </li>
              <li>
                <Link
                  to="/apply?role=developer"
                  onClick={() => handleFooterLinkClick("/apply?role=developer")}
                  className="text-white/80 hover:text-[#ECC600] transition-colors text-sm block"
                >
                  Apply as Developer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Reach Out */}
          {/* <div className="md:w-64 md:px-8 md:border-r md:border-dotted md:border-[#333]">
            <h3 className="text-[#666] text-xs font-bold tracking-widest uppercase mb-6">
              REACH OUT
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#blog"
                  onClick={(e) => {
                    e.preventDefault();
                    handleFooterLinkClick("#blog");
                  }}
                  className="text-white/80 hover:text-[#ECC600] transition-colors text-sm block"
                >
                  Blog
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={() => handleFooterLinkClick("/contact")}
                  className="text-white/80 hover:text-[#ECC600] transition-colors text-sm block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Column 5 - Socials */}
          <div className="md:w-64 md:px-8">
            <h3 className="text-[#666] text-xs font-bold tracking-widest uppercase mb-6">
              SOCIALS
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61586160104825"
                  className="text-white/80 hover:text-[#ECC600] transition-colors text-sm block"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/virtuogrowth-partners/"
                  className="text-white/80 hover:text-[#ECC600] transition-colors text-sm block"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#2a2a2a] text-sm text-white/50">
          <p>© Virtuo – 2026</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
