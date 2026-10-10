export interface AddressItems {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    label: string;
    score: number;
    housenumber: string;
    id: string;
    banId: string;
    name: string;
    postcode: string;
    citycode: string;
    x: number;
    y: number;
    city: string;
    context: string;
    type: string;
    importance: number;
    street: string;
  };
}

export interface AddressProps {
  name: string;
  error: string | undefined;
  data: AddressItems[] | [];
  label?: string;
  disabled?: boolean;
  size?: number;
  readOnly?: boolean;
  maxLength?: number;
  placeHolder?: string;
  required?: boolean;
  className?: string;
  dataIsLoading?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
}
