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

export function getInterview(state, interview) {
  console.log(interview);
  if (interview && interview.interviewer) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer],
    };
  }
  return null;
}
