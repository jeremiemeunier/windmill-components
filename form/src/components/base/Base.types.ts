import React from "react";

export type InputLocker = {
  value: boolean;
  message: string;
};

export interface BaseBlockProps {
  id: string;
  label?: string;
  size?: number;
  tagline?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}

export interface InputBlockProps {
  children: React.ReactNode;
  error?: string;
  maxLength?: {
    value: number;
    current: number;
  };
  className?: string;
  dataIsLoading?: boolean;
  lockWhenDataIsLoading?: boolean;
  locked?: InputLocker;
  subContainer?: React.ReactNode;
}

export interface RadioCheckboxBlockProps {
  children: React.ReactNode;
  error?: string;
  gridSize?: number;
  className?: string;
  dataIsLoading?: boolean;
}

export interface SelectBlockProps {
  children: React.ReactNode;
  error?: string;
  className?: string;
  dataIsLoading?: boolean;
}
