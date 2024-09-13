import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { forwardRef, useImperativeHandle, useState } from "react";
export const CustomDatePicker = forwardRef(function CustomDatePicker(
  { label },
  ref
) {
  const [selectedDate, setSelectedDate] = useState(null);
  useImperativeHandle(ref, () => ({
    getDate: () => selectedDate.format("YYYY-MM-DD"),
  }));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={label}
          value={selectedDate}
          onChange={(newDate) => {
            setSelectedDate(newDate);
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
  ref;
});
