import { InputLocker } from "../base/Base.types";

export interface AutoCompleteDataItem {
  [key: string]: any;
}

export interface AutoCompleteProps {
  name: string;
  nameLabel?: string;
  label?: string;
  placeHolder?: string;
  data: AutoCompleteDataItem[];
  disabled?: boolean;
  size?: number;
  readOnly?: boolean;
  maxLength?: number;
  required?: boolean;
  autofocus?: boolean;
  className?: string;
  dataIsLoading: boolean;
  lockWhenDataIsLoading?: boolean;
  defaultValue?: string | number;
  error?: string;
  options: {
    label: {
      key: string;
      details?: {
        key: string;
        isRenderedInLabel: boolean;
        position: "top" | "bottom";
        className?: string;
      };
    };
    value: {
      key: string;
      enhancedValues?: {
        data: AutoCompleteDataItem[];
        label: string;
        otherValueLabel?: string;
      };
    };
    icon?: {
      key: string;
      type: "icon" | "image";
      className?: string;
    };
  };
  onChange?: (value: string | number) => void;
  locked?: InputLocker;
}
