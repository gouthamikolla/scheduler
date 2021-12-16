import React from "react";
import DayListItem from "components/DayListItem";

/**
 * THis function calls dayistItem components and returns the daylistitem components based on the props that are passed.
 * @param {*} props
 * @returns
 */
export default function DayList(props) {
  const dayListItems = props.days.map((day) => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={props.setDay}
    />
  ));
  return <ul>{dayListItems}</ul>;
}
