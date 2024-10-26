import { ApiProperty } from "@nestjs/swagger";
import { PaginationDto as PaginationDtoType } from "@superheroes/shared";

class PaginationDto implements PaginationDtoType {
  @ApiProperty()
  public total!: number;

  @ApiProperty()
  public page!: number;

  @ApiProperty()
  public limit!: number;

  @ApiProperty({ required: false })
  public next?: number;

  @ApiProperty({ required: false })
  public prev?: number;
}

export { PaginationDto };
