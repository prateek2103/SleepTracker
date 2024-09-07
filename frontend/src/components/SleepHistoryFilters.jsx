import { Box, Button, Typography } from "@mui/material";
import CustomDatePicker from "../ui/CustomDatePicker";

export default function SleepHistoryFilters() {
  return (
    <>
      <Box
        sx={{ padding: "1rem", marginTop: "2rem" }}
        display="flex"
        alignItems="center"
      >
        <Typography
          variant="body1"
          component="h3"
          sx={{ color: "black", fontWeight: "bold" }}
        >
          Date range
        </Typography>
        <Box sx={{ marginLeft: "1rem" }}>
          <CustomDatePicker label="Start Date" sx={{ mx: "1rem" }} />
        </Box>
        <Box sx={{ mx: "1rem" }}>
          <CustomDatePicker label="Last Date" />
        </Box>
        <Button sx={{ width: "6rem", height: "3rem", marginTop: "5px" }}>
          Search
        </Button>
      </Box>
      <Box sx={{ padding: "1rem" }} display="flex" alignItems="center">
        <Typography
          variant="body1"
          component="h3"
          sx={{ color: "black", fontWeight: "bold" }}
        >
          Sort by:
        </Typography>
        <Button sx={{ marginLeft: "1rem" }}>
          <Typography variant="body1" component="h3" sx={{ color: "white" }}>
            Newest First
          </Typography>
        </Button>
        <Button sx={{ marginLeft: "1rem" }}>
          <Typography variant="body1" component="h3" sx={{ color: "white" }}>
            Oldest First
          </Typography>
        </Button>
        <Box sx={{ mx: "1rem" }}></Box>
      </Box>
    </>
  );
}
