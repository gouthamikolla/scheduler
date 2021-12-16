/**
 * This function takes state and day as params and retuns the available appointments for that day.
 * @param {*} state
 * @param {*} day
 * @returns
 */
export function getAppointmentsForDay(state, day) {
  const matchedData = state.days.filter((d) => d.name === day);
  const dayAppointments = [];
  if (matchedData[0]) {
    matchedData[0].appointments.forEach((appointment) =>
      dayAppointments.push(state.appointments[appointment])
    );
  }
  return dayAppointments;
}
/**
 * This function retuns the interviwers available for a given day that is passed.
 * @param {*} state
 * @param {*} day
 * @returns
 */
export function getInterviewersForDay(state, day) {
  const matchedData = state.days.filter((d) => d.name === day);
  const dayInterviewers = [];
  if (matchedData[0]) {
    matchedData[0].interviewers.forEach((interview) => {
      if (state.interviewers[interview]) {
        dayInterviewers.push(state.interviewers[interview]);
      }
    });
  }
  return dayInterviewers;
}
/**
 * This function retuns a interview object constructed based on state and interview availabel for that day.
 * @param {*} state
 * @param {*} interview
 * @returns
 */
export function getInterview(state, interview) {
  if (interview && interview.interviewer) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer],
    };
  }
  return null;
}
