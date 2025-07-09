import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import SearchBar from "../../common/SearchBar/SearchBar";
import Pagination from "../../common/Pagination/Pagination";
import CharacterList from "../CharactersPage/CharacterList";
import {
  setPage,
  setSearch,
  loadCharacters,
} from "../../../store/slices/charactersSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { page, count, search } = useSelector(
    (state: RootState) => state.characters
  );
  const pageSize = 10;
  const pageCount = Math.ceil(count / pageSize);

  // Загрузка данных при монтировании
  useEffect(() => {
    dispatch(loadCharacters({ page: 1, search: "" }));
  }, []);

  // Загрузка данных при изменении страницы (но не поиска)
  useEffect(() => {
    if (page > 0) {
      dispatch(loadCharacters({ page, search: "" }));
    }
  }, [dispatch, page]);

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

      <Box className="mb-6">
        <SearchBar
          placeholder="Search by character name..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
      </Box>

      <CharacterList />

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

export default HomePage;
