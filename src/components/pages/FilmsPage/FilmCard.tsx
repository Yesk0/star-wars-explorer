import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import type { Film } from "../../../types/film";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import {
  addFavorite,
  removeFavorite,
} from "../../../store/slices/favoritesSlice";

interface FilmCardProps {
  film: Film;
}

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some(
    (fav) => fav.type === "film" && fav.id === film.id
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite({ type: "film", id: film.id }));
    } else {
      dispatch(addFavorite({ type: "film", id: film.id, data: film }));
    }
  };

  const getFilmImage = (title: string) => {
    const imageName = title.toLowerCase().replace(/\s+/g, "-");
    return `/src/assets/images/films/${imageName}.jpeg`;
  };

  return (
    <Card
      className="sw-card h-full"
      sx={{
        background: "linear-gradient(145deg, #2d2d2d, #404040)",
        border: "1px solid #FFD700",
        boxShadow: "0 8px 32px rgba(255, 215, 0, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        textDecoration: "none",
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
      <CardContent className="p-6">
        <Box className="flex flex-col items-center text-center">
          <Avatar
            src={getFilmImage(film.title)}
            alt={film.title}
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
              textAlign: "center",
            }}
          >
            {film.title || "Unknown film"}
          </Typography>

          <Box className="flex flex-col items-center gap-3 w-full mt-2">
            {film.episode_id && (
              <Chip
                label={`Episode ${film.episode_id}`}
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

            {film.director && (
              <Chip
                label={`Director: ${film.director}`}
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

            {film.release_date && (
              <Chip
                label={`Release: ${film.release_date}`}
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

export default FilmCard;
