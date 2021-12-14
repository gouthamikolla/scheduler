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

  async function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    await axios.put(`/api/appointments/${id}`, { interview });
    setState({ ...state, appointments });
  }

  async function deleteInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    await axios.delete(`/api/appointments/${id}`, { interview });
    setState({ ...state, appointments });
  }

  return { state, setDay, bookInterview, deleteInterview };
}
