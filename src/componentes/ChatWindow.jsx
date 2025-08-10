import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import { getResponse } from "../Gemini";

export function ChatWindow({isMobile}) {
    const handleKeyPress = (e) => {
        if (e.key === "Enter") enviarMensaje();
    };

    const enviarMensaje = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", parts:[{text:input}]};
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput("");

        try {
            setLoading(true);

            console.log("Contents being sent to API:", userMessage);

            const text = await getResponse(userMessage);

            setMessages(prev => [...prev, {
                role: "model",
                parts:[{
                    text: text
                }]
            }]);
        } catch (error) {
            console.error("Error calling Gemini API", error);
            setMessages(prev => [...prev, {
                role: "model",
                parts:[{
                    text: "Sorry, I'm having trouble responding. Please try again"
                }]
            }]);
        } finally {
            setLoading(false);
        }
    };

    //ESTILOS
    const MarkdownComponents = {
        p: ({ node, ...props }) => <p style={{ margin: 0, padding: 0 }} {...props} />,
        h1: ({ node, ...props }) => <h1 style={{ margin: 0, padding: 0, fontSize: '1.2em' }} {...props} />,
        h2: ({ node, ...props }) => <h2 style={{ margin: 0, padding: 0, fontSize: '1.1em' }} {...props} />,
        h3: ({ node, ...props }) => <h3 style={{ margin: 0, padding: 0 }} {...props} />,
        ul: ({ node, ...props }) => <ul style={{ margin: 0, paddingLeft: '20px' }} {...props} />,
        ol: ({ node, ...props }) => <ol style={{ margin: 0, paddingLeft: '20px' }} {...props} />,
        li: ({ node, ...props }) => <li style={{ margin: 0 }} {...props} />,
        strong: ({ node, ...props }) => <strong style={{ fontWeight: 'bold' }} {...props} />,
        em: ({ node, ...props }) => <em style={{ fontStyle: 'italic' }} {...props} />,
        code: ({ node, ...props }) => (
            <code style={{
                backgroundColor: 'rgba(0,0,0,0.1)',
                padding: '2px 4px',
                borderRadius: '4px',
                fontFamily: 'monospace'
            }} {...props} />
        ),
    };

    const chatWindowStyles = {
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "350px",
            height: "450px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            borderRadius: "10px",
            backgroundColor: "white",
            transition: "all 0.3s ease",
            zIndex: "99",
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "space-between",
            borderRadius: "15px", 
            overflow: "hidden" 
        };

    const messageStyles = (role) => ({
        maxWidth: "80%",
        padding: "12px 16px",
        borderRadius: role==="user" ? "18px 18px 0 18px" : "18px 18px 18px 0",
        backgroundColor: role==="user" ? "#ED1C24" : "#124E78",
        color: "white",
        alignSelf: role==="user" ? "flex-end" : "flex-start",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        whiteSpace: "pre-line",    
        wordBreak: "break-word"
    });

    const buttonStyles = {
        backgroundColor: "#151E48",
        color: "white",
        border: "none",
        borderRadius: "25px",
        padding: "0 20px",
        cursor: "pointer",
        transition: "all 0.2s ease"
    };

    const buttonHoverStyles = {
        ...buttonStyles,
        backgroundColor: "#0E152E"
    };

    //VARIABLES
    const [messages, setMessages] = useState([
        { role:"model", parts:[{text:"Hi how may I help you?"}]},
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentButtonStyle, setCurrentButtonStyle] = useState(buttonStyles);
    

    return (
        <div style={chatWindowStyles}>
            <div style={{ gap: "10px", display: "flex", backgroundColor: "#151E48", color: "white",  padding: "15px 20px", fontSize: "1.1rem", fontWeight: "500"}}>
                Support Chat
                {loading && <span style={{ fontSize: "0.9rem", opacity: 0.8 }}>Loading...</span>}
            </div>

            <div style={{ flex: "1", padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "15px", backgroundColor: "#F8F9FA" }}>
                {messages.map((message,index) => (
                    <div
                        key={index}
                        style={messageStyles(message.role)}
                    >
                        <ReactMarkdown components={MarkdownComponents}>
                            {message.parts[0].text}
                        </ReactMarkdown>
                    </div>
                ))}
            </div>

            <div style={{display: "flex",padding: "15px",  backgroundColor: "white", borderTop: "1px solid #DADDD8" }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    style={{flex: "1", padding: "12px 15px", border: "1px solid #DADDD8", borderRadius: "25px",outline: "none", fontSize: "0.9rem", marginRight: "10px" }} />
                <button
                    onClick={enviarMensaje}
                    style={currentButtonStyle}
                    onMouseEnter={() => setCurrentButtonStyle(buttonHoverStyles)}
                    onMouseLeave={() => setCurrentButtonStyle(buttonStyles)}
                >
                    Send
                </button>
            </div>
        </div>
    );
}