import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index.js";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";
export default function Application(props) {
  //const [day, setDay] = useState("Monday");
  //const [days, setDays] = useState([]);

  const setDay = (day) => setState({ ...state, day });
  //const setDays = (days) => setState((prev) => ({ ...prev, days }));

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const allAppointments = dailyAppointments.map((appointment) => (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={appointment.interview}
    />
  ));

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      const [first, second, third] = all;

      Promise.all([
        Promise.resolve(first),
        Promise.resolve(second),
        Promise.resolve(third),
      ]).then((all) => {
        console.log(all[0].data); // first
        console.log(all[1].data); // second
        console.log(all[2].data); // third

        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      });
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {allAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
