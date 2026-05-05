import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const LAST_UPDATED = "May 5, 2025";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      <Navbar />

      <div className="flex-1 pt-28 pb-20 px-6">
        <div className="container mx-auto max-w-3xl">

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Last updated: {LAST_UPDATED}</p>
          </div>

          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-10 text-zinc-700 dark:text-zinc-300 leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">1. Who We Are</h2>
              <p>
                HatPhones (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the website{" "}
                <a href="https://www.hatphones.ca" className="text-indigo-600 dark:text-indigo-400 underline">
                  hatphones.ca
                </a>{" "}
                and a retail store located at 516 3rd St SE, Medicine Hat, AB, T1A 0H2, Canada. We buy, sell, and repair
                phones and other electronic devices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">2. Information We Collect</h2>
              <p>We collect personal information in the following ways:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>
                  <strong>Contact form</strong> — name, email address, and your message when you contact us through the
                  website.
                </li>
                <li>
                  <strong>Repair booking form</strong> — name, email, phone number, device details, and a description
                  of the issue.
                </li>
                <li>
                  <strong>Sell / Value Check form</strong> — device information, condition details, and contact
                  information you provide to receive a quote.
                </li>
                <li>
                  <strong>In-store transactions</strong> — government-issued photo ID is required for all device
                  purchases, as required by law.
                </li>
                <li>
                  <strong>Analytics</strong> — we use Google Analytics 4 (GA4) to collect anonymised usage data such as
                  pages visited, session duration, and general location (city/region level). No personally identifiable
                  information is shared with Google Analytics.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Respond to your enquiries and service requests.</li>
                <li>Process repair bookings and sell/buy transactions.</li>
                <li>Send you transactional emails related to your booking or enquiry.</li>
                <li>Comply with legal obligations (e.g. ID verification for device purchases).</li>
                <li>Improve our website and services through anonymised analytics data.</li>
              </ul>
              <p className="mt-3">We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">4. Cookies</h2>
              <p>
                Our website uses cookies placed by Google Analytics to understand how visitors use our site. These
                cookies collect anonymised, aggregated data and do not identify you personally. You can opt out of
                Google Analytics tracking by installing the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 underline"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
                .
              </p>
              <p className="mt-3">
                We do not use cookies for advertising or tracking across other websites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">5. Data Retention</h2>
              <p>
                We retain your personal information only as long as necessary to fulfil the purpose it was collected
                for, or as required by law. Enquiry and booking data is retained for up to 12 months. In-store
                transaction records may be retained longer to comply with applicable regulations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Request access to the personal information we hold about you.</li>
                <li>Request correction of inaccurate information.</li>
                <li>Request deletion of your data, subject to any legal retention obligations.</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at{" "}
                <a href="mailto:info@hatphones.ca" className="text-indigo-600 dark:text-indigo-400 underline">
                  info@hatphones.ca
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">7. Third-Party Services</h2>
              <p>We use the following third-party services that may process data on our behalf:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>
                  <strong>Google Analytics 4</strong> — website usage analytics. Governed by{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 underline"
                  >
                    Google&apos;s Privacy Policy
                  </a>
                  .
                </li>
                <li>
                  <strong>Email delivery</strong> — form submissions are delivered via a transactional email provider.
                  No personal data is stored by the provider beyond delivery.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">8. Security</h2>
              <p>
                We take reasonable steps to protect your personal information from unauthorised access, disclosure, or
                misuse. Our website is served over HTTPS. However, no method of transmission over the internet is
                completely secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at the top of
                this page will reflect any changes. Continued use of our website after changes are posted constitutes
                acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">10. Contact</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <address className="not-italic mt-3 space-y-1 text-sm">
                <p className="font-semibold text-zinc-900 dark:text-white">HatPhones</p>
                <p>516 3rd St SE, Medicine Hat, AB, T1A 0H2</p>
                <p>
                  Email:{" "}
                  <a href="mailto:info@hatphones.ca" className="text-indigo-600 dark:text-indigo-400 underline">
                    info@hatphones.ca
                  </a>
                </p>
                <p>Phone: +1 (403) 977-5164</p>
              </address>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
