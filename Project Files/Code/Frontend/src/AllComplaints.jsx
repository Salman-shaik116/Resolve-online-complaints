import React, { useEffect, useState } from "react";

const AllComplaints = () => {
  const [all, setAll] = useState([]);

  const fetchAll = async () => {
    const currentUser = localStorage.getItem("loggedInUser");
    if (!currentUser) {
      setAll([]);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/complaints/all");
      const data = await res.json();

      // Filter complaints belonging to the current user
      const filtered = data.filter((item) => item.userEmail === currentUser);

      setAll(filtered);
    } catch (err) {
      console.error("Failed to fetch complaints", err);
      setAll([]);
    }
  };

  useEffect(() => {
    fetchAll();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        fetchAll();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "25px",
          color: "#2c3e50",
          fontSize: "26px",
        }}
      >
        All Complaints
      </h2>

      {all.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "black",
            fontSize: "16px",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          No complaints found.
        </p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              backgroundColor: "#f9f9f9",
              minWidth: "650px",
            }}
          >
            <table
              border="0"
              cellPadding="0"
              cellSpacing="0"
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#607d8b", color: "white" }}>
                  {[
                    "Title",
                    "Description",
                    "Date",
                    "Status",
                    "Admin Response",
                  ].map((head, i) => (
                    <th
                      key={i}
                      style={{
                        padding: "12px 15px",
                        textAlign: "left",
                        fontSize: "16px",
                      }}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {all.map((item, index) => (
                  <tr
                    key={item._id}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#ffffff" : "#f1f1f1",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#e0f7fa")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        index % 2 === 0 ? "#ffffff" : "#f1f1f1")
                    }
                  >
                    <td style={tdStyle}>{item.title}</td>
                    <td style={tdStyle}>{item.category}</td>
                    <td style={tdStyle}>{item.date}</td>
                    <td style={{ ...tdStyle, fontWeight: "bold" }}>
                      {item.status}
                    </td>
                    <td
                      style={{
                        ...tdStyle,
                        color: item.answer ? "#303f9f" : "#999",
                      }}
                    >
                      {item.answer || "No response provided"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Responsive Media Queries */}
      <style>{`
        @media (max-width: 768px) {
          table {
            font-size: 14px;
          }
          th, td {
            padding: 8px 10px !important;
          }
          h2 {
            font-size: 22px !important;
          }
        }

        @media (max-width: 480px) {
          table {
            font-size: 12px;
          }
          th, td {
            padding: 6px 8px !important;
          }
          h2 {
            font-size: 18px !important;
          }
        }
      `}</style>
    </div>
  );
};

const tdStyle = {
  padding: "10px 15px",
  borderBottom: "1px solid #ddd",
  color: "#333",
};

export default AllComplaints;
