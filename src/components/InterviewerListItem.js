import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

/**
 *  This function returns the interviewlist item compenent.
 * @param {*} props
 * @returns
 */
export default function InterviewerListItem(props) {
  const interviewerClass = classNames(
    "interviewers__item",
    { "interviewers__item--selected": props.selected },
    { "interviewers__item--Clickable": props.clicked }
  );
  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
