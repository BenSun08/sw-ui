/** @jsxImportSource @emotion/react */
import { SharedProps } from "src/interfaces";
import { colors } from "src/theme";
import { css } from "@emotion/react";

interface MenuProps extends SharedProps {}
function Menu({ children, ...others }: MenuProps) {
  return (
    <div
      css={css`
        padding: 16px 0;
      `}
      {...others}
    >
      {children}
    </div>
  );
}

interface MenuItemProps extends SharedProps {
  value?: string | number;
  onClick?: (v: any) => void;
}

export function MenuItem(props: MenuItemProps) {
  const { value, children, onClick, ...others } = props;

  function handleClick(e: React.MouseEvent) {
    onClick && onClick(value);
  }

  return (
    <div
      css={css`
        cursor: pointer;
        padding: 0.4em 0.8em;
        :hover {
          background-color: rgba(${colors.gnRGB}, 30%);
        }
      `}
      onClick={handleClick}
      {...others}
    >
      {children}
    </div>
  );
}

export default Menu;
