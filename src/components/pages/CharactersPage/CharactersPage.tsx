import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import SearchBar from "../../common/SearchBar/SearchBar";
import CharacterList from "./CharacterList";
import { setSearch } from "../../../store/slices/charactersSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FavoriteToggleButton from "../../common/FavoriteToggleButton/FavoriteToggleButton";

const CharactersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { search } = useSelector((state: RootState) => state.characters);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const handleFavoriteToggle = () => {
    setShowOnlyFavorites((prev) => {
      const next = !prev;
      if (next) {
        dispatch(setSearch(""));
      }
      return next;
    });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box className="text-center mb-8">
        <Typography
          variant="h2"
          className="sw-title mb-4"
          sx={{
            fontFamily: "Orbitron, monospace",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "3px",
            background: "linear-gradient(45deg, #FFD700, #ffffff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "2rem",
          }}
        >
          Characters
        </Typography>
        <Typography
          variant="h6"
          className="sw-subtitle"
          sx={{
            fontFamily: "Orbitron, monospace",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "2px",
            color: "#FFD700",
            marginBottom: "3rem",
          }}
        >
          Explore Star Wars characters
        </Typography>
      </Box>
      <Box className="w-full flex justify-center items-center mb-6">
        <Box className="flex items-center gap-2 max-w-xl w-full">
          <SearchBar
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            placeholder="Search by character name..."
          />
          <FavoriteToggleButton
            isActive={showOnlyFavorites}
            onToggle={handleFavoriteToggle}
            ariaLabel="Показать только избранное"
          />
        </Box>
      </Box>
      <CharacterList showOnlyFavorites={showOnlyFavorites} />
    </Container>
  );
};

export default CharactersPage;
