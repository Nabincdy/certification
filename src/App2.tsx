import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./config/firebase";
import { collection, getDocs } from "firebase/firestore";
import CertificatePDF from "./components/CertificatePDF";

// TypeScript interface for your certificate data
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
    <div className="App" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Certificates List:</h2>
      {certificateList.length === 0 ? (
        <p>No certificates found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Age</th>
              <th style={thStyle}>School/College</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Number</th>
              <th style={thStyle}>Declaration</th>
              <th style={thStyle}>Reason</th>
              <th style={thStyle}>View Design</th>
              <th style={thStyle}>Download PDF</th>
            </tr>
          </thead>
          <tbody>
            {certificateList.map((cert, index) => (
              <tr key={cert.id}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{cert.name}</td>
                <td style={tdStyle}>{cert.age}</td>
                <td style={tdStyle}>{cert.schoolCollage}</td>
                <td style={tdStyle}>{cert.email}</td>
                <td style={tdStyle}>{cert.number}</td>
                <td style={tdStyle}>{cert.declaration}</td>
                <td style={tdStyle}>{cert.participateChallengeReasion}</td>

                {/* Keep the uploadedDesign link */}
                <td style={tdStyle}>
                  <a
                    href={cert.uploadedDesign}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Design
                  </a>
                </td>

                {/* Add PDF download button */}
                <td style={tdStyle}>
                  <CertificatePDF certificate={cert} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Styling for table headers and cells
const thStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px",
};

export default App;
