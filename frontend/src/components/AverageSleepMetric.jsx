import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
export function AverageSleepMetric() {
  return (
    <Box display="flex">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ marginLeft: "5rem" }}
      >
        <CircularProgress
          size={200}
          thickness={5}
          sx={{ color: "#3C9EFF" }}
          variant="determinate"
          value={75}
        />
        <Typography
          marginTop="1rem"
          variant="h6"
          component="span"
          color="#6D6868"
        >
          8 hours per week
        </Typography>
      </Box>
    </Box>
  );
}
