// src/App.js
// import Training from './components/trainingen/Training';
// import TRAININGEN_DATA from './api/mock-data';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

const locales = {
  "nl-BE": require("date-fns/locale/nl-BE"),
};

// require("globalize/lib/cultures/globalize.culture.nl-BE");
// const lang = {
//   en: null,
//   "en-GB": null,
//   nl: {
//     week: "Week",
//     work_week: "Werkweek",
//     day: "Dag",
//     month: "Maand",
//     previous: "Vorige",
//     next: "Volgende",
//     today: `Vandaag`,
//     agenda: "Agenda",

//     showMore: (total) => `+${total} plus`,
//   },
// };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Training 1",
    allDay: true,
    start: new Date(2022, 9, 28),
    end: new Date(2022, 9, 28),
  },
  {
    title: "Wedstrijd",
    start: new Date(2022, 9, 22),
    end: new Date(2022, 9, 24),
  },
  {
    title: "Training 2",
    start: new Date(2022, 9, 26),
    end: new Date(2022, 9, 26),
  },
];

function App() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <div className="App">
      <h1>Trainingen</h1>
      <h2>Add New Event</h2>
      <div>
        <input
          type="text"
          placeholder="Add Title"
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        ></input>
        <DatePicker
          placeholderText="Start Date"
          style={{ marginRigth: "10px" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="End Date"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
      <Calendar
        // culture="nl-BE"
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
}

export default App;
