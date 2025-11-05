import React, { useEffect, useId, useState } from "react";
import { AutoCompleteProps, DataItems } from "./AutoComplete.types";
import { BaseBlock, InputBlock } from "../base/Base";
import { AnimatePresence, motion } from "framer-motion";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const AutoComplete: React.FC<AutoCompleteProps> = ({
  label,
  content,
  setContent,
  size,
  readOnly,
  maxLength,
  placeHolder,
  disabled,
  data,
  required,
  className,
  dataIsLoading,
  labelKey = "label",
  valueKey = "value",
}) => {
  const id = useId();

  const [inputLabel, setInputLabel] = useState("");
  const [inputValueSize, setInputValueSize] = useState(0);
  const [filteredData, setFilteredData] = useState<DataItems[]>([]);
  const [listVisibility, setListVisibility] = useState(false);

  const filteringHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();
    const filterData = data.filter((item) =>
      String(item[labelKey] || "").toLowerCase().includes(value)
    );

    setFilteredData(filterData);
  };

  useEffect(() => {
    if (content.value) {
      const value = content.value.toLowerCase();
      const filterData = data.filter((item) =>
        String(item[valueKey] || "").toLowerCase().includes(value)
      );

      setFilteredData(filterData);
      if (filterData.length > 0) {
        setInputLabel(String(filterData[0][labelKey] || ""));
      }
    }

    if (!content.value) setInputLabel("");
  }, [content, data, labelKey, valueKey]);

  return (
    <BaseBlock id={id} label={label} size={size} required={required}>
      <InputBlock
        error={content.error && content.message}
        className={className}
        dataIsLoading={dataIsLoading}
      >
        <div className={`windmillui-autocomplete-root-input`}>
          <input
            disabled={disabled ?? false}
            name={id}
            id={id}
            readOnly={readOnly ?? false}
            maxLength={maxLength && maxLength}
            placeholder={placeHolder ?? ""}
            className="windmillui-autocomplete-root-filter"
            value={inputLabel}
            onChange={(event) => {
              setInputLabel(event.target.value);
            }}
            onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
              const target = event.target as HTMLInputElement;
              setInputValueSize(target.value.length);
              filteringHandler(event);

              inputValueSize > 0
                ? setListVisibility(true)
                : setListVisibility(false);
            }}
          />
          <i
            onClick={() => {
              setFilteredData(data);
              setListVisibility(!listVisibility);
            }}
            className={`icon ${
              listVisibility ? "ti ti-chevron-up" : "ti ti-chevron-down"
            }`}
          ></i>
        </div>
        <AnimatePresence>
          {listVisibility && (
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
                    {filteredData.map((option, index) => {
                      const optionValue = String(option[valueKey] || "");
                      const optionLabel = String(option[labelKey] || "");
                      return (
                        <div
                          onClick={() => {
                            setContent((p) => ({ ...p, value: optionValue }));
                            setInputLabel(optionLabel);
                            setInputValueSize(0);
                            setListVisibility(false);
                          }}
                          key={optionValue || index}
                        >
                          <p className="windmillui as-ma0 as-pa0">
                            {optionLabel}
                          </p>
                          {option.details && (
                            <p className="windmillui as-ma0 as-pa0 text labeled">
                              {option.details}
                            </p>
                          )}
                        </div>
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

export default AutoComplete;
