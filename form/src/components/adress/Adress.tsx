import React, { useId, useState } from "react";
import { BaseBlock, InputBlock } from "../base/Base";
import { AnimatePresence, motion } from "framer-motion";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { AdressItems, AdressProps } from "./Adress.types";

const Adress: React.FC<AdressProps> = ({
  label,
  content,
  setContent,
  error,
  size,
  readOnly,
  maxLength,
  placeHolder,
  locked,
  data,
  required,
  className,
  dataIsLoading,
}) => {
  const id = useId();

  const [inputValueSize, setInputValueSize] = useState(0);
  const [listVisibility, setListVisibility] = useState(false);

  return (
    <BaseBlock id={id} label={label} size={size} required={required}>
      <InputBlock
        error={error}
        className={className}
        dataIsLoading={dataIsLoading}
      >
        <div className={`windmillui-autocomplete-root-input`}>
          <input
            disabled={locked ? locked : false}
            name={id}
            id={id}
            readOnly={readOnly ? readOnly : false}
            maxLength={maxLength && maxLength}
            placeholder={placeHolder ? placeHolder : ""}
            className="windmillui-autocomplete-root-filter"
            value={content}
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              setContent(target.value);
            }}
            onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
              const target = event.target as HTMLInputElement;
              setInputValueSize(target.value.length);

              inputValueSize > 0
                ? setListVisibility(true)
                : setListVisibility(false);
            }}
          />
          <i
            onClick={() => {
              setListVisibility(!listVisibility);
            }}
            className={`icon ${
              listVisibility
                ? "windmill-icon-chevron-up"
                : "windmill-icon-chevron-down"
            }`}
          ></i>
        </div>
        <AnimatePresence>
          {data && data.length > 0 && listVisibility && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="windmillui-autocomplete-list-root"
              id="windmillui_autocomplete_root_list"
            >
              <SimpleBar style={{ maxHeight: "240px" }}>
                <div className="windmillui-autocomplete-list">
                  <AnimatePresence>
                    {data.map((option) => {
                      return (
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            setContent(option.properties.label);
                            setInputValueSize(0);
                            setListVisibility(false);
                          }}
                          key={option.properties.id}
                        >
                          <span>{option.properties.label}</span>
                        </button>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </SimpleBar>
            </motion.div>
          )}
        </AnimatePresence>
      </InputBlock>
    </BaseBlock>
  );
};

export default Adress;
