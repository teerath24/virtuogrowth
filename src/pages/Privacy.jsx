import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <main className="bg-white dark:bg-slate-900 pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-slate-800 dark:text-slate-200">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-10 text-sm">
          Last updated: April 2026
        </p>

        <p className="mb-6">
          VirtuoGrowth Partners ("we", "us", "our") is committed to protecting
          your personal information. This policy explains what data we collect,
          how we use it, and your rights regarding it.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          Information We Collect
        </h2>
        <p className="mb-4">
          When you use our website or services, we may collect:
        </p>
        <ul className="list-disc ml-6 mb-6 space-y-2">
          <li>Full name, email address, and phone number</li>
          <li>Company name and business details</li>
          <li>Service preferences and project requirements</li>
          <li>Communication history between you and VirtuoGrowth Partners</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          How We Use Your Information
        </h2>
        <ul className="list-disc ml-6 mb-6 space-y-2">
          <li>To respond to your inquiries and service requests</li>
          <li>To match you with qualified remote professionals</li>
          <li>
            To send service updates, reminders, and relevant communications
          </li>
          <li>To improve our website and services</li>
          <li>To fulfill our contractual obligations to you</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">Data Sharing</h2>
        <p className="mb-6">
          We do not sell your personal information. We may share data with
          trusted third-party tools (such as our CRM and email platforms) solely
          to deliver our services. All third parties are required to handle your
          data securely and in accordance with applicable law.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Data Retention</h2>
        <p className="mb-6">
          We retain your information for as long as necessary to provide our
          services or as required by law. You may request deletion of your data
          at any time by contacting us.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Your Rights</h2>
        <p className="mb-4">
          Depending on your location, you may have the right to:
        </p>
        <ul className="list-disc ml-6 mb-6 space-y-2">
          <li>Access the personal data we hold about you</li>
          <li>Request correction or deletion of your data</li>
          <li>Opt out of marketing communications at any time</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">Data Security</h2>
        <p className="mb-6">
          We take reasonable technical and organizational measures to protect
          your information from unauthorized access, loss, or disclosure.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Contact</h2>
        <p>
          For privacy-related questions or data requests, contact us at{" "}
          <a
            href="mailto:info@virtuogrowth.com"
            className="text-[#004F7F] dark:text-[#ECC600] underline"
          >
            info@virtuogrowth.com
          </a>
        </p>
      </div>
    </main>
  );
};

export default Privacy;
