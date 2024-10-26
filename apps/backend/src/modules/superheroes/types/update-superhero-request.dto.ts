import { ApiProperty } from "@nestjs/swagger";
import { UpdateSuperheroRequestDto as UpdateSuperheroRequestDtoType } from "@superheroes/shared";
import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator";

import { MIN_SIZE } from "../constants/min-size.constant.js";

class UpdateSuperheroRequestDto implements UpdateSuperheroRequestDtoType {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  public nickname?: string;

  @IsString()
  @IsOptional()
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
