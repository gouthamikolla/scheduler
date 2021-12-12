import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setHistory((arrOfHistory) => {
      if (replace) {
        arrOfHistory.pop();
      } else {
        arrOfHistory.push(mode);
      }
      return arrOfHistory;
    });
    setMode(newMode);
  }
  function back() {
    const lastMode = history.pop();
    setMode(lastMode);
  }
  return { mode, transition, back };
}
