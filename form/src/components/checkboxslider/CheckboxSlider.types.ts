export interface CheckboxSliderContent {
  value: boolean;
}

export interface CheckboxSliderProps {
  label: string;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  name?: string;
  defaultValue?: boolean;
  onChange?: (checked: boolean) => void;
}
