import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import logo from "../images/logo.png";

// --- Theme Toggle Button ---
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  const [xy, setXY] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const hoverThreshold = 6;

  const handleMouseMove = (e) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setXY({
        x: (x / rect.width) * hoverThreshold,
        y: (y / rect.height) * hoverThreshold,
      });
    }
  };

  const handleMouseLeave = () => {
    setXY({ x: 0, y: 0 });
  };

  return (
    <button
      ref={ref}
      onClick={toggleTheme}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-14 h-7 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors duration-300 flex items-center px-1"
      style={{
        transform: `translate(${xy.x}px, ${xy.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
      aria-label="Toggle theme"
    >
      <div
        className={`w-5 h-5 rounded-full bg-[#004F7F] dark:bg-[#ECC600] shadow-md transform transition-transform duration-300 flex items-center justify-center ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <svg
            className="w-3 h-3 text-[#004F7F]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg
            className="w-3 h-3 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </button>
  );
};

// --- NavItem with Magnetic Hover ---
const NavItem = ({ item, activeLink, onClick }) => {
  const [xy, setXY] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const hoverThreshold = 10;
  const location = useLocation();

  const handleMouseMove = (e) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setXY({
        x: (x / rect.width) * hoverThreshold,
        y: (y / rect.height) * hoverThreshold,
      });
    }
  };

  const handleMouseLeave = () => {
    setXY({ x: 0, y: 0 });
  };

  const isActive = item.href.startsWith("/")
    ? location.pathname === item.href
    : activeLink === item.href;

  if (item.href.startsWith("/")) {
    return (
      <Link
        ref={ref}
        to={item.href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative px-4 py-2 text-sm font-bold tracking-tight transition-colors duration-300 group ${
          isActive
            ? "text-[#004F7F] dark:text-[#ECC600]"
            : "text-slate-700 dark:text-slate-300 hover:text-[#004F7F] dark:hover:text-[#ECC600]"
        }`}
      >
        <span
          className="block transition-transform duration-100 ease-out"
          style={{ transform: `translate(${xy.x}px, ${xy.y}px)` }}
        >
          {item.name}
        </span>
        <span
          className={`absolute bottom-0 left-1/2 w-1 h-1 bg-[#ECC600] rounded-full -translate-x-1/2 transition-all duration-300 ${
            isActive
              ? "opacity-100 bottom-1"
              : "opacity-0 group-hover:opacity-100 group-hover:bottom-1"
          }`}
        />
      </Link>
    );
  }

  return (
    <a
      ref={ref}
      href={item.href}
      onClick={(e) => {
        e.preventDefault();
        onClick(item.href);
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative px-4 py-2 text-sm font-bold tracking-tight transition-colors duration-300 group ${
        isActive
          ? "text-[#004F7F] dark:text-[#ECC600]"
          : "text-slate-700 dark:text-slate-300 hover:text-[#004F7F] dark:hover:text-[#ECC600]"
      }`}
    >
      <span
        className="block transition-transform duration-100 ease-out"
        style={{ transform: `translate(${xy.x}px, ${xy.y}px)` }}
      >
        {item.name}
      </span>
      <span
        className={`absolute bottom-0 left-1/2 w-1 h-1 bg-[#ECC600] rounded-full -translate-x-1/2 transition-all duration-300 ${
          isActive
            ? "opacity-100 bottom-1"
            : "opacity-0 group-hover:opacity-100 group-hover:bottom-1"
        }`}
      />
    </a>
  );
};

// --- Hire Talent Button with Water Fill Effect ---
const HireTalentButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/contact")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative ml-4 px-6 py-2 rounded-full text-sm font-bold overflow-hidden transition-all duration-300 active:scale-95"
    >
      <div className="absolute inset-0 bg-[#004F7F] dark:bg-[#ECC600]"></div>
      <div
        className="absolute inset-0 bg-[#ECC600] dark:bg-[#fff] transition-all duration-700 ease-out"
        style={{
          transform: isHovered ? "translateY(0%)" : "translateY(100%)",
        }}
      />
      <span className="relative z-10 text-white dark:text-[#004F7F]">
        Hire Talent
      </span>
    </button>
  );
};

