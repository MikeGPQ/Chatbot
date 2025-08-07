import { useState, useEffect } from "react";
import { ChatWindow } from "./componentes/ChatWindow";

function App() {
    const [open, setOpen] = useState(false);

    function openChat() {
        setOpen(!open)
    }

    const buttonStyles = {
        backgroundColor: "#ED1C24",
        color: "white",
        border: "none",
        padding: "12px 24px",
        borderRadius: "30px",
        fontSize: "1rem",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    };

    const buttonHoverStyles = {
        ...buttonStyles,
        backgroundColor: "#c21820",
        transform: "translateY(-2px)",
        boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)"
    };

    const [currentButtonStyle, setCurrentButtonStyle] = useState(buttonStyles);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",width: "100vw", margin: "0 auto", padding: "2rem",  height: "100vh", backgroundColor: "#f5f5f5"}}>
            <h1 style={{ color: "#151E48",fontWeight: "300",  letterSpacing: "1px", marginBottom: "2rem"}}>
                Support
            </h1>

            <button
                style={currentButtonStyle}
                onClick={openChat}
                onMouseEnter={() => setCurrentButtonStyle(buttonHoverStyles)}
                onMouseLeave={() => setCurrentButtonStyle(buttonStyles)}
            >
                {open ? "Close Chat" : "Open Chat"}
            </button>

            {open && <ChatWindow isMobile={isMobile}/>}
        </div>
    )
}

export default App;