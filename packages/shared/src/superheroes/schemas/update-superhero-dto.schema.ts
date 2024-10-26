import { createSuperheroDtoSchema } from "./create-superhero-dto.schema.js";

const updateSuperheroDtoSchema = createSuperheroDtoSchema.partial();

export { updateSuperheroDtoSchema };
