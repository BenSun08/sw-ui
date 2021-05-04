/** @jsxImportSource @emotion/react */
import React from "react";
import Panel from '../panel'
import { css } from "@emotion/react";
import { colors } from "src/theme";

interface DialogProps {
  children: React.ReactNode;
  open: boolean;
  onClose: React.EventHandler<React.MouseEvent>;
  width?: string;
}

const Dialog = (props: DialogProps) => {
  const { children, open, onClose, width, ...others } = props;
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose && onClose(e);
  };

  React.useEffect(() => {
    const bodyDOM = document.querySelector("body") as HTMLBodyElement;
    if (open) {
      bodyDOM.style.overflow = "hidden";
    } else {
      bodyDOM.style.overflow = "";
    }
  }, [open]);
  return (
    <Panel
      open={open}
      markClass="SWDialog-Root"
      onClickAway={handleClose}
    >
      {<div
        css={css`
          width: ${width ? width : "fit-content"};
          background-color: ${colors.bg};
        `}
        onClick={(e) => e.stopPropagation()}
        {...others}
      >
        {children}
      </div>}
    </Panel>
  );
};

export default Dialog;