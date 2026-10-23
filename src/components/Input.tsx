import { forwardRef } from "react";
import type { InputType } from "../types/FormFiledType";

const Input = forwardRef<HTMLInputElement, InputType>(
  ({ className, ...rest }, ref) => {
    return <input ref={ref} className={`input ${className ?? ""}`} {...rest} />;
  },
);

Input.displayName = "Input";

export default Input;
