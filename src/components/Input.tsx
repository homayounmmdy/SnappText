import React from "react";
import type { InputType } from "../types/FormFiledType";

const Input: React.FC<InputType> = ({ className, ...rest }) => {
  return <input className={`input ${className}`} id={rest.id} {...rest} />;
};

export default Input;
