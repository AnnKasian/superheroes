import { zodResolver } from "@hookform/resolvers/zod";
import {
  type Control,
  type DefaultValues,
  type FieldErrors,
  type FieldValues,
  useForm,
  type UseFormClearErrors,
  type UseFormHandleSubmit,
  type UseFormProps,
  type UseFormReset,
  type UseFormSetValue,
  type UseFormTrigger,
  type UseFormWatch,
  type ValidationMode,
} from "react-hook-form";
import { type z } from "zod";

type Parameters<T extends FieldValues = FieldValues> = {
  defaultValues: DefaultValues<T>;
  mode?: keyof ValidationMode;
  validationSchema?: z.Schema<T>;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  handleErrorsClear: UseFormClearErrors<T>;
  handleReset: UseFormReset<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  handleTrigger: UseFormTrigger<T>;
  handleValueSet: UseFormSetValue<T>;
  isDirty: boolean;
  watch: UseFormWatch<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
  defaultValues,
  mode = "onSubmit",
  validationSchema,
}: Parameters<T>): ReturnValue<T> => {
  const parameters: UseFormProps<T> = {
    defaultValues,
    mode,
  };

  if (validationSchema) {
    parameters.resolver = zodResolver(validationSchema);
  }

  const {
    clearErrors,
    control,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
    setValue,
    trigger,
    watch,
  } = useForm<T>(parameters);

  return {
    control,
    errors,
    handleErrorsClear: clearErrors,
    handleReset: reset,
    handleSubmit,
    handleTrigger: trigger,
    handleValueSet: setValue,
    watch,
    isDirty,
  };
};

export { useAppForm };
