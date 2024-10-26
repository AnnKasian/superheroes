import { z } from "zod";

import {
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE,
} from "../../libs/constants/constants.js";
import {
  SuperheroValidationMessage,
  SuperheroValidationRule,
} from "../enums/enums.js";

const createSuperheroDtoSchema = z.object({
  nickname: z
    .string({
      required_error: SuperheroValidationMessage.NICKNAME_REQUIRED,
      invalid_type_error: SuperheroValidationMessage.NICKNAME_STRING,
    })
    .min(SuperheroValidationRule.MIN_LENGTH, {
      message: SuperheroValidationMessage.FIELD_LENGTH,
    }),
  realName: z
    .string({
      required_error: SuperheroValidationMessage.REAL_NAME_REQUIRED,
      invalid_type_error: SuperheroValidationMessage.REAL_NAME_STRING,
    })
    .min(SuperheroValidationRule.MIN_LENGTH, {
      message: SuperheroValidationMessage.FIELD_LENGTH,
    }),
  originDescription: z
    .string({
      required_error: SuperheroValidationMessage.ORIGIN_DESCRIPTION_REQUIRED,
      invalid_type_error: SuperheroValidationMessage.ORIGIN_DESCRIPTION_STRING,
    })
    .min(SuperheroValidationRule.MIN_LENGTH, {
      message: SuperheroValidationMessage.FIELD_LENGTH,
    }),
  superpowers: z
    .array(
      z
        .string({
          required_error: SuperheroValidationMessage.SUPERPOWERS_REQUIRED,
          invalid_type_error: SuperheroValidationMessage.SUPERPOWERS_STRING,
        })
        .min(SuperheroValidationRule.MIN_LENGTH),
    )
    .min(SuperheroValidationRule.MIN_LENGTH, {
      message: SuperheroValidationMessage.SUPERPOWERS_LENGTH,
    }),
  catchPhrase: z
    .string({
      invalid_type_error: SuperheroValidationMessage.CATCH_PHRASE_STRING,
    })
    .optional(),
  images: z
    .array(
      z
        .instanceof(File)
        .refine((file) => {
          return !file || file.size <= MAX_FILE_SIZE;
        }, SuperheroValidationMessage.IMAGE_SIZE)
        .refine((file) => {
          return (
            !file ||
            ACCEPTED_FILE_TYPES.some((type) => file.type.includes(type))
          );
        }, SuperheroValidationMessage.IMAGE_FORMAT),
    )
    .optional(),
});

export { createSuperheroDtoSchema };
