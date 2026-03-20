import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-[40px] p-8 md:p-16 shadow-sm border border-primary/5">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">Terms & Conditions</h1>
          
          <div className="prose prose-slate max-w-none space-y-8 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Ujjwala Makeover, you agree to be bound by these Terms and Conditions. 
                Our services are currently offered exclusively in Gorakhpur, Uttar Pradesh.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Service Bookings</h2>
              <p>
                All bookings are subject to availability. We reserve the right to reschedule or cancel a booking 
                due to unforeseen circumstances, in which case you will be notified promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. User Responsibilities</h2>
              <p>
                Users must provide accurate information (address, contact details) to ensure smooth service delivery. 
                A safe and suitable environment must be provided for our professionals to perform the requested services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Payment Terms</h2>
              <p>
                Payments should be made directly to the assigned professional or as per the agreed-upon method 
                during the booking process on WhatsApp.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Limitation of Liability</h2>
              <p>
                Ujjwala Makeover strives for excellence, but we are not liable for indirect or consequential damages 
                arising from the use of our platform or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Jurisdiction</h2>
              <p>
                These terms are governed by the laws of India, and any disputes will be subject to the exclusive 
                jurisdiction of the courts in Gorakhpur.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
