import { type PaginationDto } from "../../libs/types/types.js";
import { type GetAllSuperheroDto } from "./get-all-superhero.dto.js";

type GetAllSuperheroesResponseDto = {
  items: GetAllSuperheroDto[];
  pagination: PaginationDto;
};

export { type GetAllSuperheroesResponseDto };
