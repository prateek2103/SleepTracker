import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function DateSelector() {
  return (
    <FormControl sx={{ width: "6rem" }}>
      <Select
        id="demo-simple-select"
        label="day"
        value={10}
        // onChange={handleChange}
      >
        <MenuItem value={10}>Today</MenuItem>
        <MenuItem value={20}>Yesterday</MenuItem>
        <MenuItem value={30}>Choose Day</MenuItem>
      </Select>
    </FormControl>
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    //   <DemoContainer components={["DatePicker"]}>
    //     <DatePicker label="Day" />
    //   </DemoContainer>
    // </LocalizationProvider>
  );
}
