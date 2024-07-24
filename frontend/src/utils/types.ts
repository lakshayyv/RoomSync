import { ChangeEventHandler } from "react";

export type InputProps = {
  type: string;
  placeholder: string;
  value: string;
  cb: ChangeEventHandler<HTMLInputElement>;
};

export type ButtonProps = {
    type?: "button" | "reset" | "submit"; 
  label: string;
};
