import { useEffect, useReducer } from "react";

import Header from "./Components/Header";
import Main from "./Components/Main";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import Start from "./Components/Start";
const initialState = {
  questions: [],
  status: "loading",
};

const reducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, questions: state.questions, status: "error" };
    default:
      return state;
  }
};
function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
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
        {status === "ready" && <Start questions={questions} />}
      </Main>
    </div>
  );
}

export default App;
