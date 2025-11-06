import React from "react";

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioProps {
  name: string;
  label?: string;
  options: RadioOption[];
  size?: number;
  disabled?: boolean;
  tagline?: React.ReactNode;
  required?: boolean;
  className?: string;
  defaultValue?: string;
  error?: string;
  gridSize?: number;
}
