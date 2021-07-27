import React, { useState } from "react"
import Exercise from "../exercise/Exercise"
import "./Solution.scss"
import "../shared_styles/typography.scss"

const ProgressBarExercise = () => {
  return (
    <div className="progress-bar-exercise">
      <Exercise
        solution={<Solution />}
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
  const [apiRequest, setApiRequest] = useState("idle")

  const apiCall = async () => {
    setApiRequest("loading")
  }

  return {
    apiCall,
    state: apiRequest,
    complete: () => setApiRequest("complete"),
    reset: () => setApiRequest("idle"),
  }
}

const Solution = () => {
  const { apiCall, state, complete, reset } = useApi()

  return (
    <div className="container">
      <div className={`progress-bar progress-bar-${state}`} />
      <div className="buttons-container">
        {state === "idle" || state === "loading" ? (
          <button
            disabled={state !== "idle"}
            onClick={() => apiCall()}
            className="small-header green button"
          >
            {state === "loading" ? "loading..." : "start request"}
          </button>
        ) : (
          <button onClick={() => reset()} className="small-header green button">
            reset
          </button>
        )}
        <button
          disabled={state !== 'loading'}
          onClick={() => complete()}
          className="small-header button red finish-button"
        >
          finish request
        </button>
      </div>
    </div>
  )
}
