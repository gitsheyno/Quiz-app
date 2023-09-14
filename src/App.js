import { useEffect, useReducer } from "react";
import Questions from "./Components/Questions";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import Start from "./Components/Start";
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
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

    case "newAnswer":
      return {
        ...state,
        answer: action.payload.answer,
        points: action.payload.points,
      };
    default:
      return state;
  }
};
function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const activeStatusHandler = () => {
    dispatch({ type: "start" });
  };

  const handlerAnswerQuestion = (answer, correctAnswer) => {
    dispatch({
      type: "newAnswer",
      payload: {
        answer: answer,
        points: answer === correctAnswer ? points + 10 : points,
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
          <Questions
            question={questions[index]}
            onAnswer={handlerAnswerQuestion}
            answer={answer}
            points={points}
            handlerpagination={handlerpagination}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
