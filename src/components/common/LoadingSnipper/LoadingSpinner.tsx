import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Загрузка...",
  size = 60,
}) => (
  <Box className="flex justify-center items-center py-20">
    <Box className="text-center">
      <CircularProgress
        size={size}
        sx={{
          color: "#FFD700",
          marginBottom: 2,
          animation: "sw-pulse 2s infinite",
        }}
      />
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Orbitron, monospace",
          color: "#FFD700",
          textTransform: "uppercase",
          letterSpacing: "2px",
          animation: "sw-pulse 2s infinite",
          animationDelay: "0.5s",
        }}
      >
        {message}
      </Typography>
    </Box>
  </Box>
);

export default LoadingSpinner;
