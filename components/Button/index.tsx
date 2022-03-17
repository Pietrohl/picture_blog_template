import React, { FunctionComponent } from "react";
interface ButtonProps {}

const Button: FunctionComponent<ButtonProps> = () => {
  return <button className="button is-dark">Button</button>;
};

export default Button;
