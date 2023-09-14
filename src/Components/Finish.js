import React from "react";

const Finish = ({ points, highscore, dispatch }) => {
  return (
    <>
      <p className="result">
        You Scored <strong>{points}</strong>
      </p>
      <p className="highscore">Highscore : {highscore} points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
};

export default Finish;
