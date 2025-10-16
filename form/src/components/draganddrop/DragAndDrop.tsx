import React, { useEffect, useState } from "react";
import { DragAndDropContent, DragAndDropProps } from "./DragAndDrop.type";
import { FileUploader } from "react-drag-drop-files";
import { BaseBlock, InputBlock } from "../base/Base";

const DragAndDrop: React.FC<DragAndDropProps> = ({
  size,
  label,
  content,
  setContent,
  authorizedFiles,
  className,
  dataIsLoading,
}) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [fileLabel, setFileLabel] = useState<string[]>([]);

  useEffect(() => {
    setFiles(content.value);
  }, [content]);

  useEffect(() => {
    if (files) {
      try {
        for (let i = 0; i < files.length; i++) {
          setFileLabel([...fileLabel, files[i].name]);
        }
      } catch (err: any) {}
    }
  }, [files]);

  const handleChange = (file: any) => {
    setFiles(file);
    setContent((p) => ({ ...p, value: file }));
  };

  const classBuilder = () => {
    const str = ["windmillui-drag-n-drop"];

    if (className) str.push(className);

    return str.join(" ");
  };

  return (
    <BaseBlock id="" label={label} size={size}>
      <InputBlock
        error={content.error && content.message}
        className={className}
        dataIsLoading={dataIsLoading}
      >
        <div className={classBuilder()}>
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={authorizedFiles}
            hoverTitle={"Déposer ici"}
            multiple={true}
          >
            <div className="windmillui-drop-zone">
              <p>
                Déposez un ou plusieurs fichier(s) ici ($
                {authorizedFiles.join(", ")})
              </p>
              <p>ou</p>
              <button className="windmillui cta level-secondary">
                Choisir un ou plusieurs fichier(s)
              </button>
            </div>
          </FileUploader>
          <p>
            {files && files.length > 0
              ? files.length > 1
                ? "Fichiers sélectionnés"
                : "Fichier sélectionné"
              : "Déposez vos fichiers dans la zone pour les télécharger"}
          </p>
          {fileLabel.length > 0 && (
            <div className="windmillui tag-container as-pl24 as-pr24 as-pb24">
              {fileLabel.map((f, k) => (
                <span key={k} className="teaui tag stroke color-brand">
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
