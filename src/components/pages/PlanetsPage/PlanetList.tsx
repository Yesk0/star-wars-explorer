import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import PlanetCard from "./PlanetCard";
import { loadPlanets } from "../../../store/slices/planetsSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface PlanetListProps {
  showOnlyFavorites?: boolean;
}

const PlanetList: React.FC<PlanetListProps> = ({ showOnlyFavorites }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredItems, status, error, page } = useSelector(
    (state: RootState) => state.planets
  );
  const favorites = useSelector((state: RootState) => state.favorites.items);

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadPlanets({ page, search: "" }));
    }
  }, [dispatch, status, page]);

  let itemsToShow = filteredItems;
  if (showOnlyFavorites) {
    const favIds = favorites
      .filter((f) => f.type === "planet")
      .map((f) => f.id);
    itemsToShow = filteredItems.filter((item) => favIds.includes(item.id));
  }

  if (status === "loading" || status === "idle") {
    return (
      <Box className="flex justify-center items-center py-20">
        <Box className="text-center">
          <CircularProgress
            sx={{
              color: "#FFD700",
              marginBottom: 2,
            }}
            size={60}
          />
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Orbitron, monospace",
              color: "#FFD700",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Loading...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (status === "error") {
    return (
      <Box className="text-center py-10">
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Orbitron, monospace",
            color: "#8B0000",
            textTransform: "uppercase",
            letterSpacing: "1px",
            textShadow: "0 0 10px #8B0000",
          }}
        >
          Error loading data
        </Typography>
        {error && (
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Orbitron, monospace",
              color: "rgba(255, 255, 255, 0.6)",
              marginTop: "1rem",
            }}
          >
            {error}
          </Typography>
        )}
      </Box>
    );
  }

  if (showOnlyFavorites && (!itemsToShow || !itemsToShow.length)) {
    return (
      <Box className="text-center py-10">
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Orbitron, monospace",
            color: "#FFD700",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          NO FAVORITES FOUND
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: "Orbitron, monospace",
            color: "rgba(255, 255, 255, 0.6)",
            marginTop: "1rem",
          }}
        >
          Add planets to favorites by clicking the heart icon on a card.
        </Typography>
      </Box>
    );
  }

  if (status === "success" && (!itemsToShow || !itemsToShow.length)) {
    return (
      <Box className="text-center py-10">
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Orbitron, monospace",
            color: "#FFD700",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          No results found
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: "Orbitron, monospace",
            color: "rgba(255, 255, 255, 0.6)",
            marginTop: "1rem",
          }}
        >
          Try refreshing the page or change your search query
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      className="sw-grid"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "2rem",
        padding: "2rem 0",
      }}
    >
      {itemsToShow.map((planet) => (
        <PlanetCard key={planet.id || planet.name} planet={planet} />
      ))}
    </Box>
  );
};

export default PlanetList;
