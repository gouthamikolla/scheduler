export function getAppointmentsForDay(state, day) {
  const matchedData = state.days.filter((d) => d.name === day);
  if (matchedData[0] && matchedData[0].name === "Tuesday") {
    const array1 = [];
    matchedData[0].appointments.forEach((appointment) =>
      array1.push(state.appointments[appointment])
    );
    return array1;
  } else {
    return matchedData[0] ? matchedData[0].appointments : [];
  }
}
