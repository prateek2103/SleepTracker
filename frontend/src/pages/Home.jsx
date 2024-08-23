import { Container, Grid } from "@mui/material";
import { AverageSleepMetric } from "../components/AverageSleepMetric";
import { AddSleepJournal } from "../components/AddSleepJournal";
import Footer from "../components/Footer";
export function Home() {
  return (
    <Container maxWidth={false} sx={{ width: "90%" }}>
      <Grid marginY={15} container>
        <Grid item xs={12} sm={12} md={5} lg={5}>
          <AverageSleepMetric value={66} />
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7}>
          <AddSleepJournal />
        </Grid>
      </Grid>
    </Container>
  );
}
