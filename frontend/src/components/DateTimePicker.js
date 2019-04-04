import React from "react";
import moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import "react-widgets/dist/css/react-widgets.css";

momentLocalizer(moment);

let date = new Date();
export const renderDateTimePicker = ({
  input: { onChange, value },
  showTime
}) => (
  <div>
    <DateTimePicker
      onChange={onChange}
      editFormat="MMM D, Y H:mm"
      format="MMM D, Y H:mm"
      time={showTime}
      timeFormat="H:mm"
      step={30}
      defaultValue={date}
      min={new Date()}
    />
  </div>
);
