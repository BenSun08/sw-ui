/** @jsxImportSource @emotion/react */

import { css, SerializedStyles } from "@emotion/react"

interface CardProps {
  children?: React.ReactNode
  css?: SerializedStyles
}
const Card = (props: CardProps) => {
  const { children, ...others } = props
  return (
    <div {...others}>
      {children}
    </div>
  )
}

export const CardHeader = (props: CardProps) => {
  const { children, ...others } = props
  return (
    <h1 {...others}>
      {children}
    </h1>
  )
}

export const CardContent = (props: CardProps) => {
  const { children, ...others } = props
  return (
    <div {...others}>
      {children}
    </div>
  )
}

interface CardMediaProps extends CardProps {
  image?: string
}
export const CardMedia = (props: CardMediaProps) => {
  const { children, image, ...others } = props
  return (
    <div css={css`
      background-color: #decb2e;
      background-image: url(${image});
      background-repeat: no-repeat;
      background-size: cover;
    `} {...others}>
      {children}
    </div>
  )
}

export default Card