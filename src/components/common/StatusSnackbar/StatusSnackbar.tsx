import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import type { RootState } from "../../../store";

const getStatusMessage = (
  status: string,
  error: string | null,
  label: string
) => {
  if (status === "idle") return `${label}: Waiting for action...`;
  if (status === "loading") return `Loading ${label.toLowerCase()}...`;
  if (status === "success") return `${label} loaded successfully!`;
  if (status === "error")
    return `Error loading ${label.toLowerCase()}: ${error || "Error"}`;
  return null;
};

const StatusSnackbar: React.FC = () => {
  const characters = useSelector((state: RootState) => state.characters);
  const planets = useSelector((state: RootState) => state.planets);
  const starships = useSelector((state: RootState) => state.starships);
  const films = useSelector((state: RootState) => state.films);
  const location = useLocation();

  const notifications = [
    { ...characters, label: "Characters" },
    { ...planets, label: "Planets" },
    { ...starships, label: "Starships" },
    { ...films, label: "Films" },
  ];

  let active;
  if (location.pathname.startsWith("/planets")) active = notifications[1];
  else if (location.pathname.startsWith("/starships"))
    active = notifications[2];
  else if (location.pathname.startsWith("/films")) active = notifications[3];
  else active = notifications[0]; // characters по умолчанию

  const [open, setOpen] = useState(false);
  const [lastStatus, setLastStatus] = useState<string | null>(null);
  const [lastLabel, setLastLabel] = useState<string | null>(null);
  const [lastPath, setLastPath] = useState<string>(location.pathname);

  useEffect(() => {
    if (
      active &&
      (active.status !== lastStatus ||
        active.label !== lastLabel ||
        location.pathname !== lastPath)
    ) {
      setOpen(true);
      setLastStatus(active.status);
      setLastLabel(active.label);
      setLastPath(location.pathname);
    }
  }, [active, lastStatus, lastLabel, location.pathname, lastPath]);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const message = active
    ? getStatusMessage(active.status, active.error, active.label)
    : "";
  let severity: "info" | "success" | "error" = "info";
  if (active?.status === "error") severity = "error";
  else if (active?.status === "success") severity = "success";
  else severity = "info";

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        severity={severity}
        sx={{ width: "100%", fontFamily: "Orbitron, monospace" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default StatusSnackbar;
