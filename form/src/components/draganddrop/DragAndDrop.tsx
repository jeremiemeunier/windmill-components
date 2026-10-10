import React, { useEffect, useId, useState } from "react";
import { DragAndDropProps } from "./DragAndDrop.type";
import { FileUploader } from "react-drag-drop-files";
import { BaseBlock, InputBlock } from "../base/Base";

const DragAndDrop: React.FC<DragAndDropProps> = ({
  name,
  size,
  label,
  authorizedFiles,
  multiple = true,
  required,
  disabled,
  className,
  error,
  dataIsLoading,
  lockWhenDataIsLoading,
  locked,
  onChange,
}) => {
  const id = useId();

  const [files, setFiles] = useState<File | File[] | null>(null);
  const [fileLabel, setFileLabel] = useState<string[]>([]);

  useEffect(() => {
    if (files) {
      try {
        const names = Array.isArray(files)
          ? files.map((f) => f.name)
          : [files.name];
        setFileLabel(names);
      } catch (err: any) {
        console.error("Error processing files:", err);
      }
    } else {
      setFileLabel([]);
    }
  }, [files]);

  const handleChange = (file: File | File[]) => {
    setFiles(file);
    onChange?.(file);
  };

  const classBuilder = () => {
    const str = ["windmillui-drag-n-drop"];

    if (className) str.push(className);

    return str.join(" ");
  };

  return (
    <BaseBlock id={id} label={label} size={size} required={required ?? false}>
      <InputBlock
        error={error}
        className={className}
        dataIsLoading={dataIsLoading}
        lockWhenDataIsLoading={lockWhenDataIsLoading}
        locked={locked}
      >
        <div className={classBuilder()}>
          <FileUploader
            handleChange={handleChange}
            name={name}
            types={authorizedFiles}
            hoverTitle={"Déposer ici"}
            multiple={multiple}
            required={required ?? false}
            disabled={(disabled || locked?.value) ?? false}
          >
            <div className="windmillui-drop-zone">
              <p>
                Déposez un ou plusieurs fichier(s) ici (
                {authorizedFiles.join(", ")})
              </p>
              <p>ou</p>
              <button className="windmillui cta level-secondary">
                Choisir un ou plusieurs fichier(s)
              </button>
            </div>
          </FileUploader>
          <p>
            {fileLabel.length > 0
              ? fileLabel.length > 1
                ? "Fichiers sélectionnés"
                : "Fichier sélectionné"
              : "Déposez vos fichiers dans la zone pour les télécharger"}
          </p>
          {fileLabel.length > 0 && (
            <div className="windmillui tag-container as-pl24 as-pr24 as-pb24">
              {fileLabel.map((f, k) => (
                <span key={k} className="tag stroke color-brand">
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>
      </InputBlock>
    </BaseBlock>
  );
};

export default DragAndDrop;
