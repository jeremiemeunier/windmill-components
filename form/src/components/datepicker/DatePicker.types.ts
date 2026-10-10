import { InputLocker } from "../base/Base.types";

export interface DayArrayProps {
  day: number;
  disabled?: boolean;
}

export type DisabledOption =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"
  | "weekend"
  | "old"
  | "past"
  | "futur";

export interface DatePickerProps {
  name: string;
  label?: string;
  size?: number;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  defaultValue?: string;
  error?: string;
  blockedDate?: string[];
  rangeStart?: string;
  blockType?: "past" | "futur";
  disabledOptions?: DisabledOption[];
  className?: string;
  disabledTodayButton?: boolean;
  dataIsLoading?: boolean;
  lockWhenDataIsLoading?: boolean;
  locked?: InputLocker;
  onChange?: (value: string) => void;
}
