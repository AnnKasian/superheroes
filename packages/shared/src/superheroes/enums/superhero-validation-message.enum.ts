import { SuperheroValidationRule } from "./superhero-validation-rule.enum.js";

const SuperheroValidationMessage = {
  NICKNAME_REQUIRED: "Nickname is required.",
  NICKNAME_STRING: "Nickname should be a string.",
  NICKNAME_LENGTH: `Nickname length should be at least this length: ${SuperheroValidationRule.MIN_NAME_SIZE}.`,
  REAL_NAME_REQUIRED: "Real name is required.",
  REAL_NAME_STRING: "Real name should be a string.",
  REAL_NAME_LENGTH: `Real name length should be at least this length: ${SuperheroValidationRule.MIN_NAME_SIZE}.`,
  ORIGIN_DESCRIPTION_REQUIRED: "Origin description is required.",
  ORIGIN_DESCRIPTION_STRING: "Origin description should be a string.",
  SUPERPOWERS_REQUIRED: "Superpowers is required.",
  SUPERPOWERS_STRING: "Superpower should be a string.",
  SUPERPOWERS_LENGTH: `Superpower should contain at least this count of items: ${SuperheroValidationRule.MIN_LENGTH}.`,
  CATCH_PHRASE_STRING: "Catch phrase should be a string.",
  IMAGE_SIZE: `File size must be less bites than ${SuperheroValidationRule.IMAGE_SIZE}`,
  IMAGE_FORMAT: "File must be an image",
  FIELD_LENGTH: `Fiels length should be at least this length: ${SuperheroValidationRule.MIN_LENGTH}.`,
};

export { SuperheroValidationMessage };
