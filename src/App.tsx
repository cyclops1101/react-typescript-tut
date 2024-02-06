import Button from "./components/Button";
import { ButtonContainer } from "./components/ButtonContainer";
import { Wrapper } from "./components/Wrapper";
import { Display } from "./components/Display";
import { CalcState, calcReducer, CalcAction } from "./reducers/CalcReducer";
import { useState } from "react";

const btnValues: CalcAction[][] = [
  [
    { type: "CLEAR", display: "C" },
    { type: "RESET", display: "R" },
    { type: "PERCENT", display: "%" },
    { type: "OPERATOR", operator: "/" },
  ],
  [
    { type: "NUMBER", number: 7 },
    { type: "NUMBER", number: 8 },
    { type: "NUMBER", number: 9 },
    { type: "OPERATOR", operator: "X" },
  ],
  [
    { type: "NUMBER", number: 4 },
    { type: "NUMBER", number: 5 },
    { type: "NUMBER", number: 6 },
    { type: "OPERATOR", operator: "-" },
  ],
  [
    { type: "NUMBER", number: 1 },
    { type: "NUMBER", number: 2 },
    { type: "NUMBER", number: 3 },
    { type: "OPERATOR", operator: "+" },
  ],
  [
    { type: "NUMBER", number: 0 },
    { type: "PERIOD", display: "." },
    { type: "EQUALS", display: "=" },
  ],
];

const displayReducer = (action: CalcAction) => {
  switch (action.type) {
    case "NUMBER":
      return action.number;
    case "OPERATOR":
      return action.operator;
    default:
      return action.display;
  }
};

function App() {
  const [state, setState] = useState<CalcState>({
    sign: "",
    res: "0",
    num: "0",
  });
  return (
    <div className="App">
      <Wrapper>
        {/* TODO:fix display of 0 bug */}
        <Display display={state.num !== "0" ? state.num : state.res} />
        <ButtonContainer>
          {btnValues.flat().map((btn, index) => {
            return (
              <Button
                className={btn.type}
                display={displayReducer(btn)}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  event.preventDefault();
                  setState(calcReducer(state, btn));
                  console.log(state);
                }}
              />
            );
          })}
        </ButtonContainer>
      </Wrapper>
    </div>
  );
}

export default App;
