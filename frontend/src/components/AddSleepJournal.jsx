import { Button, Grid, Typography } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TimeSelector } from "./TimeSelector";
import DateSelector from "./DateSelector";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddIcon from "@mui/icons-material/Add";
export function AddSleepJournal() {
  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        sx={{ marginBottom: "1.2rem", color: "#6D6868" }}
      >
        How much did you sleep <DateSelector /> ?
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
        <Grid item xs={6} md={6} sm={4} lg={4}>
          <TimeSelector label="Bed Time" />
        </Grid>
        <Grid item xs={6} md={6} sm={4} lg={4}>
          <TimeSelector label="Wakeup Time" />
        </Grid>
        {/* <Grid item xs={6} md={6} sm={3} lg={4}>
          <DateSelector />
        </Grid> */}
        <Grid item xs={6} md={6} sm={4} lg={4} container>
          <Button variant="text">
            <AddIcon sx={{ fontSize: 40, verticalAlign: "middle" }} />
          </Button>
        </Grid>
      </Grid>
      <Grid container marginTop="5rem">
        <Button
          variant="contained"
          sx={{
            textTransform: "capitalize",
            color: "white",
            paddingX: "1.2rem",
            paddingY: "0.5rem",
          }}
        >
          <Typography variant="body1" component="a">
            Recent Logs
          </Typography>
        </Button>
      </Grid>
    </>
  );
}
