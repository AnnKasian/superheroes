import { type MutableRefObject } from "react";
import { type DefaultValues } from "react-hook-form";
import { type z } from "zod";

import { useAppForm, useCallback, useEffect } from "~/libs/hooks/hooks.js";
import {
  type CreateSuperheroRequestDto,
  type UpdateSuperheroRequestDto,
} from "~/services/superheroes/libs/types/types.js";

import { FileInput, FormActions, Input, MultiInput } from "../../components.js";
import styles from "./styles.module.css";

type SuperheroRequest = CreateSuperheroRequestDto | UpdateSuperheroRequestDto;

type Properties<Type extends SuperheroRequest> = {
  actions?: MutableRefObject<{ removeImage: (image: File) => void } | null>;
  defaultValues?: DefaultValues<Type>;
  onDiscard: () => void;
  onImagesChange?: (images: File[]) => void;
  onSubmit: (payload: Type) => void;
  required?: boolean;
  validationSchema: z.ZodSchema<Type>;
};

const SuperheroForm = <Type extends SuperheroRequest>({
  actions,
  onSubmit,
  onImagesChange,
  onDiscard,
  validationSchema,
  defaultValues,
  required = false,
}: Properties<Type>): JSX.Element => {
  const { handleSubmit, watch, handleValueSet, control, isDirty } =
    useAppForm<SuperheroRequest>({
      validationSchema,
      defaultValues: {
        ...defaultValues,
      },
    });

  const images = watch("images");

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit((formData: SuperheroRequest) => {
        onSubmit(formData as Type);
      })(event_);
    },
    [handleSubmit, onSubmit],
  );

  useEffect(() => {
    onImagesChange?.(images ?? []);
  }, [images, onImagesChange]);

  useEffect(() => {
    if (actions) {
      const removeImage = (image: File) => {
        handleValueSet(
          "images",
          images?.filter((currentImage) => currentImage !== image),
        );
      };

      actions.current = { removeImage };
    }
  }, [images, actions, handleValueSet]);

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <div className={styles["superhero-description-layout"]}>
          <Input
            control={control}
            label="Nickname"
            name="nickname"
            placeholder="Enter nickname"
            required={required}
          />
        </div>
        <div className={styles["superhero-description-layout"]}>
          <Input
            control={control}
            label="Real name"
            name="realName"
            placeholder="Enter real name"
            required={required}
          />
        </div>
        <div className={styles["superhero-description-layout"]}>
          <Input
            control={control}
            label="Origin description"
            name="originDescription"
            placeholder="Enter origin description"
            required={required}
          />
        </div>
        <div className={styles["superhero-description-layout"]}>
          <MultiInput
            control={control}
            label="Superpowers"
            name="superpowers"
            placeholder="Enter superpower"
          />
        </div>
        <div className={styles["superhero-description-layout"]}>
          <Input
            control={control}
            label="Catch Phrase"
            name="catchPhrase"
            placeholder="Enter catch phrase"
          />
        </div>

        <FileInput control={control} label="Images" name="images" />
      </div>

      <FormActions isDisabled={!isDirty} onDiscard={onDiscard} />
    </form>
  );
};

export { SuperheroForm };
