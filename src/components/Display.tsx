import "./Display.css";

type DisplayProps = {
  display: number | string;
};

export const Display: React.FC<DisplayProps> = ({ display }) => {
  return <div className="display">{display}</div>;
};
