import { InputContent } from "../input";

export interface AdressContent extends InputContent {
  value: string;
}

export interface AdressItems {
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

export interface AdressProps {
  content: AdressContent;
  setContent: React.Dispatch<React.SetStateAction<AdressContent>>;
  data: AdressItems[] | [];
  label?: string;
  disabled?: boolean;
  size?: number;
  readOnly?: boolean;
  maxLength?: number;
  placeHolder?: string;
  required?: boolean;
  className?: string;
  dataIsLoading?: boolean;
}
