/** @jsxImportSource @emotion/react */
import s from './grid.module.sass'

type spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
type breakpoint = boolean | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9  | 10 | 11 | 12
interface GridProps {
  container?: boolean,
  item?: boolean,
  spacing?: spacing,
  xs?: breakpoint,
  sm?: breakpoint,
  md?: breakpoint,
  lg?: breakpoint,
  xl?: breakpoint,
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  justify?: 'flex-start' | 'center' | 'flex-end' | 'between' | 'around' | 'evently',
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline',
  children?: React.ReactNode
}
const Grid = (props: GridProps) => {
  const { children } = props
  let clsNameStr = ''
  for(let [key, val] of Object.entries(props)) {
    if(key === 'children') continue
    if(val) clsNameStr += `${s[`${key}-${val}`]} `
  }
  return <div className={clsNameStr}>
    {children}
  </div>
}

export default Grid