// --- Hamburger Menu Button Component with Animated X and Water Fill ---
const HamburgerButton = ({ isScrolled, isMenuOpen, onClick }) => {
  const [xy, setXY] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const hoverThreshold = 8;

  const handleMouseMove = (e) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setXY({
        x: (x / rect.width) * hoverThreshold,
        y: (y / rect.height) * hoverThreshold,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setXY({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`fixed top-8 right-8 z-[60] w-20 h-20 rounded-full bg-[#004F7F] dark:bg-slate-800 border border-[#003F66] dark:border-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-105 overflow-hidden focus:outline-none focus:ring-0 focus-visible:ring-0 ${
        isScrolled
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none md:opacity-0 md:pointer-events-none"
      }`}
      style={{
        transform: `translate(${xy.x}px, ${xy.y}px)`,
        transition: "transform 0.1s ease-out, opacity 0.3s, scale 0.3s",
      }}
      aria-label="Toggle menu"
    >
      <div
        className="absolute inset-0 bg-[#ECC600] transition-all duration-700 ease-out"
        style={{
          transform: isHovered ? "translateY(0%)" : "translateY(100%)",
        }}
      />
      <div className="relative z-10 w-10 h-10 flex flex-col items-center justify-center">
        <span
          className={`block w-8 h-0.5 bg-white transition-all duration-300 ease-in-out ${
            isMenuOpen ? "rotate-45 translate-y-[1px]" : "-translate-y-1.5"
          }`}
        />
        <span
          className={`block w-8 h-0.5 bg-white transition-all duration-300 ease-in-out ${
            isMenuOpen ? "-rotate-45 -translate-y-[1px]" : "translate-y-1.5"
          }`}
        />
      </div>
    </button>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const navigate = useNavigate();
  const location = useLocation();

  // UPDATED: Added /about to navItems
  const navItems = [
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" }, // Changed from #about to /about
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // FIXED: Remove the useEffect that causes the warning
  // The NavItem component already uses location.pathname for active state
  // So we don't need to setActiveLink based on location changes

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (href) => {
    setActiveLink(href);
    setIsMenuOpen(false);

    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 md:px-12  flex justify-between items-center ${
          isScrolled ? "opacity-0 pointer-events-none" : "bg-transparent"
        }`}
      >
        <Link to="/" className="flex items-center -mt-2">
          <img
            src={logo}
            alt="Virtuo"
            className="h-34 md:h-36 w-auto transition-all duration-300 hover:scale-105"
          />
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <NavItem
              key={item.name}
              item={item}
              activeLink={activeLink}
              onClick={handleNavClick}
            />
          ))}
          <ThemeToggle />
          <HireTalentButton />
        </div>
      </nav>

      <HamburgerButton
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        onClick={toggleMenu}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[600px] bg-[#004F7F] dark:bg-slate-800 z-50 transform transition-all duration-500 ease-in-out overflow-hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          borderTopLeftRadius: isMenuOpen ? "0px" : "50%",
          borderBottomLeftRadius: isMenuOpen ? "0px" : "50%",
        }}
      >
        <div className="flex flex-col h-full justify-between p-12 md:p-16">
          <div className="absolute top-8 left-8">
            <ThemeToggle />
          </div>

          <div className="flex-grow flex flex-col justify-center">
            <p className="text-[#ECC600] text-xs font-black tracking-[0.3em] uppercase mb-8">
              Navigation
            </p>
            <nav>
              <ul className="space-y-4">
                {navItems.map((item) => {
                  const isActive = item.href.startsWith("/")
                    ? location.pathname === item.href
                    : activeLink === item.href;

                  if (item.href.startsWith("/")) {
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`text-5xl md:text-6xl font-light transition-colors duration-300 block ${
                            isActive
                              ? "text-[#ECC600]"
                              : "text-white hover:text-[#ECC600]"
                          }`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        className={`text-5xl md:text-6xl font-light transition-colors duration-300 block ${
                          isActive
                            ? "text-[#ECC600]"
                            : "text-white hover:text-[#ECC600]"
                        }`}
                      >
                        {item.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="mt-auto border-t border-white/10 pt-8">
            <p className="text-white/50 text-xs mb-4 tracking-wider">SOCIALS</p>
            <div className="flex gap-6 font-bold text-white">
              <a href="#" className="transition-colors hover:text-[#ECC600]">
                LinkedIn
              </a>
              <a href="#" className="transition-colors hover:text-[#ECC600]">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={toggleMenu} />
      )}
    </>
  );
};

export default Navbar;
