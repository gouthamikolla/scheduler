import React from "react";
import "components/Appointment/styles.scss";

/**
 * This functon creats the status component and returns it based on properties.
 * @param {*} props
 * @returns
 */
export default function Status(props) {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
}
