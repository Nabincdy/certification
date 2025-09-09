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
  uploadedDesign?: string;
}

interface Props {
  certificate: Certificate;
}

const CertificatePDF: React.FC<Props> = ({ certificate }) => {
  const generateRefNumber = (id: string): number => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = (hash * 31 + id.charCodeAt(i)) % 100000;
    }
    return 10000 + (hash % 90000);
  };

  const generatePDF = async () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.toLocaleString("default", { month: "long" });
    const refNumber = generateRefNumber(certificate.id);

    const tempDiv = document.createElement("div");
    tempDiv.style.width = "1200px";
    tempDiv.style.height = "850px";
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-9999px";
    tempDiv.style.top = "-9999px";
    tempDiv.style.fontFamily = '"Inter", sans-serif';

    tempDiv.innerHTML = `
      <div class="certificate-wrapper">
        <div class="certificate">
          <div class="outer-border"></div>
          <div class="inner-border"></div>

          <div class="logo-block">
            <img src="/assets/img/logo.svg" alt="BatoBuzz Logo" />
            <div class="provider-name">BatoBuzz Technologies</div>
          </div>

          <div class="photo"></div>
          <div class="qr"></div>

          <div class="title">CERTIFICATE OF ACHIEVEMENT</div>

          <div class="recipient-block">
            <div class="recipient-label">Awarded to</div>
            <div class="recipient-name">${certificate.name}</div>
            <div class="achieving-title">For Achieving</div>
            <div class="place-title">[PLACE TITLE]</div>
            <div class="event-line">
              in the BatoBuzz UI Design Challenge –  ${currentMonth} ${currentYear}<br>(Quarterly Edition)
            </div>
          </div>

          <!-- Signatures -->
          <div class="signatures">
            <div class="sig">
              <img class="sig-img" src="/assets/img/signature/alaka_sig.png" alt="Alaka Acharya Signature"/>
              <div class="sig-line"></div>
              <div class="sig-name">Alaka Acharya</div>
              <div class="sig-title">Chief Design Officer</div>
            </div>
            <div class="sig">
              <img class="sig-img" src="/assets/img/signature/nitesh_sig.png" alt="Nitesh Yadav Signature"/>
              <div class="sig-line"></div>
              <div class="sig-name">Nitesh Yadav</div>
              <div class="sig-title">Chief Technology Officer</div>
            </div>
            <div class="sig">
              <img class="sig-img" src="/assets/img/signature/prajwal_sig.png" alt="Prajwal Subedi Signature"/>
              <div class="sig-line"></div>
              <div class="sig-name">Prajwal Subedi</div>
              <div class="sig-title">Chief Product Officer</div>
            </div>
          </div>

          <div class="footer">
            <span>PAN No: xxxxx</span>
            <span>|</span>
            <span>Phone: xxxxx</span>
            <span>|</span>
            <span>Website: batobuzz.com</span>
            <span>|</span>
            <span>Email: info@batobuzz.com</span>
          </div>

          <div class="ref">Ref No: UIUX-${currentYear}-${refNumber}</div>
        </div>
      </div>
    `;

    const style = document.createElement("style");
    style.textContent = `
      :root {
        --gold:#d4af37;
        --accent:#b22222;
        --brand:#e63946;
        --baseW:1200px;
        --baseH:850px;
      }
      .certificate-wrapper {
        width:var(--baseW);
        height:var(--baseH);
        position:relative;
      }
      .certificate {
        width:var(--baseW);
        height:var(--baseH);
        background:#f1f0e0;
        position:relative;
        font-family:"Playfair Display", serif;
      }
      .outer-border { position:absolute; inset:20px; border:8px solid var(--gold); }
      .inner-border { position:absolute; inset:60px; border:2px solid var(--gold); }
      .logo-block { position:absolute; top:55px; left:0; right:0; text-align:center; }
      .logo-block img { height:120px; margin-bottom:2px; }
      .provider-name { font-size:22px; font-weight:700; color:var(--brand); margin-top: -20px; }
      .title { position:absolute; top:195px; left:0; right:0; text-align:center; font-size:55px; font-weight:600; letter-spacing: 2px; word-spacing:10px; }
      .recipient-block { position:absolute; top:290px; left:100px; right:100px; text-align:center; }
      .recipient-label { font-size:22px; color:#555; margin-bottom:6px; }
      .recipient-name { font-size:45px; font-weight:800; margin-bottom:12px; font-family: Arial, Helvetica, sans-serif; }
      .achieving-title { font-size:20px; color:#333; margin-bottom:8px; }
      .place-title { font-size:28px; font-weight:800; color:var(--gold); margin-bottom:12px; }
      .event-line { font-size:20px; margin-top:8px; color:#444; }
      
      .signatures { position:absolute; bottom:160px; left:80px; right:80px; display:flex; justify-content:space-between; font-family: Arial, Helvetica, sans-serif; }
      .sig { width:30%; text-align:center; position:relative; }
      .sig-img { max-width: 100%; height: 100px; object-fit: contain; margin-bottom: -20px; }
      .sig-line { width:70%; height:2px; background:var(--gold); margin:0 auto 12px auto; }
      .sig-name { font-weight:700; font-size:18px; }
      .sig-title { font-size:14px; color:#555; }

      .ref { position:absolute; bottom:100px; left:0; right:0; text-align:center; font-size:18px; font-weight:700; font-family: Arial, Helvetica, sans-serif; }
      .footer {
        position: absolute;
        font-family: Arial, Helvetica, sans-serif;
        bottom: 70px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 14px;
        color: #333;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 25px;
      }
      .footer span { white-space: nowrap; }

      .photo, .qr { position:absolute; top:340px; width:120px; height:120px; border:3px solid var(--gold); }
      .photo { left:210px; }
      .qr { right:210px; display:flex; align-items:center; justify-content:center; }
    `;
    tempDiv.appendChild(style);

    document.body.appendChild(tempDiv);

    const qrUrl = await QRCode.toDataURL(
      `https://batobuzz.com/certificate/verify/${certificate.id}`,
      { width: 120 }
    );
    const qrImg = document.createElement("img");
    qrImg.src = qrUrl;
    qrImg.style.width = "100%";
    qrImg.style.height = "100%";
    const qrBox = tempDiv.querySelector(".qr");
    qrBox?.appendChild(qrImg);

    const canvas = await html2canvas(tempDiv, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${certificate.name}_certificate.pdf`);

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
      }}
    >
      Download Certificate
    </button>
  );
};

export default CertificatePDF;
