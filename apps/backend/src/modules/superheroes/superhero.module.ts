import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SuperheroEntity } from "./entities/superhero.entity.js";
import { SuperheroImageEntity } from "./entities/superhero-image.entity.js";
import { SuperheroPowerEntity } from "./entities/superpower.entity.js";
import { SuperheroesController } from "./superhero.controller.js";
import { SuperheroesRepository } from "./superhero.repository.js";
import { SuperheroesService } from "./superhero.service.js";

@Module({
  controllers: [SuperheroesController],
  imports: [
    TypeOrmModule.forFeature([
      SuperheroEntity,
      SuperheroPowerEntity,
      SuperheroImageEntity,
    ]),
  ],
  providers: [SuperheroesService, SuperheroesRepository, Logger],
})
class SuperheroesModule {}

export { SuperheroesModule };
