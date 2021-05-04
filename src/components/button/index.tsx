/** @jsxImportSource @emotion/react */
import React from "react";
import { SharedProps } from 'src/interfaces'
import { css } from "@emotion/react";
import { colors } from "src/theme";

interface btnProps extends SharedProps {
  onClick?: React.EventHandler<React.MouseEvent>;
}
const Button = (props: btnProps) => {
  const { children, onClick, ...others } = props;

  const handleClick = (e: React.MouseEvent) => {
    onClick && onClick(e);
  };

  return (
    <button
      css={css`
        padding: 0.3em 1.5em;
        background-color: ${colors.darkGn};
        border: none;
        color: ${colors.bk};
        cursor: pointer;
        &:hover {
          background-color: ${colors.gn};
        }
        &:focus {
          outline: none;
        }
      `}
      onClick={handleClick}
      {...others}
    >
      {children}
    </button>
  );
};

export default Button;
