import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import type { Planet } from "../../../types/planet";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import {
  addFavorite,
  removeFavorite,
} from "../../../store/slices/favoritesSlice";

interface PlanetCardProps {
  planet: Planet;
}

const PlanetCard: React.FC<PlanetCardProps> = ({ planet }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some(
    (fav) => fav.type === "planet" && fav.id === planet.id
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite({ type: "planet", id: planet.id }));
    } else {
      dispatch(addFavorite({ type: "planet", id: planet.id, data: planet }));
    }
  };

  const getPlanetImage = (name: string) => {
    const imageName = name.toLowerCase().replace(/\s+/g, "-");
    return `/src/assets/images/planets/${imageName}.jpeg`;
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

  // New id for link: if id starts with 'planet-', remove this prefix
  const getPlanetLinkId = (id: string, name: string) => {
    if (id && id.startsWith("planet-")) {
      return id.replace("planet-", "");
    }
    return id || name;
  };

  return (
    <Card
      className="sw-card h-full cursor-pointer"
      component={Link}
      to={`/planet/${getPlanetLinkId(planet.id, planet.name)}`}
      sx={{
        background: "linear-gradient(145deg, #2d2d2d, #404040)",
        border: "1px solid #FFD700",
        boxShadow: "0 8px 32px rgba(255, 215, 0, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        textDecoration: "none",
        position: "relative",
        minWidth: 350,
        maxWidth: 350,
        minHeight: 380,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 40px rgba(255, 215, 0, 0.2)",
          borderColor: "#ffffff",
        },
      }}
    >
      
      <IconButton
        onClick={handleFavoriteClick}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 2,
          background: "rgba(0,0,0,0.3)",
          borderRadius: "50%",
          "&:hover": { background: "rgba(255,255,255,0.1)" },
        }}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? (
          <FavoriteIcon sx={{ color: "#e53935" }} />
        ) : (
          <FavoriteBorderIcon sx={{ color: "#FFD700" }} />
        )}
      </IconButton>
      <CardContent className="p-6">
        <Box className="flex flex-col items-center text-center">
          <Avatar
            src={getPlanetImage(planet.name)}
            alt={planet.name}
            sx={{
              width: 80,
              height: 80,
              marginBottom: 2,
              border: "3px solid #FFD700",
              boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
            }}
          />

          <Typography
            variant="h6"
            className="sw-subtitle mb-3"
            sx={{
              fontFamily: "Orbitron, monospace",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "#FFD700",
              marginBottom: "1rem",
            }}
          >
            {planet.name || "Unknown planet"}
          </Typography>

          <Box className="flex flex-col items-center gap-3 w-full mt-2">
            {planet.climate && (
              <Chip
                label={`Climate: ${planet.climate}`}
                size="small"
                sx={{
                  background: "rgba(255, 215, 0, 0.1)",
                  color: "#FFD700",
                  border: "1px solid #FFD700",
                  fontFamily: "Orbitron, monospace",
                  fontSize: "0.75rem",
                  width: "fit-content",
                }}
              />
            )}

            {planet.terrain && (
              <Chip
                label={`Terrain: ${planet.terrain}`}
                size="small"
                sx={{
                  background: "rgba(255, 215, 0, 0.1)",
                  color: "#FFD700",
                  border: "1px solid #FFD700",
                  fontFamily: "Orbitron, monospace",
                  fontSize: "0.75rem",
                  width: "fit-content",
                }}
              />
            )}

            {planet.population && (
              <Chip
                label={`Population: ${formatPopulation(planet.population)}`}
                size="small"
                sx={{
                  background: "rgba(255, 215, 0, 0.1)",
                  color: "#FFD700",
                  border: "1px solid #FFD700",
                  fontFamily: "Orbitron, monospace",
                  fontSize: "0.75rem",
                  width: "fit-content",
                }}
              />
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlanetCard;
