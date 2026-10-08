import React, { useEffect, useId, useRef, useState } from "react";
import { BaseBlock, InputBlock } from "../base/Base";
import { AnimatePresence, motion } from "framer-motion";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import type {
  AutoCompleteDataItem,
  AutoCompleteProps,
} from "./AutoComplete.types";

const AutoComplete: React.FC<AutoCompleteProps> = ({
  name,
  nameLabel,
  label,
  size,
  readOnly,
  maxLength,
  placeHolder,
  disabled,
  data = [],
  required,
  className,
  dataIsLoading,
  lockWhenDataIsLoading,
  defaultValue,
  error,
  options,
  onChange,
  locked,
}) => {
  const id = useId();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [inputLabel, setInputLabel] = useState("");
  const [, setInputValueSize] = useState(0);
  const [filteredData, setFilteredData] = useState<AutoCompleteDataItem[]>([]);
  const [content, setContent] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  const closePopover = () => setIsOpen(false);

  const buildClassname = () => {
    const str: string[] = [];

    if (className) {
      str.push(className);
    }

    return str.join(" ");
  };

  const filteringHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();
    const filterData = data.filter((item) =>
      String(item[options.label.key] || "")
        .toLowerCase()
        .includes(value),
    );

    setFilteredData(filterData);
  };

  useEffect(() => {
    if (defaultValue !== undefined && defaultValue !== null) {
      const defaultItem = data.find(
        (item) => String(item[options.value.key]) === String(defaultValue),
      );
      if (defaultItem) {
        setContent(String(defaultItem[options.value.key] || ""));
        setInputLabel(String(defaultItem[options.label.key] || ""));
      }
    }
  }, [defaultValue, data, options.label.key, options.value.key]);

  useEffect(() => {
    if (content) {
      const value = content.toLowerCase();
      const filterData = data.filter((item) =>
        String(item[options.value.key] || "")
          .toLowerCase()
          .includes(value),
      );

      setFilteredData(filterData);
      if (filterData.length > 0) {
        setInputLabel(String(filterData[0][options.label.key] || ""));
      }
    } else {
      setInputLabel("");
    }
  }, [content, options.label.key, options.value.key]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        closePopover();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <BaseBlock
      id={id}
      label={label}
      size={size}
      required={required ?? false}
      className="flourui-autocomplete"
    >
      <InputBlock
        error={error}
        className={buildClassname()}
        dataIsLoading={dataIsLoading}
        lockWhenDataIsLoading={lockWhenDataIsLoading}
        locked={locked}
      >
        <div className={`autocomplete-root-input`}>
          <input
            disabled={(disabled || locked?.value) ?? false}
            name={nameLabel || id}
            id={id}
            readOnly={readOnly ?? false}
            maxLength={maxLength}
            placeholder={placeHolder ?? ""}
            className="autocomplete-root-filter"
            value={inputLabel}
            onChange={(event) => {
              setInputLabel(event.target.value);
              setContent("");
              onChange && onChange(event.target.value);
            }}
            onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
              const target = event.target as HTMLInputElement;
              setInputValueSize(target.value.length);
              filteringHandler(event);
              setIsOpen(target.value.length > 0);
            }}
            onFocus={() => {
              setIsOpen(true);
            }}
          />
          {!data || data.length === 0 || locked?.value ? null : (
            <i
              onClick={() => {
                setFilteredData(data);
                toggleOpen();
              }}
              className={`icon ${
                isOpen ? "ti ti-chevron-up" : "ti ti-chevron-down"
              }`}
              ref={triggerRef}
            ></i>
          )}
          <input type="hidden" name={name} value={content} />
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="autocomplete-list-root"
              id={`${id}-list`}
              ref={contentRef}
            >
              <SimpleBar style={{ maxHeight: "240px" }}>
                <div className="autocomplete-list">
                  <AnimatePresence>
                    {options.value.enhancedValues?.data?.length ? (
                      <div className="autocomplete-list-enhanced">
                        <p className="autocomplete-enhanced-label">
                          {options.value.enhancedValues.label}
                        </p>

                        {(options.value.enhancedValues.data ?? []).map(
                          (option, index) => {
                            const optionValue = String(
                              option[options.value.key] || "",
                            );
                            const optionLabel = String(
                              option[options.label.key] || "",
                            );

                            const uniqueKey =
                              optionValue || `${optionLabel}-${index}`;
                            return (
                              <div
                                className={
                                  options.icon && options.icon.key
                                    ? "autocomplete-list-item-container template-icon"
                                    : "autocomplete-list-item-container"
                                }
                                onClick={() => {
                                  setContent(optionValue);
                                  setInputLabel(optionLabel);
                                  setInputValueSize(0);
                                  setIsOpen(false);
                                }}
                                key={uniqueKey}
                              >
                                {options.icon && options.icon.key && (
                                  <>
                                    {options.icon.type === "icon" && (
                                      <i
                                        className={option[options.icon.key]}
                                      ></i>
                                    )}
                                    {options.icon.type === "image" && (
                                      <img
                                        src={option[options.icon.key]}
                                        alt={optionLabel}
                                        className={options.icon.className}
                                      />
                                    )}
                                  </>
                                )}
                                <div className="autocomplete-list-item">
                                  {options.label.details &&
                                    options.label.details.isRenderedInLabel && (
                                      <p
                                        className={`as-ma0 as-pa0 autocomplete-item-details position-${options.label.details.position} ${options.label.details.className ?? ""}`}
                                      >
                                        {option[options.label.details.key]}
                                      </p>
                                    )}
                                  <p className="as-ma0 as-pa0 autocomplete-item-label">
                                    {optionLabel}
                                  </p>
                                </div>
                              </div>
                            );
                          },
                        )}

                        <div className="divider"></div>
                      </div>
                    ) : null}

                    {filteredData.map((option, index) => {
                      const optionValue = String(
                        option[options.value.key] || "",
                      );
                      const optionLabel = String(
                        option[options.label.key] || "",
                      );

                      const uniqueKey =
                        optionValue || `${optionLabel}-${index}`;

                      if (options.value.enhancedValues?.data) {
                        const isEnhanced =
                          options.value.enhancedValues.data.some(
                            (enhancedOption) =>
                              String(enhancedOption[options.value.key]) ===
                              optionValue,
                          );
                        if (isEnhanced) {
                          return null; // Skip rendering if it's already in enhanced values
                        }
                      }

                      return (
                        <div
                          className={
                            options.icon && options.icon.key
                              ? "autocomplete-list-item-container template-icon"
                              : "autocomplete-list-item-container"
                          }
                          onClick={() => {
                            setContent(optionValue);
                            setInputLabel(optionLabel);
                            setInputValueSize(0);
                            setIsOpen(false);
                          }}
                          key={uniqueKey}
                        >
                          {options.icon && options.icon.key && (
                            <>
                              {options.icon.type === "icon" && (
                                <i className={option[options.icon.key]}></i>
                              )}
                              {options.icon.type === "image" && (
                                <img
                                  src={option[options.icon.key]}
                                  alt={optionLabel}
                                  className={options.icon.className}
                                />
                              )}
                            </>
                          )}
                          <div className="autocomplete-list-item">
                            {options.label.details &&
                              options.label.details.isRenderedInLabel && (
                                <p
                                  className={`as-ma0 as-pa0 autocomplete-item-details position-${options.label.details.position} ${options.label.details.className ?? ""}`}
                                >
                                  {option[options.label.details.key]}
                                </p>
                              )}
                            <p className="as-ma0 as-pa0 autocomplete-item-label">
                              {optionLabel}
                            </p>
                          </div>
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
