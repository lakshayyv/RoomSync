import { InputProps } from "../utils/types";

const Input = (props: InputProps) => {
  return (
    <input
      className={`block px-5 py-3 w-full rounded-lg focus:border-black bg-dark mb-4 ${props.className}`}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.cb}
      inputMode={props.inputMode}
      required
    />
  );
};

export default Input;
