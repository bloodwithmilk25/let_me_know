import React from "react";
import moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import "react-widgets/dist/css/react-widgets.css";

momentLocalizer(moment);
export const renderDateTimePicker = ({
  props,
  input: { onChange, value, disabled },
  showTime
}) => {
  console.log(props.disabled);
  return (
    <div>
      <DateTimePicker
        onChange={onChange}
        editFormat="MMM D, Y H:mm"
        format="MMM D, Y H:mm"
        time={showTime}
        timeFormat="H:mm"
        value={!value ? null : new Date(value)}
        step={30}
        min={new Date()}
      />
    </div>
  );
};
