import React, { useEffect, useId, useRef, useState } from "react";
import { TextAreaProps } from "./TextArea.types";
import { BaseBlock, InputBlock } from "../base/Base";

const TextArea: React.FC<TextAreaProps> = ({
  label,
  content,
  setContent,
  maxLength,
  size,
  tagline,
  readOnly,
  placeHolder,
  disabled,
  rows,
  className,
  resizable,
  dataIsLoading,
}) => {
  const id = useId();
  const ref = useRef<HTMLTextAreaElement>(null);
  const [actualContentSize, setActualContentSize] = useState(0);

  const resize = () => {
    if (resizable) {
      const el = ref.current;
      if (el) {
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      }
    }
  };

  useEffect(() => {
    resize();
    setActualContentSize(content.value.length);
  }, [content]);

  return (
    <BaseBlock id={id} label={label} tagline={tagline} size={size}>
      <InputBlock
        error={content.error && content.message}
        className={className}
        dataIsLoading={dataIsLoading}
      >
        <textarea
          ref={ref}
          disabled={disabled ? disabled : false}
          id={id}
          name={id}
          value={content.value}
          readOnly={readOnly ? readOnly : false}
          maxLength={maxLength && maxLength}
          placeholder={placeHolder ? placeHolder : ""}
          rows={rows}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            const target = event.target as HTMLTextAreaElement;
            setContent((p) => ({ ...p, value: target.value }));
          }}
          onKeyUp={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            const target = event.target as HTMLTextAreaElement;
            setActualContentSize(target.value.length);
          }}
        ></textarea>
        {maxLength && (
          <span className="windmillui-max-length">
            {actualContentSize} / {maxLength}
          </span>
        )}
      </InputBlock>
    </BaseBlock>
  );
};

export default TextArea;
