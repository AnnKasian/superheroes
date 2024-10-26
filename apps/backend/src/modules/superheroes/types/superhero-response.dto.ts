import { ApiProperty } from "@nestjs/swagger";
import { SuperheroResponseDto as SuperheroResponseDtoType } from "@superheroes/shared";

class SuperheroResponseDto implements SuperheroResponseDtoType {
  @ApiProperty()
  public id!: string;

  @ApiProperty()
  public nickname!: string;

  @ApiProperty()
  public realName!: string;

  @ApiProperty()
  public originDescription!: string;

  @ApiProperty({ required: false })
  public catchPhrase?: string;

  @ApiProperty()
  public superpowers!: string[];

  @ApiProperty()
  public images!: string[];

  @ApiProperty()
  public createdAt!: Date;

  @ApiProperty()
  public updatedAt!: Date;
}

export { SuperheroResponseDto };
