/** @jsxImportSource @emotion/react */
import React from "react";
import { css, SerializedStyles } from "@emotion/react";
import { colors } from "src/theme";

interface ListItemProps {
  children: React.ReactNode;
  onClick?: React.EventHandler<React.MouseEvent>;
  css?: SerializedStyles;
}
export const ListItem = (props: ListItemProps) => {
  const { children, onClick, ...others } = props;
  const handleClick = (e: React.MouseEvent) => {
    onClick && onClick(e);
  };
  return (
    <li
      css={css`
        padding: 8px 16px;
        background-color: ${colors.bg};
        color: ${colors.gn};
        list-style-type: none;
        font-size: 1.4em;
        /* cursor: pointer; */
        &:hover {
          color: ${colors.bu};
          background-color: ${colors.hover};
        }
      `}
      onClick={handleClick}
      {...others}
    >
      {children}
    </li>
  );
};

interface ListProps {
  children: React.ReactNode;
}
const List = (props: ListProps) => {
  const { children, ...others } = props;

  return (
    <ul
      css={css`
        padding: 8px 0;
        background-color: ${colors.bg};
      `}
      {...others}
    >
      {children}
    </ul>
  );
};

export default List;
