import React from "react";
import moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import "react-widgets/dist/css/react-widgets.css";
// import Globalize from "globalize";

momentLocalizer(moment);

// let formatter = Globalize.dateFormatter({ raw: "Y-M-D H:mm" });

export const renderDateTimePicker = ({
  input: { onChange, value },
  showTime
}) => (
  <DateTimePicker
    onChange={onChange}
    editFormat="MMM D, Y H:mm"
    format={{ raw: "Y-M-D H:mm" }}
    time={showTime}
    value={!value ? null : new Date(value)}
  />
);
