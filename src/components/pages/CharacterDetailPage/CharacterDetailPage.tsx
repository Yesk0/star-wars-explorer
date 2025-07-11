import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import { loadCharacters } from "../../../store/slices/charactersSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoadingSpinner from "../../common/LoadingSnipper/LoadingSpinner";

const CharacterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector(
    (state: RootState) => state.characters
  );
  const [character, setCharacter] = useState<any>(null);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(loadCharacters({ page: 1, search: "" }));
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    if (items.length > 0 && id) {
      const foundCharacter = items.find((char) => {
        const charId = char.id?.toString().replace(/^char-/, "");
        return charId === id || char.name === id;
      });
      setCharacter(foundCharacter);
    }
  }, [items, id]);

  const getCharacterImage = (name: string) => {
    const imageName = name.toLowerCase().replace(/\s+/g, "-");
    try {
      return `/images/characters/${imageName}.jpeg`;
    } catch {
      return "/images/characters/luke-skywalker.jpeg";
    }
  };

  if (status === "loading") {
    return <LoadingSpinner message="Loading character..." />;
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box className="text-center">
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Orbitron, monospace",
              color: "#8B0000",
              textTransform: "uppercase",
              letterSpacing: "2px",
              textShadow: "0 0 10px #8B0000",
            }}
          >
            {error}
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!character) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box className="text-center">
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Orbitron, monospace",
              color: "#FFD700",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Character not found
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box className="mb-6">
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{
            background: "linear-gradient(45deg, #FFD700, #B8860B)",
            border: "2px solid #FFD700",
            color: "#000000",
            fontFamily: "Orbitron, monospace",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "2px",
            padding: "12px 24px",
            boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(45deg, #B8860B, #FFD700)",
              boxShadow: "0 0 30px rgba(255, 215, 0, 0.6)",
              transform: "translateY(-2px)",
            },
          }}
        >
          Back to characters
        </Button>
      </Box>

      <Card
        className="sw-card"
        sx={{
          background: "linear-gradient(145deg, #2d2d2d, #404040)",
          border: "2px solid #FFD700",
          boxShadow: "0 12px 48px rgba(255, 215, 0, 0.2)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          padding: "2rem",
        }}
      >
        <CardContent>
          <Box className="flex flex-col md:flex-row gap-8">
            <Box className="flex-shrink-0">
              <Avatar
                src={getCharacterImage(character.name)}
                alt={character.name}
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
                {character.name}
              </Typography>

              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {character.birth_year && (
                  <Chip
                    label={`Birth: ${character.birth_year}`}
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

                {character.gender && (
                  <Chip
                    label={`Gender: ${character.gender}`}
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

                {character.height && (
                  <Chip
                    label={`Height: ${character.height} cm`}
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

                {character.mass && (
                  <Chip
                    label={`Mass: ${character.mass} kg`}
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

                {character.eye_color && (
                  <Chip
                    label={`Eye color: ${character.eye_color}`}
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

                {character.hair_color && (
                  <Chip
                    label={`Hair color: ${character.hair_color}`}
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
                Physical characteristics
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
                {character.name} - this is a character from the Star Wars
                universe.
                {character.gender && ` Gender: ${character.gender}.`}
                {character.birth_year &&
                  ` Birth year: ${character.birth_year}.`}
                {character.height && ` Height: ${character.height} cm.`}
                {character.mass && ` Mass: ${character.mass} kg.`}
                {character.eye_color && ` Eye color: ${character.eye_color}.`}
                {character.hair_color &&
                  ` Hair color: ${character.hair_color}.`}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CharacterDetailPage;
