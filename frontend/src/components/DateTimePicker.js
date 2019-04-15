import React from "react";
import moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import "react-widgets/dist/css/react-widgets.css";

momentLocalizer(moment);
export const renderDateTimePicker = ({
  input: { onChange, value },
  showTime,
  disabled,
  Format,
  editFormat
}) => (
  <div>
    <DateTimePicker
      onChange={onChange}
      editFormat={editFormat ? editFormat : "MMM D, Y H:mm"}
      format={Format ? Format : "MMM D, Y H:mm"}
      time={showTime}
      timeFormat="H:mm"
      value={!value ? null : new Date(value)}
      step={30}
      min={new Date()}
      disabled={disabled}
    />
  </div>
);
