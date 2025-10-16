import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField"; // Import TextField
import Button from "@mui/material/Button"; // Import Button
import "./StartupStatus.css";
import NewNavBar from "./components/NewNavBar";
import GovNewNavbar from "./NavBars/GovNewNavbar";

const StatusTable = () => {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [actionStatus, setActionStatus] = useState("");
  const [fundsSanctioned, setFundsSanctioned] = useState(0); // State to hold funds sanctioned

  useEffect(() => {
    // const data = localStorage.getItem("statusData");

    //   setRows(JSON.parse(data).status); // Load data from localStorage if it exists

    // If no data in localStorage, fetch from startupStatus.json
    fetch("/statusData.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("statusData", JSON.stringify(data)); // Save to localStorage
        setRows(data.status); // Set the rows from the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    const data = localStorage.getItem("statusData");

    setRows(JSON.parse(data).status); // Load data from localStorage if it exists

    // If no data in localStorage, fetch from startupStatus.json
    fetch("/statusData.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("statusData", JSON.stringify(data)); // Save to localStorage
        setRows(data.status); // Set the rows from the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to style the status based on the status value
  const makeStatusStyle = (status) => {
    if (status === "Approved") {
      return {
        backgroundColor: "rgb(145 254 159 / 47%)",
        color: "green",
      };
    } else if (status === "Rejected") {
      return {
        backgroundColor: "#ffadad8f",
        color: "red",
      };
    } else {
      return {
        backgroundColor: "#59bfff",
        color: "blue",
      };
    }
  };

  // Handle status change
  // Handle status change
  const handleStatusChange = (index) => {
    const updatedRows = [...rows];

    // Update the status and date
    updatedRows[index].status =
      actionStatus === "Request Changes" ? "In Progress" : actionStatus;
    updatedRows[index].date = new Date().toLocaleDateString("en-GB");

    // Update funds sanctioned if approved
    if (actionStatus === "Approved") {
      updatedRows[index].funds_sanctioned = fundsSanctioned; // Update funds sanctioned
    }

    setRows(updatedRows);
    setSelectedRow(null); // Hide dropdown after action is applied
    setFundsSanctioned(0); // Reset funds sanctioned input
    setActionStatus(""); // Reset action status

    // Update the data in local storage
    localStorage.setItem("statusData", JSON.stringify({ status: updatedRows }));

    // Send the updated object to the Node server
    const updatedObject = updatedRows[index]; // Get the updated object

    fetch("http://localhost:8080/update-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedObject), // Send the updated object
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data); // Handle success response
      })
      .catch((error) => {
        console.error("Error:", error); // Handle error response
      });
  };

  // Function to download the table data as CSV
  const downloadCSV = () => {
    const csvContent = [
      [
        "Investor Name",
        "Startup Name",
        "Funding Details",
        "Date",
        "Status",
        "Funds Sanctioned",
      ],
      ...rows.map((row) => [
        row.investorName,
        row.startupName,
        row.fundingDetails,
        row.date,
        row.status,
        row.funds_sanctioned,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "status-tracking.csv";
    link.click();
  };

  return (
    <>
      <GovNewNavbar />
      <div className="Table">
        <h3
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="../public/govLogo.png"
            alt="Logo"
            style={{ width: "70px", height: "70px", marginRight: "10px" }}
          />
          Startup Funding Application Status and Data
        </h3>
        <Button
          variant="contained"
          color="primary"
          className="csv-btn"
          onClick={downloadCSV}
          style={{ margin: "1.5rem 0 1.5rem 0", backgroundColor: "#318CE7" }}
        >
          Download Report
        </Button>
        <br></br>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Investor Name</b>
                </TableCell>
                <TableCell align="left">
                  <b>Startup Name</b>
                </TableCell>
                <TableCell align="left">
                  <b>Funding Details</b>
                </TableCell>
                <TableCell align="left">
                  <b>Date</b>
                </TableCell>
                <TableCell align="left">
                  <b>Status</b>
                </TableCell>
                <TableCell align="left">
                  <b>Funds Sanctioned</b>
                </TableCell>
                {/* <TableCell align="left">
                  <b>Actions</b>
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={row._id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                  }}
                >
                  <TableCell>{row.investorName}</TableCell>
                  <TableCell align="left">{row.startupName}</TableCell>
                  <TableCell align="left">
                    
                    <a
                      href={row.fundingDetails}
                      
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                     <div className="colChange"> View Funding Details</div>
                    </a>
                  </TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="left">
                    <span
                      className="status-btn"
                      style={makeStatusStyle(row.status)}
                    >
                      {row.status}
                    </span>
                  </TableCell>
                  <TableCell align="left">{row.funds_sanctioned}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default StatusTable;
