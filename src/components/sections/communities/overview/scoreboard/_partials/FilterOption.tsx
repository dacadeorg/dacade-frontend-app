import {
  ChangeEvent,
  FormEventHandler,
  HTMLProps,
  ReactElement,
  useState,
} from "react";
import Radio from "@/components/ui/Radio";

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
export default function FilterOption({
  label = "",
  value = "",
  data = "",
  name = "",
  ...props
}: FilterOptionProps): ReactElement {
  const [vModalValue, setVModalValue] = useState(value);

  const handleVModalValueChange: FormEventHandler<
    HTMLInputElement
  > = (event: ChangeEvent<HTMLInputElement>) => {
    setVModalValue(event.target.value);
  };

  const isChecked = () => {
    return value === data;
  };

  return (
    <div className="mt-2 mb-2">
      <label className="inline-flex items-center">
        <Radio
          {...props}
          id="radio btn"
          data={data}
          required={true}
          name={name}
          className="w-8"
          value={vModalValue}
          onChange={handleVModalValueChange}
        />
        <span
          className={
            isChecked() ? "font-medium ml-4" : "font-normal ml-4"
          }
        >
          {label}
        </span>
      </label>
    </div>
  );
}
