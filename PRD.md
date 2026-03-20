# Product Requirements Document (PRD)
**Project Name:** Ujjwala Services - Hyperlocal Online Booking Platform
**Target Location:** Sirf Gorakhpur, Uttar Pradesh
**Platform Type:** Mobile-Responsive Website
**Objective:** Ek aisi website develop karna jahan se Gorakhpur ke customers 'Ujjwala' ki home/salon services online book kar sakein. Pura process aasan, human-centric aur trust-building hona chahiye.

---

## 1. UI/UX aur Design Guidelines (Human-Centric Approach)

Website ka look and feel bilkul local, trusted aur premium hona chahiye. AI-generated ya fake stock images ka use nahi karna hai.

* **Color Theme:** * Primary: Warm Gold / Soft Orange ('Ujjwala' yani roshni ke hisaab se).
    * Secondary: Trust dikhane ke liye Navy Blue ya Forest Green.
    * Background: Aankhon par aaram dene wala Soft Cream ya Off-White.
* **Typography:** Saaf aur aasaani se padhe jane wale fonts (jaise Poppins). Mobile screens ke liye font size thoda bada rakhna hai.
* **Visuals:** Original photos use hongi (Real staff aur real services ki). 
* **Tone of Voice:** Bhasha aam bolchal ki hogi. (Jaise: "Aapki booking successfully ho gayi hai, humara staff jald hi aapse sampark karega" instead of robotic "Transaction Successful").

---

## 2. User Journey (Customer ka Safar)

1.  **Homepage Visit:** User website par aayega jahan likha hoga "Gorakhpur ki sabse best services ab aapke ghar par."
2.  **Service Selection:** User apne kaam ki category (Cleaning, Salon, Beauty, etc.) select karega.
3.  **Pincode Verification (Crucial):** Service select karte hi system Pincode mangega. Agar pincode Gorakhpur ka hai (e.g., 273001, 273010) tabhi user aage badh payega. Bahar ke pincode par polite message aayega: *"Maaf kijiye, abhi humari services sirf Gorakhpur mein uplabdh hain."*
4.  **Login/Signup:** Bina kisi jhanjhat ke, sirf 10-digit Mobile Number aur OTP (SMS/WhatsApp) se login.
5.  **Slot Booking:** User apni suvidha ke anusaar Date aur Time slot chunega.
6.  **Checkout:** Cart verify karke user payment option chunega (Online Payment ya Pay After Service). Sath mein "Special Instructions" ka box hoga (e.g., "Ghar ke main gate se aana").
7.  **Confirmation:** Booking confirm hote hi Customer aur Admin dono ko turant WhatsApp/SMS notification jayega.

---

## 3. Core Features & Functionalities

* **Pincode Restriction Logic:** Gorakhpur ke valid pincodes ki list database mein feed hogi. Sirf unhi par checkout allowed hoga.
* **Service Catalog:** Services ko clear pricing aur time duration ke sath list karna.
* **Cart & Checkout:** Smooth 1-page checkout.
* **Payment Gateway:** Razorpay / Cashfree integration (UPI, Cards, Wallets ke liye) aur Cash on Delivery ka vikalp.
* **WhatsApp API Integration:** Booking aate hi automatic message bhejne ke liye.

---

## 4. Admin Panel (Owner Dashboard)

Business ko manage karne ke liye ek secure aur aasan Admin Panel:

* **Live Dashboard:** Aaj ki total bookings, pending jobs, aur daily/monthly revenue (kamayi) ka graph.
* **Booking Management:** Kisi bhi booking ko Accept, Reject ya Reschedule karne ka 1-click option.
* **Service Management:** Developer ke bina naye offers add karna, prices change karna, ya kisi service ko temporarily "Out of Stock" karna.
* **Customer Database:** Sabhi customers ke mobile numbers aur booking history (taaki tyoharon par WhatsApp se discount offers bheje ja sakein).
* **Revenue Tracking:** Online kitna paisa aaya aur Cash (Pay after service) kitna mila, iska pura hisaab.

---

## 5. Staff Tracking & Management System (Naya Feature)

Admin Panel ke andar ek "Staff Module" hoga jisse owner apne staff ko track kar sakega:

* **Staff Profiles:** Har staff member ka naam, number aur uski skill (jaise kon cleaning karta hai, kon beauty service deta hai) system mein save rahega.
* **Job Assignment (Duty Lagana):** Jaise hi customer ki booking aayegi, Admin us booking ko ek click mein free staff member ko assign kar dega.
* **Staff Notification:** Staff ko WhatsApp ya unke portal par message aayega: "Aapko ek nayi duty mili hai. Customer ka naam aur address ye hai."
* **Live Status Tracking:** * Staff apne phone se update karega: *'On the Way'*, *'Reached Customer House'*, *'Job Started'*, aur *'Job Completed'*.
    * Admin dashboard par real-time mein dekh sakega ki kon sa staff abhi free hai aur kon sa duty par hai.
* **Cash Collection Entry:** Job complete hone ke baad agar staff ne cash liya hai, toh wo app/panel mein daal dega ki "Customer se 500 rupaye mil gaye", jo seedha Admin ke revenue dashboard mein update ho jayega.

---

## 6. Technical & Security Requirements

* **Mobile-First:** 95% log phone se aayenge, isliye design 100% mobile optimized hona chahiye.
* **Page Load Speed:** Website 3 seconds ke andar open honi chahiye (Images optimized hongi).
* **SEO Ready:** On-page SEO taaki Google par "Ujjwala Gorakhpur" ya "Best services in Gorakhpur" search karne par website top 3 mein rank kare.
* **Security:** SSL Certificate (HTTPS) zaroori hai. Customer ka data aur mobile number puri tarah secure hona chahiye. 

---
**End of Document**