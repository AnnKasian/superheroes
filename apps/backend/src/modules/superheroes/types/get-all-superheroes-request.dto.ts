import { ApiProperty } from "@nestjs/swagger";
import { GetAllSuperheroesRequestDto as GetAllSuperheroesRequestDtoType } from "@superheroes/shared";
import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

import { MIN_SIZE } from "../constants/constants.js";

class GetAllSuperheroesRequestDto implements GetAllSuperheroesRequestDtoType {
  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(MIN_SIZE)
  public page?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(MIN_SIZE)
  public limit?: number;
}

export { GetAllSuperheroesRequestDto };
