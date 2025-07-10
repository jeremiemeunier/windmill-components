import { FormEvent } from "react";
import { FormEncType } from "react-router-dom";

export interface FormProps {
  children: React.ReactNode;
  handler: (event: FormEvent<HTMLFormElement>) => void;
  encType?: FormEncType;
  className?: string;
}
