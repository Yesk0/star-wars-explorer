import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import SearchBar from "../../common/SearchBar/SearchBar";
import Pagination from "../../common/Pagination/Pagination";
import StarshipList from "./StarshipList";
import { setPage, setSearch } from "../../../store/slices/starshipsSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const StarshipsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { page, count, search } = useSelector(
    (state: RootState) => state.starships
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

      <SearchBar
        placeholder="Search by starship name..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />

      <StarshipList />

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

export default StarshipsPage;
