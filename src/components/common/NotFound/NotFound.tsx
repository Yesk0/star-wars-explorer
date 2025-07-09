import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const NotFound: React.FC = () => (
  <Container maxWidth="md">
    <Box className="text-center py-20">
      <Typography
        variant="h1"
        sx={{
          fontFamily: "Orbitron, monospace",
          fontWeight: 900,
          fontSize: "8rem",
          textTransform: "uppercase",
          letterSpacing: "4px",
          background: "linear-gradient(45deg, #FFD700, #8B0000)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "2rem",
          textShadow: "0 0 30px rgba(255, 215, 0, 0.5)",
        }}
      >
        404
      </Typography>

      <Typography
        variant="h4"
        sx={{
          fontFamily: "Orbitron, monospace",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "2px",
          color: "#FFD700",
          marginBottom: "3rem",
        }}
      >
        Страница не найдена
      </Typography>

      <Typography
        variant="h6"
        sx={{
          fontFamily: "Orbitron, monospace",
          color: "rgba(255, 255, 255, 0.8)",
          letterSpacing: "1px",
          marginBottom: "4rem",
        }}
      >
        Эта планета не существует в нашей галактике
      </Typography>

      <Button
        component={Link}
        to="/"
        variant="contained"
        size="large"
        sx={{
          background: "linear-gradient(45deg, #FFD700, #B8860B)",
          border: "2px solid #FFD700",
          color: "#000000",
          fontFamily: "Orbitron, monospace",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "2px",
          padding: "12px 32px",
          fontSize: "1.1rem",
          boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "linear-gradient(45deg, #B8860B, #FFD700)",
            boxShadow: "0 0 30px rgba(255, 215, 0, 0.6)",
            transform: "translateY(-2px)",
          },
        }}
      >
        Вернуться на главную
      </Button>
    </Box>
  </Container>
);

export default NotFound;
