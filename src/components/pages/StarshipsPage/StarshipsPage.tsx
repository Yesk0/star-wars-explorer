import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import SearchBar from "../../common/SearchBar/SearchBar";
import StarshipList from "./StarshipList";
import { setSearch } from "../../../store/slices/starshipsSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FavoriteToggleButton from "../../common/FavoriteToggleButton/FavoriteToggleButton";
import Pagination from "../../common/Pagination/Pagination";

const StarshipsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { search, page, count } = useSelector(
    (state: RootState) => state.starships
  );
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
          Starships
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
          Explore legendary ships of the Star Wars universe
        </Typography>
      </Box>
      <Box className="w-full flex justify-center items-center mb-6">
        <Box className="flex items-center gap-2 max-w-xl w-full">
          <SearchBar
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            placeholder="Search by starship name..."
          />
          <FavoriteToggleButton
            isActive={showOnlyFavorites}
            onToggle={handleFavoriteToggle}
            ariaLabel="Show only favorites"
          />
        </Box>
      </Box>
      <StarshipList showOnlyFavorites={showOnlyFavorites} />
      {!showOnlyFavorites && (
        <Pagination
          count={Math.ceil(count / 20)}
          page={page}
          onChange={(_e, value) =>
            dispatch({ type: "starships/setPage", payload: value })
          }
        />
      )}
    </Container>
  );
};

export default StarshipsPage;
