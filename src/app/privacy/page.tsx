import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-[40px] p-8 md:p-16 shadow-sm border border-primary/5">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none space-y-8 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
              <p>
                Welcome to Ujjwala Services. We value your privacy and are committed to protecting your personal data. 
                This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website 
                or use our services in Gorakhpur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
              <p>
                We may collect personal information such as your name, contact number, and address when you book a service 
                via WhatsApp or our platform. This information is used strictly for service delivery and communication.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Data</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To process and schedule your service bookings.</li>
                <li>To communicate with you regarding your appointments.</li>
                <li>To improve our services and customer experience in the Gorakhpur region.</li>
                <li>To send you updates or promotional offers (with your consent).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your information from unauthorized access, alteration, 
                or disclosure. Your trust is our priority.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
                <br />
                <strong>Email:</strong> ujjwala.services@gmail.com
                <br />
                <strong>Phone:</strong> +91 73103 82894
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
