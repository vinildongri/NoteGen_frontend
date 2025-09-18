// src/components/ChatInput.jsx
import React, { useState, useRef, useEffect, Suspense, lazy } from "react";
import { useCratenotesMutation } from "../redux/api/noteApi.js";
import "../stylesCss/ChatInput.css";
import ReactMarkdown from "react-markdown";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiPlus, FiArrowUp, FiMic, FiSliders } from "react-icons/fi";
import SearchPdf from "./SearchPdf.jsx";
import { PDF_SUMMARY_HEADING } from "../constants.jsx";
import { useGetMeQuery } from "../redux/api/userApi.js";

// ✅ Lazy load SyntaxHighlighter
const SyntaxHighlighter = lazy(() =>
  import("react-syntax-highlighter").then((mod) => ({ default: mod.Prism }))
);

// ========================================================================== //
// ✅ ChatGPT-Style CodeBlock Component                                       //
// ========================================================================== //
const CodeBlock = ({ className, children }) => {
  const [isCopied, setIsCopied] = useState(false);
  const codeString = String(children).replace(/\n$/, "");

  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "text";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div style={{ position: "relative", margin: "1em 0" }}>
      {/* Copy button top-right */}
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: "8px",
          right: "12px",
          background: "rgba(0,0,0,0.6)",
          border: "1px solid #444",
          borderRadius: "4px",
          color: "#ccc",
          fontSize: "0.8em",
          padding: "2px 6px",
          cursor: "pointer",
          zIndex: 2,
        }}
      >
        {isCopied ? "Copied!" : "Copy"}
      </button>

      {/* Code block */}
      <Suspense fallback={<div style={{ padding: "12px" }}>Loading code...</div>}>
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            borderRadius: "8px",
            fontSize: "0.9em",
            padding: "16px",
            maxHeight: "400px",
            overflowX: "auto",
            overflowY: "auto",
          }}
          wrapLongLines={false}
        >
          {codeString}
        </SyntaxHighlighter>
      </Suspense>
    </div>
  );
};

// ========================================================================== //
// ✅ Typing + Markdown Component                                             //
// ========================================================================== //
const TypingMarkdown = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (!text) return;
    setIsTypingComplete(false);
    setDisplayedText("");
    let index = 0;
    const chunkSize = 50;
    const interval = 20;
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text.slice(index, index + chunkSize));
      index += chunkSize;
      if (index >= text.length) {
        clearInterval(timer);
        setIsTypingComplete(true);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [text]);

  if (!isTypingComplete) {
    return (
      <pre
        style={{
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          margin: 0,
          fontFamily: "inherit",
        }}
      >
        <code>{displayedText}</code>
      </pre>
    );
  }

  return (
    <ReactMarkdown
      components={{
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <CodeBlock className={className}>{children}</CodeBlock>
          ) : (
            <code
              className={className}
              style={{
                background: "#e0e0e0",
                color: "#c72c41",
                padding: "2px 6px",
                borderRadius: "4px",
                fontSize: "0.9em",
              }}
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {text}
    </ReactMarkdown>
  );
};

// ========================================================================== //
// ✅ MessageRow                                                              //
// ========================================================================== //
const MessageRow = React.memo(({ msg }) => {
  return (
    <div className={`chat-row ${msg.role === "user" ? "user-row" : "bot-row"}`}>
      <div
        className={`avatar  ${msg.role === "bot" ? "bot-avatar" : "user-avatar"}`}
      >
        <span className="avatar-letter">
          {msg.name?.[0] || (msg.role === "user" ? "U" : "B")}
        </span>
      </div>
      <div
        className={`bubble ${msg.role === "user" ? "user-bubble" : "bot-bubble"}`}
      >
        {msg.role === "bot" ? (
          <TypingMarkdown text={msg.content} />
        ) : (
          <ReactMarkdown>{msg.content}</ReactMarkdown>
        )}
      </div>
    </div>
  );
});

// ========================================================================== //
// ✅ ChatInput Component                                                     //
// ========================================================================== //
const ChatInput = () => {
  const [text, setText] = useState("");
  const [pdfText, setPdfText] = useState("");
  const [messages, setMessages] = useState([]);
  const [showSearchPdf, setShowSearchPdf] = useState(false);

  const [createNotes, { isLoading, data, error }] = useCratenotesMutation();
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  // ✅ Safe user query
  const { data: meData } = useGetMeQuery();
  const user = meData?.user || null;

  // auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  // scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // handle API responses
  useEffect(() => {
    if (data?.result) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: data.result, name: "NoteGen" },
      ]);
    }

    if (error) {
      let errorMessage = "⚠️ Error fetching response";

      if (error.status === "FETCH_ERROR") {
        errorMessage = "⚠️ Network error – check your connection.";
      } else if (error.status === 500) {
        errorMessage = "⚠️ Server error – please try again later.";
      } else if (error.data?.message) {
        errorMessage = `⚠️ ${error.data.message}`;
      }

      setMessages((prev) => [
        ...prev,
        { role: "bot", content: errorMessage, name: "NoteGen" },
      ]);
    }
  }, [data, error]);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: text, name: user?.name || "Guest" },
    ]);

    try {
      await createNotes({
        messages: [
          ...messages,
          { role: "user", content: text, name: user?.name || "Guest" },
        ],
      }).unwrap();

      setText("");
    } catch (err) {
      console.log("API Error:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (pdfText) {
      setText(pdfText);
      setPdfText("");
    }
  }, [pdfText]);

  useEffect(() => {
    if (text && text.includes(PDF_SUMMARY_HEADING)) {
      handleSubmit();
    }
  }, [text]);

  return (
    <>
      <div
        className={`chat-input-container ${
          messages.length === 0 ? "centered" : ""
        }`}
      >
        {messages.length === 0 && (
          <div className="welcome-screen">
            <h1
              style={{
                background:
                  "linear-gradient(to right, #0062ffff, #4289fcff, #6b9ff4ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                padding: "20px",
                fontWeight: "bold",
              }}
            >
              How can I help you today{user?.name ? `, ${user.name}` : ""}?
            </h1>
          </div>
        )}

        <div className="messages-box">
          {messages.map((msg, idx) => (
            <MessageRow key={idx} msg={msg} />
          ))}

          {isLoading && (
            <div className="chat-row bot-row">
              <div className="avatar bot-avatar">
                <span className="avatar-letter">N</span>
                <span className="avatar-ring"></span>
              </div>
              <div className="bubble bot-bubble">
                <span className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask NoteGen"
            className="chat-textarea"
          />
          <div className="button-bar">
            <div className="left-icons">
              <button
                className="icon-button"
                onClick={() => setShowSearchPdf(true)}
              >
                <FiPlus size={22} />
              </button>
              <button className="icon-button tools-button">
                <FiSliders size={20} style={{ transform: "rotate(90deg)" }} />
                <span>Tools</span>
              </button>
            </div>
            <div className="right-icon">
              {text ? (
                <button
                  onClick={handleSubmit}
                  className="icon-button send-button"
                  disabled={isLoading}
                >
                  <FiArrowUp size={22} />
                </button>
              ) : (
                <button className="icon-button">
                  <FiMic size={22} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SearchPdf Modal */}
      {showSearchPdf && (
        <SearchPdf
          onClose={() => setShowSearchPdf(false)}
          setPdfText={setPdfText}
        />
      )}
    </>
  );
};

export default ChatInput;
