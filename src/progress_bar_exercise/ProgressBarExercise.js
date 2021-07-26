import React from "react";
import Exercise from "../exercise/Exercise";
import './Solution.scss'
import '../shared_styles/typography.scss'

const ProgressBarExercise = () => {
  return (
    <div className="progress-bar-exercise">
      <Exercise
        solution={<Solution />}
        specsUrl="https://github.com/SpiffInc/spiff_react_exercises/issues/1"
        title="Progress Bar Exercise"
      />
    </div>
  );
};

export default ProgressBarExercise;

// ----------------------------------------------------------------------------------

const Solution = () => {
  return (
    <div className='container'>
      <div className='progress-bar'/>
      <div className= 'buttons-container'>
        <button className='small-header green button'>start request</button>
      </div>
    </div>
  ) 
};
