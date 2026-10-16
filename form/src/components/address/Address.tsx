import React, { useId, useState, useRef, useEffect } from "react";
import { Box } from "../base/Base";
import { AnimatePresence, motion } from "framer-motion";
import SimpleBar from "simplebar-react";
import { AddressProps } from "./Address.types";
// @ts-ignore: pas de déclarations de type pour les fichiers CSS
import "simplebar-react/dist/simplebar.min.css";

const Address: React.FC<AddressProps> = ({
  required = false,
  error,
  label,
  size,
  readOnly,
  maxLength,
  placeHolder,
  disabled = false,
  data,
  dataIsLoading = false,
  onChange,
  defaultValue = "",
  className,
}) => {
  const id = useId();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [_, setInputValueSize] = useState(0);
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
    <Box.Root
      id={id}
      label={label}
      size={size}
      required={required ?? false}
      className="flourui-autocomplete"
    >
      <Box.Input
        error={error}
        dataIsLoading={dataIsLoading ?? false}
        className={buildClassname()}
      >
        <div className={`autocomplete-root-input`}>
          <input
            disabled={disabled ?? false}
            name={id}
            id={id}
            readOnly={readOnly ? readOnly : false}
            maxLength={maxLength}
            placeholder={placeHolder ?? ""}
            className="autocomplete-root-filter"
            value={content}
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              setContent(target.value);
              if (onChange) {
                const event = {
                  target: {
                    name: id,
                    value: target.value,
                  },
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(event);
              }
            }}
            onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
              const target = event.target as HTMLInputElement;
              setInputValueSize(target.value.length);
              setIsOpen(target.value.length > 0);
            }}
            onFocus={() => {
              setIsOpen(true);
            }}
          />
          <i
            onClick={() => {
              toggleOpen();
            }}
            className={`icon ${
              isOpen ? "ti ti-chevron-up" : "ti ti-chevron-down"
            }`}
          ></i>
        </div>
        <AnimatePresence>
          {data && data.length > 0 && isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="autocomplete-list-root"
              id="autocomplete_root_list"
            >
              <SimpleBar style={{ maxHeight: "240px" }}>
                <div className="autocomplete-list">
                  <AnimatePresence>
                    {data.map((option) => {
                      return (
                        <div
                          onClick={(event) => {
                            event.preventDefault();
                            setContent(option.properties.label);
                            setInputValueSize(0);
                            setIsOpen(false);
                          }}
                          className="autocomplete-list-item-container"
                          key={option.properties.id}
                        >
                          <div className="autocomplete-list-item">
                            <p className="as-ma0 as-pa0 autocomplete-item-label">
                              {option.properties.label}
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
      </Box.Input>
    </Box.Root>
  );
};

export default Address;
