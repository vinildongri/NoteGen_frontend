import React from "react";
import "../stylesCss/SearchPdf.css";

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
          <label htmlFor="file-upload">
            <div className="upload-icon ">⬆</div>
            <p className="upload-title">Upload sources</p>
            <p className="upload-hint">
              Drag & drop or <span className="choose-file">choose file</span> to upload
            </p>
            <div className="sizw mt-5"></div>
            <p className="upload-types">
              Supported file types: PDF, .txt, Markdown, Audio (e.g. mp3)
            </p>
          </label>
        </div>

      </div>
    </div>
  );
};

export default SearchPdf;
