"use client";

import { RootState } from "@/store/store";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { useSelector } from "react-redux";

interface CheckBoxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  checked,
  onChange,
  className = "",
}) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <label
      className={`flex items-center gap-2 cursor-pointer text-sm sm:text-base select-none ${
        darkMode ? "text-white" : "text-gray-800"
      } ${className}`}
    >
      <Checkbox.Root
        checked={checked}
        onCheckedChange={(val) => onChange(!!val)}
        className={`flex items-center justify-center w-5 h-5 rounded border transition-colors cursor-pointer
             focus:outline-none ${
               darkMode
                 ? "border-yellow-400 bg-black data-[state=checked]:bg-yellow-400 "
                 : "border-gray-600 bg-white data-[state=checked]:bg-gray-800"
             }`}
      >
        <Checkbox.Indicator>
          <CheckIcon
            className={`${darkMode ? "text-black" : "text-white"} w-5 h-5`}
          />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {label}
    </label>
  );
};

export default CheckBox;
