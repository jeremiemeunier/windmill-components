import { FileInputProps } from "./FileInput.types";
import { BaseBlock, InputBlock } from "../base/Base";
import { useId, useState } from "react";

const FileInput: React.FC<FileInputProps> = ({
  label,
  setContent,
  error,
  size,
  tagline,
  required,
  accept = [],
  className,
}) => {
  const id = useId();
  const [fileSelectedLabel, setFileSelectedLabel] = useState("");

  return (
    <BaseBlock
      id={id}
      label={label}
      size={size}
      tagline={tagline}
      required={required}
    >
      <InputBlock error={error} className={className}>
        <div className={`infusedui-file-input ${className}`}>
          <input
            type="file"
            id={id}
            name={id}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const target = event.target as HTMLInputElement;
              setContent(target.files && target.files[0]);
              setFileSelectedLabel(event.target.value.split("\\")[2]);
            }}
            accept={accept ? accept.join(", ") : ""}
          />
          <label className="teaui cta level-secondary" htmlFor={id}>
            Choisir un fichier
          </label>
          <span>
            {fileSelectedLabel
              ? fileSelectedLabel
              : "Aucun fichier sélectionné"}
          </span>
        </div>
      </InputBlock>
    </BaseBlock>
  );
};

export default FileInput;
