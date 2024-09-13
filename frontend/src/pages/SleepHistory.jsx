import { Box, Container, Grid, Paper, Typography } from "@mui/material";

import SleepHistoryFilters from "../components/SleepHistoryFilters";
import SleepHistoryJournal from "../components/SleepHistoryJournal";
import { useState } from "react";

export function SleepHistory() {
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

  function handleOnSearch(startDate, enDate) {
    console.log(startDate, enDate);
  }

  const [data, setData] = useState(initialState);

  return (
    <Container sx={{ width: "80%", marginTop: "2rem" }}>
      <SleepHistoryFilters onSearch={handleOnSearch} />
      <SleepHistoryJournal data={data} />
    </Container>
  );
}
