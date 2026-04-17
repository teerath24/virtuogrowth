const Terms = () => {
  return (
    <main className="bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Header Section */}
      <section className="pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Last updated: April 2026
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto text-slate-800 dark:text-slate-200">
          <p className="mb-6">
            By accessing or using VirtuoGrowth Partners' website or services,
            you agree to be bound by these Terms of Service. Please read them
            carefully.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">Our Services</h2>
          <p className="mb-6">
            VirtuoGrowth Partners connects businesses with pre-vetted remote
            professionals including Virtual Assistants, Web Designers, and Web
            Developers. We act as a talent intermediary and are responsible for
            recruitment, vetting, and ongoing management of placed
            professionals.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">
            Engagements & Agreements
          </h2>
          <p className="mb-6">
            All service engagements are governed by a separate signed Client
            Agreement. No work commences until a formal agreement is executed by
            both parties. Pricing, deliverables, and timelines are outlined in
            that agreement.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">Non-Circumvention</h2>
          <p className="mb-6">
            Clients may not directly hire, solicit, or engage any professional
            introduced by VirtuoGrowth Partners outside of our managed services
            without written consent and payment of the applicable buyout fee.
            This restriction applies during the engagement and for 24 months
            following termination.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">
            Intellectual Property
          </h2>
          <p className="mb-6">
            All content on this website including text, design, and branding is
            the property of VirtuoGrowth Partners and may not be reproduced
            without written permission.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">
            Limitation of Liability
          </h2>
          <p className="mb-6">
            VirtuoGrowth Partners is not liable for indirect, incidental, or
            consequential damages arising from use of our website or services.
            Our total liability shall not exceed the fees paid by the client for
            the specific service giving rise to the claim.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">No Guarantees</h2>
          <p className="mb-6">
            While we rigorously vet all professionals in our network, we do not
            guarantee specific business outcomes. Results depend on many factors
            including client collaboration and project scope.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">
            Changes to These Terms
          </h2>
          <p className="mb-6">
            We may update these terms periodically. Continued use of our
            services after changes constitutes acceptance of the updated terms.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">Contact</h2>
          <p>
            Questions about these terms? Contact us at{" "}
            <a
              href="mailto:info@virtuogrowth.com"
              className="relative group text-[#004F7F] dark:text-[#ECC600]"
            >
              info@virtuogrowth.com
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#004F7F] dark:bg-[#ECC600] transition-all duration-300 group-hover:w-full"></span>
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Terms;
