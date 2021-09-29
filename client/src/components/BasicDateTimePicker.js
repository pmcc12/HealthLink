import React, { Fragment, useState } from "react";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns'; // choose your lib


function BasicDateTimePicker({setSelectedDate, selectedDate}) {

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          label="DateTimePicker"
          inputVariant="outlined"
          minDate={new Date()}
          value={selectedDate}
          onChange={handleDateChange}
          format="yyyy-MM-dd HH:mm:ss"
        />
    </MuiPickersUtilsProvider>
  );
}

export default BasicDateTimePicker;
