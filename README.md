
# Certificate System – BatoBuzz UI Design Challenge

![BatoBuzz Logo](public/assets/img/logo.svg)

A web application to generate, download, and verify digital certificates for the BatoBuzz UI Design Challenge. Built with React, TypeScript, Vite, and Firebase.

---

## 🚀 Features

- **Certificate Generation:** Create and download personalized certificates as PDFs.
- **QR Code Verification:** Each certificate includes a QR code for instant authenticity checks.
- **Design Submission:** Participants can submit and view their design entries.
- **Admin Dashboard:** View all participants and their ranks.
- **Firebase Integration:** Secure data storage and real-time updates.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **PDF Generation:** jsPDF, html2canvas
- **QR Codes:** qrcode
- **Database:** Firebase Firestore
- **Routing:** React Router DOM

---

## 📦 Installation

```bash
git clone https://github.com/Nabincdy/certification.git
cd certification
npm install
```

---

## 🧑‍💻 Usage

- **Start Development Server:**
  ```bash
  npm run dev
  ```
- **Build for Production:**
  ```bash
  npm run build
  ```
- **Preview Production Build:**
  ```bash
  npm run preview
  ```
- **Lint Code:**
  ```bash
  npm run lint
  ```

---

## 🔑 Firebase Setup

Update your Firebase credentials in `src/config/firebase.js` if you fork or redeploy.

---

## 📄 Project Structure

- `src/components/CertificatePDF.tsx` – Generate and download certificates as PDF.
- `src/components/VerifiedUser.tsx` – Verify certificate authenticity via QR code.
- `src/config/firebase.js` – Firebase configuration.
- `public/assets/img/` – Logos and signature images.

---

## 🌐 Certificate Verification

Each certificate includes a QR code. Scan it or visit:

```
https://batobuzz.com/certificate/verify/{certificateId}
```

---

## 🏆 About BatoBuzz UI Design Challenge

A quarterly event to recognize and reward outstanding UI design talent. Winners receive digital certificates with secure verification.

---

## 📬 Contact

- **Website:** [batobuzz.com](https://batobuzz.com)
- **Email:** info@batobuzz.com

---
