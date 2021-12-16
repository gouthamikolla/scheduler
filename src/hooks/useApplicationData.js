import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const setDay = (day) => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  /**
   * This function helps us to load the data using Promises and sets the state of the application.
   */
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
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      });
    });
  }, []);

  /**
   * This function helps to book an interview based on id and interview object passed.
   * It sends request to web-pack server for persisting data as well.
   * @param {*} id
   * @param {*} interview
   */
  async function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    await axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => updateSpots(state, appointments));

    setState({ ...state, appointments });
  }
  /**
   * This function will help to delete the interview based on id and interview object passed.
   * It sends request to web-pack server to delete from database.
   * @param {*} id
   * @param {*} interview
   */
  async function deleteInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    await axios
      .delete(`/api/appointments/${id}`, { interview })
      .then(() => updateSpots(state, appointments));

    setState({ ...state, appointments });
  }
  /**
   * This function will update the state with correct spots for a given day based on appointments available for that day
   * @param {*} state
   * @param {*} appointments
   */
  function updateSpots(state, appointments) {
    let totalSpots = 0;
    for (let currentday of state.days) {
      if (currentday.name === state.day) {
        for (let currentappt of currentday.appointments) {
          const matchedAppt = appointments[currentappt];
          if (matchedAppt.interview === null) ++totalSpots;
        }
        currentday.spots = totalSpots;
      }
    }
  }
  return { state, setDay, bookInterview, deleteInterview };
}
