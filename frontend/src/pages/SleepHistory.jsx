import { Box, Container, Grid, Paper, Typography } from "@mui/material";

import SleepHistoryFilters from "../components/SleepHistoryFilters";
import SleepHistoryJournal from "../components/SleepHistoryJournal";

export function SleepHistory() {
  return (
    <Container sx={{ width: "80%", marginTop: "2rem" }}>
      <SleepHistoryFilters />
      <SleepHistoryJournal />
    </Container>
  );
}
