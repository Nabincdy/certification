import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import "../assets/css/VerifiedUser.css";

interface Certificate {
  id: string;
  age: number;
  name: string;
  schoolCollage: string;
  declaration: string;
  email: string;
  number: string;
  participateChallengeReasion: string;
  uploadedDesign: string;
}

function VerifiedUser() {
  const { certificateId } = useParams<{ certificateId: string }>();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        if (!certificateId) return;
        const docRef = doc(db, "Certificate", certificateId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCertificate({ id: docSnap.id, ...(docSnap.data() as Certificate) });
        } else {
          setCertificate(null);
        }
      } catch (error) {
        console.error("Error fetching certificate:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [certificateId]);

  if (loading) {
    return <div className="verify-page">Loading...</div>;
  }

  if (!certificate) {
    return (
      <div className="verify-page not-found">
        <h2>❌ Certificate Not Found</h2>
        <p>This certificate could not be verified. Please check the QR code again.</p>
      </div>
    );
  }

  return (
    <div className="verify-page">
      <div className="verify-card">
        {/* Header */}
        <div className="card-header">
          <img src="/assets/img/logo.svg" alt="Academy Logo" />
          <h1>Certificate Verification</h1>
          <p>Official Verification Result</p>
        </div>

        {/* Body */}
        <div className="card-body">
          <h2>Certificate Information</h2>
          <ul className="detail-list">
            <li>
              <span className="label">Name</span>
              <span className="value">{certificate.name}</span>
            </li>
            <li>
              <span className="label">School/College</span>
              <span className="value">{certificate.schoolCollage}</span>
            </li>
            <li>
              <span className="label">Email</span>
              <span className="value">{certificate.email}</span>
            </li>
            <li>
              <span className="label">Number</span>
              <span className="value">{certificate.number}</span>
            </li>
            {/* <li>
              <span className="label">Reason</span>
              <span className="value">{certificate.participateChallengeReasion}</span>
            </li> */}
          </ul>
        </div>

        {/* Status */}
        <div className="status-banner">✅ Verified & Authentic</div>

        {/* Footer / Design Link */}
        <div className="verify-footer" style={{ textAlign: "center", padding: "10px" }}>
          <a
            href={certificate.uploadedDesign}
            target="_blank"
            rel="noreferrer"
            className="design-link"
          >
            View Submitted Design
          </a>
        </div>
      </div>
    </div>
  );
}

export default VerifiedUser;
