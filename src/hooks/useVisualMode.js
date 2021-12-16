import { useState } from "react";
/**
 * This function helps to transition application state from one phase to another phase
 * @param {state} initial
 * @returns
 */
export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setHistory((prev) => {
      const historyCopy = [...prev];
      if (replace === true) {
        historyCopy.pop();
      }
      historyCopy.push(newMode);
      return historyCopy;
    });
  }

  const back = () => {
    if (history.length < 2) {
      return;
    }
    setHistory((prev) => {
      const historyCopy = [...prev];
      historyCopy.pop();
      return historyCopy;
    });
  };

  const mode = history[history.length - 1];

  return { mode, transition, back };
}
