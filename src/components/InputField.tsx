import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  ReactNode,
} from "react";
import { Input } from "./ui/input";
import { IconType } from "react-icons/lib";
import { twMerge } from "tailwind-merge";

interface InputFieldProps {
  type?: string;
  id?: string;
  value: string;
  dir?: "left" | "right";
  placeholder?: string;
  icon?: IconType;
  render?: () => ReactNode;
  className?: string;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

function InputField({
  type = "text",
  id,
  value,
  dir = "left",
  placeholder,
  icon: Icon,
  render,
  onKeyDown,
  onChange,
  onBlur,
}: InputFieldProps) {
  return (
    <div
      className={twMerge(
        "row-flex relative w-full !justify-start gap-1 rounded-md border border-input shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 group-[.is-error]:border-none",
      )}
    >
      {dir === "left" && Icon && (
        <span className="icon pl-2 leading-none">
          <Icon size={20} className="" />
        </span>
      )}
      <Input
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        className={twMerge("i-reset flex-1 rounded-none", Icon && "px-1.5")}
      />
      {dir === "right" && Icon && (
        <span className="icon pr-2 leading-none">
          <Icon size={20} className="" />
        </span>
      )}
      {render && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {render()}
        </div>
      )}
    </div>
  );
}

export default InputField;
