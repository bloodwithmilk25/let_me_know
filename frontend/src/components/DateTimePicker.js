import React from "react";
import moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import "react-widgets/dist/css/react-widgets.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

momentLocalizer(moment);
export const renderDateTimePicker = ({
  input: { onChange, value },
  showTime,
  disabled,
  Format,
  editFormat,
  min
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
      min={min ? min : new Date()}
      disabled={disabled}
    />
  </div>
);

export const renderDatePicker = ({
  input,
  placeholder,
  defaultValue,
  meta: { touched, error }
}) => (
  <div>
    <DatePicker
      {...input}
      dateFormat="YYYY-MM-dd"
      selected={input.value ? new Date(input.value) : null}
      onChange={date => input.onChange(date)}
    />
    {touched && error && <span>{error}</span>}
  </div>
);
