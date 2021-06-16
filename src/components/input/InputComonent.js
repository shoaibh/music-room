import {Input} from "antd";
import React from "react";

const InputComponent = ({value,type, onChange, className, disabled, prefix, placeholder}) => {
  if (type === "password") {
    return (
      <Input.Password
        prefix={prefix}
        placeholder={placeholder}
        onChange={onChange}
        className={className}
        disabled={disabled}
      />
    );
  }
  return (
    <Input
      value={value}
      prefix={prefix}
      placeholder={placeholder}
      onChange={onChange}
      className={className}
      disabled={disabled}
    />
  );
};

export default InputComponent;
