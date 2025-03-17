import { FormEvent } from "react";

export interface FormProps {
  children: React.ReactNode;
  handler: (event: FormEvent<HTMLFormElement>) => void;
  encType?: string;
  className?: string;
}
