import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";
import HomePage from "./components/pages/HomePage/HomePage";
import CharacterDetailPage from "./components/pages/CharacterDetailPage/CharacterDetailPage";
import PlanetDetailPage from "./components/pages/PlanetDetailPage/PlanetDetailPage";
import StarshipDetailPage from "./components/pages/StarshipDetailPage/StarshipDetailPage";
import PlanetsPage from "./components/pages/PlanetsPage/PlanetsPage";
import StarshipsPage from "./components/pages/StarshipsPage/StarshipsPage";
import FilmsPage from "./components/pages/FilmsPage/FilmsPage";
import NotFound from "./components/common/NotFound/NotFound";
import Box from "@mui/material/Box";
import StatusSnackbar from "./components/common/StatusSnackbar/StatusSnackbar";

function App() {
  return (
    <Router>
      <Box
        className="min-h-screen flex flex-col"
        sx={{
          background:
            "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2d2d2d 100%)",
          minHeight: "100vh",
          fontFamily: "Orbitron, monospace",
        }}
      >
        <Header />
        <Box
          component="main"
          className="flex-1"
          sx={{
            flex: 1,
            padding: "2rem 0",
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/character/:id" element={<CharacterDetailPage />} />
            <Route path="/planet/:id" element={<PlanetDetailPage />} />
            <Route path="/starship/:id" element={<StarshipDetailPage />} />
            <Route path="/planets" element={<PlanetsPage />} />
            <Route path="/starships" element={<StarshipsPage />} />
            <Route path="/films" element={<FilmsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
        <Footer />
        <StatusSnackbar />
      </Box>
    </Router>
  );
}

export default App;
