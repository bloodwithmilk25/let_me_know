import React from "react";
import moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import "react-widgets/dist/css/react-widgets.css";
import DatePicker from "react-datepicker";
import { subYears } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    );
  }
};

momentLocalizer(moment);
export const renderDateTimePicker = ({
  input: { onChange, value },
  showTime,
  disabled,
  Format,
  editFormat,
  min,
  meta
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
      autoComplete="off"
    />
    {renderError(meta)}
  </div>
);

export const renderDatePicker = ({
  input,
  placeholder,
  defaultValue,
  meta
}) => (
  <div>
    <DatePicker
      {...input}
      dateFormat="YYYY-MM-dd"
      selected={input.value ? new Date(input.value) : null}
      onChange={date => input.onChange(date)}
      autoComplete="off"
      minDate={new Date(1900, 0, 1)}
      maxDate={subYears(new Date(), 13)}
      placeholderText="Select your birthday"
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
    />
    {renderError(meta)}
  </div>
);
