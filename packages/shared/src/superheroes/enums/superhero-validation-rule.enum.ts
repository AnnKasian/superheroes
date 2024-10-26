import { MAX_FILE_SIZE } from "../../libs/constants/constants.js";

const SuperheroValidationRule = {
  MIN_LENGTH: 1,
  IMAGE_SIZE: MAX_FILE_SIZE,
} as const;

export { SuperheroValidationRule };
