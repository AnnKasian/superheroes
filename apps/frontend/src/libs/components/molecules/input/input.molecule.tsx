import {
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { ErrorMessage } from "~/libs/components/atoms/atoms.js";
import { useFormController } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
  autoComplete?: string;
  control: Control<T, null>;
  label?: string;
  name: FieldPath<T>;
  placeholder?: string;
  required?: boolean;
};

const Input = <T extends FieldValues>({
  autoComplete,
  control,
  label,
  name,
  required = false,
  placeholder = "",
}: Properties<T>): JSX.Element => {
  const { field, fieldState } = useFormController({ control, name });

  return (
    <label className={styles["input-label"]}>
      <span>{label}</span>
      <div className={styles["input-container"]}>
        <input
          autoComplete={autoComplete}
          className={styles["input-field"]}
          name={field.name}
          onChange={field.onChange}
          placeholder={placeholder}
          required={required}
          value={field.value}
        />
      </div>
      <ErrorMessage message={fieldState.error?.message} />
    </label>
  );
};

export { Input };
