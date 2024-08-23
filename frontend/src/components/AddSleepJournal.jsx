import { Button, Grid, Typography } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TimeSelector } from "./TimeSelector";
import DateSelector from "./DateSelector";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useRef, useState } from "react";
import SleepDataContext from "../context/SleepDataContext";
export function AddSleepJournal() {
  const sleepDataCtx = useContext(SleepDataContext);
  const bedTimeRef = useRef();
  const wakeUpTimeRef = useRef();
  const [dayOfSleep, setDayOfSleep] = useState("Today");

  function handleAddSleepRecord() {
    const bedTime = bedTimeRef.current.querySelector("input").value;
    const wakeUpTime = wakeUpTimeRef.current.querySelector("input").value;

    sleepDataCtx.addSleepData({
      bedTime,
      wakeUpTime,
      dayOfSleep,
    });
  }

  function handleDateSelect(date) {
    setDayOfSleep(date);
  }

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          marginBottom: "1rem",
          marginTop: "0.5rem",
          display: "inline-block",
        }}
      >
        How much did you sleep
      </Typography>
      <DateSelector onSelect={(date) => handleDateSelect(date)} />
      <Typography
        variant="h4"
        component="h1"
        sx={{
          marginBottom: "1rem",
          marginTop: "0.5rem",
          display: "inline-block",
        }}
      >
        ?
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "2rem" }}
        alignItems="center"
      >
        <Grid item xs={6} md={6} sm={4} lg={4}>
          <TimeSelector ref={bedTimeRef} label="Bed Time" />
        </Grid>
        <Grid item xs={6} md={6} sm={4} lg={4}>
          <TimeSelector ref={wakeUpTimeRef} label="Wakeup Time" />
        </Grid>
        <Grid item xs={6} md={6} sm={4} lg={4}>
          <Button
            variant="contained"
            onClick={handleAddSleepRecord}
            sx={{ height: "3.4rem", marginTop: "0.4rem" }}
          >
            Add Entry
          </Button>
        </Grid>
      </Grid>
      {/* <Grid container marginTop="8rem">
        <Button
          variant="contained"
          sx={{
            textTransform: "capitalize",
            paddingX: "1.2rem",
            paddingY: "0.5rem",
          }}
        >
          <Typography variant="h6" component="a">
            Show History{" "}
            <ArrowForwardIcon
              sx={{ marginLeft: "1rem", verticalAlign: "middle" }}
            />
          </Typography>
        </Button>
      </Grid> */}
    </>
  );
}
