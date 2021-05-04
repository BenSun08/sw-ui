/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
const Container = props => {
  const { width, ...others } = props
  return (
    <div css={css`
      width: ${width};
      margin: 0 auto;
    `} {...others}>
      {props.children}
    </div>
  )
}
export default Container