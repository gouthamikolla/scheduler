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
