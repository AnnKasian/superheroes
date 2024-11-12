import {
  MAX_FILE_SIZE,
  MIN_SIZE,
  NAME_SIZE,
} from "../../libs/constants/constants.js";

const SuperheroValidationRule = {
  MIN_LENGTH: MIN_SIZE,
  IMAGE_SIZE: MAX_FILE_SIZE,
  MIN_NAME_SIZE: NAME_SIZE,
} as const;

export { SuperheroValidationRule };
