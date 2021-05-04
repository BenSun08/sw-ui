/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { colors } from 'src/theme'

interface ChkBoxProps {
  checked: boolean
  label?: string
  onChange?: (e: React.ChangeEvent) => void
}
function CheckBox(props: ChkBoxProps) {
  const { checked, label, onChange } = props

  const handleChange = (e: React.ChangeEvent) => {
    onChange && onChange(e)
  }

  return <div css={css`position: relative; display: flex; align-items: center;`}>
    <input 
      css={css`
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        background-color: ${colors.bg}
      `}
      type="checkbox"
      checked={checked}
      onChange={handleChange}
    />
    <span className="mat-icon" css={css`width: fit-content; margin-right: .4em; color: ${colors.gn};`}>
      {checked ? 'check_box' : 'check_box_outline_blank' }
    </span>
    {label && <span>{label}</span>}
  </div>
}

export default CheckBox