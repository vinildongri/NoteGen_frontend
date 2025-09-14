import React from "react";
import "../stylesCss/SearchPdf.css";
import { FiArrowUp } from "react-icons/fi";
import extract from "react-pdftotext";
import { PDF_SUMMARY_HEADING } from "../constants";
import toast from "react-hot-toast";

const SearchPdf = ({ onClose, setPdfText }) => {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type === "application/pdf") {
      try {
        const text = await extract(file);
        setPdfText(PDF_SUMMARY_HEADING + text);
        onClose();
      } catch (error) {
        console.error("Failed to extract text from PDF:", error);
        toast.error("Could not read PDF. Please try another file.");
      }
    } else {
      toast.error("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="pdf-overlay">
      <div className="pdf-modal">

        {/* Header */}
        <div className="pdf-header text-black">
          <h2>Add sources</h2>
          <button className="pdf-close" onClick={onClose}>✕</button>
        </div>

        <p className="pdf-subtitle">
          Sources let NoteGen base its responses on the information that matters most to you. <br />
          (Examples: marketing plans, course reading, research notes, meeting transcripts, sales documents, etc.)
        </p>

        {/* Upload Box */}
        <div className="pdf-upload-box">
          <input
            type="file"
            id="file-upload"
            hidden
            accept=".pdf"
            onChange={handleFileChange}
          />

          {/* ✅ Arrow is clickable */}
          <label htmlFor="file-upload" className="upload-label">
            <div className="upload-icon"><FiArrowUp /></div>
          </label>

          {/* ❌ Not clickable */}
          <p className="upload-title text-black">Upload sources</p>
          <p className="upload-hint mt-3">
            Drag & drop or{" "}
            {/* ✅ Only this span is clickable */}
            <label htmlFor="file-upload" className="choose-file">choose file</label>{" "}
            to upload
          </p>

          <div className="m-4"></div>

          <p className="upload-types">
            Supported file types: PDF (text-based only)
          </p>
        </div>

      </div>
    </div>
  );
};

export default SearchPdf;
