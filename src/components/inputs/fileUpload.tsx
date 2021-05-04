/** @jsxImportSource @emotion/react */
import React from "react";
import List, { ListItem } from "src/components/list";
import { css, SerializedStyles } from "@emotion/react";
import { colors } from "src/theme";
interface FileUploadProps {
  accept: string;
  multiple?: boolean;
  placeholder?: string;
  css?: SerializedStyles;
  onChange?: (f: File[]) => void;
}

const FileUpload = (props: FileUploadProps) => {
  const { accept, multiple = true, placeholder, onChange, ...others } = props;

  let [files, setFiles] = React.useState<File[]>([]);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleZoneClick = () => {
    inputRef.current && inputRef.current.click();
  };

  const changeFilesVal = (val: File[]) => {
    setFiles(val);
    onChange && onChange(val);
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let src = e.target.files || [];
    let tgt = [];
    for (let i = 0; i < src.length; i++) {
      tgt.push(src[i]);
    }
    changeFilesVal(tgt);
  };

  const handleDelFile = (idx: number) => {
    const cpFiles = files.slice();
    cpFiles.splice(idx, 1);
    changeFilesVal(cpFiles);
  };

  return (
    <div>
      <div
        css={css`
          width: 100%;
          height: 100px;
          padding: 16px 32px;
          border: 1px dashed ${colors.darkGn};
          color: ${colors.darkGn};
          cursor: pointer;
          &:hover {
            border: 1px dashed ${colors.gn};
          }
        `}
        {...others}
        onClick={handleZoneClick}
      >
        {placeholder ||
          "Please click to select a file or drop the file into this zone"}
        <input
          ref={inputRef}
          css={css`
            display: none;
          `}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFilesChange}
        />
      </div>
      <div>
        <List>
          {files.map((f, i) => (
            <ListItem
              key={i}
              css={css`
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 0.9em;
                &:hover > span {
                  visibility: visible;
                }
              `}
            >
              {f.name}
              <span
                css={css`
                  visibility: hidden;
                  font-size: 0.9em;
                  cursor: pointer;
                `}
                className="mat-icon"
                onClick={() => handleDelFile(i)}
              >
                clear
              </span>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default FileUpload;
