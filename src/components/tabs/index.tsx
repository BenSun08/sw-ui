/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import theme from "src/theme";
const { colors } = theme;
interface TabPanelProps {
  children?: React.ReactNode;
  index: number | string;
  value: number | string;
}
export const TabPanel = (props: TabPanelProps) => {
  const { children, index, value, ...others } = props;
  return (
    <div
      role="tabpanel"
      hidden={index !== value}
      id={`panel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...others}
    >
      {children}
    </div>
  );
};
interface TabProps {
  children: React.ReactNode;
  value: number | string;
  index: number | string;
  onClick: (e: React.MouseEvent, v: number | string) => any;
}
interface TabButton {
  selected: boolean;
}
const Button = styled.button<TabButton>`
  padding: 1.2em 2.5em;
  background-color: ${(p) => (p.selected ? "#022216" : "#1e1d45")};
  color: ${(p) => (p.selected ? colors.gn : "#8b96ff")};
  font-size: 1.3em;
  border: none;
  cursor: pointer;
  &:hover {
    color: ${(p) => (p.selected ? colors.gn : "#00c3ff")};
    background-color: #022216;
    border: none;
  }
  &:focus {
    outline: none;
  }
`;
export const Tab = (props: TabProps) => {
  const { children, index, value, onClick, ...others } = props;
  const selected = index === value;

  // initialize width and offsetLeft of the slider
  useEffect(() => {
    if (selected) {
      ref.current.click();
    }
  });

  const ref = React.useRef() as React.MutableRefObject<HTMLButtonElement>;

  const handleClick = (e: React.MouseEvent) => {
    onClick && onClick(e, index);
  };

  return (
    <Button
      role="tab"
      ref={ref}
      id={`tab-${index}`}
      aria-controls={`panel-${index}`}
      selected={selected}
      aria-selected={selected}
      onClick={handleClick}
      {...others}
    >
      {children}
    </Button>
  );
};
interface TabsProps {
  children: React.ReactNode;
  value: string | number;
  onChange?: (v: string | number) => any;
}
const Slider = styled.span`
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border-bottom: 2px solid ${colors.gn};
  transition: all 0.2s ease-out;
`;
const Tabs = (props: TabsProps) => {
  const { children, value, onChange, ...others } = props;

  // handle click event of tab
  const handleTabClick = (e: React.MouseEvent, index: number | string) => {
    const target = e.target as HTMLElement;
    const role = target.getAttribute("role");
    if (role !== "tab") return;
    value !== index && onChange && onChange(index);
    // slide effect
    sliderRef.current.style.width = target.offsetWidth + "px";
    sliderRef.current.style.left = target.offsetLeft + "px";
  };

  const sliderRef = React.useRef() as React.MutableRefObject<HTMLSpanElement>;

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <div
        css={css`
          background-color: #1e1d45;
        `}
        role="tablist"
        {...others}
      >
        {children &&
          React.Children.map(children, (chd) => {
            if (React.isValidElement(chd)) {
              return React.cloneElement(chd, {
                value,
                onClick: handleTabClick,
              });
            }
          })}
      </div>
      <Slider ref={sliderRef} />
    </div>
  );
};

export default Tabs;
