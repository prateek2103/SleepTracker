import { Box, styled, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
export function AverageSleepMetric({ value }) {
  const calculateStrokeDashoffset = (percentage, radius) => {
    const circumference = 2 * Math.PI * radius;
    return circumference * (1 - percentage / 100);
  };

  const AnimatedCircularProgress = styled(CircularProgress)(
    ({ theme, value }) => {
      const radius = 20; // Radius of the circle (size / 2 - thickness)
      const circumference = 2 * Math.PI * radius;

      return {
        position: "relative",
        "& .MuiCircularProgress-svg": {
          display: "block",
        },
        "& .MuiCircularProgress-circle": {
          // strokeLinecap: "round",
          stroke: "#6CC5F3", // Customize color
          strokeDasharray: circumference,
          strokeDashoffset: circumference,
          animation: `fill 2s ease-out forwards`,
        },
        "@keyframes fill": {
          "0%": {
            strokeDashoffset: circumference,
          },
          "100%": {
            strokeDashoffset: calculateStrokeDashoffset(value, radius),
          },
        },
      };
    }
  );

  return (
    <Box display="flex">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ marginLeft: "5rem" }}
      >
        <svg width="0" height="0">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "rgb(36, 119, 170)", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "rgb(100, 97, 224)", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
        </svg>
        <AnimatedCircularProgress
          sx={{
            color: "transparent",
            strokeLinecap: "flat",
            "& .MuiCircularProgress-circle": {
              stroke: "url(#gradient)",
            },
          }}
          size={200}
          thickness={5}
          variant="determinate"
          value={value}
        />
        <Typography marginTop="1rem" variant="h4" component="span">
          8 hours per week
        </Typography>
      </Box>
    </Box>
  );
}
