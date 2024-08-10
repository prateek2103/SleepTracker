import "./App.css";
import { Box, Container, Grid } from "@mui/material";
import SleepTrackerAppBar from "./components/SleepTrackerAppBar";
import { AverageSleepMetric } from "./components/AverageSleepMetric";
import { AddSleepJournal } from "./components/AddSleepJournal";

function App() {
  return (
    <>
      <SleepTrackerAppBar />
      <Container>
        <Grid marginY={15} container>
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <AverageSleepMetric />
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7}>
            <AddSleepJournal />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
