import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./config/firebase";
import { collection, getDocs } from "firebase/firestore";
import CertificatePDF from "./components/CertificatePDF";

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
                  <p>
                    <strong>School/College:</strong> {cert.schoolCollage}
                  </p>
                  <p>
                    <strong>Email:</strong> {cert.email}
                  </p>
                  <p>
                    <strong>Number:</strong> {cert.number}
                  </p>
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

export default App;
