import { ApiProperty } from "@nestjs/swagger";
import { GetAllSuperheroDto as GetAllSuperheroDtoType } from "@superheroes/shared";

class GetAllSuperheroDto implements GetAllSuperheroDtoType {
  @ApiProperty()
  public id!: string;

  @ApiProperty()
  public nickname!: string;

  @ApiProperty({ required: false })
  public image?: string;
}

export { GetAllSuperheroDto };
