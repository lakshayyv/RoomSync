import { InputProps } from "../utils/types";

const Input = (props: InputProps) => {
  return (
    <input
      className="block border border-gray-600 px-5 py-3 w-full rounded-lg focus:border-black mb-4"
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.cb}
    />
  );
};

export default Input;
