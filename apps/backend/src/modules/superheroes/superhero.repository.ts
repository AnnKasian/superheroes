import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import chalk from "chalk";
import { In, IsNull, Repository } from "typeorm";

import { SuperheroEntity } from "./entities/superhero.entity.js";
import { SuperheroImageEntity } from "./entities/superhero-image.entity.js";
import { SuperheroPowerEntity } from "./entities/superpower.entity.js";

@Injectable()
class SuperheroesRepository {
  public constructor(
    @InjectRepository(SuperheroEntity)
    private superheroes: Repository<SuperheroEntity>,
    @InjectRepository(SuperheroPowerEntity)
    private superpowers: Repository<SuperheroPowerEntity>,
    @InjectRepository(SuperheroImageEntity)
    private images: Repository<SuperheroImageEntity>,
    private readonly logger: Logger,
  ) {}

  private async getRelations(payload: {
    images: string[];
    superpowers: string[];
  }): Promise<{
    images: SuperheroImageEntity[];
    superpowers: SuperheroPowerEntity[];
  }> {
    const existingSuperpowers = await this.superpowers.find({
      where: { name: In(payload.superpowers) },
    });
    const superpowers = payload.superpowers.map(
      (name) =>
        new SuperheroPowerEntity({
          name,
          ...existingSuperpowers.find((superpower) => superpower.name === name),
        }),
    );

    const existingImages = await this.images.find({
      where: { imagePath: In(payload.images) },
    });
    const images = payload.images.map(
      (imagePath) =>
        new SuperheroImageEntity({
          imagePath,
          ...existingImages.find((image) => image.imagePath === imagePath),
        }),
    );

    return { superpowers, images };
  }

  public async create(
    superhero: { images: string[]; superpowers: string[] } & Partial<
      Pick<SuperheroEntity, "catchPhrase">
    > &
      Pick<SuperheroEntity, "nickname" | "originDescription" | "realName">,
  ): Promise<SuperheroEntity> {
    this.logger.log(chalk.green.bold("Creating new superhero"));
    const newSuperhero = new SuperheroEntity({
      ...superhero,
      ...(await this.getRelations(superhero)),
    });

    return await this.superheroes.save(newSuperhero);
  }

  public async update(
    id: string,
    updateSuperheroData: Partial<
      { images: string[]; superpowers: string[] } & Pick<
        SuperheroEntity,
        "catchPhrase" | "nickname" | "originDescription" | "realName"
      >
    >,
  ): Promise<void> {
    this.logger.log(chalk.blue.bold(`Updating superhero with id ${id}`));

    const {
      nickname,
      realName,
      originDescription,
      catchPhrase,
      images,
      superpowers,
    } = updateSuperheroData;

    const relations = await this.getRelations({
      images: images || [],
      superpowers: superpowers || [],
    });

    await this.superheroes.save({
      id,
      ...(nickname && { nickname }),
      ...(realName && { realName }),
      ...(originDescription && { originDescription }),
      ...(catchPhrase && { catchPhrase }),
      ...(images && { images: relations.images }),
      ...(superpowers && { superpowers: relations.superpowers }),
    });

    const imagesToDelete = await this.images.find({
      where: { superheroId: IsNull() },
    });

    if (imagesToDelete) {
      await this.images.remove(imagesToDelete);
      this.logger.log(
        chalk.red.bold(`Deleting selected images from superhero with id ${id}`),
      );
    }
  }

  public count(): Promise<number> {
    return this.superheroes.count();
  }

  public findAll(parameters: {
    limit: number;
    skip: number;
  }): Promise<SuperheroEntity[]> {
    this.logger.log(chalk.yellow("Fetching all superheroes"));
    const { skip, limit } = parameters;

    return this.superheroes.find({
      relations: ["images", "superpowers"],
      skip,
      take: limit,
    });
  }

  public findOne(filter: {
    id?: string;
    nickname?: string;
  }): Promise<null | SuperheroEntity> {
    const { id, nickname } = filter;
    this.logger.log(
      chalk.yellow(
        `Fetching superhero with ${id ? `id ${id}` : `nickname ${nickname}`}`,
      ),
    );

    return this.superheroes.findOne({
      where: {
        ...(id && { id }),
        ...(nickname && { nickname }),
      },
      relations: ["images", "superpowers"],
    });
  }

  public async remove(id: string): Promise<void> {
    this.logger.log(chalk.red(`Deleting superhero with id ${id}`));
    await this.superheroes.delete(id);
  }
}

export { SuperheroesRepository };
