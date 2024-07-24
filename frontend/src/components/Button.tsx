import { ButtonProps } from "../utils/types";

const Button = (props: ButtonProps) => {
  return (
    <button className="p-5 w-full text-white font-semibold bg-black rounded-lg" type={props.type}>
      {props.label}
    </button>
  );
};

export default Button;
