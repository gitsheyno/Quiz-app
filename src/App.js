import { useEffect, useReducer } from "react";
import Questions from "./Components/Questions";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import Start from "./Components/Start";
import NextButton from "./Components/NextButton";
import Progress from "./Components/Progress";
import Finish from "./Components/Finish";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
};

const reducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, questions: state.questions, status: "error" };
    case "start":
      return { ...state, questions: state.questions, status: "active" };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finish",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload.answer,
        points: action.payload.points,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "loading" };
    default:
      return state;
  }
};
function App() {
  const [{ questions, status, index, answer, points, highScore }, dispatch] =
    useReducer(reducer, initialState);
  console.log(status);
  const activeStatusHandler = () => {
    dispatch({ type: "start" });
  };

  const handlerAnswerQuestion = (answer, correctAnswer, auestionPoints) => {
    dispatch({
      type: "newAnswer",
      payload: {
        answer: answer,
        points: answer === correctAnswer ? points + auestionPoints : points,
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions");

        if (!res.status) {
          throw new Error("something went wrong");
        }
        const data = await res.json();

        dispatch({ type: "dataRecieved", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Start questions={questions} onStart={activeStatusHandler} />
        )}
        {status === "active" && (
          <>
            <Progress
              numOfQuestions={questions.length}
              index={index}
              points={points}
              questions={questions}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              onAnswer={handlerAnswerQuestion}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={questions.length}
            />
          </>
        )}
        {status === "finish" && (
          <Finish points={points} highscore={highScore} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}

export default App;
