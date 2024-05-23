import { HTMLProps, ReactElement, useMemo } from "react";
import Radio from "@/components/ui/Radio";
import classNames from "classnames";

/**
 * Filter option props interface
 * @date 4/12/2023 - 6:32:11 PM
 *
 * @interface FilterOptionProps
 * @typedef {FilterOptionProps}
 */
interface FilterOptionProps extends HTMLProps<HTMLInputElement> {
  label?: string;
  value?: string | number;
  data?: string;
  name?: string;
}

/**
 * Filter options component
 * @date 4/12/2023 - 6:35:23 PM
 *
 * @export
 * @param {FilterOptionProps} {
  label = "",
  value = "",
  data = "",
  name = "",
}
 * @returns {ReactElement}
 */
export default function FilterOption({ label = "", value = "", data = "", name = "", ...props }: FilterOptionProps): ReactElement {
  const isChecked = useMemo(() => value.toString().toLowerCase() === data.toLowerCase(), [data, value]);

  return (
    <div className="mt-2 mb-2">
      <label className="inline-flex items-center">
        <Radio disabled={isChecked} {...props} name={name} data={data} value={value} className="w-8" />
        <span
          className={classNames("ml-4", {
            "font-bold": isChecked,
          })}
        >
          {label}
        </span>
      </label>
    </div>
  );
}
