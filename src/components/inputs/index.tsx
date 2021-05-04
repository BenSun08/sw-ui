/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { SharedProps } from "src/interfaces";
import { colors } from "src/theme";

const FormControl = (props: SharedProps) => {
  const { children, ...others } = props;
  return (
    <div
      css={css`
        position: relative;
        background-color: ${colors.bg};
      `}
      {...others}
    >
      {children}
    </div>
  );
};

interface LabelProps extends SharedProps {
  htmlFor: string;
}
const InputLabel = (props: LabelProps) => {
  const { children, htmlFor, ...others } = props;
  return (
    <label
      css={css`
        position: absolute;
        top: 0;
        left: 0;
      `}
      htmlFor={htmlFor}
      {...others}
    >
      {children}
    </label>
  );
};

const FormHelperText = (props: SharedProps) => {
  const { children, ...others } = props;
  return <p {...others}>{children}</p>;
};

export { FormControl, InputLabel, FormHelperText };

export { default as CheckBox } from "./checkBox";
export { default as FileUpload } from "./fileUpload";
export { default as Select } from "./select";
export { default as TextField } from "./textField";
