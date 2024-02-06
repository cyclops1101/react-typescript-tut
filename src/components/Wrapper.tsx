import { ChildProps } from "../types/ChildProps.types";
import "./Wrapper.css";

export const Wrapper = ({ children }: ChildProps) => {
  return <div className="wrapper">{children}</div>;
};
