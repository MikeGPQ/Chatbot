import { useState, useEffect } from "react";
import { ChatWindow } from "./componentes/ChatWindow";
import LOGO from "./assets/LOGO.png"

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
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: "100"
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

    const containerStyles = {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "0"
    };

    const headerStyles = {
        backgroundColor: "#ED1C24",
        color: "white",
        display: "flex",
        alignItems: "center",
        padding: "1rem 2rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
    };

    const logoStyles = {
        width: "120px",
        height: "auto",
        marginRight: "1.5rem"
    };

    const headingStyles = {
        fontWeight: "400",
        letterSpacing: "0.5px",
        fontSize: "2rem",
        margin: "0",
        color: "white"
    };

    return (
        <div style={containerStyles}>
            <div style={headerStyles}>
                <img src={LOGO} alt="Top Mexico Real Estate Logo" style={logoStyles} />
                <h1 style={headingStyles}>
                    Support
                </h1>
            </div>
            
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