import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import SearchBar from "../../common/SearchBar/SearchBar";
import Pagination from "../../common/Pagination/Pagination";
import PlanetList from "./PlanetList";
import { setPage, setSearch } from "../../../store/slices/planetsSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const PlanetsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { page, count, search } = useSelector(
    (state: RootState) => state.planets
  );
  const pageSize = 10;
  const pageCount = Math.ceil(count / pageSize);

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
          Planets
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
          Explore worlds of a galaxy far, far away
        </Typography>
      </Box>

      <SearchBar
        placeholder="Search by planet name..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />

      <PlanetList />

      {pageCount > 1 && (
        <Box className="mt-8 flex justify-center">
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => dispatch(setPage(value))}
          />
        </Box>
      )}
    </Container>
  );
};

export default PlanetsPage;
