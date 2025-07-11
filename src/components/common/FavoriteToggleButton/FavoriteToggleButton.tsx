import React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface FavoriteToggleButtonProps {
  isActive: boolean;
  onToggle: () => void;
  ariaLabel?: string;
}

const FavoriteToggleButton: React.FC<FavoriteToggleButtonProps> = ({
  isActive,
  onToggle,
  ariaLabel,
}) => (
  <IconButton
    onClick={onToggle}
    aria-label={
      ariaLabel || (isActive ? "Remove from favorites" : "Add to favorites")
    }
    size="small"
    sx={{ ml: 1 }}
  >
    {isActive ? (
      <FavoriteIcon sx={{ color: "#FFD700" }} />
    ) : (
      <FavoriteBorderIcon sx={{ color: "#FFD700" }} />
    )}
  </IconButton>
);

export default FavoriteToggleButton;
