import { SerializedStyles } from '@emotion/react'

export interface SharedProps<T = string | number, U = React.ChangeEvent<HTMLInputElement>> {
  id: string
  value: T
  onChange: (e: U) => void
  label: string;
  helperText?: string;
  css?: SerializedStyles
  children?: React.ReactNode,
}