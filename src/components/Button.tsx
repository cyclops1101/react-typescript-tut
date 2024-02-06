import "./Button.css";

interface ButtonProps {
  className: string;
  display: number | string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ className, display, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {display}
    </button>
  );
};

export default Button;
