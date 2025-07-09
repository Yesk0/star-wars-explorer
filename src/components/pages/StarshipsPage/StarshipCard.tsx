import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import type { Starship } from "../../../types/starship";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import {
  addFavorite,
  removeFavorite,
} from "../../../store/slices/favoritesSlice";

interface StarshipCardProps {
  starship: Starship;
}

const StarshipCard: React.FC<StarshipCardProps> = ({ starship }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some(
    (fav) => fav.type === "starship" && fav.id === starship.id
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite({ type: "starship", id: starship.id }));
    } else {
      dispatch(
        addFavorite({ type: "starship", id: starship.id, data: starship })
      );
    }
  };

  const getStarshipImage = (name: string) => {
    const imageName = name.toLowerCase().replace(/\s+/g, "-");
    return `/src/assets/images/starships/${imageName}.jpeg`;
  };

  const formatSpeed = (speed: string) => {
    if (!speed || speed === "unknown" || speed === "n/a") return "Unknown";
    // If number, add km/h
    return isNaN(Number(speed)) ? speed : `${speed} km/h`;
  };

  // New id for link: if id starts with 'starship-', remove this prefix
  const getStarshipLinkId = (id: string, name: string) => {
    if (id && id.startsWith("starship-")) {
      return id.replace("starship-", "");
    }
    return id || name;
  };

  return (
    <Card
      className="sw-card h-full cursor-pointer"
      component={Link}
      to={`/starship/${getStarshipLinkId(starship.id, starship.name)}`}
      sx={{
        background: "linear-gradient(145deg, #2d2d2d, #404040)",
        border: "1px solid #FFD700",
        boxShadow: "0 8px 32px rgba(255, 215, 0, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        textDecoration: "none",
        maxWidth: 350,
        minHeight: 380,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        overflow: "hidden",
        position: "relative",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 40px rgba(255, 215, 0, 0.2)",
          borderColor: "#ffffff",
        },
      }}
    >
      {/* Heart icon in top right */}
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
      <CardContent
        className="p-6"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Box className="flex flex-col items-center text-center w-full">
          <Avatar
            src={getStarshipImage(starship.name)}
            alt={starship.name}
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
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title={starship.name}
          >
            {starship.name || "Unknown starship"}
          </Typography>

          <Box
            className="flex flex-wrap gap-2 justify-center w-full"
            sx={{ maxWidth: "100%" }}
          >
            {starship.manufacturer && (
              <Chip
                label={`Manufacturer: ${starship.manufacturer}`}
                size="small"
                sx={{
                  background: "rgba(255, 215, 0, 0.1)",
                  color: "#FFD700",
                  border: "1px solid #FFD700",
                  fontFamily: "Orbitron, monospace",
                  fontSize: "0.75rem",
                  maxWidth: "100%",
                  whiteSpace: "normal",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "block",
                }}
                title={starship.manufacturer}
              />
            )}

            {starship.starship_class && (
              <Chip
                label={`Class: ${starship.starship_class}`}
                size="small"
                sx={{
                  background: "rgba(255, 215, 0, 0.1)",
                  color: "#FFD700",
                  border: "1px solid #FFD700",
                  fontFamily: "Orbitron, monospace",
                  fontSize: "0.75rem",
                  maxWidth: "100%",
                  whiteSpace: "normal",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "block",
                }}
                title={starship.starship_class}
              />
            )}

            {starship.max_atmosphering_speed && (
              <Chip
                label={`Speed: ${formatSpeed(starship.max_atmosphering_speed)}`}
                size="small"
                sx={{
                  background: "rgba(255, 215, 0, 0.1)",
                  color: "#FFD700",
                  border: "1px solid #FFD700",
                  fontFamily: "Orbitron, monospace",
                  fontSize: "0.75rem",
                  maxWidth: "100%",
                  whiteSpace: "normal",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "block",
                }}
                title={starship.max_atmosphering_speed}
              />
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StarshipCard;
