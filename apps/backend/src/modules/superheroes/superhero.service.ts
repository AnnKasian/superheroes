import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";

import { EMPTY_SIZE, MIN_SIZE } from "./constants/constants.js";
import { type SuperheroEntity } from "./entities/superhero.entity.js";
import { SuperheroesRepository } from "./superhero.repository.js";
import {
  type CreateSuperheroRequestDto,
  GetAllSuperheroesResponseDto,
  UpdateSuperheroRequestDto,
} from "./types/types.js";
import {
  GetAllSuperheroesRequestDto,
  SuperheroResponseDto,
} from "./types/types.js";

@Injectable()
class SuperheroesService {
  private readonly BASE_URL: string;
  private readonly SERVE_ROOT: string;

  public constructor(
    private superheroesRepository: SuperheroesRepository,
    configService: ConfigService
  ) {
    this.BASE_URL = configService.get("BASE_URL") as string;
    this.SERVE_ROOT = configService.get("SERVE_ROOT") as string;
  }

  private addFilePaths(images: Express.Multer.File[]): string[] {
    const imagePaths: string[] = [];
    const uploadSource = "/uploads/images/";
    const uploadDirectory = `/public${uploadSource}`;

    if (!existsSync(uploadDirectory)) {
      mkdirSync(uploadDirectory, { recursive: true });
    }

    if (images.some((image) => !image.mimetype.startsWith("image"))) {
      throw new ConflictException("Only image files are allowed");
    }

    for (const image of images) {
      const uniqueSuffix = Date.now();
      const filename = `${uniqueSuffix}-${image.originalname.toLowerCase().replaceAll(" ", "-")}`;

      const filePath = path.join(".", uploadDirectory, filename);

      writeFileSync(filePath, image.buffer);
      imagePaths.push(uploadSource + filename);
    }

    return imagePaths;
  }

  private deleteFile(imagesToDelete: string[]): Promise<void> {
    for (const imagePath of imagesToDelete) {
      const filePath = path.join(".", "public", imagePath);

      if (existsSync(filePath)) {
        unlinkSync(filePath);
      }
    }

    return Promise.resolve();
  }

  public async create(
    superhero: CreateSuperheroRequestDto,
    images?: Express.Multer.File[]
  ): Promise<SuperheroResponseDto> {
    const existingSuperhero = await this.superheroesRepository.findOne({
      nickname: superhero.nickname,
    });

    if (existingSuperhero) {
      throw new ConflictException("Nickname already in use");
    }

    let imagePaths: string[] = [];

    if (images && images.length > EMPTY_SIZE) {
      imagePaths = this.addFilePaths(images);
    }

    return this.transform(
      await this.superheroesRepository.create({
        ...superhero,
        images: imagePaths,
      })
    );
  }

  public async update(
    id: string,
    updatedSuperhero: Partial<UpdateSuperheroRequestDto>,
    images?: Express.Multer.File[]
  ): Promise<void> {
    const { imagesToLeave: imagesToLeave, ...superheroData } = updatedSuperhero;

    const superhero = await this.getOne(id);

    if (updatedSuperhero.nickname) {
      const nicknameConflictHero = await this.superheroesRepository.findOne({
        nickname: updatedSuperhero.nickname,
      });

      if (nicknameConflictHero && nicknameConflictHero.id !== id) {
        throw new ConflictException("Nickname already in use");
      }
    }

    let imagePaths: string[] = [];

    if (imagesToLeave) {
      const imagesToDelete = superhero.images.filter(
        (image) => !imagesToLeave.includes(image)
      );

      if (
        superhero.images.length !==
        imagesToLeave.length + imagesToDelete.length
      ) {
        throw new NotFoundException("Image does not belong to the hero");
      }

      await this.deleteFile(
        imagesToDelete.map((image) => image.split(this.SERVE_ROOT)[MIN_SIZE])
      );

      imagePaths.push(
        ...imagesToLeave.map((image) => image.split(this.SERVE_ROOT)[MIN_SIZE])
      );
    } else {
      imagePaths.push(
        ...superhero.images.map(
          (image) => image.split(this.SERVE_ROOT)[MIN_SIZE]
        )
      );
    }

    if (images && images.length > EMPTY_SIZE) {
      imagePaths.push(...this.addFilePaths(images));
    }

    await this.superheroesRepository.update(id, {
      ...superheroData,
      images: imagePaths,
    });
  }

  public async getAll(
    parameters: Required<GetAllSuperheroesRequestDto>
  ): Promise<GetAllSuperheroesResponseDto> {
    const total = await this.superheroesRepository.count();
    const { page, limit } = parameters;
    const skip = (page - MIN_SIZE) * limit;

    if (skip >= total) {
      if (page === 1) {
        return {
          items: [],
          pagination: {
            total: 0,
            page,
            limit,
            next: undefined,
            prev: undefined,
          },
        };
      }

      throw new NotFoundException("Page doesn't exist");
    }

    const superheroes = await this.superheroesRepository.findAll({
      skip,
      limit,
    });

    const responseSuperheroes = superheroes.map((superhero) => ({
      id: superhero.id,
      nickname: superhero.nickname,
      image:
        superhero.images.length > EMPTY_SIZE
          ? this.BASE_URL +
            this.SERVE_ROOT +
            superhero.images[EMPTY_SIZE].imagePath
          : undefined,
    }));

    return {
      items: responseSuperheroes,
      pagination: {
        total,
        page,
        limit,
        next: skip + limit < total ? page + MIN_SIZE : undefined,
        prev: page > MIN_SIZE ? page - MIN_SIZE : undefined,
      },
    };
  }

  public async getOne(id: string): Promise<SuperheroResponseDto> {
    const superhero = await this.superheroesRepository.findOne({ id });

    if (!superhero) {
      throw new NotFoundException(`Superhero with id ${id} not found`);
    }

    return this.transform(superhero);
  }

  public async remove(id: string): Promise<void> {
    const superhero = await this.superheroesRepository.findOne({ id });

    if (!superhero) {
      throw new NotFoundException(`Superhero with id ${id} not found`);
    }

    const imagesToDelete = superhero.images.map(({ imagePath }) => imagePath);

    if (imagesToDelete) {
      await this.deleteFile(imagesToDelete);
    }

    await this.superheroesRepository.remove(id);
  }

  public transform(superhero: SuperheroEntity): SuperheroResponseDto {
    return {
      ...superhero,
      catchPhrase: superhero.catchPhrase ?? undefined,
      images: superhero.images
        ? superhero.images.map(
            (image) => this.BASE_URL + this.SERVE_ROOT + image.imagePath
          )
        : [],
      superpowers: superhero.superpowers
        ? superhero.superpowers.map((superpower) => superpower.name)
        : [],
    };
  }
}

export { SuperheroesService };
