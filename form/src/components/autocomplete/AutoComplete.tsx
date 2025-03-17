import { useEffect, useId, useState } from "react";
import { AutoCompleteProps, DataItems } from "./AutoComplete.types";
import { BaseBlock, InputBlock } from "../base/Base";
import { AnimatePresence, motion } from "framer-motion";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const AutoComplete: React.FC<AutoCompleteProps> = ({
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
      item.label.toLowerCase().includes(value)
    );

    setFilteredData(filterData);
  };

  useEffect(() => {
    if (content) {
      const value = content.toLowerCase();
      const filterData = data.filter((item: { value: string; label: string }) =>
        item.value.toLowerCase().includes(value)
      );

      setFilteredData(filterData);
      setInputLabel(filterData[0].label);
    }

    if (!content) {
      setInputLabel("");
    }
  }, [content]);

  return (
    <BaseBlock id={id} label={label} size={size} required={required}>
      <InputBlock error={error} className={className}>
        <div className={`teaui autocomplete-root-input`}>
          <input
            disabled={locked ? locked : false}
            name={id}
            id={id}
            readOnly={readOnly ? readOnly : false}
            maxLength={maxLength && maxLength}
            placeholder={placeHolder ? placeHolder : ""}
            className="teaui-autocomplete-root-filter"
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
              listVisibility
                ? "teaui-icon-chevron-up"
                : "teaui-icon-chevron-down"
            }`}
          ></i>
        </div>
        <AnimatePresence>
          {listVisibility && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="teaui form-autocomplete-list-root"
              id="teaui_autocomplete_root_list"
            >
              <SimpleBar style={{ maxHeight: "240px" }}>
                <div className="teaui form-autocomplete-list">
                  <AnimatePresence>
                    {filteredData.map((option) => {
                      return (
                        <div
                          onClick={() => {
                            setContent(option.value);
                            setInputLabel(option.label);
                            setInputValueSize(0);
                            setListVisibility(false);
                          }}
                          key={option.value}
                        >
                          <span>{option.label}</span>
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
