import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import { loadPlanets } from "../../../store/slices/planetsSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoadingSpinner from "../../common/LoadingSnipper/LoadingSpinner";
import PlanetDetail from "./PlanetDetail";

const PlanetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector(
    (state: RootState) => state.starships
  );
  const [planet, setPlanet] = useState<any>(null);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(loadPlanets({ page: 1, search: "" }));
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    if (items.length > 0 && id) {
      const foundPlanet = items.find((planet) => {
        const planetId = planet.id?.toString().replace(/^planet-/, "");
        return planetId === id || planet.name === id;
      });
      setPlanet(foundPlanet);
    }
  }, [items, id]);

  if (status === "loading") {
    return <LoadingSpinner message="Loading starship..." />;
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

  if (!planet) {
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
            Planet not found
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
          to="/planets"
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
          Back to planets
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
          <PlanetDetail planet={planet} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default PlanetDetailPage;
