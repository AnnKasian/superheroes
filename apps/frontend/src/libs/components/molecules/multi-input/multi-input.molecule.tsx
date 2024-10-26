import {
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { EMPTY_SIZE } from "~/libs/constants/constants.js";
import { useFormController, useState } from "~/libs/hooks/hooks.js";

import { ErrorMessage } from "../../atoms/atoms.js";
import { Badge, Button } from "../../components.js";
import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  label?: string;
  name: FieldPath<T>;
  placeholder?: string;
  required?: boolean;
};

const MultiInput = <T extends FieldValues>({
  control,
  label,
  name,
  placeholder = "",
  required = false,
}: Properties<T>): JSX.Element => {
  const { field, fieldState } = useFormController({ control, name });

  const [input, setInput] = useState<string>("");
  const values = (field.value ?? []) as string[];

  const handleClick = () => {
    if (input.trim()) {
      setInput("");
      field.onChange([...values, input]);
    }
  };

  const handleRemove = (superpowerIndex: number) => {
    const updatedSuperpowers = values.filter(
      (_, index) => index !== superpowerIndex,
    );
    field.onChange(updatedSuperpowers);
  };

  return (
    <>
      <label className={styles["input-label"]}>
        <span>{label}</span>
      </label>
      <div className={styles["badges"]}>
        {values.length > EMPTY_SIZE &&
          values.map((value, index) => (
            <div key={index}>
              <Badge isForm onRemove={() => handleRemove(index)}>
                {value}
              </Badge>
            </div>
          ))}
      </div>
      <div className={styles["input-container"]}>
        <input
          className={styles["input-field"]}
          name={field.name}
          onChange={(event) => setInput(event.target.value)}
          placeholder={placeholder}
          required={required}
          value={input}
        />
        <div className={styles["button"]}>
          <Button label="Add new" onClick={() => handleClick()} />
        </div>
      </div>
      <ErrorMessage message={fieldState.error?.message} />
    </>
  );
};

export { MultiInput };
