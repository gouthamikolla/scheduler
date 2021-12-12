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

export function getInterview(state, interview) {
  if (interview && interview.interviewer) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer],
    };
  }
  return null;
}
