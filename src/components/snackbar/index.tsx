/** @jsxImportSource @emotion/react */
import { Fragment, useEffect } from "react";
import { css } from "@emotion/react";
import { SharedProps } from "src/interfaces";

type Severity = "error" | "warning" | "info" | "success";
interface AlertProps extends SharedProps {
  severity: Severity;
  onClose?: () => void;
}
const styleMap: Map<Severity, string[]> = new Map([
  ["error", ["error", "#470522", "#ff0046"]],
  ["warning", ["warning_amber", "yellow", ""]],
  ["info", ["info", "grey", ""]],
  ["success", ["check_circle", "green", ""]],
]);
export function Alert({ severity, children, onClose, ...others }: AlertProps) {
  const [icon, bgc, color] = styleMap.get(severity) || [];

  function handleCloseClick() {
    onClose && onClose();
  }

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        padding: 8px 16px;
        background-color: ${bgc};
        color: ${color};
        border: 1px solid ${color};
        font-size: 16px;
      `}
      {...others}
    >
      <i
        className="mat-icon"
        css={css`
          margin-right: 16px;
          font-size: 18px;
        `}
      >
        {icon}
      </i>
      {children}
      {onClose && (
        <i
          className="mat-icon"
          css={css`
            margin-left: 24px;
            font-size: 18px;
            cursor: pointer;
          `}
          onClick={handleCloseClick}
        >
          close
        </i>
      )}
    </div>
  );
}
interface SnackbarProps extends SharedProps {
  open: boolean;
  autoHideDuration?: number;
  onClose?: () => void;
}
export default function Snackbar({
  open,
  children,
  autoHideDuration,
  onClose,
  ...others
}: SnackbarProps) {
  useEffect(() => {
    if (open && autoHideDuration) {
      setTimeout(() => {
        onClose && onClose();
      }, autoHideDuration);
    }
  }, [open, autoHideDuration, onClose]);

  return (
    <Fragment>
      {open && (
        <div
          css={css`
            position: fixed;
            top: 24px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1400;
          `}
          {...others}
        >
          {children}
        </div>
      )}
    </Fragment>
  );
}
