import React from "react";

const Finish = ({ points, highscore }) => {
  return (
    <>
      <p className="result">
        You Scored <strong>{points}</strong>
      </p>
      <p className="highscore">Highscore : {highscore} points</p>
    </>
  );
};

export default Finish;
