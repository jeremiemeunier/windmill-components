import { InputContent } from "../input";

export interface DatePickerContent extends InputContent {
  value: string;
}

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
  content: DatePickerContent;
  setContent: React.Dispatch<React.SetStateAction<DatePickerContent>>;
  size?: number;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  blockedDate?: string[];
  disabledOptions?: DisabledOption[];
  className?: string;
  disabledTodayButton?: boolean;
  dataIsLoading?: boolean;
}
