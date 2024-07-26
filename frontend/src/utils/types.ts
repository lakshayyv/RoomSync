import { ChangeEventHandler, MouseEventHandler, ReactElement } from "react";

export type InputProps = {
  type: string;
  placeholder: string;
  value: string;
  className?: string;
  inputMode?:
    | "search"
    | "email"
    | "tel"
    | "text"
    | "url"
    | "none"
    | "numeric"
    | "decimal";
  cb: ChangeEventHandler<HTMLInputElement>;
};

export type ButtonProps = {
  type?: "button" | "reset" | "submit";
  label: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type DropdownProps = {
  options: string[];
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
};

export type UserCardProps = {
  id: string;
  name: string;
  src: string;
  age: string;
  year: string;
  course: string;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  age: string;
  year: string;
  course: string;
};

export type ProfileItemProps = {
  title: string;
  value: string;
  field: keyof UserType;
  className?: string;
};

export type ProtectedRouteProps = {
  element: ReactElement<any, any>;
};
