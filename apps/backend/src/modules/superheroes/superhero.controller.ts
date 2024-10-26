import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";

import { ErrornDto } from "../../libs/types/types.js";
import { MAX_FILE_SIZE } from "./constants/constants.js";
import { SuperheroesService } from "./superhero.service.js";
import {
  CreateSuperheroRequestDto,
  GetAllSuperheroesRequestDto,
  GetAllSuperheroesResponseDto,
  SuperheroResponseDto,
  UpdateSuperheroRequestDto,
} from "./types/types.js";

@ApiTags("Superheroes")
@Controller("superheroes")
class SuperheroesController {
  private readonly DEFAULT_LIMIT = 5;
  private readonly DEFAULT_PAGE = 1;

  public constructor(private readonly superheroesService: SuperheroesService) {}

  @Get("/get-all")
  @ApiResponse({
    status: 200,
    description: "List of superheroes successfully retrieved.",
    type: GetAllSuperheroesResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Superheroes page not found.",
    type: ErrornDto,
  })
  public getAll(
    @Query() { page, limit }: GetAllSuperheroesRequestDto,
  ): Promise<GetAllSuperheroesResponseDto> {
    return this.superheroesService.getAll({
      page: page ?? this.DEFAULT_PAGE,
      limit: limit ?? this.DEFAULT_LIMIT,
    });
  }

  @Get("/get/:id")
  @ApiResponse({
    status: 200,
    description: "Superhero successfully retrieved.",
    type: SuperheroResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Superhero not found.",
  })
  public getOne(@Param("id") id: string): Promise<SuperheroResponseDto> {
    return this.superheroesService.getOne(id);
  }

  @Post("/create")
  @ApiResponse({
    status: 201,
    description: "Superhero successfully created.",
    type: SuperheroResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input.",
  })
  @ApiResponse({
    status: 409,
    description: "Nickname conflict.",
  })
  @UseInterceptors(
    FilesInterceptor("images[]", Infinity, {
      limits: {
        fileSize: MAX_FILE_SIZE,
      },
    }),
  )
  public create(
    @Body() superhero: CreateSuperheroRequestDto,
    @UploadedFiles() images?: Express.Multer.File[],
  ): Promise<SuperheroResponseDto> {
    return this.superheroesService.create(superhero, images);
  }

  @Put("/update/:id")
  @ApiBody({ type: UpdateSuperheroRequestDto })
  @ApiResponse({
    status: 200,
    description: "Superhero successfully updated.",
    type: SuperheroResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input.",
  })
  @ApiResponse({
    status: 404,
    description: "Superhero not found.",
  })
  @ApiResponse({
    status: 409,
    description: "Nickname conflict.",
  })
  @UseInterceptors(
    FilesInterceptor("images[]", Infinity, {
      limits: {
        fileSize: MAX_FILE_SIZE,
      },
    }),
  )
  public async update(
    @Param("id") id: string,
    @Body() updatedSuperhero: UpdateSuperheroRequestDto,
    @UploadedFiles() images?: Express.Multer.File[],
  ): Promise<{ success: boolean }> {
    await this.superheroesService.update(id, updatedSuperhero, images);

    return {
      success: true,
    };
  }

  @Delete("/delete/:id")
  @ApiResponse({
    status: 200,
    description: "Superhero successfully deleted.",
  })
  @ApiResponse({
    status: 404,
    description: "Superhero not found.",
  })
  public async remove(@Param("id") id: string): Promise<{ success: boolean }> {
    await this.superheroesService.remove(id);

    return {
      success: true,
    };
  }
}

export { SuperheroesController };
