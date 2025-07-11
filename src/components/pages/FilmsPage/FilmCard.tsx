import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import type { Film } from "../../../types/film";

interface FilmCardProps {
  film: Film;
}

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
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
