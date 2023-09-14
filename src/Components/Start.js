import React from "react";

const Start = ({ questions }) => {
  return (
    <div className="start">
      <h3>Welcome to the Quiz!</h3>
      <h3>{questions.length} questions to test your knowladge</h3>
      <button className="btn btn-ui">Let's start</button>
    </div>
  );
};

export default Start;
