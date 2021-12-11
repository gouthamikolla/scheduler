import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      history.pop();
    } else {
      history.push(mode);
    }
    setMode(newMode);
  }
  function back() {
    const lastMode = history.pop();
    setMode(lastMode);
  }

  return { mode, transition, back };
}
