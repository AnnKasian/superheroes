import { ApiProperty } from "@nestjs/swagger";

class ErrornDto {
  @ApiProperty()
  public message!: string;

  @ApiProperty()
  public statusCode!: number;
}

export { ErrornDto };
