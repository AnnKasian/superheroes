import { ApiProperty } from "@nestjs/swagger";
import { CreateSuperheroRequestDto as CreateSuperheroRequestDtoType } from "@superheroes/shared";
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

import { MIN_SIZE } from "../constants/constants.js";

class CreateSuperheroRequestDto implements CreateSuperheroRequestDtoType {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  public nickname!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  public realName!: string;

  @IsString()
  @ApiProperty({ type: String })
  public originDescription!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  public catchPhrase?: string;

  @IsArray()
  @ArrayMinSize(MIN_SIZE)
  @IsString({ each: true })
  @ApiProperty({ type: [String] })
  public superpowers!: string[];
}

export { CreateSuperheroRequestDto };
