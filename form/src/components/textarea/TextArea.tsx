import { useId, useState } from "react";
import { TextAreaProps } from "./TextArea.types";
import { BaseBlock, InputBlock } from "../base/Base";

const TextArea: React.FC<TextAreaProps> = ({
  label,
  content,
  setContent,
  maxLength,
  error,
  size,
  tagline,
  readOnly,
  placeHolder,
  locked,
  rows,
  className,
}) => {
  const id = useId();
  const [actualContentSize, setActualContentSize] = useState(0);

  return (
    <BaseBlock id={id} label={label} tagline={tagline} size={size}>
      <InputBlock error={error} className={className}>
        <textarea
          disabled={locked ? locked : false}
          id={id}
          name={id}
          value={content}
          readOnly={readOnly ? readOnly : false}
          maxLength={maxLength && maxLength}
          placeholder={placeHolder ? placeHolder : ""}
          rows={rows}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            const target = event.target as HTMLTextAreaElement;
            setContent(target.value);
          }}
          onKeyUp={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            const target = event.target as HTMLTextAreaElement;
            setActualContentSize(target.value.length);
          }}
        ></textarea>
        {maxLength && (
          <span className="form-max-length">
            {actualContentSize} / {maxLength}
          </span>
        )}
      </InputBlock>
    </BaseBlock>
  );
};

export default TextArea;
