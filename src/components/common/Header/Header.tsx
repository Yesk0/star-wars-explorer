import React from "react";
import { Link, NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const navLinks = [
  { to: "/", label: "Characters", end: true },
  { to: "/planets", label: "Planets" },
  { to: "/starships", label: "Starships" },
  { to: "/films", label: "Films" },
];

const Header: React.FC = () => (
  <AppBar
    position="static"
    className="sw-nav pb-1 pt-4"
    sx={{
      background: "linear-gradient(90deg, #000000, #1a1a1a)",
      borderBottom: "2px solid #FFFFFF",
      boxShadow: "0 4px 20px rgba(255, 215, 0, 0.2)",
    }}
  >
    <Toolbar className="gap-5 flex flex-col">
      <Typography
        variant="h4"
        component={Link}
        to="/"
        className="sw-title no-underline cursor-pointer"
        sx={{
          fontFamily: "Orbitron, monospace",
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "3px",
          background: "linear-gradient(45deg, #FFD700, #ffffff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textDecoration: "none",
          "&:hover": {
            textShadow: "0 0 15px #FFD700",
          },
        }}
      >
        Star Wars Explorer
      </Typography>

      <Box className="flex justify-center gap-6">
        {navLinks.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className="sw-nav-link no-underline px-4 py-2"
            style={({ isActive }) => ({
              color: isActive ? "#fff" : "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontWeight: 600,
              transition: "all 0.3s ease",
              position: "relative",
              textDecoration: "none",
              textShadow: isActive
                ? "0 0 8px #fff, 0 0 16px #fff, 0 0 32px #fff"
                : "none",
              filter: isActive ? "none" : "blur(0.5px)",
              opacity: isActive ? 1 : 0.7,
            })}
          >
            {label}
          </NavLink>
        ))}
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;
