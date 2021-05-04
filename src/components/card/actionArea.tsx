/** @jsxImportSource @emotion/react */
import React from 'react'
import { css, keyframes, SerializedStyles } from '@emotion/react'
import { css as VCss } from '@emotion/css'

interface actnAreaProps {
  children?: React.ReactNode
  onClick?: React.EventHandler<React.MouseEvent>
  css?: SerializedStyles
}

const CardActionArea = (props: actnAreaProps) => {
  const { children, onClick, ...others } = props
  const rippleCtnrRef = React.useRef() as React.MutableRefObject<HTMLSpanElement> // ripple container reference
  const rippleDur = 500 // duration of the ripple effect
  const foDur = 50 // duration of fade out effect

  let downTime: number, upTime: number
  // click ripple effect
  const handleMouseDown = (e: React.MouseEvent) => {
    const { clientX, clientY, timeStamp } = e
    downTime = timeStamp
    const layer = rippleCtnrRef.current
    const { x, y } = layer.getBoundingClientRect() // element.getBoundingClientRect() => DOMRect
    const { offsetWidth, offsetHeight } = layer
    const left = clientX - x
    const top = clientY - y
    const right = offsetWidth - left
    const bottom = offsetHeight - top
    let max = left, max2 = 0
    for (let i of [left, top, right, bottom]) {
      if (max < i) max = i
      else if (max >= i && max2 < i) max2 = i
    }
    const finalRadius = Math.sqrt(max ** 2 + max2 ** 2)
    const ripple = keyframes`
      0% {
        width: 0;
        height: 0;
      }
      100% {
        width: ${2 * finalRadius}px;
        height: ${2 * finalRadius}px;
      }
    `
    const rippleInStyle = VCss`
      position: absolute;
      left: ${left}px;
      top: ${top}px;
      background-color: #333333;
      opacity: .3;
      border-radius: 50%;
      z-index: 0;
      transform: translate(-50%, -50%);
      animation: ${ripple} ${rippleDur}ms cubic-bezier(.4, 0, .2, 1) 1 forwards;
    `
    // insert ripple effect element 
    const rippleInEl = document.createElement('span')
    rippleInEl.setAttribute('data-role', 'ripple')
    rippleInEl.className = rippleInStyle
    layer.appendChild(rippleInEl)
  }

  const handleMouseUp = async (e: React.MouseEvent) => {
    onClick && onClick(e)
    
    const { timeStamp } = e
    upTime = timeStamp
    const duration = upTime - downTime
    let target = e.target as Element
    const role = target.getAttribute('data-role')
    if(role !== 'ripple') return
    // insert the fade out effect element
    let rippleFoEl = document.createElement('span')
    const rippleFoStyle = VCss`
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border-radius: 50%;
    `
    rippleFoEl.className = rippleFoStyle
    // trigger fade out effect
    const atOpts = {
      duration: foDur,
      easing: 'cubic-bezier(.4, 0, .2, 1)',
      delay: duration >= rippleDur ? 0 :  rippleDur - duration
    }
    target.appendChild(rippleFoEl)
    const anm = target.animate([{ opacity: 0.3 }, { opacity: 0 }], atOpts)
    anm.onfinish = () => {
      rippleCtnrRef.current && rippleCtnrRef.current.removeChild(rippleFoEl.parentElement as Element)
    }
  }

  return (
    <button
      css={css`
        position: relative;
        width: 100%;
        margin: 0;
        padding: 0;
        background: none;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
      `}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...others}
    >
      {children}
      <span
        ref={rippleCtnrRef}
        css={css`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        cursor: pointer;
        color: #00ffffff;
        overflow: hidden;
      `}>
      </span>
    </button>
  )
}

export default CardActionArea