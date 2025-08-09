import React, { useState } from "react";
import dayjs from "dayjs";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const SelectDatePicker = ({ onChange, value, disabled = false }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value ? dayjs(moment(value).format("YYYY-MM-DD")) : null}
        className="select-date"
        slotProps={{
          textField: {
            disabled: disabled,
            fullWidth: true,
            InputProps: {
              sx: {
                "& input": {
                  width: "100%",
                  padding: "8.5px 14px",
                  fontFamily: "'PublicSans', 'Siemreap', sans-serif",
                },
              },
            },
          },
        }}
        onChange={(val) => {
          if (val) {
            onChange(new Date(val));
          } else {
            onChange("");
          }
        }}
      />
    </LocalizationProvider>
  );
};
