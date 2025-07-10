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
  content: any;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  error: any;
  data: AdressItems[] | [];
  label?: string;
  locked?: boolean;
  size?: number;
  readOnly?: boolean;
  maxLength?: number;
  placeHolder?: string;
  required?: boolean;
  className?: string;
}
