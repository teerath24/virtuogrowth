import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../ThemeContext";
import vaImg from "../images/VA.png";
import designerImg from "../images/designer.png";
import developerImg from "../images/developer.png";
import lightHeroImg from "../images/lightHero.jpg";
import darkHeroImg from "../images/darkHero.jpg";
import lightServiceImg from "../images/lightService.jpg";
import darkServiceImg from "../images/darkService.jpg";

const Home = () => {
  const scrollTextRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cardScrollProgress, setCardScrollProgress] = useState([0, 0, 0]);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTextRef.current) {
        const element = scrollTextRef.current;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const elementTop = rect.top;
        const elementHeight = rect.height;

        const progress = Math.max(
          0,
          Math.min(
            1,
            (windowHeight - elementTop) / (windowHeight + elementHeight)
          )
        );

        setScrollProgress(progress);
      }

      const cards = document.querySelectorAll("[data-card]");
      const newProgress = [0, 0, 0];

      cards.forEach((card, index) => {
        const nextCard = cards[index + 1];
        if (!nextCard) return;

        const rect = nextCard.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const start = windowHeight * 0.9;
        const end = windowHeight * 0.3;

        const progress = (start - rect.top) / (start - end);

        newProgress[index] = Math.max(0, Math.min(1, progress));
      });

      setCardScrollProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const text =
    "We connect your business with pre-vetted Virtual Assistants, Web Designers, and Web Developers. Skip the hiring hassle—get matched with top-tier professionals ready to scale your operations.";
  const words = text.split(" ");

  return (
    <main className="w-full">
      {/* Hero Section with Background Images */}
      <section
        id="hero"
        className="relative flex flex-col items-center justify-center min-h-screen p-6 text-center transition-colors duration-300 overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={isDark ? darkHeroImg : lightHeroImg}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient fade-out at bottom - SEPARATE LAYER so it's above the overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-slate-900 z-10"></div>

        <div className="relative z-20">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white mb-4 leading-tight">
            Elite Remote Talent
            <span className="text-[#004F7F] dark:text-[#ECC600]">
              {" "}
              Delivered to You
            </span>
          </h1>

          <p className="text-lg text-slate-900 dark:text-white/90 max-w-md mx-auto leading-relaxed font-medium">
            The bridge between ambition and world-class remote talent.
          </p>
        </div>
      </section>

      {/* Rest of the file remains exactly the same */}
      {/* Scroll-triggered Text Section */}
      <section className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 px-6 py-20 transition-colors duration-300">
        <div ref={scrollTextRef} className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            {words.map((word, index) => {
              const speed = 1.5;
              const wordProgress =
                scrollProgress * words.length * speed - index;

              const opacity = Math.max(0, Math.min(1, wordProgress));

              return (
                <span
                  key={index}
                  style={{
                    color:
                      opacity > 0.5
                        ? isDark
                          ? "#fff"
                          : "#000"
                        : isDark
                        ? "#4b5563"
                        : "#a9a9a9",
                    transition: "color 0.3s ease",
                  }}
                >
                  {word}{" "}
                </span>
              );
            })}
          </h2>
        </div>
      </section>

      {/* Services Section with Scroll-Stacking Cards */}
      <section className="relative bg-slate-50 dark:bg-slate-800 transition-colors duration-300">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={isDark ? darkServiceImg : lightServiceImg}
            alt="Services background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient fade-out at top */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-50 to-transparent dark:from-slate-900 z-10"></div>

        {/* Gradient fade-out at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-slate-900 z-10"></div>

        {/* Section Header */}
        <div className="text-center pt-20 pb-10 px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
            Specialized Talent for Your Needs
          </h2>
          <p className="text-slate-100 dark:text-slate-100 text-lg max-w-3xl mx-auto transition-colors duration-300">
            We focus on three core roles that drive business growth. Each
            professional is rigorously vetted, trained, and ready to integrate
            seamlessly into your team.
          </p>
        </div>

        {/* Sticky Stacking Cards Container */}
        <div>
          {/* Card 1 - Virtual Assistants */}
          <div
            className="h-screen sticky top-0 flex items-center justify-center px-6"
            style={{ zIndex: 3 }}
            data-card="0"
          >
            <div
              className="w-full max-w-6xl flex flex-col md:flex-row items-stretch gap-6"
              style={{
                opacity: 1 - cardScrollProgress[0],
                transition: "opacity 0.1s ease-out",
                height: "400px",
              }}
            >
              {/* Text Box */}
              <div className="relative flex-1 bg-[#004F7F] dark:bg-[#ECC600] rounded-lg p-8 md:p-10 shadow-xl overflow-hidden h-full">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ECC600] dark:border-[#004F7F]"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#ECC600] dark:border-[#004F7F]"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#ECC600] dark:border-[#004F7F]"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#ECC600] dark:border-[#004F7F]"></div>

                <h3 className="text-2xl md:text-3xl font-bold text-white dark:text-[#004F7F] mb-3">
                  Virtual Assistants
                </h3>
                <p className="text-white/90 dark:text-[#004F7F]/90 mb-6">
                  From administrative support to customer service, our VAs
                  handle day-to-day operations so you can focus on strategic
                  growth.
                </p>

                <ul className="space-y-3 mb-6">
                  {[
                    "Email & calendar management",
                    "Customer support & CRM",
                    "Data entry & research",
                    "Social media management",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-white dark:text-[#004F7F]"
                    >
                      <span className="w-2 h-2 bg-white dark:bg-[#004F7F] rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-white dark:text-[#004F7F] font-bold hover:gap-3 transition-all"
                >
                  Hire Virtual Assistants →
                </a>
              </div>

              {/* Image */}
              <img
                src={vaImg}
                alt="Virtual Assistant"
                className="w-full md:w-96 h-full rounded-lg object-cover"
              />
            </div>
          </div>

          {/* Card 2 - Web Designers */}
          <div
            className="h-screen sticky top-0 flex items-center justify-center px-6"
            style={{ zIndex: 2 }}
            data-card="1"
          >
            <div
              className="w-full max-w-6xl flex flex-col md:flex-row items-stretch gap-6"
              style={{
                opacity: 1 - cardScrollProgress[1],
                transition: "opacity 0.1s ease-out",
                height: "400px", // Added: same height as Card 1
              }}
            >
              {/* Text Box */}
              <div className="relative flex-1 bg-[#004F7F] dark:bg-[#ECC600] rounded-lg p-8 md:p-10 shadow-xl overflow-hidden h-full">
                {/* CORNER ACCENTS FIXED: Changed from border-red-500 border-4 to yellow border-2 */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ECC600] dark:border-[#004F7F]"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#ECC600] dark:border-[#004F7F]"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#ECC600] dark:border-[#004F7F]"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#ECC600] dark:border-[#004F7F]"></div>

                <h3 className="text-2xl md:text-3xl font-bold text-white dark:text-[#004F7F] mb-3">
                  Web Designers
                </h3>
                <p className="text-white/90 dark:text-[#004F7F]/90 mb-6">
                  Creative professionals who craft stunning, user-centric
                  designs that elevate your brand and drive conversions.
                </p>

                <ul className="space-y-3 mb-6">
                  {[
                    "UI/UX design & prototyping",
                    "Landing page design",
                    "Brand identity & graphics",
                    "Responsive web design",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-white dark:text-[#004F7F]"
                    >
                      <span className="w-2 h-2 bg-white dark:bg-[#004F7F] rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-white dark:text-[#004F7F] font-bold hover:gap-3 transition-all"
                >
                  Hire Web Designers →
                </a>
              </div>

              {/* Image - Added h-full to match height */}
              <img
                src={designerImg}
                alt="Web Designer"
                className="w-full md:w-96 h-full rounded-lg object-cover"
              />
            </div>
          </div>

          {/* Card 3 - Web Developers */}
          <div
            className="h-screen sticky top-0 flex items-center justify-center px-6"
            style={{ zIndex: 1 }}
            data-card="2"
          >
            <div
              className="w-full max-w-6xl flex flex-col md:flex-row items-stretch gap-6"
              style={{
                opacity: 1 - cardScrollProgress[2],
                transition: "opacity 0.1s ease-out",
                height: "400px", // Added: same height as Card 1
              }}
            >
              {/* Text Box */}
              <div className="relative flex-1 bg-[#004F7F] dark:bg-[#ECC600] rounded-lg p-8 md:p-10 shadow-xl overflow-hidden h-full">
                {/* CORNER ACCENTS FIXED: Changed from border-red-500 border-4 to yellow border-2 */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ECC600] dark:border-[#004F7F]"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#ECC600] dark:border-[#004F7F]"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#ECC600] dark:border-[#004F7F]"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#ECC600] dark:border-[#004F7F]"></div>

                <h3 className="text-2xl md:text-3xl font-bold text-white dark:text-[#004F7F] mb-3">
                  Web Developers
                </h3>
                <p className="text-white/90 dark:text-[#004F7F]/90 mb-6">
                  Skilled engineers who build robust, scalable web applications
                  tailored to your business requirements.
                </p>

                <ul className="space-y-3 mb-6">
                  {[
                    "Full-stack development",
                    "E-commerce solutions",
                    "API integration & development",
                    "Website maintenance & support",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-white dark:text-[#004F7F]"
                    >
                      <span className="w-2 h-2 bg-white dark:bg-[#004F7F] rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-white dark:text-[#004F7F] font-bold hover:gap-3 transition-all"
                >
                  Hire Web Developers →
                </a>
              </div>

              {/* Image - Added h-full to match height */}
              <img
                src={developerImg}
                alt="Web Developer"
                className="w-full md:w-96 h-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>

        {/* Add spacing after cards */}
        <div className="h-20"></div>
      </section>

      {/* How It Works */}
      <section className="bg-white dark:bg-slate-900 py-24 px-6 transition-colors duration-300">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            A simple, proven process to scale your team quickly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              step: "01",
              title: "Share Your Needs",
              desc: "Tell us about the role, skills, and goals for your business.",
            },
            {
              step: "02",
              title: "We Match You",
              desc: "We handpick pre-vetted professionals tailored to your requirements.",
            },
            {
              step: "03",
              title: "Start Scaling",
              desc: "Onboard quickly and grow without the hiring headaches.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 text-left shadow-sm"
            >
              <span className="text-sm font-bold text-[#004F7F] dark:text-[#ECC600]">
                {item.step}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-3 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Approach - Replacing Why Companies Choose Virtuo */}
      <section className="bg-slate-50 dark:bg-slate-800 py-24 px-6 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Our Approach
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto">
              We're not a freelancer marketplace. We're your dedicated talent
              partner, committed to finding professionals who become true
              extensions of your team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: (
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#004F7F]/10 dark:bg-[#004F7F]/20 flex items-center justify-center">
                      {/* Checkmark Icon */}
                      <svg
                        className="w-8 h-8 text-[#004F7F] dark:text-[#ABCD36]"
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
                  </div>
                ),
                title: "Rigorous Vetting Process",
                desc: "Only the top 5% of applicants make it through our comprehensive screening, skills testing, and background verification.",
              },
              {
                icon: (
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#004F7F]/10 dark:bg-[#004F7F]/20 flex items-center justify-center">
                      {/* Clock Icon */}
                      <svg
                        className="w-8 h-8 text-[#004F7F] dark:text-[#ABCD36]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                ),
                title: "Fast Turnaround",
                desc: "Get matched with qualified candidates within 48 hours. Start working within a week, not months.",
              },
              {
                icon: (
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#004F7F]/10 dark:bg-[#004F7F]/20 flex items-center justify-center">
                      {/* Handshake Icon */}
                      <svg
                        className="w-8 h-8 text-[#004F7F] dark:text-[#ABCD36]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </div>
                  </div>
                ),
                title: "Ongoing Support",
                desc: "We don't disappear after placement. Our team provides continuous support to ensure success for both parties.",
              },
              {
                icon: (
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#004F7F]/10 dark:bg-[#004F7F]/20 flex items-center justify-center">
                      {/* Refresh/Recycle Icon */}
                      <svg
                        className="w-8 h-8 text-[#004F7F] dark:text-[#ABCD36]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </div>
                  </div>
                ),
                title: "Replacement Guarantee",
                desc: "Not satisfied? We'll find you a replacement at no additional cost. Your success is our priority.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
              >
                {item.icon}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#004F7F] dark:bg-slate-900 py-24 text-center px-6">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Build Your Remote Team?
        </h2>
        <p className="text-white/80 mb-8">
          Let us match you with elite talent tailored to your business.
        </p>
        <GetStartedButton />
      </section>
    </main>
  );
};

// --- Get Started Button with Water Fill Effect ---
const GetStartedButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative px-8 py-4 rounded-full font-bold overflow-hidden transition-all duration-300 hover:scale-105"
    >
      {/* Base background */}
      <div className="absolute inset-0 bg-[#ECC600]"></div>

      {/* Water fill effect */}
      <div
        className="absolute inset-0 bg-[#fff] transition-all duration-700 ease-out"
        style={{
          transform: isHovered ? "translateY(0%)" : "translateY(100%)",
        }}
      />

      {/* Text */}
      <span className="relative z-10 text-[#004F7F]">Get Started</span>
    </button>
  );
};

export default Home;
