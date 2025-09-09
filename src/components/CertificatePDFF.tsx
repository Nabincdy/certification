import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "qrcode";

interface Certificate {
  id: string;
  age: number;
  name: string;
  schoolCollage: string;
  declaration: string;
  email: string;
  number: string;
  participateChallengeReasion: string;
  uploadedDesign: string; // background certificate template
}

interface Props {
  certificate: Certificate;
}

const CertificatePDF: React.FC<Props> = ({ certificate }) => {
  const generatePDF = async () => {
    // Create temporary container
    const tempDiv = document.createElement("div");
    tempDiv.style.width = "1200px"; // high resolution
    tempDiv.style.height = "850px";
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-9999px";
    tempDiv.style.top = "-9999px";
    tempDiv.style.fontFamily = "Georgia, serif";

    // Background image
    const bgImg = document.createElement("img");
    bgImg.src = certificate.uploadedDesign;
    bgImg.style.width = "100%";
    bgImg.style.height = "100%";
    bgImg.style.objectFit = "cover";
    bgImg.style.position = "absolute";
    bgImg.style.top = "0";
    bgImg.style.left = "0";
    tempDiv.appendChild(bgImg);

    // Overlay text
    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = "200px";
    overlay.style.left = "100px";
    overlay.style.right = "100px";
    overlay.style.textAlign = "center";
    overlay.style.color = "#2c3e50";

    overlay.innerHTML = `
      <h1 style="font-size: 40px; margin-bottom: 20px; font-weight: bold; letter-spacing: 1px;">
        Certificate of Achievement
      </h1>
      <p style="font-size: 22px; margin-bottom: 15px;">
        This certificate is proudly presented to
      </p>
      <h2 style="font-size: 32px; font-weight: bold; margin: 10px 0; color: #000;">
        ${certificate.name}
      </h2>
      <p style="font-size: 18px; margin-bottom: 10px;">
        Age: ${certificate.age} | School/College: ${certificate.schoolCollage}
      </p>
      <p style="font-size: 18px; margin-bottom: 10px;">
        Email: ${certificate.email} | Number: ${certificate.number}
      </p>
      <p style="font-size: 18px; margin: 20px 0; line-height: 1.5; max-width: 800px; margin-left: auto; margin-right: auto;">
        "${certificate.declaration}"
      </p>
      <p style="font-size: 18px; margin-bottom: 20px;">
        Reason for Participation: ${certificate.participateChallengeReasion}
      </p>
    `;

    tempDiv.appendChild(overlay);

    // Static company logo (top-left)
    const logo = document.createElement("img");
    logo.src = "/assets/img/logo.png"; // static path
    logo.style.position = "absolute";
    logo.style.top = "30px";
    logo.style.left = "40px";
    logo.style.width = "150px";
    logo.style.height = "auto";
    tempDiv.appendChild(logo);

    document.body.appendChild(tempDiv);

    // Convert to canvas
    const canvas = await html2canvas(tempDiv, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // QR Code (Top-right, larger)
    const qrDataUrl = await QRCode.toDataURL(
      `https://yourdomain.com/certificate/${certificate.id}`,
      { width: 300 } // generate higher-resolution QR
    );

    // Generate PDF
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

    // Add QR at top-right
    pdf.addImage(
      qrDataUrl,
      "PNG",
      canvas.width - 240, // push to right
      40,                 // 40px from top
      200,                // width (bigger)
      200                 // height
    );

    pdf.save(`${certificate.name}_certificate.pdf`);

    // Cleanup
    document.body.removeChild(tempDiv);
  };

  return (
    <button
      onClick={generatePDF}
      style={{
        padding: "10px 20px",
        backgroundColor: "#1d72b8",
        color: "white",
        border: "none",
        borderRadius: "6px",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
        transition: "background 0.3s",
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          "#155a96";
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          "#1d72b8";
      }}
    >
      Download Certificate
    </button>
  );
};

export default CertificatePDF;
