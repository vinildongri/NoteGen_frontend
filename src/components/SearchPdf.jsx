import React from "react";
import "../stylesCss/SearchPdf.css";
import { FiArrowUp } from "react-icons/fi";

const SearchPdf = ({ onClose }) => {
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
          <input type="file" id="file-upload" hidden />

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
            Supported file types: PDF, .txt, Markdown, Audio (e.g. mp3)
          </p>
        </div>

      </div>
    </div>
  );
};

export default SearchPdf;
