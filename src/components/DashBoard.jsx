import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../App.css";

function DashBoard() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    mobNo: "",
    password: "",
  });
  const [successmessage, setSuccessmessage] = useState(null);
  const [errormessage, seterrormessageE] = useState(null);

  const [csvFile, setCsvFile] = useState(null);
  const [csvUploadSuccess, setCsvUploadSuccess] = useState(null);
  const [csvUploadError, setCsvUploadError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const resp = await fetch("http://localhost:8080/addagent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });

    if (resp.ok) {
      setSuccessmessage("Agent Created Successfully");
      seterrormessageE(null);
    } else {
      seterrormessageE((await resp.json()).message || "Error Creating User");
      setSuccessmessage(null);
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file && file.type === "text/csv") {
      setCsvFile(file);
      setCsvUploadError(null); // Clear previous errors
    } else {
      setCsvFile(null);
      setCsvUploadError("Please select a valid CSV file.");
      setCsvUploadSuccess(null);
    }
  }
  async function handleFileSubmit(e) {
    e.preventDefault();

    if (!csvFile) {
      setCsvUploadError("Please select a CSV file.");
      setCsvUploadSuccess(null);
      return;
    }

    const formData = new FormData();
    formData.append("file_field", csvFile);

    try {
      const res = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setCsvUploadSuccess("CSV file uploaded successfully.");
        setCsvUploadError(null);
        setCsvFile(null);
      } else {
        setCsvUploadSuccess(null);
        setCsvUploadError("CSV upload failed.");
      }
    } catch (err) {
      console.error(err);
      setCsvUploadSuccess(null);
      setCsvUploadError("Upload error. Try again.");
    }
  }

  return (
    <>
      <h1 className="text-2xl text-center mt-5 font-semibold bg-gray-100">
        Dashboard
      </h1>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-8">
          {/* Add Agent Form */}
          <div>
            <h2 className="text-xl font-bold mb-6 text-center">Add Agent</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter Name"
                  value={details.name}
                  onChange={(e) =>
                    setDetails({ ...details, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={details.email}
                  onChange={(e) =>
                    setDetails({ ...details, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <PhoneInput
                  country={"in"}
                  value={details.mobNo}
                  onChange={(phone) => setDetails({ ...details, mobNo: phone })}
                  inputProps={{
                    name: "phone",
                    required: true,
                  }}
                  containerClass="w-full"
                  inputClass="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  buttonClass="rounded-l-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={details.password}
                  onChange={(e) =>
                    setDetails({ ...details, password: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
              >
                Add Agent
              </button>
              {successmessage || errormessage ? (
                <p
                  className={`text-center mt-4 font-medium ${
                    errormessage ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {successmessage || errormessage}
                </p>
              ) : null}
            </form>
          </div>

          {/* Upload CSV Form */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-center mb-4">
              Upload Task File
            </h2>
            <form
              onSubmit={handleFileSubmit}
              className="space-y-4"
              encType="multipart/form-data"
            >
              <label className="flex items-center justify-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-5 4h5m-5 0H7m5 0v-4"
                  />
                </svg>
                <span className="text-sm text-gray-600">
                  {csvFile ? csvFile.name : "Choose CSV File"}
                </span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg hover:cursor-pointer"
              >
                Assign Tasks
              </button>
              {csvUploadSuccess && (
                <p className="text-green-600 text-center text-sm mt-2 font-medium">
                  {csvUploadSuccess}
                </p>
              )}
              {csvUploadError && (
                <p className="text-red-500 text-center text-sm mt-2 font-medium">
                  {csvUploadError}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
