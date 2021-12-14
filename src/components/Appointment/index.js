import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }

  function edit() {
    transition(EDIT);
  }

  function confirmDelete() {
    transition(CONFIRM);
  }

  function deleteAppointment() {
    transition(DELETING);
    props
      .deleteInterview(props.id, props.interview)
      .then(() => transition(EMPTY));
  }

  function doNotDelete() {
    transition(SHOW);
  }

  return (
    <Fragment>
      <Header time={props.time} />
      <article className="appointment">
        {" "}
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interview={props.interview}
            onDelete={() => confirmDelete()}
            onEdit={() => edit()}
          />
        )}
        {mode === EDIT && (
          <Form
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onSave={(student, interviewer) => save(student, interviewer)}
            onCancel={() => back(SHOW)}
          />
        )}
        {mode === CONFIRM && (
          <Confirm
            message="Are you sure you would like to delete?"
            onConfirm={() => deleteAppointment()}
            onCancel={() => doNotDelete()}
          />
        )}
        {mode === DELETING && <Status message="Deleting" />}
        {mode === SAVING && <Status message="Saving" />}
        {mode === CREATE && (
          <Form
            student=""
            interviewer={null}
            interviewers={props.interviewers}
            onSave={(student, interviewer) => save(student, interviewer)}
            onCancel={() => back(EMPTY)}
          />
        )}
      </article>
    </Fragment>
  );
}
