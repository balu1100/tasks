import { useState } from "react";
import { format } from "date-fns";
import DatePicker from "sassy-datepicker";
import "./calender.css";

const Calendar = ({ updateDate }) => {
  const [date, setDate] = useState(new Date());
  const onChange = (newDate) => {
    updateDate(format(newDate, "PP"));
    setDate(newDate);
  };
  return (
    <div className="cal-container">
      <DatePicker className="date-picker" selected={date} onChange={onChange} />
    </div>
  );
};
export default Calendar;
