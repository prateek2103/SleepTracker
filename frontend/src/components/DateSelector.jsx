import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  Typography,
} from "@mui/material";
import { forwardRef, useState, useRef } from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

const DateSelector = forwardRef(({ onSelect }, ref) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [daySelected, setDaySelected] = useState("Today");
  const [dateCalender, setDateCalender] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  function handleChooseSelect(event) {
    setAnchorEl(event.target.parentElement);
  }

  const handleCalenderClose = () => {
    setAnchorEl(null);
  };

  function handleDayChange(event) {
    setDaySelected(event.target.value);
    setDateCalender(null);
    onSelect(event.target.value);
  }

  function handleDateCalenderChange(date) {
    setAnchorEl(null);
    const formattedDate = dayjs(date).format("MMM D, YYYY");
    setDateCalender(formattedDate);
    onSelect(formattedDate);
  }

  function resetDateCalender() {
    setDateCalender(null);
    setDaySelected("Today");
    onSelect("Today");
  }

  return (
    <>
      {dateCalender && (
        <>
          <Button
            variant="outlined"
            sx={{ textTransform: "none", marginTop: "0.2rem" }}
          >
            <Typography
              variant="h3"
              component="span"
              onClick={resetDateCalender}
              sx={{
                color: "#3C9EFF",
                fontWeight: "bold",
                display: "inline-block",
              }}
            >
              on {dateCalender}
            </Typography>
          </Button>
        </>
      )}
      {!dateCalender && (
        <>
          <FormControl sx={{ width: "9rem" }}>
            <InputLabel id="dayLabel">Day</InputLabel>
            <Select
              id="dayLabel"
              label="day"
              value={daySelected}
              inputRef={ref}
              onChange={handleDayChange}
            >
              <MenuItem value="Today">Today</MenuItem>
              <MenuItem value="Yesterday">Yesterday</MenuItem>
              <MenuItem
                value="choose"
                aria-describedby={id}
                onClick={handleChooseSelect}
              >
                Choose Day
              </MenuItem>
            </Select>
          </FormControl>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleCalenderClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Box>
              <LocalizationProvider
                sx={{ display: "inline" }}
                dateAdapter={AdapterDayjs}
              >
                <DateCalendar onChange={handleDateCalenderChange} />
              </LocalizationProvider>
            </Box>
          </Popover>
        </>
      )}
    </>
  );
});

export default DateSelector;
