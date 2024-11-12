import { ApiProperty } from "@nestjs/swagger";
import { UpdateSuperheroRequestDto as UpdateSuperheroRequestDtoType } from "@superheroes/shared";
import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

import { MIN_SIZE, NAME_SIZE } from "../constants/constants.js";

class UpdateSuperheroRequestDto implements UpdateSuperheroRequestDtoType {
  @IsString()
  @IsOptional()
  @MinLength(NAME_SIZE)
  @ApiProperty({ type: String, required: false })
  public nickname?: string;

  @IsString()
  @IsOptional()
  @MinLength(NAME_SIZE)
  @ApiProperty({ type: String, required: false })
  public realeName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  public originDescription?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  public catchPhrase?: string;

  @IsArray()
  @ArrayMinSize(MIN_SIZE)
  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({ type: [String], required: false })
  public superpowers?: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({ type: [String], required: false })
  public imagesToLeave?: string[];
}

export { UpdateSuperheroRequestDto };
