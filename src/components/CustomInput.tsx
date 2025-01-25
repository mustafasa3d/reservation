"use client";

import React from "react";
import Select from "react-select"; // استيراد react-select

interface CustomInputProps {
  type: string;
  name: string;
  value: string | number;
  onChange: (e: any) => void; // تغيير النوع ليتناسب مع react-select
  placeholder?: string;
  label?: string;
  required?: boolean;
  className?: string;
  options?: { value: string; label: string }[];
  isReactSelect?: boolean; // خاصية جديدة لتحديد react-select
  min?: number; 
  max?: number; 
}

const CustomInput = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  label,
  required,
  className,
  options,
  isReactSelect = false, // افتراضيًا false
  ...props
}: CustomInputProps) => {
  return (
    <div className="mb-4 w-full">
      {label && (
        <label className="block text-gray-700 font-semibold mb-2">
          {label}
        </label>
      )}
      {isReactSelect ? (
        <Select
          options={options}
          value={options?.find((option) => option.value === value)}
          onChange={(selectedOption) => {
            onChange({
              target: {
                name,
                value: selectedOption?.value || "",
              },
            });
          }}
          placeholder={placeholder}
          className={`react-select-container ${className}`}
          classNamePrefix="react-select"
          {...props}
        />
      ) : type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${className}`}
          required={required}
          {...props}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${className}`}
          required={required}
          {...props}
        />
      )}
    </div>
  );
};

export default CustomInput;