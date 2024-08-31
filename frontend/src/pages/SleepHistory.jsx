import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { CustomAccordion } from "../ui/CustomAccordion";
import CustomDatePicker from "../ui/CustomDatePicker";

function SummaryComponent({ title }) {
  return (
    <>
      <Typography
        variant="h5"
        component="h3"
        sx={{ color: "rgb(100, 97, 224)", display: "inline-block" }}
      >
        {title}th Aug 2024
      </Typography>
      <Typography
        variant="body2"
        component="span"
        sx={{
          color: "black",
          fontSize: "0.8rem",
          marginY: "auto",
          marginLeft: "1rem",
        }}
      >
        Monday
      </Typography>

      <Typography
        variant="body2"
        component="span"
        sx={{
          color: "white",
          background: "green",
          fontSize: "0.8rem",
          marginY: "auto",
          marginLeft: "1rem",
        }}
      >
        5 hours
      </Typography>
    </>
  );
}
export function SleepHistory() {
  return (
    <Container sx={{ width: "80%", marginTop: "2rem" }}>
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
        <Box sx={{ mx: "1rem" }}>
          <CustomDatePicker label="Start Date" />
        </Box>
        <CustomDatePicker label="Last Date" />
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
      <Box
        sx={{
          padding: "1rem",
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>Last 7 Days</h2>
        <Box sx={{ height: "100%" }} alignItems="center">
          {[1, 2, 3, 4, 5, 6].map((x) => (
            <CustomAccordion summaryComp={<SummaryComponent title={x} />}>
              <Box alignItems="center">
                <Grid container spacing={2}>
                  {["9.00 - 10.00", "11.00 - 12.00", "1.00 - 10.00 PM"].map(
                    (time) => (
                      <Grid item xs={3} md={3} lg={2} sm={3}>
                        <Paper
                          sx={{ backgroundColor: "F7F7F7", padding: "1rem" }}
                          elevation={2}
                        >
                          <Typography
                            variant="h6"
                            component="span"
                            sx={{ color: "black" }}
                          >
                            {time}
                          </Typography>
                        </Paper>
                      </Grid>
                    )
                  )}
                </Grid>
              </Box>
            </CustomAccordion>
          ))}
        </Box>
        <Typography
          variant="h6"
          component="a"
          align="center"
          sx={{
            textDecoration: "underline",
            color: "black",
            marginTop: "1rem",
          }}
        >
          Load More
        </Typography>
      </Box>
    </Container>
  );
}
