import { DayArrayProps, DatePickerProps } from "./DatePicker.types";
import React, { useState, useId, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BaseBlock, InputBlock } from "../base/Base";
import { Calendar } from "../../class/DatePicker.class";

export const DatePicker: React.FC<DatePickerProps> = ({
  name,
  label,
  size,
  readOnly,
  disabledOptions,
  required,
  defaultValue,
  error,
  blockedDate,
  rangeStart,
  blockType,
  disabled,
  className,
  disabledTodayButton = false,
  dataIsLoading,
  lockWhenDataIsLoading,
  locked,
  onChange,
}) => {
  const id = useId();
  const calendar = new Calendar();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(defaultValue ?? "");
  const [activeMonth, setActiveMonth] = useState<number>(
    defaultValue ? new Date(defaultValue).getMonth() : new Date().getMonth(),
  );
  const [activeYear, setActiveYear] = useState<number>(
    defaultValue
      ? new Date(defaultValue).getFullYear()
      : new Date().getFullYear(),
  );
  const [_activeDay, setActiveDay] = useState<number>(
    defaultValue ? new Date(defaultValue).getDay() : new Date().getDay(),
  );

  const [monthList] = useState<number[]>([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  ]);
  const [monthDayList, setMonthDayList] = useState<DayArrayProps[]>([]);
  const [yearList, setYearList] = useState<number[]>([]);

  const closePopover = () => setIsOpen(false);

  const interpreterMonth = (month: number) => {
    switch (month) {
      case 0:
        return "Janvier";
      case 1:
        return "Février";
      case 2:
        return "Mars";
      case 3:
        return "Avril";
      case 4:
        return "Mai";
      case 5:
        return "Juin";
      case 6:
        return "Juillet";
      case 7:
        return "Août";
      case 8:
        return "Septembre";
      case 9:
        return "Octobre";
      case 10:
        return "Novembre";
      case 11:
        return "Décembre";
    }
  };

  const prevMonth = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (activeMonth - 1 < 0) {
      setActiveMonth(11);
      setActiveYear(activeYear - 1);
    } else {
      setActiveMonth(activeMonth - 1);
    }
  };

  const nextMonth = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (activeMonth + 1 > 11) {
      setActiveMonth(0);
      setActiveYear(activeYear + 1);
    } else {
      setActiveMonth(activeMonth + 1);
    }
  };

  const classBuilder = (day: number) => {
    const classString: string[] = [];
    const today = new Date().toLocaleDateString();

    if (
      value ===
      `${activeYear}-${
        activeMonth + 1 < 10 ? `0${activeMonth + 1}` : activeMonth + 1
      }-${day < 10 ? `0${day}` : day}`
    ) {
      classString.push("active");
    }

    if (
      today ===
      `${day < 10 ? `0${day}` : day}/${
        activeMonth + 1 < 10 ? `0${activeMonth + 1}` : activeMonth + 1
      }/${activeYear}`
    ) {
      classString.push("today");
    }

    return classString.join(" ");
  };

  useEffect(() => {
    const buildYear = () => {
      const yearList: number[] = [];

      for (let i = 1900; i < activeYear + 10; i++) {
        yearList.push(i);
      }

      setYearList(yearList);
    };

    buildYear();
  }, [activeYear]);

  useEffect(() => {
    const buildMonthDate = () => {
      const monthDateList: DayArrayProps[] = [];
      const today = new Date();
      const monthDays = calendar.generateMonthDays(activeYear, activeMonth);

      for (const day of monthDays) {
        if (!day) {
          monthDateList.push({ day: 0 });
          continue;
        }

        const actualDay = new Date(`${activeYear}-${activeMonth + 1}-${day}`);
        const stringDate = `${actualDay.getFullYear()}-${
          actualDay.getMonth() + 1 < 10
            ? `0${actualDay.getMonth() + 1}`
            : actualDay.getMonth() + 1
        }-${
          actualDay.getDate() < 10
            ? `0${actualDay.getDate()}`
            : actualDay.getDate()
        }`;

        if (
          disabledOptions &&
          disabledOptions?.indexOf("weekend") >= 0 &&
          (actualDay.getDay() === 6 || actualDay.getDay() === 0)
        ) {
          monthDateList.push({ day: actualDay.getDate(), disabled: true });
        } else if (
          disabledOptions &&
          disabledOptions?.indexOf("sunday") >= 0 &&
          actualDay.getDay() === 0
        ) {
          monthDateList.push({ day: actualDay.getDate(), disabled: true });
        } else if (
          disabledOptions &&
          disabledOptions?.indexOf("monday") >= 0 &&
          actualDay.getDay() === 1
        ) {
          monthDateList.push({ day: actualDay.getDate(), disabled: true });
        } else if (
          disabledOptions &&
          disabledOptions?.indexOf("tuesday") >= 0 &&
          actualDay.getDay() === 2
        ) {
          monthDateList.push({ day: actualDay.getDate(), disabled: true });
        } else if (
          disabledOptions &&
          disabledOptions?.indexOf("wednesday") >= 0 &&
          actualDay.getDay() === 3
        ) {
          monthDateList.push({ day: actualDay.getDate(), disabled: true });
        } else if (
          disabledOptions &&
          disabledOptions?.indexOf("thursday") >= 0 &&
          actualDay.getDay() === 4
        ) {
          monthDateList.push({ day: actualDay.getDate(), disabled: true });
        } else if (
          disabledOptions &&
          disabledOptions?.indexOf("friday") >= 0 &&
          actualDay.getDay() === 5
        ) {
          monthDateList.push({ day: actualDay.getDate(), disabled: true });
        } else if (
          disabledOptions &&
          disabledOptions?.indexOf("saturday") >= 0 &&
          actualDay.getDay() === 6
        ) {
          monthDateList.push({ day: actualDay.getDate(), disabled: true });
        } else if (
          ((disabledOptions && disabledOptions?.indexOf("old") >= 0) ||
            (disabledOptions && disabledOptions?.indexOf("past") >= 0)) &&
          (actualDay.getFullYear() < today.getFullYear() ||
            (actualDay.getFullYear() === today.getFullYear() &&
              actualDay.getMonth() < today.getMonth()) ||
            (actualDay.getFullYear() === today.getFullYear() &&
              actualDay.getMonth() === today.getMonth() &&
              actualDay.getDate() < today.getDate()))
        ) {
          monthDateList.push({ day: actualDay.getDate(), disabled: true });
        } else if (
          disabledOptions &&
          disabledOptions?.indexOf("futur") >= 0 &&
          (actualDay.getFullYear() > today.getFullYear() ||
            (actualDay.getFullYear() === today.getFullYear() &&
              actualDay.getMonth() > today.getMonth()) ||
            (actualDay.getFullYear() === today.getFullYear() &&
              actualDay.getMonth() === today.getMonth() &&
              actualDay.getDate() > today.getDate()))
        ) {
          monthDateList.push({ day: actualDay.getDate(), disabled: true });
        } else if (
          rangeStart &&
          blockType === "past" &&
          stringDate < rangeStart
        ) {
          monthDateList.push({ day: actualDay.getDate(), disabled: true });
        } else if (
          rangeStart &&
          blockType === "futur" &&
          stringDate > rangeStart
        ) {
          monthDateList.push({ day: actualDay.getDate(), disabled: true });
        } else if (blockedDate && blockedDate.indexOf(stringDate) >= 0) {
          monthDateList.push({ day: actualDay.getDate(), disabled: true });
        } else {
          monthDateList.push({ day: actualDay.getDate() });
        }
      }

      setMonthDayList(monthDateList);
    };

    buildMonthDate();
  }, [
    activeMonth,
    activeYear,
    blockedDate,
    disabledOptions,
    rangeStart,
    blockType,
  ]);

  useEffect(() => {
    setActiveMonth(value ? new Date(value).getMonth() : new Date().getMonth());
    setActiveYear(
      value ? new Date(value).getFullYear() : new Date().getFullYear(),
    );
    setActiveDay(value ? new Date(value).getDay() : new Date().getDay());
  }, [value]);

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

  const buildValueDate = () => {
    const data = new Date(value);
    const str = [];

    str.push(data.getFullYear());
    str.push((data.getMonth() + 1).toString().padStart(2, "0"));
    str.push(data.getDate().toString().padStart(2, "0"));

    return str.join("-");
  };

  return (
    <BaseBlock id={id} size={size} label={label} required={required}>
      <InputBlock
        error={error}
        className={className}
        dataIsLoading={dataIsLoading}
        lockWhenDataIsLoading={lockWhenDataIsLoading}
        locked={locked}
      >
        <div className="windmillui-datepicker-root-input">
          <input
            disabled={(disabled || locked?.value) ?? false}
            name={name}
            id={id}
            readOnly={readOnly ? readOnly : false}
            type="date"
            value={value ? buildValueDate() : ""}
            required={required}
            onFocus={() => {
              setIsOpen(true);
            }}
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              setValue(target.value);
              onChange?.(target.value);
            }}
            onBlur={() => {
              setIsOpen(false);
            }}
          />
          <i
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="icon ti ti-calendar"
            ref={triggerRef}
          ></i>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="windmillui-datepicker-calendar-root"
              ref={contentRef}
            >
              <div className="windmillui-datepicker-calendar-month">
                <button onClick={prevMonth}>
                  <i className="icon ti ti-caret-left-filled"></i>
                </button>
                <div>
                  {!disabledTodayButton &&
                    (new Date().getMonth() !== activeMonth ||
                      new Date().getFullYear() !== activeYear) && (
                      <button
                        onClick={(
                          event: React.MouseEvent<
                            HTMLButtonElement,
                            MouseEvent
                          >,
                        ) => {
                          event.preventDefault();
                          const today = new Date();

                          setActiveMonth(today.getMonth());
                          setActiveYear(today.getFullYear());
                        }}
                      >
                        Aujourd'hui
                      </button>
                    )}
                  <select
                    className="as-mr8"
                    value={activeMonth}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                      const target = event.target as HTMLSelectElement;
                      setActiveMonth(parseInt(target.value));
                    }}
                  >
                    {monthList.map((month) => (
                      <option key={month} value={month}>
                        {interpreterMonth(month)}
                      </option>
                    ))}
                  </select>
                  <select
                    value={activeYear}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                      const target = event.target as HTMLSelectElement;
                      setActiveYear(parseInt(target.value));
                    }}
                  >
                    {yearList.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <button onClick={nextMonth}>
                  <i className="icon ti ti-caret-right-filled"></i>
                </button>
              </div>
              <div className="windmillui-datepicker-calendar-days">
                <div className="windmillui-datepicker-day-label">
                  <span>L</span>
                  <span>M</span>
                  <span>M</span>
                  <span>J</span>
                  <span>V</span>
                  <span>S</span>
                  <span>D</span>
                </div>

                {monthDayList.map((day, key) => {
                  if (day.day) {
                    return (
                      <button
                        className={classBuilder(day.day)}
                        disabled={day.disabled ? true : false}
                        onClick={(
                          event: React.MouseEvent<
                            HTMLButtonElement,
                            MouseEvent
                          >,
                        ) => {
                          event.preventDefault();
                          const newValue = `${activeYear}-${
                            activeMonth + 1 < 10
                              ? `0${activeMonth + 1}`
                              : activeMonth + 1
                          }-${day.day < 10 ? `0${day.day}` : day.day}`;
                          setValue(newValue);
                          onChange?.(newValue);
                          setActiveDay(day.day);
                          setIsOpen(false);
                        }}
                        key={key}
                      >
                        {day.day}
                      </button>
                    );
                  }

                  return <span key={key}></span>;
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </InputBlock>
    </BaseBlock>
  );
};

export default DatePicker;
