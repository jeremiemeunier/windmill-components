import { DayArrayProps, DatePickerProps } from "./DatePicker.types";
import React, { useState, useId, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BaseBlock, InputBlock } from "../base/Base";
import { Calendar } from "../../class/DatePicker.class";

export const DatePicker: React.FC<DatePickerProps> = ({
  content,
  setContent,
  error,
  size,
  readOnly,
  locked,
  required,
  label,
  blockedDate,
  disabled,
  className,
  disabledTodayButton = false,
}) => {
  const id = useId();
  const calendar = new Calendar();

  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [activeMonth, setActiveMonth] = useState<number>(
    content ? new Date(content).getMonth() : new Date().getMonth()
  );
  const [activeYear, setActiveYear] = useState<number>(
    content ? new Date(content).getFullYear() : new Date().getFullYear()
  );
  const [activeDay, setActiveDay] = useState<number>(
    content ? new Date(content).getDay() : new Date().getDay()
  );

  const [monthList] = useState<number[]>([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  ]);
  const [monthDayList, setMonthDayList] = useState<DayArrayProps[]>([]);
  const [yearList, setYearList] = useState<number[]>([]);

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
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
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
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
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
    let classString: string[] = [];
    const today = new Date().toLocaleDateString();

    if (
      content ===
      `${activeYear}-${
        activeMonth + 1 < 10 ? `0${activeMonth + 1}` : activeMonth + 1
      }-${day < 10 ? `0${day}` : day}`
    ) {
      classString.push(`active`);
    }

    if (
      today ===
      `${day < 10 ? `0${day}` : day}/${
        activeMonth + 1 < 10 ? `0${activeMonth + 1}` : activeMonth + 1
      }/${activeYear}`
    ) {
      classString.push(`today`);
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
    const pushEmptyDay = (quantity: number, list: DayArrayProps[]) => {
      for (let i = 0; i < quantity; i++) {
        list.push({ day: 0 });
      }
    };

    const buildMonthDate = () => {
      const monthDateList: DayArrayProps[] = [];
      const firstDay = new Date(`${activeYear}-${activeMonth + 1}-01`).getDay();
      const today = new Date();

      switch (firstDay) {
        case 0:
          pushEmptyDay(6, monthDateList);
          break;
        case 2:
          pushEmptyDay(1, monthDateList);
          break;
        case 3:
          pushEmptyDay(2, monthDateList);
          break;
        case 4:
          pushEmptyDay(3, monthDateList);
          break;
        case 5:
          pushEmptyDay(4, monthDateList);
          break;
        case 6:
          pushEmptyDay(5, monthDateList);
          break;
      }

      for (let i = 1; i < 32; i++) {
        const actualDay = new Date(`${activeYear}-${activeMonth + 1}-${i}`);
        const stringDate = `${actualDay.getFullYear()}-${
          actualDay.getMonth() + 1 < 10
            ? `0${actualDay.getMonth() + 1}`
            : actualDay.getMonth() + 1
        }-${
          actualDay.getDate() < 10
            ? `0${actualDay.getDate()}`
            : actualDay.getDate()
        }`;

        if (i === actualDay.getDate()) {
          if (
            disabled &&
            disabled?.indexOf("weekend") >= 0 &&
            (actualDay.getDay() === 6 || actualDay.getDay() === 0)
          ) {
            // lock weekend
            monthDateList.push({ day: actualDay.getDate(), disabled: true });
          } else if (
            disabled &&
            disabled?.indexOf("sunday") >= 0 &&
            actualDay.getDay() === 0
          ) {
            // lock sunday
            monthDateList.push({ day: actualDay.getDate(), disabled: true });
          } else if (
            disabled &&
            disabled?.indexOf("monday") >= 0 &&
            actualDay.getDay() === 1
          ) {
            // lock sunday
            monthDateList.push({ day: actualDay.getDate(), disabled: true });
          } else if (
            disabled &&
            disabled?.indexOf("tuesday") >= 0 &&
            actualDay.getDay() === 2
          ) {
            // lock sunday
            monthDateList.push({ day: actualDay.getDate(), disabled: true });
          } else if (
            disabled &&
            disabled?.indexOf("wednesday") >= 0 &&
            actualDay.getDay() === 3
          ) {
            // lock sunday
            monthDateList.push({ day: actualDay.getDate(), disabled: true });
          } else if (
            disabled &&
            disabled?.indexOf("thursday") >= 0 &&
            actualDay.getDay() === 4
          ) {
            // lock sunday
            monthDateList.push({ day: actualDay.getDate(), disabled: true });
          } else if (
            disabled &&
            disabled?.indexOf("friday") >= 0 &&
            actualDay.getDay() === 5
          ) {
            // lock sunday
            monthDateList.push({ day: actualDay.getDate(), disabled: true });
          } else if (
            disabled &&
            disabled?.indexOf("saturday") >= 0 &&
            actualDay.getDay() === 6
          ) {
            // lock sunday
            monthDateList.push({ day: actualDay.getDate(), disabled: true });
          } else if (
            ((disabled && disabled?.indexOf("old") >= 0) ||
              (disabled && disabled?.indexOf("past") >= 0)) &&
            (actualDay.getFullYear() < today.getFullYear() ||
              (actualDay.getFullYear() === today.getFullYear() &&
                actualDay.getMonth() < today.getMonth()) ||
              (actualDay.getFullYear() === today.getFullYear() &&
                actualDay.getMonth() === today.getMonth() &&
                actualDay.getDate() < today.getDate()))
          ) {
            monthDateList.push({ day: actualDay.getDate(), disabled: true });
          } else if (
            disabled &&
            disabled?.indexOf("futur") >= 0 &&
            (actualDay.getFullYear() > today.getFullYear() ||
              (actualDay.getFullYear() === today.getFullYear() &&
                actualDay.getMonth() > today.getMonth()) ||
              (actualDay.getFullYear() === today.getFullYear() &&
                actualDay.getMonth() === today.getMonth() &&
                actualDay.getDate() > today.getDate()))
          ) {
            monthDateList.push({ day: actualDay.getDate(), disabled: true });
          } else {
            if (blockedDate && blockedDate.indexOf(stringDate) >= 0) {
              monthDateList.push({ day: actualDay.getDate(), disabled: true });
            } else {
              monthDateList.push({ day: actualDay.getDate() });
            }
          }
        }
      }

      setMonthDayList(monthDateList);
    };

    buildMonthDate();
  }, [activeMonth, activeYear, blockedDate, disabled]);

  useEffect(() => {
    setActiveMonth(
      content ? new Date(content).getMonth() : new Date().getMonth()
    );
    setActiveYear(
      content ? new Date(content).getFullYear() : new Date().getFullYear()
    );
    setActiveDay(content ? new Date(content).getDay() : new Date().getDay());
  }, [content]);

  return (
    <BaseBlock id={id} size={size} label={label} required={required}>
      <InputBlock error={error} className={className}>
        <div className={`infusedui-datepicker-root-input`}>
          <input
            disabled={locked ? locked : false}
            name={id}
            id={id}
            readOnly={readOnly ? readOnly : false}
            type="date"
            value={content ? content : ""}
            onFocus={() => {
              setOpenCalendar(true);
            }}
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              setContent(target.value);
            }}
            onBlur={() => {
              setOpenCalendar(false);
            }}
          />
          <i
            onClick={() => {
              setOpenCalendar(!openCalendar);
            }}
            className={`icon dtc-icon-calendar`}
          ></i>
        </div>
        <AnimatePresence>
          {openCalendar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="infusedui-datepicker-calendar-root"
            >
              <div className="infusedui-datepicker-calendar-month">
                <button onClick={prevMonth}>
                  <i className="icon teaui-icon-carret-left"></i>
                </button>
                <div>
                  {!disabledTodayButton &&
                    (new Date().getMonth() !== activeMonth ||
                      new Date().getFullYear() !== activeYear) && (
                      <button
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement, MouseEvent>
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
                  <i className="icon teaui-icon-carret-right"></i>
                </button>
              </div>
              <div className="infusedui-datepicker-calendar-days">
                <div className="infusedui-datepicker-day-label">
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
                          event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                        ) => {
                          event.preventDefault();
                          setContent(
                            `${activeYear}-${
                              activeMonth + 1 < 10
                                ? `0${activeMonth + 1}`
                                : activeMonth + 1
                            }-${day.day < 10 ? `0${day.day}` : day.day}`
                          );
                          setActiveDay(day.day);
                          setOpenCalendar(false);
                        }}
                        key={key}
                      >
                        {day.day}
                      </button>
                    );
                  } else {
                    return <span key={key}></span>;
                  }
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
