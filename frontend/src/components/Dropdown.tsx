import { DropdownProps } from "../utils/types";

const Dropdown = (props: DropdownProps) => {
  return (
    <select
      className={`py-3 px-5 mb-4 w-full rounded-lg bg-dark text-gray-400 border-r-[1.25rem] border-transparent border-solid ${props.className}`}
      value={props.value}
      onChange={props.onChange}
      required
    >
      <option value="" disabled hidden>
        {props.placeholder}
      </option>
      {props.options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
