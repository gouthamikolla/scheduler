import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";

export default function Appointment(props) {
  return (
    <Fragment>
      <Header time={props.time} />
      <article className="appointment">
        {" "}
        {props.interview ? (
          <Show student={props.interview.student} interview={props.interview} />
        ) : (
          <Empty />
        )}
      </article>
    </Fragment>
  );
}
