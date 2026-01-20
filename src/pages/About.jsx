import React from "react";
import ContactUsNow from "../components/ContactUsNow";

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            About Virtuo
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            We're revolutionizing how businesses access elite global talent.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Our Story
          </h2>
          <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300">
            <p>
              Founded in 2026, Virtuo emerged from a simple observation:
              talented professionals are everywhere, but quality opportunities
              aren't equally distributed. Meanwhile, businesses struggle to find
              reliable, skilled talent that fits their specific needs.
            </p>
            <p>
              We set out to bridge this gap by creating a platform that doesn't
              just connect businesses with talent, but ensures perfect matches
              through rigorous vetting, cultural alignment, and ongoing support.
            </p>
            <p>
              Today, we're proud to have built a network of top-tier
              professionals across the globe, helping companies scale
              efficiently while providing meaningful work opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Our Mission
          </h2>
          <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300">
            <p>
              To democratize access to elite talent by breaking down
              geographical barriers and creating meaningful connections between
              businesses and professionals.
            </p>
            <p>
              We believe that talent knows no borders, and that businesses
              should have access to the best people, regardless of where they're
              located.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">
            Our Values
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-[#004F7F] dark:text-[#ECC600] mb-2">
                Excellence
              </h3>
              <p className="text-slate-700 dark:text-slate-300">
                We maintain the highest standards in talent vetting and client
                service. Every professional in our network undergoes rigorous
                screening to ensure they meet our quality benchmarks.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#004F7F] dark:text-[#ECC600] mb-2">
                Transparency
              </h3>
              <p className="text-slate-700 dark:text-slate-300">
                Clear communication and honest partnerships are at the core of
                everything we do. No hidden fees, no surprises—just
                straightforward collaboration.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#004F7F] dark:text-[#ECC600] mb-2">
                Partnership
              </h3>
              <p className="text-slate-700 dark:text-slate-300">
                We view ourselves as long-term partners to both our clients and
                our talent. Success for us means success for everyone involved.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#004F7F] dark:text-[#ECC600] mb-2">
                Innovation
              </h3>
              <p className="text-slate-700 dark:text-slate-300">
                We continuously improve our matching algorithms, vetting
                processes, and support systems to deliver better outcomes for
                our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            What Makes Us Different
          </h2>
          <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300">
            <p>
              Unlike traditional staffing agencies or freelance platforms,
              Virtuo combines the best of both worlds: the quality assurance of
              elite recruitment with the flexibility and scalability of modern
              talent platforms.
            </p>
            <p>
              Our unique matching process considers not just skills and
              experience, but also work style preferences, time zone
              compatibility, and cultural fit to ensure productive, long-lasting
              partnerships.
            </p>
            <p>
              We're not just a marketplace—we're a partner invested in the
              success of every relationship we facilitate.
            </p>
          </div>
        </div>
      </section>

      {/* Optional: Add the exact same CTA section from Home page if you want identical styling */}
      <section className="bg-[#004F7F] dark:bg-slate-900 py-24 text-center px-6">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Build Your Remote Team?
        </h2>
        <p className="text-white/80 mb-8">
          Let us match you with elite talent tailored to your business.
        </p>
        <ContactUsNow />
      </section>
    </div>
  );
};

export default About;
