"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ListItem {
  label: string;
  icon?: IconDefinition; // optional, only for sort
}

interface SelectableListProps {
  title?: string; // optional heading like "Categories"
  items: ListItem[];
  selected: string | string[] | null; // can be single (sort) or multiple (categories)
  onSelect: (label: string) => void;
  multiSelect?: boolean; // true = categories, false = sort
}

const SelectableList: React.FC<SelectableListProps> = ({
  title,
  items,
  selected,
  onSelect,
  multiSelect = false,
}) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const isSelected = (label: string) => {
    if (multiSelect && Array.isArray(selected)) {
      return selected.includes(label);
    }
    return selected === label;
  };

  return (
    <div>
      {title && (
        <label className="font-medium mb-2 block sm:text-base text-sm">
          {title}
        </label>
      )}

      <div
        className={
          multiSelect ? "grid grid-cols-2 gap-4" : "flex flex-col gap-3"
        }
      >
        {items.map((item) => (
          <button
            key={item.label}
            onClick={() => onSelect(item.label)}
            className={`${
              multiSelect
                ? "p-3 sm:px-5 sm:py-3"
                : "flex justify-between items-center px-5 py-3"
            } rounded-xl border font-medium text-sm transition-all duration-200 cursor-pointer shadow-sm ${
              isSelected(item.label)
                ? "bg-yellow-400 text-black border-yellow-400 shadow-lg"
                : darkMode
                ? "border-gray-600 text-white hover:border-yellow-400 hover:text-yellow-400"
                : "border-gray-300 text-gray-900 hover:border-yellow-400 hover:text-yellow-400"
            }`}
          >
            <span>{item.label}</span>
            {item.icon && (
              <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectableList;
