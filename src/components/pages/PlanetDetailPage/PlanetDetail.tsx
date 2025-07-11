import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import type { Planet } from "../../../types/planet";

interface PlanetDetailProps {
  planet: Planet;
}

const PlanetDetail: React.FC<PlanetDetailProps> = ({ planet }) => {
  const getPlanetImage = (name: string) => {
    const imageName = name.toLowerCase().replace(/\s+/g, "-");
    return `/images/planets/${imageName}.jpeg`;
  };

  const formatPopulation = (population: string) => {
    if (population === "unknown") return "Unknown";
    const num = parseInt(population);
    if (isNaN(num)) return population;
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <Box className="flex flex-col md:flex-row gap-8">
      <Box className="flex-shrink-0">
        <Avatar
          src={getPlanetImage(planet.name)}
          alt={planet.name}
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
          {planet.name}
        </Typography>

        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {planet.climate && (
            <Chip
              label={`Climate: ${planet.climate}`}
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

          {planet.population && (
            <Chip
              label={`Population: ${formatPopulation(planet.population)}`}
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
          Planet characteristics
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
          {planet.name} - this is a planet from the Star Wars universe.
          {planet.climate && ` Climate: ${planet.climate}.`}
          {planet.terrain && ` Terrain: ${planet.terrain}.`}
          {planet.population &&
            ` Population: ${formatPopulation(planet.population)}.`}
        </Typography>
      </Box>
    </Box>
  );
};

export default PlanetDetail;
