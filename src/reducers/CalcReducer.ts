export type CalcState = {
  num: string;
  res: string;
  sign: string;
};

export type CalcAction =
  | { type: "RESET"; display: string | number }
  | { type: "CLEAR"; display: string | number }
  | { type: "PERCENT"; display: string | number }
  | { type: "EQUALS"; display: string | number }
  | { type: "OPERATOR"; operator: string }
  | { type: "PERIOD"; display: string | number }
  | { type: "NUMBER"; number: number };

const numClickHandler = (value: number, state: CalcState): CalcState => {
  if (state.num.length < 16) {
    return {
      ...state,
      num:
        Number(state.num) === 0 && value === 0
          ? "0"
          : Number(state.num + value).toString(),
      res: !state.sign ? "0" : state.res,
    };
  }
  return state;
};
const percentClickHandler = (state: CalcState) => {
  let num = Number(state.num);
  let res = Number(state.res);
  return {
    ...state,
    num: (num /= Math.pow(100, 1)).toString(),
    res: (res /= Math.pow(100, 1)).toString(),
    sign: "",
  };
};
const periodClickHandler = (state: CalcState) => {
  return {
    ...state,
    num: !state.num.toString().includes(".") ? state.num + "." : state.num,
  };
};
const signClickHandler = (operator: string, state: CalcState) => {
  return {
    sign: operator,
    res:
      state.res === "0" && state.num ? Number(state.num).toString() : state.res,
    num: "0",
  };
};
const equalsClickHandler = (state: CalcState): CalcState => {
  if (state.sign) {
    const math = (a: number, b: number, sign: string) =>
      sign === "+"
        ? a + b
        : sign === "-"
        ? a - b
        : sign === "X"
        ? a * b
        : a / b;

    return {
      ...state,
      res:
        state.num === "0" && state.sign === "/"
          ? "Can't divide by zero"
          : math(Number(state.res), Number(state.num), state.sign).toString(),
      sign: "",
      num: "0",
    };
  }
  return state;
};

export const calcReducer = (
  state: CalcState,
  action: CalcAction
): CalcState => {
  switch (action.type) {
    case "RESET":
      return { sign: "", num: "0", res: "0" };
    case "CLEAR":
      return { ...state, sign: "", num: "0" };
    case "PERCENT":
      return percentClickHandler(state);
    case "NUMBER":
      return numClickHandler(action.number, state);
    case "OPERATOR":
      return signClickHandler(action.operator, state);
    case "PERIOD":
      return periodClickHandler(state);
    case "EQUALS":
      return equalsClickHandler(state);
    default:
      return state;
  }
};
