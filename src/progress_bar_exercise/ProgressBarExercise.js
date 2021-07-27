import React, { useState, useEffect } from "react"
import Exercise from "../exercise/Exercise"
import "./Solution.scss"
import "../shared_styles/typography.scss"

const ProgressBarExercise = () => {
  return (
    <div className="progress-bar-exercise">
      <Exercise
        solution={<Solution breakpoints={[25, 50, 75]} />}
        specsUrl="https://github.com/SpiffInc/spiff_react_exercises/issues/1"
        title="Progress Bar Exercise"
      />
    </div>
  )
}

export default ProgressBarExercise

// ----------------------------------------------------------------------------------

// simulate api call

const useApi = () => {
  const [state, setState] = useState("idle")

  return {
    state,
    isIdle: state === "idle",
    isComplete: state === "complete",
    isLoading: state === "loading",
    apiCall: () => setState("loading"),
    complete: () => setState("complete"),
    reset: () => setState("idle"),
  }
}

const Solution = ({ breakpoints: breakPointsProp }) => {
  const [breakpoints] = useState([0, ...(breakPointsProp || []), 90])

  const [currentBreakpointIndex, setCurrentBreakpointIndex] = useState(0)

  const {
    apiCall,
    state,
    isLoading,
    isIdle,
    isComplete,
    complete,
    reset,
  } = useApi()

  const useBreakpoints = Boolean(breakPointsProp)

  const timing = (15 / breakpoints.length) * 1000

  useEffect(() => {
    if (isLoading && currentBreakpointIndex !== breakpoints.length - 1) {
      if (currentBreakpointIndex === 0 && !isIdle) {
        setCurrentBreakpointIndex(1)
      } else {
        setTimeout(() => {
          setCurrentBreakpointIndex((prevIndex) => prevIndex + 1)
        }, timing)
      }
    }
  }, [timing, currentBreakpointIndex, breakpoints.length, isLoading, isIdle])

  useEffect(() => {
    if (isIdle) {
      setCurrentBreakpointIndex(0)
    }
  }, [isIdle])

  return (
    <div className="container">
      <div
        className={`progress-bar ${
          useBreakpoints && isComplete
            ? "progress-bar-complete"
            : useBreakpoints
            ? ""
            : `progress-bar-${state}`
        }`}
        style={
          useBreakpoints && !isComplete
            ? {
                transition: `width ease-in-out ${timing}ms`,
                width: `${breakpoints[currentBreakpointIndex]}%`,
              }
            : {}
        }
      />
      <div className="buttons-container">
        {isIdle || isLoading ? (
          <button
            disabled={!isIdle}
            onClick={() => apiCall()}
            className="small-header green button"
          >
            {isLoading ? "loading..." : "start request"}
          </button>
        ) : (
          <button onClick={() => reset()} className="small-header green button">
            reset
          </button>
        )}
        <button
          disabled={!isLoading}
          onClick={() => complete()}
          className="small-header button red finish-button"
        >
          finish request
        </button>
      </div>
    </div>
  )
}
