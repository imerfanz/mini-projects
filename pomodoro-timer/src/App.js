import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [sessionTime, setSessionTime] = useState(25);
  const [displayTime, setDisplayTime] = useState(sessionTime);
  const [breakTime, setBreakTime] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("session");

  useEffect(() => {
    const beep = document.getElementById("beep");
    beep.load();
  }, []);

  useEffect(() => {
    if (seconds === 0 && displayTime === 0) {
      document.getElementById("beep").play();
    }
  }, [displayTime, seconds]);

  // Update the numbers
  useEffect(() => {
    if (mode === "session" && !isRunning) {
      setDisplayTime(sessionTime);
      setSeconds(0);
    }
  }, [sessionTime]);

  useEffect(() => {
    if (mode === "break" && !isRunning) {
      setDisplayTime(breakTime);
      setSeconds(0);
    }
  }, [breakTime]);

  // Custom timer function for ease of use
  useEffect(() => {
    let interval;

    if (isRunning && mode === "session") {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (displayTime === 0) {
            // Play sound here when timer hits zero
            setMode("break");
            setDisplayTime(breakTime);
          } else {
            setDisplayTime((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    } else if (isRunning && mode === "break") {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (displayTime === 0) {
            // Play sound here when timer hits zero
            setMode("session");
            setDisplayTime(sessionTime);
          } else {
            setDisplayTime((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, displayTime, seconds, mode, sessionTime, breakTime]);

  // Function to control Start/Stop button
  const startstop = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  };

  // Turning the counter red when time is almost up
  const [cstyle, setCstyle] = useState("black");
  useEffect(() => {
    if (displayTime < 1) {
      setCstyle("red");
    } else {
      setCstyle("black");
    }
  }, [displayTime]);

  // Stop audio when reset is clicked
  const resetTimer = () => {
    if (isRunning) {
      setIsRunning(false);
    }
    setSessionTime(25);
    setDisplayTime(25);
    setSeconds(0);
    setBreakTime(5);
    setMode("session");

    // Stop audio and reset it to the beginning
    const beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0;
  };

  return (
    <div className="container">
      <div className="break-container">
        <h2 id="break-label">Break Length</h2>
        <div className="controls">
          <button
            id="break-decrement"
            onClick={() => {
              if (breakTime > 1) {
                setBreakTime((prev) => prev - 1);
              }
            }}
          >
            -
          </button>
          <span id="break-length">{breakTime}</span>
          <button
            id="break-increment"
            onClick={() => {
              if (breakTime < 60) {
                setBreakTime((prev) => prev + 1);
              }
            }}
          >
            +
          </button>
        </div>
      </div>

      <div className="session-container">
        <h2 id="session-label">Session Length</h2>
        <div className="controls">
          <button
            id="session-decrement"
            onClick={() => {
              if (sessionTime > 1) {
                setSessionTime((prev) => prev - 1);
              }
            }}
          >
            -
          </button>
          <span id="session-length">{sessionTime}</span>
          <button
            id="session-increment"
            onClick={() => {
              if (sessionTime < 60) {
                setSessionTime((prev) => prev + 1);
              }
            }}
          >
            +
          </button>
        </div>
      </div>

      <h2 id="timer-label">{mode[0].toUpperCase() + mode.substring(1)}</h2>
      <div className="timer" id="time-left" style={{ color: cstyle }}>
        {displayTime < 10 ? "0" + displayTime : displayTime}:
        {seconds < 10 ? "0" + seconds : seconds}
      </div>

      <div className="controls">
        <button id="start_stop" onClick={startstop}>
          Start/Pause
        </button>
        <button
          id="reset"
          onClick={resetTimer} // Call resetTimer to stop audio on reset
        >
          Reset
        </button>
      </div>

      <audio
        id="beep"
        src="https://cdn.pixabay.com/download/audio/2024/12/20/audio_d3efed8c6c.mp3?filename=magic-3-278824.mp3"
        preload="auto"
      ></audio>
    </div>
  );
}

export default App;

