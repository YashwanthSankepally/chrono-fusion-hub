import { useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.scss";
import Header from "../Header/Header";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Clock from "./Clock/Clock";

const localizer = momentLocalizer(moment);

const CalendarApp = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleAddEvent = () => {
    setEvents([
      ...events,
      {
        id: events.length,
        title: newEvent.title,
        start: new Date(newEvent.start),
        end: new Date(newEvent.end),
      },
    ]);
    setNewEvent({ title: "", start: "", end: "" });
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const dayPropGetter = (date) => {
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return {
        className: "current-date",
      };
    }

    if (date.getDate() === 2 && date.getMonth() === 5) {
      return {
        className: "birthday-date",
      };
    }

    return {};
  };

  // Add recurring birthday event to events state
  const recurringEvents = [
    {
      id: -1, // Use a fixed ID or some identifier for recurring events
      title: "Birthday",
      start: new Date(new Date().getFullYear(), 5, 2, 0, 0),
      end: new Date(new Date().getFullYear(), 5, 2, 23, 59),
      recurring: true,
    },
  ];

  const allEvents = [...events, ...recurringEvents];

  return (
    <>
      <Header />
      <div>
        <Clock />
        <h1>Calendar App</h1>
        <div className="date-picker">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              renderInput={(params) => <input {...params} />}
            />
          </LocalizationProvider>
        </div>
        <BigCalendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          dayPropGetter={dayPropGetter}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.recurring ? "#ff69b4" : "#1e90ff", // Different color for recurring events
            },
          })}
        />
        <div className="event-form">
          <h2>Add New Event</h2>
          <input
            type="text"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
          <input
            type="datetime-local"
            value={newEvent.start}
            onChange={(e) =>
              setNewEvent({ ...newEvent, start: e.target.value })
            }
          />
          <input
            type="datetime-local"
            value={newEvent.end}
            onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
          />
          <button onClick={handleAddEvent}>Add Event</button>
        </div>
        <div className="event-list">
          <h2>Events</h2>
          {allEvents.map((event) => (
            <div key={event.id}>
              <span>{event.title} </span>
              <button onClick={() => handleDeleteEvent(event.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CalendarApp;
