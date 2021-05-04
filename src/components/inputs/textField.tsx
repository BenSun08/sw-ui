/** @jsxImportSource @emotion/react */
import React from "react";
import { FormControl, InputLabel, FormHelperText } from "./index";
import { css } from "@emotion/react";
import { colors } from "src/theme";

interface TxtFldProps {
  id: string;
  label: string;
  helperText?: string;
  value?: string | number;
  type?: "text" | "password" | "number";
  onChange?: (val: string) => void;
}

const assessVal: (val: string | number | undefined) => boolean = function (
  val
) {
  return val !== undefined && val.toString().trim() !== "";
};

const TextField = (props: TxtFldProps) => {
  const {
    id,
    label,
    value,
    helperText,
    onChange,
    type = "text",
    ...others
  } = props;

  let [focused, setFocus] = React.useState(false);
  let hasVal = assessVal(value);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let currVal = e.target.value;
    hasVal = assessVal(currVal);
    onChange && onChange(currVal);
  };

  return (
    <FormControl
      css={css`
        padding-top: 11px;
      `}
      {...others}
    >
      <InputLabel
        css={css`
          left: 2px;
          top: ${!focused && !hasVal ? ".9em" : "0"};
          font-size: ${!focused && !hasVal ? "1.4em" : ".9em"};
          transition: all ease-in 0.2s;
          color: ${focused ? colors.bu : colors.darkGn};
        `}
        htmlFor={id}
      >
        {label}
      </InputLabel>
      <input
        css={css`
          width: 100%;
          box-sizing: content-box;
          background-color: ${colors.bg};
          font-size: 1.4em;
          color: ${colors.gn};
          line-height: 1.8em;
          border: none;
          border-bottom: 1px solid ${colors.gn};
          &:focus {
            outline: none;
            border-bottom: 1px solid ${colors.bu};
          }
          &:hover {
            border-bottom: 1px solid ${focused ? colors.bu : colors.gn};
          }
          &:-webkit-autofill {
            -webkit-text-fill-color: ${colors.gn};
            box-shadow: inset 0 0 0 1000px ${colors.bg};
          }
        `}
        type={type}
        list=""
        id={id}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default TextField;
