/** @jsxImportSource @emotion/react */
import React from 'react'
import { createPortal} from 'react-dom'
import { css, SerializedStyles } from '@emotion/react'
import { SharedProps } from 'src/interfaces'
import { colors } from 'src/theme'

interface Loc { left: number | string, top: number | string, width?: number | string } 
interface PanelProps extends SharedProps {
  open: boolean
  loc?: Loc
  markClass: string,
  css?: SerializedStyles
  onClickAway: (e: React.MouseEvent) => void
}

const flexBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

function Panel({ open, loc, markClass, onClickAway, children, ...others}: PanelProps) {

  loc && (Object.entries(loc) as Array<[keyof Loc, string | number]>).forEach(([prop, val]) => {
    if(typeof val === 'number') {
      loc[prop] = val + 'px'
    }
  })

  const [inserted, setInserted] = React.useState(false)

  const rootRef = React.useRef<HTMLElement>()

  React.useEffect(() => {
    if(open) {
      const bodyEl = document.getElementsByTagName('body')[0]
      const root = document.createElement('div')
      root.className = markClass 
      root.style.zIndex = '150'
      rootRef.current = root
      bodyEl.appendChild(root)
      setInserted(true)
      return () => {
        bodyEl.removeChild(root)
        setInserted(false)
      }
    }
  }, [open, markClass])

  const handleClickAway = (e: React.MouseEvent<HTMLDivElement>) => {
    if((e.target as HTMLDivElement).dataset?.role === 'mask') {
      onClickAway && onClickAway(e)
    }
  }

  const absLay = css`
    position: absolute;
    left: ${loc?.left ? loc?.left : 0 };
    top: ${loc?.top ? loc?.top : 0 };
    width: ${loc?.width ? loc?.width : 'fit-content'};
  `

  return (
    <React.Fragment>
      {inserted && createPortal(
        <div
          data-role="mask"
          css={css`
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, .5);
            ${!loc && flexBox}
          `}
          onClick={handleClickAway}
        >
          <div
            css={css`
            ${loc && absLay}
              background-color: rgba(${colors.darkBgRGB}, .7);
              color: ${colors.gn};
            `}
            {...others}
          >
            {children}
          </div>
        </div>,
        rootRef.current as HTMLElement
      )}
    </React.Fragment>
  )
}

export default Panel