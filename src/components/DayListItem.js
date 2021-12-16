import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

/**
 * This function creates and returns the DayListItem component based on the properties passed.
 * @param {*} props
 * @returns
 */
export default function DayListItem(props) {
  const formatSpots = function () {
    return props.spots === 0
      ? "no spots remaining"
      : props.spots === 1
      ? "1 spot remaining"
      : `${props.spots} spots remaining`;
  };

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });
  return (
    <li
      onClick={() => props.setDay(props.name)}
      className={dayClass}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
