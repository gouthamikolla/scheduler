import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <Fragment>
      <Header time={props.time} />
      <article className="appointment">
        {" "}
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show student={props.interview.student} interview={props.interview} />
        )}
        {mode === CREATE && (
          <Form
            student=""
            interviewer={null}
            interviewers={[]}
            onSave={() => console.log("on SAVE")}
            onCancel={() => back(EMPTY)}
          />
        )}
      </article>
    </Fragment>
  );
}
