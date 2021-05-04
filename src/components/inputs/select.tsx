/** @jsxImportSource @emotion/react */
import React from "react";
import { SharedProps } from './interfaces'
import { FormControl, InputLabel, FormHelperText } from "./index";
import Panel from '../panel/'
import { css  } from "@emotion/react";
import { colors } from "src/theme";
import { throttle } from 'src/utils'

interface evTarget {
  target: {
    value: string[]
  }
}

// type SelProps = 
//   |  (SharedProps & { multiple?: false })
//   |  (SharedProps<string[], evTarget> & { multiple: true })

interface SelProps extends SharedProps<string | string[], React.ChangeEvent<HTMLInputElement> | evTarget> {
  multiple: boolean
  renderValue?: (seled: any) => React.ReactNode 
}

function Select({ id, label, value, helperText, multiple, onChange, children, renderValue, ...others }: SelProps) {
  let hasVal = multiple ? (value as string[]).length > 0 : !!value

  let [focused, setFocus] = React.useState(false)

  // locate the select menu
  const selRef = React.createRef<HTMLDivElement>()
  let [loc, setLoc] = React.useState({ left: 0, top: 0, width: 0 })

  const handleFocus = () => {
    const { left = 0, top = 0, width = 0, height = 0 } = selRef.current?.getBoundingClientRect() || {}
    setLoc({ left, top: top + height, width })
    setFocus(true);
  };

  const resizeHandler = throttle(() => handleFocus() ,1000)
  React.useEffect(() => {
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  })

  // when a option is select, render the selected value
  const inputEl = React.createRef<HTMLInputElement>()
  let [renderedVal, setRender] = React.useState<React.ReactNode>('')

  function handleOptClick(val: string) {
    let res
    if(multiple) {
      const cpVal = (value as string[]).slice()
      if(cpVal.includes(val)) {
        const idx = cpVal.findIndex(e => e === val)
        cpVal.splice(idx, 1)
      } else {
        cpVal.push(val)
      }
      res = cpVal.join(',')
      if(renderValue) setRender(renderValue(cpVal))  
      else setRender(res)
    } else {
      res = val
      if(renderValue) setRender(renderValue(val))
      else setRender(res)
    } 
    
    if(inputEl.current) {
      const inputSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
      inputSetter?.call(inputEl.current, res)
      const ev = new Event('input', { bubbles: true })
      inputEl.current.dispatchEvent(ev)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value: string | string[] = e.target.value
    let cpE: React.ChangeEvent<HTMLInputElement> | evTarget = e
    if(multiple) {
      value = e.target.value ? e.target.value.split(',') : []
      cpE = { target: { value }}
    }
    onChange && onChange(cpE)
  }

  return (
    <FormControl
      css={css`
        padding-top: 11px;
      `}
      { ...others }
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
      <div
        ref={selRef}
        css={css`
          position: relative;
          width: 100%;
          min-height: 32px;
          background-color: transparent;
          font-size: 1.4em;
          color: ${colors.gn};
          line-height: 1.8em;
          border: none;
          border-bottom: 1px solid ${colors.gn};
          text-overflow: ellipsis;
        `}
      >
        {renderedVal}
        <span className="mat-icon" css={css`position: absolute; right: 0; top: 16%;`}>
          {focused ? 'expand_less' : 'expand_more'}
        </span>
        <input
          ref={inputEl}
          aria-hidden
          css={css`
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            opacity: 0;
            box-sizing: content-box;
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
          id={id}
          onFocus={handleFocus}
          onChange={handleChange}
        />
          <Panel
            open={focused}
            markClass="SWMenu-Root"
            css={css`
              padding: .4em 0;
              font-size: 1.4em;
              line-height: 1.8em;
              /* border: solid 1px ${colors.gn}; */
              box-shadow: 0 5px 5px -3px rgba(${colors.gnRGB}, 26%),
                0px 8px 10px 1px rgb(${colors.gnRGB}, 20%), 
                0px 3px 14px 2px rgb(${colors.gnRGB}, 16%);
            `}
            loc={loc}
            onClickAway={() => setFocus(false)}
        >
          {React.Children.map(children, (chd) => {
            if(React.isValidElement(chd)) {
              return React.cloneElement(chd, {
                role: 'option',
                'data-value': chd.props.value,
                onClick: () => handleOptClick(chd.props.value)
              })
            }
          })}
        </Panel>
      </div>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
