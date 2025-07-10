import { useEffect, useState } from "react";
import { DragAndDropProps } from "./DragAndDrop.type";
import { FileUploader } from "react-drag-drop-files";
import { BaseBlock, InputBlock } from "../base/Base";

const DragAndDrop: React.FC<DragAndDropProps> = ({
  size,
  label,
  content,
  setContent,
  authorizedFiles,
  multipleUpload,
  error,
  className,
}) => {
  const [files, setFiles] = useState<File[] | null>(null);
  const [fileLabel, setFileLabel] = useState("");

  useEffect(() => {
    setFiles(content);
  }, [content]);

  useEffect(() => {
    if (files) {
      try {
        const labelArray: string[] = [];

        for (let i = 0; i < files.length; i++) {
          labelArray.push(files[i].name);
        }

        setFileLabel(labelArray.join(", "));
      } catch (error) {}
    }
  }, [files]);

  const handleChange = (file: any) => {
    if (typeof file === "object") {
      setFiles(file);
    } else {
      setFiles([file]);
    }

    setContent(file);
  };

  return (
    <BaseBlock id="" label={label} size={size}>
      <InputBlock error={error} className={className}>
        <div className={`infusedui-drag-n-drop ${className}`}>
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={authorizedFiles}
            hoverTitle={"Déposer ici"}
            multiple={multipleUpload ? true : false}
          >
            <div className="infusedui-drop-zone">
              <p>
                {`${
                  multipleUpload
                    ? "Déposez un ou plusieurs fichier(s)"
                    : "Déposer un fichier"
                } ici (${authorizedFiles.join(", ")})`}
              </p>
              <p>ou</p>
              <button className="teaui cta level-secondary">
                {multipleUpload
                  ? "Choisir un ou plusieurs fichier(s)"
                  : "Choisir un fichier"}
              </button>
            </div>
          </FileUploader>
          <p>
            {files && files.length > 0
              ? `Fichier${files.length > 1 ? "s" : ""} sélectionné${
                  files.length > 1 ? "s" : ""
                } : ${fileLabel}.`
              : "Déposez vos fichiers dans la zone pour les télécharger"}
          </p>
        </div>
      </InputBlock>
    </BaseBlock>
  );
};

export default DragAndDrop;
