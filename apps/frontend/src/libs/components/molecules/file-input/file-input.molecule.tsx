import {
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { useCallback, useFormController } from "~/libs/hooks/hooks.js";

import { Button, ErrorMessage } from "../../atoms/atoms.js";
import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  label?: string;
  name: FieldPath<T>;
};

const FileInput = <T extends FieldValues>({
  control,
  label,
  name,
}: Properties<T>): JSX.Element => {
  const { field, fieldState } = useFormController({ control, name });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files: list } = event.target;
      const files: File[] = [];

      if (!list) {
        return;
      }

      for (let index = 0; index < list.length; index++) {
        const file = list.item(index);

        if (file) {
          files.push(file);
        }
      }

      field.onChange([...(field.value ?? []), ...files]);
    },
    [field],
  );

  return (
    <label className={styles["input-label"]}>
      {label}
      <div className={styles["input-container"]}>
        <Button label="Upload File" />

        <input
          accept="image/png, image/jpeg, image/jpg"
          className={styles["input-field"]}
          multiple
          name={field.name}
          onChange={handleChange}
          type="file"
        />
      </div>
      <ErrorMessage message={fieldState.error?.message} />
    </label>
  );
};

export { FileInput };
