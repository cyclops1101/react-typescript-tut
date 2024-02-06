import { ChildProps } from "../types/ChildProps.types";
import "./ButtonContainer.css";

export const ButtonContainer = ({ children }: ChildProps) => {
  return <div className="buttonContainer">{children}</div>;
};
