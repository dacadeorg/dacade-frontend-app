import { useState, useEffect, useRef } from "react";

type CheckboxProps = {
  checked?: boolean;
  disabled?: boolean;
  data?: string | ReadonlyArray<string> | number;
  required?: boolean;
  id?: string;
  name?: string;
  communityStyles?: boolean;
};

const Checkbox = ({
  checked = false,
  disabled = false,
  data = "",
  required = false,
  id = "",
  name = "",
  communityStyles = false,
}: CheckboxProps) => {
  const [checkedValue, setCheckedValue] = useState<boolean>(checked);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCheckedValue(checked);
  }, [checked]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(event.target.checked);
  };

  const styles = communityStyles ? { color: "#0000FF" } : undefined;

  return (
    <input
      id={id}
      ref={inputRef}
      type="checkbox"
      checked={checkedValue}
      value={data}
      name={name}
      required={required}
      disabled={disabled}
      className={`w-5 h-5 bg-gray-100 rounded border-gray-200 text-primary ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      style={styles}
      onChange={handleInputChange}
    />
  );
};

export default Checkbox;
