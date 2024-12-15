import React from 'react';
import { motion } from 'framer-motion';

interface FormStepProps {
  children: React.ReactNode;
  isActive: boolean;
}

export const FormStep = ({ children, isActive }: FormStepProps) => {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {children}
    </motion.div>
  );
};