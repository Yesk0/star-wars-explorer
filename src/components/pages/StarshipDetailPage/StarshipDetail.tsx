import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import type { Starship } from "../../../types/starship";

interface StarshipDetailProps {
  starship: Starship;
}

const StarshipDetail: React.FC<StarshipDetailProps> = ({ starship }) => {
  const getStarshipImage = (name: string) => {
    const imageName = name.toLowerCase().replace(/\s+/g, "-");
    return `/src/assets/images/starships/${imageName}.jpeg`;
  };

  const formatSpeed = (speed: string) => {
    if (!speed || speed === "unknown" || speed === "n/a") return "Unknown";
    return isNaN(Number(speed)) ? speed : `${speed} km/h`;
  };

  return (
    <Box className="flex flex-col md:flex-row gap-8">
      <Box className="flex-shrink-0">
        <Avatar
          src={getStarshipImage(starship.name)}
          alt={starship.name}
          sx={{
            width: 200,
            height: 200,
            border: "4px solid #FFD700",
            boxShadow: "0 0 30px rgba(255, 215, 0, 0.4)",
          }}
        />
      </Box>

      <Box className="flex-1">
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Orbitron, monospace",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "3px",
            color: "#FFD700",
            marginBottom: "2rem",
            textShadow: "0 0 15px rgba(255, 215, 0, 0.5)",
          }}
        >
          {starship.name}
        </Typography>

        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {starship.manufacturer && (
            <Chip
              label={`Manufacturer: ${starship.manufacturer}`}
              sx={{
                background: "rgba(255, 215, 0, 0.1)",
                color: "#FFD700",
                border: "1px solid #FFD700",
                fontFamily: "Orbitron, monospace",
                fontSize: "1rem",
                padding: "12px",
              }}
            />
          )}

          {starship.starship_class && (
            <Chip
              label={`Class: ${starship.starship_class}`}
              sx={{
                background: "rgba(255, 215, 0, 0.1)",
                color: "#FFD700",
                border: "1px solid #FFD700",
                fontFamily: "Orbitron, monospace",
                fontSize: "1rem",
                padding: "12px",
              }}
            />
          )}

          {starship.max_atmosphering_speed && (
            <Chip
              label={`Speed: ${formatSpeed(starship.max_atmosphering_speed)}`}
              sx={{
                background: "rgba(255, 215, 0, 0.1)",
                color: "#FFD700",
                border: "1px solid #FFD700",
                fontFamily: "Orbitron, monospace",
                fontSize: "1rem",
                padding: "12px",
              }}
            />
          )}
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontFamily: "Orbitron, monospace",
            color: "#FFD700",
            textTransform: "uppercase",
            letterSpacing: "2px",
            marginBottom: "1rem",
          }}
        >
          Starship characteristics
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontFamily: "Orbitron, monospace",
            color: "rgba(255, 255, 255, 0.9)",
            letterSpacing: "1px",
            lineHeight: 1.8,
            marginBottom: "2rem",
          }}
        >
          {starship.name} - this is a starship from the Star Wars universe.
          {starship.manufacturer && ` Manufacturer: ${starship.manufacturer}.`}
          {starship.starship_class && ` Class: ${starship.starship_class}.`}
          {starship.max_atmosphering_speed &&
            ` Speed: ${formatSpeed(starship.max_atmosphering_speed)}.`}
        </Typography>
      </Box>
    </Box>
  );
};

export default StarshipDetail;
