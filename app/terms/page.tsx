import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const LAST_UPDATED = "May 5, 2025";

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      <Navbar />

      <div className="flex-1 pt-28 pb-20 px-6">
        <div className="container mx-auto max-w-3xl">

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
              Terms &amp; Conditions
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Last updated: {LAST_UPDATED}</p>
          </div>

          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-10 text-zinc-700 dark:text-zinc-300 leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">1. About Us</h2>
              <p>
                HatPhones (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a retail business operating at
                516 3rd St SE, Medicine Hat, AB, T1A 0H2, Canada. We buy, sell, and repair phones and electronic
                devices. By using our website or services, you agree to these Terms &amp; Conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">2. Device Purchases (Buy)</h2>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>All devices sold by HatPhones are pre-owned unless explicitly stated otherwise.</li>
                <li>Each device is inspected and tested by our team before sale.</li>
                <li>
                  <strong>Return policy:</strong> Devices may be returned within 7 days of purchase in the same
                  condition as sold, with original receipt, for a full refund or exchange. After 7 days, all sales are
                  final.
                </li>
                <li>Prices are subject to change without notice. The price at time of purchase is final.</li>
                <li>
                  We reserve the right to cancel any order or sale at our discretion, in which case a full refund will
                  be issued.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">3. Selling Your Device to Us</h2>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>
                  Quotes provided via the Value Check tool or over the phone are estimates only. Final offers are
                  confirmed after in-person inspection.
                </li>
                <li>
                  A valid government-issued photo ID is required for all device sales to HatPhones, as required by
                  Alberta law.
                </li>
                <li>
                  By selling a device to us, you confirm that you are the lawful owner of the device and that it is
                  not reported lost or stolen.
                </li>
                <li>
                  Payment is made same-day by cash or Interac e-transfer upon agreement of the final offer.
                </li>
                <li>All sales to HatPhones are final once payment is issued.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">4. Repair Services</h2>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>
                  Repair quotes provided online or by phone are estimates. Final pricing is confirmed upon in-person
                  diagnosis of the device.
                </li>
                <li>Diagnostics are free. No repair will be started without your approval of the final price.</li>
                <li>
                  <strong>Warranty:</strong> All repairs carry a 90-day warranty covering the specific issue repaired.
                  This warranty does not cover new damage, water damage, or issues unrelated to the original repair.
                </li>
                <li>
                  HatPhones is not responsible for data loss during repair. Back up your device before dropping it
                  off.
                </li>
                <li>
                  Devices not picked up within 30 days of repair completion will be considered abandoned and may be
                  disposed of or sold to recover costs.
                </li>
                <li>
                  In rare cases where a repair cannot be completed, no charge will be applied for the diagnostic.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">5. Website Use</h2>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>
                  The content on hatphones.ca is provided for general information only. We make no guarantees about
                  the accuracy or completeness of any pricing, availability, or product information displayed.
                </li>
                <li>You may not use this website for any unlawful purpose.</li>
                <li>
                  We reserve the right to modify or discontinue any part of the website at any time without notice.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">6. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, HatPhones is not liable for any indirect, incidental, or
                consequential damages arising from the use of our website or services. Our total liability in any
                matter is limited to the amount paid for the specific product or service in question.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">7. Governing Law</h2>
              <p>
                These Terms &amp; Conditions are governed by the laws of the Province of Alberta and the federal laws
                of Canada applicable therein. Any disputes will be resolved in the courts of Alberta.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">8. Changes to These Terms</h2>
              <p>
                We may update these Terms &amp; Conditions at any time. The &ldquo;Last updated&rdquo; date at the top
                of this page will reflect any changes. Continued use of our website or services after changes are
                posted constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">9. Contact</h2>
              <p>Questions about these terms? Get in touch:</p>
              <address className="not-italic mt-3 space-y-1 text-sm">
                <p className="font-semibold text-zinc-900 dark:text-white">HatPhones</p>
                <p>516 3rd St SE, Medicine Hat, AB, T1A 0H2</p>
                <p>
                  Email:{" "}
                  <a href="mailto:info@hatphones.ca" className="text-indigo-600 dark:text-indigo-400 underline">
                    info@hatphones.ca
                  </a>
                </p>
                <p>Phone: +1 (403) 957-0532</p>
              </address>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
