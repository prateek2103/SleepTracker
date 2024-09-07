import { sleepDataReducer } from "../reducers/sleepDataReducer";
import { useReducer } from "react";
import TimeSlotComponent from "../components/TimeSlotComponent";
import { formatDate } from "../utils/commonUtil";
import { WEEKDAYS } from "../utils/SleepConstants";
import { Box, Grid, Paper, Typography } from "@mui/material";

export default function SleepHistoryJournal() {
  const initialState = [
    {
      date: "19072024",
      hoursSlept: "5",
      weekDay: 1,
      records: [
        { sleepTime: "9:00 AM", wakeTime: "10:00 AM" },
        { sleepTime: "11:00 PM", wakeTime: "10:00 AM" },
      ],
    },
    {
      date: "20072024",
      hoursSlept: "7",
      weekDay: 2,
      records: [
        { sleepTime: "7:00 AM", wakeTime: "10:00 AM" },
        { sleepTime: "12:00 PM", wakeTime: "5:00 PM" },
      ],
    },
    {
      date: "21072024",
      hoursSlept: "8",
      weekDay: 3,
      records: [
        { sleepTime: "9:00 AM", wakeTime: "10:00 AM" },
        { sleepTime: "11:00 AM", wakeTime: "12:00 PM" },
        { sleepTime: "1:00 PM", wakeTime: "8:00 PM" },
      ],
    },
  ];

  const [sleepData, dispatch] = useReducer(sleepDataReducer, initialState);

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
                    background:
                      "linear-gradient(rgb(36, 119, 170) 0%, rgb(100, 97, 224) 100%)",
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
