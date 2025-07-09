import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Footer: React.FC = () => (
  <Box
    component="footer"
    sx={{
      background: "linear-gradient(90deg, #000000, #1a1a1a)",
      borderTop: "2px solid #FFFFFF",
      boxShadow: "0 -4px 20px rgba(255, 215, 0, 0.2)",
      marginTop: "auto",
      padding: "2rem 0",
    }}
  >
    <Container maxWidth="lg">
      <Box className="text-center">
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Orbitron, monospace",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "2px",
            color: "#FFD700",
            marginBottom: "1rem",
          }}
        >
          Star Wars Explorer
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: "Orbitron, monospace",
            color: "rgba(255, 255, 255, 0.7)",
            letterSpacing: "1px",
          }}
        >
          © {new Date().getFullYear()} Explore the Star Wars galaxy
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontFamily: "Orbitron, monospace",
            color: "rgba(255, 215, 0, 0.6)",
            display: "block",
            marginTop: "0.5rem",
            letterSpacing: "1px",
          }}
        >
          May the Force be with you
        </Typography>
      </Box>
    </Container>
  </Box>
);

export default Footer;
