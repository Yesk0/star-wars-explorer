import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import type { Character } from "../../../types/character";

interface CharacterDetailProps {
  character: Character;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({ character }) => {
  const navigate = useNavigate();

  const getCharacterImage = (name: string) => {
    const imageName = name.toLowerCase().replace(/\s+/g, "-");
    return `/images/characters/${imageName}.jpeg`;
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

  return (
    <Box className="flex flex-col items-center text-center gap-6">
      <Avatar
        src={getCharacterImage(character.name)}
        alt={character.name}
        sx={{
          width: 120,
          height: 120,
          marginBottom: 2,
          border: "4px solid #FFD700",
          boxShadow: "0 0 30px rgba(255, 215, 0, 0.3)",
        }}
      />
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Orbitron, monospace",
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "2px",
          color: "#FFD700",
          marginBottom: "1rem",
        }}
      >
        {character.name || "Unknown character"}
      </Typography>
      <Box className="flex flex-wrap gap-3 justify-center">
        {character.birth_year && (
          <Chip
            label={`Birth: ${character.birth_year}`}
            size="medium"
            sx={{
              background: "rgba(255, 215, 0, 0.1)",
              color: "#FFD700",
              border: "1px solid #FFD700",
              fontFamily: "Orbitron, monospace",
              fontSize: "1rem",
            }}
          />
        )}
        {character.gender && (
          <Chip
            label={`Gender: ${getGenderLabel(character.gender)}`}
            size="medium"
            sx={{
              background: "rgba(255, 215, 0, 0.1)",
              color: "#FFD700",
              border: "1px solid #FFD700",
              fontFamily: "Orbitron, monospace",
              fontSize: "1rem",
            }}
          />
        )}
        {character.height && (
          <Chip
            label={`Height: ${character.height} cm`}
            size="medium"
            sx={{
              background: "rgba(255, 215, 0, 0.1)",
              color: "#FFD700",
              border: "1px solid #FFD700",
              fontFamily: "Orbitron, monospace",
              fontSize: "1rem",
            }}
          />
        )}
        {character.mass && (
          <Chip
            label={`Mass: ${character.mass} kg`}
            size="medium"
            sx={{
              background: "rgba(255, 215, 0, 0.1)",
              color: "#FFD700",
              border: "1px solid #FFD700",
              fontFamily: "Orbitron, monospace",
              fontSize: "1rem",
            }}
          />
        )}
      </Box>
      <Button
        variant="outlined"
        sx={{
          color: "#FFD700",
          borderColor: "#FFD700",
          fontFamily: "Orbitron, monospace",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginTop: "2rem",
          "&:hover": {
            background: "rgba(255, 215, 0, 0.1)",
            borderColor: "#fff",
          },
        }}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
    </Box>
  );
};

export default CharacterDetail;
