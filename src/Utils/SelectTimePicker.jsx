import React, { useState } from "react";
import dayjs from "dayjs";
import { Stack } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
export default function SelectTimePicker({ value, onChange, disabled }) {
  const getTimeValue = () => {
    if (!value) return null;
    const [hourStr, minuteStr] = value.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    return dayjs().set("hour", hour).set("minute", minute);
  };

  return (
    <Stack className={"dialog-container"}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          disabled={disabled}
          slotProps={{
            textField: {
              fullWidth: true,
              InputProps: {
                sx: {
                  "& input": {
                    width: "100%",
                    padding: "8.5px 14px",
                  },
                },
              },
            },
          }}
          value={getTimeValue()}
          onChange={(e) => onChange(moment(dayjs(e).toDate()).format("HH:mm"))}
        />
      </LocalizationProvider>
    </Stack>
  );
}
