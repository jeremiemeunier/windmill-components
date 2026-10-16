import { FileInputProps } from "./FileInput.types";
import { Box } from "../base/Base";
import React, { useId, useState } from "react";

const FileInput: React.FC<FileInputProps> = ({
  label,
  setContent,
  error,
  size,
  tagline,
  required,
  accept = [],
  className,
  dataIsLoading,
}) => {
  const id = useId();
  const [fileSelectedLabel, setFileSelectedLabel] = useState("");

  return (
    <Box.Root
      id={id}
      label={label}
      size={size}
      tagline={tagline}
      required={required}
    >
      <Box.Input
        error={error}
        className={className}
        dataIsLoading={dataIsLoading}
      >
        <div className={`windmillui-file-input ${className}`}>
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
          <label className="windmillui cta level-secondary" htmlFor={id}>
            Choisir un fichier
          </label>
          <span>
            {fileSelectedLabel
              ? fileSelectedLabel
              : "Aucun fichier sélectionné"}
          </span>
        </div>
      </Box.Input>
    </Box.Root>
  );
};

export default FileInput;
