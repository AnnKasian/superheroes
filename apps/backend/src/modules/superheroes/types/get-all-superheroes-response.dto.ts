import { ApiProperty } from "@nestjs/swagger";
import { GetAllSuperheroesResponseDto as GetAllSuperheroesResponseDtoType } from "@superheroes/shared";

import { PaginationDto } from "../../../libs/types/types.js";
import { GetAllSuperheroDto } from "./get-all-superhero.dto.js";

class GetAllSuperheroesResponseDto implements GetAllSuperheroesResponseDtoType {
  @ApiProperty()
  public pagination!: PaginationDto;

  @ApiProperty()
  public items!: GetAllSuperheroDto[];
}

export { GetAllSuperheroesResponseDto };
