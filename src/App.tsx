import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./config/firebase";
import { collection, getDocs } from "firebase/firestore";
import CertificatePDF from "./components/CertificatePDF";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import VerifiedUser from "./components/VerifiedUser";

// Certificate data structure
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

// ✅ Home Component
function Home() {
  const [certificateList, setCertificateList] = useState<Certificate[]>([]);
  const certificatesCollectionRef = collection(db, "Certificate");

  useEffect(() => {
    const getCertificates = async () => {
      try {
        const data = await getDocs(certificatesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Certificate[];
        setCertificateList(filteredData);
        console.log("Fetched certificates:", filteredData);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };

    getCertificates();
  }, []);

  return (
    <div className="App">
      <h2>Results for UI Contest - September</h2>

      <div className="results">
        {certificateList.length === 0 ? (
          <p>No certificates found.</p>
        ) : (
          certificateList.map((cert, index) => {
            // Assign rank-based styling
            let rankClass = "";
            let badgeText = "";
            if (index === 0) {
              rankClass = "first";
              badgeText = "1st Place 🥇";
            } else if (index === 1) {
              rankClass = "second";
              badgeText = "2nd Place 🥈";
            } else if (index === 2) {
              rankClass = "third";
              badgeText = "3rd Place 🥉";
            } else {
              rankClass = "other";
              badgeText = `${index + 1}th Place`;
            }

            return (
              <div key={cert.id} className={`result-card ${rankClass}`}>
                <div className="badge">{badgeText}</div>
                <div className="card-photo">Photo</div>

                <div className="details">
                  <p>
                    <strong>Name:</strong> {cert.name}
                  </p>
                  <p>
                    <strong>Position:</strong> {index + 1}
                  </p>
                  {/* <p>
                    <strong>School/College:</strong> {cert.schoolCollage}
                  </p>
                  <p>
                    <strong>Email:</strong> {cert.email}
                  </p>
                  <p>
                    <strong>Number:</strong> {cert.number}
                  </p> */}
                </div>

                <div className="buttons">
                  {/* PDF Download */}
                  <CertificatePDF certificate={cert} />

                  {/* View Design */}
                  <button
                    onClick={() => window.open(cert.uploadedDesign, "_blank")}
                  >
                    View Design
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ✅ Header with Dropdown for Verify
function Header({ certificateList }: { certificateList: Certificate[] }) {
  const navigate = useNavigate();

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const certificateId = event.target.value;
    if (certificateId) {
      navigate(`/certificate/verify/${certificateId}`);
    }
  };

  return (
    <header
      style={{
        backgroundColor: "#1d72b8",
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "20px" }}>Certificate System</h1>
      <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>

        {/* Dropdown for Verify */}
        <select
          onChange={handleSelect}
          defaultValue=""
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          <option value="" disabled>
            Verify Certificate
          </option>
          {certificateList.map((cert) => (
            <option key={cert.id} value={cert.id}>
              {cert.name}
            </option>
          ))}
        </select>
      </nav>
    </header>
  );
}

// ✅ App Component with Routing
function App() {
  const [certificateList, setCertificateList] = useState<Certificate[]>([]);
  const certificatesCollectionRef = collection(db, "Certificate");

  useEffect(() => {
    const getCertificates = async () => {
      try {
        const data = await getDocs(certificatesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Certificate[];
        setCertificateList(filteredData);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };

    getCertificates();
  }, []);

  return (
    <Router>
      <Header certificateList={certificateList} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/certificate/verify/:certificateId" element={<VerifiedUser />} />
      </Routes>
    </Router>
  );
}

export default App;
