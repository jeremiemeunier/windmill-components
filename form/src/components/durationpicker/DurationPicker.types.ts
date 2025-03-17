import React, { useState, useId, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BaseBlock, InputBlock } from "../base/Base";
import { Calendar } from "../../class/DatePicker.class";
import { DurationPickerTypes } from "./DurationPicker";

export const DurationPicker: React.FC<DurationPickerTypes> = () => {
  const id = useId();
  const calendar = new Calendar();

  return null;
};
