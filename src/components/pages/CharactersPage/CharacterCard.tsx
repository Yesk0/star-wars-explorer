import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import type { Character } from "../../../types/character";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import {
  addFavorite,
  removeFavorite,
} from "../../../store/slices/favoritesSlice";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some(
    (fav) => fav.type === "character" && fav.id === character.id
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite({ type: "character", id: character.id }));
    } else {
      dispatch(
        addFavorite({ type: "character", id: character.id, data: character })
      );
    }
  };

  const getCharacterImage = (name: string) => {
    const imageName = name.toLowerCase().replace(/\s+/g, "-");
    return `/images/characters/${imageName}.jpeg`;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getGenderLabel = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "male":
        return "Male";
      case "female":
        return "Female";
      case "n/a":
        return "N/A";
      default:
        return gender;
    }
  };

  // Новый id для ссылки: если id начинается с 'char-', убираем этот префикс
  const getCharacterLinkId = (id: string, name: string) => {
    if (id && id.startsWith("char-")) {
      return id.replace("char-", "");
    }
    return id || name;
  };

  return (
    <Card
      className="sw-card h-full cursor-pointer"
      component={Link}
      to={`/character/${getCharacterLinkId(character.id, character.name)}`}
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
            src={getCharacterImage(character.name)}
            alt={character.name}
            sx={{
              width: 80,
              height: 80,
              marginBottom: 2,
              border: "3px solid #FFD700",
              boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
              fontSize: "1.5rem",
              fontWeight: "bold",
              background: "linear-gradient(45deg, #FFD700, #FFA500)",
            }}
          >
            {getInitials(character.name)}
          </Avatar>

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
            {character.name || "Unknown character"}
          </Typography>

          <Box className="flex flex-wrap gap-2 justify-center">
            {character.birth_year && (
              <Chip
                label={`Birth: ${character.birth_year}`}
                size="small"
                sx={{
                  background: "rgba(255, 215, 0, 0.1)",
                  color: "#FFD700",
                  border: "1px solid #FFD700",
                  fontFamily: "Orbitron, monospace",
                  fontSize: "0.75rem",
                }}
              />
            )}

            {character.gender && (
              <Chip
                label={`Gender: ${getGenderLabel(character.gender)}`}
                size="small"
                sx={{
                  background: "rgba(255, 215, 0, 0.1)",
                  color: "#FFD700",
                  border: "1px solid #FFD700",
                  fontFamily: "Orbitron, monospace",
                  fontSize: "0.75rem",
                }}
              />
            )}

            {character.height && (
              <Chip
                label={`Height: ${character.height} cm`}
                size="small"
                sx={{
                  background: "rgba(255, 215, 0, 0.1)",
                  color: "#FFD700",
                  border: "1px solid #FFD700",
                  fontFamily: "Orbitron, monospace",
                  fontSize: "0.75rem",
                }}
              />
            )}

            {character.mass && (
              <Chip
                label={`Mass: ${character.mass} kg`}
                size="small"
                sx={{
                  background: "rgba(255, 215, 0, 0.1)",
                  color: "#FFD700",
                  border: "1px solid #FFD700",
                  fontFamily: "Orbitron, monospace",
                  fontSize: "0.75rem",
                }}
              />
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;
