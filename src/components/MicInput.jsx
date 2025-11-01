import React, { useState, useEffect, useRef } from "react";
import { FiMic } from "react-icons/fi";

const MicInput = ({ setText }) => {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false; // <-- change to false for stable final result
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript; // <-- take final result only
      console.log("Transcript:", transcript);
      setText(transcript); // send to ChatInput
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
  }, [setText]);

  const toggleMic = () => {
    if (!recognitionRef.current) return;

    if (!isRecording) {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Mic start error:", err);
      }
    } else {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <button
      onClick={toggleMic}
      className={`mic-button ${isRecording ? "recording" : ""}`}
      style={{
        position: "relative",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "none",
        background: isRecording ? "red" : "#1f1f1f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        boxShadow: isRecording ? "0 0 10px red" : "none",
      }}
    >
      <FiMic size={22} color="#fff" />
      {isRecording && (
        <span
          style={{
            position: "absolute",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid rgba(255,0,0,0.5)",
            animation: "pulse 1s infinite",
          }}
        />
      )}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.3); opacity: 0.4; }
          100% { transform: scale(1); opacity: 0.7; }
        }
      `}</style>
    </button>
  );
};

export default MicInput;
