import { ButtonProps } from "../utils/types";

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`p-5 font-semibold bg-accent rounded-lg ${props.className}`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};

export default Button;
