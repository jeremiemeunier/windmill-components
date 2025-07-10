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
  | number;

export interface DateTimePickerProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  size?: number;
  readOnly?: boolean;
  locked?: boolean;
  required?: boolean;
  label?: string;
  blockedDate?: string[];
  disabled?: DisabledOption[];
  className?: string;
  disabledTodayButton?: boolean;
}
