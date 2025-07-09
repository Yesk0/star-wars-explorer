import React from "react";
import MuiPagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

interface PaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ count, page, onChange }) => {
  return (
    <Box className="flex justify-center mt-8">
      <MuiPagination
        count={count}
        page={page}
        onChange={onChange}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#ffffff",
            fontFamily: "Orbitron, monospace",
            fontWeight: 600,
            fontSize: "1rem",
            border: "1px solid #FFD700",
            background: "rgba(255, 215, 0, 0.1)",
            margin: "0 4px",
            "&:hover": {
              background: "rgba(255, 215, 0, 0.2)",
              borderColor: "#ffffff",
              boxShadow: "0 0 15px rgba(255, 215, 0, 0.3)",
            },
            "&.Mui-selected": {
              background: "linear-gradient(45deg, #FFD700, #B8860B)",
              color: "#000000",
              borderColor: "#ffffff",
              boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
              fontWeight: 700,
            },
          },
          "& .MuiPaginationItem-ellipsis": {
            color: "#FFD700",
            fontFamily: "Orbitron, monospace",
            fontWeight: 700,
          },
        }}
      />
    </Box>
  );
};

export default Pagination;
