import React from "react";

export interface XRadioOption {
  value: string;
  label: string;
}

export interface XRadioProps {
  name: string;
  label?: string;
  options: XRadioOption[];
  size?: number;
  disabled?: boolean;
  tagline?: React.ReactNode;
  required?: boolean;
  className?: string;
  defaultValue?: string;
  error?: string;
  gridSize?: number;
}
