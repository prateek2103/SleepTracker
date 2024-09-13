import { sleepDataReducer } from "../reducers/sleepDataReducer";
import { useReducer } from "react";
import TimeSlotComponent from "../components/TimeSlotComponent";
import { formatDate } from "../utils/commonUtil";
import { WEEKDAYS } from "../utils/SleepConstants";
import { Box, Grid, Paper, Typography } from "@mui/material";

export default function SleepHistoryJournal({ data }) {
  const [sleepData, dispatch] = useReducer(sleepDataReducer, data);

  return (
    <Box
      sx={{
        padding: "1rem",
        borderRadius: "1rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2>Last {sleepData.length} Days</h2>
      <Box sx={{ height: "100%" }} alignItems="center">
        {sleepData.map((sleepEntry) => (
          <Grid container spacing={2}>
            <Grid
              item
              xs={3}
              md={3}
              lg={3}
              sm={3}
              sx={{ marginBottom: "1rem" }}
            >
              <Box display="flex" alignItems="center">
                <Paper
                  elevation={3} // You can adjust the elevation level as needed
                  style={{
                    width: 60, // Set the size for the circular element
                    height: 60,
                    borderRadius: "50%", // Makes the element circular
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#6A8DF0",
                    color: "White",
                  }}
                >
                  {WEEKDAYS[sleepEntry.weekDay - 1]}
                </Paper>
                <Typography sx={{ marginLeft: "1rem" }}>
                  {formatDate(sleepEntry.date)}
                  <br />
                  {sleepEntry.hoursSlept} hours
                </Typography>
              </Box>
            </Grid>
            {sleepEntry.records.map((record) => (
              <>
                <TimeSlotComponent
                  sleepTime={record.sleepTime}
                  wakeTime={record.wakeTime}
                />
              </>
            ))}
          </Grid>
        ))}
        {/* <Typography
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
        </Typography> */}
      </Box>
    </Box>
  );
}
